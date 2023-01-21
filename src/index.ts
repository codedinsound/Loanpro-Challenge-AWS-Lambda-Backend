import { isVariableDeclarationList } from "typescript";
import { ExcelSheetTestDatabase } from "./databases";
import { Database } from "./models";

const enviroment: String = process.env.NODE_ENV || 'production'; 
const PORT: string = process.env.PORT || ''; 
console.log(`Current Enviroment Set: ${enviroment}`)

function generateTestHashToStoreInDB(): string {
    const crypto = require('crypto');
    const secret = 'abc123456';
    const hash = crypto.createHmac('sha256', secret)
                       .update('some data to be hashed')
                       .digest('hex');
    console.log(hash);
    return ""; 
}

function generateToken(response: any, p: string, database: Database) {
    if (response.error) return { error: response.error};
    if (response.password !== p) return { error: "Wrong Password!"}; 
    if (response.status === 'inactive') return { error: "User account is locked" };


    // Get Users Balance 
    // console.log('generate token: ', response);
    const balance = database.query(`BALANCE USER= ${response.id}`);

    return {
        status: 'active',
        date: new Date(),
        balance,
        userID: response.id,
        username: response.username
    }
}

function authenticateUser(data: any): any {
    const { DatabaseManagerController } = require('./controllers'); 
    const database = DatabaseManagerController.instance(); 

    database.setDatabase(new ExcelSheetTestDatabase())
    database.connect();

    let response = database.query(`AUTH ${data.u} ${data.p}`);

    database.disconnect();

    return generateToken(response, data.p, database);
}

// Test Authenticate User Using Nodemon
// let lam = authenticateUser({
//     "u": "luissantanderdev@gmail.com",
//     "p": "7902a95978eac488ee86b560c2d9f17e82d3c66a86068c30fe488cc8e4edea0e"
// }); 

// console.log(lam);

const MAX_LIMIT = 10E9; 

function checkIfOperationIsValid(operation: string, balance: number, cost: number): boolean {
    let isValid: boolean = true; 

    switch(operation) {
        case 'ADD':
            if (cost <= 0 || cost >= MAX_LIMIT) isValid = false; 
        break; 
        case 'SUBTRACT':
            if (balance <= 0 || cost > balance) isValid = false; 
        break;
        case 'MULTIPLY':
            if (cost > 10E7) isValid = false; 
        break; 
        case 'DIVIDE':
            if (balance < 1) isValid = false; 
        break;
        case 'SQUAREROOT':
            if (balance < 1) isValid = false; 
        break; 
        default:
            isValid = false;
    }
    
    return isValid; 
}


function runOperationAndUpdateDatabase(operation: string, balance: number, cost: number) {

}




function processUserOperation(data: any) {

    const { DatabaseManagerController } = require('./controllers'); 
    const database = DatabaseManagerController.instance(); 

    database.setDatabase(new ExcelSheetTestDatabase())
    database.connect();
    
    let balance = database.query(`BALANCE USER= ${data.userID}`);

    const operation = data.operation; 

    let isValid = checkIfOperationIsValid(operation, balance, data.cost); 






}

// Test processUserOperation
let lam = processUserOperation({
    userID: 1, 
    operation: 'ADD',
    cost: 100
});
console.log(lam);

// AWS LAMBDA FUNCTIONS
// ==========================================================================================================

// MARK: Authenticate User Lambda
export const authenticate = async(event: any, context: any) => {
    const token = authenticateUser(event); 

    const response = {
        statusCode: 200, 
        headers: {
            "x-custom-header" : "User Authenticated"
        },
        body: JSON.stringify(token)
    }

    return response;
}


// MARK: Operations Handler Lambda
export const operations = async(event: any, context: any) => {
    console.log(event); 

}; 



// MARK: Retrieves Users Operation Records Record of User
export const retrieveUserOperationsRecord = async(event: any, context: any) => {
    console.log(event); 

}; 