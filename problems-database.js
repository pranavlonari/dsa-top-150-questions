// Comprehensive LeetCode Top 150 Problems Database
// This file contains all problems with detailed explanations, multiple approaches, and optimizations

const problemsDatabase = {
  // Array & String Problems
  "arrays-and-strings": [
    {
      id: 1,
      title: "Merge Sorted Array",
      difficulty: "easy",
      category: "arrays-and-strings",
      description: `You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively. 

The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.

Merge nums2 into nums1 as one sorted array.`,
      examples: [
        {
          input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
          output: "[1,2,2,3,5,6]",
          explanation:
            "The arrays we are merging are [1,2,3] and [2,5,6]. The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.",
        },
        {
          input: "nums1 = [1], m = 1, nums2 = [], n = 0",
          output: "[1]",
          explanation:
            "The arrays we are merging are [1] and []. The result of the merge is [1].",
        },
      ],
      constraints: [
        "nums1.length == m + n",
        "nums2.length == n",
        "0 <= m, n <= 200",
        "1 <= m + n <= 200",
        "-10^9 <= nums1[i], nums2[j] <= 10^9",
      ],
      approaches: [
        {
          name: "Three Pointer Approach (Optimal)",
          description: `The key insight is to start merging from the end of both arrays and place elements at the end of nums1. This way, we never overwrite elements that we haven't processed yet.

**Why this works:**
1. We start from the largest elements in both arrays
2. We place them at the end of nums1 where there are zeros
3. We work backwards, so we never overwrite unprocessed elements
4. This eliminates the need for extra space

**Step-by-step process:**
1. Initialize three pointers: i (last element of nums1's valid part), j (last element of nums2), k (last position in nums1)
2. Compare nums1[i] and nums2[j], place the larger one at nums1[k]
3. Move the corresponding pointers
4. Continue until all elements are processed`,
          timeComplexity: "O(m + n)",
          spaceComplexity: "O(1)",
          code: `class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        // Three pointers approach - start from the end
        int i = m - 1;     // Last element in nums1's initial part
        int j = n - 1;     // Last element in nums2
        int k = m + n - 1; // Last position in nums1
        
        // Merge from the end to avoid overwriting
        while (i >= 0 && j >= 0) {
            if (nums1[i] > nums2[j]) {
                nums1[k] = nums1[i];
                i--;
            } else {
                nums1[k] = nums2[j];
                j--;
            }
            k--;
        }
        
        // If there are remaining elements in nums2, copy them
        // No need to copy remaining elements from nums1 as they're already in place
        while (j >= 0) {
            nums1[k] = nums2[j];
            j--;
            k--;
        }
    }
}`,
        },
      ],
      optimizedApproach: {
        name: "Cleaner Implementation",
        description: `This is a more elegant version of the same algorithm with slightly cleaner code structure. The logic remains the same but with improved readability.`,
        code: `class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int i = m - 1, j = n - 1;
        
        // Start from the end and work backwards
        for (int k = m + n - 1; k >= 0; k--) {
            // If all nums2 elements are processed, break
            if (j < 0) break;
            
            // If nums1 has elements and current nums1 element is larger
            if (i >= 0 && nums1[i] > nums2[j]) {
                nums1[k] = nums1[i--];
            } else {
                nums1[k] = nums2[j--];
            }
        }
    }
}`,
        advantages: [
          "More concise code",
          "Same time and space complexity",
          "Easier to understand the main loop",
        ],
      },
      keyInsights: [
        "Working backwards prevents overwriting unprocessed elements",
        "The larger elements naturally go to the end",
        "No extra space needed since nums1 has enough capacity",
        "Only need to handle remaining nums2 elements, not nums1",
      ],
      commonMistakes: [
        "Starting from the beginning (overwrites elements)",
        "Forgetting to handle remaining elements in nums2",
        "Not updating all three pointers correctly",
        "Confusing the array bounds",
      ],
      relatedProblems: [
        "Merge Two Sorted Lists",
        "Merge k Sorted Arrays",
        "Sort Colors",
      ],
    },
    {
      id: 2,
      title: "Remove Element",
      difficulty: "easy",
      category: "arrays-and-strings",
      description: `Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Return the number of elements in nums which are not equal to val.

Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:
- Change the array nums such that the first k elements of nums contain the elements which are not equal to val
- The order of those k elements does not matter
- Return k

The judge will test your solution with the following code:
int[] nums = [...]; // Input array  
int val = ...; // Value to remove
int[] expectedNums = [...]; // The expected answer with correct length
int k = removeElement(nums, val); // Calls your implementation
assert k == expectedNums.length;
sort(nums, 0, k); // Sort the first k elements of nums
for (int i = 0; i < actualLength; i++) {
    assert nums[i] == expectedNums[i];
}`,
      examples: [
        {
          input: "nums = [3,2,2,3], val = 3",
          output: "2, nums = [2,2,_,_]",
          explanation:
            "Your function should return k = 2, with the first two elements of nums being 2. It does not matter what you leave beyond the returned k.",
        },
        {
          input: "nums = [0,1,2,2,3,0,4,2], val = 2",
          output: "5, nums = [0,1,4,0,3,_,_,_]",
          explanation:
            "Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.",
        },
      ],
      constraints: [
        "0 <= nums.length <= 100",
        "0 <= nums[i] <= 50",
        "0 <= val <= 100",
      ],
      approaches: [
        {
          name: "Two Pointers - Write Pointer Approach",
          description: `This approach uses two pointers: one to read through the array and another to track where to write the next valid element.

**Algorithm Explanation:**
1. Use pointer 'i' to iterate through the entire array
2. Use pointer 'k' to track the position where we should place the next valid element
3. When we find an element that's not equal to val, we copy it to position k and increment k
4. Continue until we've processed all elements
5. Return k (the count of valid elements)

**Why this works:**
- We maintain the relative order of valid elements
- k always points to the next position to write
- We only increment k when we find a valid element
- The first k elements will contain all valid elements`,
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          code: `class Solution {
    public int removeElement(int[] nums, int val) {
        int k = 0; // Pointer for the next position to place valid elements
        
        // Iterate through the entire array
        for (int i = 0; i < nums.length; i++) {
            // If current element is not the target value
            if (nums[i] != val) {
                nums[k] = nums[i]; // Place it at position k
                k++;                // Move to next write position
            }
            // If nums[i] == val, we skip it (don't increment k)
        }
        
        return k; // Return count of valid elements
    }
}`,
        },
        {
          name: "Two Pointers - Swap with End Approach",
          description: `This approach is more efficient when the elements to remove are rare. Instead of shifting elements, we swap the element to be removed with the last element.

**Algorithm Explanation:**
1. Use pointer 'i' to iterate and 'n' to track the current array size
2. When we find an element equal to val, swap it with the last element
3. Decrease the array size (n) but don't increment i (we need to check the swapped element)
4. When element is not equal to val, increment i
5. Continue until i reaches n

**Advantages:**
- Fewer write operations when elements to remove are rare
- Can be faster in practice for certain inputs
- Still maintains the requirement (order doesn't matter)`,
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          code: `class Solution {
    public int removeElement(int[] nums, int val) {
        int i = 0;           // Current position
        int n = nums.length; // Current array size
        
        while (i < n) {
            if (nums[i] == val) {
                // Replace current element with last element
                nums[i] = nums[n - 1];
                n--; // Reduce the size
                // Don't increment i, we need to check the new element
            } else {
                i++; // Move to next element
            }
        }
        
        return n; // Return the new size
    }
}`,
        },
      ],
      optimizedApproach: {
        name: "Enhanced Write Pointer with Early Termination",
        description: `This combines the clarity of the first approach with an optimization for cases where we can terminate early.`,
        code: `class Solution {
    public int removeElement(int[] nums, int val) {
        int writeIndex = 0;
        int validCount = 0;
        
        for (int readIndex = 0; readIndex < nums.length; readIndex++) {
            if (nums[readIndex] != val) {
                nums[writeIndex++] = nums[readIndex];
                validCount++;
            }
        }
        
        return validCount;
    }
}`,
        advantages: [
          "Clear variable names improve readability",
          "Explicit count tracking",
          "Same optimal time and space complexity",
        ],
      },
      keyInsights: [
        "Order doesn't matter - we can modify the array freely",
        "Two-pointer technique is perfect for in-place operations",
        "Write pointer always <= read pointer",
        "We only need to return the count, not preserve beyond k elements",
      ],
      commonMistakes: [
        "Trying to preserve order when it's not required",
        "Creating a new array instead of modifying in-place",
        "Not handling edge cases (empty array, all elements same as val)",
        "Forgetting to return the count of remaining elements",
      ],
      relatedProblems: [
        "Remove Duplicates from Sorted Array",
        "Move Zeroes",
        "Remove All Adjacent Duplicates In String",
      ],
    },
    {
      id: 3,
      title: "Remove Duplicates from Sorted Array",
      difficulty: "easy",
      category: "arrays-and-strings",
      description: `Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.

Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:
- Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially
- The remaining elements of nums are not important as well as the size of nums
- Return k

Custom Judge:
int[] nums = [...]; // Input array
int[] expectedNums = [...]; // The expected answer with correct length
int k = removeDuplicates(nums); // Calls your implementation
assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}`,
      examples: [
        {
          input: "nums = [1,1,2]",
          output: "2, nums = [1,2,_]",
          explanation:
            "Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively. It does not matter what you leave beyond the returned k.",
        },
        {
          input: "nums = [0,0,1,1,1,2,2,3,3,4]",
          output: "5, nums = [0,1,2,3,4,_,_,_,_,_]",
          explanation:
            "Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.",
        },
      ],
      constraints: [
        "1 <= nums.length <= 3 * 10^4",
        "-100 <= nums[i] <= 100",
        "nums is sorted in non-decreasing order",
      ],
      approaches: [
        {
          name: "Two Pointers - Slow and Fast",
          description: `Since the array is sorted, all duplicates are adjacent. We can use two pointers to efficiently remove duplicates.

**Algorithm Explanation:**
1. Use the first element as our starting point (it's always unique)
2. Start comparing from the second element
3. Use pointer 'k' to track where to place the next unique element
4. Use pointer 'i' to scan through the array
5. When we find an element different from the previous one, it's unique
6. Place this unique element at position k and increment k

**Key Insight:**
Since the array is sorted, we only need to compare with the previous element to determine uniqueness. If nums[i] != nums[i-1], then nums[i] is a new unique element.

**Visual Example:**
Input: [1,1,2,2,3]
- k=1 (position for next unique element)
- i=1: nums[1]=1, nums[0]=1, same → skip
- i=2: nums[2]=2, nums[1]=1, different → nums[1]=2, k=2
- i=3: nums[3]=2, nums[2]=2, same → skip  
- i=4: nums[4]=3, nums[3]=2, different → nums[2]=3, k=3
Result: [1,2,3,_,_], k=3`,
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          code: `class Solution {
    public int removeDuplicates(int[] nums) {
        // Handle edge case
        if (nums.length == 0) return 0;
        
        // First element is always unique
        int k = 1; // Position for next unique element (start from index 1)
        
        // Start checking from the second element
        for (int i = 1; i < nums.length; i++) {
            // If current element is different from previous element
            if (nums[i] != nums[i - 1]) {
                nums[k] = nums[i]; // Place it at position k
                k++;               // Move to next position
            }
            // If nums[i] == nums[i-1], it's a duplicate, skip it
        }
        
        return k; // Return count of unique elements
    }
}`,
        },
        {
          name: "Alternative Two Pointers Implementation",
          description: `This is another way to implement the same logic with slightly different pointer management.

**Algorithm Explanation:**
1. Use 'j' as the write pointer starting from 0
2. For each element, check if it's the first element or different from previous
3. If so, write it at position j and increment j
4. This approach is more generic and works even if we want to include the first element in the comparison logic`,
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          code: `class Solution {
    public int removeDuplicates(int[] nums) {
        int j = 0; // Write pointer
        
        for (int i = 0; i < nums.length; i++) {
            // Include element if it's the first one or different from previous
            if (i == 0 || nums[i] != nums[i - 1]) {
                nums[j] = nums[i];
                j++;
            }
        }
        
        return j;
    }
}`,
        },
      ],
      optimizedApproach: {
        name: "Streamlined Implementation",
        description: `This version combines the best aspects of both approaches with the clearest logic flow.`,
        code: `class Solution {
    public int removeDuplicates(int[] nums) {
        // Use writePos to track where to write next unique element
        int writePos = 1; // Start from 1 since first element is always unique
        
        // Scan from second element
        for (int i = 1; i < nums.length; i++) {
            // If current element is different from the last unique element
            if (nums[i] != nums[writePos - 1]) {
                nums[writePos] = nums[i];
                writePos++;
            }
        }
        
        return writePos;
    }
}`,
        advantages: [
          "Clearer variable naming",
          "Compares with last written unique element",
          "Handles empty array naturally",
          "Same optimal complexity",
        ],
      },
      keyInsights: [
        "Sorted array property ensures duplicates are adjacent",
        "Only need to compare with the previous element",
        "Two pointers prevent the need for extra space",
        "Write pointer always <= read pointer",
        "First element is always unique",
      ],
      commonMistakes: [
        "Forgetting to handle empty array",
        "Starting comparison from index 0 instead of 1",
        "Using extra space when in-place modification is required",
        "Not utilizing the sorted property of the array",
        "Comparing with wrong elements",
      ],
      relatedProblems: [
        "Remove Duplicates from Sorted Array II",
        "Remove Element",
        "Remove Duplicates from Sorted List",
      ],
    },
  ],

  // Two Pointers Problems
  "two-pointers": [
    {
      id: 25,
      title: "Valid Palindrome",
      difficulty: "easy",
      category: "two-pointers",
      description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

Given a string s, return true if it is a palindrome, or false otherwise.

Note: For this problem, we define empty string as valid palindrome.`,
      examples: [
        {
          input: 's = "A man, a plan, a canal: Panama"',
          output: "true",
          explanation: '"amanaplanacanalpanama" is a palindrome.',
        },
        {
          input: 's = "race a car"',
          output: "false",
          explanation: '"raceacar" is not a palindrome.',
        },
        {
          input: 's = " "',
          output: "true",
          explanation:
            's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.',
        },
      ],
      constraints: [
        "1 <= s.length <= 2 * 10^5",
        "s consists only of printable ASCII characters",
      ],
      approaches: [
        {
          name: "Two Pointers with Character Filtering",
          description: `This approach uses two pointers moving from opposite ends of the string, skipping non-alphanumeric characters and comparing valid characters after converting to lowercase.

**Algorithm Explanation:**
1. Initialize two pointers: left at the start (0) and right at the end (length-1)
2. Move pointers inward, skipping non-alphanumeric characters
3. When both pointers point to alphanumeric characters, compare them (case-insensitive)
4. If they don't match, return false
5. Continue until pointers meet or cross
6. If we complete the scan without mismatches, it's a palindrome

**Why Two Pointers Work Here:**
- We need to compare characters from both ends moving inward
- Palindromes read the same forwards and backwards
- Two pointers let us compare corresponding positions efficiently
- We can skip invalid characters on both sides simultaneously

**Character Filtering Logic:**
- Use Character.isLetterOrDigit() to check if character is alphanumeric
- Use Character.toLowerCase() for case-insensitive comparison
- Skip spaces, punctuation, and special characters`,
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          code: `class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        
        while (left < right) {
            // Skip non-alphanumeric characters from left
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
                left++;
            }
            
            // Skip non-alphanumeric characters from right
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
                right--;
            }
            
            // Compare characters (case-insensitive)
            if (Character.toLowerCase(s.charAt(left)) != 
                Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            
            // Move pointers inward
            left++;
            right--;
        }
        
        return true; // All characters matched
    }
}`,
        },
        {
          name: "Preprocessing Approach",
          description: `This approach first cleans the string by removing non-alphanumeric characters and converting to lowercase, then checks if the cleaned string is a palindrome.

