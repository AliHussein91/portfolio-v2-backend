'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Skill, createSkill, updateSkill } from '@/services/skills';
import { uploadImage } from '@/services/projects';

interface SkillFormProps {
  skill?: Skill;
}

export default function SkillForm({ skill }: SkillFormProps) {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (skill) {
      setName(skill.name);
      setImageUrl(skill.image);
    }
  }, [skill]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      let finalImageUrl = imageUrl;
      if (imageFile) {
        const uploadData = await uploadImage(imageFile);
        finalImageUrl = uploadData.fileUrl;
      }

      if (!finalImageUrl) {
        setError('Image is required');
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', finalImageUrl);

      if (skill) {
        await updateSkill(skill._id, formData);
      } else {
        await createSkill(formData);
      }
      router.push('/skills');
    } catch (err: any) {
      setError(err.message || 'Failed to save skill');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px' }}>
      <h1>{skill ? 'Edit Skill' : 'Create Skill'}</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
        style={{ marginBottom: '10px', padding: '8px' }}
      />
      {imageUrl && !imageFile && <img src={imageUrl} alt="Skill" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" style={{ padding: '10px' }}>{skill ? 'Update' : 'Create'}</button>
    </form>
  );
}
