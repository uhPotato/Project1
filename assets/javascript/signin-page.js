$(document).ready(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAHKzVuDz5Fzb_siJvcEC0tYakcxc9dyhY",
    authDomain: "things-to-do-744e7.firebaseapp.com",
    databaseURL: "https://things-to-do-744e7.firebaseio.com",
    projectId: "things-to-do-744e7",
    storageBucket: "things-to-do-744e7.appspot.com",
    messagingSenderId: "807935759914"
  };
  firebase.initializeApp(config);

  //Declaring a variable to store the database info...................
  var database = firebase.database();
  

  //Initializing the variables.........................
  var userEmail = "";
  var userPassword = "";

  //Putting the focus on the first field of the form...................
  var input = $("#email-input").focus();

  //Capturing the search user button click........................
  $("#signin").on("click", function(event){
    event.preventDefault();  

    if ($("#email-input").val(), $("#password-input").val() === "") {
      var msg = $("<h3 class ='text-center'>").text("Please fill all the fields before submitting the form.").css("color", "red");
      $("#error_display").append(msg);
      $("#email-input").focus();
    } else {

      //Storing the user input values to the variables................................
      userEmail = $("#email-input").val().trim();
      userPassword = $("#password-input").val().trim();
      database.ref().on("value", function(snapshot){
        for (var obj in snapshot.val()) {
          console.log(snapshot.val()[obj]);
          var useremaildetails = snapshot.val()[obj].email;
          var userpassworddetails = snapshot.val()[obj].pwd;
          console.log("This is the email: ");
          console.log(useremaildetails);
          console.log(userEmail);
          console.log(typeof useremaildetails);
          console.log("This is the password: ");
          console.log(userpassworddetails);
          console.log(userPassword);
          console.log(typeof userpassworddetails);
          //check each object email and compare to user email;
          //if found return false;
          if (useremaildetails === userEmail && userpassworddetails === userPassword) {
          alert("We found your data, yey!!");
          return;
          end;
          } 
        } 
        
        var msg = $("<h3 class ='text-center'>").text("Please check your email and password.").css("color", "red");
        $("#error_display").append(msg);
        $("#email-input").val("");
        $("#password-input").val("");
        $("#email-input").focus();
          return;
          end;
         
      //}
      }, function(errorObject) {
        console.log("This is the error:" + errorObject.code);
      
      });


    }
  });
});