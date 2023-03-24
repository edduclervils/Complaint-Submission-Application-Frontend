export type AppUserInput = {
    fullName: string
    username: string
    password: string
    role: Roles
    aboutMe: string
    imgLink: string
}

export enum Roles {
    COUNCIL = "COUNCIL",
    CONSTITUENT = "CONSTITUENT"
}

export type LoginForm = {
    username: string
    password: string
}

export type AppUserReturnInfo = {
    userId: number
    fullName: string
    username: string
    role: Roles
    aboutMe: string
    imgLink: string
}

export type FailedLoginReturn = {
    status: number
    error: string
    message: string
}

export type Username = {
    username: string
}

const url = "http://127.0.0.1:8080/";

export async function verifyUser(login:LoginForm):Promise<AppUserReturnInfo | FailedLoginReturn>{
    const httpResponse = await fetch(url+"login", {
        method: "PATCH",
        body:JSON.stringify(login),
        headers:{
            "Content-Type":"application/json"
        }
    });

    const returnUser:AppUserReturnInfo = await httpResponse.json();
    return returnUser;
}

export async function getAllUsers():Promise<AppUserReturnInfo[]>{
    const httpResponse = await fetch(url+"user");
    const returnUser:AppUserReturnInfo[] = await httpResponse.json();
    return returnUser;
}

export async function getAllUsernames():Promise<Username[]>{
    const httpResponse = await fetch(url+"user");
    const returnUser:Username[] = await httpResponse.json();
    return returnUser;
}