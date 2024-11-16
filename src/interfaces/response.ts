import {product} from "./product";

export interface renponse {
    first: null | number,
    prev: null | number,
    next: null | number,
    last: null | number,
    pages: null | number,
    items: null | number,
    data: product[]
}