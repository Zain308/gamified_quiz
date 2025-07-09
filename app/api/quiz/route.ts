import { type NextRequest, NextResponse } from "next/server"

// Comprehensive topic-specific questions database
const TOPIC_QUESTIONS = {
  javascript: [
    {
      set: 1,
      questions: [
        {
          question: "What is the difference between 'let', 'const', and 'var' in JavaScript?",
          options: [
            "'let' and 'const' are block-scoped, 'var' is function-scoped",
            "All three have the same scope",
            "'var' is block-scoped, 'let' and 'const' are function-scoped",
            "There is no difference between them",
          ],
          correct: 0,
          explanation:
            "'let' and 'const' are block-scoped and were introduced in ES6, while 'var' is function-scoped and can be redeclared.",
        },
        {
          question: "What does the '===' operator do in JavaScript?",
          options: [
            "Checks for equality with type coercion",
            "Checks for strict equality without type coercion",
            "Assigns a value to a variable",
            "Compares only the type, not the value",
          ],
          correct: 1,
          explanation:
            "The '===' operator checks for strict equality, comparing both value and type without any type coercion.",
        },
        {
          question: "What is a closure in JavaScript?",
          options: [
            "A way to close a program",
            "A function that has access to variables in its outer scope",
            "A method to hide variables",
            "A type of loop",
          ],
          correct: 1,
          explanation:
            "A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.",
        },
        {
          question: "What is the purpose of 'async/await' in JavaScript?",
          options: [
            "To make code run faster",
            "To handle asynchronous operations more readably",
            "To create loops",
            "To define variables",
          ],
          correct: 1,
          explanation:
            "async/await provides a more readable way to handle asynchronous operations compared to traditional Promise chains.",
        },
        {
          question: "What is event bubbling in JavaScript?",
          options: [
            "When events move from child to parent elements",
            "When events move from parent to child elements",
            "When events are cancelled",
            "When events are created",
          ],
          correct: 0,
          explanation:
            "Event bubbling is when an event starts from the target element and bubbles up through its parent elements.",
        },
      ],
    },
    {
      set: 2,
      questions: [
        {
          question: "What is the difference between 'null' and 'undefined' in JavaScript?",
          options: [
            "They are exactly the same",
            "'null' is assigned, 'undefined' means no value has been assigned",
            "'undefined' is assigned, 'null' means no value has been assigned",
            "Both represent empty strings",
          ],
          correct: 1,
          explanation:
            "'null' is an intentional absence of value, while 'undefined' means a variable has been declared but not assigned a value.",
        },
        {
          question: "What is the 'this' keyword in JavaScript?",
          options: [
            "It always refers to the global object",
            "It refers to the current function",
            "It refers to the object that is executing the current function",
            "It's a reserved word with no meaning",
          ],
          correct: 2,
          explanation:
            "The 'this' keyword refers to the object that is currently executing the function, and its value depends on how the function is called.",
        },
        {
          question: "What is array destructuring in JavaScript?",
          options: [
            "A way to delete arrays",
            "A way to extract values from arrays into distinct variables",
            "A way to sort arrays",
            "A way to combine arrays",
          ],
          correct: 1,
          explanation:
            "Array destructuring allows you to extract values from arrays and assign them to variables in a single statement.",
        },
        {
          question: "What is the spread operator (...) used for?",
          options: ["To create comments", "To expand arrays and objects", "To create loops", "To define functions"],
          correct: 1,
          explanation:
            "The spread operator (...) is used to expand arrays, objects, or strings into individual elements.",
        },
        {
          question: "What is a Promise in JavaScript?",
          options: [
            "A guarantee that code will work",
            "An object representing eventual completion of an asynchronous operation",
            "A type of variable",
            "A way to create functions",
          ],
          correct: 1,
          explanation:
            "A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.",
        },
      ],
    },
  ],
  python: [
    {
      set: 1,
      questions: [
        {
          question: "What is the difference between a list and a tuple in Python?",
          options: [
            "Lists are mutable, tuples are immutable",
            "Tuples are mutable, lists are immutable",
            "There is no difference",
            "Lists can only store numbers",
          ],
          correct: 0,
          explanation:
            "Lists are mutable (can be changed after creation) while tuples are immutable (cannot be changed after creation).",
        },
        {
          question: "What is a dictionary in Python?",
          options: ["A book of words", "A collection of key-value pairs", "A type of list", "A function"],
          correct: 1,
          explanation:
            "A dictionary in Python is a collection of key-value pairs, where each key is unique and maps to a value.",
        },
        {
          question: "What is the purpose of the 'self' parameter in Python class methods?",
          options: [
            "It's optional and has no purpose",
            "It refers to the class itself",
            "It refers to the instance of the class",
            "It's used for error handling",
          ],
          correct: 2,
          explanation:
            "The 'self' parameter refers to the instance of the class and is used to access instance variables and methods.",
        },
        {
          question: "What is list comprehension in Python?",
          options: [
            "A way to understand lists better",
            "A concise way to create lists",
            "A method to delete lists",
            "A type of loop",
          ],
          correct: 1,
          explanation:
            "List comprehension is a concise way to create lists by applying an expression to each item in an iterable.",
        },
        {
          question: "What is the difference between '==' and 'is' in Python?",
          options: [
            "They are exactly the same",
            "'==' compares values, 'is' compares object identity",
            "'is' compares values, '==' compares object identity",
            "Both compare only types",
          ],
          correct: 1,
          explanation:
            "'==' compares the values of objects, while 'is' compares whether two variables refer to the same object in memory.",
        },
      ],
    },
  ],
  react: [
    {
      set: 1,
      questions: [
        {
          question: "What is JSX in React?",
          options: [
            "A new programming language",
            "JavaScript XML - a syntax extension for JavaScript",
            "A CSS framework",
            "A database query language",
          ],
          correct: 1,
          explanation:
            "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.",
        },
        {
          question: "What is the purpose of useState hook in React?",
          options: ["To manage component state", "To handle HTTP requests", "To style components", "To create routes"],
          correct: 0,
          explanation: "useState is a React hook that allows you to add state to functional components.",
        },
        {
          question: "What is the virtual DOM in React?",
          options: [
            "A real DOM element",
            "A JavaScript representation of the real DOM",
            "A CSS framework",
            "A database",
          ],
          correct: 1,
          explanation:
            "The virtual DOM is a JavaScript representation of the real DOM that React uses to optimize rendering performance.",
        },
        {
          question: "What is the useEffect hook used for?",
          options: [
            "To create visual effects",
            "To handle side effects in functional components",
            "To style components",
            "To create animations",
          ],
          correct: 1,
          explanation:
            "useEffect is used to handle side effects in functional components, such as data fetching, subscriptions, or DOM manipulation.",
        },
        {
          question: "What are props in React?",
          options: [
            "Properties passed from parent to child components",
            "CSS styles",
            "JavaScript functions",
            "HTML attributes",
          ],
          correct: 0,
          explanation:
            "Props (properties) are read-only data passed from parent components to child components in React.",
        },
      ],
    },
  ],
  html: [
    {
      set: 1,
      questions: [
        {
          question: "What does HTML stand for?",
          options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlink and Text Markup Language",
          ],
          correct: 0,
          explanation:
            "HTML stands for HyperText Markup Language, which is the standard markup language for creating web pages.",
        },
        {
          question: "Which HTML tag is used for the largest heading?",
          options: ["<h6>", "<h1>", "<header>", "<heading>"],
          correct: 1,
          explanation:
            "<h1> is used for the largest heading, with headings going from <h1> (largest) to <h6> (smallest).",
        },
        {
          question: "What is the purpose of the <meta> tag?",
          options: [
            "To create links",
            "To provide metadata about the HTML document",
            "To add images",
            "To create forms",
          ],
          correct: 1,
          explanation:
            "The <meta> tag provides metadata about the HTML document, such as description, keywords, author, and viewport settings.",
        },
        {
          question: "Which attribute is used to provide alternative text for images?",
          options: ["title", "alt", "src", "description"],
          correct: 1,
          explanation:
            "The 'alt' attribute provides alternative text for images, which is important for accessibility and SEO.",
        },
        {
          question: "What is semantic HTML?",
          options: [
            "HTML with CSS styling",
            "HTML that uses meaningful tags to describe content structure",
            "HTML with JavaScript",
            "HTML with animations",
          ],
          correct: 1,
          explanation:
            "Semantic HTML uses meaningful tags like <article>, <section>, <nav> to describe the structure and meaning of content.",
        },
      ],
    },
  ],
  css: [
    {
      set: 1,
      questions: [
        {
          question: "What does CSS stand for?",
          options: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style Sheets",
            "Colorful Style Sheets",
          ],
          correct: 1,
          explanation: "CSS stands for Cascading Style Sheets, which is used to style and layout web pages.",
        },
        {
          question: "Which CSS property is used to change the text color?",
          options: ["text-color", "font-color", "color", "text-style"],
          correct: 2,
          explanation: "The 'color' property is used to set the color of text in CSS.",
        },
        {
          question: "What is the box model in CSS?",
          options: [
            "A way to create boxes",
            "The rectangular boxes generated for elements, including content, padding, border, and margin",
            "A CSS framework",
            "A JavaScript concept",
          ],
          correct: 1,
          explanation:
            "The CSS box model describes the rectangular boxes generated for elements, consisting of content, padding, border, and margin.",
        },
        {
          question: "What is the difference between 'margin' and 'padding'?",
          options: [
            "They are the same thing",
            "Margin is space outside the border, padding is space inside the border",
            "Padding is space outside the border, margin is space inside the border",
            "Both are used for text styling",
          ],
          correct: 1,
          explanation:
            "Margin is the space outside an element's border, while padding is the space between the content and the border inside the element.",
        },
        {
          question: "What is Flexbox in CSS?",
          options: [
            "A way to make flexible text",
            "A layout method for arranging items in rows or columns",
            "A CSS animation technique",
            "A JavaScript library",
          ],
          correct: 1,
          explanation:
            "Flexbox is a CSS layout method that provides an efficient way to arrange, distribute, and align items in a container.",
        },
      ],
    },
  ],
  "data-structures": [
    {
      set: 1,
      questions: [
        {
          question: "What is the time complexity of accessing an element in an array by index?",
          options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
          correct: 2,
          explanation:
            "Accessing an element in an array by index is O(1) - constant time, as you can directly calculate the memory address.",
        },
        {
          question: "What is a stack data structure?",
          options: [
            "A linear data structure that follows FIFO principle",
            "A linear data structure that follows LIFO principle",
            "A non-linear data structure",
            "A sorting algorithm",
          ],
          correct: 1,
          explanation: "A stack is a linear data structure that follows the Last In, First Out (LIFO) principle.",
        },
        {
          question: "What is the main difference between a stack and a queue?",
          options: ["Stack is LIFO, Queue is FIFO", "Stack is FIFO, Queue is LIFO", "Both are LIFO", "Both are FIFO"],
          correct: 0,
          explanation:
            "Stack follows Last In, First Out (LIFO) principle, while Queue follows First In, First Out (FIFO) principle.",
        },
        {
          question: "What is a binary tree?",
          options: [
            "A tree with exactly two nodes",
            "A tree where each node has at most two children",
            "A tree with binary data",
            "A sorting algorithm",
          ],
          correct: 1,
          explanation:
            "A binary tree is a tree data structure where each node has at most two children, referred to as left and right child.",
        },
        {
          question: "What is the time complexity of searching in a balanced binary search tree?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          correct: 1,
          explanation:
            "Searching in a balanced binary search tree has O(log n) time complexity because you eliminate half the nodes at each step.",
        },
      ],
    },
  ],
  algorithms: [
    {
      set: 1,
      questions: [
        {
          question: "What is the time complexity of bubble sort?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
          correct: 2,
          explanation:
            "Bubble sort has O(n²) time complexity in the worst and average cases due to nested loops comparing adjacent elements.",
        },
        {
          question: "What is binary search?",
          options: [
            "A search algorithm that works on unsorted arrays",
            "A search algorithm that repeatedly divides a sorted array in half",
            "A sorting algorithm",
            "A data structure",
          ],
          correct: 1,
          explanation:
            "Binary search is an efficient search algorithm that works on sorted arrays by repeatedly dividing the search space in half.",
        },
        {
          question: "What is the time complexity of merge sort?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
          correct: 1,
          explanation: "Merge sort has O(n log n) time complexity in all cases due to its divide-and-conquer approach.",
        },
        {
          question: "What is dynamic programming?",
          options: [
            "A programming language",
            "A technique for solving problems by breaking them into overlapping subproblems",
            "A data structure",
            "A sorting algorithm",
          ],
          correct: 1,
          explanation:
            "Dynamic programming is an optimization technique that solves problems by breaking them into overlapping subproblems and storing results to avoid redundant calculations.",
        },
        {
          question: "What is the difference between BFS and DFS?",
          options: [
            "BFS uses a queue, DFS uses a stack",
            "BFS uses a stack, DFS uses a queue",
            "Both use queues",
            "Both use stacks",
          ],
          correct: 0,
          explanation:
            "BFS (Breadth-First Search) uses a queue to explore nodes level by level, while DFS (Depth-First Search) uses a stack to explore as far as possible along each branch.",
        },
      ],
    },
  ],
}

