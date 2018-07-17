$(document).ready(function(){
  //Modal window is hidden..................
  $("#modal-window").hide();

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
  var confirmPassword = "";
  var userAdd = "";
  var userCity = "";
  var userState = "";
  var userZip = "";
  var userPhone = "";
  var userEmail = "";
  var birthYear = 0;
  var birthMonth = 0;
  var birthDay = 0;
  var nowYear = 0;
  var nowMonth = 0;
  var nowDay = 0;

  //Putting the focus on the first field of the form...................
  var input = $("#first_name").focus();

  //Calling the disableSignIn() function which will disable the submit button.............
  disableSubmit();

  //Validate the signup form for empty or invalid entry in the fields............... 
  validateForm();

  //Clears and hides the error display div when the user starts correcting the respective fileds...................
  clearErrorDisplay();

  //Capturing the add user button click........................
  $("#add-user").on("click", function(event){
    event.preventDefault();  
    //var check = $('#birth_date');
    //var hasChecked = true;

    if ($("#first_name").val(), $("#last_name").val(), $("#user_name").val(), $("#password").val(), $("#user_address").val(),$("#user_zipcode").val(), $("#user_phone").val(), $("#user_email").val() === "" ){     //&& check !== check.checked) {
           
      $("#error_display").show();
      var msg = $("<h3 class ='text-center'>").text("Please fill all the fields before submitting the form.").css("color", "rgba(74, 133, 7)", "background-color", "rgba(74, 133, 7, .2)");
      
      $("#error_display").append(msg);
      var input = $("#first_name").focus();

    } else {
      
      //Storing the user input values to the variables................................
      firstName = $("#first_name").val().trim();
      lastName = $("#last_name").val().trim();
      //birthDate = hasChecked;
      //console.log(birthDate);
      userName = $("#user_name").val().trim();
      password = $("#password").val().trim();
      confirmPassword = $("#confirm_password").val().trim();
      userAdd = $("#user_address").val().trim();
      userCity = $("#user_city").val().trim();
      userState = $("#user_state").val().trim();
      userZip = $("#user_zipcode").val().trim();
      userPhone = $("#user_phone").val().trim();
      userEmail = $("#user_email").val().trim();
    

      database.ref().on("value", function(snapshot){
        for (var obj in snapshot.val()) {
         // console.log("snapshot.val()[obj[1]]");
          console.log(snapshot.val()[obj]);
          var userdetails = snapshot.val()[obj].uname;
          console.log(userdetails);
          var useremaildetails = snapshot.val()[obj].email;
          console.log(useremaildetails);
          //check each object username and email and compare to user name and email;
          //if found return false;
          
          if (userName === userdetails) {
            $("#error_display").show();
            var msg1 = $("<h3 class ='text-center'>").text(userName + ":  Username already exists").css("color", "rgba(74, 133, 7)", "background-color", "rgba(74, 133, 7, .2)");
            $("#error_display").append(msg1);
            $("#user_name").focus();
           return;
           end;
          }

          if (userEmail === useremaildetails) {
            $("#error_display").show();
            var msg1 = $("<h3 class ='text-center'>").text(userEmail + ":  Email id already exists").css("color", "rgba(74, 133, 7)", "background-color", "rgba(74, 133, 7, .2)");
            $("#error_display").append(msg1);
            $("#user_email").focus(); 
           return;
           end;
          } 
        }   //End of for bracket.....................
        //if found return true;
        //Then the summaryModal function is called which will display the summary of the user's input
        // informations before its saved into the database.
        summaryModal(); 
      }); //end of database.ref() ......................    
   }  //End of if bracket................
     
    //Capturing the save button of the summary page, so the user will check their entry and save to the database..
    $("#addtodata").on("click", function(){
      //Creating a local temoporary object for holding user information............
      var userDetail = {
        fname : firstName,
        lname : lastName,
        bDay : birthDate,
        uname : userName,
        pwd : password,
        cpwd : confirmPassword,
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
         
      //Creating a firebase event for adding user details to the database ........................
      database.ref().on("child_added", function(childSnapshot, preChildKey){
        console.log("The childSnapshot: " + childSnapshot);
           
        //Store to a variable....................
        var firstName = childSnapshot.val().fname;
        var lastName = childSnapshot.val().lname;
        var birthDate = childSnapshot.val().bDay;
        var userName = childSnapshot.val().uname;
        var password = childSnapshot.val().pwd;
        var confirmPassword = childSnapshot.val().cpwd;
        var userAdd = childSnapshot.val().add;
        var userCity = childSnapshot.val().city;
        var userState = childSnapshot.val().state;
        var userZip = childSnapshot.val().zip;
        var userPhone = childSnapshot.val().phone;
        var userEmail = childSnapshot.val().email;
        }, function(errorObject){
        console.log("The error message: " + errorObject.code);
        return;          

      });      //End of data.ref().on(child_added) function................
      reset();

    });        //End of add to addtodata click button function................        
  });            //End of add-user button click........................

  //Capturing the reset button, where all fields in HTML will be initialized...............
  $("#reset-user").on("click", function(){
    reset();
  });

  //This function is called when the user submit its signup form the summary will be displayed in the modal window................
  function summaryModal(){
    $("#modal-window").css("display", "block");
    $("#signIn").hide();//css("display", "none");
    var p1 = $("<p>").text("Full Name :  " + firstName + " " + lastName);
    var p2 = $("<p>").text("Birth Date:  " + birthDate);
    var p3 = $("<p>").text("User Name:  " + userName);
    var p4 = $("<p>").text("Address:  " + userAdd);
    var p5 = $("<p>").text("City:  " + userCity);
    var p6 = $("<p>").text("State:  " + userState);
    var p7 = $("<p>").text("Zip Code:  " + userZip);
    var p8 = $("<p>").text("Phone No:  " + userPhone);
    var p9 = $("<p>").text("Email:  " + userEmail);
    $("#summary-message").append(p1, p2, p3, p4, p5, p6, p7, p8, p9);
  } //End of summaryModal function...............................
  
  //This function will be called when the user click on the submit button without filling the form..................
  function validateForm() {
    $("#form-input").validate({
      rules : {
        first_name : "required", last_name : "required",
        birth_date : "required",
        user_name : {
          required : true, 
          minlength : 5,
          maxlength : 9
        },
        password: {
          required : true,
          minlength : 6
        },
        confirm_password : {
          required : true,
          minlength : 6,
          equalTo : "#password"
        },
        user_phone : {
          required : true,
        },
        user_email : {
          required : true,
          email : true
        }
      },
      messages : {
        first_name : "Please enter your First Name",
        last_name : "Please enter your Last Name",
        user_name : {
          required : "Please enter a User Name",
          minlength : "Your username must consist of atleast 5 characters",
          maxlength : "Your username must consist of max 9 characters",
        },
        birth_date : "The user has to be 18 years to signup!",
        password : {
          required : "Please provide a password", 
          minlength: "Your password must consist of atleast 6 characters",
        },
        confirm_password : {
          required : "Please confirm your password", 
          minlength: "Your password must consist of atleast 6 characters",
          equalTo : "Please provide a password as above"
        },
        user_phone : {
          required : "Please enter a valid phone/mobile number",
        },
        user_email : {
          required : "Please provide an email address",
          email : "Please provide a valid email address"
        }
      },
      /*submitHandler : function(form) {
        $(form).summaryModal();
    } */
       
    });
  } //End of validateForm function.................................

  //This function is called when ever the fields are needed to be reset to its original state................
  function reset(){
    $("#first_name").val("");
    $("#last_name").val("");
    $("#birth_date").val("");
    $("#user_name").val("");
    $("#password").val("");
    $("#confirm_password").val("");
    $("#user_address").val("");
    $("#user_city").val("");
    $("#user_state").val("");
    $("#user_zipcode").val("");
    $("#user_phone").val("");
    $("#user_email").val("");
    $("#error_display").empty();
    $("#error_display").hide();
    $("#first_name").focus();
    disableSubmit();
  } //End of reset function...................................

  //This function will be called after the error message is displayed and the user corrects the respective fields.......
  function clearErrorDisplay() {
    $("#first_name").on("keyup", function(){
      $("#error_display").empty();
      $("#error_display").hide();
    });
    
    $("#user_name").on("keyup", function(){
      $("#error_display").empty();
      $("#error_display").hide();
    });
    
    $("#user_email").on("keyup", function(){
      $("#error_display").empty();
      $("#error_display").hide();
    });
  }

  //This function will be called when the page loads and disable the submit button on till the checkbox has been ckecked................
  function disableSubmit() {
    $("#add-user").attr('disabled', 'disabled').css("color", "rgba(31, 56, 2)", "cursor", "none");

    $("#birth_date").change(function(e){
      if (this.checked) {
        $("#add-user").removeAttr("disabled").css("color", "white", "cursor", "pointer");
      } else {
        $("#add-user").attr('disabled', 'disabled').css("color", "rgba(31, 56, 2)", "cursor", "none");
      }
    });
  }

});     //End of document ready function.............................
