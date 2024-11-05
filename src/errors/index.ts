export class NotImplementedError extends Error {
    constructor(){
        super();
        this.message = "NotImplemented"
    }
}

export class SubjectNotLawError extends EvalError {
    constructor(){
        super();
        this.message = "Subject is not related to law!"
    }
}