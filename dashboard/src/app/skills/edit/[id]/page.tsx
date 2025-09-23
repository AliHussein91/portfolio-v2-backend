'use client';

import { useEffect, useState } from 'react';
import { getSkill, Skill } from '@/services/skills';
import SkillForm from '@/components/SkillForm';

interface EditSkillPageProps {
  params: {
    id: string;
  };
}

export default function EditSkillPage({ params }: EditSkillPageProps) {
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchSkill = async () => {
        try {
          const data = await getSkill(id as string);
          setSkill(data);
        } catch (err) {
          setError('Failed to fetch skill');
        } finally {
          setLoading(false);
        }
      };
      fetchSkill();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!skill) return <p>Skill not found.</p>;

  return (
    <div>
      <SkillForm skill={skill} />
    </div>
  );
}
