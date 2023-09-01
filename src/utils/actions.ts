import { ProjectForm } from "@/constants/common.types";
import { isBase64DataURL } from "./isBase64DataUrl";

const isProduction = process.env.NODE_ENV === 'production';
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'letmein';
const apiUrl = isProduction ? process.env. NEXT_PUBLIC_GRAFBASE_API || '' : 'http://127.0.0.1:4000/graphql';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';




// Retrieve user from database
export async function fetchUser(email: string){
    
}

// Create the user and save them to the grafbase
export async function createUser(name: string, email: string, avatarUrl: string) {
    
};



//Fetch Token
export const fetchToken = async ()=>{
    const res = await fetch(`${serverUrl}/api/auth/token`)
    return res.json();
}

//Upload image to cloudinary and get back the url
export const uploadImage =  async (imagePath: string)=>{
    try {
        const res = await fetch(`${serverUrl}/api/upload`,{
            method: 'POST',
            body: JSON.stringify({path: imagePath})
        })
        return res.json()
    } catch (error) {
        throw error;
    }
}

// Create the project
export async function createProject (form: any, creatorId: string, token: string) {
    const imageUrl = await uploadImage(form?.image);
    if(imageUrl.url){
        
    }
}

//Fetch all posts
export function fetchAllProjects(category?: string, endCursor?: string){
    
}

//Fetch the project by an ID
export function fetchProjectDetails(id: string) {
    
}

//Fetch projects by specific user
export function fetchUserProjects(id:string, last?: number) {
    
}

//Delete project by an ID
export async function deleteProject(id:string, token:string) {
    
}

//Update project 
export async function updateProject(form: any ,projectId:string, token:string) {
    let updatedForm = {...form};

    //Checks if the image is base64
    const isNewImage: boolean = isBase64DataURL(form?.image);

    //If it's base64 upload it to claudinary -> otherwise it is the same image 
    if(isNewImage){
        const imageUrl = await uploadImage(form.image);
        //Update the form with new image url
        if(imageUrl?.url){
            updatedForm = {
                ...form,
                image: imageUrl?.url
            }  
        }
    }
    

    
}