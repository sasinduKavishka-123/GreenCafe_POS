
import {addUser, checkUserData} from "../model/loginModel.js";


// -------- sections ---------------------
const app   = $("#app");
const login = $("#login");

// -------- inputs ---------------------
const inputUserName = $("#inputUserName");
const inputPassword = $("#inputPassword");
const loginBtn      = $("#loginBtn");
const dateHolder    = $("#navDateHolder");
const nameHolder    = $("#navNameHolder");


// --------- create example users on start -----------
addUser("Sasindu Kavishka", "Sas@123");
addUser("Sachini Dilhara", "Dil@123");

// ---------- login ----------------------
loginBtn.on('click',()=>{
    let userName = inputUserName.val();
    let password = inputPassword.val();

    let isCorrect = checkUserData(userName, password);

    if(isCorrect === true){
        app.css({display: 'block'});
        login.css({display: 'none'});

        dateHolder.text("Date:" + new Date().toDateString());
        nameHolder.text("User Name:" + userName);

        inputUserName.val("");
        inputPassword.val("");

        Swal.fire({
            icon: "success",
            title: "Login Conformed!",
            text: "Welcome, " + userName,
            showConfirmButton: false,
            timer: 2000
        });
    }
    else{
        Swal.fire({
            icon: "error",
            titleText: "Login Fail!",
            text: "Invalid User Name or Password."
        });
    }

});

export {app, login};