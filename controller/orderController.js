

// ------------ input fields ------------
import {getOrderData, getOrderItemData} from "../model/posModel.js";

const orderSearchInput  = $('#order_search_input');

const orderTBody        = $('#orderTBody');
const orderDetailTBody  = $('#orderDetailTBody');

// ------------ buttons ------------
const orderSearchBtn        = $('#orderSearchBtn');
const orderSearchResetBtn   = $('#orderSearchResetBtn');

// ------------ variables --------------------
let orderTableArray = [];


// ------------ reset all ------------------
orderSearchResetBtn.on('click', ()=>{
    orderDetailTBody.empty();
    loadOrderTable();
});


// ---------- load order table -----------------
const loadOrderTable = ()=>{
    orderTBody.empty();
    orderTableArray = getOrderData();
    orderTableArray.map((order)=>{
        let dataSet = `${order.orderId}, ${order.cusName}, ${order.date}, ${order.subTotal}`;
        let newRow = `<tr data-index = ${dataSet}> <td>${order.orderId}</td> <td>${order.cusName}</td> <td>${order.date}</td> <td>Rs. ${order.subTotal}</td> </tr>`;
        orderTBody.append(newRow);
    });
};


// ---------- load order detail table -----------------
orderTBody.on('click', 'tr', function(){
    orderDetailTBody.empty();

    let index = $(this).index();
    let orderId = orderTableArray[index].orderId;

    getOrderItemData().map((odi, index)=>{
        if(odi.orderId == orderId){
            let newRow = `<tr> <td>${odi.itemId}</td> <td>${odi.itemName}</td> <td>${odi.qty}</td> <td>Rs. ${odi.unitPrice}</td> <td>Rs. ${odi.total}</td> </tr>`;
            orderDetailTBody.append(newRow);
        }
    });
});

// ----------- search order ----------------------
orderSearchBtn.on('click', ()=>{

    let text = orderSearchInput.val().toString();
    let ordArray = getOrderData();
    orderTableArray = [];

    if(text.startsWith("ORD_")){
        orderTBody.empty();
        orderDetailTBody.empty();
        ordArray.map(order =>{
            if(order.orderId.includes(text)){
                orderTableArray.push(order);
                let newRow = `<tr> <td>${order.orderId}</td> <td>${order.cusName}</td> <td>${order.date}</td> <td>Rs. ${order.subTotal}</td> </tr>`;
                orderTBody.append(newRow);
            }
        });
    }
    else{
        orderTBody.empty();
        orderDetailTBody.empty();
        ordArray.map(order =>{
            if(order.cusName.toLowerCase().includes(text.toLowerCase())) {
                orderTableArray.push(order);
                let newRow = `<tr> <td>${order.orderId}</td> <td>${order.cusName}</td> <td>${order.date}</td> <td>Rs. ${order.subTotal}</td> </tr>`;
                orderTBody.append(newRow);
            }
        });
    }

    if(orderTableArray.length === 0){
        Swal.fire({
            title: "Oops...",
            text: "Order Not Found!",
            icon: "warning"
        });
    }

});




export {loadOrderTable};
