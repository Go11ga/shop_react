import { observable, computed, action, runInAction } from 'mobx';

export default class Cart{
    @observable products = [];
    @observable proccessId = [];
    token = null;

    constructor(rootStore){
        this.rootStore = rootStore;
        this.api = rootStore.api.cart;
        this.storage = rootStore.storage;
    }

    @computed get productsDetailed(){
        return this.products.map(pr => {
            let productInfo = this.rootStore.products.item(pr.id);
            return { ...productInfo, cnt: pr.cnt };
        });
    }

    @computed get totalCnt(){
        this.storage.setItem('TOTAL_CNT', this.products.length);
        return this.products.length;
    }

    @computed get cashedTotalCnt(){
        let totalCnt = this.storage.getItem('TOTAL_CNT');
        return totalCnt;
    }

    @computed get totalSum(){
        let sum = this.productsDetailed.reduce((total, pr) => {
            return total + pr.price * pr.cnt;
        }, 0);
        this.storage.setItem('TOTAL_SUM', sum);
        return sum;
    }

    @computed get cashedTotalSum(){
        let totalSum = this.storage.getItem('TOTAL_SUM');
        return totalSum;
    }

    inCart = (id) => {
        return this._findIndex(id) !== -1;
    }

    inProccess = (id) => {
        return this._findProccessedIndex(id) !== -1;
    }

    @action load(){
        this.token = this.storage.getItem('CART_TOKEN');

        this.api.load(this.token).then(({ cart, token, needUpdate }) => {
            runInAction(() => {
                if(needUpdate){
                    this.storage.setItem('CART_TOKEN', token);
                    this.token = token;
                }
                else{
                    this.products = cart;
                }
            });
        });
    }

    @action add = (id) => {
        if(!this.inCart(id) && !this.inProccess(id)){
            this._startProccess(id);

            this.api.add(this.token, id).then(res => {
                runInAction(() => {
                    if(res){
                        this.products.push({ id, cnt: 1 });
                        this._stopProccess(id);
                    }
                });
            });
        }
    }

    @action change = (id, cnt) => {
        if(this.inCart(id) && !this.inProccess(id)){
            this._startProccess(id);
            let i = this._findIndex(id);

            this.api.change(this.token, id, cnt).then(res => {
                if(res){
                    this.products[i].cnt = cnt;
                    this._stopProccess(id);
                }
            });
        }
    }

    @action remove = (id) => {
        if(this.inCart(id) && !this.inProccess(id)){
            this._startProccess(id);
            let i = this._findIndex(id);

            this.api.remove(this.token, id).then(res => {
                if(res){
                    this.products.splice(i, 1);
                    this._stopProccess(id);
                }
            });
        }
    }

    @action clean = (id) => {
        this.api.clean(this.token).then(res => {
            if(res){
                this.products.splice(0, this.products.length);
            }
        });
    }

    _findIndex(id){
        return this.products.findIndex(pr => id === pr.id);
    }

    _findProccessedIndex(id){
        return this.proccessId.indexOf(id);
    }

    _startProccess(id){
        this.proccessId.push(id);
    }

    _stopProccess(id){
        let ind = this._findProccessedIndex(id);

        if(ind !== -1){
            this.proccessId.splice(ind, 1);
        }
    }
}
