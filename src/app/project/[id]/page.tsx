import Modal from '@/components/Modal';
import ProjectActions from '@/components/Project/ProjectActions';
import RelatedProjects from '@/components/Project/RelatedProjects';
import { ProjectInterface } from '@/constants/common.types';
import { getCurrentUser } from '@/libs/session'
import { fetchProjectDetails } from '@/utils/actions';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const ProjectPage = async ({params: {id}}: {params : {id : string}}) => {
    const session = await getCurrentUser();
    const result = await fetchProjectDetails(id) as {project?: ProjectInterface};

    if(!result?.project){
        return (
            <p className='no-result-text'>Failed to retrive the project details</p>
        )
    }
    const {project}  = result;
    const renderLink = ()=> `/profile/${project?.createdBy?.id}`;
  return (
    <Modal>
        <section className="flexBetween gap-y-8 max-w-4xl max-sm:flex-col w-full ">
            <div className="flex-1 flex flex-start gap-5 w-full max-sm:flex-col">
                <Link href={renderLink()}>
                    <Image src={project?.createdBy?.avatarUrl} alt='project image' width={50} height={50} className='rounded-full'/>
                </Link>
                <div className="flex-1 flexStart flex-col gap-1">
                    <p className="self-start text-lg font-semibold">{project?.title}</p>
                    <div className="user-info">
                        <Link href={renderLink()}>{project?.createdBy?.name}</Link>
                        <Image src={'/dot.svg'} alt='icon' width={4} height={4} />
                        <Link href={`/?category=${project?.category}`} className='font-semibold text-purple-500'>{project?.category}</Link>
                    </div>
                </div>
            </div>
            {session?.user?.email=== project?.createdBy?.email && (
                <div className='flex justify-end items-center gap-2'>
                    <ProjectActions projectId={project?.id} userId={project?.createdBy?.id} />
                </div>
            )}
        </section>
        <section className="mt-14">
            <Image src={project?.image}  alt='project-image' width={1094} height={800} className='object-cover rounded-2xl'/>
        </section>
        <section className="flexCenter flex-col-mt-20">
            <p className="max-w-5xl text-xl font-normal">{project?.description}</p>
            <div className="flex flex-wrap mt-5 gap-5">
                <Link href={project?.githubUrl} target='_blank' rel='noreferrer' className='flexCenter gap-2 text-sm font-medium text-blue-600'>Github</Link>
                <Image src={'/dot.svg'} alt='icon' width={4} height={4} />
                <Link href={project?.liveSiteUrl} target='_blank' rel='noreferrer' className='flexCenter gap-2 text-sm font-medium text-blue-600'>Live site</Link>
            </div>
        </section>
        <section className="flexCenter w-full gap-8 mt-25">
            <span className="w-full h-0.5 bg-slate-300" />
            <Image src={project?.createdBy?.avatarUrl} alt='user avatar' width={90} height={90} className='rounded-full' />
            <span className="w-full h-0.5 bg-slate-300" />
        </section>
        <RelatedProjects userId={project?.createdBy?.id} projectId={project?.id} />
    </Modal>
  )
}

export default ProjectPage