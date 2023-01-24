import {useCallback, useEffect, useState} from "react";
import {useAppSelector} from "../configuration/hooks";
import {OrderItem} from "./orderInterfaces";

export const useOrderCart = () => {
    const orderItems = useAppSelector(state => state.orderCartState.orderItems);
    const products = useAppSelector(state => state.productState.products);
    const [itemCount, setItemCount] = useState<number>(0);
    const [cartAmount, setCartAmount] = useState<number>(0);

    const calculateOrderTotal = useCallback(() => {
        const selectedItemsCount = orderItems.map((orderItem: OrderItem) => {
            const product = products.find(product => product._id === orderItem.productId)
            return {...product, count: orderItem.count}
        })

        return  selectedItemsCount.length > 0 ?
            selectedItemsCount
                .map(selectedItemCount => selectedItemCount.price! * selectedItemCount.count)
                .reduce((a, b) => a + b)
            : 0

    }, [orderItems, products])

    const calculateItemCount = useCallback(() => {
        return  orderItems.length > 0 ?
            orderItems
                .map(orderItem => orderItem.count)
                .reduce((a, b) => a + b)
            : 0;
    }, [orderItems])


    useEffect(() => {
        setItemCount(calculateItemCount())
        setCartAmount(calculateOrderTotal())
    }, [calculateItemCount, calculateOrderTotal, orderItems])





    return {itemCount, cartAmount};
};