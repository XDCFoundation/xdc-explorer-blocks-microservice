import BlocksManager from "./manager"
import Utils from "../../utils";
import {apiSuccessMessage, httpConstants} from "../../common/constants";

export default class BlocksController {
    async getLatestBlocks(request, response) {
        Utils.lhtLog("BlocksController:getLatestBlocks", "requestBody", request.query, '', httpConstants.LOG_LEVEL_TYPE.INFO);
        const [error, getLatestBlocksRes] = await Utils.parseResponse(
            new BlocksManager().getLatestBlocks(request.query)
        );
        if (!getLatestBlocksRes || error) {
            Utils.lhtLog("Manager:getLatestBlocks", "getLatestBlocks end", error, "", "ERROR")
            return Utils.handleError([error], request, response);
        }
        return Utils.response(response, getLatestBlocksRes, apiSuccessMessage.LATEST_BLOCK_FETCH_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK);
    }

    async getTotalBlocks(request, response) {
        Utils.lhtLog("BlocksController:getTotalBlocks", "requestBody", "", '', httpConstants.LOG_LEVEL_TYPE.INFO);
        let [error, getTotalBlockResponse] = await Utils.parseResponse(new BlocksManager().getTotalBlocks())
        if (error) {
            Utils.lhtLog("Manager:getTotalBlocks", "getTotalBlocks end", error, "", "ERROR")
            return Utils.handleError([error], request, response);
        }
        return Utils.response(response, getTotalBlockResponse, apiSuccessMessage.TOTAL_BLOCK_FETCH_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK);
    }

    async getBlockDetailsUsingBlockNumber(request, response) {
        Utils.lhtLog("BlocksController:getBlockDetailsUsingBlockNumber", "requestBody", {number:request.params.blockNumber,hash:request.query.hash}, '', httpConstants.LOG_LEVEL_TYPE.INFO);
        let [error, getBlockDetailsUsingBlockNumberResponse] = await Utils.parseResponse(new BlocksManager().getBlockDetailsUsingBlockNumber(request.params.blockNumber,request.query))
        if (error) {
            Utils.lhtLog("Manager:getBlockDetailsUsingBlockNumber", "getTotalBlocks end", error, "", "ERROR")
            return Utils.handleError([error], request, response);
        }
        return Utils.response(response, getBlockDetailsUsingBlockNumberResponse, apiSuccessMessage.TOTAL_BLOCK_FETCH_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK);
    }

}