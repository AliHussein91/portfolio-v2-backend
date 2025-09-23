'use client';

import { useEffect, useState } from 'react';
import { getMessages, deleteMessage, markAsRead, Message } from '@/services/messages';

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages();
        setMessages(data);
      } catch (err) {
        setError('Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessage(id);
        setMessages(messages.filter((m) => m._id !== id));
      } catch (err) {
        setError('Failed to delete message');
      }
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const updatedMessage = await markAsRead(id);
      setMessages(messages.map((m) => (m._id === id ? updatedMessage : m)));
    } catch (err) {
      setError('Failed to mark message as read');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Messages</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>From</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Message</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message._id} style={{ backgroundColor: message.read ? '#f0f0f0' : 'white' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {message.name} ({message.email})
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{message.message}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{message.read ? 'Read' : 'Unread'}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {!message.read && (
                  <button onClick={() => handleMarkAsRead(message._id)} style={{ marginRight: '10px' }}>
                    Mark as Read
                  </button>
                )}
                <button onClick={() => handleDelete(message._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
