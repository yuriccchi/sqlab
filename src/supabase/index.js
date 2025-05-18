import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://znqdondigtpsvezvbtxy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpucWRvbmRpZ3Rwc3ZlenZidHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1Mzk0NDMsImV4cCI6MjA2MjExNTQ0M30.UGsnI83WCNc8_DBAIbUIsLvqLVUfI86AsLtzhjz8h5U';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);