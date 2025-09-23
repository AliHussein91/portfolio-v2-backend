import api from '@/lib/api';

export interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export const getMessages = async (): Promise<Message[]> => {
  const response = await api.get('/messages');
  return response.data;
};

export const deleteMessage = async (id: string): Promise<void> => {
  await api.delete(`/messages/${id}`);
};

export const markAsRead = async (id: string): Promise<Message> => {
    const response = await api.put(`/messages/${id}/read`);
    return response.data;
}
