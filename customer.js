
let customersArray = [];
const cusContactRegex = new RegExp('^\\d{10}$');
const cusNameRegex = new RegExp('^[a-zA-Z]{4,}$');

// input fields
let cusIDField = $('#customer_id_input');
let cusNameField = $('#customer_name_input');
let cusContactField = $('#customer_phone_input');
let cusAddressField = $('#customer_address_input');

// buttons
let cusSaveBtn = $('#customerSaveBtn');
let cusUpdateBtn = $('#customerUpdateBtn');
let cusDeleteBtn = $('#customerDeleteBtn');
let cusResetBtn = $('#customerResetBtn');

let cusTableBody = $('#customerTBody');

// variables
let nextCusId = "CUS_"+ (customersArray.length+1);

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

cusIDField.val(nextCusId);

// reset form
cusResetBtn.on('click', function (){
    cusIDField.val(nextCusId);
    cusNameField.val('');
    cusContactField.val('');
    cusAddressField.val('');
    getNextCusID();
});

const cleanCustomerForm = ()=>{
  cusResetBtn.click();
};

//get next customer id

const getNextCusID = ()=>{
    nextCusId = "CUS_"+ (customersArray.length+1);
    cusIDField.val(nextCusId);
};

// save customer
cusSaveBtn.on('click', ()=>{

    let id = cusIDField.val();
    let name = cusNameField.val();
    let phone = cusContactField.val();
    let address = cusAddressField.val();

    if(!cusNameRegex.test(name)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Name!"
        });
    }
    // else if(!cusContactRegex.test(phone)){
    //     Swal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: "Invalid Contact Number!"
    //     });
    // }
    else if(address===""){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Address!"
        });
    }
    else{
        let customer = new Customer(id, name, phone, address);
        customersArray.push(customer);
        cleanCustomerForm();
        loadCusTable();
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

    if(!cusNameRegex.test(name)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Name!"
        });
    }
    // else if(!cusContactRegex.test(phone)){
    //     Swal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: "Invalid Contact Number!"
    //     });
    // }
    else if(address===""){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Address!"
        });
    }
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
        loadCusTable();
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
            loadCusTable();
            cleanCustomerForm();

            Swal.fire({
                title: "Deleted!",
                text: "Customer Deleted Successfully!",
                icon: "success"
            });
        }
    });

});

// load customer table
const loadCusTable = () =>{
    cusTableBody.empty();
    customersArray.map((cus, index)=>{
        let dataset = `${cus.id}, ${cus.name}, ${cus.contact}, ${cus.address}`;
        let newRow = `<tr data-index={dataset}> <td>${cus.id}</td> <td>${cus.name}</td> <td>${cus.contact}</td> <td>${cus.address}</td> </tr>`;
        cusTableBody.append(newRow);
    });
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