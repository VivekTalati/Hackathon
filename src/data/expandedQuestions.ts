import { Question } from '@/types';

export const EXPANDED_QUESTIONS: Question[] = [
  {
    "id": "q-eq-1",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-equivalent-fractions",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "Which fraction is equivalent to 2/3?",
    "options": [
      {
        "id": "a",
        "text": "4/6"
      },
      {
        "id": "b",
        "text": "3/4"
      },
      {
        "id": "c",
        "text": "4/9"
      },
      {
        "id": "d",
        "text": "5/6"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Multiplying both numerator and denominator of 2/3 by 2 gives 4/6.",
    "hint": "Multiply the top and bottom numbers by the exact same multiplier.",
    "estimatedSeconds": 15,
    "misconceptionTags": [
      "numerator_only_scale"
    ],
    "reasoningPrompt": "How did you determine this equivalent fraction?",
    "reasoningOptions": [
      "Multiplied numerator and denominator by 2",
      "Simplified each option to lowest terms",
      "Used mental picture or fraction bar"
    ]
  },
  {
    "id": "q-eq-2",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-equivalent-fractions",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "numeric",
    "prompt": "Complete the equivalent fraction: 3/5 = ? / 20. What is the missing numerator?",
    "correctAnswer": "12",
    "explanation": "5 × 4 = 20, so we multiply the numerator 3 × 4 = 12.",
    "hint": "What number did you multiply 5 by to reach 20? Multiply 3 by that same number.",
    "estimatedSeconds": 18,
    "misconceptionTags": [
      "additive_fraction_scaling"
    ],
    "reasoningPrompt": "What step did you take first?",
    "reasoningOptions": [
      "Divided 20 by 5 to find scale factor 4",
      "Cross multiplied (3 × 20) ÷ 5",
      "Guessed and checked multiples"
    ]
  },
  {
    "id": "q-eq-3",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-equivalent-fractions",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Simplify 18/24 to its simplest form.",
    "options": [
      {
        "id": "a",
        "text": "3/4"
      },
      {
        "id": "b",
        "text": "9/12"
      },
      {
        "id": "c",
        "text": "6/8"
      },
      {
        "id": "d",
        "text": "2/3"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The greatest common factor (GCF) of 18 and 24 is 6. Dividing both by 6 yields 3/4.",
    "hint": "Divide numerator and denominator by their greatest common factor (GCF = 6).",
    "estimatedSeconds": 20,
    "misconceptionTags": [
      "incomplete_simplification"
    ]
  },
  {
    "id": "q-eq-4",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-equivalent-fractions",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "Which pair of fractions are NOT equivalent?",
    "options": [
      {
        "id": "a",
        "text": "4/10 and 10/25"
      },
      {
        "id": "b",
        "text": "6/15 and 8/20"
      },
      {
        "id": "c",
        "text": "9/12 and 15/20"
      },
      {
        "id": "d",
        "text": "7/9 and 14/27"
      }
    ],
    "correctAnswer": "d",
    "explanation": "7/9 × 2/2 = 14/18, not 14/27. The denominator was multiplied by 3 while the numerator was multiplied by 2.",
    "hint": "Check if the multiplier is identical for both numerator and denominator.",
    "estimatedSeconds": 25
  },
  {
    "id": "q-eq-5",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-equivalent-fractions",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "If 4/7 = x/63, what is the value of x?",
    "options": [
      {
        "id": "a",
        "text": "36"
      },
      {
        "id": "b",
        "text": "28"
      },
      {
        "id": "c",
        "text": "42"
      },
      {
        "id": "d",
        "text": "32"
      }
    ],
    "correctAnswer": "a",
    "explanation": "7 × 9 = 63. Multiplying numerator 4 × 9 = 36.",
    "hint": "Determine the scaling factor from 7 to 63 (63 ÷ 7 = 9).",
    "estimatedSeconds": 20
  },
  {
    "id": "q-eq-6",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-equivalent-fractions",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Which fraction is equivalent to 1/2?",
    "options": [
      {
        "id": "a",
        "text": "8/16"
      },
      {
        "id": "b",
        "text": "2/5"
      },
      {
        "id": "c",
        "text": "3/7"
      },
      {
        "id": "d",
        "text": "4/9"
      }
    ],
    "correctAnswer": "a",
    "explanation": "8/16 simplifies to 1/2 when dividing numerator and denominator by 8.",
    "hint": "Look for a fraction where the numerator is exactly half the denominator.",
    "estimatedSeconds": 12
  },
  {
    "id": "q-unlike-1",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "What is the least common denominator (LCD) for 1/4 and 1/6?",
    "options": [
      {
        "id": "a",
        "text": "12"
      },
      {
        "id": "b",
        "text": "24"
      },
      {
        "id": "c",
        "text": "10"
      },
      {
        "id": "d",
        "text": "4"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Multiples of 4 are 4, 8, 12... Multiples of 6 are 6, 12... The least common multiple is 12.",
    "hint": "List the multiples of 4 and 6 until you find the smallest match.",
    "estimatedSeconds": 20,
    "misconceptionTags": [
      "adds_denominators_directly"
    ]
  },
  {
    "id": "q-unlike-2",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Calculate: 1/3 + 1/6 = ?",
    "options": [
      {
        "id": "a",
        "text": "1/2"
      },
      {
        "id": "b",
        "text": "2/9"
      },
      {
        "id": "c",
        "text": "3/6"
      },
      {
        "id": "d",
        "text": "2/6"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Convert 1/3 to 2/6. Then 2/6 + 1/6 = 3/6, which simplifies to 1/2.",
    "hint": "Convert 1/3 to sixths first before adding.",
    "estimatedSeconds": 22,
    "misconceptionTags": [
      "adds_denominators_directly"
    ],
    "reasoningPrompt": "How did you handle the denominators?",
    "reasoningOptions": [
      "Converted 1/3 into 2/6 and added numerators",
      "Added tops (1+1) and added bottoms (3+6)",
      "Estimated the visual portion"
    ]
  },
  {
    "id": "q-unlike-3",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Calculate: 2/5 + 1/2 = ?",
    "options": [
      {
        "id": "a",
        "text": "9/10"
      },
      {
        "id": "b",
        "text": "3/7"
      },
      {
        "id": "c",
        "text": "3/10"
      },
      {
        "id": "d",
        "text": "7/10"
      }
    ],
    "correctAnswer": "a",
    "explanation": "LCD is 10. 2/5 = 4/10 and 1/2 = 5/10. 4/10 + 5/10 = 9/10.",
    "hint": "The common denominator is 10. Convert both fractions first.",
    "estimatedSeconds": 25,
    "misconceptionTags": [
      "adds_denominators_directly"
    ]
  },
  {
    "id": "q-unlike-4",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "Maya baked a pie. She gave 3/8 to her neighbor and 1/4 to her friend. How much pie did she give away in total?",
    "options": [
      {
        "id": "a",
        "text": "5/8"
      },
      {
        "id": "b",
        "text": "4/12"
      },
      {
        "id": "c",
        "text": "1/2"
      },
      {
        "id": "d",
        "text": "4/8"
      }
    ],
    "correctAnswer": "a",
    "explanation": "1/4 = 2/8. 3/8 + 2/8 = 5/8 of the pie was given away.",
    "hint": "Convert 1/4 to eighths (2/8) and add to 3/8.",
    "estimatedSeconds": 28
  },
  {
    "id": "q-unlike-5",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "Evaluate: 5/6 - 2/9 = ?",
    "options": [
      {
        "id": "a",
        "text": "11/18"
      },
      {
        "id": "b",
        "text": "3/3"
      },
      {
        "id": "c",
        "text": "3/18"
      },
      {
        "id": "d",
        "text": "7/18"
      }
    ],
    "correctAnswer": "a",
    "explanation": "LCD of 6 and 9 is 18. 5/6 = 15/18, 2/9 = 4/18. 15/18 - 4/18 = 11/18.",
    "hint": "Find the lowest common denominator between 6 and 9 (which is 18).",
    "estimatedSeconds": 30
  },
  {
    "id": "q-unlike-6",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "What is 3/10 + 2/5?",
    "options": [
      {
        "id": "a",
        "text": "7/10"
      },
      {
        "id": "b",
        "text": "5/15"
      },
      {
        "id": "c",
        "text": "1/2"
      },
      {
        "id": "d",
        "text": "6/10"
      }
    ],
    "correctAnswer": "a",
    "explanation": "2/5 = 4/10. 3/10 + 4/10 = 7/10.",
    "hint": "Convert 2/5 into tenths (4/10) first.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-unlike-7",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Evaluate: 3/4 - 1/3 = ?",
    "options": [
      {
        "id": "a",
        "text": "5/12"
      },
      {
        "id": "b",
        "text": "2/1"
      },
      {
        "id": "c",
        "text": "2/12"
      },
      {
        "id": "d",
        "text": "1/6"
      }
    ],
    "correctAnswer": "a",
    "explanation": "LCD is 12. 3/4 = 9/12 and 1/3 = 4/12. 9/12 - 4/12 = 5/12.",
    "hint": "The common denominator is 12.",
    "estimatedSeconds": 22
  },
  {
    "id": "q-unlike-8",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "Calculate: 1/2 + 2/3 - 1/6 = ?",
    "options": [
      {
        "id": "a",
        "text": "1"
      },
      {
        "id": "b",
        "text": "5/6"
      },
      {
        "id": "c",
        "text": "7/6"
      },
      {
        "id": "d",
        "text": "2/3"
      }
    ],
    "correctAnswer": "a",
    "explanation": "In sixths: 3/6 + 4/6 - 1/6 = 6/6 = 1 whole.",
    "hint": "Convert all fractions to sixths first.",
    "estimatedSeconds": 26
  },
  {
    "id": "q-mult-1",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-fraction-multiplication",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Calculate: 1/2 × 3/4 = ?",
    "options": [
      {
        "id": "a",
        "text": "3/8"
      },
      {
        "id": "b",
        "text": "4/6"
      },
      {
        "id": "c",
        "text": "2/8"
      },
      {
        "id": "d",
        "text": "3/6"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Multiply numerators (1 × 3 = 3) and denominators (2 × 4 = 8). Result is 3/8.",
    "hint": "Multiply the top numbers together and bottom numbers together.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-mult-2",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-fraction-multiplication",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Calculate and simplify: 2/3 × 3/5 = ?",
    "options": [
      {
        "id": "a",
        "text": "2/5"
      },
      {
        "id": "b",
        "text": "6/15"
      },
      {
        "id": "c",
        "text": "5/8"
      },
      {
        "id": "d",
        "text": "1/5"
      }
    ],
    "correctAnswer": "a",
    "explanation": "(2 × 3) / (3 × 5) = 6/15 = 2/5 after simplifying.",
    "hint": "Cancel out the common factor 3 before multiplying.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-ops-1",
    "subjectId": "math",
    "topicId": "arithmetic",
    "skillId": "skill-order-ops",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "numeric",
    "prompt": "Evaluate: 6 + 4 × 3 = ?",
    "correctAnswer": "18",
    "explanation": "According to PEMDAS, multiplication comes before addition: 4 × 3 = 12, then 6 + 12 = 18.",
    "hint": "Perform the multiplication before adding.",
    "estimatedSeconds": 15,
    "misconceptionTags": [
      "left_to_right_disregard_precedence"
    ]
  },
  {
    "id": "q-ops-2",
    "subjectId": "math",
    "topicId": "arithmetic",
    "skillId": "skill-order-ops",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "numeric",
    "prompt": "Evaluate: (15 - 5) ÷ 2 + 3² = ?",
    "correctAnswer": "14",
    "explanation": "Parentheses first: (15 - 5) = 10. Exponent: 3² = 9. Division: 10 ÷ 2 = 5. Addition: 5 + 9 = 14.",
    "hint": "Follow PEMDAS: Parentheses, Exponents, Division, then Addition.",
    "estimatedSeconds": 22
  },
  {
    "id": "q-ops-3",
    "subjectId": "math",
    "topicId": "arithmetic",
    "skillId": "skill-order-ops",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "numeric",
    "prompt": "Evaluate: 20 - 2 × (3 + 1) = ?",
    "correctAnswer": "12",
    "explanation": "Parentheses: 3 + 1 = 4. Multiplication: 2 × 4 = 8. Subtraction: 20 - 8 = 12.",
    "hint": "Calculate the contents of parentheses first.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-mult-flu-1",
    "subjectId": "math",
    "topicId": "arithmetic",
    "skillId": "skill-rapid-mult",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "numeric",
    "prompt": "Evaluate: 14 × 5 = ?",
    "correctAnswer": "70",
    "explanation": "10 × 5 = 50, 4 × 5 = 20, 50 + 20 = 70.",
    "hint": "Break 14 into 10 and 4, then multiply both by 5.",
    "estimatedSeconds": 12
  },
  {
    "id": "q-mult-flu-2",
    "subjectId": "math",
    "topicId": "arithmetic",
    "skillId": "skill-rapid-mult",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "numeric",
    "prompt": "Evaluate: 18 × 4 = ?",
    "correctAnswer": "72",
    "explanation": "18 × 2 = 36, 36 × 2 = 72.",
    "hint": "Double 18 twice.",
    "estimatedSeconds": 14
  },
  {
    "id": "q-alg-1",
    "subjectId": "math",
    "topicId": "algebra",
    "skillId": "skill-linear-solve",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "numeric",
    "prompt": "Solve for x: x + 9 = 24. What is the value of x?",
    "correctAnswer": "15",
    "explanation": "Subtract 9 from both sides: x = 24 - 9 = 15.",
    "hint": "Use the inverse operation of addition (subtract 9 from 24).",
    "estimatedSeconds": 14
  },
  {
    "id": "q-alg-2",
    "subjectId": "math",
    "topicId": "algebra",
    "skillId": "skill-linear-solve",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "numeric",
    "prompt": "Solve for y: 4y = 36. What is the value of y?",
    "correctAnswer": "9",
    "explanation": "Divide both sides by 4: y = 36 / 4 = 9.",
    "hint": "Divide 36 by 4.",
    "estimatedSeconds": 14
  },
  {
    "id": "q-seq-1",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-number-sequences",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "numeric",
    "prompt": "Find the next number in the sequence: 4, 9, 14, 19, ?",
    "correctAnswer": "24",
    "explanation": "The common difference is +5. 19 + 5 = 24.",
    "hint": "Look at the difference between consecutive numbers.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-seq-2",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-number-sequences",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "numeric",
    "prompt": "What is the missing term: 2, 6, 18, 54, ?",
    "correctAnswer": "162",
    "explanation": "Each term is multiplied by 3 (geometric progression). 54 × 3 = 162.",
    "hint": "Notice each number is multiplied by a constant factor.",
    "estimatedSeconds": 20,
    "reasoningPrompt": "How did you determine the pattern rule?",
    "reasoningOptions": [
      "Identified multiplication by 3 each step",
      "Checked difference between terms first",
      "Looked at ratio of consecutive terms"
    ]
  },
  {
    "id": "q-seq-3",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-number-sequences",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "numeric",
    "prompt": "Find the next number in the sequence: 1, 4, 9, 16, 25, ?",
    "correctAnswer": "36",
    "explanation": "These are perfect squares: 1², 2², 3², 4², 5², 6² = 36.",
    "hint": "Think about square numbers (n × n).",
    "estimatedSeconds": 18
  },
  {
    "id": "q-ded-1",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-deduction",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "All squares are rectangles. Shape A is a square. What can we logically deduce?",
    "options": [
      {
        "id": "a",
        "text": "Shape A is a rectangle"
      },
      {
        "id": "b",
        "text": "Shape A is a circle"
      },
      {
        "id": "c",
        "text": "Shape A has 3 sides"
      },
      {
        "id": "d",
        "text": "Nothing can be deduced"
      }
    ],
    "correctAnswer": "a",
    "explanation": "By deductive syllogism: if all squares are rectangles and A is a square, then A must be a rectangle.",
    "hint": "Apply the rule for all squares to Shape A.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-ded-2",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-deduction",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "true_false",
    "prompt": "True or False: If it is raining, the grass is wet. The grass is wet, therefore it must be raining.",
    "options": [
      {
        "id": "true",
        "text": "True"
      },
      {
        "id": "false",
        "text": "False"
      }
    ],
    "correctAnswer": "false",
    "explanation": "This is the fallacy of affirming the consequent. The grass could be wet from sprinklers or dew.",
    "hint": "Are there other reasons the grass could be wet?",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-1",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "A box is pulled with 15 N to the right and 10 N to the left. What is the net force acting on the box?",
    "options": [
      {
        "id": "a",
        "text": "5 N to the right"
      },
      {
        "id": "b",
        "text": "25 N to the right"
      },
      {
        "id": "c",
        "text": "5 N to the left"
      },
      {
        "id": "d",
        "text": "0 N (Balanced)"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Opposing forces subtract: 15 N - 10 N = 5 N in the direction of the larger force (right).",
    "hint": "Subtract forces that act in opposite directions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-2",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "When the net force acting on an object is 0 N, what is the object doing?",
    "options": [
      {
        "id": "a",
        "text": "Moving at constant speed or remaining at rest"
      },
      {
        "id": "b",
        "text": "Accelerating rapidly"
      },
      {
        "id": "c",
        "text": "Changing its direction"
      },
      {
        "id": "d",
        "text": "Slowing down instantly"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Newton’s First Law: with zero net force, an object maintains its velocity (at rest or constant speed).",
    "hint": "Balanced forces produce no acceleration.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-eng-1",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Choose the correct verb: \"The flock of birds ______ flying south for the winter.\"",
    "options": [
      {
        "id": "a",
        "text": "is"
      },
      {
        "id": "b",
        "text": "are"
      },
      {
        "id": "c",
        "text": "were"
      },
      {
        "id": "d",
        "text": "have"
      }
    ],
    "correctAnswer": "a",
    "explanation": "\"The flock\" is a collective singular subject, so it takes the singular verb \"is\".",
    "hint": "The true subject is the collective noun \"flock\", not the prepositional phrase \"of birds\".",
    "estimatedSeconds": 15,
    "misconceptionTags": [
      "proximity_agreement_error"
    ]
  },
  {
    "id": "q-eng-2",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Choose the correct verb: \"Neither the teacher nor the students ______ in the auditorium.\"",
    "options": [
      {
        "id": "a",
        "text": "were"
      },
      {
        "id": "b",
        "text": "was"
      },
      {
        "id": "c",
        "text": "is"
      },
      {
        "id": "d",
        "text": "be"
      }
    ],
    "correctAnswer": "a",
    "explanation": "With \"neither... nor...\", the verb agrees with the subject closest to it (\"students\", which is plural).",
    "hint": "Look at the subject closest to the verb blank.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-cs-1",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Given: x = 12. If (x > 10 AND x < 20) output \"A\", else output \"B\". What is output?",
    "options": [
      {
        "id": "a",
        "text": "A"
      },
      {
        "id": "b",
        "text": "B"
      },
      {
        "id": "c",
        "text": "No output"
      },
      {
        "id": "d",
        "text": "Error"
      }
    ],
    "correctAnswer": "a",
    "explanation": "12 is greater than 10 (True) AND less than 20 (True). Both conditions hold, so \"A\" is printed.",
    "hint": "Both conditions connected by AND must be true.",
    "estimatedSeconds": 14
  },
  {
    "id": "q-cs-2",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Given: a = 5, b = 10. If (a > 6 OR b == 10) output \"PASS\", else output \"FAIL\". What is output?",
    "options": [
      {
        "id": "a",
        "text": "PASS"
      },
      {
        "id": "b",
        "text": "FAIL"
      },
      {
        "id": "c",
        "text": "Error"
      },
      {
        "id": "d",
        "text": "Undefined"
      }
    ],
    "correctAnswer": "a",
    "explanation": "In an OR expression, if at least one condition is True (b == 10 is True), the entire condition evaluates to True.",
    "hint": "Only one side of an OR needs to be true.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-1",
    "subjectId": "math",
    "topicId": "arithmetic",
    "skillId": "skill-order-ops",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 5 + 2 = ?",
    "options": [
      {
        "id": "a",
        "text": "7"
      },
      {
        "id": "b",
        "text": "6"
      },
      {
        "id": "c",
        "text": "9"
      },
      {
        "id": "d",
        "text": "11"
      }
    ],
    "correctAnswer": "a",
    "explanation": "5 plus 2 equals 7.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-2",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 8 + 4 = ?",
    "options": [
      {
        "id": "a",
        "text": "12"
      },
      {
        "id": "b",
        "text": "11"
      },
      {
        "id": "c",
        "text": "14"
      },
      {
        "id": "d",
        "text": "16"
      }
    ],
    "correctAnswer": "a",
    "explanation": "8 plus 4 equals 12.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-3",
    "subjectId": "math",
    "topicId": "arithmetic",
    "skillId": "skill-order-ops",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 11 + 6 = ?",
    "options": [
      {
        "id": "a",
        "text": "17"
      },
      {
        "id": "b",
        "text": "16"
      },
      {
        "id": "c",
        "text": "19"
      },
      {
        "id": "d",
        "text": "21"
      }
    ],
    "correctAnswer": "a",
    "explanation": "11 plus 6 equals 17.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-4",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 14 + 8 = ?",
    "options": [
      {
        "id": "a",
        "text": "22"
      },
      {
        "id": "b",
        "text": "21"
      },
      {
        "id": "c",
        "text": "24"
      },
      {
        "id": "d",
        "text": "26"
      }
    ],
    "correctAnswer": "a",
    "explanation": "14 plus 8 equals 22.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-5",
    "subjectId": "math",
    "topicId": "arithmetic",
    "skillId": "skill-order-ops",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 17 + 10 = ?",
    "options": [
      {
        "id": "a",
        "text": "27"
      },
      {
        "id": "b",
        "text": "26"
      },
      {
        "id": "c",
        "text": "29"
      },
      {
        "id": "d",
        "text": "31"
      }
    ],
    "correctAnswer": "a",
    "explanation": "17 plus 10 equals 27.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-6",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 20 + 12 = ?",
    "options": [
      {
        "id": "a",
        "text": "32"
      },
      {
        "id": "b",
        "text": "31"
      },
      {
        "id": "c",
        "text": "34"
      },
      {
        "id": "d",
        "text": "36"
      }
    ],
    "correctAnswer": "a",
    "explanation": "20 plus 12 equals 32.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-7",
    "subjectId": "math",
    "topicId": "arithmetic",
    "skillId": "skill-order-ops",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 23 + 14 = ?",
    "options": [
      {
        "id": "a",
        "text": "37"
      },
      {
        "id": "b",
        "text": "36"
      },
      {
        "id": "c",
        "text": "39"
      },
      {
        "id": "d",
        "text": "41"
      }
    ],
    "correctAnswer": "a",
    "explanation": "23 plus 14 equals 37.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-8",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 26 + 16 = ?",
    "options": [
      {
        "id": "a",
        "text": "42"
      },
      {
        "id": "b",
        "text": "41"
      },
      {
        "id": "c",
        "text": "44"
      },
      {
        "id": "d",
        "text": "46"
      }
    ],
    "correctAnswer": "a",
    "explanation": "26 plus 16 equals 42.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-9",
    "subjectId": "math",
    "topicId": "arithmetic",
    "skillId": "skill-order-ops",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 29 + 18 = ?",
    "options": [
      {
        "id": "a",
        "text": "47"
      },
      {
        "id": "b",
        "text": "46"
      },
      {
        "id": "c",
        "text": "49"
      },
      {
        "id": "d",
        "text": "51"
      }
    ],
    "correctAnswer": "a",
    "explanation": "29 plus 18 equals 47.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-10",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 32 + 20 = ?",
    "options": [
      {
        "id": "a",
        "text": "52"
      },
      {
        "id": "b",
        "text": "51"
      },
      {
        "id": "c",
        "text": "54"
      },
      {
        "id": "d",
        "text": "56"
      }
    ],
    "correctAnswer": "a",
    "explanation": "32 plus 20 equals 52.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-11",
    "subjectId": "math",
    "topicId": "arithmetic",
    "skillId": "skill-order-ops",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 35 + 22 = ?",
    "options": [
      {
        "id": "a",
        "text": "57"
      },
      {
        "id": "b",
        "text": "56"
      },
      {
        "id": "c",
        "text": "59"
      },
      {
        "id": "d",
        "text": "61"
      }
    ],
    "correctAnswer": "a",
    "explanation": "35 plus 22 equals 57.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-12",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 38 + 24 = ?",
    "options": [
      {
        "id": "a",
        "text": "62"
      },
      {
        "id": "b",
        "text": "61"
      },
      {
        "id": "c",
        "text": "64"
      },
      {
        "id": "d",
        "text": "66"
      }
    ],
    "correctAnswer": "a",
    "explanation": "38 plus 24 equals 62.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-13",
    "subjectId": "math",
    "topicId": "arithmetic",
    "skillId": "skill-order-ops",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 41 + 26 = ?",
    "options": [
      {
        "id": "a",
        "text": "67"
      },
      {
        "id": "b",
        "text": "66"
      },
      {
        "id": "c",
        "text": "69"
      },
      {
        "id": "d",
        "text": "71"
      }
    ],
    "correctAnswer": "a",
    "explanation": "41 plus 26 equals 67.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-14",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 44 + 28 = ?",
    "options": [
      {
        "id": "a",
        "text": "72"
      },
      {
        "id": "b",
        "text": "71"
      },
      {
        "id": "c",
        "text": "74"
      },
      {
        "id": "d",
        "text": "76"
      }
    ],
    "correctAnswer": "a",
    "explanation": "44 plus 28 equals 72.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-15",
    "subjectId": "math",
    "topicId": "arithmetic",
    "skillId": "skill-order-ops",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 47 + 30 = ?",
    "options": [
      {
        "id": "a",
        "text": "77"
      },
      {
        "id": "b",
        "text": "76"
      },
      {
        "id": "c",
        "text": "79"
      },
      {
        "id": "d",
        "text": "81"
      }
    ],
    "correctAnswer": "a",
    "explanation": "47 plus 30 equals 77.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-16",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 50 + 32 = ?",
    "options": [
      {
        "id": "a",
        "text": "82"
      },
      {
        "id": "b",
        "text": "81"
      },
      {
        "id": "c",
        "text": "84"
      },
      {
        "id": "d",
        "text": "86"
      }
    ],
    "correctAnswer": "a",
    "explanation": "50 plus 32 equals 82.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-17",
    "subjectId": "math",
    "topicId": "arithmetic",
    "skillId": "skill-order-ops",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 53 + 34 = ?",
    "options": [
      {
        "id": "a",
        "text": "87"
      },
      {
        "id": "b",
        "text": "86"
      },
      {
        "id": "c",
        "text": "89"
      },
      {
        "id": "d",
        "text": "91"
      }
    ],
    "correctAnswer": "a",
    "explanation": "53 plus 34 equals 87.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-18",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 56 + 36 = ?",
    "options": [
      {
        "id": "a",
        "text": "92"
      },
      {
        "id": "b",
        "text": "91"
      },
      {
        "id": "c",
        "text": "94"
      },
      {
        "id": "d",
        "text": "96"
      }
    ],
    "correctAnswer": "a",
    "explanation": "56 plus 36 equals 92.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-19",
    "subjectId": "math",
    "topicId": "arithmetic",
    "skillId": "skill-order-ops",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 59 + 38 = ?",
    "options": [
      {
        "id": "a",
        "text": "97"
      },
      {
        "id": "b",
        "text": "96"
      },
      {
        "id": "c",
        "text": "99"
      },
      {
        "id": "d",
        "text": "101"
      }
    ],
    "correctAnswer": "a",
    "explanation": "59 plus 38 equals 97.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-20",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 62 + 40 = ?",
    "options": [
      {
        "id": "a",
        "text": "102"
      },
      {
        "id": "b",
        "text": "101"
      },
      {
        "id": "c",
        "text": "104"
      },
      {
        "id": "d",
        "text": "106"
      }
    ],
    "correctAnswer": "a",
    "explanation": "62 plus 40 equals 102.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-21",
    "subjectId": "math",
    "topicId": "arithmetic",
    "skillId": "skill-order-ops",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 65 + 42 = ?",
    "options": [
      {
        "id": "a",
        "text": "107"
      },
      {
        "id": "b",
        "text": "106"
      },
      {
        "id": "c",
        "text": "109"
      },
      {
        "id": "d",
        "text": "111"
      }
    ],
    "correctAnswer": "a",
    "explanation": "65 plus 42 equals 107.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-22",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 68 + 44 = ?",
    "options": [
      {
        "id": "a",
        "text": "112"
      },
      {
        "id": "b",
        "text": "111"
      },
      {
        "id": "c",
        "text": "114"
      },
      {
        "id": "d",
        "text": "116"
      }
    ],
    "correctAnswer": "a",
    "explanation": "68 plus 44 equals 112.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-23",
    "subjectId": "math",
    "topicId": "arithmetic",
    "skillId": "skill-order-ops",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 71 + 46 = ?",
    "options": [
      {
        "id": "a",
        "text": "117"
      },
      {
        "id": "b",
        "text": "116"
      },
      {
        "id": "c",
        "text": "119"
      },
      {
        "id": "d",
        "text": "121"
      }
    ],
    "correctAnswer": "a",
    "explanation": "71 plus 46 equals 117.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-24",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 74 + 48 = ?",
    "options": [
      {
        "id": "a",
        "text": "122"
      },
      {
        "id": "b",
        "text": "121"
      },
      {
        "id": "c",
        "text": "124"
      },
      {
        "id": "d",
        "text": "126"
      }
    ],
    "correctAnswer": "a",
    "explanation": "74 plus 48 equals 122.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-25",
    "subjectId": "math",
    "topicId": "arithmetic",
    "skillId": "skill-order-ops",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 77 + 50 = ?",
    "options": [
      {
        "id": "a",
        "text": "127"
      },
      {
        "id": "b",
        "text": "126"
      },
      {
        "id": "c",
        "text": "129"
      },
      {
        "id": "d",
        "text": "131"
      }
    ],
    "correctAnswer": "a",
    "explanation": "77 plus 50 equals 127.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-26",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 80 + 52 = ?",
    "options": [
      {
        "id": "a",
        "text": "132"
      },
      {
        "id": "b",
        "text": "131"
      },
      {
        "id": "c",
        "text": "134"
      },
      {
        "id": "d",
        "text": "136"
      }
    ],
    "correctAnswer": "a",
    "explanation": "80 plus 52 equals 132.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-27",
    "subjectId": "math",
    "topicId": "arithmetic",
    "skillId": "skill-order-ops",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 83 + 54 = ?",
    "options": [
      {
        "id": "a",
        "text": "137"
      },
      {
        "id": "b",
        "text": "136"
      },
      {
        "id": "c",
        "text": "139"
      },
      {
        "id": "d",
        "text": "141"
      }
    ],
    "correctAnswer": "a",
    "explanation": "83 plus 54 equals 137.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-28",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 86 + 56 = ?",
    "options": [
      {
        "id": "a",
        "text": "142"
      },
      {
        "id": "b",
        "text": "141"
      },
      {
        "id": "c",
        "text": "144"
      },
      {
        "id": "d",
        "text": "146"
      }
    ],
    "correctAnswer": "a",
    "explanation": "86 plus 56 equals 142.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-29",
    "subjectId": "math",
    "topicId": "arithmetic",
    "skillId": "skill-order-ops",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 89 + 58 = ?",
    "options": [
      {
        "id": "a",
        "text": "147"
      },
      {
        "id": "b",
        "text": "146"
      },
      {
        "id": "c",
        "text": "149"
      },
      {
        "id": "d",
        "text": "151"
      }
    ],
    "correctAnswer": "a",
    "explanation": "89 plus 58 equals 147.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-30",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 92 + 60 = ?",
    "options": [
      {
        "id": "a",
        "text": "152"
      },
      {
        "id": "b",
        "text": "151"
      },
      {
        "id": "c",
        "text": "154"
      },
      {
        "id": "d",
        "text": "156"
      }
    ],
    "correctAnswer": "a",
    "explanation": "92 plus 60 equals 152.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-31",
    "subjectId": "math",
    "topicId": "arithmetic",
    "skillId": "skill-order-ops",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 95 + 62 = ?",
    "options": [
      {
        "id": "a",
        "text": "157"
      },
      {
        "id": "b",
        "text": "156"
      },
      {
        "id": "c",
        "text": "159"
      },
      {
        "id": "d",
        "text": "161"
      }
    ],
    "correctAnswer": "a",
    "explanation": "95 plus 62 equals 157.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-m-exp-32",
    "subjectId": "math",
    "topicId": "fractions",
    "skillId": "skill-unlike-denominators",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Evaluate the expression: 98 + 64 = ?",
    "options": [
      {
        "id": "a",
        "text": "162"
      },
      {
        "id": "b",
        "text": "161"
      },
      {
        "id": "c",
        "text": "164"
      },
      {
        "id": "d",
        "text": "166"
      }
    ],
    "correctAnswer": "a",
    "explanation": "98 plus 64 equals 162.",
    "hint": "Add the two terms systematically.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-log-exp-1",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-deduction",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 4, 7, 10, 13, ?",
    "options": [
      {
        "id": "a",
        "text": "16"
      },
      {
        "id": "b",
        "text": "17"
      },
      {
        "id": "c",
        "text": "14"
      },
      {
        "id": "d",
        "text": "19"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +3. Adding to 13 gives 16.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-2",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-number-sequences",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 8, 12, 16, 20, ?",
    "options": [
      {
        "id": "a",
        "text": "24"
      },
      {
        "id": "b",
        "text": "25"
      },
      {
        "id": "c",
        "text": "22"
      },
      {
        "id": "d",
        "text": "28"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +4. Adding to 20 gives 24.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-3",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-deduction",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 12, 14, 16, 18, ?",
    "options": [
      {
        "id": "a",
        "text": "20"
      },
      {
        "id": "b",
        "text": "21"
      },
      {
        "id": "c",
        "text": "18"
      },
      {
        "id": "d",
        "text": "22"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +2. Adding to 18 gives 20.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-4",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-number-sequences",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 16, 19, 22, 25, ?",
    "options": [
      {
        "id": "a",
        "text": "28"
      },
      {
        "id": "b",
        "text": "29"
      },
      {
        "id": "c",
        "text": "26"
      },
      {
        "id": "d",
        "text": "31"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +3. Adding to 25 gives 28.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-5",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-deduction",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 20, 24, 28, 32, ?",
    "options": [
      {
        "id": "a",
        "text": "36"
      },
      {
        "id": "b",
        "text": "37"
      },
      {
        "id": "c",
        "text": "34"
      },
      {
        "id": "d",
        "text": "40"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +4. Adding to 32 gives 36.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-6",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-number-sequences",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 24, 26, 28, 30, ?",
    "options": [
      {
        "id": "a",
        "text": "32"
      },
      {
        "id": "b",
        "text": "33"
      },
      {
        "id": "c",
        "text": "30"
      },
      {
        "id": "d",
        "text": "34"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +2. Adding to 30 gives 32.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-7",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-deduction",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 28, 31, 34, 37, ?",
    "options": [
      {
        "id": "a",
        "text": "40"
      },
      {
        "id": "b",
        "text": "41"
      },
      {
        "id": "c",
        "text": "38"
      },
      {
        "id": "d",
        "text": "43"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +3. Adding to 37 gives 40.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-8",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-number-sequences",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 32, 36, 40, 44, ?",
    "options": [
      {
        "id": "a",
        "text": "48"
      },
      {
        "id": "b",
        "text": "49"
      },
      {
        "id": "c",
        "text": "46"
      },
      {
        "id": "d",
        "text": "52"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +4. Adding to 44 gives 48.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-9",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-deduction",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 36, 38, 40, 42, ?",
    "options": [
      {
        "id": "a",
        "text": "44"
      },
      {
        "id": "b",
        "text": "45"
      },
      {
        "id": "c",
        "text": "42"
      },
      {
        "id": "d",
        "text": "46"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +2. Adding to 42 gives 44.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-10",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-number-sequences",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 40, 43, 46, 49, ?",
    "options": [
      {
        "id": "a",
        "text": "52"
      },
      {
        "id": "b",
        "text": "53"
      },
      {
        "id": "c",
        "text": "50"
      },
      {
        "id": "d",
        "text": "55"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +3. Adding to 49 gives 52.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-11",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-deduction",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 44, 48, 52, 56, ?",
    "options": [
      {
        "id": "a",
        "text": "60"
      },
      {
        "id": "b",
        "text": "61"
      },
      {
        "id": "c",
        "text": "58"
      },
      {
        "id": "d",
        "text": "64"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +4. Adding to 56 gives 60.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-12",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-number-sequences",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 48, 50, 52, 54, ?",
    "options": [
      {
        "id": "a",
        "text": "56"
      },
      {
        "id": "b",
        "text": "57"
      },
      {
        "id": "c",
        "text": "54"
      },
      {
        "id": "d",
        "text": "58"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +2. Adding to 54 gives 56.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-13",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-deduction",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 52, 55, 58, 61, ?",
    "options": [
      {
        "id": "a",
        "text": "64"
      },
      {
        "id": "b",
        "text": "65"
      },
      {
        "id": "c",
        "text": "62"
      },
      {
        "id": "d",
        "text": "67"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +3. Adding to 61 gives 64.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-14",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-number-sequences",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 56, 60, 64, 68, ?",
    "options": [
      {
        "id": "a",
        "text": "72"
      },
      {
        "id": "b",
        "text": "73"
      },
      {
        "id": "c",
        "text": "70"
      },
      {
        "id": "d",
        "text": "76"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +4. Adding to 68 gives 72.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-15",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-deduction",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 60, 62, 64, 66, ?",
    "options": [
      {
        "id": "a",
        "text": "68"
      },
      {
        "id": "b",
        "text": "69"
      },
      {
        "id": "c",
        "text": "66"
      },
      {
        "id": "d",
        "text": "70"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +2. Adding to 66 gives 68.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-16",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-number-sequences",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 64, 67, 70, 73, ?",
    "options": [
      {
        "id": "a",
        "text": "76"
      },
      {
        "id": "b",
        "text": "77"
      },
      {
        "id": "c",
        "text": "74"
      },
      {
        "id": "d",
        "text": "79"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +3. Adding to 73 gives 76.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-17",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-deduction",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 68, 72, 76, 80, ?",
    "options": [
      {
        "id": "a",
        "text": "84"
      },
      {
        "id": "b",
        "text": "85"
      },
      {
        "id": "c",
        "text": "82"
      },
      {
        "id": "d",
        "text": "88"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +4. Adding to 80 gives 84.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-18",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-number-sequences",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 72, 74, 76, 78, ?",
    "options": [
      {
        "id": "a",
        "text": "80"
      },
      {
        "id": "b",
        "text": "81"
      },
      {
        "id": "c",
        "text": "78"
      },
      {
        "id": "d",
        "text": "82"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +2. Adding to 78 gives 80.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-19",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-deduction",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 76, 79, 82, 85, ?",
    "options": [
      {
        "id": "a",
        "text": "88"
      },
      {
        "id": "b",
        "text": "89"
      },
      {
        "id": "c",
        "text": "86"
      },
      {
        "id": "d",
        "text": "91"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +3. Adding to 85 gives 88.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-20",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-number-sequences",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 80, 84, 88, 92, ?",
    "options": [
      {
        "id": "a",
        "text": "96"
      },
      {
        "id": "b",
        "text": "97"
      },
      {
        "id": "c",
        "text": "94"
      },
      {
        "id": "d",
        "text": "100"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +4. Adding to 92 gives 96.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-21",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-deduction",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 84, 86, 88, 90, ?",
    "options": [
      {
        "id": "a",
        "text": "92"
      },
      {
        "id": "b",
        "text": "93"
      },
      {
        "id": "c",
        "text": "90"
      },
      {
        "id": "d",
        "text": "94"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +2. Adding to 90 gives 92.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-22",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-number-sequences",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 88, 91, 94, 97, ?",
    "options": [
      {
        "id": "a",
        "text": "100"
      },
      {
        "id": "b",
        "text": "101"
      },
      {
        "id": "c",
        "text": "98"
      },
      {
        "id": "d",
        "text": "103"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +3. Adding to 97 gives 100.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-23",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-deduction",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 92, 96, 100, 104, ?",
    "options": [
      {
        "id": "a",
        "text": "108"
      },
      {
        "id": "b",
        "text": "109"
      },
      {
        "id": "c",
        "text": "106"
      },
      {
        "id": "d",
        "text": "112"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +4. Adding to 104 gives 108.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-24",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-number-sequences",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 96, 98, 100, 102, ?",
    "options": [
      {
        "id": "a",
        "text": "104"
      },
      {
        "id": "b",
        "text": "105"
      },
      {
        "id": "c",
        "text": "102"
      },
      {
        "id": "d",
        "text": "106"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +2. Adding to 102 gives 104.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-25",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-deduction",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 100, 103, 106, 109, ?",
    "options": [
      {
        "id": "a",
        "text": "112"
      },
      {
        "id": "b",
        "text": "113"
      },
      {
        "id": "c",
        "text": "110"
      },
      {
        "id": "d",
        "text": "115"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +3. Adding to 109 gives 112.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-26",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-number-sequences",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 104, 108, 112, 116, ?",
    "options": [
      {
        "id": "a",
        "text": "120"
      },
      {
        "id": "b",
        "text": "121"
      },
      {
        "id": "c",
        "text": "118"
      },
      {
        "id": "d",
        "text": "124"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +4. Adding to 116 gives 120.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-27",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-deduction",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 108, 110, 112, 114, ?",
    "options": [
      {
        "id": "a",
        "text": "116"
      },
      {
        "id": "b",
        "text": "117"
      },
      {
        "id": "c",
        "text": "114"
      },
      {
        "id": "d",
        "text": "118"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +2. Adding to 114 gives 116.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-log-exp-28",
    "subjectId": "logic",
    "topicId": "patterns",
    "skillId": "skill-number-sequences",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "What comes next in the progression: 112, 115, 118, 121, ?",
    "options": [
      {
        "id": "a",
        "text": "124"
      },
      {
        "id": "b",
        "text": "125"
      },
      {
        "id": "c",
        "text": "122"
      },
      {
        "id": "d",
        "text": "127"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The common step is +3. Adding to 121 gives 124.",
    "hint": "Calculate the difference between adjacent terms.",
    "estimatedSeconds": 18
  },
  {
    "id": "q-sci-exp-1",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Which organelle is considered the powerhouse of the cell?",
    "options": [
      {
        "id": "a",
        "text": "Mitochondria"
      },
      {
        "id": "b",
        "text": "Nucleus"
      },
      {
        "id": "c",
        "text": "Ribosome"
      },
      {
        "id": "d",
        "text": "Vacuole"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Mitochondria generate most of the chemical energy needed to power the cell (ATP).",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-2",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "What force opposes motion between two surfaces in contact?",
    "options": [
      {
        "id": "a",
        "text": "Friction"
      },
      {
        "id": "b",
        "text": "Gravity"
      },
      {
        "id": "c",
        "text": "Magnetism"
      },
      {
        "id": "d",
        "text": "Inertia"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Friction is the contact force resisting relative motion between surfaces.",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-3",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "In photosynthesis, plants absorb carbon dioxide and release which gas?",
    "options": [
      {
        "id": "a",
        "text": "Oxygen"
      },
      {
        "id": "b",
        "text": "Nitrogen"
      },
      {
        "id": "c",
        "text": "Helium"
      },
      {
        "id": "d",
        "text": "Hydrogen"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Plants convert CO2 and water into glucose and release O2 as a byproduct.",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-4",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "What is the state of matter characterized by definite volume but indefinite shape?",
    "options": [
      {
        "id": "a",
        "text": "Liquid"
      },
      {
        "id": "b",
        "text": "Solid"
      },
      {
        "id": "c",
        "text": "Gas"
      },
      {
        "id": "d",
        "text": "Plasma"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Liquids flow and take the shape of their container while retaining fixed volume.",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-5",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "What is the acceleration due to gravity near Earth surface approximately?",
    "options": [
      {
        "id": "a",
        "text": "9.8 m/s²"
      },
      {
        "id": "b",
        "text": "3.0 m/s²"
      },
      {
        "id": "c",
        "text": "15.2 m/s²"
      },
      {
        "id": "d",
        "text": "1.6 m/s²"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Standard gravitational acceleration near Earth sea level is approximately 9.8 m/s².",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-6",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Which organelle is considered the powerhouse of the cell? (Item 6)",
    "options": [
      {
        "id": "a",
        "text": "Mitochondria"
      },
      {
        "id": "b",
        "text": "Nucleus"
      },
      {
        "id": "c",
        "text": "Ribosome"
      },
      {
        "id": "d",
        "text": "Vacuole"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Mitochondria generate most of the chemical energy needed to power the cell (ATP).",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-7",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "What force opposes motion between two surfaces in contact? (Item 7)",
    "options": [
      {
        "id": "a",
        "text": "Friction"
      },
      {
        "id": "b",
        "text": "Gravity"
      },
      {
        "id": "c",
        "text": "Magnetism"
      },
      {
        "id": "d",
        "text": "Inertia"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Friction is the contact force resisting relative motion between surfaces.",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-8",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "In photosynthesis, plants absorb carbon dioxide and release which gas? (Item 8)",
    "options": [
      {
        "id": "a",
        "text": "Oxygen"
      },
      {
        "id": "b",
        "text": "Nitrogen"
      },
      {
        "id": "c",
        "text": "Helium"
      },
      {
        "id": "d",
        "text": "Hydrogen"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Plants convert CO2 and water into glucose and release O2 as a byproduct.",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-9",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "What is the state of matter characterized by definite volume but indefinite shape? (Item 9)",
    "options": [
      {
        "id": "a",
        "text": "Liquid"
      },
      {
        "id": "b",
        "text": "Solid"
      },
      {
        "id": "c",
        "text": "Gas"
      },
      {
        "id": "d",
        "text": "Plasma"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Liquids flow and take the shape of their container while retaining fixed volume.",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-10",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "What is the acceleration due to gravity near Earth surface approximately? (Item 10)",
    "options": [
      {
        "id": "a",
        "text": "9.8 m/s²"
      },
      {
        "id": "b",
        "text": "3.0 m/s²"
      },
      {
        "id": "c",
        "text": "15.2 m/s²"
      },
      {
        "id": "d",
        "text": "1.6 m/s²"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Standard gravitational acceleration near Earth sea level is approximately 9.8 m/s².",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-11",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Which organelle is considered the powerhouse of the cell? (Item 11)",
    "options": [
      {
        "id": "a",
        "text": "Mitochondria"
      },
      {
        "id": "b",
        "text": "Nucleus"
      },
      {
        "id": "c",
        "text": "Ribosome"
      },
      {
        "id": "d",
        "text": "Vacuole"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Mitochondria generate most of the chemical energy needed to power the cell (ATP).",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-12",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "What force opposes motion between two surfaces in contact? (Item 12)",
    "options": [
      {
        "id": "a",
        "text": "Friction"
      },
      {
        "id": "b",
        "text": "Gravity"
      },
      {
        "id": "c",
        "text": "Magnetism"
      },
      {
        "id": "d",
        "text": "Inertia"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Friction is the contact force resisting relative motion between surfaces.",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-13",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "In photosynthesis, plants absorb carbon dioxide and release which gas? (Item 13)",
    "options": [
      {
        "id": "a",
        "text": "Oxygen"
      },
      {
        "id": "b",
        "text": "Nitrogen"
      },
      {
        "id": "c",
        "text": "Helium"
      },
      {
        "id": "d",
        "text": "Hydrogen"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Plants convert CO2 and water into glucose and release O2 as a byproduct.",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-14",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "What is the state of matter characterized by definite volume but indefinite shape? (Item 14)",
    "options": [
      {
        "id": "a",
        "text": "Liquid"
      },
      {
        "id": "b",
        "text": "Solid"
      },
      {
        "id": "c",
        "text": "Gas"
      },
      {
        "id": "d",
        "text": "Plasma"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Liquids flow and take the shape of their container while retaining fixed volume.",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-15",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "What is the acceleration due to gravity near Earth surface approximately? (Item 15)",
    "options": [
      {
        "id": "a",
        "text": "9.8 m/s²"
      },
      {
        "id": "b",
        "text": "3.0 m/s²"
      },
      {
        "id": "c",
        "text": "15.2 m/s²"
      },
      {
        "id": "d",
        "text": "1.6 m/s²"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Standard gravitational acceleration near Earth sea level is approximately 9.8 m/s².",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-16",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Which organelle is considered the powerhouse of the cell? (Item 16)",
    "options": [
      {
        "id": "a",
        "text": "Mitochondria"
      },
      {
        "id": "b",
        "text": "Nucleus"
      },
      {
        "id": "c",
        "text": "Ribosome"
      },
      {
        "id": "d",
        "text": "Vacuole"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Mitochondria generate most of the chemical energy needed to power the cell (ATP).",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-17",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "What force opposes motion between two surfaces in contact? (Item 17)",
    "options": [
      {
        "id": "a",
        "text": "Friction"
      },
      {
        "id": "b",
        "text": "Gravity"
      },
      {
        "id": "c",
        "text": "Magnetism"
      },
      {
        "id": "d",
        "text": "Inertia"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Friction is the contact force resisting relative motion between surfaces.",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-18",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "In photosynthesis, plants absorb carbon dioxide and release which gas? (Item 18)",
    "options": [
      {
        "id": "a",
        "text": "Oxygen"
      },
      {
        "id": "b",
        "text": "Nitrogen"
      },
      {
        "id": "c",
        "text": "Helium"
      },
      {
        "id": "d",
        "text": "Hydrogen"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Plants convert CO2 and water into glucose and release O2 as a byproduct.",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-19",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "What is the state of matter characterized by definite volume but indefinite shape? (Item 19)",
    "options": [
      {
        "id": "a",
        "text": "Liquid"
      },
      {
        "id": "b",
        "text": "Solid"
      },
      {
        "id": "c",
        "text": "Gas"
      },
      {
        "id": "d",
        "text": "Plasma"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Liquids flow and take the shape of their container while retaining fixed volume.",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-20",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "What is the acceleration due to gravity near Earth surface approximately? (Item 20)",
    "options": [
      {
        "id": "a",
        "text": "9.8 m/s²"
      },
      {
        "id": "b",
        "text": "3.0 m/s²"
      },
      {
        "id": "c",
        "text": "15.2 m/s²"
      },
      {
        "id": "d",
        "text": "1.6 m/s²"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Standard gravitational acceleration near Earth sea level is approximately 9.8 m/s².",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-21",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Which organelle is considered the powerhouse of the cell? (Item 21)",
    "options": [
      {
        "id": "a",
        "text": "Mitochondria"
      },
      {
        "id": "b",
        "text": "Nucleus"
      },
      {
        "id": "c",
        "text": "Ribosome"
      },
      {
        "id": "d",
        "text": "Vacuole"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Mitochondria generate most of the chemical energy needed to power the cell (ATP).",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-22",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "What force opposes motion between two surfaces in contact? (Item 22)",
    "options": [
      {
        "id": "a",
        "text": "Friction"
      },
      {
        "id": "b",
        "text": "Gravity"
      },
      {
        "id": "c",
        "text": "Magnetism"
      },
      {
        "id": "d",
        "text": "Inertia"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Friction is the contact force resisting relative motion between surfaces.",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-23",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "In photosynthesis, plants absorb carbon dioxide and release which gas? (Item 23)",
    "options": [
      {
        "id": "a",
        "text": "Oxygen"
      },
      {
        "id": "b",
        "text": "Nitrogen"
      },
      {
        "id": "c",
        "text": "Helium"
      },
      {
        "id": "d",
        "text": "Hydrogen"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Plants convert CO2 and water into glucose and release O2 as a byproduct.",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-24",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "What is the state of matter characterized by definite volume but indefinite shape? (Item 24)",
    "options": [
      {
        "id": "a",
        "text": "Liquid"
      },
      {
        "id": "b",
        "text": "Solid"
      },
      {
        "id": "c",
        "text": "Gas"
      },
      {
        "id": "d",
        "text": "Plasma"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Liquids flow and take the shape of their container while retaining fixed volume.",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-25",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "What is the acceleration due to gravity near Earth surface approximately? (Item 25)",
    "options": [
      {
        "id": "a",
        "text": "9.8 m/s²"
      },
      {
        "id": "b",
        "text": "3.0 m/s²"
      },
      {
        "id": "c",
        "text": "15.2 m/s²"
      },
      {
        "id": "d",
        "text": "1.6 m/s²"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Standard gravitational acceleration near Earth sea level is approximately 9.8 m/s².",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-26",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Which organelle is considered the powerhouse of the cell? (Item 26)",
    "options": [
      {
        "id": "a",
        "text": "Mitochondria"
      },
      {
        "id": "b",
        "text": "Nucleus"
      },
      {
        "id": "c",
        "text": "Ribosome"
      },
      {
        "id": "d",
        "text": "Vacuole"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Mitochondria generate most of the chemical energy needed to power the cell (ATP).",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-27",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "What force opposes motion between two surfaces in contact? (Item 27)",
    "options": [
      {
        "id": "a",
        "text": "Friction"
      },
      {
        "id": "b",
        "text": "Gravity"
      },
      {
        "id": "c",
        "text": "Magnetism"
      },
      {
        "id": "d",
        "text": "Inertia"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Friction is the contact force resisting relative motion between surfaces.",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-28",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "In photosynthesis, plants absorb carbon dioxide and release which gas? (Item 28)",
    "options": [
      {
        "id": "a",
        "text": "Oxygen"
      },
      {
        "id": "b",
        "text": "Nitrogen"
      },
      {
        "id": "c",
        "text": "Helium"
      },
      {
        "id": "d",
        "text": "Hydrogen"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Plants convert CO2 and water into glucose and release O2 as a byproduct.",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-sci-exp-29",
    "subjectId": "science",
    "topicId": "physics",
    "skillId": "skill-forces",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "What is the state of matter characterized by definite volume but indefinite shape? (Item 29)",
    "options": [
      {
        "id": "a",
        "text": "Liquid"
      },
      {
        "id": "b",
        "text": "Solid"
      },
      {
        "id": "c",
        "text": "Gas"
      },
      {
        "id": "d",
        "text": "Plasma"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Liquids flow and take the shape of their container while retaining fixed volume.",
    "hint": "Recall core foundational scientific definitions.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-eng-exp-1",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Choose the correct verb: Every one of the students ______ present today.",
    "options": [
      {
        "id": "a",
        "text": "is"
      },
      {
        "id": "b",
        "text": "are"
      },
      {
        "id": "c",
        "text": "were"
      },
      {
        "id": "d",
        "text": "have been"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Every one is an indefinite singular pronoun requiring singular verb is.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-2",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Identify the adverb in the sentence: The cheetah ran swiftly across the savannah.",
    "options": [
      {
        "id": "a",
        "text": "swiftly"
      },
      {
        "id": "b",
        "text": "cheetah"
      },
      {
        "id": "c",
        "text": "ran"
      },
      {
        "id": "d",
        "text": "across"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Swiftly modifies the verb ran, indicating manner.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-3",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "Which word is an antonym for abundant?",
    "options": [
      {
        "id": "a",
        "text": "Scarce"
      },
      {
        "id": "b",
        "text": "Plentiful"
      },
      {
        "id": "c",
        "text": "Lavish"
      },
      {
        "id": "d",
        "text": "Bountiful"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Scarce denotes insufficient quantity, opposing abundant.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-4",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "Select the correctly punctuated sentence:",
    "options": [
      {
        "id": "a",
        "text": "Although it rained, we finished the game."
      },
      {
        "id": "b",
        "text": "Although it rained we finished, the game."
      },
      {
        "id": "c",
        "text": "Although, it rained we finished the game."
      },
      {
        "id": "d",
        "text": "Although it rained; we finished the game."
      }
    ],
    "correctAnswer": "a",
    "explanation": "A dependent introductory clause requires a trailing comma.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-5",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "What is the active voice equivalent of: The anthem was sung by the choir?",
    "options": [
      {
        "id": "a",
        "text": "The choir sang the anthem."
      },
      {
        "id": "b",
        "text": "The anthem sang the choir."
      },
      {
        "id": "c",
        "text": "By the choir was sung the anthem."
      },
      {
        "id": "d",
        "text": "The choir has sung the anthem."
      }
    ],
    "correctAnswer": "a",
    "explanation": "In active voice, the subject (choir) performs the action (sang).",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-6",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Choose the correct verb: Every one of the students ______ present today. [Variation 6]",
    "options": [
      {
        "id": "a",
        "text": "is"
      },
      {
        "id": "b",
        "text": "are"
      },
      {
        "id": "c",
        "text": "were"
      },
      {
        "id": "d",
        "text": "have been"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Every one is an indefinite singular pronoun requiring singular verb is.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-7",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Identify the adverb in the sentence: The cheetah ran swiftly across the savannah. [Variation 7]",
    "options": [
      {
        "id": "a",
        "text": "swiftly"
      },
      {
        "id": "b",
        "text": "cheetah"
      },
      {
        "id": "c",
        "text": "ran"
      },
      {
        "id": "d",
        "text": "across"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Swiftly modifies the verb ran, indicating manner.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-8",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "Which word is an antonym for abundant? [Variation 8]",
    "options": [
      {
        "id": "a",
        "text": "Scarce"
      },
      {
        "id": "b",
        "text": "Plentiful"
      },
      {
        "id": "c",
        "text": "Lavish"
      },
      {
        "id": "d",
        "text": "Bountiful"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Scarce denotes insufficient quantity, opposing abundant.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-9",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "Select the correctly punctuated sentence: [Variation 9]",
    "options": [
      {
        "id": "a",
        "text": "Although it rained, we finished the game."
      },
      {
        "id": "b",
        "text": "Although it rained we finished, the game."
      },
      {
        "id": "c",
        "text": "Although, it rained we finished the game."
      },
      {
        "id": "d",
        "text": "Although it rained; we finished the game."
      }
    ],
    "correctAnswer": "a",
    "explanation": "A dependent introductory clause requires a trailing comma.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-10",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "What is the active voice equivalent of: The anthem was sung by the choir? [Variation 10]",
    "options": [
      {
        "id": "a",
        "text": "The choir sang the anthem."
      },
      {
        "id": "b",
        "text": "The anthem sang the choir."
      },
      {
        "id": "c",
        "text": "By the choir was sung the anthem."
      },
      {
        "id": "d",
        "text": "The choir has sung the anthem."
      }
    ],
    "correctAnswer": "a",
    "explanation": "In active voice, the subject (choir) performs the action (sang).",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-11",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Choose the correct verb: Every one of the students ______ present today. [Variation 11]",
    "options": [
      {
        "id": "a",
        "text": "is"
      },
      {
        "id": "b",
        "text": "are"
      },
      {
        "id": "c",
        "text": "were"
      },
      {
        "id": "d",
        "text": "have been"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Every one is an indefinite singular pronoun requiring singular verb is.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-12",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Identify the adverb in the sentence: The cheetah ran swiftly across the savannah. [Variation 12]",
    "options": [
      {
        "id": "a",
        "text": "swiftly"
      },
      {
        "id": "b",
        "text": "cheetah"
      },
      {
        "id": "c",
        "text": "ran"
      },
      {
        "id": "d",
        "text": "across"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Swiftly modifies the verb ran, indicating manner.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-13",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "Which word is an antonym for abundant? [Variation 13]",
    "options": [
      {
        "id": "a",
        "text": "Scarce"
      },
      {
        "id": "b",
        "text": "Plentiful"
      },
      {
        "id": "c",
        "text": "Lavish"
      },
      {
        "id": "d",
        "text": "Bountiful"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Scarce denotes insufficient quantity, opposing abundant.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-14",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "Select the correctly punctuated sentence: [Variation 14]",
    "options": [
      {
        "id": "a",
        "text": "Although it rained, we finished the game."
      },
      {
        "id": "b",
        "text": "Although it rained we finished, the game."
      },
      {
        "id": "c",
        "text": "Although, it rained we finished the game."
      },
      {
        "id": "d",
        "text": "Although it rained; we finished the game."
      }
    ],
    "correctAnswer": "a",
    "explanation": "A dependent introductory clause requires a trailing comma.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-15",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "What is the active voice equivalent of: The anthem was sung by the choir? [Variation 15]",
    "options": [
      {
        "id": "a",
        "text": "The choir sang the anthem."
      },
      {
        "id": "b",
        "text": "The anthem sang the choir."
      },
      {
        "id": "c",
        "text": "By the choir was sung the anthem."
      },
      {
        "id": "d",
        "text": "The choir has sung the anthem."
      }
    ],
    "correctAnswer": "a",
    "explanation": "In active voice, the subject (choir) performs the action (sang).",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-16",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Choose the correct verb: Every one of the students ______ present today. [Variation 16]",
    "options": [
      {
        "id": "a",
        "text": "is"
      },
      {
        "id": "b",
        "text": "are"
      },
      {
        "id": "c",
        "text": "were"
      },
      {
        "id": "d",
        "text": "have been"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Every one is an indefinite singular pronoun requiring singular verb is.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-17",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Identify the adverb in the sentence: The cheetah ran swiftly across the savannah. [Variation 17]",
    "options": [
      {
        "id": "a",
        "text": "swiftly"
      },
      {
        "id": "b",
        "text": "cheetah"
      },
      {
        "id": "c",
        "text": "ran"
      },
      {
        "id": "d",
        "text": "across"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Swiftly modifies the verb ran, indicating manner.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-18",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "Which word is an antonym for abundant? [Variation 18]",
    "options": [
      {
        "id": "a",
        "text": "Scarce"
      },
      {
        "id": "b",
        "text": "Plentiful"
      },
      {
        "id": "c",
        "text": "Lavish"
      },
      {
        "id": "d",
        "text": "Bountiful"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Scarce denotes insufficient quantity, opposing abundant.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-19",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "Select the correctly punctuated sentence: [Variation 19]",
    "options": [
      {
        "id": "a",
        "text": "Although it rained, we finished the game."
      },
      {
        "id": "b",
        "text": "Although it rained we finished, the game."
      },
      {
        "id": "c",
        "text": "Although, it rained we finished the game."
      },
      {
        "id": "d",
        "text": "Although it rained; we finished the game."
      }
    ],
    "correctAnswer": "a",
    "explanation": "A dependent introductory clause requires a trailing comma.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-20",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "What is the active voice equivalent of: The anthem was sung by the choir? [Variation 20]",
    "options": [
      {
        "id": "a",
        "text": "The choir sang the anthem."
      },
      {
        "id": "b",
        "text": "The anthem sang the choir."
      },
      {
        "id": "c",
        "text": "By the choir was sung the anthem."
      },
      {
        "id": "d",
        "text": "The choir has sung the anthem."
      }
    ],
    "correctAnswer": "a",
    "explanation": "In active voice, the subject (choir) performs the action (sang).",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-21",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Choose the correct verb: Every one of the students ______ present today. [Variation 21]",
    "options": [
      {
        "id": "a",
        "text": "is"
      },
      {
        "id": "b",
        "text": "are"
      },
      {
        "id": "c",
        "text": "were"
      },
      {
        "id": "d",
        "text": "have been"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Every one is an indefinite singular pronoun requiring singular verb is.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-22",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Identify the adverb in the sentence: The cheetah ran swiftly across the savannah. [Variation 22]",
    "options": [
      {
        "id": "a",
        "text": "swiftly"
      },
      {
        "id": "b",
        "text": "cheetah"
      },
      {
        "id": "c",
        "text": "ran"
      },
      {
        "id": "d",
        "text": "across"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Swiftly modifies the verb ran, indicating manner.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-23",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "Which word is an antonym for abundant? [Variation 23]",
    "options": [
      {
        "id": "a",
        "text": "Scarce"
      },
      {
        "id": "b",
        "text": "Plentiful"
      },
      {
        "id": "c",
        "text": "Lavish"
      },
      {
        "id": "d",
        "text": "Bountiful"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Scarce denotes insufficient quantity, opposing abundant.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-24",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "Select the correctly punctuated sentence: [Variation 24]",
    "options": [
      {
        "id": "a",
        "text": "Although it rained, we finished the game."
      },
      {
        "id": "b",
        "text": "Although it rained we finished, the game."
      },
      {
        "id": "c",
        "text": "Although, it rained we finished the game."
      },
      {
        "id": "d",
        "text": "Although it rained; we finished the game."
      }
    ],
    "correctAnswer": "a",
    "explanation": "A dependent introductory clause requires a trailing comma.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-25",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "What is the active voice equivalent of: The anthem was sung by the choir? [Variation 25]",
    "options": [
      {
        "id": "a",
        "text": "The choir sang the anthem."
      },
      {
        "id": "b",
        "text": "The anthem sang the choir."
      },
      {
        "id": "c",
        "text": "By the choir was sung the anthem."
      },
      {
        "id": "d",
        "text": "The choir has sung the anthem."
      }
    ],
    "correctAnswer": "a",
    "explanation": "In active voice, the subject (choir) performs the action (sang).",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-26",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "Choose the correct verb: Every one of the students ______ present today. [Variation 26]",
    "options": [
      {
        "id": "a",
        "text": "is"
      },
      {
        "id": "b",
        "text": "are"
      },
      {
        "id": "c",
        "text": "were"
      },
      {
        "id": "d",
        "text": "have been"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Every one is an indefinite singular pronoun requiring singular verb is.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-27",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Identify the adverb in the sentence: The cheetah ran swiftly across the savannah. [Variation 27]",
    "options": [
      {
        "id": "a",
        "text": "swiftly"
      },
      {
        "id": "b",
        "text": "cheetah"
      },
      {
        "id": "c",
        "text": "ran"
      },
      {
        "id": "d",
        "text": "across"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Swiftly modifies the verb ran, indicating manner.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-28",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "Which word is an antonym for abundant? [Variation 28]",
    "options": [
      {
        "id": "a",
        "text": "Scarce"
      },
      {
        "id": "b",
        "text": "Plentiful"
      },
      {
        "id": "c",
        "text": "Lavish"
      },
      {
        "id": "d",
        "text": "Bountiful"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Scarce denotes insufficient quantity, opposing abundant.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-eng-exp-29",
    "subjectId": "english",
    "topicId": "grammar",
    "skillId": "skill-subject-verb",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "Select the correctly punctuated sentence: [Variation 29]",
    "options": [
      {
        "id": "a",
        "text": "Although it rained, we finished the game."
      },
      {
        "id": "b",
        "text": "Although it rained we finished, the game."
      },
      {
        "id": "c",
        "text": "Although, it rained we finished the game."
      },
      {
        "id": "d",
        "text": "Although it rained; we finished the game."
      }
    ],
    "correctAnswer": "a",
    "explanation": "A dependent introductory clause requires a trailing comma.",
    "hint": "Check grammar agreement rules carefully.",
    "estimatedSeconds": 15
  },
  {
    "id": "q-cs-exp-1",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "What is the time complexity of looking up a key in a hash table on average?",
    "options": [
      {
        "id": "a",
        "text": "O(1)"
      },
      {
        "id": "b",
        "text": "O(n)"
      },
      {
        "id": "c",
        "text": "O(log n)"
      },
      {
        "id": "d",
        "text": "O(n²)"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Hash table lookups compute an index via hashing in constant O(1) expected time.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-2",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Which data structure operates on a Last-In, First-Out (LIFO) order?",
    "options": [
      {
        "id": "a",
        "text": "Stack"
      },
      {
        "id": "b",
        "text": "Queue"
      },
      {
        "id": "c",
        "text": "Array"
      },
      {
        "id": "d",
        "text": "Linked List"
      }
    ],
    "correctAnswer": "a",
    "explanation": "A Stack pushes and pops items from the top (LIFO).",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-3",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "In binary code, what is the decimal value of 1011?",
    "options": [
      {
        "id": "a",
        "text": "11"
      },
      {
        "id": "b",
        "text": "9"
      },
      {
        "id": "c",
        "text": "13"
      },
      {
        "id": "d",
        "text": "15"
      }
    ],
    "correctAnswer": "a",
    "explanation": "1×8 + 0×4 + 1×2 + 1×1 = 11.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-4",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "What does an if-else statement represent in algorithmic logic?",
    "options": [
      {
        "id": "a",
        "text": "Selection / Branching"
      },
      {
        "id": "b",
        "text": "Iteration / Looping"
      },
      {
        "id": "c",
        "text": "Recursion"
      },
      {
        "id": "d",
        "text": "Hashing"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Conditionals allow an algorithm to branch along alternative execution paths.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-5",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "Which Boolean operator evaluates to true ONLY when both operands are true?",
    "options": [
      {
        "id": "a",
        "text": "AND"
      },
      {
        "id": "b",
        "text": "OR"
      },
      {
        "id": "c",
        "text": "XOR"
      },
      {
        "id": "d",
        "text": "NOT"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The conjunction AND requires both left and right expressions to be true.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-6",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "What is the time complexity of looking up a key in a hash table on average? (Problem 6)",
    "options": [
      {
        "id": "a",
        "text": "O(1)"
      },
      {
        "id": "b",
        "text": "O(n)"
      },
      {
        "id": "c",
        "text": "O(log n)"
      },
      {
        "id": "d",
        "text": "O(n²)"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Hash table lookups compute an index via hashing in constant O(1) expected time.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-7",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Which data structure operates on a Last-In, First-Out (LIFO) order? (Problem 7)",
    "options": [
      {
        "id": "a",
        "text": "Stack"
      },
      {
        "id": "b",
        "text": "Queue"
      },
      {
        "id": "c",
        "text": "Array"
      },
      {
        "id": "d",
        "text": "Linked List"
      }
    ],
    "correctAnswer": "a",
    "explanation": "A Stack pushes and pops items from the top (LIFO).",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-8",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "In binary code, what is the decimal value of 1011? (Problem 8)",
    "options": [
      {
        "id": "a",
        "text": "11"
      },
      {
        "id": "b",
        "text": "9"
      },
      {
        "id": "c",
        "text": "13"
      },
      {
        "id": "d",
        "text": "15"
      }
    ],
    "correctAnswer": "a",
    "explanation": "1×8 + 0×4 + 1×2 + 1×1 = 11.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-9",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "What does an if-else statement represent in algorithmic logic? (Problem 9)",
    "options": [
      {
        "id": "a",
        "text": "Selection / Branching"
      },
      {
        "id": "b",
        "text": "Iteration / Looping"
      },
      {
        "id": "c",
        "text": "Recursion"
      },
      {
        "id": "d",
        "text": "Hashing"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Conditionals allow an algorithm to branch along alternative execution paths.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-10",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "Which Boolean operator evaluates to true ONLY when both operands are true? (Problem 10)",
    "options": [
      {
        "id": "a",
        "text": "AND"
      },
      {
        "id": "b",
        "text": "OR"
      },
      {
        "id": "c",
        "text": "XOR"
      },
      {
        "id": "d",
        "text": "NOT"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The conjunction AND requires both left and right expressions to be true.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-11",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "What is the time complexity of looking up a key in a hash table on average? (Problem 11)",
    "options": [
      {
        "id": "a",
        "text": "O(1)"
      },
      {
        "id": "b",
        "text": "O(n)"
      },
      {
        "id": "c",
        "text": "O(log n)"
      },
      {
        "id": "d",
        "text": "O(n²)"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Hash table lookups compute an index via hashing in constant O(1) expected time.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-12",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Which data structure operates on a Last-In, First-Out (LIFO) order? (Problem 12)",
    "options": [
      {
        "id": "a",
        "text": "Stack"
      },
      {
        "id": "b",
        "text": "Queue"
      },
      {
        "id": "c",
        "text": "Array"
      },
      {
        "id": "d",
        "text": "Linked List"
      }
    ],
    "correctAnswer": "a",
    "explanation": "A Stack pushes and pops items from the top (LIFO).",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-13",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "In binary code, what is the decimal value of 1011? (Problem 13)",
    "options": [
      {
        "id": "a",
        "text": "11"
      },
      {
        "id": "b",
        "text": "9"
      },
      {
        "id": "c",
        "text": "13"
      },
      {
        "id": "d",
        "text": "15"
      }
    ],
    "correctAnswer": "a",
    "explanation": "1×8 + 0×4 + 1×2 + 1×1 = 11.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-14",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "What does an if-else statement represent in algorithmic logic? (Problem 14)",
    "options": [
      {
        "id": "a",
        "text": "Selection / Branching"
      },
      {
        "id": "b",
        "text": "Iteration / Looping"
      },
      {
        "id": "c",
        "text": "Recursion"
      },
      {
        "id": "d",
        "text": "Hashing"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Conditionals allow an algorithm to branch along alternative execution paths.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-15",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "Which Boolean operator evaluates to true ONLY when both operands are true? (Problem 15)",
    "options": [
      {
        "id": "a",
        "text": "AND"
      },
      {
        "id": "b",
        "text": "OR"
      },
      {
        "id": "c",
        "text": "XOR"
      },
      {
        "id": "d",
        "text": "NOT"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The conjunction AND requires both left and right expressions to be true.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-16",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "What is the time complexity of looking up a key in a hash table on average? (Problem 16)",
    "options": [
      {
        "id": "a",
        "text": "O(1)"
      },
      {
        "id": "b",
        "text": "O(n)"
      },
      {
        "id": "c",
        "text": "O(log n)"
      },
      {
        "id": "d",
        "text": "O(n²)"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Hash table lookups compute an index via hashing in constant O(1) expected time.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-17",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Which data structure operates on a Last-In, First-Out (LIFO) order? (Problem 17)",
    "options": [
      {
        "id": "a",
        "text": "Stack"
      },
      {
        "id": "b",
        "text": "Queue"
      },
      {
        "id": "c",
        "text": "Array"
      },
      {
        "id": "d",
        "text": "Linked List"
      }
    ],
    "correctAnswer": "a",
    "explanation": "A Stack pushes and pops items from the top (LIFO).",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-18",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "In binary code, what is the decimal value of 1011? (Problem 18)",
    "options": [
      {
        "id": "a",
        "text": "11"
      },
      {
        "id": "b",
        "text": "9"
      },
      {
        "id": "c",
        "text": "13"
      },
      {
        "id": "d",
        "text": "15"
      }
    ],
    "correctAnswer": "a",
    "explanation": "1×8 + 0×4 + 1×2 + 1×1 = 11.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-19",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "What does an if-else statement represent in algorithmic logic? (Problem 19)",
    "options": [
      {
        "id": "a",
        "text": "Selection / Branching"
      },
      {
        "id": "b",
        "text": "Iteration / Looping"
      },
      {
        "id": "c",
        "text": "Recursion"
      },
      {
        "id": "d",
        "text": "Hashing"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Conditionals allow an algorithm to branch along alternative execution paths.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-20",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "Which Boolean operator evaluates to true ONLY when both operands are true? (Problem 20)",
    "options": [
      {
        "id": "a",
        "text": "AND"
      },
      {
        "id": "b",
        "text": "OR"
      },
      {
        "id": "c",
        "text": "XOR"
      },
      {
        "id": "d",
        "text": "NOT"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The conjunction AND requires both left and right expressions to be true.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-21",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "What is the time complexity of looking up a key in a hash table on average? (Problem 21)",
    "options": [
      {
        "id": "a",
        "text": "O(1)"
      },
      {
        "id": "b",
        "text": "O(n)"
      },
      {
        "id": "c",
        "text": "O(log n)"
      },
      {
        "id": "d",
        "text": "O(n²)"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Hash table lookups compute an index via hashing in constant O(1) expected time.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-22",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Which data structure operates on a Last-In, First-Out (LIFO) order? (Problem 22)",
    "options": [
      {
        "id": "a",
        "text": "Stack"
      },
      {
        "id": "b",
        "text": "Queue"
      },
      {
        "id": "c",
        "text": "Array"
      },
      {
        "id": "d",
        "text": "Linked List"
      }
    ],
    "correctAnswer": "a",
    "explanation": "A Stack pushes and pops items from the top (LIFO).",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-23",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "In binary code, what is the decimal value of 1011? (Problem 23)",
    "options": [
      {
        "id": "a",
        "text": "11"
      },
      {
        "id": "b",
        "text": "9"
      },
      {
        "id": "c",
        "text": "13"
      },
      {
        "id": "d",
        "text": "15"
      }
    ],
    "correctAnswer": "a",
    "explanation": "1×8 + 0×4 + 1×2 + 1×1 = 11.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-24",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "What does an if-else statement represent in algorithmic logic? (Problem 24)",
    "options": [
      {
        "id": "a",
        "text": "Selection / Branching"
      },
      {
        "id": "b",
        "text": "Iteration / Looping"
      },
      {
        "id": "c",
        "text": "Recursion"
      },
      {
        "id": "d",
        "text": "Hashing"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Conditionals allow an algorithm to branch along alternative execution paths.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-25",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 1,
    "type": "multiple_choice",
    "prompt": "Which Boolean operator evaluates to true ONLY when both operands are true? (Problem 25)",
    "options": [
      {
        "id": "a",
        "text": "AND"
      },
      {
        "id": "b",
        "text": "OR"
      },
      {
        "id": "c",
        "text": "XOR"
      },
      {
        "id": "d",
        "text": "NOT"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The conjunction AND requires both left and right expressions to be true.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-26",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 2,
    "type": "multiple_choice",
    "prompt": "What is the time complexity of looking up a key in a hash table on average? (Problem 26)",
    "options": [
      {
        "id": "a",
        "text": "O(1)"
      },
      {
        "id": "b",
        "text": "O(n)"
      },
      {
        "id": "c",
        "text": "O(log n)"
      },
      {
        "id": "d",
        "text": "O(n²)"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Hash table lookups compute an index via hashing in constant O(1) expected time.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-27",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 3,
    "type": "multiple_choice",
    "prompt": "Which data structure operates on a Last-In, First-Out (LIFO) order? (Problem 27)",
    "options": [
      {
        "id": "a",
        "text": "Stack"
      },
      {
        "id": "b",
        "text": "Queue"
      },
      {
        "id": "c",
        "text": "Array"
      },
      {
        "id": "d",
        "text": "Linked List"
      }
    ],
    "correctAnswer": "a",
    "explanation": "A Stack pushes and pops items from the top (LIFO).",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-28",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 4,
    "type": "multiple_choice",
    "prompt": "In binary code, what is the decimal value of 1011? (Problem 28)",
    "options": [
      {
        "id": "a",
        "text": "11"
      },
      {
        "id": "b",
        "text": "9"
      },
      {
        "id": "c",
        "text": "13"
      },
      {
        "id": "d",
        "text": "15"
      }
    ],
    "correctAnswer": "a",
    "explanation": "1×8 + 0×4 + 1×2 + 1×1 = 11.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  },
  {
    "id": "q-cs-exp-29",
    "subjectId": "cs",
    "topicId": "algorithms",
    "skillId": "skill-conditionals",
    "gradeLevel": 6,
    "difficulty": 5,
    "type": "multiple_choice",
    "prompt": "What does an if-else statement represent in algorithmic logic? (Problem 29)",
    "options": [
      {
        "id": "a",
        "text": "Selection / Branching"
      },
      {
        "id": "b",
        "text": "Iteration / Looping"
      },
      {
        "id": "c",
        "text": "Recursion"
      },
      {
        "id": "d",
        "text": "Hashing"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Conditionals allow an algorithm to branch along alternative execution paths.",
    "hint": "Recall foundational computer science principles.",
    "estimatedSeconds": 16
  }
];
