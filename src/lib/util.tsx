import { EXECUTIVE_PASSWORD, PARENT_PASSWORD, STUDENT_PASSWORD } from "./const"

export const checkPassword = (password: string, allowParent: boolean = false, allowStudent: boolean = false) => {
    if(password === EXECUTIVE_PASSWORD) return true;
    if(allowParent) return password === PARENT_PASSWORD;
    if(allowStudent) return password === STUDENT_PASSWORD;
    
    return false;
}