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
exports.authenticateUser = void 0;
const controllers_1 = require("../controllers");
const database_logic_1 = require("../database_logic");
const utils_1 = require("../utils");
// MARK: Genearte a session token
function generateToken(response, p, database) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get Users Balance 
        const balance = yield database.query(`GET_BALANCE USER= ${response.id}`);
        const listOfTokens = ['abc1', 'abc2', 'abc3', 'abc4', 'abc5'];
        yield utils_1.AsyncTimer.sleep(500);
        return {
            status: 'active',
            date: new Date(),
            balance,
            userID: response.id,
            username: response.username,
            sessionToken: listOfTokens[utils_1.NumberGenerator.generate(listOfTokens.length - 1)]
        };
    });
}
// MARK: Check If There is Any Errors 
function checkForErrorMessages(response, p) {
    if (response.error)
        return { error: response.error };
    if (response.password !== p)
        return { error: "Wrong Password!" };
    if (response.status === 'inactive')
        return { error: "User account is inactive!" };
    return { error: '' };
}
// MARK: Authenticate User 
function authenticateUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const database = controllers_1.DatabaseManagerController.instance();
        database.setDatabase(new database_logic_1.ExcelSheetTestDatabase());
        yield database.connect();
        const { u, p } = data;
        const response = yield database.query(`AUTH ${u} ${p}`);
        // Check For Any Error Reponse 
        const { error } = checkForErrorMessages(response, p);
        if (error.length > 0)
            return error;
        const token = yield generateToken(response, p, database);
        database.disconnect();
        return token;
    });
}
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=authentication.js.map