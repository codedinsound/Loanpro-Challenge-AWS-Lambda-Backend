const awsServerlessExpress = require('aws-serverless-express');
const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const app = express(); 

const server = awsServerlessExpress.createServer(app);

const enviroment: String = process.env.NODE_ENV || 'production'; 
const PORT: string = process.env.PORT || ''; 
console.log(`Current Enviroment Set: ${enviroment}`)


const routes = express.Router({
    mergeParams: true
});


routes.get('/', (req: any, res: any) => {
    res.status(200).json({}); 
}); 



app.use('/user', routes); 

if (enviroment === "development") {
    app.listen(PORT, () => console.log(`Listening on Local Port: ${PORT}`))
}


export const handler = async(event: any, context: any) => {
    console.log(event);

    if (enviroment === "production") 
        return awsServerlessExpress.proxy(server, event, context); 

    return {
        error: "No Enviroment Variable Set"
    }
}