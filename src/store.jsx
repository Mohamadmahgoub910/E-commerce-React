import { createStore, combineReducers } from 'redux'
import {
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, ProductsDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userDetailReducer, userUpdateProfileReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from './reducers/orderReducer'


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: ProductsDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
})
//  pull data from state 
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []
// const cartItemsFromStorage = localStorage.getItem('cartItems')
//     ? JSON.parse(localStorage.getItem('cartItems'))
//     : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage }
}
const middleWare = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))


export default store