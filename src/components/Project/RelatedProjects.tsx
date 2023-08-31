import { ProjectInterface, UserProfile } from "@/constants/common.types";
import { fetchUserProjects } from "@/utils/actions";
import Image from "next/image";
import Link from "next/link";


interface RelatedProjectsProps {
    userId: string;
    projectId: string;
}

const RelatedProjects = async ({userId , projectId}: RelatedProjectsProps) => {
    const result = await fetchUserProjects(userId) as { user?: UserProfile}
    const filteredProjects = result?.user?.projects?.edges?.filter(({node}: {node : ProjectInterface})=> node?.id !== projectId );

    if(filteredProjects?.length ===0) return null;
  return (
    <section className="flex flex-col mt-32 w-full">
        <div className="flexBetween">
            <p className="text-base font-bold">{'More by '+ result?.user?.name}</p>
            <Link href={`/profile/${userId}`} className="text-purple-300 text-base" >View All</Link>
        </div>
        <div className="related_projects-grid">
            {filteredProjects?.map(({node}: {node : ProjectInterface})=> (
                <div className="flexCenter related_project-card drop-shadow-card" key={node?.id}>
                    <Link href={`/project/${node?.id}`} className="flexCenter group relative w-full h-full">
                        <Image src={node?.image} alt="project-image" width={400} height={300} className="w-full h-full object-cover rounded-2xl" />
                        <div className="hidden group-hover:flex related_project-card_title">
                            <p className="w-full">{node?.title}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    </section>
  )
}

export default RelatedProjects