// Importing here
console.log('Importing in here'); // but all the code below is executed before this line

import * as ShoppingCart from './shoppingCart.js';
ShoppingCart.shopCart; // []

import { cart as shopCart, myFunc } from './shoppingCart.js';
console.log(shopCart); // []
myFunc('bread'); // here myFunc
