// Content converter for adding more problems to the website
// This script helps convert your existing problem data into the web format

const convertProblemToWebFormat = (problemData) => {
  return {
    category: problemData.category || "general",
    difficulty: problemData.difficulty || "medium",
    title: problemData.title,
    description: problemData.description,
    example: problemData.example,
    approach: problemData.approach,
    timeComplexity: problemData.timeComplexity,
    spaceComplexity: problemData.spaceComplexity,
    solution: problemData.solution,
  };
};

// Example usage - you can expand this with all your problems
const allProblems = [
  // Bit Manipulation Problems
  {
    category: "bit-manipulation",
    difficulty: "easy",
    title: "Reverse Bits",
    description: "Reverse bits of a given 32 bits unsigned integer.",
    example: "Input: n = 00000010100101000001111010011100<br>Output: 964176192",
    approach:
      "Process each bit from right to left, shift result left and add current bit.",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    solution: `class Solution {
    public int reverseBits(int n) {
        int result = 0;
        for (int i = 0; i < 32; i++) {
            result <<= 1;
            result |= (n & 1);
            n >>= 1;
        }
        return result;
    }
}`,
  },
  {
    category: "bit-manipulation",
    difficulty: "easy",
    title: "Number of 1 Bits",
    description:
      "Write a function that takes an unsigned integer and returns the number of '1' bits it has.",
    example: "Input: n = 00000000000000000000000000001011<br>Output: 3",
    approach:
      "Use bit manipulation to count set bits. Keep clearing the lowest set bit until n becomes 0.",
    timeComplexity: "O(k)",
    spaceComplexity: "O(1)",
    solution: `class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            count++;
            n &= (n - 1); // Clear the lowest set bit
        }
        return count;
    }
}`,
  },

  // Math Problems
  {
    category: "math",
    difficulty: "easy",
    title: "Plus One",
    description:
      "You are given a large integer represented as an integer array digits. Increment the large integer by one.",
    example: "Input: digits = [1,2,3]<br>Output: [1,2,4]",
    approach:
      "Add 1 to the last digit and handle carry propagation. If all digits become 0, need extra digit at front.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) or O(n)",
    solution: `class Solution {
    public int[] plusOne(int[] digits) {
        for (int i = digits.length - 1; i >= 0; i--) {
            if (digits[i] != 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        
        int[] result = new int[digits.length + 1];
        result[0] = 1;
        return result;
    }
}`,
  },
  {
    category: "math",
    difficulty: "medium",
    title: "Factorial Trailing Zeroes",
    description:
      "Given an integer n, return the number of trailing zeroes in n!.",
    example:
      "Input: n = 3<br>Output: 0<br>Explanation: 3! = 6, no trailing zero.",
    approach:
      "Trailing zeros are created by factors of 10, which come from 2×5. Count factors of 5 in n!.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    solution: `class Solution {
    public int trailingZeroes(int n) {
        int count = 0;
        while (n >= 5) {
            n /= 5;
            count += n;
        }
        return count;
    }
}`,
  },

  // More DP Problems
  {
    category: "dp",
    difficulty: "medium",
    title: "Word Break",
    description:
      "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
    example:
      'Input: s = "leetcode", wordDict = ["leet","code"]<br>Output: true',
    approach:
      "Use dynamic programming. dp[i] represents if s[0...i-1] can be segmented.",
    timeComplexity: "O(n² × m)",
    spaceComplexity: "O(n + k)",
    solution: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> words = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        
        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && words.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        
        return dp[s.length()];
    }
}`,
  },
  {
    category: "dp",
    difficulty: "medium",
    title: "Longest Increasing Subsequence",
    description:
      "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    example:
      "Input: nums = [10,9,2,5,3,7,101,18]<br>Output: 4<br>Explanation: [2,3,7,101]",
    approach: "Use binary search with tails array for O(n log n) solution.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    solution: `class Solution {
    public int lengthOfLIS(int[] nums) {
        List<Integer> tails = new ArrayList<>();
        
        for (int num : nums) {
            int left = 0, right = tails.size();
            while (left < right) {
                int mid = left + (right - left) / 2;
                if (tails.get(mid) < num) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }
            
            if (left == tails.size()) {
                tails.add(num);
            } else {
                tails.set(left, num);
            }
        }
        
        return tails.size();
    }
}`,
  },
];

// Function to generate HTML for problems
const generateProblemHTML = (problems) => {
  return problems
    .map(
      (problem) => `
        <div class="problem-card ${problem.difficulty}" data-category="${
        problem.category
      }">
            <div class="problem-header">
                <h4>${problem.title}</h4>
                <span class="difficulty ${problem.difficulty}">${
        problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)
      }</span>
            </div>
            <div class="problem-content">
                <p class="problem-description">${problem.description}</p>
                <div class="example">
                    <strong>Example:</strong>
                    <code>${problem.example}</code>
                </div>
                <div class="approach">
                    <strong>Approach:</strong> ${problem.approach}
                </div>
                <div class="complexity">
                    <span><strong>Time:</strong> ${
                      problem.timeComplexity
                    }</span>
                    <span><strong>Space:</strong> ${
                      problem.spaceComplexity
                    }</span>
                </div>
                <details class="solution-details">
                    <summary>View Solution</summary>
                    <pre><code class="language-java">${
                      problem.solution
                    }</code></pre>
                </details>
            </div>
        </div>
    `
    )
    .join("\n");
};

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    allProblems,
    generateProblemHTML,
    convertProblemToWebFormat,
  };
}
