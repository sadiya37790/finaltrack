# FinalTrack 🎓

Daily placement preparation tracker for final year engineering students.

## Features
- ✅ DSA — 3 LeetCode problems/day, **auto-verified** via LeetCode API (today's submissions only)
- ✅ Quantitative aptitude — 12 modules cycling daily
- ✅ Paragraph writing — 100-word minimum with word counter
- ✅ Daily email reminders at 8 AM + evening nudge
- ✅ Streak tracking
- ✅ Google login + Email/Password login
- ✅ Open to anyone via shareable link

---

## Deploy in 4 steps (all free)

### Step 1 — Set up Supabase (database + auth)

1. Go to [supabase.com](https://supabase.com) → **New project** → name it `finaltrack`
2. Wait for it to load, then go to **SQL Editor** and run this:

```sql
CREATE TABLE profiles (
  id uuid references auth.users primary key,
  name text,
  leetcode_username text,
  streak integer default 0,
  last_active date,
  created_at timestamp default now()
);

CREATE TABLE daily_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id),
  date date default current_date,
  dsa_verified integer default 0,
  quant_done boolean default false,
  quant_module text,
  writing_submitted boolean default false,
  writing_words integer default 0,
  created_at timestamp default now(),
  unique(user_id, date)
);
```

3. Go to **Settings → API** → copy your **Project URL** and **anon public** key

4. Go to **Authentication → Providers**:
   - Email is already enabled ✓
   - For Google: click Google → enable it → add Client ID & Secret from [console.cloud.google.com](https://console.cloud.google.com) (create OAuth 2.0 credentials, add your Vercel URL as authorized redirect)

---

### Step 2 — Set up the project locally

```bash
# Clone or download this folder
cd finaltrack

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
# Open .env and paste your Supabase URL and anon key
```

---

### Step 3 — Deploy to Vercel (free hosting + shareable link)

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your GitHub repo
3. Add environment variables in Vercel dashboard:
   - `REACT_APP_SUPABASE_URL` = your Supabase project URL
   - `REACT_APP_SUPABASE_ANON_KEY` = your anon key
4. Click **Deploy** — Vercel gives you a link like `finaltrack.vercel.app`
5. Share that link with your friends!

---

### Step 4 — Set up daily emails (optional but recommended)

Use [Resend](https://resend.com) (free tier: 3000 emails/month):

1. Sign up at resend.com → get your API key
2. In Supabase → **Edge Functions** → create a new function called `send-daily-email`
3. Use Supabase's built-in cron to trigger it at 8 AM IST daily

The email sends: today's 3 LeetCode problem links + quant module + writing prompt + motivation quote.

---

## LeetCode Verification Logic

The key feature that makes this honest:

```js
// Only submissions made AFTER midnight today count
const todayMidnight = new Date();
todayMidnight.setHours(0, 0, 0, 0);

const todaySubmissions = submissions.filter(sub =>
  parseInt(sub.timestamp) * 1000 >= todayMidnight.getTime()
);
```

**If a user solved a problem months ago:** They must re-submit on LeetCode today. Even copy-pasting their old solution counts — the goal is daily reinforcement.

---

## Project structure

```
finaltrack/
├── src/
│   ├── lib/
│   │   ├── supabase.js        ← Supabase client
│   │   ├── AuthContext.js     ← Login/logout/session
│   │   └── dailyContent.js    ← All DSA, quant, writing, quotes
│   ├── hooks/
│   │   └── useLeetCode.js     ← LeetCode API verification
│   ├── components/
│   │   ├── DSAModule.js       ← LeetCode section
│   │   ├── QuantModule.js     ← Aptitude section
│   │   └── WritingModule.js   ← Paragraph writing
│   ├── pages/
│   │   ├── AuthPage.js        ← Login + signup
│   │   └── Dashboard.js       ← Main dashboard
│   ├── App.js
│   └── index.js
├── public/index.html
├── .env.example
├── vercel.json
└── package.json
```

---

Built for final year EEE students at G. Pulla Reddy Engineering College 🚀
