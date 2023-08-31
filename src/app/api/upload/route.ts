import { NextResponse } from "next/server";
import { v2 as cloud } from "cloudinary";

          
cloud.config({ 
  cloud_name: 'dvkroxwht', 
  api_key: '639939744831129', 
  api_secret: 'zx5bYX8vhIToE4J4yiSknThd9fE' 
});


export async function POST(req: Request){
    const { path } = await  req.json();

    if(!path){
        return NextResponse.json({message: 'Image path is required'}, { status: 400, statusText: 'Bad Request' });
    }

    try {
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            transformation: [{
                width: 1000, height: 750, crop: 'scale'
            }]
        }
        const result = await cloud.uploader.upload(path, options);
        return NextResponse.json(result, { status: 200, statusText: 'OK' });
    } catch (error) {
        return NextResponse.json({message: 'Error uploading to cloudinary'}, { status: 400, statusText: 'Bad request' });
    }
}