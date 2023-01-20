import { ExcelSheetTestDatabase } from "./databases";

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

function generateToken(response: any, p: string) {
    if (response.password !== p) return { error: "Wrong Password!"}; 
    if (response.status === 'inactive') return { error: "User account is locked" };

    return {
        status: 'active',
        date: new Date(),
        userID: response.id,
        username: response.username
    }
}

function aunthicateUser(data: any) {
    const { DatabaseManagerController } = require('./controllers'); 
    const database = DatabaseManagerController.instance(); 

    database.setDatabase(new ExcelSheetTestDatabase())
    database.connect();

    let response = database.query(`AUTH ${data.u} ${data.p}`);

    if (response.error) console.log('send the error', response); 

    database.disconnect();

    return generateToken(response, data.p);
}

// if (enviroment === "development") app.listen(PORT, () => console.log(`Listening on Local Port: ${PORT}`)) ;

// AWS LAMBDA FUNCTIONS
// ==========================================================================================================

// MARK: Authenticate User Lambda
export const authenticate = async(event: any, context: any) => {
    const token = aunthicateUser(event); 
    
    const response = {
        statusCode: 200, 
        headers: {
            "x-custom-header" : "User Authenticated"
        },
        body: JSON.stringify(token)
    }

    return response;
}
