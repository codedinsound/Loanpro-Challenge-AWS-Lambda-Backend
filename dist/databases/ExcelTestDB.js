"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelSheetTestDatabase = void 0;
const XLSX = require('xlsx');
class ExcelSheetTestDatabase {
    // MARK: Obtain user data if user on Dummy Excel Sheet Test DB 
    findUser(username, password) {
        console.log(username, password);
        const db = XLSX.utils.sheet_to_json(this.workbook.Sheets[this.sheetNames[0]]);
        let user = null;
        db.forEach((userRecord) => {
            if (userRecord.username === username) {
                user = userRecord;
                return;
            }
        });
        if (!user)
            throw Error("User not found in excel sheet database");
        return user;
    }
    // MARK: Connect to the XLSX Dummy DB 
    connect() {
        console.log("connecting inside excel db");
        try {
            this.workbook = XLSX.readFile(__dirname + '/test-data/users_db.xlsx');
            this.sheetNames = this.workbook.SheetNames;
        }
        catch (error) {
            console.log('database not found');
            this.disconnect();
        }
    }
    // MARK: Disconnect from the database 
    disconnect() {
        console.log("disconnecting from excel test db");
    }
    // MARK: Query the database 
    query(q) {
        console.log("quering the database");
        let params = q.split(' ');
        let response = null;
        if (params.length === 3) {
            const command = params[0];
            switch (command) {
                case "AUTH":
                    response = this.findUser(params[1], params[2]);
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