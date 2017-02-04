var main = function() {
    // "use strict";

    /*toogling between "login" and "signup" */
    $(".tab a").on("click", function(e) {

        e.preventDefault();

        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");

        target = $(this).attr("href");
        console.log(target);

        $(".tab-content > div").not(target).hide();

        $(target).fadeIn(600);

    });

    $("button").on("click", function() {

        //Create variable to see if user is "logging in" of "signing up"
        var $loginOrSignUp = $(".tab-group .active").text();

        if ($loginOrSignUp === "Log In") {
            console.log("Processing password and username");
            var loginEmail = $("#loginEmail").val();
            var loginPassword = $("#loginPassword").val();

            $("#loginEmail").val("");
            $("#loginPassword").val("");

            $.get("/users", function(users) {
                console.log(users);
                var isUserFound = false;
                users.forEach(function(user) {

                    if (user.email === loginEmail) {

                        isUserFound = true;
                        console.log("user email found!");

                        if (user.password === loginPassword) {
                            console.log("login succesful!!");

                            // Set cookie to current user
                            setCookie("username", user.username, true);

                            // Go to profile profile-page
                            window.location.href = "profile.html";
                        } else {
                            alert("User entered incorrect password.");
                            console.log("User entered incorrect password.");
                        }
                    }
                });

                if (!isUserFound) {
                    alert("Email has not been registered.");
                    console.log("Email has not been registered.");
                }

            });
        } else {
            console.log("Processing a new user");
            
            var fname = $("#fname").val();
            var lname = $("#lname").val();
            var email = $("#email").val();
            var password = $("#password").val();
            var username = $("#username").val();
            var jobTitle = $("#jobTitle").val();
            var jobTags = $("#tags").val();
            var profilePic = $("#profilePic").val();
            var twitterURL = "http://twitter.com/" + $("#twitter").val();
            var facebookURL = "http://facebook.com/" + $("#facebook").val();
            
            // Check for valid inputs
            var requiredInputsIsValid = true;
            
            if(fname === "" || lname === "" || email === "" ||
                jobTitle === "" || username === "" || password === "") { 
                requiredInputsIsValid = false;
            }

            if( requiredInputsIsValid === true ) {
                
                // Handles empty tags
                var jobTagsArray = [];
                if(jobTags !== "") {
                    console.log("Empty tag");
                    // Turn tags to array and remove any whitespaces
                    jobTagsArray = jobTags.split(",");

                    for (var index = 0; index < jobTagsArray.length; index++) {
                        var tempString = jobTagsArray[index];
                        
                        if (tempString.indexOf(" ") === 0) {
                            jobTagsArray[index] = tempString.substring(1);
                        }
                    }
                }
                
                // Handles empty profile picture
                if(profilePic === "") {
                    profilePic = "images/default-profile.png"
                }

                var newUser = {
                    "fname": fname,
                    "lname": lname,
                    "email": email,
                    "password": password,
                    "username": username,
                    "jobTitle": jobTitle,
                    "tags": jobTagsArray,
                    "profilePicURL": profilePic,
                    "twitterURL": twitterURL,
                    "facebookURL": facebookURL
                };

                // Clearing all the input values
                $("#fname").val("");
                $("#lname").val("");
                $("#email").val("");
                $("#password").val("");
                $("#username").val("");
                $("#jobTitle").val("");
                $("#tags").val("");
                $("#profilePic").val("");
                $("#twitter").val("");
                $("#facebook").val("");

                // Node.js server requires ajax to post
                $.ajax({
                    type: "post",
                    url: "/users",
                    contentType: "application/json",
                    data: JSON.stringify(newUser),
                    success: function() {
                        console.log("Contact posted");
                        // Set cookie to current user
                        setCookie("username", newUser.username, true);

                        // Go to profile profile-page
                        window.location.href = "profile.html";
                    }
                });
            }
        }
    });
};

$(document).ready(function() {
    "use strict";

    $("#signup").hide();
    $(".profile-page").hide();
    main();

});