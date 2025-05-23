import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export function useJournalStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalEntries: 0,
    streak: 0,
    topMood: '',
    completionRate: 0,
    weeklyProgress: {
      spiritual: 0,
      mental: 0,
      physical: 0
    }
  });

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const { data: entries } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user?.id)
        .order('date', { ascending: false });

      if (entries) {
        // Calculate total entries
        const totalEntries = entries.length;

        // Calculate streak
        let streak = 0;
        const today = new Date();
        let currentDate = today;
        
        for (const entry of entries) {
          const entryDate = new Date(entry.date);
          const diffDays = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
          
          if (diffDays <= 1) {
            streak++;
            currentDate = entryDate;
          } else {
            break;
          }
        }

        // Calculate top mood
        const moodCounts: Record<string, number> = {};
        entries.forEach(entry => {
          moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
        });
        const topMood = Object.entries(moodCounts)
          .sort(([,a], [,b]) => b - a)[0]?.[0] || '';

        // Calculate completion rate
        const completedFields = entries.reduce((acc, entry) => {
          const total = ['spiritual_goals', 'mental_goals', 'physical_goals', 'learnings']
            .filter(field => entry[field]?.trim()).length;
          return acc + (total / 4);
        }, 0);
        const completionRate = Math.round((completedFields / (totalEntries * 4)) * 100);

        // Calculate weekly progress
        const weeklyEntries = entries.filter(entry => {
          const entryDate = new Date(entry.date);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return entryDate >= weekAgo;
        });

        const weeklyProgress = {
          spiritual: Math.round(weeklyEntries.filter(e => e.spiritual_goals?.trim()).length / weeklyEntries.length * 100),
          mental: Math.round(weeklyEntries.filter(e => e.mental_goals?.trim()).length / weeklyEntries.length * 100),
          physical: Math.round(weeklyEntries.filter(e => e.physical_goals?.trim()).length / weeklyEntries.length * 100)
        };

        setStats({
          totalEntries,
          streak,
          topMood,
          completionRate,
          weeklyProgress
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return stats;
}