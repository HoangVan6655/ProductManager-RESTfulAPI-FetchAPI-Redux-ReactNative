import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import ProductScreen from './ProductScreen';
import AddProductScreen from './AddProductScreen';
import UpdateProductScreen from './UpdateProductScreen';
import SearchProductScreen from './SearchProductScreen';

const Tab = createMaterialBottomTabNavigator()

const EmptyScreen = () => {
    return <View></View>
}

export default function HomeScreen({navigation}) {
    return (
        <Tab.Navigator
            barStyle={{ backgroundColor: 'black' }}
            initialRouteName="product">

            <Tab.Screen
                name="Danh Sách Sản Phẩm"
                component={ProductScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="list-ul" size={24} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name="Tìm Kiếm Sản Phẩm"
                component={SearchProductScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="search" size={24} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name="Thêm Sản Phẩm Mới"
                component={AddProductScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="plus" size={24} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}
