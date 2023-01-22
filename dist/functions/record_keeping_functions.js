"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserArithmeticRecords = exports.createArithmeticRecord = void 0;
const controllers_1 = require("../controllers");
const database_logic_1 = require("../database_logic");
// MARK: Create a new User Arithmetic Record 
function createArithmeticRecord(userID, operation, res, cost, newBalance, db) {
    db.query(`CREATE_RECORD USER= ${userID} OPERATION= ${operation} RES= ${res} AMOUNT= ${cost} USER_BALANCE= ${newBalance}`);
}
exports.createArithmeticRecord = createArithmeticRecord;
// MARK: Gets Users Arithmetic Records 
function getUserArithmeticRecords(data) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        const database = controllers_1.DatabaseManagerController.instance();
        database.setDatabase(new database_logic_1.ExcelSheetTestDatabase()).connect();
        const { userID, sessionToken } = data;
        if (!userID || !sessionToken)
            return { error: '' };
        response = checkIfSessionIsActiveandUserIsValid(userID, sessionToken, database);
        console.log(response);
        response = yield database.query(`GET_USER_RECORDS USER= ${userID}`);
        return response;
    });
}
exports.getUserArithmeticRecords = getUserArithmeticRecords;
// MARK: Check if User is signed 
function checkIfSessionIsActiveandUserIsValid(userID, sessionToken, db) {
    return __awaiter(this, void 0, void 0, function* () {
        let tokensMap = new Map(['abc1', 'abc2', 'abc3', 'abc4', 'abc5'].map(t => [t, true])); // dummy session token validation in the backend 
        let res = yield db.query(`GET_BALANCE USER= ${userID}`);
        if (res.error || !tokensMap.get(sessionToken))
            return { error: "User is not logged in or Invalid Operation" };
        return {};
    });
}
//# sourceMappingURL=record_keeping_functions.js.map