
import{itemsArray} from "../db/db.js";

// --------- Item class ---------
class Item{
    #id;
    #name;
    #unitPrice;
    #stock;
    constructor(id, name, unitPrice, stock) {
        this.#id = id;
        this.#name = name;
        this.#unitPrice = unitPrice;
        this.#stock = stock;
    }

    get id() {
        return this.#id;
    }
    get name() {
        return this.#name;
    }
    get unitPrice() {
        return this.#unitPrice;
    }
    get stock() {
        return this.#stock;
    }

    set id(id) {
        this.#id = id;
    }
    set name(name) {
        this.#name = name;
    }
    set unitPrice(unitPrice) {
        this.#unitPrice = unitPrice;
    }
    set stock(stock) {
        this.#stock = stock;
    }
}


// --------- save item ---------------
const addItemData = (id, name, unitPrice, stock) =>{
      itemsArray.push(new Item(id, name, unitPrice, stock));
};


// --------- update Items ---------------
const updateItemData = (id, name, unitPrice, stock) =>{
    let itemObj = itemsArray.find(item => item.id === id);

    if(itemObj){
        itemObj.name = name;
        itemObj.unitPrice = unitPrice;
        itemObj.stock = stock;
        return true;
    }
    else{
        return false;
    }
};


const checkItemsQty = (orderItemsData)=>{
    let isUpdatable = true;
    let items = [];
    let itemDArray = getItemData();

    itemDArray.forEach(i =>{
        items.push(new Item(i.id, i.name, i.unitPrice, i.stock));
    })

    orderItemsData.forEach(oid =>{
        let itemIndex = items.findIndex(i => i.name === oid.itemName);
        if(itemIndex > -1){
            if((items[itemIndex].stock - oid.qty) < 0){
                isUpdatable = false;
                return;
            }
            else{
                items[itemIndex].stock = items[itemIndex].stock - oid.qty;
            }
        }
    });

    return isUpdatable;
};

const updateItemQty = (id , qty)=>{
    let itemObj = getItemData().find(item => item.id === id);
    if(itemObj){
        itemObj.stock = itemObj.stock - qty;
    }
};


// --------- delete item ---------------
const deleteItemData = (id)=>{
    let index = itemsArray.findIndex(item => item.id === id);
    if(index !== -1){
        itemsArray.splice(index, 1);
    }
};


// --------- get item data ---------------
const getItemData = ()=>{
    return itemsArray;
};


export {addItemData, updateItemData, deleteItemData, getItemData, updateItemQty, checkItemsQty};