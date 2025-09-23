import api from '@/lib/api';

export async function login(email: string, password: string): Promise<{ token: string }> {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to login');
  }
}
