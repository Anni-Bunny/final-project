import {signupInfo} from "../pages/SignUp";
import {address, user} from "../interfaces/user";
import {cart} from "../interfaces/cart";
import {wishList} from "../interfaces/wishList";
import {details} from "../components/UserAccountDetails";
import {order} from "../interfaces/order";
import {review} from "../interfaces/review";
import {admin, name} from "../interfaces/admin";

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
    _per_page?: number | string,
    categoryIds?: string[]
}

export interface categoriesParams {
    id?: number | string
}

export interface userParams {
    id?: number | string,
    email?: string,
    password?: string,
    _page?: string | number,
    _per_page?: string | number
}

export interface ordersParams {
    id?: number | string,
    userId?: number | string,
    _page?: number | string,
    _per_page?: number | string
}

export interface wishListParams {
    userId?: number | string
}

export interface registerUserParams {
    signupInfo: signupInfo
}

export interface updateUserPasswordParams {
    userId: number | string,
    newPassword: string
}

export interface updateUserAddressParams {
    userId: number | string,
    newAddress: address
}

export interface updateUserDetailsParams {
    userId: number | string,
    newDetails: details
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

    async patchRequest(route: string, data: any, callback: Function | undefined = undefined) {
        try {
            const res = await fetch(this.URL + route, {
                method: 'PATCH',  // Change POST to PUT
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


    async getUsers({id, email, password, _page, _per_page = 6}: userParams) {
        let url = 'users'
        if (id) {
            url += `/${encodeURIComponent(id)}`
        } else if (email && !password) {
            url += `?email=${encodeURIComponent(email)}`
        } else if (_page && _per_page) {
            url += `?_page=${encodeURIComponent(_page)}&_per_page=${encodeURIComponent(_per_page)}}`
        } else {
            url += `?email=${encodeURIComponent(email ?? '')}&password=${encodeURIComponent(password ?? '')}`
        }
        return await this.getRequest(url);
    }

    async getAdmins({id, email, password}: admin) {
        let url = 'admins'
        if (id) {
            url += `/${encodeURIComponent(id)}`
        } else if (email && password) {
            url += `?email=${encodeURIComponent(email ?? '')}&password=${encodeURIComponent(password ?? '')}`
        }
        return await this.getRequest(url);
    }



    async getProducts({id, _sort, _limit = 9, _page, _per_page = 9, categoryIds}: productParams = {}) {
        let url = 'products'
        if (id) {

            url += `/${encodeURIComponent(id)}`

        } else if (_page) {

            url += `?_page=${encodeURIComponent(_page)}&_per_page=${encodeURIComponent(_per_page)}&_sort=${encodeURIComponent(_sort ?? '')}`

        } else if (_sort) {

            url += `?_sort=${encodeURIComponent(_sort)}&_limit=${encodeURIComponent(_limit)}`

        }
        if (categoryIds && categoryIds.length > 0) {
            const categoryQuery = categoryIds.map(id => `${encodeURIComponent(id)}`).join(',');
            url += `&category.id=${categoryQuery}`;
        }
        return await this.getRequest(url);
    }

    async getCarts({id, userId}: ordersParams) {
        let url = 'carts'
        if (id) {
            url += `/${encodeURIComponent(id)}`
        } else {
            url += `?userId=${encodeURIComponent(userId ?? '')}`
        }
        return await this.getRequest(url);
    }

    async getReviews({id, productId, _page = 1, _per_page = 3, _sort = '-date'}: reviewParams) {
        let url = 'reviews';

        if (id) {
            url += `/${encodeURIComponent(id)}`
            return await this.getRequest(url);
        }

        if (_page) {
            url += `?_page=${encodeURIComponent(_page)}&_per_page=${encodeURIComponent(_per_page)}&_sort=${encodeURIComponent(_sort)}`
        }

        if (productId) {
            url += `&productId=${encodeURIComponent(productId)}`
        }

        return await this.getRequest(url);
    }

    async getCategories({id}: categoriesParams = {}) {
        let url = 'categories'
        if (id) {
            url += `/${encodeURIComponent(id)}`

        }
        return await this.getRequest(url);
    }

    async getOrders({id, userId, _page, _per_page = 6}: ordersParams = {}) {
        let url = 'orders'
        if (id) {
            url += `/${encodeURIComponent(id)}`

        } else if (userId) {
                url += `?userId=${encodeURIComponent(userId)}`

        } else if (_page) {

            url += `?_page=${encodeURIComponent(_page)}&_per_page=${encodeURIComponent(_per_page)})}`

        }
        return await this.getRequest(url);
    }

    async getWishList({userId}: wishListParams = {}) {
        let url = 'wishList'
        if (userId) {
            url += `?userId=${encodeURIComponent(userId)}`
        }

        return await this.getRequest(url);
    }

    async registerUser({signupInfo}: registerUserParams) {
        const userInfo: user = {
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
        const userCartInfo = {
            "userId": userId,
            "products": [],
        }

        const url = 'carts'

        return await this.postRequest(url, userCartInfo)
    }

    async createUserWishList(userId: number) {
        const userWishListInfo = {
            "userId": userId,
            "products": [],
        }

        const url = 'wishList'

        return await this.postRequest(url, userWishListInfo)
    }

    async updateUserCart(cart: cart) {
        const url = `carts/${cart.id}`

        if (cart.id) {
            return await this.putRequest(url, cart, console.log)
        }

    }

    async updateWishList(wishList: wishList) {
        const url = `wishList/${wishList.id}`

        if (wishList.id) {
            return await this.putRequest(url, wishList, console.log)
        }

    }

    async updateUserPassword({userId, newPassword}: updateUserPasswordParams) {
        const url = `users/${userId}`

        return await this.patchRequest(url, {password: newPassword})
    }

    async updateUserAddress({userId, newAddress} : updateUserAddressParams){
        const url = `users/${userId}`

        return await this.patchRequest(url, {address: newAddress})
    }

    async updateUserDetails({userId, newDetails} : updateUserDetailsParams){
        const url = `users/${userId}`

        return await this.patchRequest(url, {name: {firstname: newDetails.firstname, lastname: newDetails.lastname}, email: newDetails.email})
    }

    async postOrder(order :order) {

        const url = 'orders'

        return await this.postRequest(url, order)
    }

    async postReview(review: review){
        const url = 'reviews'

        return await this.postRequest(url, review)
    }
}

// Export a single instance of the API class
const api = API.getInstance();
export default api;