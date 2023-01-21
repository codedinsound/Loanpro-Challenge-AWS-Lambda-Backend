import { DatabaseManagerController } from '../controllers';
import { Database, ExcelSheetTestDatabase } from '../database_logic'; 
import { MAX_LIMIT } from '../models';

// MARK: Process Arithmetic Operation
function runArithemticOperation(operation: string, balance: number, cost: number): number {

    switch(operation) {
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

// MARK: Process User Operation 
function processUserOperation(data: any) {
    let prevBalance: number, newBalance: number, isValid: string; 

    const database = DatabaseManagerController.instance(); 
    database.setDatabase(new ExcelSheetTestDatabase()).connect();

    const { userID, operation, cost } = data; 
    
    prevBalance = database.query(`GET_BALANCE USER= ${userID}`);
    isValid = checkIfOperationIsValid(operation, prevBalance, cost); 

    if (isValid.length > 0) return { status: 'error', error: isValid }

    newBalance = runArithemticOperation(operation, prevBalance, data.cost); 

    // Update User Balance
    database.query(`UPDATE_BALANCE USER= ${userID} BALANCE= ${newBalance}`);

    const response = {
        status: 'balance updated',
        date: new Date(),
        balance: newBalance
    }

    let res: string = JSON.stringify(response).replace(' ', '-'); 

    console.log(res);

    // Create an Arithmetic Record
    database.query(`CREATE_RECORD USER= ${userID} OPERATION= ${operation} RES= ${res} AMOUNT= ${cost} USER_BALANCE= ${newBalance}`);

    return response; 
}


export { processUserOperation };