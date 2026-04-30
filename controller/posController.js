
import {getItemData} from "../model/itemModel.js";
import {getOrderData, getOrderItemData} from "../model/posModel.js";
import {getCustomerData} from "../model/customerModel.js";


// ------------ input fields ------------
const orderIdField      = $('#order_id_input');
const orderNameBox      = $('#order_name_input');
const orderItemBox      = $('#order_item_input');
const orderPriceField   = $('#order_price_input');
const orderStockField   = $('#order_stock_input');
const orderQtyField     = $('#order_qty_input');

const numberFields      = $('.numInputs');

// ------------ buttons ------------
const orderResetBtn     = $('#orderResetBtn');
const orderAddBtn       = $('#orderAddBtn');
const orderCreateBtn    = $('#orderSaveBtn');
const orderClearAllBtn  = $('#orderResetAllBtn');

// ----------- variables -----------------
let orderItemTable = [];
let orderId = "";
let total = "";
let itemId = "";
let selectedItemStock = "";


// ---------- load customer select field -----------------
const loadCustomers = ()=>{
    let options = "";
    getCustomerData().forEach((cus, index) =>{
        options += `<option value="${index}">${cus.name}</option>`;
    });
    orderNameBox.append(options);
};


// ---------- load item select field -----------------
const loadItems = ()=>{
    let options = "";
    getItemData().forEach((item, index) =>{
        options += `<option value="${index}">${item.name}</option>`;
    });
    orderItemBox.append(options);
};


// ---------- reset customer select field -----------------
const restCustomers = ()=>{
    $('#order_name_input option').each(function (){
        if($(this).val() > -1){
            $(this).remove();
        }
    });
    loadCustomers();
};

// ---------- reset item select field -----------------
const resetItems = ()=>{
    $('#order_item_input option').each(function (){
        if($(this).val() > -1){
            $(this).remove();
        }
    });
    loadItems();
};

// ---------- fill selected item data ----------------
orderItemBox.on('change', function(){
    let itemObj = getItemData()[$(this).val()];
    itemId = itemObj.id();
    orderPriceField.val(itemObj.unitPrice);
    orderStockField.val(itemObj.stock);

    selectedItemStock = itemObj.stock;
    orderQtyField.attr('max', selectedItemStock);
});


// --------- reset order form ---------------------
orderResetBtn.on('click', ()=>{
    restCustomers();
    resetItems();
    orderPriceField.val("");
    orderStockField.val("");
    orderQtyField.val("");
    selectedItemStock = "";
});


// ------------ get next order id ----------------------
const getNextOrderID = ()=>{
    if(getOrderData().length === 0){
        orderId = "ORD_1";
    }
    else{
        let lastId = getOrderData()[getOrderData().length-1].id.toString();
        let num = +lastId.replace("ORD_", "") + 1;
        orderId = "ORD_"+ num;
    }
    orderIdField.val(orderId);
};


orderAddBtn.on('click', ()=>{

    let itemQty = orderQtyField.val();

    if(orderItemBox.val() == (-1)){
        Swal.fire({
            title: "Error!",
            text: "Select An Item!",
            icon: "warning",
            iconColor: "#ff0000"
        });
        return;
    }
    else if(itemQty > selectedItemStock){
        Swal.fire({
            title: "Error!",
            text: "Invalid Item Count!",
            icon: "warning",
            iconColor: "#ff0000"
        });
        return;
    }
    else if(itemQty == 0){
        Swal.fire({
            title: "Error!",
            text: "Enter Item Count!",
            icon: "warning",
            iconColor: "#ff0000"
        });
        return;
    }
});

for(let i=0; i<numberFields.length; i++){
    numberFields[i].addEventListener('keydown', (e) => {
        if (['e', 'E', '+', '-'].includes(e.key)) {
            e.preventDefault();
        }
    });
}



export {loadItems, loadCustomers, getNextOrderID};