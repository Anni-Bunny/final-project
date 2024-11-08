interface name{
    [key:string]: string;
}

interface GeolocationData{
    [latLong:string]: number;
}

interface address{
    [key:string] : GeolocationData | string
}

export interface user{
    id: number,
    email: string,
    username: string,
    password:string,
    name: name,
    image: string,
    phone: string,
    address: address
}