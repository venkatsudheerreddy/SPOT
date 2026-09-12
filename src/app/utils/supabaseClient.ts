import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

// Env vars take precedence (Vercel / local .env.local).
// Fallbacks are the public anon credentials for this project —
// the anon key is safe in client code; Supabase RLS enforces access control.
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://ixalugmtmxdgtdcwhpyc.supabase.co";

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4YWx1Z210bXhkZ3RkY3docHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNDc4NjAsImV4cCI6MjA4MDgyMzg2MH0.RGdo2sjA44QoP5tM54RVVP5igLvgaMY32iAwg2_4Fhk";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
