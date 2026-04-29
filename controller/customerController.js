
import {addCustomerData, updateCustomerData, deleteCustomerData, getCustomerData} from "../model/customerModel.js";
import {checkCusName, checkCusContact} from "../utils/regexUtils.js";


// ------------ input fields ------------
const cusIDField      = $('#customer_id_input');
const cusNameField    = $('#customer_name_input');
const cusContactField = $('#customer_phone_input');
const cusAddressField = $('#customer_address_input');
const cusSearchField  = $('#customer_search_input');

// ------------ buttons ------------
const cusSaveBtn      = $('#customerSaveBtn');
const cusUpdateBtn    = $('#customerUpdateBtn');
const cusDeleteBtn    = $('#customerDeleteBtn');
const cusResetBtn     = $('#customerResetBtn');
const cusSearchBtn    = $('#customerSearchBtn');

let cusTableBody = $('#customerTBody');

// ------------ variables ------------
let nextCusId = "";
let cusTableArray = [];


// ------------ load customer table ------------
const loadCusTable = () =>{
    cusTableBody.empty();
    cusTableArray = getCustomerData();
    cusTableArray.map((cus, index)=>{
        let dataset = `${cus.id}, ${cus.name}, ${cus.contact}, ${cus.address}`;
        let newRow = `<tr data-index={dataset}> <td>${cus.id}</td> <td>${cus.name}</td> <td>${cus.contact}</td> <td>${cus.address}</td> </tr>`;
        cusTableBody.append(newRow);
    });
};


// ------------ get next customer id ----------------------
const getNextCusID = ()=>{
    if(getCustomerData().length === 0){
        nextCusId = "CUS_1";
    }
    else{
        let lastId = getCustomerData()[getCustomerData().length-1].id.toString();
        let num = +lastId.replace("CUS_", "") + 1;
        nextCusId = "CUS_"+ num;
    }
    cusIDField.val(nextCusId);
};


// -------------- initialization ------------------------
getNextCusID();
loadCusTable();


// ------------ reset form ----------------------
cusResetBtn.on('click', function (){
    cusIDField.val('');
    cusNameField.val('');
    cusContactField.val('');
    cusAddressField.val('');
    cusSearchField.val('');
    getNextCusID();
    loadCusTable();
});

const cleanCustomerForm = ()=>{
  cusResetBtn.click();
};


// ----------- save customer ----------------------
cusSaveBtn.on('click', ()=>{

    let id = cusIDField.val();
    let name = cusNameField.val();
    let phone = cusContactField.val();
    let address = cusAddressField.val();

    let isInfoValid = checkInfoIsValid(name, phone, address);
    let isInfoDuplicate = checkInfoIsDuplicate(id, name, phone, "S");

    if(!isInfoValid){}
    else if(isInfoDuplicate){}
    else{
        addCustomerData(id, name, phone, address);
        cleanCustomerForm();
        Swal.fire({
            title: "Done!",
            text: "Customer Saved Successfully!",
            icon: "success"
        });
    }

});


// ----------- update customer ----------------------
cusUpdateBtn.on('click', ()=>{

    let id = cusIDField.val();
    let name = cusNameField.val();
    let phone = cusContactField.val();
    let address = cusAddressField.val();

    let isInfoValid = checkInfoIsValid(name, phone, address);
    let isInfoDuplicate = checkInfoIsDuplicate(id, name, phone, "U");

    if(id === nextCusId){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Customer ID Doesn't Exists!"
        });
    }
    else if(!isInfoValid){}
    else if(isInfoDuplicate){}
    else{

        let isUpdated = updateCustomerData(id, name, phone, address);

        if(isUpdated){
            cleanCustomerForm();
            Swal.fire({
                title: "Done!",
                text: "Customer Updated Successfully!",
                icon: "success"
            });
        }
        else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Customer Not Found!"
            });
        }
    }
});


// ----------- delete customer ----------------------
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

            deleteCustomerData(id);
            cleanCustomerForm();

            Swal.fire({
                title: "Done!",
                text: "Customer Deleted Successfully!",
                icon: "success"
            });
        }
    });

});


// ----------- search customer ----------------------
cusSearchBtn.on('click', ()=>{
    let text = cusSearchField.val().toString();
    cusTableBody.empty();
    cusTableArray = [];
    let cusArray = getCustomerData();

    if(text.startsWith("CUS_")){
        cusArray.map((cus, index)=>{
            if(cus.id.includes(text)){
                cusTableArray.push(cus);
                let dataset = `${cus.id}, ${cus.name}, ${cus.contact}, ${cus.address}`;
                let newRow = `<tr data-index={dataset}> <td>${cus.id}</td> <td>${cus.name}</td> <td>${cus.contact}</td> <td>${cus.address}</td> </tr>`;
                cusTableBody.append(newRow);
            }
        });
    }
    else{
        cusArray.map((cus, index)=>{
            if(cus.name.toLowerCase().includes(text.toLowerCase())){
                cusTableArray.push(cus);
                let dataset = `${cus.id}, ${cus.name}, ${cus.contact}, ${cus.address}`;
                let newRow = `<tr data-index={dataset}> <td>${cus.id}</td> <td>${cus.name}</td> <td>${cus.contact}</td> <td>${cus.address}</td> </tr>`;
                cusTableBody.append(newRow);
            }
        });
    }

    if(cusTableArray.length === 0){
        Swal.fire({
            title: "Oops...",
            text: "Customer Not Found!",
            icon: "warning"
        });
    }

});


// ----------- check info is valid ----------------------
const checkInfoIsValid = (name, phone, address) =>{

    if(!checkCusName(name)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Name!"
        });
        return false;
    }
    else if(!checkCusContact(phone)){
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


// ----------- check info is duplicate ------------------
const checkInfoIsDuplicate = (id, name, phone, status)=>{
    let isDuplicate = false;
    for(const cus of getCustomerData()){

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
        if(cus.name.toLowerCase() === name.toLowerCase()){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Customer Name Already Exists!"
            });
            isDuplicate = true;
            break;
        }
        if(cus.contact === phone){
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


// ----------- fill data ---------------------------------
cusTableBody.on('click', "tr", function (){
    let index = $(this).index();
    let customerObj = cusTableArray[index];

    cusIDField.val(customerObj.id);
    cusNameField.val(customerObj.name);
    cusContactField.val(customerObj.contact);
    cusAddressField.val(customerObj.address);
});