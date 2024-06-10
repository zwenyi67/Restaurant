import { createContext, useContext, useState } from "react";


const orderStateContext = createContext({
    order: null,
    setOrder: ()=> {},

})

export const OrderProvider = ({children}) => {
    const [order, setOrder] = useState([]);

    return (
        <orderStateContext.Provider value={
            {order, setOrder}
        }>
            {children}
        </orderStateContext.Provider>
    )
}



export const useOrderContext = () => useContext(orderStateContext);