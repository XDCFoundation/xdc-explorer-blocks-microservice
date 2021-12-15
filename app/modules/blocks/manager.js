import BlockModel from "../../models/Blocks";
import Utils from "../../utils/index";
import {httpConstants} from "../../common/constants";

export default class BlocksManager {
    async getLatestBlocks(req) {
        Utils.lhtLog("BlocksManager:getLatestBlocks", "req", {req}, '', httpConstants.LOG_LEVEL_TYPE.INFO);
        return await BlockModel.getBlockList({}, {},parseInt(req.skip),parseInt(req.limit), {number: -1});
    }

    async getTotalBlocks() {
        Utils.lhtLog("BLManager:getTotalBlocks", "get total block count", "", "")
        return await BlockModel.count();
    }

    async getBlockDetailsUsingBlockNumber(blockNumber,query) {
        Utils.lhtLog("BLManager:getTotalBlocks", "get total block count", {hash:query.hash,blockNumber}, "")
        let findObj ={};
        if(!query || !query.hash){
            findObj = {number: parseInt(blockNumber)};}
        else {
            findObj = {number: parseInt(blockNumber),hash:query.hash.toString()};
        }

        return await BlockModel.getBlock(findObj)

    }
}