/*
Example cart state
cart = {
  'Hat': { price: 15.99, quantity: 0},
  'T-Shirt': { price: 15.99, quantity: 2},
  'Hoodie': { price: 18.99, quantity: 1},
}
*/

//Outside of the cart component, in the Inventory Component, when user clicks on the button 'Add to Cart', the Cart gets +1 of the related item.
export const addItem = (itemToAdd) => {
  return {
    type: 'cart/addItem',
    payload: itemToAdd,
  };
};

//In addition to adding items to the cart (action above), the user should be able to modify the quantity of each item in their cart. 
export const changeItemQuantity = (name, newQuantity) => {
  return {
    type: 'cart/changeItemQuantity',
    payload: {name, newQuantity}
  }
}

const initialCart = {};
export const cartReducer = (cart = initialCart, action) => {
  switch (action.type) {
    case 'cart/addItem': {
      const { name, price } = action.payload;

      // if the item already exists, increase the quantity by 1, otherwise set it to 1. The action fires when user clicks 'Add to Cart' in the Inventory Component. That button by default adds Q of 1 wich each click.
      const quantity = cart[name] ? cart[name].quantity + 1 : 1;
    // Add the new item to the cart (or replace it if it existed already)
      const newItemInfo = { price, quantity }; 
      return { 
        ...cart, 
        [name]: newItemInfo 
      };
    }
    case 'cart/changeItemQuantity': {
      const { name, newQuantity } = action.payload;
      const itemToUpdate = cart[name];
      // The first step is to update the itemToUpdate — but you must do it immutably!>> Declare a new variable called updatedItem and assign to it a new object with everything the same in it as before, but a different newQuantity. You can use the spread operator (...) to copy the contents of one object into another. Then, you can specify any properties that you would like to update. We have to use ... because there are other props aside from name and Qnt for our cart item, for example price. 
      const updatedItem = {...itemToUpdate, quantity: newQuantity}
      //Return a copy of the cart with the updatedItem included.
      return {
        ...cart, 
        [name]: updatedItem
      };
    }
    default: {
      return cart;
    }
  }
};