import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const supabaseUrl = "https://ixalugmtmxdgtdcwhpyc.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4YWx1Z210bXhkZ3RkY3docHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNDc4NjAsImV4cCI6MjA4MDgyMzg2MH0.RGdo2sjA44QoP5tM54RVVP5igLvgaMY32iAwg2_4Fhk";

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
);
