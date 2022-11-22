import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Platform, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { useDispatch, useSelector } from 'react-redux';
import { firebase } from '../config/firebase'
import { getStorage, uploadString, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { editProduct } from '../redux/actions/productAction'

const UpdateProductScreen = ({ route }) => {
    const dispatch = useDispatch();
    const db = useSelector((store) => store.courses);

    const { id } = route.params;
    const { name } = route.params;
    const { image } = route.params;
    const { price } = route.params;
    const [EditId, setEditId] = useState(id)
    const [EditName, setEditName] = useState(name)
    const [EditImage, setEditImage] = useState(image)
    const [EditPrice, setEditPrice] = useState(price)
    console.log('Edit', EditName, EditImage, EditPrice);

    const handleUpdate = (Id) => {
        console.log(Id)
        dispatch(editProduct(Id, EditName, EditImage, EditPrice));
        navigation.navigate("Home");
    }

    const [selectedImage, setSelectedImage] = useState({ localUri: image })
    const openImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({ base64: true })
        if (result.canceled)
            return;
        let uri = result.uri;
        setSelectedImage({ localUri: result.uri });
        if (Platform.OS === 'web') {
            let base64code = result.base64;
            //upload
            await uploadBase64(base64code);
        } else {
            //device
            // let uri = result.uri
            console.log(result)
            console.log('uri', result.uri)
            //step 1 -> convert uri --: blob
            const blobfile = await convertURI2BlobFile(result.uri)
            console.log('blobfile', blobfile)
            //step 2 -> upload to cloud
            await uploadFile(blobfile);
        }
    }

    const convertURI2BlobFile = async (uri) => {
        const result = await new Promise((resolve, reject) => {
            let xmlRequest = new XMLHttpRequest();
            xmlRequest.onload = function () {
                resolve(xmlRequest.response);
            }
            xmlRequest.onerror = function () {
                console.log("error here")
            }
            xmlRequest.responseType = "blob";
            xmlRequest.open("GET", uri, true);
            xmlRequest.send(null)
        })
        return result;
    }

    const uploadFile = async (blobfile) => {
        let imgName = 'img-ios' + new Date().getTime();
        //step 2
        let storage = getStorage();
        let storageref = ref(storage, `images/${imgName}.jpg`)
        let metadata = {
            contentType: 'image/jpeg'
        }
        const uploadTask = uploadBytesResumable(storageref, blobfile, metadata);
        uploadTask.on('state_changed',
            (snapshot) => { },
            (error) => { },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(async (downloadURL) => {
                        setEditImage(downloadURL)
                        console.log('File available at', downloadURL);
                    })
            })
    }

    const uploadBase64 = async (base64code) => {
        let imgName = 'img-w' + new Date().getTime();
        //step 2
        let storage = getStorage();
        let storageref = ref(storage, `images/${imgName}.jpg`)
        let metadata = {
            contentType: 'image/jpeg'
        }
        uploadString(storageref, base64code, 'base64', metadata)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then(async (downloadURL) => {
                        setEditImage(downloadURL)
                        console.log('File available at', downloadURL);
                    })
            })
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Ảnh Sản Phẩm</Text>

            <View style={styles.imageContainer}>
                <TouchableOpacity
                    style={styles.imageViewContainer}
                    onPress={openImage}
                >
                    <Image
                        style={styles.image}
                        source={{ uri: selectedImage.localUri }}
                    />
                    <View style={styles.imageOverlay}>
                        <Feather name='camera' size={40} color='white' />
                    </View>
                </TouchableOpacity>
            </View>


            <TextInput
                value={EditImage}
                onChangeText={setEditImage}
                placeholder='Link Ảnh Sản Phẩm'
                editable={false}
                style={styles.input} />

            <Text style={styles.title}>Tên Sản Phẩm</Text>

            <TextInput
                value={EditName}
                onChangeText={setEditName}
                placeholder='Nhập Tên Sản Phẩm'
                style={styles.input} />

            <Text style={styles.title}>Giá Sản Phẩm</Text>

            <TextInput
                value={EditPrice}
                onChangeText={setEditPrice}
                placeholder='Nhập Giá Sản Phẩm'
                style={styles.input} />

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleUpdate(EditId)}
            >
                <Text style={styles.textBtn}>Cập Nhật Sản Phẩm</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UpdateProductScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,

    },
    input: {
        borderColor: 'lightgray',
        borderBottomWidth: 3,
        borderStyle: 'solid',
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    imageViewContainer: {
        backgroundColor: 'gray',
        height: 250,
        width: 250,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 250,
        width: 250,
        position: 'absolute'
    },
    imageOverlay: {
        backgroundColor: 'rgba(0,0,0, 0.5)',
        marginTop: 200,
        marginLeft: 200
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 10
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 5,
        elevation: 3,
        backgroundColor: '#DC3535',
        marginTop: 20
    },
    textBtn: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    }
});