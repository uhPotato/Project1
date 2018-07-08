

//This will be where we use firebase authentication for signing into the application.

$(document).ready(function(){
  //Modal window and validate window are hidden..................
  $("#modal-window").hide();
  $("#validate-window").hide();

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

   console.log("hello reena");
  //Capturing the add user button click........................
  $("#add-user").on("click", function(event){
    console.log("hello1");
    event.preventDefault();

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
    
    //Validate the sign in form for empty fields...............
    if ( $("#fName").val(), $("#lName").val(), $("#uName").val(), $("#pwd").val(), $("#add").val(), $("#city").val(), "#state", $("#zip").val(), $("#phone").val(), $("#email").val() === ""){

      //Calling the function which will display the error message.................
      validateform();
    } else {

      //Storing the user input values to the variables................................
      firstName = $("#fName").val().trim();
      lastName = $("#lName").val().trim();
      birthDate = $("#bDay").val().trim();
      userName = $("#uName").val().trim();
      password = $("#pwd").val().trim();
      userAdd = $("#add").val().trim();
      userCity = $("#city").val().trim();
      userState = $("#state").val().trim();
      userZip = $("#zip").val().trim();
      userPhone = $("#phone").val().trim();
      userEmail = $("#email").val().trim();

      console.log(firstName, lastName, userName, password);

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

      //All the fields will be cleared once the user click on the submit button...............
      reset();
      console.log("hello all fields are clear");
    }
    signinSummary();
  });
  console.log("I'm outside of the add-user button click function");

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

  //This function is called when the user submit its signin form in the modal window................
  function signinSummary(){
    $("#modal-window").show();
    $("#signIn").hide();
    var txt1 = $("<h3></h3>").text("Sign-In summary");
    var txt2 = $("<p></p>").text("Full Name : " + fName + "" + lName);
    var txt3 = $("<p></p>").text("Birth Date: " + bDay);
    var txt4 = $("<p></p>").text("User Name: " + uName);
    var txt5 = $("<p></p>").text("Address: " + add);
    var txt6 = $("<p></p>").text("City: " + city);
    var txt7 = $("<p></p>").text("State: " + state);
    var txt8 = $("<p></p>").text("Zip Code: " + zip);
    var txt9 = $("<p></p>").text("Phone No: " + phone);
    var txt10 = $("<p></p>").text("Email: " + email);
    $("#modal2").append(txt1, txt2, txt3, txt4, txt5, txt6, txt7, txt8, txt9, txt10);
  }

  //This function will be called when the user click on the submit button without filling the form..................
  function validateform() {
    $("#validate-window").show();
    $("#signIn").hide();

    //Creating a variable to store the error message to be displayed........................
    var message = $("<h3></h3>").text("All flieds are mandatory to be filled.");
    $("#modala4").append(message);
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