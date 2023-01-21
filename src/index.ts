import { LambdaResponseGenerator } from "./utils";
import { authenticateUser, processUserOperation } from "./functions";

const enviroment: String = process.env.NODE_ENV || 'production'; 
console.log(`Current Enviroment Set: ${enviroment}`)

// AWS LAMBDA FUNCTIONS
// ==========================================================================================================
// MARK: Authenticate User Lambda
export const authenticate = async(event: any, context: any) => {
    const token = authenticateUser(event); 
    let res = LambdaResponseGenerator.respond(200, 'User Authenticated', token); 
    return res; 
}

// MARK: Operations Handler Lambda
export const operations = async(event: any, context: any) => {
    const token = processUserOperation(event); 
    let res = LambdaResponseGenerator.respond(200, 'Operation Handled', token); 
    return res; 
}; 

// // MARK: Retrieves Users Operation Records Record of User
// export const retrieveUserOperationsRecord = async(event: any, context: any) => {
//     console.log(event); 

// }; 