import { Logger } from "../loaders/logger.js";
import { CategoryService } from "../services/CategoryService.js";
import { ICategory } from "../interfaces/ICategory.js";
import { ICategoryService } from "../services/interfaces/ICategoryService.js";
import Category from "../models/Category.js";

import autoBind from "auto-bind";

export default class CategoryController {
  private logger: Logger;
  private CategoryService: ICategoryService;

  constructor() {
    this.logger = Logger.getInstance();
    this.CategoryService = CategoryService.getInstance();
    autoBind(this);
  }

  public async createCategory(req: any, res: any) {
    this.logger.info("CategoryController - createCategory()");

    if (req.body) {
      const Category: ICategory = req.body;

      await this.CategoryService.createCategory(Category)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          this.logger.error(error.message);
          res.status(500).send({ err: error.message });
        });
    }
  }
  public async getAllCategory(req: any, res: any) {
    this.logger.info("CategoryController - getAllCategory()");

    await this.CategoryService.getAllCategory()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }
  public async getCategoryById(req: any, res: any) {
    this.logger.info("CategoryController - getCategoryById()");
    const id = req.params.id;
    await this.CategoryService.getCategoryById(id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }

  public async updateCategory(req: any, res: any) {
    this.logger.info("CategoryController - updateCategory()");
    const id = req.params.id;

    if (req.body) {
      const Category: ICategory = req.body;

      await this.CategoryService.updateCategory(id, Category)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          this.logger.error(error.message);
          res.status(500).send({ err: error.message });
        });
    } else {
      res.status(404);
    }
  }

  public async deleteCategory(req: any, res: any) {
    this.logger.info("CategoryController - deleteCategory()");
    const id = req.params.id;
    await this.CategoryService.deleteCategory(id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }
}
