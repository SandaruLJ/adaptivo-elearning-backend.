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

  public async getLearningResourcesByIds(arr: string): Promise<ILearningResource[] | Object[]> {
    this.logger.info("LearningResourceService - getLearningResourceById()");
    return this.LearningResourceDao.getAllByIds(arr)
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
    return this.LearningResourceDao.update(id, LearningResource)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
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

  public async encodeLearningResources(lrIdArr: any, attempt = 0) {
    this.logger.info("LearningResourceService - encodeLearningResources()");

    //Check if the maximum number of attempts has been reached
    if (attempt != 3) {
      let jobIds = [];
      let jobStatus = [];
      let failedJobLRIds = [];

      let lrs = await this.getLearningResourcesByIds(lrIdArr);

      lrs.map(async (lr) => {
        //Only the folder should be passed as the input url so the file name is programatically removed
        let url = lr.url;
        let split = url.split("/");
        split.splice(split.length - 1, 1);
        let newUrl = split.join("/");

        const inputUrl = newUrl + "/";
        const outputUrl = `https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/encoded/concepts/${split[split.length - 1]}/`;

        let response: any = await DrmService.getInstance().encodeFile(inputUrl, outputUrl);

        if (response) {
          jobIds.push(response.JobId);
          this.logger.info(`LearningResourceService - ${response.JobId} created successfully`);
        }
      });

      //Checks the status of jobs every 5 mins
      const jobInterval = setInterval(async () => {
        this.logger.info("LearningResourceService - Set Job Interval");

        let count = 0;

        //loop through jobIds and set jobStatus
        for (let i in jobIds) {
          if (!jobStatus[i]) {
            let data: any = await DrmService.getInstance().getJobStatus(jobIds[i]);
            jobStatus[count] = data.Success;
          }
          count++;
        }
        this.logger.info("LearningResourceService - jobStatus");
        this.logger.info(jobStatus.join(","));

        //Check the status of jobs
        let hasCompleted = true;
        let hasFailed = false;

        for (let j in jobStatus) {
          if (jobStatus[j] == null) {
            hasCompleted = false;
          }
          if (jobStatus[j] == false) {
            hasFailed = true;
            //Add the failed learning resource Id
            failedJobLRIds.push(lrIdArr[j]);
          }
        }

        if (hasCompleted) {
          this.logger.info("LearningResourceService - Video encoding completed");

          if (hasFailed) {
            this.logger.info(`LearningResourceService - ${failedJobLRIds.length} videos have been failed to encode`);
            this.logger.info("Failed Learning Resource Ids - " + failedJobLRIds.join(","));
          } else {
            this.logger.info("LearningResourceService - Encoding successful without failures");
          }
          let successfulLRS = lrIdArr.filter((val) => !failedJobLRIds.includes(val));
          console.log(successfulLRS);

          clearInterval(jobInterval);
          await this.updateLRUrlsAfterEncoding(successfulLRS);

          if (hasFailed) {
            //Retry failed attempts
            this.encodeLearningResources(failedJobLRIds, attempt + 1);
          }
        }
      }, 300000);
    } else {
      this.logger.info("LearningResourceService - encodeLearningResources() - Maximum number of attempts reached");
      this.logger.info("LearningResourceService - Failed learning resources after 3 attempts");
      this.logger.info(lrIdArr.join(","));
    }
  }

  public async updateLRUrlsAfterEncoding(successfulLRArr: any) {
    this.logger.info("LearningResourceService - updateLRUrlsAfterEncoding");

    let lrs = await this.getLearningResourcesByIds(successfulLRArr);

    let promises = lrs.map(async (lr) => {
      let url = lr.url;

      const outputUrl = "https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/encoded/concepts/";

      let split = url.split("/");
      split.splice(split.length - 1, 1);

      let newUrl = outputUrl + split[split.length - 1] + "/manifest.m3u8";

      //Set the url of the encoded file to the learning resource
      lr.url = newUrl;

      await this.LearningResourceDao.update(lr._id, lr);
    });
    await promises.reduce((m, o) => m.then(() => o), Promise.resolve());

    this.logger.info("LearningResourceService - LRs Url updated successfully");
  }
}
