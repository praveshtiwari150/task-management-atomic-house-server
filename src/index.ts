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

    // Allow all origins temporarily
    app.use(cors({ origin: process.env.CLIENT_URL }));
    

    app.use(bodyParser.json());

    // Apply CORS directly to GraphQL endpoint
    app.use("/graphql", expressMiddleware(server));

    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
}


startServer();
