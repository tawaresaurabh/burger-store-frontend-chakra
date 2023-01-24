export interface Product {
    _id: string,
    name: string,
    description?: string,
    imageUrl?: string,
    price: number,

}

export interface ProductState {
    products: Product[]
    loading: boolean,
    error: string | any,
}
