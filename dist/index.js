"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const awsServerlessExpress = require('aws-serverless-express');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = awsServerlessExpress.createServer(app);
// const enviroment = process.env.NODE_ENV || 'production'; 
const enviroment = 'development';
const PORT = 3000;
const routes = express.Router({
    mergeParams: true
});
routes.get('/', (req, res) => {
    res.status(200).json({});
});
app.use('/user', routes);
if (enviroment === "development") {
    app.listen(PORT, () => console.log(`Listening on Local Port: ${PORT}`));
}
const handler = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(event);
    if (enviroment === "production")
        return awsServerlessExpress.proxy(server, event, context);
    return {
        error: "No Enviroment Variable Set"
    };
});
exports.handler = handler;
//# sourceMappingURL=index.js.map