import api from '@/lib/api';

export interface Skill {
  _id: string;
  name: string;
  image: string;
}

export const getSkills = async (): Promise<Skill[]> => {
  const response = await api.get('/skills');
  return response.data;
};

export const getSkill = async (id: string): Promise<Skill> => {
  const response = await api.get(`/skills/${id}`);
  return response.data;
};

export const createSkill = async (skillData: FormData): Promise<Skill> => {
  const response = await api.post('/skills', skillData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateSkill = async (id: string, skillData: FormData): Promise<Skill> => {
  const response = await api.put(`/skills/${id}`, skillData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteSkill = async (id: string): Promise<void> => {
  await api.delete(`/skills/${id}`);
};
