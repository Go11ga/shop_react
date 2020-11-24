import React from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { routes, routesMap } from '@/router';

import userSettingContext from '@/contexts/userSettings';

import { observer } from 'mobx-react';
//import storesContext from '@/contexts/stores';

import CartStat from '@/components/cartstat';

import { Container, Row, Col, Button } from 'react-bootstrap';
import '@/styles/styles.css';


class App extends React.Component{
    //static contextType = storesContext;

    state = {
        settings: { lang: 'ru', timezone: 'Europe/Moscow', theme: 'light' }
    }

    setSetting = (key, value) => this.setState({ settings: { ...this.state.settings, [key]: value } });

    render(){
        let { settings } = this.state;
        //let { cart: cartStore } = this.context;

        return <BrowserRouter>
            <userSettingContext.Provider value={settings}>
                <header
                    className={settings.theme === "light"
                               ? "main__light header__border-light"
                               : "main__dark header__border-dark"}
                >
                    <Container>
                        <Row className="header__box">
                            <Col className="align-self-center col-2">
                                <div>
                                    <Button
                                        variant="light"
                                        onClick={() => this.setSetting('theme', 'light')}>
                                        Light
                                    </Button>
                                    <Button
                                        variant="dark"
                                        className="ml-1"
                                        onClick={() => this.setSetting('theme', 'dark')}>
                                        Dark
                                    </Button>
                                </div>
                            </Col>
                            <Col className="align-self-center col-1 ml-auto">
                                <div className="text-right">
                                    <Button
                                        variant="outline-primary"
                                        >
                                        <NavLink to={routesMap.cart}>Cart</NavLink>
                                    </Button>
                                </div>
                            </Col>
                            <Col className="align-self-center col-2">
                                <div className="text-center">
                                    <CartStat/>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </header>
                <div className={settings.theme === "light"
                                ? "pt-4 pb-3 main__light"
                                : "pt-4 pb-3 main__dark"}
                >
                    <Container>
                        <Row>
                            <Col className="col-2">
                                <ul className="list-group">
                                    <li className=
                                        {settings.theme === "light"
                                            ? "list-group-item list-group-item-info"
                                            : "list-group-item list-group-item-dark"
                                        }
                                    >
                                        <NavLink to={routesMap.products} exact activeClassName="text-danger">Products</NavLink>
                                    </li>
                                    <li className=
                                        {settings.theme === "light"
                                            ? "list-group-item list-group-item-info"
                                            : "list-group-item list-group-item-dark"
                                        }
                                    >
                                        <NavLink to={routesMap.cart} activeClassName="text-danger">Cart</NavLink>
                                    </li>
                                    <li className=
                                        {settings.theme === "light"
                                            ? "list-group-item list-group-item-info"
                                            : "list-group-item list-group-item-dark"
                                        }
                                    >
                                        <NavLink to={routesMap.order} activeClassName="text-danger">Order</NavLink>
                                    </li>
                                </ul>
                            </Col>
                            <Col className="col-10">
                                <Switch>
                                    { routes.map(route => (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        component={route.component}
                                        exact={'exact' in route ? route.exact : true}
                                    /> ))}
                                </Switch>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </userSettingContext.Provider>
        </BrowserRouter>
    }
}

export default observer(App);
