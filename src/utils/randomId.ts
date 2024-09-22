import { nanoid } from "nanoid";

export function randomId(length: number = 10){
    try{
        return nanoid(length)
    }catch(error){
        throw error
    }
}