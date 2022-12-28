import {useEffect, useState} from 'react';
import {useAppSelector} from "../configuration/hooks";

export const  useItemCount= () => {
    const sandwichIdCountMap = useAppSelector(state => state.orderCartState.sandwichIdCountMap)
    const [itemCount, setItemCount] = useState(0);
    useEffect(() => {
        setItemCount(sandwichIdCountMap.length > 0 ?
            sandwichIdCountMap
                .map(sandwichIdCount => sandwichIdCount.count)
                .reduce((a, b) => a + b)
            : 0)
    }, [sandwichIdCountMap])
    return itemCount;
}

export const  useOrderTotal= () => {
    const sandwichIdCountMap = useGetSandwichIdCountMap();
    const sandwiches = useGetSandwiches();
    const selectedSandwichesCount = sandwichIdCountMap.map((sandwichIdCount) => {
        const selectedSandwich = sandwiches.find(sandwich => sandwich._id === sandwichIdCount.sandwichId)
        return {...selectedSandwich, count: sandwichIdCount.count}
    })
    const [orderTotal, setOrderTotal] = useState(0);
    useEffect(() => {
        setOrderTotal(selectedSandwichesCount.length > 0 ?
            selectedSandwichesCount
                .map(selectedSandwichCount => selectedSandwichCount.price! * selectedSandwichCount.count)
                .reduce((a, b) => a + b)
            : 0)
    }, [sandwichIdCountMap, selectedSandwichesCount])
    return orderTotal;
}


export const useGetSandwiches = () => {
    return useAppSelector(state => state.sandwichState.sandwiches);
}

export const useGetSandwichIdCountMap = () => {
    return useAppSelector(state => state.orderCartState.sandwichIdCountMap);
}
