import { ILearningStyle } from "../interfaces/ILearningStyle.js";
import { Logger } from "../loaders/logger.js";
import { ILearningStyleService } from "./interfaces/ILearningStyleService.js";
import { LearningStyleDao } from "../dao/LearningStyleDao.js";
import { PreferenceDao } from "../dao/PreferenceDao.js";

export class LearningStyleService implements ILearningStyleService {
  private logger = Logger.getInstance();
  public static instance: LearningStyleService = null;
  private LearningStyleDao = LearningStyleDao.getInstance();
  public static getInstance(): LearningStyleService {
    if (this.instance === null) {
      this.instance = new LearningStyleService();
    }
    return this.instance;
  }

  public async createLearningStyle(request: ILearningStyle): Promise<ILearningStyle> {
    this.logger.info("LearningStyleService - createLearningStyle()");

    return this.LearningStyleDao.save(request)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async analyzeInitialUserPreference(request: any): Promise<ILearningStyle> {
    this.logger.info("LearningStyleService - analyzeInitialUserPreference()");

    const preferences = await PreferenceDao.getInstance().getAll();

    let reflective = 0;
    let active = 0;
    let visual = 0;
    let verbal = 0;
    let sensing = 0;
    let intuitive = 0;
    let sequential = 0;
    let global = 0;

    preferences.map((data, i) => {
      const answers = data.answers;
      const selectedAnswer = request.answers[i];

      answers.map((object) => {
        if (object.answer == selectedAnswer) {
          if (object.learningStyle == "active") {
            active++;
          } else if (object.learningStyle == "reflective") {
            reflective++;
          } else if (object.learningStyle == "visual") {
            visual++;
          } else if (object.learningStyle == "verbal") {
            verbal++;
          } else if (object.learningStyle == "sensing") {
            sensing++;
          } else if (object.learningStyle == "intuitive") {
            intuitive++;
          } else if (object.learningStyle == "sequential") {
            sequential++;
          } else if (object.learningStyle == "global") {
            global++;
          }
        }
      });
    });
    const detectStyle = (style1, s1Score, style2, s2Score) => {
      let style;
      if (s1Score == s2Score) {
        style = "balanced";
      } else if (s1Score > s2Score) {
        style = style1;
      } else if (s1Score < s2Score) {
        style = style2;
      }
      return style;
    };
    const detectStrength = (value) => {
      if (value == 0.5) {
        return "balanced";
      } else if (value == 1) {
        return "strong";
      } else if (value == 0) {
        return "weak";
      }
    };
    let learningStyle: ILearningStyle = {
      userId: request.userId,
      input: {
        sensing: sensing / 2,
        intuitive: intuitive / 2,
        sensingStrength: detectStrength(sensing / 2),
        intuitiveStrength: detectStrength(intuitive / 2),
      },
      processing: {
        active: active / 2,
        reflective: reflective / 2,
        activeStrength: detectStrength(active / 2),
        reflectiveStrength: detectStrength(reflective / 2),
      },
      understanding: {
        sequential: sequential / 2,
        global: global / 2,
        sequentialStrength: detectStrength(sequential / 2),
        globalStrength: detectStrength(global / 2),
      },
      perception: {
        visual: visual / 2,
        verbal: verbal / 2,
        visualStrength: detectStrength(visual / 2),
        verbalStrength: detectStrength(verbal / 2),
      },
      isOnboardingTourCompleted: true,
      isDetectedByAlgorithm: false,
      detectedLearningStyle: {
        input: detectStyle("sensing", sensing, "intuitive", intuitive),
        processing: detectStyle("active", active, "reflective", reflective),
        understanding: detectStyle("sequential", sequential, "global", global),
        perception: detectStyle("visual", visual, "verbal", verbal),
      },
    };
    console.log(learningStyle);

    return this.LearningStyleDao.save(learningStyle)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
    // return null;
  }
  public async getAllLearningStyle(): Promise<ILearningStyle[]> {
    this.logger.info("LearningStyleService - getAllLearningStyle()");
    return this.LearningStyleDao.getAll()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getLearningStyleById(id: string): Promise<ILearningStyle | Object> {
    this.logger.info("LearningStyleService - getLearningStyleById()");
    return this.LearningStyleDao.getById(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public async updateLearningStyle(id: string, Course: ILearningStyle): Promise<ILearningStyle | Object> {
    this.logger.info("Customer Services - updateCustomer()");
    return this.LearningStyleDao.update(id, Course)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async deleteLearningStyle(id: string): Promise<ILearningStyle | Object> {
    this.logger.info("LearningStyleService - deleteLearningStyle()");
    return this.LearningStyleDao.delete(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
}
