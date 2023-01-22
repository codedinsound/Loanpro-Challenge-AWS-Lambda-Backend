import { DatabaseManagerController } from "../controllers";
import { ExcelSheetTestDatabase } from "../database_logic";


// MARK: Create a new User Arithmetic Record 
function createArithmeticRecord(userID: number, operation: string, res: string, cost: number, newBalance: number, db: any): void {
    db.query(`CREATE_RECORD USER= ${userID} OPERATION= ${operation} RES= ${res} AMOUNT= ${cost} USER_BALANCE= ${newBalance}`);
}


// MARK: Gets Users Arithmetic Records 
async function getUserArithmeticRecords(data: any) {
    let response: any; 
    const database = DatabaseManagerController.instance(); 
    await database.setDatabase(new ExcelSheetTestDatabase()).connect();

    const { userID, sessionToken } = data; 

    if (!userID || !sessionToken ) return { error: ''}

    response = checkIfSessionIsActiveandUserIsValid(userID, sessionToken, database);

    console.log(response); 

    response = await database.query(`GET_USER_RECORDS USER= ${userID}`);

    return response; 
}

// MARK: Check if User is signed 
async function checkIfSessionIsActiveandUserIsValid(userID: string, sessionToken: any, db: any) {
    let tokensMap = new Map(['abc1', 'abc2', 'abc3', 'abc4', 'abc5'].map(t => [t, true])); // dummy session token validation in the backend 

    let res = await db.query(`GET_BALANCE USER= ${userID}`);

    if (res.error || !tokensMap.get(sessionToken)) return { error: "User is not logged in or Invalid Operation"}
    return {}
}

export { createArithmeticRecord, getUserArithmeticRecords }; 