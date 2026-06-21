// src/lib/supabase.js
// ─────────────────────────────────────────────────────────────
// SETUP INSTRUCTIONS (do this once, free):
//
// 1. Go to https://supabase.com → New project → name it "finaltrack"
// 2. After project loads, go to Settings → API
// 3. Copy "Project URL" and "anon public" key into the .env file:
//
//    REACT_APP_SUPABASE_URL=https://xxxx.supabase.co
//    REACT_APP_SUPABASE_ANON_KEY=eyJhbGci...
//
// 4. In Supabase → SQL Editor, run this to create the tables:
//
//    CREATE TABLE profiles (
//      id uuid references auth.users primary key,
//      name text,
//      leetcode_username text,
//      streak integer default 0,
//      last_active date,
//      created_at timestamp default now()
//    );
//
//    CREATE TABLE daily_progress (
//      id uuid default gen_random_uuid() primary key,
//      user_id uuid references profiles(id),
//      date date default current_date,
//      dsa_verified integer default 0,
//      quant_done boolean default false,
//      quant_module text,
//      writing_submitted boolean default false,
//      writing_words integer default 0,
//      created_at timestamp default now(),
//      unique(user_id, date)
//    );
//
// 5. In Supabase → Authentication → Providers:
//    - Enable Email (already on by default)
//    - Enable Google → add your OAuth client ID & secret
//      (get these free from console.cloud.google.com)
//
// ─────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
