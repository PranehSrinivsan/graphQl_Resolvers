const {ApolloServer,gql} = require('apollo-server')

const typeDefs = gql`
    type Query{
        hello(name:String!): String!
        user: User!
    }

    type User{
        id:ID!
        username: String!
    }

    type Error{
        field: String!
        message: String!
    }

    type RegisterResponce{
        error: [Error]
        user: User
    }

    input Userinfo {
        username: String!,
        password:String!
    }

    type Mutation{
        register(userinfo: Userinfo!): RegisterResponce!
        login(userinfo: Userinfo!): [String]!
    }
`;

const resolvers={

    User:{
        username:(parent)=> `Hi ${parent.username}`,
        id:(parent)=> parent.id+0 
    },

    Query:{
        hello:(parent,{name})=>`Hi ${name}`,
        user: ()=>({
            id:1,
            username:"firstuser"
        })
    },
    Mutation:{
        register: ()=>({
            user:{
                id:1,
                username:"userone"
            },
            error:[
            {
                field: "field  of error",
                message: "error message"
            },
            {
                field: "field  of error",
                message: "error message"}
            ]
        }),
        login:(parent,{userinfo:{username,password}},context,info)=>{
            if(password==='password')
                return [username,password]
            else
                return [username,`password does not match for ${username}`]
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req,res})=>({req,res})
});

server.listen().then(({url})=>console.log('server running at'+url));