export interface Order {
    _id?: string;
    orderItems: OrderItem[],
    status? : string,
    date? : Date,
    userId?: string

}


export interface OrderCartState {
    error: string | any,
    loading: boolean,
    orderItems: OrderItem[],
    orderId?: string

}

export interface OrdersState {
    error: string | any,
    loading: boolean,
    orders: Order[],
    userId: string,
}

export interface ProductId {
    productId:string
}



export interface OrderItem {
    productId:  string;
    count: number;
}



