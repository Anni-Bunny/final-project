export interface review {
    id?: number;
    productId: number | string,
    name: string;
    surName: string;
    date: string;
    comment: string;
    stars: number;
}
