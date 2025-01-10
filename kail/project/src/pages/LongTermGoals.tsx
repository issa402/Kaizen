import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Target, History, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface GoalHistory {
  id: string;
  previous_goal: string;
  created_at: string;
}

interface LongTermGoal {
  id: string;
  goal: string;
  updated_at: string;
}

export default function LongTermGoals() {
  const { user } = useAuth();
  const [goal, setGoal] = useState('');
  const [goalId, setGoalId] = useState<string | null>(null);
  const [history, setHistory] = useState<GoalHistory[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchGoalAndHistory();
    }
  }, [user]);

  const fetchGoalAndHistory = async () => {
    try {
      // Fetch current goal
      const { data: goalData } = await supabase
        .from('long_term_goals')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (goalData) {
        setGoal(goalData.goal);
        setGoalId(goalData.id);

        // Fetch history
        const { data: historyData } = await supabase
          .from('goal_history')
          .select('*')
          .eq('goal_id', goalData.id)
          .order('created_at', { ascending: false });

        if (historyData) {
          setHistory(historyData);
        }
      }
    } catch (error) {
      console.error('Error fetching goal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!goalId) {
        // Create new goal
        const { data, error } = await supabase
          .from('long_term_goals')
          .insert([{ user_id: user?.id, goal }])
          .select()
          .single();

        if (error) throw error;
        if (data) setGoalId(data.id);
      } else {
        // Update existing goal
        const { error } = await supabase
          .from('long_term_goals')
          .update({ goal })
          .eq('id', goalId);

        if (error) throw error;
      }

      setIsEditing(false);
      fetchGoalAndHistory();
    } catch (error) {
      console.error('Error saving goal:', error);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Target className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Long-Term Goals</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="mb-6">
            {isEditing ? (
              <div className="space-y-4">
                <textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="What are your long-term goals?"
                />
                <button
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Goals
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-700 whitespace-pre-wrap">{goal || 'No goals set yet.'}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Edit Goals
                </button>
              </div>
            )}
          </div>

          {history.length > 0 && (
            <div className="border-t pt-6">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-gray-500" />
                <h2 className="text-xl font-semibold text-gray-900">Goal History</h2>
              </div>
              <div className="space-y-4">
                {history.map((entry) => (
                  <div key={entry.id} className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 mb-2">{entry.previous_goal}</p>
                    <p className="text-sm text-gray-500">
                      Updated on {format(new Date(entry.created_at), 'MMMM d, yyyy')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}