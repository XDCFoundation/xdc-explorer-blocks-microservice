/**
 * Created by Developer on 18/09/20.
 */
import * as ValidationManger from "../middleware/validation";
import TestModule from "../app/modules/testModule";
import {stringConstants} from "../app/common/constants"
import BlocksController from "../app/modules/blocks";

module.exports = (app) => {
    app.get('/', (req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

    /**
     * route definition
     */
    app.get("/getLatestBlocks", ValidationManger.validateLatestBlocks, new BlocksController().getLatestBlocks);

    app.get("/getTotalBlocks", new BlocksController().getTotalBlocks);

    app.get("/getBlockDetailsUsingBlockNumber/:blockNumber", ValidationManger.validateBlockNumber, new BlocksController().getBlockDetailsUsingBlockNumber);

    app.get("/test-route", ValidationManger.validateUserLogin, new TestModule().testRoute);


};
