import { LambdaResponseGenerator } from "./utils";
import { authenticateUser, getUserArithmeticRecords, processUserOperation } from "./functions";

const enviroment: String = process.env.NODE_ENV || 'production'; 
console.log(`Current Enviroment Set: ${enviroment}`)

// let test1 = {
//     "u": "luissantanderdev@gmail.com",
//     "p": "7902a95978eac488ee86b560c2d9f17e82d3c66a86068c30fe488cc8e4edea0e"
// }

// let test2 = {
//     "userID": 1, 
//     "operation": "ADD",
//     "cost": 400
// }

// async function run() {
//     let res; 

//     res = await authenticateUser(test1)

//     // res = await processUserOperation(test2); 
//     console.log(res); 
// }

// run(); 

// ==========================================================================================================
// AWS LAMBDA FUNCTIONS
// ==========================================================================================================
// MARK: Authenticate User Handler Lambda
export const authenticate = async(event: any, context: any) => {
    if (!event.body) return LambdaResponseGenerator.respond(400, 'No params received', { error: "no parameters received..."}); 

    const body = JSON.parse(event.body); 

    const token = await authenticateUser(body); 
    return LambdaResponseGenerator.respond(200, 'User Authenticated', token);  
}

// MARK: Process User Arithmetic Operation Handler Lambda
export const processUserArithmeticOperation = async(event: any, context: any) => {
    if (!event.body) return LambdaResponseGenerator.respond(400, 'No params received', { error: "no parameters received..."}); 
    
    const body = JSON.parse(event.body); 

    console.log(body); 

    const token = await processUserOperation(body); 
    return LambdaResponseGenerator.respond(200, 'Operation Handled', token); 
}; 

// MARK: Retrieves Users Operation Records Record of User
export const retrieveUserOperationsRecord = async(event: any, context: any) => {
    if (!event.body) return LambdaResponseGenerator.respond(400, 'No params received', { error: "no parameters received..."}); 

    const body = JSON.parse(event.body); 

    const token = await getUserArithmeticRecords(body); 
    return LambdaResponseGenerator.respond(200, 'Records Retrieved', token);     
}; 