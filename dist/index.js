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
exports.operations = exports.authenticate = void 0;
const utils_1 = require("./utils");
const functions_1 = require("./functions");
const enviroment = process.env.NODE_ENV || 'production';
console.log(`Current Enviroment Set: ${enviroment}`);
// AWS LAMBDA FUNCTIONS
// ==========================================================================================================
// MARK: Authenticate User Lambda
const authenticate = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, functions_1.authenticateUser)(event);
    let res = utils_1.LambdaResponseGenerator.respond(200, 'User Authenticated', token);
    return res;
});
exports.authenticate = authenticate;
// MARK: Operations Handler Lambda
const operations = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, functions_1.processUserOperation)(event);
    let res = utils_1.LambdaResponseGenerator.respond(200, 'Operation Handled', token);
    return res;
});
exports.operations = operations;
// // MARK: Retrieves Users Operation Records Record of User
// export const retrieveUserOperationsRecord = async(event: any, context: any) => {
//     console.log(event); 
// }; 
//# sourceMappingURL=index.js.map