var urlBase = 'http://puffs.live/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin()
{
    //Get data from form
    var login = document.getElementById("loginName").value;
    var password = document.getElementById("loginPassword").value;

    document.getElementById("loginResult").innerHTML = "";

    //Send data to php script
    var jsonPayLoad = '{"login" : "' + login + '", "password" : "' + password + '"}';
    var url = urlBase + '/Login.'+extension;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    //What am I expecting to get back
    xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");

    try
    {
        //sent
        xhr.send(jsonPayLoad);
        
        //Prepare the response
        var jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;

        if(userId < 1)
        {
            document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
        }

        firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;
        
        setCookie("userID", userId);
        setCookie("firstName", firstName);
        setCookie("lastName", lastName);

        //where to send them to after they are authenticated
        window.location.href = "home.html";
    } 
    catch (err)
    {
        document.getElementById("loginResult").innerHTML = err.message;
    }
}

function doRegister()
{
    const firstName = document.getElementById("Firstname").value;
    const lastName = document.getElementById("Lastname").value;
    const email = document.getElementById("Email").value;
    const phoneNumber = document.getElementById("PhoneNumber").value;
    const login = document.getElementById("loginName").value;
    const password = document.getElementById("loginPassword").value;

    // This is my guess for the what the register endpoint will be like.

    document.getElementById("registerResult").innerHTML = "";

    // Prepping JSON

    // JSON fields are login, password, firstname, lastname, email, phonenumber
    let jsonPayLoad = '{"login" : "' + login + '", "password" : "' + password + '", "firstName" : "' + firstName + '",  "lastName" : "' + lastName + '", "email" : "' + email + '", "phonenumber" : "' + phoneNumber + '" }';
    const url = urlBase + '/Register.' + extension;
    const xhr = new XMLHttpRequest();

    xhr.open("POST", url, false);
    // What we expect to recieve back
    xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");

    try
    {
        // Send request
        xhr.send(jsonPayLoad);
        
        // Need to check if registering worked.
        const jsonObject = JSON.parse(xhr.responseText);

        // Redirect
        window.location.href = "index.html"; // Send back to login screen.
    }
    catch(err)
    {
        document.getElementById("registerResult").innerHTML = err.message;
    }
}

function addContact() {
    loadCookie();

    const firstName = document.getElementById("Firstname").value;
    const lastName = document.getElementById("Lastname").value;
    const email = document.getElementById("Email").value;
    const phoneNumber = document.getElementById("PhoneNumber").value;
    const streetAddress = document.getElementById("Street").value;
    const city = document.getElementById("City").value;
    const state = document.getElementById("State").value;
    const zip_code = document.getElementById("ZipCode").value;

    document.getElementById("addResult").innerHTML = "";

    // Prepping JSON

    // JSON fields are login, password, firstname, lastname, email, phonenumber
    let jsonPayLoad = '{"user_ID" : ' + userId + ', "FirstName" : "' + firstName + '", "LastName" : "' + lastName + '",  "Email" : "' + email + '", "PhoneNumber" : "' + phoneNumber + '", "StreetAddress" : "' + streetAddress + '", "City" : "' + city + '", "State" : "' + state + '", "ZIP_Code" : "' + zip_code + '"}';
    const url = urlBase + '/add.' + extension;
    const xhr = new XMLHttpRequest();

    xhr.open("POST", url, false);
    // What we expect to recieve back
    xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");

    try
    {
        // Send request
        xhr.send(jsonPayLoad);
        
        // Need to check if registering worked.
        const jsonObject = JSON.parse(xhr.responseText);


        // Redirect
        window.location.href = "home.html"; // Send back to home screen.
    }
    catch(err)
    {
        document.getElementById("addResult").innerHTML = err.message;
    }
}

function deleteContact() {
    const contactID = document.getElementById("contactID").value;

    loadCookie();

    // Prepping JSON

    // JSON fields are login, password, firstname, lastname, email, phonenumber
    let jsonPayLoad = '{"user_ID" : ' + userId + ', "ID" : "' + contactID + '"}';
    const url = urlBase + '/Delete.' + extension;
    const xhr = new XMLHttpRequest();

    xhr.open("POST", url, false);
    // What we expect to recieve back
    xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");

    try
    {
        // Send request
        xhr.send(jsonPayLoad);
        
        // Need to check if registering worked.
        const jsonObject = JSON.parse(xhr.responseText);

    }
    catch(err)
    {
        document.getElementById("registerResult").innerHTML = err.message;
    }
}

