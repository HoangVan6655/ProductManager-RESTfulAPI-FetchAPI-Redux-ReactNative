import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'

export default function SearchItem({ item }) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            style={styles.container}>
            <Text style={styles.text}>{item.Name}</Text>
            <Text style={styles.textPrice}>{item.Price}</Text>
            <Image style={styles.image} source={{ uri: item.Image }} />
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
    },
    textPrice:{
        flex: 1,
        fontSize: 18,
    },
    image: {
        backgroundColor: 'white',
        height: 70,
        width: 70,
    }
});