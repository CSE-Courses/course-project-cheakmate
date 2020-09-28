import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.HashMap;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;

public class ChessWebServer {
	
	//Global Variables for server set up
	private static ServerSocket server;
	private static int port = 8000; //Port the server is running on.
	private static String input = ""; //Holds any data received from the client.
	private static String output = ""; //Holds any data to be sent to the client.
	
	//Global Variable for server operation
	private static InputStream inStream;
	private static BufferedReader buffreader; 
	//private static Scanner scanner;
	private static PrintStream stream;
	private static Response response;
	private static byte [] rawImage;
	
	//Global File Reference List
	private static HashMap<String, String> fileList;  
	private static ArrayList<String> imageList;
	
	/*
	 * HTTP Return Headers. 
	 * (Reminder when adding new headers please and "\r\n", anything after the last header should start with \r\n.)
	 */
	//HTTP Status Headers
	private final static String STATUS101 = "HTTP/1.1 101 Switching Protocols\r\n";
	private final static String STATUS200 = "HTTP/1.1 200 OK\r\n";
	private final static String STATUS201 = "HTTP/1.1 201 Document Created\r\n";
	private final static String STATUS301 = "HTTP/1.1 301 Moved Permenatly\r\n";
	private final static String STATUS401 = "HTTP/1.1 401 Not logged in\r\n";
	private final static String STATUS403 = "HTTP/1.1 403 Forbidden\r\n";
	private final static String STATUS404 = "HTTP/1.1 404 Item Not Found\r\n";
	private final static String STATUS501 = "HTTP/1.1 501 Not Implemented\r\n";
	
	//Content Type Headers 
	private final static String NO_SNIFF = "X-Content-Type-Options: nosniff\r\n";
	private final static String TEXT_HTML = "Content-Type: text/html\r\n";
	private final static String TEXT_JS = "Content-Type: text/javascript\r\n";
	private final static String TEXT_CSS = "Content-Type: text/css\r\n";
	private final static String TEXT_PLAIN = "Content-Type: text/plain\r\n";
	private final static String IMG__PNG = "Content-Type: image/png\r\n";
	private final static String IMG__JPG = "Content-Type: image/jpg\r\n";
	private final static String CONTENT_LENGTH = "Content-Length: ";
	private final static String LOCATION = "Location: ";

	public static void main(String[] args) throws IOException {
		//Create TCP Socket Server
		server = new ServerSocket(port);
		System.out.println("Project server running on port: " + port);
		
		//Initiate Lists
		initializeLists();

		while(true) {
			try (Socket socket = server.accept()){
				//Creating the input and output streams via the socket.
            	inStream = socket.getInputStream();
	            buffreader = new BufferedReader(new InputStreamReader(inStream));
	            stream = new PrintStream(socket.getOutputStream());
				
	            //Reads request send from the client browser.
				readRequest();
				
				//Create an empty output. This will contain the data sent to the client.
				output = "";
				
				//Used for serving images
				boolean fileTypeIsImage = false;
				rawImage = null;
				
				//Creates a response based of the request.
				if(response.getRequestMethod().equals("GET")) fileTypeIsImage = handleGETRequest();
//				else if(response.getRequestMethod().equals("POST")) fileTypeIsImage = handlePOSTRequest();
				
				//Output the return headers and content to the user.
				System.out.println("\nThe server responded with \n" + output + "\n\n");
				stream.write(output.getBytes("UTF-8")); //Converts into a byte array for the browser.
				//Images are out put differently because it is already in bytes.
				if(fileTypeIsImage) {
					stream.write(rawImage);
					fileTypeIsImage = false;
				}
				output = "";
                buffreader.close();
				
			} catch (Exception e) {
				e.printStackTrace();
				server.close();
				System.out.println("Server is closed");
				break;
			}
		}
	}

	/**
	 * Handles GET request based on the type and destination.
	 * Note all files must be in publicFiles to work!
	 * @return true if it is handling an image false otherwise.
	 * @throws IOException If you give it a path that does not exist
	 * @throws NoSuchAlgorithmException 
	 */
	private static boolean handleGETRequest() throws IOException, NoSuchAlgorithmException{
		String path = response.getPath();
		System.out.println("The path being searched for is :" + path);
		
		//All 200 properly typed out paths
		if(path.endsWith(".html")) {
			String fileData = "";
			if(fileList.containsKey(path)) {
				output += STATUS200 + TEXT_HTML + NO_SNIFF;
				fileData = readFileData(fileList.get(path));
				output += CONTENT_LENGTH + fileData.length() + "\r\n\r\n" + fileData;
				return false;
			}
		
		//All images let the browser sniff the image out for convenience	
		}else if (path.endsWith(".png") || path.endsWith(".jpg") || path.endsWith(".jpeg") || path.endsWith(".gif")){
			if(path.endsWith(".png")) {
				output += STATUS200 + IMG__PNG; //+ NO_SNIFF;
			}
			if(path.endsWith(".jpg")) {
				output += STATUS200 + IMG__JPG; //+ NO_SNIFF;
			}
			rawImage = readImageData(path);
			output += CONTENT_LENGTH + rawImage.length + "\r\n\r\n";
			return true;
		
		//All javascript files
		}else if (path.endsWith(".js")) {
			output += STATUS200 + TEXT_JS + NO_SNIFF; 
			String fileData = readFileData("public" + path);
			output += CONTENT_LENGTH + fileData.length() + "\r\n\r\n" + fileData;
			return false;
		
		//All css files 
		}else if (path.endsWith(".css")){
			output += STATUS200 + TEXT_CSS + NO_SNIFF;
			String fileData = readFileData("public" + path);
			output += CONTENT_LENGTH + fileData.length() + "\r\n\r\n" + fileData;
			return false;
		}
		
		//When none of the paths work the browser displays a 404 error.
		output += STATUS404 + TEXT_HTML + NO_SNIFF;
		String fileData = "PAGE NOT FOUND";
		output += CONTENT_LENGTH + fileData.length() +"\r\n\r\n" + fileData;
		return false;
	}
	
