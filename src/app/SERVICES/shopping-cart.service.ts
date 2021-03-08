import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ProductsComponent } from '../COMPONENTS/products/products.component';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shopping_cart_items: any[] = [];

  constructor() { }
  addProduct = (product: ProductsComponent) => {
    var store = [];
    if (localStorage.length > 0) {

      //let oldItems = localStorage.getItem('shop_cart');
      //store.push(oldItems);
      //store.push(product);
      this.shopping_cart_items.push(product)
      localStorage.setItem('shop_cart', JSON.stringify(this.shopping_cart_items));
    }
    else {
      //localStorage.setItem('shop_cart', JSON.stringify(product));
      this.shopping_cart_items.push(product);
      localStorage.setItem('shop_cart', JSON.stringify(this.shopping_cart_items))
    }

  }

  get_shopping_cart_item = () => {
    let items = localStorage.getItem('shop_cart')
    if (items == null) {
      console.log('no items')
    }
    else {
      return JSON.parse(items)
    }
  }

  getCartLength = () => {
    let products = this.get_shopping_cart_item();
    return products ? this.get_shopping_cart_item().length:0
  }

  getTotal=()=>{
    let items =this.get_shopping_cart_item();
    return items?.reduce((acc: any,items: { price: any; })=>acc+items.price,0)
  }
removeItem=(p: { id: any; })=>{
  console.log('coming')
  let items =this.get_shopping_cart_item();
const index=items.findIndex((item: { id: any; })=>item.id==p.id)
console.log('ere')
if(index>=0){
  console.log('coming')
items.splice(index,1)
return localStorage.setItem('shop_cart',JSON.stringify(items))
}

}

}
