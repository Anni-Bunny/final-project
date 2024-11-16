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
    _limit?: number
}

export interface categoriesParams {
    id?: number | string
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

    async getUsers(id: string | null = null) {
        let url = 'users'
        if (id) {
            url += `/${id}`

        }
        return await this.getRequest(url);
    }

    async getProducts( {id, _sort, _limit = 9} : productParams = {}) {
        let url = 'products'
        if (id) {
            url += `/${id}`

        }
        else if(_sort){
            url += `?_sort=${_sort}&_limit=${_limit}`
        }
        return await this.getRequest(url);
    }

    async getCarts(id: string | null = null) {
        let url = 'carts'
        if (id) {
            url += `/${id}`

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

    async getCategories({id} : categoriesParams = {}) {
        let url = 'categories'
        if (id) {
            url += `/${id}`

        }
        return await this.getRequest(url);
    }

}

// Export a single instance of the API class
const api = API.getInstance();
export default api;