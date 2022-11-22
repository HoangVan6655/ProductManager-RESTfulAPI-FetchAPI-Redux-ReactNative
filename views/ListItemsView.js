import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
//step 1
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '../redux/stores/store';
import { useState } from 'react';
import { fetchAllProducts } from '../redux/actions/productAction';
import ItemComponent from './ItemComponent';

const ListItemsView = ({ params, }) => {
    //step 2
    const dispatch = useDispatch();
    const db = useSelector(store => store.products);
    console.log('du lieu', db.products)
    const [data, setData] = useState([]);

    useEffect(() => {
        dispatch(fetchAllProducts());
        setData(db.products);
        console.log(data)
    }, [])

    return (
        <View style={styles.listItemsContainer}>
            <View style={styles.headerListComponent}>
                <View>
                    <Text style={styles.headerComponentTitle}>Sản Phẩm Nổi Bật</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.headerComponentTitle2}>Xem tất cả</Text>
                    <Ionicons
                        name='arrow-forward'
                        style={{ marginTop: 5, color: 'red' }}
                        size={28}
                    />
                </View>
            </View>

            <View style={{ padding: 10 }}>
                <FlatList
                    data={db.products}
                    numColumns={2}
                    renderItem={({item}) => <ItemComponent item={item}/>}
                >
                </FlatList>
            </View>
        </View >
    );
}

export default ListItemsView

const styles = StyleSheet.create({
    listItemsContainer: {
        flex: 1,
    },
    headerComponentTitle: {
        color: '#212121',
        fontSize: 26,
        fontWeight: '700',
        marginTop: 5
    },
    headerListComponent: {
        marginBottom: 20,
        flexDirection: 'row'
    },
    itemContainer: {
        height: 260,
        width: 180,
        borderRadius: 15,
        marginRight: 10,
        backgroundColor: '#FFFFFF',
        marginBottom: 10
    },
    imgItem: {
        width: 150,
        height: 150,
    },
    itemImage: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemDetails: {
        alignItems: 'center',
        padding: 15
    },
    nameText: {
        color: '#1D1D1F',
        fontSize: 17,
        flexWrap: 'wrap',
        fontWeight: 'bold',
    },
    priceText: {
        color: '#0066CC',
        fontSize: 15,
        marginTop: 20
    },
    headerComponentTitle2: {
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold',
        marginLeft: 50,
        marginTop: 8,
        marginRight: 2
    },
    itemHeader: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})