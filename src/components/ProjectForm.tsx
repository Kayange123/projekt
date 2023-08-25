'use client'
import  { useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FormField from './FormField';
import CustomMenu from './CustomMenu';
import { categoryFilters } from '@/constants/constants';
import Button from './Button';
import { ProjectInterface, SessionInterface } from '@/constants/common.types';
import { createProject, fetchToken, updateProject } from '@/utils/actions';

interface ProjectProps{
    type: string;
    session : SessionInterface;
    project?: ProjectInterface
}

const ProjectForm = ({type, session, project}: ProjectProps) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        image : project?.image ||'',
        title: project?.title ||'',
        description : project?.description ||'',
        liveSiteUrl: project?.liveSiteUrl ||'',
        githubUrl: project?.githubUrl ||'',
        category: project?.category ||'',
    })
   
    const handleSubmit =async (e: React.FormEvent)=> {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const {token} = await fetchToken();
            if(type==='create'){
                await createProject(form,session?.user?.id, token );
                router.push('/');
            }
            if(type==='edit'){
                await updateProject(form, project?.id as string, token);
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        }finally{
            setIsSubmitting(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const file = e.target.files?.[0];
        if(!file) return;

        if(!file.type.includes('image')){
            alert('Please select an image file');
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e)=> {
            const data = reader.result as string;
            handleStateChange('image', data);
        }
    }

    const handleStateChange = (fieldName: string, value: string) =>{
        setForm(prevState => ({...prevState, [fieldName]: value}))
    }
  return (
    <form 
    onSubmit={handleSubmit}
    className='flexStart form'
    >
        <div className="flexStart form_image-container">
            <label htmlFor="poster" className='form_image-label flexCenter'>
                {!form?.image && <p>Choose your project poster</p>}
            </label>
            <label htmlFor="image">
                <input type="file" id='image' accept='image/*' required= {type === 'create'} className='form_image-input' onChange={handleImageChange} />
            </label>
            {form?.image && (
                <Image src={form.image} alt='project image' className='sm:p-10 object-contain z-20' fill />
            )}
        </div>
        <FormField title='Title' placeholder = 'What do you wanna showcase?' state = {form.title} setState = {(value: string)=> handleStateChange('title', value)} />
        <FormField title='Description' placeholder = 'Showcase your project to connect with world of developers' state = {form.description} setState = {(value: string)=> handleStateChange('description', value)} />
        <FormField title='Website URL' type= 'url' placeholder = 'https://example.com' state = {form.liveSiteUrl} setState = {(value: string)=> handleStateChange('liveSiteUrl', value)} />
        <FormField title='Github URL' type='url' placeholder = 'https://github.com/username/project-repo' state = {form.githubUrl} setState = {(value: string)=> handleStateChange('githubUrl', value)} />
        <CustomMenu title={'category'} state={form.category} filters={categoryFilters} setState= {(value: string)=> handleStateChange('category', value)}  />
        <div className='flexStart w-full'>
            <Button type='submit' title={isSubmitting ? `${type==='create'} ? 'Creating...' : 'Editing...'` : `${type==='create'} ? 'Create' : 'Edit'`} leftIcon={isSubmitting ? '' : '/plus.svg'} isSubmitting={isSubmitting} />
        </div>
    </form>
  )
}

export default ProjectForm