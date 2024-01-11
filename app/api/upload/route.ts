import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name:'dl6uupkqn',
    api_key:'838664717713152',
    api_secret:'DDC8864UMb6wQfHArGmo75ymrys',
});
export async function POST(request: Request){
    const {path} = await request.json();

    if(!path) {
        return NextResponse.json(
            { message:'Image path is required'}, 
            {status: 400}
            )
    }
    try{
        const options ={
            use_filenames: true,
            unique_filename:false,
            overwrite: true,
            transformation:[{width:1000 , height:752,  crop:'scale'}]
        }
    } catch(error){

    }
}