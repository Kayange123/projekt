import { User, Session } from 'next-auth'

export type FormState = {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
};

export interface ProjectInterface {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
    id: string;
    createdBy: {
      name: string;
      email: string;
      avatarUrl: string;
      id: string;
    };
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    description: string | null;
    image?: string;
    githubUrl: string | null;
    linkedInUrl: string | null;
    projects: ProjectForm[]
}

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    image: string;
  };
}

export interface ProjectForm {
  title: string;
  description: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string[];
  createdBy: string;
  images: string[];
}