	/**
	 * Reads the HTML/CSS/JS Files and puts it into a string.
	 * @param Name of the files that needs to be converted to a String.
	 * @return Converted file as a string.
	 * @throws IOException 
	 */
	private static String readFileData(String index) throws IOException {
		//Creates a new BufferedReader which consists of a FileReader with the File which contains the index of the file;
		BufferedReader fileReader = new BufferedReader(new FileReader(new File(index)));
		String fileData = "";
		String temp = "";
		//Reads each line of the file and adds it to fileData
		while((temp = fileReader.readLine())!= null) {
			fileData += temp;
		}
		fileReader.close();
		return fileData;
	}
	
	/**
	 * Reads and Looks for an image in the images folder.
	 * Source: https://www.tutorialspoint.com/How-to-convert-Image-to-Byte-Array-in-java
	 * 
	 * @param string Name of image.
	 * @return the image written as a string.
	 * @throws IOException 
	 */
	private static byte[] readImageData(String index) throws IOException {
		//Check the image type if the image type is not found then send the 404 error
		String type = "";
		if(index.endsWith("png")) {type = "png";}
		else if (index.endsWith("jpg")) {type = "jpg";}
		else if (index.endsWith("jpeg")) {type = "jpeg";}
		else if (index.endsWith("gif")) {type = "gif";}
		else {index = "images/img404png"; type = "png";}
		
		//check to see if image exist in imageList
		if(!imageList.contains(index)) {index = "img404.png"; type = "png";}
		
		//Turns the image 
		BufferedImage bufferedReader = ImageIO.read(new File("public" + index));
		ByteArrayOutputStream imageOutPut = new ByteArrayOutputStream();
		ImageIO.write(bufferedReader, type , imageOutPut); 
		return imageOutPut.toByteArray();
	}
	
	/**
	 * Parses the clients request so long it is a POST request
	 * @throws IOException 
	 */
	private static void makePOSTResponse() throws IOException {
		response = new PostResponse(input);
		
		//Adds additionally headers so long they exist (ie. "Host: localhost:8000" or "Cookie: user=visited")
		boolean headerExist = true; 
		while(headerExist) {
			String line = buffreader.readLine();
			System.out.println(line);
			//If the line exist we parse it in the response class. If not we skip, if it ends with -- were done.
			if(line.isEmpty()) {
//				scaner.nextLine();
			}else if(line.endsWith("--")){
//				response.parseln(line);
				headerExist = false;
			}else {
				response.parseln(line);
			}
			
		}
	}

	/**
	 * Parses the clients request so long it is a GET request
	 * @throws IOException 
	 */
	private static void makeGETResponse() throws IOException {
		response = new GetResponse(input);
		
		//Adds additionally headers so long they exist (ie. "Host: localhost:8000" or "Cookie: user=visited")
		boolean headerExist = true; 
		while(headerExist) {
			String line = buffreader.readLine();
			System.out.println(line);
			
			//If the line exist we parse it in the response class. Other we break from the loop.
			if(line.isEmpty()) headerExist = false;
			else response.parseln(line);
		}
		
	}
	
	/**
	 * Reads the Request from the scanner and parses it. 
	 * It does not return due to the use of global variables in the WebServer Class.
	 * @throws IOException 
	 */
	private static void readRequest() throws IOException {
		//Reads the first line. Of the Get Request (ie. "GET /index HTTP/1.1")
		input = buffreader.readLine();
		System.out.println("\nThe client submitted:\n" + input); 
		if (input == null) {
			System.out.println("\nThe System failed due to a null request\n");
			response = new GetResponse("GET /404 HTTP/1.1");
		}else if(input.contains("GET")) {
			makeGETResponse();
		}else if(input.contains("POST")) {
			makePOSTResponse();
		}else {
			System.out.println("\nThe System failed to detect a GET or POST request\n");
			response = new GetResponse("GET /404 HTTP/1.1");
		}
	}
	
	private static void initializeLists() {	
		//List of files
		fileList = new HashMap<String, String>();
		fileList.put("/index.html", "public/index.html");
		fileList.put("/game.html", "public/game.html");
		fileList.put("/settings.html", "public/settings.html");
		fileList.put("/index.css", "public/index.css");
		fileList.put("/game.css", "public/game.css");
		fileList.put("/settings.css", "public/settings.js");
		fileList.put("Cookies.txt", "public/Cookies.txt");
		
		//List of images
		imageList = new ArrayList<String>();
		imageList.add("/images/Default.jpg");
		imageList.add("/images/Lake.jpg");
		imageList.add("/images/Galaxy.jpg");
		imageList.add("/images/img404.png");
	}

}