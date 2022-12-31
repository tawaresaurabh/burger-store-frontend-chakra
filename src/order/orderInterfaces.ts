export interface Order {
    userId: string,
    sandwichIds: string[],
    status: string
}

export interface OrderRequest extends Order {
    token: string;
}

export interface OrderResponse extends Order {
    _id: string;
}


export interface OrderCartState {
    error: string | any,
    loading: boolean,
    sandwichIdCountMap: SandwichIdCountMap[],
    orderId?: string

}

export interface OrdersState {
    error: string | any,
    loading: boolean,
    orders: Order[],
    userId: string,
}

export interface SandwichId{
    sandwichId:string
}

export interface SandwichIdCountMap{
    sandwichId:string,
    count: number
}

