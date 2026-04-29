
// -------- customer regex ----------------------
const cusNameRegex = new RegExp('^[a-zA-Z\\s]{4,}$');
const cusContactRegex = new RegExp('^\\d{10}$');

const checkCusName = (name)=>{
    return cusNameRegex.test(name);
};

const checkCusContact = (contact)=>{
    return cusContactRegex.test(contact);
};

export {checkCusName, checkCusContact};