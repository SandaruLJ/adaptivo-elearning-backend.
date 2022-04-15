import {IQuiz} from "../../interfaces/IQuiz";

export interface IQuizService{
    createQuiz(request:IQuiz):Promise<IQuiz>;
    getAllQuiz():Promise<IQuiz[]>;
    getQuizById(id:String):Promise<IQuiz | Object>;
    updateQuiz(id:String,product:IQuiz):Promise<IQuiz | Object>;
    deleteQuiz(id:String):Promise<IQuiz | Object>;
}
