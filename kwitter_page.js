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
  room_store = localStorage.getItem("room_name");

  function send() 
{
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_store).push(
          {
               name : user_name,
               message : msg,
               like : 0
          }
    );
    document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_store).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
//Start code
      console.log(firebase_message_id);
      console.log(message_data);
      name = message_data['name'];
      message = message_data['message'];
      like = message_data['like'];
      name_tick = "<h4>" + name + "<img src='tick.png' class='user_tick'> </h4>";
      name_tag = "<h4>" + name + "<img src='tick.png' class='user_name_ticked logo2'> </h4>";
      message_tag = "<h4 class='message_h4'>" + message + "</h4>";
      like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value = "+ like + " onclick='updatelike(this.id)'>";
      span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>" +like+ "</span> </button><hr>";
      row = name_tag + message_tag + like_button + span_with_tag;
      document.getElementById("output").innerHTML += row;
//End code
    } });  }); }
getData();

function logout()
{
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}

function updatelike(message_id) 
{
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      likes_count = 1 + Number(likes);
      console.log(likes_count);
      firebase.database().ref(room_store).child(message_id).update({
          like : likes_count
      });
}