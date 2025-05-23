/*
  # Add completion status columns to journal entries

  1. Changes
    - Add completion status columns to journal_entries table:
      - spiritual_completed (boolean)
      - mental_completed (boolean)
      - physical_completed (boolean)
      - learnings_completed (boolean)
    - Set default values to false
*/

ALTER TABLE journal_entries 
  ADD COLUMN IF NOT EXISTS spiritual_completed boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS mental_completed boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS physical_completed boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS learnings_completed boolean DEFAULT false;