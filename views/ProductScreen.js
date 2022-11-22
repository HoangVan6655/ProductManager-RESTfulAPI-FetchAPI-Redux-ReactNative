import { View, Text } from 'react-native'
import React from 'react'
import ListItemsView from './ListItemsView';
import AddProductScreen from './AddProductScreen';
import store from '../redux/stores/store';
import { Provider } from 'react-redux';
const ProductScreen = () => {
    return (
        <Provider store={store}>
            <ListItemsView />
        </Provider>
    )
}

export default ProductScreen