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
        // Allow all origins temporarily
        app.use((0, cors_1.default)({ origin: process.env.CLIENT_URL }));
        app.use(body_parser_1.default.json());
        // Apply CORS directly to GraphQL endpoint
        app.use("/graphql", (0, express4_1.expressMiddleware)(server));
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
    });
}
startServer();
