import ProjectCard from "@/components/ProjectCard";
import { ProjectInterface } from "@/constants/common.types";
import { fetchAllProjects } from "@/utils/actions";

type ProjectSearch ={
  projectSearch: {
    edges: { node: ProjectInterface}[],
    pageInfo: {
      hasPreviousPage: boolean,
      startCursor: string,
      endCursor: string
      hasNextPage: boolean,
    }
  }
}
 
const HomePage= async () => {
  const data = await fetchAllProjects() as ProjectSearch;

  const projects = data?.projectSearch?.edges ?? [];
  if(projects.length === 0){
    return <section className="flexStart flex-col paddings">
      Categories

      <p className="no-result-text text-center">
        No projects found
      </p>
    </section>
  }
  return (  
    <section className="flex-start flex-col paddings mb-16">
      <h1>Categoriees</h1>
      <section className="projects-grid">
        {projects?.map(({node}: {node: ProjectInterface})=>(
          <ProjectCard key={node?.id} id={node?.id} image={node?.image} title={node?.title} name={node?.createdBy?.name} avatarUrl={node?.createdBy?.avatarUrl} userId={node?.createdBy?.id} />
        ))}
      </section>
      <h1>More</h1>
    </section>
   );
}
 
export default HomePage;