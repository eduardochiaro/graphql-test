"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var graphql_tools_1 = require("graphql-tools");
var mongoose_1 = __importDefault(require("mongoose"));
var ship_schema_1 = require("./common/ships/ship.schema");
/**
 * Connect to the mongodb database using the mongoose library.
 */
mongoose_1.default.connect(
// you can use 'mongodb://localhost/graphql-demo' in development
'mongodb://localhost/graphql-demo', { useNewUrlParser: true });
/**
 * We must define a root type so that our server knows where to
 * look when we query the server i.e. in the "root" types.
 */
var rootTypeDefs = "\n  type Query\n  type Mutation\n  schema {\n    query: Query\n    mutation: Mutation\n  }\n";
/**
 * Declare the schema which the will hold our GraphQL types and
 * resolvers.
 */
var schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: [rootTypeDefs, ship_schema_1.shipTypeDefs],
    resolvers: ship_schema_1.shipResolvers,
});
/**
 * Create the server which we will send our GraphQL queries to.
 */
var server = new apollo_server_1.ApolloServer({
    schema: schema,
    formatError: function (error) {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            // logging the errors can help in development
            console.log(error);
        }
        return error;
    },
});
/**
 * Turn the server on by listening to a port.
 * Defaults to: http://localhost:4000
 */
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
//# sourceMappingURL=index.js.map