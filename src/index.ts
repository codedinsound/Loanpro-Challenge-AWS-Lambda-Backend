import { ExcelSheetTestDatabase } from "./databases";
import { Database } from "./models";
import { LambdaResponseGenerator } from "./utils";

const enviroment: String = process.env.NODE_ENV || 'production'; 
const PORT: string = process.env.PORT || ''; 
console.log(`Current Enviroment Set: ${enviroment}`)


function generateToken(response: any, p: string, database: Database) {
    if (response.error) return { error: response.error};
    if (response.password !== p) return { error: "Wrong Password!"}; 
    if (response.status === 'inactive') return { error: "User account is inactive!" };


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

function checkIfOperationIsValid(operation: string, balance: number, cost: number): string {
    let isValid: string = ''; 

    switch(operation) {
        case 'ADD':
            if (cost <= 0 || cost >= MAX_LIMIT) isValid = 'cost <= 0 || cost >= 10E9';
        break; 
        case 'SUBTRACT':
            if (balance <= 0 || cost > balance) isValid = 'balance <= 0 || cost > balance'; 
        break;
        case 'MULTIPLY':
            if (cost > 10E7) isValid = "cost multiply can't be higher than 10E7";
        break; 
        case 'DIVIDE':
            if (balance < 1) isValid = 'balance cant be less than 1 when dividing';
        break;
        case 'SQUAREROOT':
            if (balance < 1) isValid = 'balance cant be less than 1 when dividing';
        break; 
        default:
            isValid = 'random string passed no operation detected'; 
    }
    
    return isValid; 
}


function runArithemticOperation(operation: string, balance: number, cost: number): number {

    switch(operation) {
        case 'ADD':
            balance += cost; 
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

// MARK: Process User Operation 
function processUserOperation(data: any) {
    const { DatabaseManagerController } = require('./controllers'); 
    const database = DatabaseManagerController.instance(); 

    database.setDatabase(new ExcelSheetTestDatabase())
    database.connect();
    
    let balance = database.query(`GET_BALANCE USER= ${data.userID}`);

    const operation = data.operation; 

    let isValid: string = checkIfOperationIsValid(operation, balance, data.cost); 

    if (isValid.length > 0) return { status: 'error', error: isValid }

    balance = runArithemticOperation(operation, balance, data.cost); 

    // database.query(`UPDATE_BALANCE USER= ${data.userID} BALANCE= ${balance}`);

    return {
        status: 'balance updated',
        date: new Date(),
        balance
    }
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

    let res = LambdaResponseGenerator.respond(200, 'User Authenticated', token); 
    console.log(res); 

    return res; 
}


// MARK: Operations Handler Lambda
export const operations = async(event: any, context: any) => {
    console.log(event); 

    let res = LambdaResponseGenerator.respond(200, 'Operation Handled', {}); 




    return res; 
}; 



// MARK: Retrieves Users Operation Records Record of User
export const retrieveUserOperationsRecord = async(event: any, context: any) => {
    console.log(event); 

}; 