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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const schema_1 = require("./graphql/schema");
const resolvers_1 = require("./graphql/resolvers");
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const client_url = process.env.CLIENT_URL;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const server = new server_1.ApolloServer({
            typeDefs: schema_1.typeDefs,
            resolvers: resolvers_1.taskResolver,
            introspection: true
        });
        yield server.start();
        const corsOptions = {
            origin: client_url,
            methods: "GET,POST,PUT,DELETE,OPTIONS",
            allowedHeaders: "Content-Type,Authorization",
            credentials: true,
        };
        app.use(body_parser_1.default.json());
        app.use((0, cors_1.default)(corsOptions));
        app.options("*", (0, cors_1.default)(corsOptions));
        app.options("*", (req, res) => {
            res.header("Access-Control-Allow-Origin", client_url);
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
            res.header("Access-Control-Allow-Credentials", "true");
            return res.status(200).end();
        });
        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", client_url);
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });
        app.use("/graphql", (0, cors_1.default)(corsOptions), (0, express4_1.expressMiddleware)(server));
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
            console.log(client_url);
        });
    });
}
startServer();
