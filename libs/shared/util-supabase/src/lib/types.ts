export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Aquí definiremos tus tablas: profiles, orders, etc.
      profiles: {
        Row: {
          id: string
          full_name: string | null
          points: number
          avatar_url: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          points?: number
          avatar_url?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          points?: number
          avatar_url?: string | null
          updated_at?: string | null
        }
      }
    }
  }
}
