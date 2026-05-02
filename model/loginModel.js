
import {userArray} from "../db/db.js";


// --------- user class ----------------------
class User{
    #userName;
    #password;

    constructor(userName, password) {
        this.#userName = userName;
        this.#password = password;
    }

    get userName() {
        return this.#userName;
    }

    set userName(userName) {
        this.#userName = userName;
    }

    get password() {
        return this.#password;
    }

    set password(password) {
        this.#password = password;
    }
}


// ------------ create users ---------------
const addUser = (name, password)=>{
    let newUser = new User(name, password);
    userArray.push(newUser);
    console.log(newUser);       //----- print user details on console
};

// ------ check user data ------------------
const checkUserData = (name, password)=>{
    for(let i=0; i<userArray.length; i++){
        if((userArray[i].userName === name) && (userArray[i].password === password)){
            return true;
        }
    }
    return false;
};


export {addUser, checkUserData};