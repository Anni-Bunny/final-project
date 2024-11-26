import {signupInfo} from "../pages/SignUp";
import {user} from "../interfaces/user";
import {cart} from "../interfaces/cart";

export interface reviewParams {
    id?: number | string,
    productId?: number | string,
    _page?: number | string,
    _per_page?: number | string
    _sort?: string
}

export interface productParams {
    id?: number | string,
    _sort?: string,
    _limit?: number,
    _page?: number | string,
    _per_page?: number | string
}

export interface categoriesParams {
    id?: number | string
}

export interface userParams {
    id?: number | string,
    email?: string,
    password?: string
}

export interface ordersParams {
    id?: number | string,
    userId?: number | string
}

export interface wishListParams {
    userId?: number | string
}

export interface registerUserParams {
    signupInfo: signupInfo
}


class API {
    private static instance: API;
    private URL: string = 'http://localhost:3001/'; // Ensure the protocol is included

    private constructor() {
    } // Private constructor to prevent instantiation

    public static getInstance(): API {
        if (!API.instance) {
            API.instance = new API();
        }
        return API.instance;
    }

    async getRequest(route: string, callback: Function | undefined = undefined) {
        try {
            const res = await fetch(this.URL + route);
            if (res.ok) {
                const data = await res.json();
                if (callback)
                    callback(data);
                return data
            } else {
                throw new Error('Unable to retrieve data');
            }
        } catch (error) {
            console.error(error);
        }
    }

    async postRequest(route: string, data: any, callback: Function | undefined = undefined) {
        try {
            const res = await fetch(this.URL + route, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                const responseData = await res.json();
                if (callback) {
                    callback(responseData);
                }
                return responseData;
            } else {
                throw new Error('Unable to post data');
            }
        } catch (error) {
            console.error(error);
        }
    }

    async putRequest(route: string, data: any, callback: Function | undefined = undefined) {
        try {
            const res = await fetch(this.URL + route, {
                method: 'PUT',  // Change POST to PUT
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                const responseData = await res.json();
                if (callback) {
                    callback(responseData);
                }
                return responseData;
            } else {
                throw new Error('Unable to put data');
            }
        } catch (error) {
            console.error(error);
        }
    }


    async getUsers({id, email, password}: userParams) {
        let url = 'users'
        if (id) {
            url += `/${id}`
        } else {
            url += `?email=${email}&password=${password}`
        }
        return await this.getRequest(url);
    }

    async getProducts({id, _sort, _limit = 9, _page, _per_page = 9}: productParams = {}) {
        let url = 'products'
        if (id) {

            url += `/${id}`

        } else if (_page) {

            url += `?_page=${_page}&_per_page=${_per_page}&_sort=${_sort}`

        } else if (_sort) {

            url += `?_sort=${_sort}&_limit=${_limit}`

        }
        return await this.getRequest(url);
    }

    async getCarts({id, userId}: ordersParams) {
        let url = 'carts'
        if (id) {
            url += `/${id}`
        } else {
            url += `?userId=${userId}`
        }
        return await this.getRequest(url);
    }

    async getReviews({id, productId, _page = 1, _per_page = 3, _sort = '-date'}: reviewParams) {
        let url = 'reviews';

        if (!id && !productId) {
            throw new Error('at least one is required id or productId')
        }

        if (id) {
            url += `/${id}`
            return await this.getRequest(url);
        }

        if (productId) {
            url += `?productId=${productId}&_page=${_page}&_per_page=${_per_page}&_sort=${_sort}`
        }

        return await this.getRequest(url);
    }

    async getCategories({id}: categoriesParams = {}) {
        let url = 'categories'
        if (id) {
            url += `/${id}`

        }
        return await this.getRequest(url);
    }

    async getOrders({id, userId}: ordersParams = {}) {
        let url = 'orders'
        if (id) {
            url += `/${id}`

        } else {
            if (userId) {
                url += `?userId=${userId}`
            }
        }
        return await this.getRequest(url);
    }

    async getWishList({userId}: wishListParams = {}) {
        let url = 'wishList'
        if (userId) {
            url += `?userId=${userId}`
        }

        return await this.getRequest(url);
    }

    async registerUser({signupInfo}: registerUserParams) {
        const userInfo: user = {
            "id": Math.floor(Math.random() * 1000),
            "email": signupInfo.email,
            "password": signupInfo.password,
            "name": {
                "firstname": signupInfo.firstname,
                "lastname": signupInfo.lastname
            },
        }

        const url = 'users'

        return await this.postRequest(url, userInfo)
    }

    async createUserCart(userId: number) {
        const userCartInfo: cart = {
            "id": userId,
            "userId": userId,
            "products": [],
        }

        const url = 'carts'

        return await this.postRequest(url, userCartInfo)
    }

    async updateUserCart(cart: cart) {
        const url = `carts/${cart.id}`

        if (cart.id > 0) {
            return await this.putRequest(url, cart)
        }

    }

}

// Export a single instance of the API class
const api = API.getInstance();
export default api;