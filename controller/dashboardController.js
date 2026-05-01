
import {cleanCustomerForm} from "./customerController.js";
import {clearItemForm} from "./itemController.js";
import {clearPos, resetSelects} from "./posController.js";
import {resetOrder} from "./orderController.js";

//content sections
const dashboardSection = $("#dashboard");
const posSection = $('#pos');
const customerSection = $('#customer');
const itemSection = $('#item');
const orderSection = $('#order');

// section array
const sections = [dashboardSection, posSection, customerSection, itemSection, orderSection];

// nav buttons
const dashboardBtn = $('#dashboardNavBtn');
const posBtn = $('#posNavBtn');
const customerBtn = $('#customerNavBtn');
const itemBtn = $('#itemNavBtn');
const orderBtn = $('#ordersNavBtn');


// make all sections display none
const makeSectionDisplayNone = function (){
    sections.forEach(section=>{
        section.hide();
    });
};

dashboardBtn.on('click', function(){
    makeSectionDisplayNone();
    dashboardSection.css({display: 'block'});
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
