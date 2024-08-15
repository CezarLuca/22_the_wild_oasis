import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://izpcculeirjezmpfwdrd.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6cGNjdWxlaXJqZXptcGZ3ZHJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3MjY3MDUsImV4cCI6MjAzOTMwMjcwNX0.-intJyXn2Zvm12sZ8P9JeNsO77u_pJ9w08IaI9ivGtI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
