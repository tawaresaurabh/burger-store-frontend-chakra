import {Sandwich} from "../sandwiches/sandwichInterfaces";

export interface Order{
    userId: string,
    sandwichIds: string[],
    status: string
}

export interface OrderRequest extends Order{
    token: string;
}

export interface OrderResponse extends Order{
    _id: string;
}


export interface OrderCartState {
    error: string | any,
    loading: boolean,
    sandwichIdCountMap: SandwichIdCountMap[],
    orderId?: string

}

export interface SandwichId{
    sandwichId:string
}

export interface SandwichIdCountMap{
    sandwichId:string,
    count: number
}

export interface SandwichCount extends  Sandwich{
    count: number
}
