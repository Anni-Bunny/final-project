export interface name{
    firstname: string,
    lastname: string
}

export interface admin{
    id?: number,
    email?: string,
    username?: string,
    password?:string,
    name?: name,
}