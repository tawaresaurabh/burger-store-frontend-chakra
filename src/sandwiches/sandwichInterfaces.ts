export interface Sandwich {
    _id: string,
    name: string,
    description?: string,
    imageUrl?: string,
    breadType: string,
    price: number,

}

export interface SandwichState {
    sandwiches: Sandwich[]
    loading: boolean,
    error: string | any,
}
