// src/hooks/useLeetCode.js
// Verifies if user solved today's problems TODAY (not past submissions)

import { useState, useCallback } from 'react';

const LEETCODE_API = 'https://leetcode.com/graphql';

// GraphQL query to fetch recent accepted submissions
const RECENT_SUBMISSIONS_QUERY = `
  query recentAcSubmissions($username: String!, $limit: Int!) {
    recentAcSubmissionList(username: $username, limit: $limit) {
      id
      title
      titleSlug
      timestamp
    }
  }
`;

export function useLeetCode() {
  const [status, setStatus] = useState('idle'); // idle | checking | success | error
  const [statusMessage, setStatusMessage] = useState('Enter your LeetCode username in settings to enable auto-verification.');
  const [verifiedProblems, setVerifiedProblems] = useState({});

  const verifyTodaySubmissions = useCallback(async (username, todayProblems) => {
    if (!username) {
      setStatus('error');
      setStatusMessage('No LeetCode username saved. Go to Settings to add it.');
      return;
    }

    setStatus('checking');
    setStatusMessage(`Connecting to LeetCode for @${username}...`);

    try {
      // Fetch last 20 submissions (enough to cover today's activity)
      const response = await fetch(LEETCODE_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Referer': 'https://leetcode.com',
        },
        body: JSON.stringify({
          query: RECENT_SUBMISSIONS_QUERY,
          variables: { username, limit: 20 },
        }),
      });

      if (!response.ok) throw new Error('LeetCode API unreachable');

      const data = await response.json();

      if (data.errors) {
        // Username not found on LeetCode
        setStatus('error');
        setStatusMessage(`Username "@${username}" not found on LeetCode. Check your spelling in Settings.`);
        return;
      }

      const submissions = data?.data?.recentAcSubmissionList || [];

      // KEY FIX: only count submissions made TODAY (after midnight)
      const todayMidnight = new Date();
      todayMidnight.setHours(0, 0, 0, 0);
      const todayTimestamp = todayMidnight.getTime();

      const todaySubmissions = submissions.filter(sub => {
        const subTime = parseInt(sub.timestamp) * 1000; // LeetCode gives Unix seconds
        return subTime >= todayTimestamp;
      });

      // Check each of today's 3 problems against today's submissions
      const newVerified = {};
      todayProblems.forEach(problem => {
        newVerified[problem.slug] = todaySubmissions.some(
          sub => sub.titleSlug === problem.slug
        );
      });

      setVerifiedProblems(newVerified);

      const verifiedCount = Object.values(newVerified).filter(Boolean).length;

      if (verifiedCount === 3) {
        setStatus('success');
        setStatusMessage(`All 3 problems verified! Great work today, @${username}!`);
      } else if (verifiedCount > 0) {
        setStatus('success');
        setStatusMessage(
          `${verifiedCount} of 3 problems verified for @${username}. ` +
          `Already solved the others before? Re-submit on LeetCode to verify.`
        );
      } else {
        setStatus('idle');
        setStatusMessage(
          `No accepted submissions found yet today for @${username}. ` +
          `Solved before? Just re-submit your solution on LeetCode to get verified.`
        );
      }

    } catch (err) {
      setStatus('error');
      setStatusMessage('Could not reach LeetCode. Check your internet connection and try again.');
    }
  }, []);

  return { status, statusMessage, verifiedProblems, verifyTodaySubmissions };
}
