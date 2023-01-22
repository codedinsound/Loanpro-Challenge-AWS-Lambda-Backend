import { DatabaseManagerController } from "../controllers";
import { Database, ExcelSheetTestDatabase } from "../database_logic";

// MARK: Get a random interger from 0...n
function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

// MARK: Genearte a session token
async function generateToken(response: any, p: string, database: Database) {
    if (response.error) return { error: response.error};
    if (response.password !== p) return { error: "Wrong Password!"}; 
    if (response.status === 'inactive') return { error: "User account is inactive!" };

    // Get Users Balance 
    const balance = await database.query(`GET_BALANCE USER= ${response.id}`);

    let listOfTokens = ['abc1', 'abc2', 'abc3', 'abc4', 'abc5'];

    return {
        status: 'active',
        date: new Date(),
        balance,
        userID: response.id,
        username: response.username,
        sessionToken: listOfTokens[getRandomInt(listOfTokens.length - 1)]
    };
}

// MARK: Authenticate User 
async function authenticateUser(data: any) {
    const database = DatabaseManagerController.instance(); 
    database.setDatabase(new ExcelSheetTestDatabase());
    
    await database.connect(); 

    console.log("hello"); 

    const { u, p } = data; 
    
    let response = await database.query(`AUTH ${u} ${p}`);

    let token = generateToken(response, p, database); 

    database.disconnect();

    return token; 
}

export { authenticateUser }; 