import { DatabaseManagerController } from "../controllers";
import { Database, ExcelSheetTestDatabase } from "../database_logic";
import { ErrorModel, TokenModel } from "../models";
import { AsyncTimer, NumberGenerator } from "../utils";

// MARK: Genearte a session token
async function generateToken(response: any, p: string, database: Database): Promise<TokenModel> {

    // Get Users Balance 
    const balance: number = await database.query(`GET_BALANCE USER= ${response.id}`);
    const listOfTokens: string[] = ['abc1', 'abc2', 'abc3', 'abc4', 'abc5'];

    await AsyncTimer.sleep(500);

    return {
        status: 'active',
        date: new Date(),
        balance,
        userID: response.id,
        username: response.username,
        sessionToken: listOfTokens[NumberGenerator.generate(listOfTokens.length - 1)]
    };
}

// MARK: Check If There is Any Errors 
function checkForErrorMessages(response: any, p: string): ErrorModel {
    if (response.error) return { error: response.error};
    if (response.password !== p) return { error: "Wrong Password!"}; 
    if (response.status === 'inactive') return { error: "User account is inactive!" };
    return { error: '' }; 
}

// MARK: Authenticate User 
async function authenticateUser(data: any) {
    const database = DatabaseManagerController.instance(); 
    database.setDatabase(new ExcelSheetTestDatabase());

    await database.connect(); 

    const { u, p } = data; 
    const response = await database.query(`AUTH ${u} ${p}`);

    // Check For Any Error Reponse 
    const { error } = checkForErrorMessages(response, p); 
    if (error.length > 0) return error; 

    const token = await generateToken(response, p, database); 
    database.disconnect();

    return token; 
}

export { authenticateUser }; 