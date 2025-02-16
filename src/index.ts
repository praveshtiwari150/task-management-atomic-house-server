import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { typeDefs } from "./graphql/schema";
import { taskResolver } from "./graphql/resolvers";

dotenv.config();
const port = process.env.PORT || 3000;
const client_url = process.env.CLIENT_URL as string;

async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers: taskResolver,
        introspection: true
    });

    await server.start();

    const corsOptions = {
        origin: client_url,
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        allowedHeaders: "Content-Type,Authorization",
        credentials: true,
    };
    app.use(bodyParser.json());

    app.use(cors(corsOptions));
    app.options("*", cors(corsOptions));

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

    app.use("/graphql", cors(corsOptions), expressMiddleware(server));


    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
        console.log(client_url)
    });
}

startServer();
