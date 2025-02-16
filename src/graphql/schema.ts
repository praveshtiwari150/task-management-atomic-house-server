export const typeDefs = `
    enum TaskStatus {
        COMPLETED
        INPROGRESS
        TODO
        CANCELLED
    }

    type Task {
        id: ID!
        title: String!
        description: String!
        status: TaskStatus!
    }

    type Query {
        tasks: [Task!]!
    }

    type SuccessInfo {
        message: String
        success: Boolean
    }

    type DeleteSuccessInfo{
        message: String
        success: Boolean
        id: ID
    }

    type Mutation {
        createTask(title: String!, description: String!, status: TaskStatus!): SuccessInfo!
        updateTask(id: ID!, title: String, description: String, status: TaskStatus!): SuccessInfo!
        deleteTask(id: ID!): DeleteSuccessInfo!
    }
`;
