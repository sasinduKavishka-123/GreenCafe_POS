
import {getCustomerData} from "../model/customerModel.js";
import {getItemData} from "../model/itemModel.js";


// ------------ input fields ------------
const orderNameBox      = $('#order_name_input');
const orderItemBox      = $('#order_item_input');
const orderPriceField   = $('#order_price_input');
const orderStockField   = $('#order_stock_input');
const orderQtyField     = $('#order_qty_input');

// ------------ buttons ------------
const orderResetBtn = $('#orderResetBtn');
const orderAddBtn = $('#orderAddBtn');
const orderCreateBtn = $('#orderSaveBtn');


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


orderItemBox.on('change', function(){
    let itemObj = getItemData()[$(this).val()];
    orderPriceField.val(itemObj.unitPrice);
    orderStockField.val(itemObj.stock);
});


// --------- reset order form ---------------------
orderResetBtn.on('click', ()=>{
    restCustomers();
    resetItems();
});

orderAddBtn.on('click', ()=>{

});

export {loadItems, loadCustomers};