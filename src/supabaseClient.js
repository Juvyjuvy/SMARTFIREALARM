// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://avixluetvcqbbpmhdtfm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2aXhsdWV0dmNxYmJwbWhkdGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NjExMDYsImV4cCI6MjA2MzIzNzEwNn0.nnRPPd_jbrko5M81cOwO7QltkDmj4SDpghcGk6CruFY';

export const supabase = createClient(supabaseUrl, supabaseKey);
