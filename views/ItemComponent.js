import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from '../redux/actions/productAction';
import UpdateProductScreen from './UpdateProductScreen';
import { useNavigation } from '@react-navigation/native';
// import UpdateProductScreen from './UpdateProductScreen';

const ItemComponent = ({ item }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const db = useSelector(store => store.products);

    const handleDelete = (ID, name) => {
        console.log('mã cần xoá item:', ID)
        dispatch(removeProduct(ID));
    }

    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
                <TouchableOpacity
                    onPress={() => handleDelete(item.id)}>
                    <MaterialIcons name="delete" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Update', { 
                        id: item.id, 
                        name: item.Name, 
                        image: item.Image, 
                        price: item.Price})}>
                    <MaterialIcons name="edit" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.itemImage}>
                <Image source={{ uri: item.Image }}
                    style={styles.imgItem} />
            </View>

            <View style={styles.itemDetails}>
                <TouchableOpacity>
                    <Text style={styles.nameText}>{item.Name}</Text>
                </TouchableOpacity>
                <Text style={styles.priceText}>{item.Price}</Text>
            </View>
        </View>
    )
}

export default ItemComponent

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