import { observable, computed, action } from 'mobx';

export default class Order{
	@observable userData = {
		name: {
			title: 'Name',
			value: '',
			valid: null,
			validate: (val) => /^[aA-zZ]{2,30}$/.test(val),
			errorText: 'Latin only, min 2, max 30'
		},
		email: {
			title: 'Email',
			value: '',
			valid: null,
			validate: (val) => /^[aA-zZ0-9]+@[aA-zZ0-9]+\.[aA-zZ0-9]+$/.test(val),
			errorText: 'Enter correct email'
		},
		phone: {
			title: 'Phone',
			value: '',
			valid: null,
			validate: (val) => /^[0-9]{7,15}$/.test(val),
			errorText: 'Number only min 7 max 15'
		},
	}

	constructor(rootStore){
		this.rootStore = rootStore;
	}

	@computed get allValid(){
		return Object.values(this.userData).every(f => f.valid);
	}

	@action change = (name, value) => {
		let field = this.userData[name];
		field.value = value;
		field.valid = field.validate(value);
	}

	getValue(name){
		return this.userData[name].value;
	}
}