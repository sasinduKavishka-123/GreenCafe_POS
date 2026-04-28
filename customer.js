
// customer class
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

let customersArray = [ new Customer("CUS_1", "Kavindu", "0112908765", "Kelaniya"),
                                 new Customer("CUS_2", "Anjana", "0718967234", "Kadawatha"),
                                 new Customer("CUS_3", "Perera", "0725644231", "Panadura"),
                                 new Customer("CUS_4", "Supun", "0713478654", "Boralla"),
                                 new Customer("CUS_5", "Kelum", "0113675121", "Ampara")];

const cusContactRegex = new RegExp('^\\d{10}$');
const cusNameRegex = new RegExp('^[a-zA-Z\\s]{4,}$');

// input fields
let cusIDField = $('#customer_id_input');
let cusNameField = $('#customer_name_input');
let cusContactField = $('#customer_phone_input');
let cusAddressField = $('#customer_address_input');
let cusSearchField = $('#customer_search_input');

// buttons
let cusSaveBtn = $('#customerSaveBtn');
let cusUpdateBtn = $('#customerUpdateBtn');
let cusDeleteBtn = $('#customerDeleteBtn');
let cusResetBtn = $('#customerResetBtn');
let cusSearchBtn = $('#customerSearchBtn');

let cusTableBody = $('#customerTBody');

// variables
let nextCusId = "CUS_"+ (customersArray.length+1);

cusIDField.val(nextCusId);

// load customer table
const loadCusTable = () =>{
    cusTableBody.empty();
    customersArray.map((cus, index)=>{
        let dataset = `${cus.id}, ${cus.name}, ${cus.contact}, ${cus.address}`;
        let newRow = `<tr data-index={dataset}> <td>${cus.id}</td> <td>${cus.name}</td> <td>${cus.contact}</td> <td>${cus.address}</td> </tr>`;
        cusTableBody.append(newRow);
    });
};

loadCusTable();

// reset form
cusResetBtn.on('click', function (){
    cusIDField.val(nextCusId);
    cusNameField.val('');
    cusContactField.val('');
    cusAddressField.val('');
    getNextCusID();
    loadCusTable();
});

const cleanCustomerForm = ()=>{
  cusResetBtn.click();
};

//get next customer id

const getNextCusID = ()=>{
    if(customersArray.length === 0){
        nextCusId = "CUS_1";
    }
    else{
        let lastId = customersArray[customersArray.length-1].id.toString();
        let num = +lastId.replace("CUS_", "") + 1;
        nextCusId = "CUS_"+ num;
    }
    cusIDField.val(nextCusId);
};

// save customer
cusSaveBtn.on('click', ()=>{

    let id = cusIDField.val();
    let name = cusNameField.val();
    let phone = cusContactField.val();
    let address = cusAddressField.val();

    let isInfoValid = checkInfoIsValid(name, phone, address);
    let isInfoDuplicate = checkInfoIsDuplicate(id, name, phone, "S");

    if(!isInfoValid){}
    else if(isInfoDuplicate){
        console.log(isInfoDuplicate);
    }
    else{
        console.log(isInfoDuplicate);
        let customer = new Customer(id, name, phone, address);
        customersArray.push(customer);
        cleanCustomerForm();
        Swal.fire({
            title: "Saved!",
            text: "customer Saved Successfully!",
            icon: "success"
        });
    }

});

// update customer
cusUpdateBtn.on('click', ()=>{

    let id = cusIDField.val();
    let name = cusNameField.val();
    let phone = cusContactField.val();
    let address = cusAddressField.val();

    let isInfoValid = checkInfoIsValid(name, phone, address);
    let isInfoDuplicate = checkInfoIsDuplicate(id, name, phone, "U");

    if(!isInfoValid){}
    else if(isInfoDuplicate){}
    else{
        let customer = new Customer(id, name, phone, address);

        let cusObj = customersArray.find(cus => cus.id === id);

        if(cusObj){
            cusObj.name = customer.name;
            cusObj.contact = customer.contact;
            cusObj.address = customer.address;
        }
        else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Customer Not Found!"
            });
        }

        cleanCustomerForm();
        Swal.fire({
            title: "Saved!",
            text: "customer Updated Successfully!",
            icon: "success"
        });
    }

});

// delete customer
cusDeleteBtn.on('click', ()=>{
    let id = cusIDField.val();

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {

        if (result.isConfirmed){

            let index = customersArray.findIndex(cus => cus.id === id);
            if(index !== -1){
                customersArray.splice(index, 1);
            }
            cleanCustomerForm();

            Swal.fire({
                title: "Deleted!",
                text: "Customer Deleted Successfully!",
                icon: "success"
            });
        }
    });

});

// search customer
cusSearchBtn.on('click', ()=>{
    let text = cusSearchField.val().toString();
    cusTableBody.empty();
    customersArray.map((cus, index)=>{

        if(cus.id.includes(text)){
            let dataset = `${cus.id}, ${cus.name}, ${cus.contact}, ${cus.address}`;
            let newRow = `<tr data-index={dataset}> <td>${cus.id}</td> <td>${cus.name}</td> <td>${cus.contact}</td> <td>${cus.address}</td> </tr>`;
            cusTableBody.append(newRow);
        }
    });
});

// check info is valid
const checkInfoIsValid = (name, phone, address) =>{

    if(!cusNameRegex.test(name)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Name!"
        });
        return false;
    }
    else if(!cusContactRegex.test(phone)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Contact Number!"
        });
        return false;
    }
    else if(address===""){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Address!"
        });
        return false;
    }

    return true;
};

// check info is duplicate
const checkInfoIsDuplicate = (id, name, phone, status)=>{
    let isDuplicate = false;
    for(const cus of customersArray){

        if((cus.id === id) && (status === "U")){
            continue;
        }

        if(cus.id === id){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Customer ID Already Exists!"
            });
            isDuplicate = true;
            break;
        }
        if(cus.name === name){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Customer Name Already Exists!"
            });
            isDuplicate = true;
            break;
        }
        if(cus.contact === phone){
            console.log('ddddddd');
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Customer Contact Already Exists!"
            });
            isDuplicate = true;
            break;
        }
    }
    return isDuplicate;
};


// fill data
cusTableBody.on('click', "tr", function (){
    let index = $(this).index();
    let customerObj = customersArray[index];

    cusIDField.val(customerObj.id);
    cusNameField.val(customerObj.name);
    cusContactField.val(customerObj.contact);
    cusAddressField.val(customerObj.address);
});