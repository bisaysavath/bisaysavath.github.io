var updateProfile = function(user) {
    "use strict";

    // Clear the page
    $("main .container").empty();
    $("main .container").hide();

    // Name and lastname input

    var $fnameLabel = $("<h3>").append("First name");

    var $fname = $("<input>").attr({
        "class": "edit-user-fname",
        "type": "text",
        "value": user.fname
    });

    var $lnameLabel = $("<h3>").append("Last name");

    var $lname = $("<input>").attr({
        "class": "edit-user-lname",
        "type": "text",
        "value": user.lname
    });

    var $jobTitleLabel = $("<h3>").append("Job title");

    var $jobTitle = $("<input>").attr({
        "class": "edit-user-jobTitle",
        "type": "text",
        "value": user.jobTitle
    });

    var $profileURLLabel = $("<h3>").append("Profile picture URL");

    var $profileURL = $("<input>").attr({
        "class": "edit-user-profilePicURL",
        "type": "text",
        "value": user.profilePicURL
    });

    var $tagLabel = $("<h3>").append("Tags");
    var stringTag = user.tags.join(", ");
    var $tag = $("<input>").attr({
        "class": "edit-user-tag",
        "type": "text",
        "value": stringTag
    });

    var $cancelButton = $("<button>").append("Cancel").attr("id", "cancleButton");

    $cancelButton.on("click", function() {
        window.location.reload();
    });

    var $submitButton = $("<button>").append("Submit").attr("id", "submitButton");

    $submitButton.on("click", function() {

        console.log("submited");
        var url = "/users/" + user.id;

        // Handles empty tags
        var jobTagsArray = [];
        if($tag.val() !== "") {
            jobTagsArray = $tag.val().split(",");

            // Turn tags into array and get rid of any spaces
            for (var index = 0; index < jobTagsArray.length; index++) {
                var tempString = jobTagsArray[index];
                if (tempString.indexOf(" ") === 0) {
                    jobTagsArray[index] = tempString.substring(1);
                }
            }
        }

        var newUser = {
            "id": user.id,
            "fname": $fname.val(),
            "lname": $lname.val(),
            "jobTitle": $jobTitle.val(),
            "profilePicURL": $profileURL.val(),
            "twitterURL": user.twitterURL,
            "facebookURL": user.facebookURL,
            "tags": jobTagsArray,
            "email": user.email,
            "username": user.username,
            "password": user.password
        };

        $.ajax({
            type: "post",
            url: url,
            contentType: "application/json",
            data: JSON.stringify(newUser),
            success: function() {
                console.log("Profile updated");

                // Reload profile-page
                window.location.reload();
            }
        });
    });

    $("main .container").append($("<span>").append($fnameLabel, $fname, $lnameLabel, $lname,
        $jobTitleLabel, $jobTitle, $profileURLLabel, $profileURL, $tagLabel, $tag, $("<br>"),
        $cancelButton, $submitButton));
    $("main .container").slideDown();
};

var main = function() {
    "use strict";

    var username = getCookie("username");

    // If user hasn't signed in yet, create a main body prompting user to go to signup.html
    if (username === "") {
        // console.log("no");
        var $header = $("<h2>").text = "Please login first";
        var $button = $("<button>");
        $button.append("Log in");

        $("main .container .user-name").append($header);
        $("main .container .user-title").append($button);
    } else // Load that specific info about user from db.json
    {
        $.get("/users", function(users) {
            users.forEach(function(user) {
                if (user.username === username) {
                    // Load profile picture
                    var $profielPic = $("<img>").attr({
                        "class": "profile-picture",
                        "src": user.profilePicURL,
                        "width": "auto",
                        "height": "auto",
                        "alt": user.username
                    });

                    $(".user-pic").append($profielPic);

                    // Set user's name
                    $("h2.user-name").append(user.fname + " " + user.lname);

                    // Set user's social media
                    // Twitter
                    var $twitterURL = $("<a>").attr({
                        "id": "twitterURL",
                        "href": user.twitterURL
                    });
                    var $twitterIcon = $("<i>").attr("class", "fa fa-twitter");
                    $twitterURL.append($twitterIcon);

                    // Facebook
                    var $facebookURL = $("<a>").attr({
                        "id": "facebookURL",
                        "href": user.facebookURL
                    });
                    var $facebookIcon = $("<i>").attr("class", "fa fa-facebook");
                    $facebookURL.append($facebookIcon);

                    $(".user-social-media").append($twitterURL, $facebookURL);

                    // Set user's title
                    $(".user-title").append(user.jobTitle);

                    // Set user's tags
                    user.tags.forEach(function(tag) {

                        // tags array holds an empty string when user didn't input tags
                        if (tag !== "") {
                            var $tagSpan = $("<span>").append(" #" + tag);

                            $tagSpan.on("click", function() {
                                // If tags are clicked, set cookie to hold on that tag
                                setCookie("tag", tag);
                                window.location.href = ("discover.html");
                            });
                        }

                        $(".user-tags").append($tagSpan);
                    });

                    var isLogIn = getCookie("login");

                    if (isLogIn === "yes") {
                        var $editButton = $("<button>").append("Edit");

                        $editButton.on("click", function() {
                            updateProfile(user);
                        });

                        $("main .edit-button").append($editButton);
                    }

                }
            });
        });
    }

    $("main .container .user-title button").on("click", function() {
        window.location.href = "login.html";
    });
};

$(document).ready(main);