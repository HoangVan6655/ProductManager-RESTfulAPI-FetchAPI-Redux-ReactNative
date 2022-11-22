import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchItem from './SearchItem'
import { QueryProduct } from './QueryProduct'

const SearchProductScreen = ({ navigation }) => {
    const [textInput, setTextInput] = useState('')
    const [searchProducts, setSearchProducts] = useState([])

    useEffect(() => {
        console.log(textInput)
        QueryProduct(textInput)
            .then(setSearchProducts)
    }, [textInput])

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                onChangeText={setTextInput}
                style={styles.textInput}
                placeholder={'Tìm Kiếm Sản Phẩm'}
            />

            <FlatList
                data={searchProducts}
                renderItem={({ item }) => <SearchItem item={item} />}
                keyExtractor={(item) => item.id}

            />
        </SafeAreaView>
    )
}

export default SearchProductScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    textInput: {
        margin: 20,
        height: 50,
        backgroundColor: 'lightgray',
        padding: 5,
        borderRadius: 4,
    }
});