import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    // 로컬
    uri: "http://localhost:5000/graphql",
    // 서버
    // uri: "http://115.68.230.30:5000/graphql"
});

export default client