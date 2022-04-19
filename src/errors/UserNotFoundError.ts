import NotFoundError from "./NotFoundError.js";

export default class UserNotFoundError extends NotFoundError {
  constructor(message: string) {
    super(message || "User not found", 404);
  }
}
