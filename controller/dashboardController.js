

//content sections
let dashboardSection = $("#dashboard");
let posSection = $('#pos');
let customerSection = $('#customer');
let itemSection = $('#item');
let orderSection = $('#order');

// section array
let sections = [dashboardSection, posSection, customerSection, itemSection, orderSection];

// nav buttons
let dashboardBtn = $('#dashboardNavBtn');
let posBtn = $('#posNavBtn');
let customerBtn = $('#customerNavBtn');
let itemBtn = $('#itemNavBtn');
let orderBtn = $('#ordersNavBtn');


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
});

customerBtn.on('click', function(){
    makeSectionDisplayNone();
    customerSection.css({display: 'block'});
});

itemBtn.on('click', function(){
    makeSectionDisplayNone();
    itemSection.css({display: 'block'});
});

orderBtn.on('click', function(){
    makeSectionDisplayNone();
    orderSection.css({display: 'block'});
});
