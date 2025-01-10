import React from 'react';

export type Mood = 'happy' | 'sad' | 'angry' | 'neutral' | 'excited' | 'tired' | 'anxious';

const moods: Record<Mood, { emoji: string; color: string }> = {
  happy: { emoji: '😊', color: 'bg-yellow-100' },
  sad: { emoji: '😢', color: 'bg-blue-100' },
  angry: { emoji: '😠', color: 'bg-red-100' },
  neutral: { emoji: '😐', color: 'bg-gray-100' },
  excited: { emoji: '🤩', color: 'bg-purple-100' },
  tired: { emoji: '😴', color: 'bg-indigo-100' },
  anxious: { emoji: '😰', color: 'bg-orange-100' }
};

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onMoodSelect: (mood: Mood) => void;
  disabled?: boolean;
}

export function MoodSelector({ selectedMood, onMoodSelect, disabled }: MoodSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Today's Mood</label>
      <div className="flex flex-wrap gap-2">
        {(Object.entries(moods) as [Mood, { emoji: string; color: string }][]).map(([mood, { emoji, color }]) => (
          <button
            key={mood}
            type="button"
            onClick={() => onMoodSelect(mood)}
            disabled={disabled}
            className={`p-2 rounded-lg transition-all ${
              selectedMood === mood
                ? `${color} ring-2 ring-indigo-500 scale-110`
                : 'hover:scale-105 hover:bg-gray-50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="text-2xl" role="img" aria-label={mood}>
              {emoji}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}