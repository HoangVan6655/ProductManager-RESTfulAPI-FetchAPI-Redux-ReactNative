import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDetailProducts } from '../redux/actions/productAction';

const ProductDetailScreen = (id) => {
    // const dispatch = useDispatch();
    // const db = useSelector(store => store.products)
    // console.log('du lieu', db.products)
    console.log('Id Chi Tiết', id)
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     dispatch(fetchDetailProducts(id));
    //     setData(db.products);
    //     console.log(data)
    // }, [])

    return (
        <View>
            <Text>ProductDetailScreen</Text>
        </View>
    )
}

export default ProductDetailScreen