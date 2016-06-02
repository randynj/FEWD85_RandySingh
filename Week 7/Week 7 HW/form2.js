$(function () {
  
  
  //$("#password-field").attr("disabled", "disabled");
  
  $(".password").focus(function () { 
  	//alert("The user has clicked on the password field");
    
    var username = $(".username").val();
    
    if (username.length == 0) {
      $("#error-message").text("Please fill out the username first");
      $(".username").focus();
    }
  });
  
  
  
  
  $("#example_form").submit(function (e) {
    
    var username = $(".username").val();
    var password = $(".password").val();
    
    if (username.length == 0 || password.length == 0) {
      $("#error-message").text("Please enter your username and password");
      
      // prevents the submission
      e.preventDefault();
    } else {
      // do nothing and let the submission happen
      
    }
    
  });
  
});
