import { ILearningResource } from "../interfaces/ILearningResource.js";
import { Logger } from "../loaders/logger.js";
import { ILearningResourceService } from "./interfaces/ILearningResourceService.js";
import { LearningResourceDao } from "../dao/LearningResourceDao.js";
import { getPreSignedUrl } from "../libs/getPreSignedUrl.js";
import { DrmService } from "./DrmService.js";

export class LearningResourceService implements ILearningResourceService {
  private logger = Logger.getInstance();
  public static instance: LearningResourceService = null;
  private LearningResourceDao = LearningResourceDao.getInstance();
  public static getInstance(): LearningResourceService {
    if (this.instance === null) {
      this.instance = new LearningResourceService();
    }
    return this.instance;
  }

  public async createLearningResource(request: ILearningResource): Promise<ILearningResource> {
    this.logger.info("LearningResourceService - createLearningResource()");

    return this.LearningResourceDao.save(request)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getAllLearningResource(): Promise<ILearningResource[]> {
    this.logger.info("LearningResourceService - getAllLearningResource()");
    return this.LearningResourceDao.getAll()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getLearningResourceById(id: string): Promise<ILearningResource | Object> {
    this.logger.info("LearningResourceService - getLearningResourceById()");
    return this.LearningResourceDao.getById(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public async updateLearningResource(id: string, LearningResource: ILearningResource): Promise<ILearningResource | Object> {
    this.logger.info("LearningResourceService - updateLearningResource()");
    // this.encodeLearningResources(id);
    this.updateEncodedLearningResource();
    return { status: "Success" };
    // return this.encodeLearningResources(id)
    //   .then((data) => {
    //     return data;
    //   })
    //   .catch((error) => {
    //     this.logger.error(error.message);
    //     throw error;
    //   });

    // let lrs = await this.getAllLearningResource();
    // let count = 0;
    // let totCount = 0;
    // let promises = lrs.map(async (lr) => {
    //   totCount++;
    //   console.log(lr.style);
    //   if (lr.style) {
    //     if (lr.type == "video") {
    //       let url = lr.url.replace("files", "videos");
    //       if (url.includes("concepts")) {
    //         let split = url.split("/");
    //         let stringToReplace = split[split.length - 1];
    //         stringToReplace = stringToReplace.split(".")[0].replace(/\+/g, "");
    //         stringToReplace = stringToReplace.replace(/\s/g, "");
    //         if (split[split.length - 2] == stringToReplace) {
    //         } else {
    //           split.splice(split.length - 1, 0, stringToReplace);
    //           let newUrl = split.join("/");
    //           // console.log(newUrl);
    //           lr.url = newUrl;
    //           // console.log(lr);
    //           await this.LearningResourceDao.update(lr._id, lr);
    //           count++;
    //           console.log(count);
    //           // return true;
    //         }
    //       }
    //     }
    //   }
    // });
    // await promises.reduce((m, o) => m.then(() => o), Promise.resolve());
    // console.log(count);
    // console.log("Tot Count = " + totCount);
    // return { count };
    // return this.LearningResourceDao.update(id, LearningResource)
    //   .then((data) => {
    //     return data;
    //   })
    //   .catch((error) => {
    //     this.logger.error(error.message);
    //     throw error;
    //   });

    // this.logger.info("LearningResourceService - updateLearningResource()");
    // return this.LearningResourceDao.update(id, LearningResource)
    //   .then((data) => {
    //     return data;
    //   })
    //   .catch((error) => {
    //     this.logger.error(error.message);
    //     throw error;
    //   });
  }
  public async deleteLearningResource(id: string): Promise<ILearningResource | Object> {
    this.logger.info("LearningResourceService - deleteLearningResource()");
    return this.LearningResourceDao.delete(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public async getVideoSignedUrl(fileName: string): Promise<Object> {
    this.logger.info("LearningResourceService - getVideoSignedUrl()");

    const bucketName = `spark-courses`;
    const key = `62272fbfc8ea4d8b75b76aa2/resources/videos/${fileName}`;

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
    this.logger.info("LearningResourceService - getAudioSignedUrl()");

    const bucketName = `spark-courses`;
    const key = `62272fbfc8ea4d8b75b76aa2/resources/audio/${fileName}`;

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
    this.logger.info("LearningResourceService - getAudioSignedUrl()");

    const bucketName = `spark-courses`;
    const key = `62272fbfc8ea4d8b75b76aa2/resources/files/${fileName}`;

    return getPreSignedUrl(bucketName, key)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public async encodeLearningResources(id: string) {
    this.logger.info("LearningResourceService - updateLearningResource()");

    // const inputUrl = "https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/concepts/videos/ApplicationsofTrigonometry/";
    // const outputUrl = "https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/encoded/concepts/";
    let jobIds = [];
    let jobStatus = [];
    let failedJobLRIds = [];
    // let split = inputUrl.split("/");
    // let newUrl = outputUrl + split[split.length - 2] + "/manifest.m3u8";
    // console.log(newUrl);

    // let response: any = await DrmService.getInstance().encodeFile(inputUrl, outputUrl);

    // console.log(response);
    // if (response) {
    //   jobIds.push(response.JobId);
    // }
    // console.log(jobIds);
    // const jobInterval = setInterval(async () => {
    //   let count = 0;
    //   console.log(jobIds);

    //   for (let i in jobIds) {
    //     if (!jobStatus[i]) {
    //       console.log("i = " + jobIds[i]);
    //       let data: any = await DrmService.getInstance().getJobStatus(jobIds[i]);
    //       console.log(data);
    //       jobStatus[count] = data.Success;
    //       console.log(jobStatus);
    //     }
    //     count++;
    //   }

    //   let hasFailed = false;
    //   for (let j in jobStatus) {
    //     if (!jobStatus[j]) {
    //       hasFailed = true;
    //     }
    //   }
    //   if (!hasFailed) {
    //     console.log("interval stopped");
    //     clearInterval(jobInterval);
    //   }
    // }, 60000);

    // return DrmService.getInstance()
    //   .getJobStatus("f8e9a18e-3bed-408e-b208-5ed3a14c456a")
    //   .then((data) => {
    //     return data;
    //   })
    //   .catch((error) => {
    //     this.logger.error(error.message);
    //     throw error;
    //   });

    let lrs = await this.getAllLearningResource();
    let totCount = 0;
    // let jobIds = [];

    lrs.map(async (lr) => {
      if (lr.style) {
        if (lr.type == "video") {
          let url = lr.url;
          if (url.includes("concepts")) {
            let split = url.split("/");
            split.splice(split.length - 1, 1);
            let newUrl = split.join("/");

            const inputUrl = newUrl + "/";
            const outputUrl = `https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/encoded/concepts/${split[split.length - 1]}/`;

            console.log("Input url = " + inputUrl);
            console.log("Output url = " + outputUrl);

            let response: any = await DrmService.getInstance().encodeFile(inputUrl, outputUrl);

            if (response) {
              jobIds.push(response.JobId);
            }
            totCount++;
          }
        }
      }
    });
    console.log(jobIds);
    console.log(totCount);

    const jobInterval = setInterval(async () => {
      console.log("setInterval called");
      let count = 0;

      for (let i in jobIds) {
        if (!jobStatus[i]) {
          let data: any = await DrmService.getInstance().getJobStatus(jobIds[i]);
          jobStatus[count] = data.Success;
        }
        count++;
      }
      console.log(jobStatus);

      let hasCompleted = true;
      let hasFailed = false;
      for (let j in jobStatus) {
        if (jobStatus[j] == null) {
          hasCompleted = false;
        }
        if (jobStatus[j] == false) {
          hasFailed = true;
          failedJobLRIds.push(jobIds[j]);
        }
      }

      if (hasCompleted) {
        console.log("interval stopped");
        console.log("Failed Job Ids");
        console.log(failedJobLRIds);
        clearInterval(jobInterval);
        await this.updateEncodedLearningResource();
      }
    }, 300000);
  }

  public async updateEncodedLearningResource(): Promise<ILearningResource | Object> {
    this.logger.info("LearningResourceService - updateEncodedLearningResource()");

    let lrs = await this.getAllLearningResource();
    let count = 0;

    let promises = lrs.map(async (lr) => {
      if (lr.style) {
        if (lr.type == "video") {
          let url = lr.url;
          if (url.includes("concepts")) {
            const outputUrl = "https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/encoded/concepts/";

            let split = url.split("/");
            split.splice(split.length - 1, 1);

            let newUrl = outputUrl + split[split.length - 1] + "/manifest.m3u8";
            lr.url = newUrl;

            await this.LearningResourceDao.update(lr._id, lr);
            count++;
            // return true;
          }
        }
      }
    });
    await promises.reduce((m, o) => m.then(() => o), Promise.resolve());
    console.log("The count of entries updated are - " + count);
    return { count };
    // return this.LearningResourceDao.update(id, LearningResource)
    //   .then((data) => {
    //     return data;
    //   })
    //   .catch((error) => {
    //     this.logger.error(error.message);
    //     throw error;
    //   });

    // this.logger.info("LearningResourceService - updateLearningResource()");
    // return this.LearningResourceDao.update(id, LearningResource)
    //   .then((data) => {
    //     return data;
    //   })
    //   .catch((error) => {
    //     this.logger.error(error.message);
    //     throw error;
    //   });
  }
}
