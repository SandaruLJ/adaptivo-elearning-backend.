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
      const learningObject: ILearningObject = {
        name: lo.name,
        visual: {},
        verbal: {},
        sensing: {},
        intuitive: {},
        active: {
          quiz: [],
        },
        quiz: [],
      };

      let quizIds = [];

      if (lo.visual.hasOwnProperty("video")) {
        const name = lo.visual.video.name.replace(/ /g, "+");
        const folderName = lo.visual.video.name.split(".")[0].replace(/\s/g, "");

        const visualVideo: ILearningResource = {
          name: lo.visual.video.name,
          type: "video",
          style: "visual",
          subStyle: "video",
          size: lo.visual.video.size,
          duration: lo.visual.video.duration,
          url: `https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/concepts/videos/${folderName}/${name}`,
        };
        const response = await LearningResourceService.getInstance().createLearningResource(visualVideo);
        learningObject.visual.video = response._id;
      }
      if (lo.visual.hasOwnProperty("visualNotes")) {
        const name = lo.visual.visualNotes.name.replace(/ /g, "+");

        const visualNotes: ILearningResource = {
          name: lo.visual.visualNotes.name,
          type: "file",
          style: "visual",
          subStyle: "visualNotes",
          size: lo.visual.visualNotes.size,
          duration: "00:05:00",
          url: `https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/concepts/files/${name}`,
        };
        const response = await LearningResourceService.getInstance().createLearningResource(visualNotes);
        learningObject.visual.visualNote = response._id;
      }
      if (lo.visual.hasOwnProperty("mindmap")) {
        const name = lo.visual.mindmap.name.replace(/ /g, "+");

        const mindmap: ILearningResource = {
          name: lo.visual.mindmap.name,
          type: "file",
          style: "visual",
          subStyle: "mindmap",
          size: lo.visual.mindmap.size,
          duration: "00:05:00",
          url: `https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/concepts/files/${name}`,
        };
        const response = await LearningResourceService.getInstance().createLearningResource(mindmap);
        learningObject.visual.mindmap = response._id;
      }
      if (lo.verbal.hasOwnProperty("textRichFile")) {
        const name = lo.verbal.textRichFile.name.replace(/ /g, "+");

        const textRichFile: ILearningResource = {
          name: lo.verbal.textRichFile.name,
          type: "file",
          style: "verbal",
          subStyle: "textRichFile",
          size: lo.verbal.textRichFile.size,
          duration: "00:05:00",
          url: `https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/concepts/files/${name}`,
        };
        const response = await LearningResourceService.getInstance().createLearningResource(textRichFile);
        learningObject.verbal.textRichFile = response._id;
      }
      if (lo.sensing.hasOwnProperty("realExampleVideo")) {
        const name = lo.sensing.realExampleVideo.name.replace(/ /g, "+");
        const folderName = lo.sensing.realExampleVideo.name.split(".")[0].replace(/\s/g, "");

        const realExampleVideo: ILearningResource = {
          name: lo.sensing.realExampleVideo.name,
          type: "video",
          style: "sensing",
          subStyle: "realExampleVideo",
          size: lo.sensing.realExampleVideo.size,
          duration: lo.sensing.realExampleVideo.duration,
          url: `https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/concepts/videos/${folderName}/${name}`,
        };
        const response = await LearningResourceService.getInstance().createLearningResource(realExampleVideo);
        learningObject.sensing.realExampleVideo = response._id;
      }
      if (lo.sensing.hasOwnProperty("realExampleDoc")) {
        const name = lo.sensing.realExampleDoc.name.replace(/ /g, "+");

        const realExampleDoc: ILearningResource = {
          name: lo.sensing.realExampleDoc.name,
          type: "file",
          style: "sensing",
          subStyle: "realExampleDoc",
          size: lo.sensing.realExampleDoc.size,
          duration: "00:05:00",
          url: `https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/concepts/files/${name}`,
        };
        const response = await LearningResourceService.getInstance().createLearningResource(realExampleDoc);
        learningObject.sensing.realExampleDoc = response._id;
      }
      if (lo.intuitive.hasOwnProperty("additionalVideo")) {
        const name = lo.intuitive.additionalVideo.name.replace(/ /g, "+");
        const folderName = lo.intuitive.additionalVideo.name.split(".")[0].replace(/\s/g, "");

        const additionalVideo: ILearningResource = {
          name: lo.intuitive.additionalVideo.name,
          type: "video",
          style: "intuitive",
          subStyle: "additionalVideo",
          size: lo.intuitive.additionalVideo.size,
          duration: lo.intuitive.additionalVideo.duration,
          url: `https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/concepts/videos/${folderName}/${name}`,
        };
        const response = await LearningResourceService.getInstance().createLearningResource(additionalVideo);
        learningObject.intuitive.additionalVideo = response._id;
      }
      if (lo.intuitive.hasOwnProperty("additionalMaterials")) {
        const name = lo.intuitive.additionalMaterials.name.replace(/ /g, "+");

        const additionalMaterials: ILearningResource = {
          name: lo.intuitive.additionalMaterials.name,
          type: "file",
          style: "intuitive",
          subStyle: "additionalMaterials",
          size: lo.intuitive.additionalMaterials.size,
          duration: "00:05:00",
          url: `https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/concepts/files/${name}`,
        };
        const response = await LearningResourceService.getInstance().createLearningResource(additionalMaterials);
        learningObject.intuitive.additionalMaterials = response._id;
      }
      if (lo.active.quiz.length > 0) {
        let quizIds = [];
        var activeQuizPromise = lo.active.quiz.map(async (quiz) => {
          const question: IQuiz = {
            question: quiz.title,
            explanation: quiz.explanation,
            answers: quiz.answers,
            correctAnswer: quiz.correctAnswer,
          };
          const quizResponse: IQuiz = await QuizService.getInstance().createQuiz(question);
          quizIds.push(quizResponse._id);
        });
        learningObject.active.quiz = quizIds;
        await activeQuizPromise.reduce((m, o) => m.then(() => o), Promise.resolve());
      }
      // const video: ILearningResource = {
      //   name: lo.video.name,
      //   type: "video",
      //   url: `https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/concepts/videos/${lo.video.name}`,
      // };
      // const audio: ILearningResource = {
      //   name: lo.audio.name,
      //   type: "audio",
      //   url: `https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/concepts/audios/${lo.audio.name}`,
      // };
      var LoQuizPromise = lo.quiz.map(async (quiz) => {
        const question: IQuiz = {
          question: quiz.title,
          explanation: quiz.explanation,
          answers: quiz.answers,
          correctAnswer: quiz.correctAnswer,
        };
        const quizResponse: IQuiz = await QuizService.getInstance().createQuiz(question);
        quizIds.push(quizResponse._id);
      });

      // const videoResponse = await LearningResourceService.getInstance().createLearningResource(video);
      // const audioResponse = await LearningResourceService.getInstance().createLearningResource(audio);

      // const learningObject: ILearningObject = {
      //   name: lo.name,
      //   audio: audioResponse._id,
      //   video: videoResponse._id,
      //   resources: [],
      //   quiz: quizIds,
      // };
      learningObject.quiz = quizIds;

      await LoQuizPromise.reduce((m, o) => m.then(() => o), Promise.resolve());

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
        this.encodeConceptLearningResources(data._id);
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
  public async getConceptById(id: string): Promise<any> {
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

  public async encodeConceptLearningResources(conceptId: string) {
    this.logger.info("ConceptService - encodeConceptLearningResources()");

    let concept = await this.getConceptById(conceptId);
    let LrsToEncode = [];
    let promises = concept.learningObjects.map((lo) => {
      if (lo._doc.hasOwnProperty("visual")) {
        if (lo._doc.visual.hasOwnProperty("video")) {
          LrsToEncode.push(lo.visual.video._id);
        }
      }
      if (lo._doc.hasOwnProperty("sensing")) {
        if (lo._doc.sensing.hasOwnProperty("realExampleVideo")) {
          LrsToEncode.push(lo.sensing.realExampleVideo._id);
        }
      }
      if (lo._doc.hasOwnProperty("intuitive")) {
        if (lo._doc.intuitive.hasOwnProperty("additionalVideo")) {
          LrsToEncode.push(lo.intuitive.additionalVideo._id);
        }
      }
    });
    await promises.reduce((m, o) => m.then(() => o), Promise.resolve());
    console.log(LrsToEncode);
    if (LrsToEncode.length > 0) {
      LearningResourceService.getInstance().encodeLearningResources(LrsToEncode);
    }
  }

  public async getVideoSignedUrl(fileName: string): Promise<Object> {
    this.logger.info("ConceptService - getVideoSignedUrl()");

    const bucketName = `spark-courses`;
    const key = `62272fbfc8ea4d8b75b76aa2/concepts/videos/${fileName.split(".")[0].replace(/\s/g, "")}/${fileName}`;

    return getPreSignedUrl(bucketName, key)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getFileSignedUrl(fileName: string): Promise<Object> {
    this.logger.info("ConceptService - getAudioSignedUrl()");

    const bucketName = `spark-courses`;
    const key = `62272fbfc8ea4d8b75b76aa2/concepts/files/${fileName}`;

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