//json array to get data
function doSearch()
{
    loadCookie();
    const dropDown = document.getElementsByClassName("selectSearchbar")[0];
    const index = dropDown.selectedIndex;
    const tag = dropDown.options[index].text
    const term = document.getElementById("searchBox").value;

    let jsonPayLoad = '{"user_ID": ' + userId + '"search_field" : "' + tag + '", "search_criteria" : "' + term + '"}';

    const names = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const email = ['a@mail.com', 'b@mail.com', 'c@mail.com', 'd@mail.com', 'e@mail.com', 'f@mail.com', 'g@mail.com', 'h@mail.com', 'i@mail.com', 'j@mail.com'];
    const number = ['407-555-1234', '407-555-1234', '407-555-1234', '407-555-1234', '407-555-1234', '407-555-1234', '407-555-1234', '407-555-1234', '407-555-1234', '407-555-1234'];
    const address = ['123 Street St', '123 Street St', '123 Street St', '123 Street St', '123 Street St', '123 Street St', '123 Street St', '123 Street St', '123 Street St', '123 Street St'];


    let resultArea = document.getElementsByClassName("search-results")[0];

    // Build search result cards
    // this is a temporary loop, will loop through json responses
    // believe me, this could of been way worse
    for(let i = 0; i < 10; i++)
    {
       resultArea.innerHTML += '<div class="search-result" id=' + i + '>' + 
                                    '<div class="row">' + 
                                        ' <div class="col-8 container-fluid card">' + 
                                            '<h1 class="card-title me-auto contact-name" id="contact-name">' + 
                                               names[i] + 
                                            '</h1>' + 
                                            '<div class="row">' + 
                                                '<div class="col-6 text-start" id="email">' + email[i] + '</div>' + 
                                                '<div class="col-6 text-end" id="phone-number">' + number[i] + '</div>' + 
                                            '</div>' + 
                                            '<div class="row">' + 
                                                '<p class="me-auto" id="address">' + address[i] + '</p>' + 
                                            '</div>' + 
                                        '</div>' + 
                                        '<div class="col-4 container-fluid button-area">' + 
                                            '<span class="align-top">' +
                                                '<button class="contact-button btn btn-info" id="updateBtn" onClick = "doUpdate(' + i + ',' + fNames[i] +  ',' + lNames[i] + ',' + + number[i] + ',' + street[i] + ',' + city[i] + ',' + state[i] + ',' + zipcode[i] + ');">✏</button>' + //ID should be i
                                            '</span>' + 
                                            '<span class="align-bottom">' + 
                                                '<button class="contact-button btn btn-danger" onClick = "doDelete(' + i + ');">✖</button>' +
                                            ' </span>' + 
                                        '</div>' + 
                                    '</div>' +
                                '</div>';
    }
}

function doLogout()
{
    userId = 0;
    firstName = "";
    lastName = "";

    deleteCookie();
}

function setCookie(propertyName, propertyValue) {
    var d = new Date();
    d.setTime(d.getTime + 1000*60*20);
    var expires = "expires="+d.toUTCString();
    document.cookie = propertyName + "=" + propertyValue + ";" + expires + ";path=/";
}

function getCookie(propertyName) {
    var name = propertyName + "=";
    var propertyArray = document.cookie.split(";");
    for(var i = 0; i< propertyArray.length; i++) {
        var property = propertyArray[i];
        while(property.charAt(0) == ' ') {
            property = property.substring(1);
        }
        if(property.indexOf(name) == 0) {
            return property.substring(name.length, property.length);
        }
    }
    return "";
}

function loadCookie() {
    var user_ID = getCookie("userID");
    if(user_ID != "") {
        userId = user_ID;
        firstName = getCookie("firstName");
        lastName = getCookie("lastName");
    } else {
        userId = -1;
        firstName = "";
        lastName = "";
    }
    
}

function deleteCookie() {
    document.cookie = "expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function goToAdd()
{
    window.location.href = "add.html";
}

function doUpdate(id, firstName, lastName, phone, street, city, state, zipcode)
{
    //alert("PLACEHOLDER: update called for id: " + id);
    //construct a modal, prefill with information from current card
    //submit onclick="sendUpdate();"
    //after JSON request is sent, reload home.html
    //var updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
    
    var updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
    updateModal.show();
    //figure out the close buttons

}

//maybe obsolete
function sendUpdate(){
    //grab the info from the modal and package JSON
    //to send 
}

function doDelete(id)
{
    alert("PLACEHOLDER: delete called for id: " + id);
}


// Allows for clicking enter to login
let fileName = location.href.split("/").slice(-1);
if(fileName == "index.html")
{   
    document.getElementById("login-div").addEventListener("keydown", function(e)
    {
        if(e.key == "Enter")
        {
            const loginName = document.getElementById("loginName").value;
            const password = document.getElementById("loginPassword").value;

            if(loginName != "" && password != "")
                doLogin();
        }
    });
}

if(userId > 0)
    document.getElementById("loggedInAs").innerHTML += firstName + " " + lastName;
