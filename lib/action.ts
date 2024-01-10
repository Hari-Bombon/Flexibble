import { GraphQLClient} from 'graphql-request';

const isProduction = process.env.NODE_ENV === 'production';

const client = new GraphQLClient('apiUrl')
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || "" : 'http://'
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GARFBASE_API_KEY || '' :'letmein';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

const makeGraphQLRequest =  async (query: string, variables = {}) =>{
    try{

        catch(error){
             throw error;
            }    
        }
    