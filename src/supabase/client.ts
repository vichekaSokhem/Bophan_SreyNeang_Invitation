import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://smghbdljkdvluvyzqfwr.supabase.co";
export const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtZ2hiZGxqa2R2bHV2eXpxZndyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDYzNTEsImV4cCI6MjA3NTQ4MjM1MX0.msInecJteCxv6ZreHbIoFRR1fnepEFc3D3aVkDO1ZFM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
