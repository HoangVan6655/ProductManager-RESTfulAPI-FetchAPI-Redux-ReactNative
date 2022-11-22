// import { firebase } from '../config/firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export const QueryProduct = (name) => new Promise((resolve, reject) => {
    if (name === '') {
        resolve([])
    }
    firebase.firestore()
        .collection('Products')
        .where('Name', '>=', name)
        .where('Name', '<=', name + '\uf8ff')
        .get()
        .then((snapshot) => {
            let products = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            })
            resolve(products)
        })
        .catch(() => reject())
})