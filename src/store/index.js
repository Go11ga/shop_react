import { configure } from 'mobx';

import CartStore from './cart';
import OrderStore from './order';
import ProductsStore from './products';

import * as cartApi from '@/api/cart';
import * as productsApi from '@/api/products';

// configure({ enforceActions: "observed" })

class RootStore {
	constructor() {
		this.api = {
			cart: cartApi,
			products: productsApi
		}

		this.storage = localStorage;

		this.cart = new CartStore(this);
		this.order = new OrderStore(this);
		this.products = new ProductsStore(this);
	}
}

export default new RootStore();
