import { ILearningStyle } from "../interfaces/ILearningStyle.js";
import { Logger } from "../loaders/logger.js";
import { ILearningStyleService } from "./interfaces/ILearningStyleService.js";
import { LearningStyleDao } from "../dao/LearningStyleDao.js";
import { PreferenceDao } from "../dao/PreferenceDao.js";
import fetch from "node-fetch";
import { UserActivityDao } from "../dao/UserActivityDao.js";
import { UserActivityService } from "./UserActivityService.js";
import { UserService } from "./UserService.js";
import { UserCourseService } from "./UserCourseService.js";

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
    const userId = await UserService.getInstance().getUserIdByEmail(request.email);
    let learningStyle: any = {
      userId: userId,
      input: {
        initial: {
          visual: visual / 2,
          verbal: verbal / 2,
          visualStrength: detectStrength(visual / 2),
          verbalStrength: detectStrength(verbal / 2),
        },
      },
      processing: {
        initial: {
          active: active / 2,
          reflective: reflective / 2,
          activeStrength: detectStrength(active / 2),
          reflectiveStrength: detectStrength(reflective / 2),
        },
      },
      understanding: {
        initial: {
          sequential: sequential / 2,
          global: global / 2,
          sequentialStrength: detectStrength(sequential / 2),
          globalStrength: detectStrength(global / 2),
        },
      },
      perception: {
        initial: {
          sensing: sensing / 2,
          intuitive: intuitive / 2,
          sensingStrength: detectStrength(sensing / 2),
          intuitiveStrength: detectStrength(intuitive / 2),
        },
      },
      isOnboardingTourCompleted: true,
      isDetectedByAlgorithm: false,
      detectedLearningStyle: {
        input: detectStyle("visual", visual, "verbal", verbal),
        processing: detectStyle("active", active, "reflective", reflective),
        understanding: detectStyle("sequential", sequential, "global", global),
        perception: detectStyle("sensing", sensing, "intuitive", intuitive),
      },
      initialLearningStyle: {
        input: detectStyle("visual", visual, "verbal", verbal),
        processing: detectStyle("active", active, "reflective", reflective),
        understanding: detectStyle("sequential", sequential, "global", global),
        perception: detectStyle("sensing", sensing, "intuitive", intuitive),
      },
    };
    learningStyle.history = [
      {
        input: learningStyle.input,
        processing: learningStyle.processing,
        understanding: learningStyle.understanding,
        perception: learningStyle.perception,
        detectedLearningStyle: learningStyle.detectedLearningStyle,
      },
    ];

    return this.LearningStyleDao.save(learningStyle)
      .then(async (data) => {
        const nonAdaptedUsers = ["62f69e6db9190a542c45c61f", "62f69e6cb9190a542c45c61d", "62f69e69b9190a542c45c61b", "62f69e95b9190a542c45c625"];
        if (!nonAdaptedUsers.includes(userId.toString())) {
          // Science Adaptive Course
          const request = {
            userId: userId,
            courseId: "62ea7ec10adc970a2ee22b00",
          };
          await UserCourseService.getInstance().createUserCourse(request);
          //Maths Adaptive Course
          const requestMaths = {
            userId: userId,
            courseId: "62f7fce07447892f99ccedf2",
          };
          await UserCourseService.getInstance().createUserCourse(requestMaths);
        } else {
          //Non adapted Course
          const request = {
            userId: userId,
            courseId: "62ea45d24263e1a13311391b",
          };
          await UserCourseService.getInstance().createUserCourse(request);

          //Maths NonAdaptive Course
          const requestMaths = {
            userId: userId,
            courseId: "62f7ff5c7447892f99ccef47",
          };
          await UserCourseService.getInstance().createUserCourse(requestMaths);
        }

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

  public async getLearningStyleByUserId(id: string): Promise<any> {
    this.logger.info("LearningStyleService - getLearningStyleByUserId()");
    return this.LearningStyleDao.getByUserId(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public async updateLearningStyle(data: any): Promise<Object> {
    this.logger.info("LearningStyleService - updateLearningStyle()");
    let response = [];

    const detectStyle = (style1, style2, score) => {
      let style;
      if (score == 0) {
        style = "balanced";
      } else if (score == 1) {
        style = `moderate ${style1}`;
      } else if (score == -1) {
        style = `moderate ${style2}`;
      } else if (score >= 2) {
        style = `strong ${style1}`;
      } else if (score <= -2) {
        style = `strong ${style2}`;
      }

      return style;
    };
    data.styles.map(async (style) => {
      const userId = await UserService.getInstance().getUserIdByEmail(style.user);
      const learningStyle = await this.getLearningStyleByUserId(userId);

      if (learningStyle) {
        learningStyle.input = {
          sensing: style.sensing.value,
          intuitive: style.intuitive.value,
          sensingStrength: style.sensing.strength,
          intuitiveStrength: style.intuitive.strength,
        };
        learningStyle.processing = {
          active: style.active.value,
          reflective: style.reflective.value,
          activeStrength: style.active.strength,
          reflectiveStrength: style.reflective.strength,
        };
        learningStyle.understanding = {
          sequential: style.sequential.value,
          global: style.global.value,
          sequentialStrength: style.sequential.strength,
          globalStrength: style.global.strength,
        };
        learningStyle.perception = {
          visual: style.visual.value,
          verbal: style.verbal.value,
          visualStrength: style.visual.strength,
          verbalStrength: style.verbal.strength,
        };

        learningStyle.isDetectedByAlgorithm = true;

        let courseId = data.courseId;

        learningStyle.detectedLearningStyle = {
          courseId: {
            input: detectStyle("sensing", "intuitive", style.sensing.value + style.intuitive.value),
            processing: detectStyle("active", "reflective", style.active.value + style.reflective.value),
            understanding: detectStyle("global", "sequential", style.global.value + style.sequential.value),
            perception: detectStyle("visual", "verbal", style.visual.value + style.verbal.value),
          },
        };

        learningStyle.history.push({
          input: learningStyle.input,
          processing: learningStyle.processing,
          understanding: learningStyle.understanding,
          perception: learningStyle.perception,
          detectedLearningStyle: learningStyle.detectedLearningStyle,
          date: new Date().toJSON(),
          courseId: courseId,
        });
      }

      await this.LearningStyleDao.update(learningStyle._id, learningStyle)
        .then((data) => {
          this.logger.info(`LearningStyle for user ${style.user} updated successfully`);
        })
        .catch((error) => {
          this.logger.error(error.message);
          throw error;
        });
    });

    return response;
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
  public async analyzeLearningStyles(): Promise<any> {
    this.logger.info("LearningStyleService - analyzeLearningStyle()");
    return UserActivityService.getInstance()
      .getAllUserActivity()
      .then(async (data) => {
        const response = fetch("http://localhost:5000/api/v1/analyse/", { method: "POST", body: JSON.stringify(data) });
        return { status: "Success" };
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
}
