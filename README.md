# Loanpro-Challenge-React-Lambda-AWS-Backennd

Author: Luis Santander

# To See the Front End Application 

"For more information, see the repository. https://stackblitz.com/edit/react-ts-wjmen9?file=README.md"

# Application URL Without Stackblitz Code Editor Live Demo 

"For more information, see the repository. https://react-ts-wjmen9.stackblitz.io"

RESTful Calculator Front End
This is a simple RESTful calculator service that allows users to perform basic arithmetic operations using AWS Lambda. The service supports the following operations:

Addition
Subtraction
Multiplication
Division
Square Root

API Endpoints
The service has the following API endpoints:

POST /authenticate: authenticates user and retrieve information if found.
POST /processUserArithmeticOperation: performs afformentioned mathematical operations on the backend
POST /retrieveUserOperationsRecord: retrieves records of all the mathematical operations performed by a specific user.


Each endpoint expects a JSON object in the request body with the following format:

# User and Password Authentication

Request Body </authenticate>

{
u: string,
P: encrypted_string
}

Reponse Body </authenticate>
{
  status: string,
  date: string,
  balance: number,
  userID: number,
  username: string,
  sessionToken: string,
  randomNumbers: number[],
}

# Process Arithmetic Operation 
Request Body </processUserArithmeticOperation>

{
    userID: number,
    operation: string,
    cost: number
}

Response Body </processUserArithmeticOperation>

{
    status: string,
    date: Date,
    balance: number
}

# Retrieve User Records 
Request Body </retrieveUserOperationsRecord>

{
    userID: number, 
    sessionToken: string
}

Reponse Body </retrieveUserOperationsRecord>

[
    {
        id: string,
        operation_id: string,
        date: Date,
        amount: number, 
        user_balance: number
    },
    .......... 
]