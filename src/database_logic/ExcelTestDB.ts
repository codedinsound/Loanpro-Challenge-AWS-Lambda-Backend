const XLSX = require('xlsx'); 
const AWS = require('aws-sdk'); 
import { Database } from './models';
import { AsyncTimer } from '../utils';
import { UserModel } from '../models';

const s3Params = {
    Bucket: "loanpro-challenge-aws-la-serverlessdeploymentbuck-1mo1bm3wp9e2s",
    Key: "test-data/users_db.xlsx"
}

class ExcelSheetTestDatabase implements Database {
    private workbook: any;
    private sheetNames: any; 
    private s3: any; 

    // MARK: Obtain user data if user on Dummy Excel Sheet Test DB 
    private async findUser(username: string, password: string): Promise<UserModel> {
        const db = XLSX.utils.sheet_to_json(this.workbook.Sheets[this.sheetNames[0]]);

        let user: any = null; 

        db.forEach((userRecord: any) => {
                if (userRecord.username === username && userRecord.password === password) {
                        user = userRecord; 
                        return; 
                }
        }); 

        await AsyncTimer.sleep(500);

        if (!user) throw Error("User not found in excel sheet database"); 
        
        return user; 
    }

    // MARK: Connect to the XLSX Dummy DB 
    async connect(): Promise<any> {
        try {
            this.s3 = new AWS.S3(); 

            let res = await this.s3.getObject(s3Params).promise();

            const buffer: Buffer = res.Body; 

            this.workbook = XLSX.read(buffer); 
            this.sheetNames = this.workbook.SheetNames;

        } catch (error) {
            console.log(error); 
            console.log('database not found'); 
            this.disconnect(); 
        }
    }

    // MARK: Disconnect from the database 
    disconnect(): void {
        console.log("disconnecting from excel test db"); 
    }

    // MARK: Gets User Balance
    private async getBalance(user_id: string) {
        const userBalances = XLSX.utils.sheet_to_json(this.workbook.Sheets[this.sheetNames[1]]);

        let balance: number = -1;

        userBalances.forEach((user: any) => {
            if (user.user_id === +user_id) {
                balance = user.balance; 
                return; 
            }
        }); 

        await AsyncTimer.sleep(500);

        return balance; 
    }

    // MARK: Updates User Balance 
    async updateBalance(uid: string, nb: string) {
        let userID: number, newBalance: number; 

        userID = +uid; 
        newBalance = +nb; 

        console.log(userID, newBalance); 

        const userBalances = XLSX.utils.sheet_to_json(this.workbook.Sheets[this.sheetNames[1]]);

        userBalances.forEach((user: any) => {
            if (user.user_id === userID) {
                user.balance = newBalance; 
                return; 
            }
        }); 

        const ws = XLSX.utils.json_to_sheet(userBalances);

        this.workbook.Sheets[this.sheetNames[1]] = ws;

        const buffer = XLSX.write(this.workbook, {type: "buffer"}); 

        await this.s3.putObject({
            ...s3Params, 
            Body: buffer 
        }).promise(); 
    }

    // MARK: Create New Operations Record 
    async createNewArithmeticRecord(params: any) {
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
        }

        records.push(newRecord); 

        const updatedWS = XLSX.utils.json_to_sheet(records); 

        this.workbook.Sheets[this.sheetNames[2]] = updatedWS; 

        const buffer = XLSX.write(this.workbook, {type: "buffer"}); 

        await this.s3.putObject({
            ...s3Params, 
            Body: buffer 
        }).promise(); 

        return {}
    }

    // MARK: Retrieve User Records 
    retrieveRecords(uid: string) {
        const userID = +uid; 
        const records = XLSX.utils.sheet_to_json(this.workbook.Sheets[this.sheetNames[2]]);
        const specificUserRecords = records.filter((item: any) => item.user_id === userID && item.flag != 'T');
        return specificUserRecords; 
    } 

    // MARK: Query the database 
    query(q: string): any {
        let response: any = null; 
        const params: string[] = q.split(' '); 

        if (params.length >= 3) {
            
            const command = params[0]; 
                        
            switch (command) {
                case "AUTH":
                    response = this.findUser(params[1], params[2])
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

        if (!response) throw Error("Invalid Query");  
        return response; 
    }
}

export { ExcelSheetTestDatabase }