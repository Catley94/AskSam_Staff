import { createClient } from '@supabase/supabase-js'

const supabaseURL = "https://kyndzadezcycquyqqwdq.supabase.co";
const supabaseAPIKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5bmR6YWRlemN5Y3F1eXFxd2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NDY5NzgsImV4cCI6MjAyODQyMjk3OH0.OrvA_keyA4qbt7GDxnPSU85Tj2Q2f-kXBnvt0icdlvg";

export const supabase = createClient(supabaseURL, supabaseAPIKey);