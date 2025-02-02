import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Lightbulb, Plus, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Idea {
  id: string;
  content: string;
  created_at: string;
}

export function DailyIdeas() {
  const { user } = useAuth();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [newIdea, setNewIdea] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      fetchIdeas();
    }
  }, [user]);

  const fetchIdeas = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('daily_ideas')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', format(new Date(), 'yyyy-MM-dd'))
        .order('created_at', { ascending: true });

      if (error) throw error;
      setIdeas(data || []);
    } catch (err) {
      console.error('Error fetching ideas:', err);
      setError('Failed to load ideas');
    } finally {
      setLoading(false);
    }
  };

  const addIdea = async () => {
    if (!newIdea.trim() || !user || isSubmitting) return;

    setIsSubmitting(true);
    setError('');
    
    try {
      // First ensure user has a profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (!profile) {
        // Create profile if it doesn't exist
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ id: user.id, username: user.email?.split('@')[0] }]);
          
        if (profileError) throw profileError;
      }

      const { error: ideaError } = await supabase
        .from('daily_ideas')
        .insert([{
          user_id: user.id,
          content: newIdea.trim(),
          date: format(new Date(), 'yyyy-MM-dd')
        }]);

      if (ideaError) throw ideaError;

      setNewIdea('');
      await fetchIdeas();
    } catch (err) {
      console.error('Error adding idea:', err);
      setError('Failed to add idea. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteIdea = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('daily_ideas')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)
        .eq('date', format(new Date(), 'yyyy-MM-dd'));

      if (error) throw error;
      await fetchIdeas();
    } catch (err) {
      console.error('Error deleting idea:', err);
      setError('Failed to delete idea');
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-semibold text-gray-900">Today's Ideas</h2>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative">
          {error}
          <button
            onClick={() => setError('')}
            className="absolute top-0 right-0 p-4"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
          placeholder="Add a new idea..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onKeyPress={(e) => e.key === 'Enter' && addIdea()}
          disabled={isSubmitting}
        />
        <button
          onClick={addIdea}
          disabled={isSubmitting}
          className={`inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg group"
          >
            <p className="text-gray-700">{idea.content}</p>
            <button
              onClick={() => deleteIdea(idea.id)}
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
        {ideas.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No ideas added today. Start capturing your thoughts!
          </p>
        )}
      </div>
    </div>
  );
}