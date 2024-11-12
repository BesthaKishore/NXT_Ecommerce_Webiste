import { createContext } from "react";

const MyContext = createContext({
    CartList : [],
    addCartItems : () => {},
    deleteCartItems : () => {},
    quantity : 0,
    onIncrementQuantity : () => {},
    onDecrementQuantity : () => {},
    upDateQuantity : () => {}
})

export default MyContext;