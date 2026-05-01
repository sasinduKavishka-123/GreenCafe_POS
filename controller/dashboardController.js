
import {cleanCustomerForm} from "./customerController.js";
import {clearItemForm} from "./itemController.js";
import {clearPos, resetSelects} from "./posController.js";
import {resetOrder} from "./orderController.js";

import {getCustomerData} from "../model/customerModel.js";
import {getItemData} from "../model/itemModel.js";
import {getOrderData} from "../model/posModel.js";


// -------- content sections ----------------
const dashboardSection  = $("#dashboard");
const posSection        = $('#pos');
const customerSection   = $('#customer');
const itemSection       = $('#item');
const orderSection      = $('#order');

// -------- section array ----------------
const sections = [dashboardSection, posSection, customerSection, itemSection, orderSection];

// -------- nav buttons ----------------
const dashboardBtn  = $('#dashboardNavBtn');
const posBtn        = $('#posNavBtn');
const customerBtn   = $('#customerNavBtn');
const itemBtn       = $('#itemNavBtn');
const orderBtn      = $('#ordersNavBtn');

// -------- card numbers ----------------
const orderCount = $('#order_count');
const totalRevenue = $('#total_revenue');
const itemCount = $('#item_count');
const customerCount = $('#customer_count');

// -------- variables -----------------
let ordersArr = [];


// make all sections display none
const makeSectionDisplayNone = function (){
    sections.forEach(section=>{
        section.hide();
    });
};

// --------- load data to cards -------------------
const loadCardData = ()=>{
    orderCount.text(getOrderData().length);
    customerCount.text(getCustomerData().length);
    itemCount.text(getItemData().length);

    let total = 0;
    getOrderData().forEach(order=>{
        total +=  +order.subTotal;
    });

    totalRevenue.text(total);
};


// ----- Navigations ---------------------------------------
dashboardBtn.on('click', function(){
    makeSectionDisplayNone();
    dashboardSection.css({display: 'block'});
    loadCardData();
});

posBtn.on('click', function(){
    makeSectionDisplayNone();
    posSection.css({display: 'block'});
    clearPos();
    resetSelects();
});

customerBtn.on('click', function(){
    makeSectionDisplayNone();
    customerSection.css({display: 'block'});
    cleanCustomerForm();
});

itemBtn.on('click', function(){
    makeSectionDisplayNone();
    itemSection.css({display: 'block'});
    clearItemForm();
});

orderBtn.on('click', function(){
    makeSectionDisplayNone();
    orderSection.css({display: 'block'});
    resetOrder();
});
