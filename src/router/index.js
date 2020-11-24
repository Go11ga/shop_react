import ProductsList from '@/pages/Products';
import ProductsItem from '@/pages/ProductsItem';
import Cart from '@/pages/Cart/Cart';
import Order from '@/pages/Order';
import Result from '@/pages/Result';
import E404 from '@/pages/E404';

const routes = [
    {
        name: 'products',
        path: '/',
        component: ProductsList
    },
    {
        name: 'ProductsItem',
        path: '/products/:id',
        component: ProductsItem
    },
    {
        name: 'cart',
        path: '/cart',
        component: Cart
    },
    {
        name: 'order',
        path: '/order',
        component: Order
    },
    {
        name: 'result',
        path: '/result',
        component: Result,
        exact: false
    },
    {
        path: '**',
        component: E404
    }
]

let routesMap = {};

routes.forEach(route => {
    if(route.hasOwnProperty('name')){
        routesMap[route.name] = route.path;
    }
});

export { routes, routesMap };
