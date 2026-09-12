// Derives project-level constants from the shared Vite env vars.
// Do not hardcode values here — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
// in .env.local (never committed) using .env.example as the template.

const supabaseUrl: string =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://ixalugmtmxdgtdcwhpyc.supabase.co";

// Extract the project ref from the URL: "https://<ref>.supabase.co" → "<ref>"
export const projectId: string = supabaseUrl
  .replace(/^https?:\/\//, "")
  .split(".")[0];

export const publicAnonKey: string =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4YWx1Z210bXhkZ3RkY3docHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNDc4NjAsImV4cCI6MjA4MDgyMzg2MH0.RGdo2sjA44QoP5tM54RVVP5igLvgaMY32iAwg2_4Fhk";
