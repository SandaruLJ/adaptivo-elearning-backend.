import IInstructor from '../../interfaces/IInstructor';

export default interface IInstructorService {
    createInstructor(request: IInstructor): Promise<IInstructor>;
    getAllInstructors(): Promise<IInstructor[]>;
    getInstructorById(id: string): Promise<IInstructor | Object>;
    updateInstructor(id: string, instructor: IInstructor): Promise<IInstructor | Object>;
    deleteInstructor(id: string): Promise<IInstructor | Object>;
}