import React from 'react';
import { Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CompletionStatus {
  spiritual_completed: boolean;
  mental_completed: boolean;
  physical_completed: boolean;
  learnings_completed: boolean;
}

interface JournalCheckboxesProps {
  entryId: string;
  initialStatus: CompletionStatus;
  onStatusChange: (newStatus: CompletionStatus) => void;
}

export function JournalCheckboxes({ entryId, initialStatus, onStatusChange }: JournalCheckboxesProps) {
  const updateCompletion = async (field: keyof CompletionStatus) => {
    const newStatus = { ...initialStatus, [field]: !initialStatus[field] };
    
    try {
      const { error } = await supabase
        .from('journal_entries')
        .update({ [field]: !initialStatus[field] })
        .eq('id', entryId);

      if (error) throw error;
      onStatusChange(newStatus);
    } catch (error) {
      console.error('Error updating completion status:', error);
    }
  };

  const CheckboxItem = ({ 
    field, 
    label 
  }: { 
    field: keyof CompletionStatus; 
    label: string 
  }) => (
    <button
      onClick={() => updateCompletion(field)}
      className="flex items-center gap-2 group"
    >
      <div className={`w-5 h-5 rounded border ${
        initialStatus[field] 
          ? 'bg-indigo-600 border-indigo-600' 
          : 'border-gray-300 group-hover:border-indigo-400'
      } flex items-center justify-center transition-colors`}>
        {initialStatus[field] && <Check className="w-3 h-3 text-white" />}
      </div>
      <span className="text-sm text-gray-600">{label}</span>
    </button>
  );

  return (
    <div className="flex flex-wrap gap-4">
      <CheckboxItem field="spiritual_completed" label="Spiritual Goals" />
      <CheckboxItem field="mental_completed" label="Mental Goals" />
      <CheckboxItem field="physical_completed" label="Physical Goals" />
      <CheckboxItem field="learnings_completed" label="Learnings" />
    </div>
  );
}