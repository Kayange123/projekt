'use client'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteProject, fetchToken } from "@/utils/actions";
import { useRouter } from "next/navigation";

interface ProjectActionsProps {
    projectId: string;
    userId: string;
}

const ProjectActions = ({projectId, userId}: ProjectActionsProps) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    
    const handleDeleteProject = async ()=>{
        const { token } = await fetchToken();

        setIsDeleting(true);
        try {
            await deleteProject(projectId, token);
            router.push(`/profile/${userId}`);
        } catch (error) {
            //console.log(error);
        }finally{
            setIsDeleting(false);
        }
    }
  return (
    <>
    <Link href={`/edit-project/${projectId}`} className="flexCenter edit-action_btn">
        <Image src={'/pencile.svg'} alt="edit" width={15} height={15}  />
    </Link>
    <button disabled={isDeleting} onClick={handleDeleteProject} type="button" className={`delete-action_btn flexCenter ${isDeleting? 'bg-gray-500': 'bg-purple-500'}`}> 
        <Image alt="delete" src={'/trash.svg'} width={15} height={15} />
    </button>
    </>
  )
}

export default ProjectActions