// Function to get questions for a topic
function getQuestionsForTopic(topic: string, level: string, attemptNumber = 1): any[] {
  const topicKey = topic.toLowerCase().replace(/\s+/g, "-")
  const topicQuestions = TOPIC_QUESTIONS[topicKey as keyof typeof TOPIC_QUESTIONS]

  if (!topicQuestions) {
    // Fallback to general questions if topic not found
    return generateFallbackQuestions(topic, level)
  }

  // Select question set based on attempt number
  const setIndex = (attemptNumber - 1) % topicQuestions.length
  const selectedSet = topicQuestions[setIndex]

  return selectedSet.questions
}

// Fallback questions for topics not in the database
function generateFallbackQuestions(topic: string, level: string): any[] {
  const difficulties = {
    beginner: "basic concepts and definitions",
    intermediate: "practical applications and problem-solving",
    advanced: "complex scenarios and optimization",
  }

  return [
    {
      question: `What is a fundamental concept in ${topic}?`,
      options: [
        "Option A - Basic definition",
        "Option B - Advanced concept",
        "Option C - Unrelated concept",
        "Option D - Incorrect definition",
      ],
      correct: 0,
      explanation: `This question tests ${difficulties[level as keyof typeof difficulties]} in ${topic}.`,
    },
    {
      question: `Which of the following is most important when working with ${topic}?`,
      options: ["Understanding the basics", "Memorizing syntax", "Copying code", "Avoiding practice"],
      correct: 0,
      explanation: `Understanding fundamentals is crucial for mastering ${topic}.`,
    },
    {
      question: `What is a common application of ${topic}?`,
      options: ["Real-world problem solving", "Only academic exercises", "Decoration purposes", "No practical use"],
      correct: 0,
      explanation: `${topic} has many practical applications in real-world scenarios.`,
    },
    {
      question: `How should you approach learning ${topic}?`,
      options: ["Practice regularly and build projects", "Only read theory", "Memorize everything", "Skip the basics"],
      correct: 0,
      explanation: `Regular practice and hands-on experience are key to mastering ${topic}.`,
    },
    {
      question: `What makes someone proficient in ${topic}?`,
      options: [
        "Consistent practice and understanding of core concepts",
        "Knowing all syntax by heart",
        "Using the most complex features",
        "Avoiding simple examples",
      ],
      correct: 0,
      explanation: `Proficiency comes from understanding core concepts and consistent practice.`,
    },
  ]
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { topic, level, attemptNumber = 1 } = body

    if (!topic || !level) {
      return NextResponse.json({ error: "Topic and level are required" }, { status: 400 })
    }

    console.log(`Generating quiz for topic: ${topic}, level: ${level}, attempt: ${attemptNumber}`)

    // Get topic-specific questions
    const questions = getQuestionsForTopic(topic, level, attemptNumber)

    const quiz = {
      id: `quiz_${Date.now()}`,
      topic,
      level,
      questions,
      createdAt: new Date().toISOString(),
      attemptNumber,
    }

    return NextResponse.json(quiz)
  } catch (error) {
    console.error("Error generating quiz:", error)
    return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 })
  }
}
