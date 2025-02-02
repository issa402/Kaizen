import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Save, ArrowLeft } from 'lucide-react';
import { MoodSelector, type Mood } from '../components/MoodSelector';
import { CrossIcon } from '../components/CrossIcon';

const MOTIVATIONAL_MESSAGES = [
  "Let's crush these goals! 💪",
  "You're on fire! Keep going! 🔥",
  "Small steps, big results! 🌟",
  "Today is your day! ⭐",
  "You've got this! 🎯",
  "Making progress every day! 📈",
  "Keep pushing forward! 🚀",
  "Excellence in motion! ✨",
  "Building your legacy! 👑",
  "Unstoppable momentum! 💫"
];

export default function NewEntry() {
  const [mood, setMood] = useState<Mood | null>(null);
  const [spiritualGoals, setSpiritualGoals] = useState('');
  const [mentalGoals, setMentalGoals] = useState('');
  const [physicalGoals, setPhysicalGoals] = useState('');
  const [learnings, setLearnings] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !mood) {
      setError('Please select your mood for today');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      if (!profile) {
        const { error: createProfileError } = await supabase
          .from('profiles')
          .insert([{ id: user.id, username: user.email?.split('@')[0] }])
          .select()
          .single();
        
        if (createProfileError) throw createProfileError;
      }

      const { error: insertError } = await supabase
        .from('journal_entries')
        .insert([{
          user_id: user.id,
          mood,
          spiritual_goals: spiritualGoals,
          mental_goals: mentalGoals,
          physical_goals: physicalGoals,
          learnings: learnings,
        }]);

      if (insertError) throw insertError;
      
      // Show random motivational message
      const randomMessage = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
      setSuccess(randomMessage);
      
      // Navigate after a short delay to show the message
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create entry');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">New Journal Entry</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center text-lg font-medium animate-bounce">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <MoodSelector
              selectedMood={mood}
              onMoodSelect={setMood}
              disabled={isSubmitting}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Spiritual Goals
                  </label>
                  <CrossIcon className="w-4 h-4 text-indigo-600" />
                </div>
                <textarea
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={spiritualGoals}
                  onChange={(e) => setSpiritualGoals(e.target.value)}
                  placeholder="What do you want to achieve spiritually today?"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mental Goals
                </label>
                <textarea
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={mentalGoals}
                  onChange={(e) => setMentalGoals(e.target.value)}
                  placeholder="What do you want to achieve mentally today?"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Physical Goals
                </label>
                <textarea
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={physicalGoals}
                  onChange={(e) => setPhysicalGoals(e.target.value)}
                  placeholder="What do you want to achieve physically today?"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Today's Learnings
              </label>
              <textarea
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={learnings}
                onChange={(e) => setLearnings(e.target.value)}
                placeholder="What did you learn today?"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                <Save className="w-5 h-5 mr-2" />
                {isSubmitting ? 'Saving...' : 'Save Entry'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}