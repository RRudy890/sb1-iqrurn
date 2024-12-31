export interface Database {
  public: {
    Tables: {
      applications: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          street: string;
          suburb: string;
          city: string;
          state: string;
          psira_grade: string;
          psira_expiry: string;
          drivers_license: string;
          businessCompetency: string;
          position: string;
          video_url: string | null;
          cv_url: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['applications']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['applications']['Insert']>;
      };
    };
  };
}