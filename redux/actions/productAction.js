import { createIconSetFromFontello } from "react-native-vector-icons"

export const GETALL_PRODUCTS = 'GETALL_PRODUCTS'
export const CREATE_PRODUCTS = 'CREATE_PRODUCTS'
export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS'
export const DELETE_PRODUCTS = 'DELETE_PRODUCTS'
//action
export const getAllProducts = (products) => {
    return {
        type: GETALL_PRODUCTS,
        payload: products
    }
}

export const createProducts = (products) => {
    return {
        type: CREATE_PRODUCTS,
        payload: products
    }
}

export const updateProducts = (products) => {
    return {
        type: UPDATE_PRODUCTS,
        payload: products
    }
}

export const deleteProducts = (Id) => {
    return {
        type: DELETE_PRODUCTS,
        payload: { Id },
    }
}

//action-thunk
//get all
export const fetchAllProducts = () => {
    return (dispatch) => {
        const getData = async () => {
            try {
                const response = await fetch('http://localhost:6789/api/get');
                const products = await response.json();
                // console.log('Products:', products);

                //dispatch action to reducer
                dispatch(getAllProducts(products));
            } catch (error) {
                console.log(error)
            }
        };
        getData();
    }
}

//post
export const postProduct = (Name, Image, Price) => {
    return async (dispatch) => {
        try {
            console.log('Products:', Name, Image, Price);
            const response = await fetch('http://localhost:6789/api/create', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    "Name": Name,
                    "Image": Image,
                    "Price": Price
                }),
            })
            console.log('Add success')
            const products = await response.json()

            //dispatch action to reducer
            dispatch(createProducts(products))
            // dispatch(createProducts({name:'Name', image:'Image', price:'a'}))

        } catch (error) {
            console.log(error)
        }
    }
}

//update
export const editProduct = (Id, Name, Image, Price) => {
    return (dispatch) => {
        const updateData = async () => {
            try {
                await fetch(`http://localhost:6789/api/update/${Id}`, {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "Name": Name,
                        "Image": Image,
                        "Price": Price
                    }),
                });
                console.log('Update success')
                const products = await response.json()
                dispatch(updateProducts(products));
            } catch (err) {
                console.log(err);
            }
        };
        updateData();
    };
}

//delete
export const removeProduct = (id) => {
    return (dispatch) => {
        const deleteData = async () => {
            try {
                await fetch(`http://localhost:6789/api/delete/${id}`, {
                    method: "DELETE",
                });
            } catch (err) {
                console.log(err);
            }
        };
        deleteData();
        dispatch(deleteProducts(id));
    };
}