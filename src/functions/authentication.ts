import { DatabaseManagerController } from "../controllers";
import { Database, ExcelSheetTestDatabase } from "../database_logic";

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
    const database = DatabaseManagerController.instance(); 

    database.setDatabase(new ExcelSheetTestDatabase())
    database.connect();

    let response = database.query(`AUTH ${data.u} ${data.p}`);

    database.disconnect();

    return generateToken(response, data.p, database);
}

export { authenticateUser }; 