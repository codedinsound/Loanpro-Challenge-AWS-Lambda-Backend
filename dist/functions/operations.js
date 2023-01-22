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
exports.processUserOperation = void 0;
const controllers_1 = require("../controllers");
const database_logic_1 = require("../database_logic");
const models_1 = require("../models");
const record_keeping_functions_1 = require("./record_keeping_functions");
// MARK: Process Arithmetic Operation
function runArithemticOperation(operation, balance, cost) {
    switch (operation) {
        case 'ADD':
            balance = balance + cost;
            break;
        case 'SUBTRACT':
            balance -= cost;
            break;
        case 'MULTIPLY':
            balance *= cost;
            break;
        case 'DIVIDE':
            balance /= cost;
            break;
        case 'SQUAREROOT':
            balance = Math.sqrt(balance);
            break;
        default:
    }
    return balance;
}
// MARK: Check if the Operation is Valid
function checkIfOperationIsValid(operation, balance, cost) {
    let isValid = '';
    switch (operation) {
        case 'ADD':
            if (cost <= 0 || cost >= models_1.MAX_LIMIT)
                isValid = 'cost <= 0 || cost >= 10E9';
            break;
        case 'SUBTRACT':
            if (balance <= 0 || cost > balance)
                isValid = 'balance <= 0 || cost > balance';
            break;
        case 'MULTIPLY':
            if (cost > 10E7)
                isValid = "cost multiply can't be higher than 10E7";
            break;
        case 'DIVIDE':
            if (balance < 1)
                isValid = 'balance cant be less than 1 when dividing';
            break;
        case 'SQUAREROOT':
            if (balance < 1)
                isValid = 'balance cant be less than 1 when dividing';
            break;
        default:
            isValid = 'random string passed no operation detected';
    }
    return isValid;
}
// MARK: Process User Operation 
function processUserOperation(data) {
    return __awaiter(this, void 0, void 0, function* () {
        let prevBalance, newBalance, isValid;
        const database = controllers_1.DatabaseManagerController.instance();
        yield database.setDatabase(new database_logic_1.ExcelSheetTestDatabase()).connect();
        const { userID, operation, cost } = data;
        prevBalance = yield database.query(`GET_BALANCE USER= ${userID}`);
        isValid = checkIfOperationIsValid(operation, prevBalance, cost);
        if (isValid.length > 0)
            return { status: 'error', error: isValid };
        newBalance = runArithemticOperation(operation, prevBalance, data.cost);
        // Update User Balance
        yield database.query(`UPDATE_BALANCE USER= ${userID} BALANCE= ${newBalance}`);
        const response = {
            status: 'balance updated',
            date: new Date(),
            balance: newBalance
        };
        let res = JSON.stringify(response).replace(' ', '-');
        // Create an Arithmetic Record
        yield database.query(`CREATE_RECORD USER= ${userID} OPERATION= ${operation} RES= ${res} AMOUNT= ${cost} USER_BALANCE= ${newBalance}`);
        (0, record_keeping_functions_1.createArithmeticRecord)(userID, operation, res, cost, newBalance, database);
        return response;
    });
}
exports.processUserOperation = processUserOperation;
//# sourceMappingURL=operations.js.map