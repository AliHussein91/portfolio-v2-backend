'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSkills, deleteSkill, Skill } from '@/services/skills';

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();
        setSkills(data);
      } catch (err) {
        setError('Failed to fetch skills');
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkill(id);
        setSkills(skills.filter((s) => s._id !== id));
      } catch (err) {
        setError('Failed to delete skill');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Skills</h1>
      <Link href="/skills/new">
        <button style={{ marginBottom: '20px' }}>Create New Skill</button>
      </Link>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Image</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{skill.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <img src={skill.image} alt={skill.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <Link href={`/skills/edit/${skill._id}`}>
                  <button style={{ marginRight: '10px' }}>Edit</button>
                </Link>
                <button onClick={() => handleDelete(skill._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
