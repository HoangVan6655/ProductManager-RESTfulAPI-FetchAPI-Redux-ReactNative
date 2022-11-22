import {
    GETALL_PRODUCTS,
    CREATE_PRODUCTS,
    DELETE_PRODUCTS,
    UPDATE_PRODUCTS,
} from "../actions/productAction";

const initialState = {
    products: []
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETALL_PRODUCTS:
            console.log('GETALL_PRODUCTS', action.payload)
            return {
                ...state,
                products: [...action.payload]
            }
        case CREATE_PRODUCTS:
            console.log('CREATE_PRODUCTS', action.payload)
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case UPDATE_PRODUCTS:
            console.log('UPDATE_PRODUCTS', action.payload)
            return {
                ...state,
                products: state.products.map((x) => {
                    if (x.Id === action.payload.Id) {
                        return {
                            ...x,
                            ...payload,
                        };
                    } else {
                        return x;
                    }
                }),
            };
        case DELETE_PRODUCTS:
            console.log('DELETE_PRODUCTS', action.payload)
            return {
                ...state,
                products: state.products.filter((x) => x.id !== action.payload.id)
            }
        default:
            console.log("default action")
            return { ...state };
    }
}