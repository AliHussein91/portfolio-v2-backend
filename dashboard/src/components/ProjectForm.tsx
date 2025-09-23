'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Project, createProject, updateProject, uploadImage } from '@/services/projects';

interface ProjectFormProps {
  project?: Project;
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setUrl(project.url);
      setTechnologies(project.technologies.join(', '));
      setImageUrl(project.image);
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      let finalImageUrl = imageUrl;
      if (imageFile) {
        const uploadData = await uploadImage(imageFile);
        finalImageUrl = uploadData.fileUrl;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('url', url);
      formData.append('technologies', technologies);
      formData.append('image', finalImageUrl);

      if (project) {
        await updateProject(project._id, formData);
      } else {
        await createProject(formData);
      }
      router.push('/projects');
    } catch (err: any) {
      setError(err.message || 'Failed to save project');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px' }}>
      <h1>{project ? 'Edit Project' : 'Create Project'}</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ marginBottom: '10px', padding: '8px' }}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="url"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="text"
        placeholder="Technologies (comma-separated)"
        value={technologies}
        onChange={(e) => setTechnologies(e.target.value)}
        style={{ marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
        style={{ marginBottom: '10px', padding: '8px' }}
      />
      {imageUrl && !imageFile && <img src={imageUrl} alt="Project" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" style={{ padding: '10px' }}>{project ? 'Update' : 'Create'}</button>
    </form>
  );
}
