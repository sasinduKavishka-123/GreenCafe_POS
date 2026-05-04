
import {getItemData} from "../model/itemModel.js";
import {getOrderData, addOrderItemData, addOrderItemDataToDB, createOrder} from "../model/posModel.js";
import {getCustomerData} from "../model/customerModel.js";


// ------------ input fields ------------
const orderIdField      = $('#order_id_input');
const orderNameBox      = $('#order_name_input');
const orderItemBox      = $('#order_item_input');
const orderPriceField   = $('#order_price_input');
const orderStockField   = $('#order_stock_input');
const orderQtyField     = $('#order_qty_input');
const orderSubTotal     = $('#pos_order_sub_total');

const orderItemTblBody  = $('#placeOrderTBody');
const itemListTbl       = $('#placeOrderTable');
const numberFields      = $('.numInputs');

// ------------ buttons ------------
const orderResetBtn     = $('#orderResetBtn');
const orderAddBtn       = $('#orderAddBtn');
const orderCreateBtn    = $('#orderSaveBtn');
const orderClearAllBtn  = $('#orderResetAllBtn');

// ----------- variables -----------------
let orderItemTableArray = [];
let orderId     = "";
let total       = 0;
let itemId      = "";
let itemName    = "";
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
};

// ---------- reset item select field -----------------
const resetItems = ()=>{
    $('#order_item_input option').each(function (){
        if($(this).val() > -1){
            $(this).remove();
        }
    });
};

const resetSelects = ()=>{
    resetItems();
    restCustomers();
    loadItems();
    loadCustomers();
};


// ---------- fill selected item data ----------------
orderItemBox.on('change', function(){
    let itemObj = getItemData()[$(this).val()];
    itemId = itemObj.id;
    itemName = itemObj.name;
    orderPriceField.val("Rs. " + itemObj.unitPrice);
    orderStockField.val(itemObj.stock);

    selectedItemStock = itemObj.stock;
    orderQtyField.attr('max', selectedItemStock);
});


// --------- reset order form ---------------------
orderResetBtn.on('click', ()=>{
    orderPriceField.val("");
    orderStockField.val("");
    orderQtyField.val("");
    selectedItemStock = "";
    orderItemBox.val("-1");
});


// --------- clear all form ---------------------
orderClearAllBtn.on('click', ()=>{
    orderResetBtn.click();
    orderNameBox.val("-1");
    orderItemTblBody.empty();
    orderItemTableArray = [];
    calOrderTotal();
    itemId      = "";
    itemName    = "";
    getNextOrderID();
});

const clearPos = ()=>{
    orderClearAllBtn.click();
};

// --------- calculate Total ---------------------
const calOrderTotal = ()=>{
    total = 0;
    orderItemTableArray.forEach(item =>{
        total +=  +item.total;
    });
    orderSubTotal.text("Rs. " + total.toFixed(2));
};

// ------------ get next order id ----------------------
const getNextOrderID = ()=>{
    if(getOrderData().length === 0){
        orderId = "ORD_1";
    }
    else{
        let lastId = getOrderData()[getOrderData().length-1].orderId.toString();
        let num = +lastId.replace("ORD_", "") + 1;
        orderId = "ORD_"+ num;
    }
    orderIdField.val(orderId);
};
getNextOrderID();


// ------------ load order detail table ---------------
const loadOrderDetailTbl = ()=>{
    orderItemTblBody.empty();
    orderItemTableArray.map((item) =>{
        let dataSet = `${item.orderId}, ${item.itemId}, ${item.itemName}, ${item.unitPrice}, ${item.qty}, ${item.total}`;
        let newRow = `<tr data-index=${dataSet}> <td>${item.itemId}</td> <td>${item.itemName}</td> <td>Rs. ${item.unitPrice}</td> <td>${item.qty}</td> <td>Rs. ${(item.qty * item.unitPrice).toFixed(2)}</td> <td><i class="fa-solid fa-trash"></i></td> </tr>`;
        orderItemTblBody.append(newRow);
    });
};


// ------------ add item to table ----------------------
orderAddBtn.on('click', ()=>{

    let unitPrice= +(orderPriceField.val().toString().replace("Rs. ", ""));
    let itemQty  = +orderQtyField.val();
    let total = itemQty * unitPrice;

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

    orderItemTableArray.push(addOrderItemData(orderId, itemId, itemName, unitPrice.toFixed(2), itemQty, total.toFixed(2)));
    orderResetBtn.click();
    loadOrderDetailTbl();
    calOrderTotal();
});


// ------------ create order ----------------------
orderCreateBtn.on('click', ()=>{

    let cusName = orderNameBox.find('option:selected').text();
    let date = (new Date()).toDateString();

    if(orderNameBox.val() == (-1)){
        Swal.fire({
            title: "Error!",
            text: "Select A Customer!",
            icon: "warning",
            iconColor: "#ff0000"
        });
        return;
    }
    else if(orderItemTableArray.length === 0){
        Swal.fire({
            title: "Error!",
            text: "Item Table is Empty!",
            icon: "warning",
            iconColor: "#ff0000"
        });
        return;
    }

    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to save this order?",
        icon: "warning",
        iconColor: "#018c1b",
        showCancelButton: true,
        confirmButtonColor: "#09ac04",
        cancelButtonColor: "#d60808",
        confirmButtonText: "Yes, Save It!",
        footer: `<h4>Order ID: ${orderId}</h4> <h4>Customer Name: ${cusName}</h4> <h4>Date: ${date}</h4>  <h4>Grand Total: Rs.${total.toFixed(2)}</h4>`
    }).then((result) => {

        if (result.isConfirmed){
            let isAdded = addOrderItemDataToDB(orderItemTableArray);
            if(isAdded === false){
                Swal.fire({
                    title: "Error!",
                    text: "Invalid Item Count!",
                    icon: "warning",
                    iconColor: "#ff0000"
                });

                return;
            }
            createOrder(orderId, cusName, date, total.toFixed(2));
            orderClearAllBtn.click();

            Swal.fire({
                title: "Done!",
                text: "Order Saved Successfully!",
                icon: "success"
            });
        }
    });

});


// ----- initialize number fields to input only whole numbers ------
for(let i=0; i<numberFields.length; i++){
    numberFields[i].addEventListener('keydown', (e) => {
        if (['e', 'E', '+', '-'].includes(e.key)) {
            e.preventDefault();
        }
    });
}


// --------- remove table row when clicked the last cell ----------------
itemListTbl.on('click', function(event) {
    const cell = event.target.closest('td');

    // check if cell isn't null and it is the last cell in its row
    if (cell && cell.matches(':last-child')) {
        orderItemTableArray.splice(cell.closest('tr').rowIndex-1, 1);
        cell.closest('tr').remove();
        calOrderTotal();
    }

});


export {clearPos, resetSelects};