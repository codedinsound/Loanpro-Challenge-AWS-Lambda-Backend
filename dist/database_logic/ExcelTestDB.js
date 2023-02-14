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
exports.ExcelSheetTestDatabase = void 0;
const XLSX = require('xlsx');
const AWS = require('aws-sdk');
const utils_1 = require("../utils");
const s3Params = {
    Bucket: "loanpro-challenge-aws-la-serverlessdeploymentbuck-1mo1bm3wp9e2s",
    Key: "test-data/users_db.xlsx"
};
class ExcelSheetTestDatabase {
    // MARK: Obtain user data if user on Dummy Excel Sheet Test DB 
    findUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = XLSX.utils.sheet_to_json(this.workbook.Sheets[this.sheetNames[0]]);
            let user = null;
            db.forEach((userRecord) => {
                if (userRecord.username === username && userRecord.password === password) {
                    user = userRecord;
                    return;
                }
            });
            yield utils_1.AsyncTimer.sleep(500);
            if (!user)
                throw Error("User not found in excel sheet database");
            return user;
        });
    }
    // MARK: Connect to the XLSX Dummy DB 
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.s3 = new AWS.S3();
                let res = yield this.s3.getObject(s3Params).promise();
                const buffer = res.Body;
                this.workbook = XLSX.read(buffer);
                this.sheetNames = this.workbook.SheetNames;
            }
            catch (error) {
                console.log(error);
                console.log('database not found');
                this.disconnect();
            }
        });
    }
    // MARK: Disconnect from the database 
    disconnect() {
        console.log("disconnecting from excel test db");
    }
    // MARK: Gets User Balance
    getBalance(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userBalances = XLSX.utils.sheet_to_json(this.workbook.Sheets[this.sheetNames[1]]);
            let balance = -1;
            userBalances.forEach((user) => {
                if (user.user_id === +user_id) {
                    balance = user.balance;
                    return;
                }
            });
            yield utils_1.AsyncTimer.sleep(500);
            return balance;
        });
    }
    // MARK: Updates User Balance 
    updateBalance(uid, nb) {
        return __awaiter(this, void 0, void 0, function* () {
            let userID, newBalance;
            userID = +uid;
            newBalance = +nb;
            console.log(userID, newBalance);
            const userBalances = XLSX.utils.sheet_to_json(this.workbook.Sheets[this.sheetNames[1]]);
            userBalances.forEach((user) => {
                if (user.user_id === userID) {
                    user.balance = newBalance;
                    return;
                }
            });
            const ws = XLSX.utils.json_to_sheet(userBalances);
            this.workbook.Sheets[this.sheetNames[1]] = ws;
            const buffer = XLSX.write(this.workbook, { type: "buffer" });
            yield this.s3.putObject(Object.assign(Object.assign({}, s3Params), { Body: buffer })).promise();
        });
    }
    // MARK: Create New Operations Record 
    createNewArithmeticRecord(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const records = XLSX.utils.sheet_to_json(this.workbook.Sheets[this.sheetNames[2]]);
            const newRecord = {
                id: `${params[2]}-${records.length + 1}`,
                operation_id: params[4],
                user_id: +params[2],
                amount: +params[8],
                user_balance: +params[10],
                operation_response: params[6],
                date: `${new Date()}`,
                flag: 'F'
            };
            records.push(newRecord);
            const updatedWS = XLSX.utils.json_to_sheet(records);
            this.workbook.Sheets[this.sheetNames[2]] = updatedWS;
            const buffer = XLSX.write(this.workbook, { type: "buffer" });
            yield this.s3.putObject(Object.assign(Object.assign({}, s3Params), { Body: buffer })).promise();
            return {};
        });
    }
    // MARK: Retrieve User Records 
    retrieveRecords(uid) {
        const userID = +uid;
        const records = XLSX.utils.sheet_to_json(this.workbook.Sheets[this.sheetNames[2]]);
        const specificUserRecords = records.filter((item) => item.user_id === userID && item.flag != 'T');
        return specificUserRecords;
    }
    // MARK: Query the database 
    query(q) {
        let response = null;
        const params = q.split(' ');
        if (params.length >= 3) {
            const command = params[0];
            switch (command) {
                case "AUTH":
                    response = this.findUser(params[1], params[2]);
                    break;
                case 'GET_BALANCE':
                    response = this.getBalance(params[2]);
                    break;
                case 'UPDATE_BALANCE':
                    response = this.updateBalance(params[2], params[4]);
                    break;
                case 'CREATE_RECORD':
                    response = this.createNewArithmeticRecord(params);
                    break;
                case 'GET_USER_RECORDS':
                    response = this.retrieveRecords(params[2]);
                    break;
                case 'DELETE_SPECIFIC_RECORD':
                    console.log("...");
                    break;
                default:
            }
        }
        if (!response)
            throw Error("Invalid Query");
        return response;
    }
}
exports.ExcelSheetTestDatabase = ExcelSheetTestDatabase;
//# sourceMappingURL=ExcelTestDB.js.map