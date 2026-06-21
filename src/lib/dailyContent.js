// src/lib/dailyContent.js
// All curated content that rotates daily

export const DSA_PROBLEMS = [
  // Week 1 - Arrays & Strings
  { slug: "two-sum", name: "Two Sum", diff: "Easy", url: "https://leetcode.com/problems/two-sum/" },
  { slug: "best-time-to-buy-and-sell-stock", name: "Best Time to Buy and Sell Stock", diff: "Easy", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
  { slug: "contains-duplicate", name: "Contains Duplicate", diff: "Easy", url: "https://leetcode.com/problems/contains-duplicate/" },
  { slug: "longest-substring-without-repeating-characters", name: "Longest Substring Without Repeating Characters", diff: "Medium", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
  { slug: "product-of-array-except-self", name: "Product of Array Except Self", diff: "Medium", url: "https://leetcode.com/problems/product-of-array-except-self/" },
  { slug: "maximum-subarray", name: "Maximum Subarray", diff: "Medium", url: "https://leetcode.com/problems/maximum-subarray/" },
  // Week 2 - Linked Lists
  { slug: "reverse-linked-list", name: "Reverse Linked List", diff: "Easy", url: "https://leetcode.com/problems/reverse-linked-list/" },
  { slug: "merge-two-sorted-lists", name: "Merge Two Sorted Lists", diff: "Easy", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
  { slug: "linked-list-cycle", name: "Linked List Cycle", diff: "Easy", url: "https://leetcode.com/problems/linked-list-cycle/" },
  { slug: "remove-nth-node-from-end-of-list", name: "Remove Nth Node From End of List", diff: "Medium", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
  { slug: "reorder-list", name: "Reorder List", diff: "Medium", url: "https://leetcode.com/problems/reorder-list/" },
  { slug: "lru-cache", name: "LRU Cache", diff: "Medium", url: "https://leetcode.com/problems/lru-cache/" },
  // Week 3 - Trees
  { slug: "invert-binary-tree", name: "Invert Binary Tree", diff: "Easy", url: "https://leetcode.com/problems/invert-binary-tree/" },
  { slug: "maximum-depth-of-binary-tree", name: "Maximum Depth of Binary Tree", diff: "Easy", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
  { slug: "same-tree", name: "Same Tree", diff: "Easy", url: "https://leetcode.com/problems/same-tree/" },
  { slug: "binary-tree-level-order-traversal", name: "Binary Tree Level Order Traversal", diff: "Medium", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
  { slug: "validate-binary-search-tree", name: "Validate Binary Search Tree", diff: "Medium", url: "https://leetcode.com/problems/validate-binary-search-tree/" },
  { slug: "binary-tree-maximum-path-sum", name: "Binary Tree Maximum Path Sum", diff: "Hard", url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
  // Week 4 - Dynamic Programming
  { slug: "climbing-stairs", name: "Climbing Stairs", diff: "Easy", url: "https://leetcode.com/problems/climbing-stairs/" },
  { slug: "house-robber", name: "House Robber", diff: "Medium", url: "https://leetcode.com/problems/house-robber/" },
  { slug: "coin-change", name: "Coin Change", diff: "Medium", url: "https://leetcode.com/problems/coin-change/" },
  { slug: "longest-increasing-subsequence", name: "Longest Increasing Subsequence", diff: "Medium", url: "https://leetcode.com/problems/longest-increasing-subsequence/" },
  { slug: "word-break", name: "Word Break", diff: "Medium", url: "https://leetcode.com/problems/word-break/" },
  { slug: "median-of-two-sorted-arrays", name: "Median of Two Sorted Arrays", diff: "Hard", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
];

export const QUANT_MODULES = [
  { id: "number-system", name: "Number System", topics: ["Divisibility rules", "LCM & HCF", "Remainders", "Factorials"] },
  { id: "percentages", name: "Percentages", topics: ["% increase/decrease", "Successive %", "Population problems", "Depreciation"] },
  { id: "profit-loss", name: "Profit & Loss", topics: ["CP, SP, Profit %", "Discount", "Marked price", "Successive discounts"] },
  { id: "simple-interest", name: "Simple Interest", topics: ["SI formula", "Finding rate", "Finding time", "Mixed problems"] },
  { id: "compound-interest", name: "Compound Interest", topics: ["CI formula", "Half-yearly", "CI vs SI", "Instalments"] },
  { id: "ratio-proportion", name: "Ratio & Proportion", topics: ["Basic ratios", "Proportions", "Mixtures", "Partnership"] },
  { id: "time-work", name: "Time & Work", topics: ["Work formula", "Pipes & cisterns", "Efficiency", "Wages"] },
  { id: "time-distance", name: "Time & Distance", topics: ["Speed formula", "Trains", "Boats & streams", "Relative speed"] },
  { id: "averages", name: "Averages", topics: ["Mean", "Weighted avg", "Age problems", "Replacing members"] },
  { id: "permutations", name: "Permutations & Combinations", topics: ["nPr", "nCr", "Arrangements", "Selections"] },
  { id: "probability", name: "Probability", topics: ["Basic probability", "Cards & coins", "Conditional prob", "Independent events"] },
  { id: "data-interpretation", name: "Data Interpretation", topics: ["Bar charts", "Pie charts", "Line graphs", "Tables"] },
];

export const WRITING_PROMPTS = [
  "Describe a challenge you overcame during your engineering studies and what it taught you.",
  "Write about a person who has inspired your career choice in engineering.",
  "Explain how technology is changing the world around you in your own words.",
  "Describe your ideal workplace and the kind of work you want to do after graduation.",
  "Write about a time you worked in a team and what you learned from the experience.",
  "Explain why communication skills are important for engineers.",
  "Describe the most interesting project you have worked on and what made it special.",
  "Write about your goals for the next five years after graduation.",
  "Explain a complex engineering concept in simple words to a non-engineer.",
  "Describe how you would handle a disagreement with a colleague at work.",
  "Write about a current technology trend that excites you and why.",
  "Describe what leadership means to you and give an example from your life.",
  "Write about a time you had to learn something completely new quickly.",
  "Explain why you chose electrical engineering as your field of study.",
  "Describe the role of artificial intelligence in the future of engineering.",
];

export const MOTIVATIONAL_QUOTES = [
  { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { quote: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { quote: "Don't watch the clock. Do what it does — keep going.", author: "Sam Levenson" },
  { quote: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
  { quote: "Great things never come from comfort zones.", author: "Unknown" },
  { quote: "Your only limit is your mind.", author: "Unknown" },
  { quote: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { quote: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
  { quote: "Dream it. Believe it. Build it.", author: "Unknown" },
  { quote: "Don't stop when you're tired. Stop when you're done.", author: "Unknown" },
  { quote: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown" },
  { quote: "Little things make big days.", author: "Unknown" },
  { quote: "It's going to be hard, but hard does not mean impossible.", author: "Unknown" },
  { quote: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
  { quote: "The expert in anything was once a beginner.", author: "Helen Hayes" },
];

// Get today's content based on day of year
export function getTodayContent() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - start) / 86400000);

  // 3 problems per day, cycling through the list
  const problemStartIdx = (dayOfYear * 3) % DSA_PROBLEMS.length;
  const todayProblems = [
    DSA_PROBLEMS[problemStartIdx % DSA_PROBLEMS.length],
    DSA_PROBLEMS[(problemStartIdx + 1) % DSA_PROBLEMS.length],
    DSA_PROBLEMS[(problemStartIdx + 2) % DSA_PROBLEMS.length],
  ];

  const todayModule = QUANT_MODULES[dayOfYear % QUANT_MODULES.length];
  const todayPrompt = WRITING_PROMPTS[dayOfYear % WRITING_PROMPTS.length];
  const todayQuote = MOTIVATIONAL_QUOTES[dayOfYear % MOTIVATIONAL_QUOTES.length];

  return { todayProblems, todayModule, todayPrompt, todayQuote };
}
