module.exports = function(oldCart) {
  this.items = oldCart.items || {};
  this.totalPrice = oldCart.totalPrice || 0;
  this.totalQuantity = oldCart.totalQuantity || 0;
  this.add = (item, id) => {
    let storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = { item: item, quantity: 0, price: 0 };
    }
    storedItem.quantity++;
    storedItem.price = storedItem.item.price * storedItem.quantity;
    this.totalQuantity++;
    this.totalPrice += storedItem.item.price;
  };
  this.reduceByOne = id => {
    this.items[id].quantity--;
    this.items[id].price -= this.items[id].item.price;
    this.totalQuantity--;
    this.totalPrice -= this.items[id].item.price;
    if (this.items[id].quantity <= 0) {
      delete this.items[id];
    }
  };
  this.removeAll = id => {
    this.totalPrice -= this.items[id].price;
    this.totalQuantity -= this.items[id].quantity;
    delete this.items[id];
  };

  this.toArray = () => {
    let arr = [];
    for (let id in this.items) {
      // console.log(this.items[id].item);
      arr.push(this.items[id]);
    }
    return arr;
  };
};
