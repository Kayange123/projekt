import Modal from '@/components/Modal';
import ProjectForm from '@/components/Project/ProjectForm';
import { ProjectInterface } from '@/constants/common.types';
import { getCurrentUser } from '@/libs/session';
import { fetchProjectDetails } from '@/utils/actions';
import { redirect } from 'next/navigation';

const EditProject = async ({params : {id}}: {params: {id: string}}) => {
  const session = await getCurrentUser();
  const result = await fetchProjectDetails(id) as {project?: ProjectInterface}

  if(!id) redirect('/');
  if(!session?.user) redirect('/');
  return (
    <Modal>
      <h3 className='modal-head-text'>Edit a project</h3>
      <ProjectForm type='edit' session={session} project={result?.project}/>
    </Modal>
  )
}

export default EditProject;