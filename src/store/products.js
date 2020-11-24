import { observable, computed, action } from 'mobx';

export default class Products{
	@observable items = []

	constructor(rootStore){
		this.rootStore = rootStore;
		this.api = rootStore.api.products;
	}

	/* {'100': 0, '101': 1, '103': 2, '105: 3} */
	@computed get map(){
		let map = {};

		this.items.forEach((pr, i) => {
			map[pr.id.toString()] = i;
		});

		return map;
	}

	item(id){
		return this.items[this.map[id]];
	}

	@action load(){
		return this.api.all().then(products => {
			this.items = products;
		});
	}
}