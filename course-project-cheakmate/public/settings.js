/*@Author: Kat
//https://www.w3schools.com/js/js_cookies.asp
// function setCookie(cname,cvalue, days) {
//   if (days) {
//     var date = new Date();
//     date.setTime(date.getTime()+(days*24*60*60*1000));
//     var expires = "; expires="+date.toGMTString();
//   }
//   else{
//     var expires = "";
//   }
//   document.cookie = cname + "=" + cvalue + expires + "; path=/";
// }
//
// function getCookie(cname) {
//   var cn = cname + "=";
//   var decodedCookie = decodeURIComponent(document.cookie);
//   var ca = decodedCookie.split(';');
//   for(var i = 0; i < ca.length; i++) {
//     var c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(cn) == 0) {
//       return c.substring(cn.length, c.length);
//     }
//   }
//   return "";
// }
//
// function checkCookie() {
//   var pos = getCookie("board");
//   var bg = getCookie("bg");
//   if (pos != "") {
//     if(pos == "center"){
//       toCenter();
//     }
//     if(pos == "left"){
//       toLeft();
//     }
//     if(pos == "right"){
//       toRight();
//     }
//   } else {
//      setCookie('board', 'center');
//   }
//
//   if (bg != "") {
//     if(bg == "chess"){
//       toChessBg();
//     }
//     if(bg == "lake"){
//       toLakeBg();
//     }
//     if(bg == "galaxy"){
//       toGalaxyBg();
//     }
//   } else {
//      setCookie('bg', 'chess');
//   }
// }
*/
function toCenter(){
  document.getElementById('board').style.float = "none";
  /* setCookie('board', 'center');*/
}

function toLeft(){
  document.getElementById('board').style.float = "left";
  /* setCookie('board', 'left');*/
}

function toRight(){
  document.getElementById('board').style.float = "right";
  /* setCookie('board', 'right');*/
}

function toChessBg(){
  document.body.style.backgroundImage = "url('images/Default.jpg')";
  /* setCookie('bg', 'chess'); */
}

function toLakeBg(){
  document.body.style.backgroundImage = "url('images/Lake.jpg')";
  /* setCookie('bg', 'lake'); */
}

function toGalaxyBg(){
  document.body.style.backgroundImage = "url('images/Galaxy.jpg')";
  /* setCookie('bg', 'galaxy'); */
}