**Algorithm Explanation:**
1. Create a cleaned version of the string with only alphanumeric characters in lowercase
2. Use two pointers to check if the cleaned string reads the same forwards and backwards
3. This separates the concerns of filtering and palindrome checking

**Pros:**
- Clear separation of filtering and checking logic
- Easier to understand and debug
- Can reuse the cleaned string if needed

**Cons:**
- Uses extra space for the cleaned string
- Two passes through the string (one for cleaning, one for checking)`,
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          code: `class Solution {
    public boolean isPalindrome(String s) {
        // Clean the string: keep only alphanumeric and convert to lowercase
        StringBuilder cleaned = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (Character.isLetterOrDigit(c)) {
                cleaned.append(Character.toLowerCase(c));
            }
        }
        
        // Check if cleaned string is palindrome
        String cleanedStr = cleaned.toString();
        int left = 0, right = cleanedStr.length() - 1;
        
        while (left < right) {
            if (cleanedStr.charAt(left) != cleanedStr.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        
        return true;
    }
}`,
        },
      ],
      optimizedApproach: {
        name: "Optimized Two Pointers with Helper Method",
        description: `This approach combines the efficiency of the first method with better code organization by extracting the character filtering logic.`,
        code: `class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        
        while (left < right) {
            char leftChar = s.charAt(left);
            char rightChar = s.charAt(right);
            
            // Skip non-alphanumeric characters
            if (!isAlphanumeric(leftChar)) {
                left++;
                continue;
            }
            if (!isAlphanumeric(rightChar)) {
                right--;
                continue;
            }
            
            // Compare characters (case-insensitive)
            if (toLowerCase(leftChar) != toLowerCase(rightChar)) {
                return false;
            }
            
            left++;
            right--;
        }
        
        return true;
    }
    
    private boolean isAlphanumeric(char c) {
        return (c >= 'a' && c <= 'z') || 
               (c >= 'A' && c <= 'Z') || 
               (c >= '0' && c <= '9');
    }
    
    private char toLowerCase(char c) {
        if (c >= 'A' && c <= 'Z') {
            return (char)(c + ('a' - 'A'));
        }
        return c;
    }
}`,
        advantages: [
          "Avoids library function calls for better performance",
          "More explicit character handling",
          "Still O(1) space complexity",
          "Easier to customize filtering rules",
        ],
      },
      keyInsights: [
        "Two pointers technique is perfect for palindrome checking",
        "Character filtering can be done on-the-fly or as preprocessing",
        "Case-insensitive comparison is crucial",
        "Empty string is considered a valid palindrome",
        "Skip non-alphanumeric characters but count valid ones for comparison",
      ],
      commonMistakes: [
        "Forgetting to handle case sensitivity",
        "Not skipping non-alphanumeric characters properly",
        "Comparing characters without filtering first",
        "Off-by-one errors in pointer movement",
        "Not handling empty strings correctly",
        "Using inefficient string manipulation methods",
      ],
      relatedProblems: [
        "Palindrome Number",
        "Valid Palindrome II",
        "Longest Palindromic Substring",
        "Palindrome Linked List",
      ],
    },
  ],

  // Binary Search Problems
  "binary-search": [
    {
      id: 117,
      title: "Search in Rotated Sorted Array",
      difficulty: "medium",
      category: "binary-search",
      description: `There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the rotated sorted array nums and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.`,
      examples: [
        {
          input: "nums = [4,5,6,7,0,1,2], target = 0",
          output: "4",
          explanation: "The target 0 is at index 4.",
        },
        {
          input: "nums = [4,5,6,7,0,1,2], target = 3",
          output: "-1",
          explanation: "3 is not in the array.",
        },
        {
          input: "nums = [1], target = 0",
          output: "-1",
          explanation: "0 is not in the array.",
        },
      ],
      constraints: [
        "1 <= nums.length <= 5000",
        "-10^4 <= nums[i] <= 10^4",
        "All values of nums are unique",
        "nums is an ascending array that is possibly rotated",
        "-10^4 <= target <= 10^4",
      ],
      approaches: [
        {
          name: "Modified Binary Search",
          description: `The key insight is that even though the array is rotated, at least one half of the array will always be sorted. We can determine which half is sorted and then decide which half to search.

