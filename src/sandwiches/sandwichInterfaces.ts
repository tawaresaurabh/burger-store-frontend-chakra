export interface Sandwich {
    _id: string,
    name: string,
    description?: string,
    imageUrl?: string,
    breadType: string,
    price: number,
    toppings?: Toppings[]

}

export interface SandwichState {
    sandwiches: Sandwich[]
    loading: boolean,
    error: string | any,
}

export interface Toppings {
    _id: string,
    name:string
}