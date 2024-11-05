import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export interface reviewParams {
    id?: number | string,
    productId?: number | string,
    _page?: number | string,
    _per_page?: number | string
    _sort?: string
}

class API {
    private static instance: API;
    private URL: string = 'http://localhost:3000/'; // Ensure the protocol is included

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

    async getBestSellers(id: string | null = null) {
        let url = 'BestSellers'
        if (id) {
            url += `/${id}`
        }
        return await this.getRequest(url);
    }

    async getFeaturedProducts() {
        return await this.getRequest('FeaturedProducts');
    }

    async getReviews({id, productId, _page = 1, _per_page = 3, _sort = '-date'}: reviewParams) {
        let url = 'Reviews';

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

}

// Export a single instance of the API class
const api = API.getInstance();
export default api;