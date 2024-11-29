export interface name{
    firstname: string,
    lastname: string
}

interface geolocationData{
    lat: number,
    long: number
}

export interface address{
    geolocation?: geolocationData,
    city: string,
    street: string,
    number?: string,
    zipcode: string,
    state: string,
    country: string
}

export interface user{
    id?: number,
    email?: string,
    username?: string,
    password?:string,
    name?: name,
    image?: string,
    phone?: string,
    address?: address,
}