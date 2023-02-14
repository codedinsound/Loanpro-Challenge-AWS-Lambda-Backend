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
exports.retrieveUserOperationsRecord = exports.processUserArithmeticOperation = exports.authenticate = void 0;
const utils_1 = require("./utils");
const functions_1 = require("./functions");
// ==========================================================================================================
// AWS LAMBDA FUNCTIONS
// ==========================================================================================================
// MARK: Authenticate User Handler Lambda
const authenticate = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (!event.body)
        return utils_1.LambdaResponseGenerator.respond(404, 'No params received', { error: "no parameters received..." });
    const body = JSON.parse(event.body);
    const token = yield (0, functions_1.authenticateUser)(body);
    return utils_1.LambdaResponseGenerator.respond(200, 'User Authenticated', token);
});
exports.authenticate = authenticate;
// MARK: Process User Arithmetic Operation Handler Lambda
const processUserArithmeticOperation = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (!event.body)
        return utils_1.LambdaResponseGenerator.respond(404, 'No params received', { error: "no parameters received..." });
    const body = JSON.parse(event.body);
    const token = yield (0, functions_1.processUserOperation)(body);
    return utils_1.LambdaResponseGenerator.respond(200, 'Operation Handled', token);
});
exports.processUserArithmeticOperation = processUserArithmeticOperation;
// MARK: Retrieves Users Operation Records Record of User
const retrieveUserOperationsRecord = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (!event.body)
        return utils_1.LambdaResponseGenerator.respond(404, 'No params received', { error: "no parameters received..." });
    const body = JSON.parse(event.body);
    const token = yield (0, functions_1.getUserArithmeticRecords)(body);
    return utils_1.LambdaResponseGenerator.respond(200, 'Records Retrieved', token);
});
exports.retrieveUserOperationsRecord = retrieveUserOperationsRecord;
//# sourceMappingURL=index.js.map