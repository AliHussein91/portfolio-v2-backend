'use client';

import { useEffect, useState } from 'react';
import { getProject, Project } from '@/services/projects';
import ProjectForm from '@/components/ProjectForm';

interface EditProjectPageProps {
  params: {
    id: string;
  };
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const data = await getProject(id as string);
          setProject(data);
        } catch (err) {
          setError('Failed to fetch project');
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <div>
      <ProjectForm project={project} />
    </div>
  );
}
