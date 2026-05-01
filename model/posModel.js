
import {ordersArray, orderItemsArray} from "../db/db.js";

// --------- order detail class ---------------
class OrderDetail{
    #orderId;
    #itemId;
    #itemName;
    #unitPrice;
    #qty;
    #total;

    constructor(orderId, itemId, itemName, unitPrice, qty, total) {
        this.#orderId = orderId;
        this.#itemId = itemId;
        this.#itemName = itemName;
        this.#unitPrice = unitPrice;
        this.#qty = qty;
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

    get qty() {
        return this.#qty;
    }

    set qty(qty) {
        this.#qty = qty;
    }

    get total() {
        return this.#total;
    }

    set total(total) {
        this.#total = total;
    }
}


// -------- add order item data -----------
const addOrderItemData = (orderId, itemId, itemName, unitPrice, itemQty, total)=>{
    return new OrderDetail(orderId, itemId, itemName, unitPrice, itemQty, total);
};


// --------- get orders data ---------------
const getOrderData = ()=>{
    return ordersArray;
};

const getOrderItemData = ()=>{
    return orderItemsArray;
};

export {getOrderItemData, getOrderData, addOrderItemData};