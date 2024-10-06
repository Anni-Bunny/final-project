import {productListItem} from "../interfaces/productListItem";

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

    async getProducts() {
        return await this.getRequest('products');
    }

}

// Export a single instance of the API class
const api = API.getInstance();
export default api;