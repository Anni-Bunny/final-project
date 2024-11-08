interface product{
    [key:string]: number | string;
}

export interface cart{
    id: number,
    userId: number,
    products:product[]
}