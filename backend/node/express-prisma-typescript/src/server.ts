import {Constants, Logger} from "@utils";
import {server} from "@app";

server.listen(Constants.PORT, () => {
    Logger.info(`Server listening on port ${Constants.PORT}`);
});