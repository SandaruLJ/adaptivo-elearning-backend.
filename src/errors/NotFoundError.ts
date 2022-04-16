export default class NotFoundError extends Error {
    status: number;
    
    constructor(message: string, status: number) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.message = message || 'Resource not found';
        this.status = status || 404;
    }

}
