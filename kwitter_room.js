 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBOu3YBp2hEfMQKYFBmJ5jXMBoFJsDDeSw",
    authDomain: "reachme-6def8.firebaseapp.com",
    databaseURL: "https://reachme-6def8-default-rtdb.firebaseio.com",
    projectId: "reachme-6def8",
    storageBucket: "reachme-6def8.appspot.com",
    messagingSenderId: "721575828839",
    appId: "1:721575828839:web:dfc600e834e43bb8e663c2",
    measurementId: "G-M1CFHGJT6Q"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("user_name");
  document.getElementById("welcome_name").innerHTML = "Welcome " + user_name + "!";   
  
function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
     Room_names = childKey;
    //Start code
    console.log(Room_names);
    row = "<div class='room_name' id="+ Room_names + " onclick='redirect(this.id)'>#" + Room_names + "</div>"
    document.getElementById("output").innerHTML += row;
    //End code
    });});}
getData();

function out()
{
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}

function addRoom() 
{
    room_store = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_store).update({
          purpose : "adding room name"
      });
    
    localStorage.setItem("room_name", room_store);
    window.location = "kwitter_page.html";
}

function redirect(name) 
{
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html"
}