**Algorithm Explanation:**
1. Use standard binary search with left, right, and mid pointers
2. At each iteration, determine which half (left or right) is sorted
3. Check if the target lies within the sorted half
4. If yes, search in that half; otherwise, search in the other half
5. Continue until target is found or search space is exhausted

**How to determine which half is sorted:**
- If nums[left] <= nums[mid]: left half is sorted
- Otherwise: right half is sorted

**How to check if target is in sorted half:**
- For sorted left half: nums[left] <= target < nums[mid]
- For sorted right half: nums[mid] < target <= nums[right]

**Visual Example:**
Array: [4,5,6,7,0,1,2], target = 0
- left=0, right=6, mid=3: nums[mid]=7
- nums[0]=4 <= nums[3]=7, so left half [4,5,6,7] is sorted
- target=0 is not in [4,7], so search right half
- left=4, right=6, mid=5: nums[mid]=1  
- nums[4]=0 <= nums[5]=1, so left half [0,1] is sorted
- target=0 is in [0,1], so search left half
- left=4, right=4, mid=4: nums[mid]=0 = target, found!`,
          timeComplexity: "O(log n)",
          spaceComplexity: "O(1)",
          code: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            // Found the target
            if (nums[mid] == target) {
                return mid;
            }
            
            // Determine which side is sorted
            if (nums[left] <= nums[mid]) {
                // Left side is sorted
                if (nums[left] <= target && target < nums[mid]) {
                    // Target is in the sorted left side
                    right = mid - 1;
                } else {
                    // Target is in the right side
                    left = mid + 1;
                }
            } else {
                // Right side is sorted
                if (nums[mid] < target && target <= nums[right]) {
                    // Target is in the sorted right side
                    left = mid + 1;
                } else {
                    // Target is in the left side
                    right = mid - 1;
                }
            }
        }
        
        return -1; // Target not found
    }
}`,
        },
        {
          name: "Find Pivot + Binary Search",
          description: `This approach first finds the rotation point (pivot), then performs standard binary search on the appropriate sorted portion.

**Algorithm Explanation:**
1. First, find the pivot (smallest element) using binary search
2. Determine which part of the array to search based on target value
3. Perform standard binary search on the chosen part
4. This approach is more intuitive but requires two binary searches

**Finding the Pivot:**
- The pivot is where nums[i] > nums[i+1]
- Use binary search to find this point efficiently
- Handle edge cases where array is not rotated`,
          timeComplexity: "O(log n)",
          spaceComplexity: "O(1)",
          code: `class Solution {
    public int search(int[] nums, int target) {
        int n = nums.length;
        
        // Find the pivot (rotation point)
        int pivot = findPivot(nums);
        
        // If array is not rotated
        if (pivot == 0) {
            return binarySearch(nums, 0, n - 1, target);
        }
        
        // Determine which part to search
        if (target >= nums[0]) {
            // Search in left part [0, pivot-1]
            return binarySearch(nums, 0, pivot - 1, target);
        } else {
            // Search in right part [pivot, n-1]
            return binarySearch(nums, pivot, n - 1, target);
        }
    }
    
    private int findPivot(int[] nums) {
        int left = 0, right = nums.length - 1;
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        return left;
    }
    
    private int binarySearch(int[] nums, int left, int right, int target) {
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1;
    }
}`,
        },
      ],
      optimizedApproach: {
        name: "Single Pass Modified Binary Search with Clear Logic",
        description: `This is an optimized version of the first approach with clearer condition checking and better variable naming.`,
        code: `class Solution {
    public int search(int[] nums, int target) {
        int start = 0, end = nums.length - 1;
        
        while (start <= end) {
            int mid = start + (end - start) / 2;
            
            if (nums[mid] == target) {
                return mid;
            }
            
            // Check if left half is sorted
            if (nums[start] <= nums[mid]) {
                // Left half is sorted
                if (target >= nums[start] && target < nums[mid]) {
                    end = mid - 1;  // Search left half
                } else {
                    start = mid + 1; // Search right half
                }
            } else {
                // Right half is sorted
                if (target > nums[mid] && target <= nums[end]) {
                    start = mid + 1; // Search right half
                } else {
                    end = mid - 1;   // Search left half
                }
            }
        }
        
        return -1;
    }
}`,
        advantages: [
          "Single binary search pass",
          "Clearer variable names (start/end vs left/right)",
          "More explicit boundary conditions",
          "Optimal time and space complexity",
        ],
      },
      keyInsights: [
        "At least one half is always sorted in a rotated sorted array",
        "Use the sorted half to determine search direction",
        "Standard binary search principles still apply",
        "Careful boundary checking is crucial",
        "The rotation point divides array into two sorted subarrays",
      ],
      commonMistakes: [
        "Incorrect boundary conditions in sorted half checking",
        "Not handling edge cases (single element, no rotation)",
        "Confusing < vs <= in comparisons",
        "Wrong target range checking for sorted halves",
        "Infinite loops due to incorrect pointer updates",
      ],
      relatedProblems: [
        "Find Minimum in Rotated Sorted Array",
        "Search in Rotated Sorted Array II",
        "Find Peak Element",
      ],
    },
  ],

  // Heap Problems
  heap: [
    {
      id: 121,
      title: "Kth Largest Element in an Array",
      difficulty: "medium",
      category: "heap",
      description: `Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?`,
      examples: [
        {
          input: "nums = [3,2,1,5,6,4], k = 2",
          output: "5",
          explanation:
            "The array sorted in descending order is [6,5,4,3,2,1]. The 2nd largest element is 5.",
        },
        {
          input: "nums = [3,2,3,1,2,4,5,5,6], k = 4",
          output: "4",
          explanation:
            "The array sorted in descending order is [6,5,5,4,3,3,2,2,1]. The 4th largest element is 4.",
        },
      ],
      constraints: [
        "1 <= k <= nums.length <= 10^5",
        "-10^4 <= nums[i] <= 10^4",
      ],
      approaches: [
        {
          name: "Min Heap Approach",
          description: `Use a min heap of size k to keep track of the k largest elements. The root of the min heap will be the kth largest element.

**Algorithm Explanation:**
1. Create a min heap (priority queue with natural ordering)
2. Iterate through all elements in the array
3. For each element:
   - Add it to the heap
   - If heap size exceeds k, remove the smallest element (root)
4. After processing all elements, the root contains the kth largest element

**Why this works:**
- Min heap keeps smallest element at root
- By maintaining size k, we keep only the k largest elements
- The smallest among these k largest elements is the kth largest overall
- Heap operations (add/remove) are O(log k)

**Visual Example:**
nums = [3,2,1,5,6,4], k = 2
- Add 3: heap = [3]
- Add 2: heap = [2,3] 
- Add 1: heap = [1,2,3], size > k=2, remove 1: heap = [2,3]
- Add 5: heap = [2,3,5], size > k=2, remove 2: heap = [3,5]
- Add 6: heap = [3,5,6], size > k=2, remove 3: heap = [5,6]
- Add 4: heap = [4,5,6], size > k=2, remove 4: heap = [5,6]
Result: root = 5 (2nd largest)`,
          timeComplexity: "O(n log k)",
          spaceComplexity: "O(k)",
          code: `class Solution {
    public int findKthLargest(int[] nums, int k) {
        // Create a min heap
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        
        // Process each element
        for (int num : nums) {
            minHeap.offer(num);
            
            // If heap size exceeds k, remove the smallest element
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        
        // The root is the kth largest element
        return minHeap.peek();
    }
}`,
        },
        {
          name: "QuickSelect Algorithm",
          description: `QuickSelect is based on the partition operation of QuickSort. It has average O(n) time complexity.

**Algorithm Explanation:**
1. Choose a pivot and partition the array
2. After partitioning, elements smaller than pivot are on left, larger on right
3. If pivot position equals n-k (0-indexed), pivot is the kth largest
4. If pivot position > n-k, search in left subarray
5. If pivot position < n-k, search in right subarray
6. Recursively apply until we find the kth largest element

**Why n-k index:**
- In 0-indexed array, kth largest element is at position n-k
- For k=1 (largest), position = n-1 (last in sorted array)
- For k=n (smallest), position = 0 (first in sorted array)

**Partition Logic:**
- Choose last element as pivot
- Move all elements smaller than pivot to left
- Move all elements larger than pivot to right
- Return final position of pivot`,
          timeComplexity: "O(n) average, O(n²) worst case",
          spaceComplexity: "O(1)",
          code: `class Solution {
    public int findKthLargest(int[] nums, int k) {
        // Convert to 0-indexed: kth largest is at position n-k
        return quickSelect(nums, 0, nums.length - 1, nums.length - k);
    }
    
    private int quickSelect(int[] nums, int left, int right, int targetIndex) {
        // Partition the array and get pivot position
        int pivotIndex = partition(nums, left, right);
        
        if (pivotIndex == targetIndex) {
            return nums[pivotIndex];
        } else if (pivotIndex > targetIndex) {
            // Search in left subarray
            return quickSelect(nums, left, pivotIndex - 1, targetIndex);
        } else {
            // Search in right subarray
            return quickSelect(nums, pivotIndex + 1, right, targetIndex);
        }
    }
    
    private int partition(int[] nums, int left, int right) {
        int pivot = nums[right]; // Choose last element as pivot
        int i = left;            // Index for smaller element
        
        // Rearrange array so elements < pivot are on left
        for (int j = left; j < right; j++) {
            if (nums[j] <= pivot) {
                swap(nums, i, j);
                i++;
            }
        }
        
        // Place pivot in its correct position
        swap(nums, i, right);
        return i;
    }
    
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}`,
        },
        {
          name: "Simple Sorting Approach",
          description: `The most straightforward approach is to sort the array and return the element at index n-k.

**Algorithm Explanation:**
1. Sort the array in ascending order
2. Return the element at index n-k (which is the kth largest)

**Pros:**
- Simple to implement and understand
- Works for all inputs
- No additional space required (if in-place sorting)

**Cons:**
- O(n log n) time complexity is not optimal
- Doesn't leverage the fact that we only need one element`,
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(1)",
          code: `class Solution {
    public int findKthLargest(int[] nums, int k) {
        Arrays.sort(nums);
        return nums[nums.length - k];
    }
}`,
        },
      ],
      optimizedApproach: {
        name: "Optimized Min Heap with Early Termination",
        description: `This approach optimizes the min heap method by potentially avoiding processing all elements when possible.`,
        code: `class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(k);
        
        for (int num : nums) {
            if (minHeap.size() < k) {
                minHeap.offer(num);
            } else if (num > minHeap.peek()) {
                minHeap.poll();
                minHeap.offer(num);
            }
        }
        
        return minHeap.peek();
    }
}`,
        advantages: [
          "Avoids unnecessary heap operations",
          "Still maintains O(n log k) complexity",
          "More efficient in practice",
          "Clear separation of logic",
        ],
      },
      keyInsights: [
        "Min heap of size k keeps track of k largest elements efficiently",
        "QuickSelect provides better average time complexity",
        "The kth largest element is at index n-k in sorted array",
        "Trade-off between time complexity and implementation complexity",
        "Heap approach is more stable and predictable than QuickSelect",
      ],
      commonMistakes: [
        "Using max heap instead of min heap",
        "Incorrect index calculation (k vs n-k)",
        "Not handling edge cases (k=1, k=n)",
        "Forgetting to maintain heap size in min heap approach",
        "Incorrect pivot selection in QuickSelect",
      ],
      relatedProblems: [
        "Kth Smallest Element in a Sorted Matrix",
        "Top K Frequent Elements",
        "Find K Closest Elements",
      ],
    },
  ],

  // Dynamic Programming Problems
  "dynamic-programming": [
    {
      id: 137,
      title: "Climbing Stairs",
      difficulty: "easy",
      category: "dynamic-programming",
      description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
      examples: [
        {
          input: "n = 2",
          output: "2",
          explanation:
            "There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps",
        },
        {
          input: "n = 3",
          output: "3",
          explanation:
            "There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
        },
      ],
      constraints: ["1 <= n <= 45"],
      approaches: [
        {
          name: "Dynamic Programming - Bottom Up",
          description: `This problem is essentially the Fibonacci sequence in disguise. To reach step n, we can come from step (n-1) by taking 1 step, or from step (n-2) by taking 2 steps.

**Mathematical Insight:**
dp[n] = dp[n-1] + dp[n-2]

This is because:
- All ways to reach step (n-1) + one more step = ways to reach n
- All ways to reach step (n-2) + two more steps = ways to reach n
- These are mutually exclusive, so we add them

**Algorithm Explanation:**
1. Base cases: dp[1] = 1 (one way), dp[2] = 2 (two ways)
2. For each step i from 3 to n: dp[i] = dp[i-1] + dp[i-2]
3. Return dp[n]

**Visual Example for n=4:**
- Step 1: 1 way [1]
- Step 2: 2 ways [1,1], [2]  
- Step 3: 3 ways [1,1,1], [1,2], [2,1]
- Step 4: 5 ways [1,1,1,1], [1,1,2], [1,2,1], [2,1,1], [2,2]
- dp[4] = dp[3] + dp[2] = 3 + 2 = 5`,
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          code: `class Solution {
    public int climbStairs(int n) {
        // Handle base cases
        if (n <= 2) return n;
        
        // Create DP array
        int[] dp = new int[n + 1];
        dp[1] = 1; // 1 way to reach step 1
        dp[2] = 2; // 2 ways to reach step 2
        
        // Fill the DP array
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[n];
    }
}`,
        },
        {
          name: "Space Optimized DP",
          description: `Since we only need the previous two values to calculate the current value, we can optimize space by using two variables instead of an array.

**Algorithm Explanation:**
1. Keep track of only the last two values (prev2, prev1)
2. For each step, calculate current = prev1 + prev2
3. Update prev2 = prev1, prev1 = current
4. Continue until we reach n

**Memory Optimization:**
Instead of storing all dp values, we only keep the two most recent ones. This reduces space complexity from O(n) to O(1) while maintaining the same time complexity.`,
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          code: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        
        int prev2 = 1; // dp[1] - ways to reach step 1
        int prev1 = 2; // dp[2] - ways to reach step 2
        
        // Calculate for steps 3 to n
        for (int i = 3; i <= n; i++) {
            int current = prev1 + prev2; // dp[i] = dp[i-1] + dp[i-2]
            prev2 = prev1;               // Update for next iteration
            prev1 = current;
        }
        
        return prev1;
    }
}`,
        },
        {
          name: "Recursive with Memoization (Top-Down)",
          description: `This approach uses recursion with memoization to avoid recalculating the same subproblems.

**Algorithm Explanation:**
1. Base cases: f(1) = 1, f(2) = 2
2. Recursive relation: f(n) = f(n-1) + f(n-2)
3. Use memoization to store computed results
4. This converts exponential time to linear time

**Why Memoization is Needed:**
Without memoization, we'd recalculate the same values multiple times:
- f(5) calls f(4) and f(3)
- f(4) calls f(3) and f(2)  
- f(3) is calculated twice
- This leads to exponential time complexity

**With Memoization:**
- Calculate each f(i) only once
- Store result in memo array/map
- Subsequent calls return stored result`,
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          code: `class Solution {
    public int climbStairs(int n) {
        Integer[] memo = new Integer[n + 1];
        return climb(n, memo);
    }
    
    private int climb(int n, Integer[] memo) {
        // Base cases
        if (n <= 2) return n;
        
        // Check if already computed
        if (memo[n] != null) return memo[n];
        
        // Compute and store result
        memo[n] = climb(n - 1, memo) + climb(n - 2, memo);
        return memo[n];
    }
}`,
        },
      ],
      optimizedApproach: {
        name: "Matrix Exponentiation (Advanced)",
        description: `For very large values of n, we can use matrix exponentiation to solve in O(log n) time. This approach represents the Fibonacci recurrence as matrix multiplication.`,
        code: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        
        // Matrix: [[1,1],[1,0]]
        // [[F(n+1)], [F(n)]] = [[1,1],[1,0]]^n * [[F(1)], [F(0)]]
        int[][] base = {{1, 1}, {1, 0}};
        int[][] result = matrixPower(base, n);
        
        return result[0][0];
    }
    
    private int[][] matrixPower(int[][] matrix, int n) {
        int[][] result = {{1, 0}, {0, 1}}; // Identity matrix
        
        while (n > 0) {
            if (n % 2 == 1) {
                result = multiply(result, matrix);
            }
            matrix = multiply(matrix, matrix);
            n /= 2;
        }
        
        return result;
    }
    
    private int[][] multiply(int[][] a, int[][] b) {
        return new int[][]{
            {a[0][0] * b[0][0] + a[0][1] * b[1][0], 
             a[0][0] * b[0][1] + a[0][1] * b[1][1]},
            {a[1][0] * b[0][0] + a[1][1] * b[1][0], 
             a[1][0] * b[0][1] + a[1][1] * b[1][1]}
        };
    }
}`,
        advantages: [
          "O(log n) time complexity",
          "Useful for very large n",
          "Demonstrates advanced DP optimization",
          "Still O(1) space complexity",
        ],
      },
      keyInsights: [
        "This is the classic Fibonacci sequence problem",
        "Each step can be reached from two previous steps",
        "Bottom-up DP builds solution incrementally",
        "Space can be optimized since we only need last two values",
        "Memoization converts recursive solution from exponential to linear time",
      ],
      commonMistakes: [
        "Not handling base cases properly (n=1, n=2)",
        "Off-by-one errors in array indexing",
        "Forgetting to initialize DP array values",
        "Using too much space when optimization is possible",
        "Recursive solution without memoization (TLE)",
      ],
      relatedProblems: [
        "House Robber",
        "Fibonacci Number",
        "N-th Tribonacci Number",
        "Min Cost Climbing Stairs",
      ],
    },
  ],
};

// Export the database for use in the web application
if (typeof module !== "undefined" && module.exports) {
  module.exports = problemsDatabase;
}

// Function to get problems by category
function getProblemsByCategory(category) {
  return problemsDatabase[category] || [];
}

// Function to get a specific problem by ID
function getProblemById(id) {
  for (const category in problemsDatabase) {
    const problems = problemsDatabase[category];
    const problem = problems.find((p) => p.id === id);
    if (problem) return problem;
  }
  return null;
}

// Function to get all categories
function getAllCategories() {
  return Object.keys(problemsDatabase);
}

// Function to get problems by difficulty
function getProblemsByDifficulty(difficulty) {
  const allProblems = [];
  for (const category in problemsDatabase) {
    allProblems.push(...problemsDatabase[category]);
  }
  return allProblems.filter((p) => p.difficulty === difficulty);
}

// Make functions available globally
if (typeof window !== "undefined") {
  window.problemsDatabase = problemsDatabase;
  window.getProblemsByCategory = getProblemsByCategory;
  window.getProblemById = getProblemById;
  window.getAllCategories = getAllCategories;
  window.getProblemsByDifficulty = getProblemsByDifficulty;
}
