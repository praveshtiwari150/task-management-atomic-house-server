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

    app.use(
        cors({
            origin: client_url
        })
    );
    app.use(bodyParser.json());

    app.options("*", cors());
    app.use("/graphql", expressMiddleware(server));

    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
        console.log(client_url)
    });
}

startServer();
