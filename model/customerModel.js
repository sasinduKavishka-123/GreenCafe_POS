
import{customersArray} from "../db/db.js";

// --------- customer class ---------
class Customer{
    #id;
    #name;
    #contact;
    #address;
    constructor(id, name, contact, address) {
        this.#id = id;
        this.#name = name;
        this.#contact = contact;
        this.#address = address;
    }

    get id(){
        return this.#id;
    }
    get name(){
        return this.#name;
    }
    get contact(){
        return this.#contact;
    }
    get address(){
        return this.#address;
    }

    set id(id){
        this.#id = id;
    }
    set name(name){
        this.#name = name;
    }
    set contact(contact){
        this.#contact = contact;
    }
    set address(address){
        this.#address = address;
    }
}


// --------- save customer ---------------
const addCustomerData = (id, name, contact, address)=>{
    customersArray.push(new Customer(id, name, contact, address));
};


// --------- update customer ---------------
const updateCustomerData = (id, name, contact, address)=>{
    let cusObj = customersArray.find(cus => cus.id === id);

    if(cusObj){
        cusObj.name = name;
        cusObj.contact = contact;
        cusObj.address = address;
        return true;
    }
    else{
        return false;
    }
};

// --------- delete customer ---------------
const deleteCustomerData = (id)=>{
    let index = customersArray.findIndex(cus => cus.id === id);
    if(index !== -1){
        customersArray.splice(index, 1);
    }
};


// --------- get customer data ---------------
const getCustomerData = ()=>{
    return customersArray;
};

export {addCustomerData, updateCustomerData, deleteCustomerData, getCustomerData};