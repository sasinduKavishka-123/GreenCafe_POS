
// -------- customer regex ----------------------
const cusNameRegex = new RegExp('^[a-zA-Z\\s]{4,}$');
const cusContactRegex = new RegExp('^\\d{10}$');

const checkCusName = (name)=>{
    return cusNameRegex.test(name);
};

const checkCusContact = (contact)=>{
    return cusContactRegex.test(contact);
};


// -------- item regex ----------------------
const itemNameRegex = new RegExp('^.{3,}$');
const itemPriceRegex = new RegExp('^\\d+(\\.\\d{1,2})?$');
const wholeNumberRegex = new RegExp('^\\d+$');

const checkItemName = (name)=>{
    return itemNameRegex.test(name);
};

const checkItemPrice = (price)=>{
    return itemPriceRegex.test(price);
};

const checkItemStock = (stock)=>{
    return wholeNumberRegex.test(stock);
};


// -------- pos regex ----------------------

const checkItemQty = (qty) =>{
    return wholeNumberRegex.test(qty);
}

export {checkCusName, checkCusContact, checkItemName, checkItemPrice, checkItemStock, checkItemQty};