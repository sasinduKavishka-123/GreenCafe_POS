
import {ordersArray, orderItemsArray} from "../db/db.js";

// --------- order detail class ---------------
class OrderDetail{
    #orderId;
    #itemId;
    #itemName;
    #unitPrice;
    #stock;
    #total;

    constructor(orderId, itemId, itemName, unitPrice, stock, total) {
        this.#orderId = orderId;
        this.#itemId = itemId;
        this.#itemName = itemName;
        this.#unitPrice = unitPrice;
        this.#stock = stock;
        this.#total = total;
    }

    get orderId() {
        return this.#orderId;
    }

    set orderId(orderId) {
        this.#orderId = orderId;
    }

    get itemId() {
        return this.#itemId;
    }

    set itemId(itemId) {
        this.#itemId = itemId;
    }

    get itemName() {
        return this.#itemName;
    }

    set itemName(itemName) {
        this.#itemName = itemName;
    }

    get unitPrice() {
        return this.#unitPrice;
    }

    set unitPrice(unitPrice) {
        this.#unitPrice = unitPrice;
    }

    get stock() {
        return this.#stock;
    }

    set stock(stock) {
        this.#stock = stock;
    }

    get total() {
        return this.#total;
    }

    set total(total) {
        this.#total = total;
    }
}


// -------- add order item data -----------
const addOrderItemData = ()=>{

};


// --------- get orders data ---------------
const getOrderData = ()=>{
    return ordersArray;
};

const getOrderItemData = ()=>{
    return orderItemsArray;
};

export {getOrderItemData, getOrderData};