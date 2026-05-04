
import {ordersArray, orderItemsArray} from "../db/db.js";
import {updateItemQty, checkItemsQty} from "./itemModel.js";

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

// --------- order class ---------------
class Order{
    #orderId;
    #cusName;
    #date;
    #subTotal;

    constructor(orderId, cusName, date, subTotal) {
        this.#orderId = orderId;
        this.#cusName = cusName;
        this.#date = date;
        this.#subTotal = subTotal;
    }

    get orderId() {
        return this.#orderId;
    }

    set orderId(orderId) {
        this.#orderId = orderId;
    }

    get cusName() {
        return this.#cusName;
    }

    set cusName(cusName) {
        this.#cusName = cusName;
    }

    get date() {
        return this.#date;
    }

    set date(date) {
        this.#date = date;
    }

    get subTotal() {
        return this.#subTotal;
    }

    set subTotal(subTotal) {
        this.#subTotal = subTotal;
    }
}

// -------- add order item data -----------
const addOrderItemData = (orderId, itemId, itemName, unitPrice, itemQty, total)=>{
    return new OrderDetail(orderId, itemId, itemName, unitPrice, itemQty, total);
};


// -------- add order item data to db -----------
const addOrderItemDataToDB = (orderItemsData) =>{

    let isItemUpdatable = false;

    isItemUpdatable = checkItemsQty(orderItemsData);

    if(isItemUpdatable === true){
        orderItemsData.forEach(oid =>{
            updateItemQty(oid.itemId, oid.qty);
        });

        orderItemsData.forEach(oid =>{
            orderItemsArray.push(oid);
        });
    }

    return isItemUpdatable;
};


// -------- create order -----------
const createOrder = (orderId, cusName, date, subTotal)=>{
    ordersArray.push(new Order(orderId, cusName, date, subTotal));
};


// --------- get orders data ---------------
const getOrderData = ()=>{
    return ordersArray;
};

const getOrderItemData = ()=>{
    return orderItemsArray;
};

export {getOrderItemData, getOrderData, addOrderItemData, addOrderItemDataToDB, createOrder};