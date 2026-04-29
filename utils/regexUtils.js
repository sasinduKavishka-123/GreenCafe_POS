
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
const itemNameRegex = new RegExp('^.{4,}$');
const itemPriceRegex = new RegExp('^\\d+(\\.\\d{1,2})?$');
const itemWholeNumberRegex = new RegExp('^\\d+$');

const checkItemName = (name)=>{
    return itemNameRegex.test(name);
};

const checkItemPrice = (price)=>{
    return itemPriceRegex.test(price);
};

const checkItemStock = (stock)=>{
    return itemWholeNumberRegex.test(stock);
};

export {checkCusName, checkCusContact, checkItemName, checkItemPrice, checkItemStock};