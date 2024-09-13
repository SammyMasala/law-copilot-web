import { nanoid } from "nanoid";

export function randomId(length: number = 10){
    return nanoid(length)
}