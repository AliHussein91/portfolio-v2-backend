'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProjects, deleteProject, Project } from '@/services/projects';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        setProjects(projects.filter((p) => p._id !== id));
      } catch (err) {
        setError('Failed to delete project');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Projects</h1>
      <Link href="/projects/new">
        <button style={{ marginBottom: '20px' }}>Create New Project</button>
      </Link>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{project.title}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{project.description}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <Link href={`/projects/edit/${project._id}`}>
                  <button style={{ marginRight: '10px' }}>Edit</button>
                </Link>
                <button onClick={() => handleDelete(project._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
