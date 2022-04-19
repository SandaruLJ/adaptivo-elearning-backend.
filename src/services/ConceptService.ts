import { IConcept } from "../interfaces/IConcept.js";
import { Logger } from "../loaders/logger.js";
import { IConceptService } from "./interfaces/IConceptService.js";
import { ConceptDao } from "../dao/ConceptDao.js";
import { getPreSignedUrl } from "../libs/getPreSignedUrl.js";
import { ILearningResource } from "../interfaces/ILearningResource.js";
import { IQuiz } from "../interfaces/IQuiz.js";
import { LearningObjectService } from "./LearningObjectService.js";
import { LearningResourceService } from "./LearningResourceService.js";
import { QuizService } from "./QuizService.js";
import { ILearningObject } from "../interfaces/ILearningObject.js";
import mongoose from "mongoose";

export class ConceptService implements IConceptService {
  private logger = Logger.getInstance();
  public static instance: ConceptService = null;
  private ConceptDao = ConceptDao.getInstance();
  public static getInstance(): ConceptService {
    if (this.instance === null) {
      this.instance = new ConceptService();
    }
    return this.instance;
  }

  public async createConcept(request: IConcept): Promise<IConcept> {
    this.logger.info("ConceptService - createConcept()");
    let loIds = [];
    let name = request.name;
    let preRequisites = [];

    request.preRequisites.map((preRequisite: any) => {
      preRequisites.push(new mongoose.Types.ObjectId(preRequisite.value));
    });

    var promises = request.learningObjects.map(async (lo: any, index) => {
      let quizIds = [];
      const video: ILearningResource = {
        name: lo.video.name,
        type: "video",
        url: `https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/concepts/videos/${lo.video.name}`,
      };
      const audio: ILearningResource = {
        name: lo.audio.name,
        type: "audio",
        url: `https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/concepts/audios/${lo.audio.name}`,
      };
      await lo.quiz.map(async (quiz) => {
        const question: IQuiz = {
          question: quiz.title,
          explanation: quiz.explanation,
          answers: quiz.answers,
          correctAnswer: quiz.correctAnswer,
        };
        const quizResponse: IQuiz = await QuizService.getInstance().createQuiz(question);
        quizIds.push(quizResponse._id);
      });

      const videoResponse = await LearningResourceService.getInstance().createLearningResource(video);
      const audioResponse = await LearningResourceService.getInstance().createLearningResource(audio);

      const learningObject: ILearningObject = {
        name: lo.name,
        audio: audioResponse._id,
        video: videoResponse._id,
        resources: [],
        quiz: quizIds,
      };
      const learningObjectResponse = await LearningObjectService.getInstance().createLearningObject(learningObject);
      loIds.push(learningObjectResponse._id);
    });
    await promises.reduce((m, o) => m.then(() => o), Promise.resolve());

    const concept: IConcept = {
      name: name,
      preRequisites: preRequisites,
      learningObjects: loIds,
    };

    return this.ConceptDao.save(concept)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getAllConcept(): Promise<IConcept[]> {
    this.logger.info("ConceptService - getAllConcept()");
    return this.ConceptDao.getAll()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getConceptById(id: string): Promise<IConcept | Object> {
    this.logger.info("ConceptService - getConceptById()");
    return this.ConceptDao.getById(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public async updateConcept(id: string, Concept: IConcept): Promise<IConcept | Object> {
    this.logger.info("ConceptService - updateConcept()");
    return this.ConceptDao.update(id, Concept)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async deleteConcept(id: string): Promise<IConcept | Object> {
    this.logger.info("ConceptService - deleteConcept()");
    return this.ConceptDao.delete(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public async getVideoSignedUrl(fileName: string): Promise<Object> {
    this.logger.info("ConceptService - getVideoSignedUrl()");

    const bucketName = `spark-courses`;
    const key = `62272fbfc8ea4d8b75b76aa2/concepts/videos/${fileName}`;

    return getPreSignedUrl(bucketName, key)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getAudioSignedUrl(fileName: string): Promise<Object> {
    this.logger.info("ConceptService - getAudioSignedUrl()");

    const bucketName = `spark-courses`;
    const key = `concepts/audio/${fileName}`;

    return getPreSignedUrl(bucketName, key)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
}
