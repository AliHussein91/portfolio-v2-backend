import api from '@/lib/api';

export interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  technologies: string[];
}

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get('/projects');
  return response.data;
};

export const getProject = async (id: string): Promise<Project> => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (projectData: FormData): Promise<Project> => {
  const response = await api.post('/projects', projectData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateProject = async (id: string, projectData: FormData): Promise<Project> => {
  const response = await api.put(`/projects/${id}`, projectData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await api.delete(`/projects/${id}`);
};

export const uploadImage = async (file: File): Promise<{ fileUrl: string }> => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/uploads', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}
