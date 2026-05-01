
import {addItemData, updateItemData, deleteItemData, getItemData} from "../model/itemModel.js";
import {checkItemName, checkItemPrice, checkItemStock} from "../utils/regexUtils.js";


// ------------ input fields ------------
const itemIDField     = $('#item_id_input');
const itemNameField   = $('#item_name_input');
const itemPriceField  = $('#item_price_input');
const itemStockField  = $('#item_stock_input');
const itemSearchField = $('#item_search_input');

// ------------ buttons ------------
const itemSaveBtn      = $('#itemSaveBtn');
const itemUpdateBtn    = $('#itemUpdateBtn');
const itemDeleteBtn    = $('#itemDeleteBtn');
const itemResetBtn     = $('#itemResetBtn');
const itemSearchBtn    = $('#itemSearchBtn');

let itemTblBody = $('#itemTBody');

// ------------ variables ------------
let nextItemId = "";
let itemTableArray = [];


// ------------ load item table ------------
const loadItemTable = () =>{
    itemTblBody.empty();
    itemTableArray = getItemData();
    itemTableArray.map((item, index)=>{
        let dataset = `${item.id}, ${item.name}, ${item.unitPrice}, ${item.stock}`;
        let newRow = `<tr data-index={dataset}> <td>${item.id}</td> <td>${item.name}</td> <td>Rs. ${item.unitPrice}</td> <td>${item.stock}</td> </tr>`;
        itemTblBody.append(newRow);
    });
};


// ------------ get next item id ----------------------
const getNextItemID = ()=>{
    if(getItemData().length === 0){
        nextItemId = "ITEM_1";
    }
    else{
        let lastId = getItemData()[getItemData().length-1].id;
        let num = +lastId.toString().replace("ITEM_", "") + 1;
        nextItemId = "ITEM_"+ num;
    }
    $('#item_id_input').val(nextItemId);
};


// -------------- initialization ------------------------
getNextItemID();
loadItemTable();


// ------------ reset form ----------------------
itemResetBtn.on('click', ()=> {
    clearItemForm();
});

const clearItemForm = ()=>{
    itemIDField.val('');
    itemNameField.val('');
    itemPriceField.val('');
    itemStockField.val('');
    itemSearchField.val('');
    getNextItemID();
    loadItemTable();
};


// ----------- save item ----------------------
itemSaveBtn.on('click', ()=>{

    let id       = itemIDField.val();
    let name     = itemNameField.val();
    let unitPrice= itemPriceField.val();
    let stock    = itemStockField.val();

    let isInfoValid = checkInfoIsValid(name, unitPrice, stock);
    let isInfoDuplicate = checkInfoIsDuplicate(id, name, "S");

    if(!isInfoValid){}
    else if(isInfoDuplicate){}
    else{
        let priceNum = +unitPrice;
        addItemData(id, name, (priceNum.toFixed(2)), stock);
        clearItemForm();
        Swal.fire({
            title: "Done!",
            text: "Item Saved Successfully!",
            icon: "success"
        });
    }
});


// ----------- update item ----------------------
itemUpdateBtn.on('click', ()=>{
    let id      = itemIDField.val();
    let name    = itemNameField.val();
    let price   = itemPriceField.val();
    let stock = itemStockField.val();

    let isInfoValid = checkInfoIsValid(name, price, stock);
    let isInfoDuplicate = checkInfoIsDuplicate(id, name, "U");

    if(id === nextItemId){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Item ID Doesn't Exists!"
        });
    }
    else if(!isInfoValid){}
    else if(isInfoDuplicate){}
    else{
        let priceNum = +price;
        let isUpdated = updateItemData(id, name, (priceNum.toFixed(2)), stock);

        if(isUpdated){
            clearItemForm();
            Swal.fire({
                title: "Done!",
                text: "Item Updated Successfully!",
                icon: "success"
            });
        }
        else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Item Not Found!"
            });
        }
    }
});


// ----------- check info is valid ----------------------
const checkInfoIsValid = (name, unitPrice, stock) =>{

    if(!checkItemName(name)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Name!"
        });
        return false;
    }
    else if(!checkItemPrice(unitPrice)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Unit Price!"
        });
        return false;
    }
    else if(!checkItemStock(stock)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Stock Number!"
        });
        return false;
    }

    return true;
};


// ----------- delete customer ----------------------
itemDeleteBtn.on('click', ()=>{
    let id = itemIDField.val();

    if(id === nextItemId){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Item ID Doesn't Exists!"
        });
        return;
    }

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

            deleteItemData(id);
            clearItemForm();

            Swal.fire({
                title: "Done!",
                text: "Item Deleted Successfully!",
                icon: "success"
            });
        }
    });

});


// ----------- search customer ----------------------
itemSearchBtn.on('click', ()=>{
    let text = itemSearchField.val().toString();
    itemTblBody.empty();
    itemTableArray = [];
    let itemArray = getItemData();

    if(text.startsWith("ITEM_")){
        itemArray.map((item, index)=>{
            if(item.id.includes(text)){
                itemTableArray.push(item);
                let dataset = `${item.id}, ${item.name}, ${item.unitPrice}, ${item.stock}`;
                let newRow = `<tr data-index={dataset}> <td>${item.id}</td> <td>${item.name}</td> <td>Rs. ${item.unitPrice}</td> <td>${item.stock}</td> </tr>`;
                itemTblBody.append(newRow);
            }
        });
    }
    else{
        itemArray.map((item, index)=>{
            if(item.name.toLowerCase().includes(text.toLowerCase())){
                itemTableArray.push(item);
                let dataset = `${item.id}, ${item.name}, ${item.unitPrice}, ${item.stock}`;
                let newRow = `<tr data-index={dataset}> <td>${item.id}</td> <td>${item.name}</td> <td>Rs. ${item.unitPrice}</td> <td>${item.stock}</td> </tr>`;
                itemTblBody.append(newRow);
            }
        });
    }

    if(itemTableArray.length === 0){
        Swal.fire({
            title: "Oops...",
            text: "Item Not Found!",
            icon: "warning"
        });
    }

});


// ----------- check info is duplicate ------------------
const checkInfoIsDuplicate = (id, name, status)=>{
    let isDuplicate = false;
    for(const item of getItemData()){

        if((item.id === id) && (status === "U")){
            continue;
        }

        if(item.id === id){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Item ID Already Exists!"
            });
            isDuplicate = true;
            break;
        }
        if(item.name.toLowerCase() === name.toLowerCase()){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Item Name Already Exists!"
            });
            isDuplicate = true;
            break;
        }
    }
    return isDuplicate;
};


// ----------- fill data ---------------------------------
itemTblBody.on('click', "tr", function (){
    let index = $(this).index();
    let itemObj = itemTableArray[index];

    itemIDField.val(itemObj.id);
    itemNameField.val(itemObj.name);

    let price = itemObj.unitPrice.toString().replace("RS. ", "");

    itemPriceField.val(price);
    itemStockField.val(itemObj.stock);
});

export {clearItemForm};