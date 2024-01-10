import { createUserMutation, getUserQuery } from '@/graphql';
import { GraphQLClient} from 'graphql-request';

const isProduction = process.env.NODE_ENV === 'production';

const client = new GraphQLClient('apiUrl')
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || "" : 'http://'
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' :'letmein';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

const makeGraphQLRequest =  async (query: string, variables = {}) =>{
    try{
        //client req
        return await client.request(query,variables);
    }   catch(error){
             throw error;
            }    
        }


export const getUser = (email:string) =>{
   return makeGraphQLRequest(getUserQuery,{email})
}

export const createUser = (name: string, email: string, avatarUrl:string) =>{
    const variables= {
        input:{
            name, email, avatarUrl
        }
    }
    return makeGraphQLRequest(createUserMutation,variables)
}