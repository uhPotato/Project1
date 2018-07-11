$(document).ready(function(){
  //Modal window and validate window are hidden..................
 // $("#modal-window").hide(); //css("display", "none");
  //$("#validate-window").hide(); //css("display", "none");

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
  var firstName = "";
  var lastName = "";
  var birthDate = "";
  var userName = "";
  var password = "";
  var userAdd = "";
  var userCity = "";
  var userState = "";
  var userZip = "";
  var userPhone = "";
  var userEmail = "";

  //Capturing the add user button click........................
  $("#add-user").on("click", function(event){
    event.preventDefault();
    
    //Validate the sign in form for empty fields...............
    if ( $("#fName-input").val(), $("#lName-input").val(), $("#bDay-input").val(), $("#uName-input").val(), $("#pwd-input").val(), $("#add-input").val(), $("#city-input").val(), $("#state-input"), $("#zip-input").val(), $("#phone-input").val(), $("#email-input").val() === ""){
    
      //Calling the function which will display the error message.................
      console.log("I am in the if condition");
      validateForm();
      
    } else {

      //Storing the user input values to the variables................................
      firstName = $("#fName-input").val().trim();
      lastName = $("#lName-input").val().trim();
      birthDate = $("#bDay-input").val().trim();
      userName = $("#uName-input").val().trim();
      password = $("#pwd-input").val().trim();
      userAdd = $("#add-input").val().trim();
      userCity = $("#city-input").val().trim();
      userState = $("#state-input").val().trim();
      userZip = $("#zip-input").val().trim();
      userPhone = $("#phone-input").val().trim();
      userEmail = $("#email-input").val().trim();

      //Creating a local temoporary object for holding user information............
      var userDetail = {
        fname : firstName,
        lname : lastName,
        bDay : birthDate,
        uname : userName,
        pwd : password,
        add : userAdd,
        city : userCity,
        state : userState,
        zip : userZip,
        phone : userPhone,
        email : userEmail,
        dateAdded : firebase.database.ServerValue.TIMESTAMP
      };

      //upload the user details to the database...............
      database.ref().push(userDetail);

      //The reset function is callede when all the fields are filled and the user clicks the ok button, 
      //which will be clear all the fileds....................
      reset();
    } 
    summaryModal(); 
  });

  //Capturing the reset button, where all fields in HTML will be initialized...............
  $("#reset-user").on("click", function(){
    reset();
  });

  //Creating a firebase event for adding user details to the database ........................
  database.ref().on("child_added", function(childSnapshot, preChildKey){
    console.log("The childSnapshot: " + childSnapshot);

    //Store to a variable....................
    var firstName = childSnapshot.val().fname;
    var lastName = childSnapshot.val().lname;
    var birthDate = childSnapshot.val().bDay;
    var userName = childSnapshot.val().uname;
    var password = childSnapshot.val().pwd;
    var address = childSnapshot.val().add;
    var userCity = childSnapshot.val().city;
    var userState = childSnapshot.val().state;
    var userZip = childSnapshot.val().zip;
    var userPhone = childSnapshot.val().phone;
    var userEmail = childSnapshot.val().email;
  }, function(errorObject){
    console.log("The error message: " + errorObject.code);
  });

  //This function is called when the user submit its signup form in the modal window................
  function summaryModal(){
    $("#modal-window").css("display", "block");
    $("#signIn").hide();//css("display", "none");
    var p1 = $("<p>").text("Full Name : " + firstName + "" + lastName);
    var p2 = $("<p>").text("Birth Date: " + birthDate);
    var p3 = $("<p>").text("User Name: " + userName);
    var p4 = $("<p>").text("Address: " + userAdd);
    var p5 = $("<p>").text("City: " + userCity);
    var p6 = $("<p>").text("State: " + userState);
    var p7 = $("<p>").text("Zip Code: " + userZip);
    var p8 = $("<p>").text("Phone No: " + userPhone);
    var p9 = $("<p>").text("Email: " + userEmail);
    console.log("This is the data to be displayed in the modal: ")
    $("#summary-message").append(p1, p2, p3, p4, p5, p6, p7, p8, p9);
  }
  

  //This function will be called when the user click on the submit button without filling the form..................
  function validateForm() {
    $("#validate-window").css("display", "block");
    $("#signIn").hide();

    //Creating a variable to store the error message to be displayed........................
    var message = $("<h3>").text("All flieds are mandatory to be filled.");
    $("#validate-message").append(message);
  } 

  //This function is called when ever the fields are needed to be reset to its original state................
  function reset(){
    $("#fName").val("");
    $("#lName").val("");
    $("#bDay").val("");
    $("#uName").val("");
    $("#pwd").val("");
    $("#add").val("");
    $("#city").val("");
    $("#state").val("");
    $("#zip").val("");
    $("#phone").val("");
    $("#email").val("");
  }
});
