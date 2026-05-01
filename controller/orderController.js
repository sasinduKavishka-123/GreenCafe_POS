

// ------------ input fields ------------
import {ordersArray, orderItemsArray} from "../db/db.js";

const orderSearchInput  = $('#order_search_input');

const orderTBody        = $('#orderTBody');
const orderDetailTBody  = $('#orderDetailTBody');

// ------------ buttons ------------
const orderSearchBtn = $('#orderSearchBtn');

// ------------ variables --------------------
let orderDetailObj = [];


// ---------- load order table -----------------
const loadOrderTable = ()=>{
    orderTBody.empty();
    ordersArray.map((order)=>{
        let dataSet = `${order.orderId}, ${order.cusName}, ${order.date}, ${order.subTotal}`;
        let newRow = `<tr data-index = ${dataSet}> <td>${order.orderId}</td> <td>${order.cusName}</td> <td>${order.date}</td> <td>${order.subTotal}</td> </tr>`
        orderTBody.append(newRow);
    });
};


// ---------- load order detail table -----------------
orderTBody.on('click', 'tr', function(){
    orderDetailTBody.empty();

    let index = $(this).index();
    let orderId = ordersArray[index].orderId;

    orderItemsArray.map((odi, index)=>{
        if(odi.orderId == orderId){
            let newRow = `<tr> <td>${odi.itemId}</td> <td>${odi.itemName}</td> <td>${odi.qty}</td> <td>${odi.unitPrice}</td> <td>${odi.total}</td> </tr>`
            orderDetailTBody.append(newRow);
        }
    });
});

export {loadOrderTable};
