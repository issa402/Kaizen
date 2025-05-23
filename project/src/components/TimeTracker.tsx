import { useState, useEffect, useCallback } from 'react';
import { format, parseISO, differenceInMinutes, addMinutes } from 'date-fns';
import { Clock, Play, Plus, X, Calendar, Check, Pause } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';


export interface TimeEntry {
  id: string;
  activity: string;
  start_time: string;
  end_time: string;
  status: 'planned' | 'in_progress' | 'paused' | 'completed';
  date: string;
}

export function TimeTracker() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newActivity, setNewActivity] = useState('');
  const [durationHours, setDurationHours] = useState(0);
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [remainingTimes, setRemainingTimes] = useState<{ [key: string]: number }>({});

  const fetchEntries = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('time_tracking')
        .select('*')
        .eq('user_id', user?.id)
        .eq('date', selectedDate)
        .order('start_time', { ascending: true });

      if (error) throw error;
      setEntries(data || []);
    } catch (err) {
      console.error('Error fetching time entries:', err);
      setError('Failed to load time entries');
    } finally {
      setLoading(false);
    }
  }, [user?.id, selectedDate]);

  useEffect(() => {
    if (user) {
      fetchEntries();
    }
  }, [user, selectedDate, fetchEntries]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const newRemainingTimes = entries.reduce((acc, entry) => {
        if (entry.status === 'in_progress') {
          const end = new Date(entry.end_time).getTime();
          acc[entry.id] = Math.max(0, end - now);
        } else if (entry.status === 'paused') {
          acc[entry.id] = remainingTimes[entry.id] || 0;
        }
        return acc;
      }, {} as { [key: string]: number });
      setRemainingTimes(newRemainingTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, [entries, remainingTimes]);

  const addEntry = async () => {
    if (!newActivity) {
      setError('Please enter an activity');
      return;
    }

    const totalMinutes = (durationHours * 60) + durationMinutes;
    if (totalMinutes <= 0) {
      setError('Please enter a valid duration');
      return;
    }

    const startTime = new Date();
    const endTime = addMinutes(startTime, totalMinutes);

    try {
      const { error } = await supabase
        .from('time_tracking')
        .insert([{
          user_id: user?.id,
          activity: newActivity,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          date: selectedDate,
          status: 'planned'
        }]);

      if (error) throw error;
      
      setNewActivity('');
      setDurationHours(0);
      setDurationMinutes(30);
      setShowForm(false);
      fetchEntries();
    } catch (err) {
      console.error('Error adding time entry:', err);
      setError('Failed to add time entry');
    }
  };

  const updateStatus = async (id: string, status: 'planned' | 'in_progress' | 'paused' | 'completed') => {
    try {
      const entry = entries.find(e => e.id === id);
      if (!entry) {
        throw new Error('Entry not found');
      }

      let updates: Partial<TimeEntry> = { status };
      const now = Date.now();

      // Handle pause: calculate remaining time and update end_time
      if (status === 'paused') {
        const remaining = new Date(entry.end_time).getTime() - now;
        updates.end_time = new Date(now + Math.max(0, remaining)).toISOString();
      }
      
      // Handle resume: use stored remaining time or calculate from end_time
      if (status === 'in_progress' && entry.status === 'paused') {
        const remaining = remainingTimes[id] || (new Date(entry.end_time).getTime() - now);
        updates.end_time = new Date(now + Math.max(0, remaining)).toISOString();
      }

      console.log('Updating entry:', { id, updates });
      
      const { error } = await supabase
        .from('time_tracking')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error('Supabase update error:', error);
        throw error;
      }

      await fetchEntries();
    } catch (err) {
      console.error('Error in updateStatus:', err);
      setError(`Failed to update status: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('time_tracking')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchEntries();
    } catch (err) {
      console.error('Error deleting entry:', err);
      setError('Failed to delete entry');
    }
  };

  const getDuration = (start: string, end: string) => {
    const minutes = differenceInMinutes(parseISO(end), parseISO(start));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const getDurationDisplay = (entry: TimeEntry) => {
    if (entry.status === 'in_progress' && remainingTimes[entry.id]) {
      const totalSeconds = Math.floor(remainingTimes[entry.id] / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
    }
    if (entry.status === 'paused' && remainingTimes[entry.id]) {
      const totalMinutes = Math.floor(remainingTimes[entry.id] / 1000 / 60);
      const seconds = Math.floor((remainingTimes[entry.id] / 1000) % 60);
      return `${totalMinutes}m ${seconds}s remaining (paused)`;
    }
    return getDuration(entry.start_time, entry.end_time);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'paused': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">Time Tracker</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Activity
          </button>
        </div>
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

      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Activity
              </label>
              <input
                type="text"
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Learn Python"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hours
              </label>
              <input
                type="number"
                value={durationHours}
                onChange={(e) => setDurationHours(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minutes
              </label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                min="0"
                max="59"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={addEntry}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Entry
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-medium text-gray-900">{entry.activity}</h3>
                <p className="text-sm text-gray-500">
                  {getDurationDisplay(entry)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(entry.status)}`}>
                {entry.status.replace('_', ' ')}
              </span>
              {entry.status === 'planned' && (
                <button
                  onClick={() => updateStatus(entry.id, 'in_progress')}
                  className="p-1 text-yellow-600 hover:text-yellow-700"
                  title="Start"
                >
                  <Play className="w-4 h-4" />
                </button>
              )}
              {entry.status === 'in_progress' && (
                <>
                  <button
                    onClick={() => updateStatus(entry.id, 'paused')}
                    className="p-1 text-blue-600 hover:text-blue-700"
                    title="Pause"
                  >
                    <Pause className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => updateStatus(entry.id, 'completed')}
                    className="p-1 text-green-600 hover:text-green-700"
                    title="Complete"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </>
              )}
              {entry.status === 'paused' && (
                <button
                  onClick={() => updateStatus(entry.id, 'in_progress')}
                  className="p-1 text-yellow-600 hover:text-yellow-700"
                  title="Resume"
                >
                  <Play className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => deleteEntry(entry.id)}
                className="p-1 text-gray-400 hover:text-red-500"
                title="Delete"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {entries.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No activities scheduled for this day. Add one to get started!
          </p>
        )}
      </div>
    </div>
  );
}