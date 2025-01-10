export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          created_at: string
        }
        Insert: {
          id: string
          username: string
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          created_at?: string
        }
      }
      journal_entries: {
        Row: {
          id: string
          user_id: string
          entry_number: number
          date: string
          mood: string
          spiritual_goals: string | null
          mental_goals: string | null
          physical_goals: string | null
          learnings: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          entry_number?: number
          date?: string
          mood: string
          spiritual_goals?: string | null
          mental_goals?: string | null
          physical_goals?: string | null
          learnings?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          entry_number?: number
          date?: string
          mood?: string
          spiritual_goals?: string | null
          mental_goals?: string | null
          physical_goals?: string | null
          learnings?: string | null
          created_at?: string
        }
      }
    }
  }
}