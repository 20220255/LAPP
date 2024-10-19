export type ProductType = {
    id: number;
    name: string;
    price: number;
    type: string;
}

const field = [
    'id',
    'name',
    'price',
    'type'
] as const
type Field = typeof field[number];

export const filterItems = (arr: ProductType[], query: string): ProductType[] => {
    return arr.filter((el) => el.type === query);
}


export const filterItem = (arr: ProductType[], query: string, field1: Field, count?: number): number => {
    const record = arr.filter((el: ProductType) => el[field1] === query);
    return record[0]['price']
}

// export default filterItems