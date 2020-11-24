import CartStore from '@/stores/cart';

let rootMock = {
	products: {
		items: [
			{"id":100,"title":"Ipnone 200","price":12000,"rest":10},
			{"id":101,"title":"Samsung AAZ8","price":22000,"rest":5},
			{"id":103,"title":"Nokia 3310","price":5000,"rest":2},
			{"id":105,"title":"Huawei ZZ","price":15000,"rest":8}
		],
		item(id){
			return this.items.find(pr => id === pr.id);
		}
	},
	api: {
		cart: {
			load: async () => ({ cart: [], needUpdate: true, token: 'test' }),
			add: async () => true,
			remove: async () => true,
			change: async () => true,
			clean: async () => true
		}
	},
	storage: {
		_data: {},
		getItem(){},
		setItem(){}
	}
}


let cart = new CartStore(rootMock);

// cart