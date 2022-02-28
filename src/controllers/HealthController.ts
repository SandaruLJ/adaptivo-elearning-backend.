import config from "../config/config";
import {Logger} from "../loaders/logger";


export default class HealthController {
    public logger: Logger;
    constructor() {
        this.logger = Logger.getInstance();
    }

    public displayHealth = (req: any, res: any) => {
        this.logger.info("HealthController - displayHealth()");

        const today = new Date();
        const time = today.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" });
        const response = {
            note: "Backend up and running",
            time: time,
            version: config.version,
        };
        res.status(200).json(response);
    };
}
