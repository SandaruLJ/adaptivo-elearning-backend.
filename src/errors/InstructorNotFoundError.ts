import NotFoundError from './NotFoundError'

export default class InstructorNotFoundError extends NotFoundError {
    
    constructor(message: string) {
        super(message || 'Instructor not found', 404);
    }

}
