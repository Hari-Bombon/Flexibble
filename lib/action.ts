import { ProjectForm } from '@/common.types';
import { createProjectMutation, createUserMutation, getProjectByIdQuery, getUserQuery, projectsQuery } from '@/graphql';
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
    client.setHeader('x-api-key' , apiKey)
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

export const uploadImage = async (imagePath:string) =>{
    try{
        const response = await fetch(`${serverUrl}/api/upload`, {
            method:'POST',
            body:JSON.stringify({ path: imagePath})
        }) 
        return response.json();
    }
        catch(error){
            throw error;
           
        
    }
}
export const createNewProject = async (form:ProjectForm, creatorId: string , token:string) =>{
    const imageUrl = await uploadImage(form.image);

    if(imageUrl.url){
        const variables ={
            input:{
                ...form,
                image: imageUrl.url,
                createdBy:{
                    link:creatorId
                }
            }
        }
        return makeGraphQLRequest(createProjectMutation, variables)
    
    }}

export const fetchAllProjects = async (category?: string, endcursor?: string) =>{
    client.setHeader('x-api-key' , apiKey);

    return makeGraphQLRequest(projectsQuery, { category, endcursor})
}

export const getProjectDetails = (id: string) => {
    client.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(getProjectByIdQuery, {id})
}
export const getUserProjects = (id: string , last?:number) => {
    client.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(getProjectByIdQuery, {id , last})
}

export const deleteProject = (id: string , token:string) => {
    client.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(getProjectByIdQuery, {id , token})
}