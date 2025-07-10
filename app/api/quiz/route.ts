import { type NextRequest, NextResponse } from "next/server"

// Comprehensive fallback quiz data with multiple question sets for rotation
const FALLBACK_QUIZ_DATA: Record<string, Record<number, { questionSets: any[][] }>> = {
  python: {
    1: {
      questionSets: [
        [
          {
            id: "py-1-1-1",
            question: "Which of the following is the correct way to create a variable in Python?",
            options: ["x = 5", "var x = 5", "int x = 5", "declare x = 5"],
            correctAnswer: "x = 5",
          },
          {
            id: "py-1-1-2",
            question: "What is the output of print(type(5))?",
            options: ["<class 'int'>", "<class 'number'>", "<class 'integer'>", "<class 'float'>"],
            correctAnswer: "<class 'int'>",
          },
          {
            id: "py-1-1-3",
            question: "Which symbol is used for comments in Python?",
            options: ["//", "/*", "#", "<!--"],
            correctAnswer: "#",
          },
          {
            id: "py-1-1-4",
            question: "What is the correct way to create a list in Python?",
            options: ["list = [1, 2, 3]", "list = (1, 2, 3)", "list = {1, 2, 3}", "list = <1, 2, 3>"],
            correctAnswer: "list = [1, 2, 3]",
          },
          {
            id: "py-1-1-5",
            question: "Which function is used to get user input in Python?",
            options: ["input()", "get()", "read()", "scan()"],
            correctAnswer: "input()",
          },
        ],
      ],
    },
    2: {
      questionSets: [
        [
          {
            id: "py-2-1-1",
            question: "What is the difference between a list and a tuple in Python?",
            options: [
              "Lists are mutable, tuples are immutable",
              "Tuples are mutable, lists are immutable",
              "No difference",
              "Lists are faster than tuples",
            ],
            correctAnswer: "Lists are mutable, tuples are immutable",
          },
          {
            id: "py-2-1-2",
            question: "Which method is used to add an element to the end of a list?",
            options: ["add()", "append()", "insert()", "push()"],
            correctAnswer: "append()",
          },
          {
            id: "py-2-1-3",
            question: "What does the len() function return?",
            options: ["The length of an object", "The last element", "The first element", "The type of object"],
            correctAnswer: "The length of an object",
          },
          {
            id: "py-2-1-4",
            question: "How do you create a dictionary in Python?",
            options: ["dict = {}", "dict = []", "dict = ()", "dict = <>"],
            correctAnswer: "dict = {}",
          },
          {
            id: "py-2-1-5",
            question: "What is the output of print('Hello' + 'World')?",
            options: ["HelloWorld", "Hello World", "Hello+World", "Error"],
            correctAnswer: "HelloWorld",
          },
        ],
      ],
    },
  },
  javascript: {
    1: {
      questionSets: [
        [
          {
            id: "js-1-1-1",
            question: "What is the correct way to declare a variable in JavaScript?",
            options: ["var myVar;", "variable myVar;", "v myVar;", "declare myVar;"],
            correctAnswer: "var myVar;",
          },
          {
            id: "js-1-1-2",
            question: "Which of the following is NOT a JavaScript data type?",
            options: ["String", "Boolean", "Integer", "Number"],
            correctAnswer: "Integer",
          },
          {
            id: "js-1-1-3",
            question: "How do you write 'Hello World' in an alert box?",
            options: [
              "alertBox('Hello World');",
              "msg('Hello World');",
              "alert('Hello World');",
              "msgBox('Hello World');",
            ],
            correctAnswer: "alert('Hello World');",
          },
          {
            id: "js-1-1-4",
            question: "Which operator is used to assign a value to a variable?",
            options: ["*", "=", "x", "-"],
            correctAnswer: "=",
          },
          {
            id: "js-1-1-5",
            question: "What will the following code return: Boolean(10 > 9)?",
            options: ["true", "false", "NaN", "undefined"],
            correctAnswer: "true",
          },
        ],
      ],
    },
    2: {
      questionSets: [
        [
          {
            id: "js-2-1-1",
            question: "What is the difference between '==' and '===' in JavaScript?",
            options: [
              "No difference",
              "'==' checks type, '===' doesn't",
              "'===' checks type and value, '==' only checks value",
              "Both are deprecated",
            ],
            correctAnswer: "'===' checks type and value, '==' only checks value",
          },
          {
            id: "js-2-1-2",
            question: "Which method is used to add an element to the end of an array?",
            options: ["push()", "pop()", "shift()", "unshift()"],
            correctAnswer: "push()",
          },
          {
            id: "js-2-1-3",
            question: "What is a closure in JavaScript?",
            options: [
              "A way to close the browser",
              "A function that has access to outer scope variables",
              "A method to end a loop",
              "A type of error",
            ],
            correctAnswer: "A function that has access to outer scope variables",
          },
          {
            id: "js-2-1-4",
            question: "Which keyword is used to create a constant in JavaScript?",
            options: ["const", "constant", "final", "static"],
            correctAnswer: "const",
          },
          {
            id: "js-2-1-5",
            question: "What does 'this' refer to in JavaScript?",
            options: [
              "The current function",
              "The global object",
              "The object that owns the method",
              "It depends on the context",
            ],
            correctAnswer: "It depends on the context",
          },
        ],
      ],
    },
  },
  "web development": {
    1: {
      questionSets: [
        [
          {
            id: "web-1-1-1",
            question: "What does HTML stand for?",
            options: [
              "HyperText Markup Language",
              "High Tech Modern Language",
              "HyperText Modern Language",
              "High Text Markup Language",
            ],
            correctAnswer: "HyperText Markup Language",
          },
          {
            id: "web-1-1-2",
            question: "Which HTML tag is used to create a hyperlink?",
            options: ["<link>", "<a>", "<href>", "<url>"],
            correctAnswer: "<a>",
          },
          {
            id: "web-1-1-3",
            question: "What does CSS stand for?",
            options: [
              "Cascading Style Sheets",
              "Computer Style Sheets",
              "Creative Style Sheets",
              "Colorful Style Sheets",
            ],
            correctAnswer: "Cascading Style Sheets",
          },
          {
            id: "web-1-1-4",
            question: "Which HTML tag is used to define the largest heading?",
            options: ["<h6>", "<h1>", "<header>", "<heading>"],
            correctAnswer: "<h1>",
          },
          {
            id: "web-1-1-5",
            question: "What is the correct HTML element for inserting a line break?",
            options: ["<break>", "<lb>", "<br>", "<newline>"],
            correctAnswer: "<br>",
          },
        ],
        [
          {
            id: "web-1-2-1",
            question: "Which attribute is used to provide alternative text for an image?",
            options: ["title", "alt", "src", "description"],
            correctAnswer: "alt",
          },
          {
            id: "web-1-2-2",
            question: "What is the correct way to link an external CSS file?",
            options: [
              "<link rel='stylesheet' href='style.css'>",
              "<css src='style.css'>",
              "<style src='style.css'>",
              "<link src='style.css'>",
            ],
            correctAnswer: "<link rel='stylesheet' href='style.css'>",
          },
          {
            id: "web-1-2-3",
            question: "Which CSS property is used to change the text color?",
            options: ["text-color", "font-color", "color", "text-style"],
            correctAnswer: "color",
          },
          {
            id: "web-1-2-4",
            question: "What does the 'div' element represent in HTML?",
            options: ["Division", "Document", "Display", "Data"],
            correctAnswer: "Division",
          },
          {
            id: "web-1-2-5",
            question: "Which HTML attribute specifies the URL of the page the link goes to?",
            options: ["src", "href", "link", "url"],
            correctAnswer: "href",
          },
        ],
      ],
    },
    2: {
      questionSets: [
        [
          {
            id: "web-2-1-1",
            question: "What is the CSS Box Model?",
            options: [
              "A model for creating boxes",
              "Content, padding, border, and margin",
              "A JavaScript framework",
              "A HTML element",
            ],
            correctAnswer: "Content, padding, border, and margin",
          },
          {
            id: "web-2-1-2",
            question: "Which CSS property is used to make text bold?",
            options: ["font-weight: bold", "text-style: bold", "font-style: bold", "text-weight: bold"],
            correctAnswer: "font-weight: bold",
          },
          {
            id: "web-2-1-3",
            question: "What is responsive web design?",
            options: [
              "Design that responds to user clicks",
              "Design that adapts to different screen sizes",
              "Design with animations",
              "Design that loads quickly",
            ],
            correctAnswer: "Design that adapts to different screen sizes",
          },
          {
            id: "web-2-1-4",
            question: "Which CSS property is used to create space between elements?",
            options: ["padding", "margin", "spacing", "gap"],
            correctAnswer: "margin",
          },
          {
            id: "web-2-1-5",
            question: "What is the purpose of the 'viewport' meta tag?",
            options: [
              "To set the page title",
              "To control the page's dimensions and scaling",
              "To add keywords",
              "To link stylesheets",
            ],
            correctAnswer: "To control the page's dimensions and scaling",
          },
        ],
      ],
    },
    3: {
      questionSets: [
        [
          {
            id: "web-3-1-1",
            question: "What is Flexbox in CSS?",
            options: [
              "A layout method for arranging items in rows or columns",
              "A JavaScript library",
              "A HTML element",
              "A CSS framework",
            ],
            correctAnswer: "A layout method for arranging items in rows or columns",
          },
          {
            id: "web-3-1-2",
            question: "Which CSS property is used with Flexbox to align items along the main axis?",
            options: ["align-items", "justify-content", "flex-direction", "align-content"],
            correctAnswer: "justify-content",
          },
          {
            id: "web-3-1-3",
            question: "What is CSS Grid?",
            options: [
              "A two-dimensional layout system",
              "A one-dimensional layout system",
              "A JavaScript framework",
              "A HTML element",
            ],
            correctAnswer: "A two-dimensional layout system",
          },
          {
            id: "web-3-1-4",
            question: "Which HTTP status code indicates a successful request?",
            options: ["404", "500", "200", "301"],
            correctAnswer: "200",
          },
          {
            id: "web-3-1-5",
            question: "What is the purpose of semantic HTML?",
            options: [
              "To make pages load faster",
              "To provide meaning and structure to content",
              "To add styling",
              "To create animations",
            ],
            correctAnswer: "To provide meaning and structure to content",
          },
        ],
      ],
    },
  },
  java: {
    1: {
      questionSets: [
        [
          {
            id: "java-1-1-1",
            question: "Which of the following is the correct way to declare a variable in Java?",
            options: ["int x = 5;", "x = 5;", "var x = 5;", "integer x = 5;"],
            correctAnswer: "int x = 5;",
          },
          {
            id: "java-1-1-2",
            question: "What is the main method signature in Java?",
            options: [
              "public static void main(String[] args)",
              "public void main(String[] args)",
              "static void main(String[] args)",
              "public main(String[] args)",
            ],
            correctAnswer: "public static void main(String[] args)",
          },
          {
            id: "java-1-1-3",
            question: "Which keyword is used to create a class in Java?",
            options: ["class", "Class", "create", "new"],
            correctAnswer: "class",
          },
          {
            id: "java-1-1-4",
            question: "What is the correct way to create an object in Java?",
            options: [
              "MyClass obj = new MyClass();",
              "MyClass obj = MyClass();",
              "obj = new MyClass();",
              "new MyClass obj;",
            ],
            correctAnswer: "MyClass obj = new MyClass();",
          },
          {
            id: "java-1-1-5",
            question: "Which method is used to print output in Java?",
            options: ["System.out.println()", "print()", "console.log()", "output()"],
            correctAnswer: "System.out.println()",
          },
        ],
      ],
    },
    2: {
      questionSets: [
        [
          {
            id: "java-2-1-1",
            question: "What is inheritance in Java?",
            options: [
              "A mechanism where one class acquires properties of another class",
              "Creating multiple objects",
              "A way to hide data",
              "A method to handle exceptions",
            ],
            correctAnswer: "A mechanism where one class acquires properties of another class",
          },
          {
            id: "java-2-1-2",
            question: "Which keyword is used for inheritance in Java?",
            options: ["extends", "inherits", "implements", "super"],
            correctAnswer: "extends",
          },
          {
            id: "java-2-1-3",
            question: "What is method overloading in Java?",
            options: [
              "Multiple methods with same name but different parameters",
              "Overriding parent class methods",
              "Creating static methods",
              "Using multiple classes",
            ],
            correctAnswer: "Multiple methods with same name but different parameters",
          },
          {
            id: "java-2-1-4",
            question: "What is encapsulation in Java?",
            options: [
              "Wrapping data and methods together",
              "Creating multiple classes",
              "Using inheritance",
              "Handling exceptions",
            ],
            correctAnswer: "Wrapping data and methods together",
          },
          {
            id: "java-2-1-5",
            question: "Which access modifier makes a member accessible only within the same class?",
            options: ["private", "public", "protected", "default"],
            correctAnswer: "private",
          },
        ],
      ],
    },
  },
  "data structures": {
    1: {
      questionSets: [
        [
          {
            id: "ds-1-1-1",
            question: "What is a data structure?",
            options: [
              "A way of organizing and storing data",
              "A programming language",
              "A type of algorithm",
              "A computer hardware component",
            ],
            correctAnswer: "A way of organizing and storing data",
          },
          {
            id: "ds-1-1-2",
            question: "Which of the following is a linear data structure?",
            options: ["Tree", "Graph", "Array", "Hash Table"],
            correctAnswer: "Array",
          },
          {
            id: "ds-1-1-3",
            question: "What is the time complexity of accessing an element in an array by index?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
            correctAnswer: "O(1)",
          },
          {
            id: "ds-1-1-4",
            question: "In a stack, which operation adds an element?",
            options: ["push", "pop", "peek", "enqueue"],
            correctAnswer: "push",
          },
          {
            id: "ds-1-1-5",
            question: "What does LIFO stand for?",
            options: ["Last In First Out", "Last In Final Out", "Linear In First Out", "List In First Out"],
            correctAnswer: "Last In First Out",
          },
        ],
      ],
    },
    2: {
      questionSets: [
        [
          {
            id: "ds-2-1-1",
            question: "What is the main difference between a stack and a queue?",
            options: [
              "Stack is LIFO, Queue is FIFO",
              "Stack is FIFO, Queue is LIFO",
              "No difference",
              "Stack is faster than Queue",
            ],
            correctAnswer: "Stack is LIFO, Queue is FIFO",
          },
          {
            id: "ds-2-1-2",
            question: "Which data structure is best for implementing recursion?",
            options: ["Array", "Stack", "Queue", "Linked List"],
            correctAnswer: "Stack",
          },
          {
            id: "ds-2-1-3",
            question: "What is the time complexity of searching in a binary search tree (average case)?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            correctAnswer: "O(log n)",
          },
          {
            id: "ds-2-1-4",
            question: "In a linked list, what does each node contain?",
            options: ["Only data", "Only pointer", "Data and pointer to next node", "Index and data"],
            correctAnswer: "Data and pointer to next node",
          },
          {
            id: "ds-2-1-5",
            question: "Which operation is NOT typically supported by a stack?",
            options: ["Push", "Pop", "Peek", "Random access"],
            correctAnswer: "Random access",
          },
        ],
      ],
    },
  },
  algorithms: {
    1: {
      questionSets: [
        [
          {
            id: "algo-1-1-1",
            question: "What is an algorithm?",
            options: [
              "A step-by-step procedure to solve a problem",
              "A programming language",
              "A data structure",
              "A computer program",
            ],
            correctAnswer: "A step-by-step procedure to solve a problem",
          },
          {
            id: "algo-1-1-2",
            question: "Which sorting algorithm has the best average-case time complexity?",
            options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
            correctAnswer: "Merge Sort",
          },
          {
            id: "algo-1-1-3",
            question: "What is the time complexity of binary search?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            correctAnswer: "O(log n)",
          },
          {
            id: "algo-1-1-4",
            question: "Which algorithm technique is used in merge sort?",
            options: ["Divide and Conquer", "Greedy", "Dynamic Programming", "Backtracking"],
            correctAnswer: "Divide and Conquer",
          },
          {
            id: "algo-1-1-5",
            question: "What is the worst-case time complexity of quicksort?",
            options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"],
            correctAnswer: "O(n²)",
          },
        ],
      ],
    },
    2: {
      questionSets: [
        [
          {
            id: "algo-2-1-1",
            question: "What is the main principle behind dynamic programming?",
            options: [
              "Storing solutions to subproblems to avoid recomputation",
              "Dividing problems into smaller parts",
              "Making locally optimal choices",
              "Trying all possible solutions",
            ],
            correctAnswer: "Storing solutions to subproblems to avoid recomputation",
          },
          {
            id: "algo-2-1-2",
            question: "Which algorithm is used to find the shortest path in a weighted graph?",
            options: ["BFS", "DFS", "Dijkstra's Algorithm", "Binary Search"],
            correctAnswer: "Dijkstra's Algorithm",
          },
          {
            id: "algo-2-1-3",
            question: "What is the time complexity of the bubble sort algorithm?",
            options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
            correctAnswer: "O(n²)",
          },
          {
            id: "algo-2-1-4",
            question: "Which traversal method visits nodes level by level in a tree?",
            options: ["Inorder", "Preorder", "Postorder", "Level-order (BFS)"],
            correctAnswer: "Level-order (BFS)",
          },
          {
            id: "algo-2-1-5",
            question: "What is the space complexity of merge sort?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            correctAnswer: "O(n)",
          },
        ],
      ],
    },
  },
  "database management": {
    1: {
      questionSets: [
        [
          {
            id: "db-1-1-1",
            question: "What does SQL stand for?",
            options: [
              "Structured Query Language",
              "Simple Query Language",
              "Standard Query Language",
              "System Query Language",
            ],
            correctAnswer: "Structured Query Language",
          },
          {
            id: "db-1-1-2",
            question: "Which command is used to retrieve data from a database?",
            options: ["SELECT", "GET", "FETCH", "RETRIEVE"],
            correctAnswer: "SELECT",
          },
          {
            id: "db-1-1-3",
            question: "What is a primary key?",
            options: [
              "A unique identifier for each record",
              "The first column in a table",
              "A password for the database",
              "The most important data",
            ],
            correctAnswer: "A unique identifier for each record",
          },
          {
            id: "db-1-1-4",
            question: "Which SQL command is used to add new data to a table?",
            options: ["ADD", "INSERT", "CREATE", "UPDATE"],
            correctAnswer: "INSERT",
          },
          {
            id: "db-1-1-5",
            question: "What is a foreign key?",
            options: [
              "A key that references the primary key of another table",
              "A key from another database",
              "An encrypted key",
              "A backup key",
            ],
            correctAnswer: "A key that references the primary key of another table",
          },
        ],
      ],
    },
    2: {
      questionSets: [
        [
          {
            id: "db-2-1-1",
            question: "What is database normalization?",
            options: [
              "The process of organizing data to reduce redundancy",
              "Making database faster",
              "Creating backups",
              "Encrypting data",
            ],
            correctAnswer: "The process of organizing data to reduce redundancy",
          },
          {
            id: "db-2-1-2",
            question: "Which normal form eliminates partial dependencies?",
            options: ["1NF", "2NF", "3NF", "BCNF"],
            correctAnswer: "2NF",
          },
          {
            id: "db-2-1-3",
            question: "What is a JOIN in SQL?",
            options: [
              "A way to combine rows from two or more tables",
              "A way to add new columns",
              "A way to delete data",
              "A way to create tables",
            ],
            correctAnswer: "A way to combine rows from two or more tables",
          },
          {
            id: "db-2-1-4",
            question: "Which type of JOIN returns all records from both tables?",
            options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
            correctAnswer: "FULL OUTER JOIN",
          },
          {
            id: "db-2-1-5",
            question: "What is an index in a database?",
            options: [
              "A data structure that improves query performance",
              "A list of all tables",
              "A backup of data",
              "A user permission",
            ],
            correctAnswer: "A data structure that improves query performance",
          },
        ],
      ],
    },
  },
  react: {
    1: {
      questionSets: [
        [
          {
            id: "react-1-1-1",
            question: "What is React?",
            options: [
              "A JavaScript library for building user interfaces",
              "A database",
              "A server framework",
              "A CSS framework",
            ],
            correctAnswer: "A JavaScript library for building user interfaces",
          },
          {
            id: "react-1-1-2",
            question: "What is JSX?",
            options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extension"],
            correctAnswer: "JavaScript XML",
          },
          {
            id: "react-1-1-3",
            question: "How do you create a React component?",
            options: [
              "function MyComponent() {}",
              "class MyComponent {}",
              "component MyComponent() {}",
              "create MyComponent() {}",
            ],
            correctAnswer: "function MyComponent() {}",
          },
          {
            id: "react-1-1-4",
            question: "What is the virtual DOM?",
            options: [
              "A JavaScript representation of the real DOM",
              "A new HTML standard",
              "A CSS framework",
              "A database",
            ],
            correctAnswer: "A JavaScript representation of the real DOM",
          },
          {
            id: "react-1-1-5",
            question: "How do you pass data to a React component?",
            options: ["Through props", "Through state", "Through context", "Through refs"],
            correctAnswer: "Through props",
          },
        ],
      ],
    },
    2: {
      questionSets: [
        [
          {
            id: "react-2-1-1",
            question: "What is state in React?",
            options: ["Data that can change over time", "Static data", "CSS styles", "HTML elements"],
            correctAnswer: "Data that can change over time",
          },
          {
            id: "react-2-1-2",
            question: "Which hook is used to manage state in functional components?",
            options: ["useState", "useEffect", "useContext", "useReducer"],
            correctAnswer: "useState",
          },
          {
            id: "react-2-1-3",
            question: "What is the purpose of useEffect hook?",
            options: ["To perform side effects", "To manage state", "To create components", "To handle events"],
            correctAnswer: "To perform side effects",
          },
          {
            id: "react-2-1-4",
            question: "How do you handle events in React?",
            options: [
              "Using event handlers like onClick",
              "Using addEventListener",
              "Using jQuery",
              "Using vanilla JavaScript",
            ],
            correctAnswer: "Using event handlers like onClick",
          },
          {
            id: "react-2-1-5",
            question: "What is conditional rendering in React?",
            options: [
              "Rendering components based on conditions",
              "Rendering all components",
              "Rendering CSS conditionally",
              "Rendering HTML conditionally",
            ],
            correctAnswer: "Rendering components based on conditions",
          },
        ],
      ],
    },
  },
  "operating systems": {
    1: {
      questionSets: [
        [
          {
            id: "os-1-1-1",
            question: "What is an operating system?",
            options: [
              "Software that manages computer hardware and software resources",
              "A programming language",
              "A type of application software",
              "Computer hardware",
            ],
            correctAnswer: "Software that manages computer hardware and software resources",
          },
          {
            id: "os-1-1-2",
            question: "Which of the following is NOT a function of an operating system?",
            options: ["Process management", "Memory management", "File management", "Web browsing"],
            correctAnswer: "Web browsing",
          },
          {
            id: "os-1-1-3",
            question: "What is a process?",
            options: ["A program in execution", "A file on disk", "A hardware component", "A programming language"],
            correctAnswer: "A program in execution",
          },
          {
            id: "os-1-1-4",
            question: "Which scheduling algorithm gives priority to shorter jobs?",
            options: ["FCFS", "SJF", "Round Robin", "Priority"],
            correctAnswer: "SJF",
          },
          {
            id: "os-1-1-5",
            question: "What is virtual memory?",
            options: [
              "A memory management technique using disk space as RAM",
              "Memory that doesn't exist",
              "RAM memory",
              "Cache memory",
            ],
            correctAnswer: "A memory management technique using disk space as RAM",
          },
        ],
      ],
    },
  },
  "computer networks": {
    1: {
      questionSets: [
        [
          {
            id: "net-1-1-1",
            question: "What does HTTP stand for?",
            options: [
              "HyperText Transfer Protocol",
              "High Transfer Text Protocol",
              "HyperText Transport Protocol",
              "High Text Transfer Protocol",
            ],
            correctAnswer: "HyperText Transfer Protocol",
          },
          {
            id: "net-1-1-2",
            question: "Which layer of the OSI model handles routing?",
            options: ["Physical", "Data Link", "Network", "Transport"],
            correctAnswer: "Network",
          },
          {
            id: "net-1-1-3",
            question: "What is the default port number for HTTP?",
            options: ["21", "23", "80", "443"],
            correctAnswer: "80",
          },
          {
            id: "net-1-1-4",
            question: "Which protocol is used for secure web communication?",
            options: ["HTTP", "HTTPS", "FTP", "SMTP"],
            correctAnswer: "HTTPS",
          },
          {
            id: "net-1-1-5",
            question: "What does IP stand for?",
            options: ["Internet Protocol", "Internal Protocol", "Internet Process", "Internal Process"],
            correctAnswer: "Internet Protocol",
          },
        ],
      ],
    },
  },
  "software engineering": {
    1: {
      questionSets: [
        [
          {
            id: "se-1-1-1",
            question: "What is software engineering?",
            options: [
              "Systematic approach to software development",
              "Writing code quickly",
              "Testing software",
              "Installing software",
            ],
            correctAnswer: "Systematic approach to software development",
          },
          {
            id: "se-1-1-2",
            question: "Which is the first phase in the Software Development Life Cycle?",
            options: ["Design", "Implementation", "Requirements Analysis", "Testing"],
            correctAnswer: "Requirements Analysis",
          },
          {
            id: "se-1-1-3",
            question: "What does SDLC stand for?",
            options: [
              "Software Development Life Cycle",
              "System Development Life Cycle",
              "Software Design Life Cycle",
              "System Design Life Cycle",
            ],
            correctAnswer: "Software Development Life Cycle",
          },
          {
            id: "se-1-1-4",
            question: "Which model follows a linear sequential approach?",
            options: ["Agile", "Waterfall", "Spiral", "Prototype"],
            correctAnswer: "Waterfall",
          },
          {
            id: "se-1-1-5",
            question: "What is version control?",
            options: [
              "Managing changes to source code over time",
              "Controlling software versions",
              "Testing different versions",
              "Installing software versions",
            ],
            correctAnswer: "Managing changes to source code over time",
          },
        ],
      ],
    },
  },
  "machine learning": {
    1: {
      questionSets: [
        [
          {
            id: "ml-1-1-1",
            question: "What is machine learning?",
            options: [
              "A subset of AI that learns from data",
              "A programming language",
              "A database system",
              "A web framework",
            ],
            correctAnswer: "A subset of AI that learns from data",
          },
          {
            id: "ml-1-1-2",
            question: "Which type of learning uses labeled data?",
            options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Deep Learning"],
            correctAnswer: "Supervised Learning",
          },
          {
            id: "ml-1-1-3",
            question: "What is a training set?",
            options: [
              "Data used to train a model",
              "Data used to test a model",
              "Data used to validate a model",
              "Data used to deploy a model",
            ],
            correctAnswer: "Data used to train a model",
          },
          {
            id: "ml-1-1-4",
            question: "Which algorithm is commonly used for classification?",
            options: ["Linear Regression", "Decision Tree", "K-Means", "PCA"],
            correctAnswer: "Decision Tree",
          },
          {
            id: "ml-1-1-5",
            question: "What is overfitting?",
            options: [
              "Model performs well on training data but poorly on new data",
              "Model performs poorly on all data",
              "Model is too simple",
              "Model has too few parameters",
            ],
            correctAnswer: "Model performs well on training data but poorly on new data",
          },
        ],
      ],
    },
  },
  "artificial intelligence": {
    1: {
      questionSets: [
        [
          {
            id: "ai-1-1-1",
            question: "What is Artificial Intelligence?",
            options: [
              "Simulation of human intelligence in machines",
              "A programming language",
              "A database system",
              "A web browser",
            ],
            correctAnswer: "Simulation of human intelligence in machines",
          },
          {
            id: "ai-1-1-2",
            question: "Who is considered the father of AI?",
            options: ["Alan Turing", "John McCarthy", "Marvin Minsky", "Herbert Simon"],
            correctAnswer: "John McCarthy",
          },
          {
            id: "ai-1-1-3",
            question: "What is the Turing Test?",
            options: [
              "A test of machine's ability to exhibit intelligent behavior",
              "A programming test",
              "A hardware test",
              "A network test",
            ],
            correctAnswer: "A test of machine's ability to exhibit intelligent behavior",
          },
          {
            id: "ai-1-1-4",
            question: "Which search algorithm is used in AI?",
            options: ["Linear Search", "Binary Search", "A* Search", "Quick Search"],
            correctAnswer: "A* Search",
          },
          {
            id: "ai-1-1-5",
            question: "What is a neural network?",
            options: [
              "A computing system inspired by biological neural networks",
              "A computer network",
              "A social network",
              "A database network",
            ],
            correctAnswer: "A computing system inspired by biological neural networks",
          },
        ],
      ],
    },
  },
  "mobile development": {
    1: {
      questionSets: [
        [
          {
            id: "mob-1-1-1",
            question: "Which programming language is primarily used for Android development?",
            options: ["Swift", "Java/Kotlin", "C#", "Python"],
            correctAnswer: "Java/Kotlin",
          },
          {
            id: "mob-1-1-2",
            question: "What is the official IDE for Android development?",
            options: ["Eclipse", "Android Studio", "Visual Studio", "Xcode"],
            correctAnswer: "Android Studio",
          },
          {
            id: "mob-1-1-3",
            question: "Which language is used for iOS development?",
            options: ["Java", "Swift", "Python", "JavaScript"],
            correctAnswer: "Swift",
          },
          {
            id: "mob-1-1-4",
            question: "What is React Native?",
            options: [
              "A framework for building mobile apps using React",
              "A native Android library",
              "A mobile testing tool",
              "A mobile database",
            ],
            correctAnswer: "A framework for building mobile apps using React",
          },
          {
            id: "mob-1-1-5",
            question: "What is an APK file?",
            options: ["Android Package file", "Apple Package file", "Application Program Kit", "Android Program Kit"],
            correctAnswer: "Android Package file",
          },
        ],
      ],
    },
  },
  cybersecurity: {
    1: {
      questionSets: [
        [
          {
            id: "cyber-1-1-1",
            question: "What is cybersecurity?",
            options: [
              "Protection of digital information and systems",
              "A programming language",
              "A database system",
              "A web framework",
            ],
            correctAnswer: "Protection of digital information and systems",
          },
          {
            id: "cyber-1-1-2",
            question: "What does CIA triad stand for in cybersecurity?",
            options: [
              "Confidentiality, Integrity, Availability",
              "Computer, Internet, Access",
              "Cyber, Information, Analysis",
              "Control, Identity, Authentication",
            ],
            correctAnswer: "Confidentiality, Integrity, Availability",
          },
          {
            id: "cyber-1-1-3",
            question: "What is a firewall?",
            options: [
              "A network security device that monitors traffic",
              "A physical wall",
              "A programming tool",
              "A database security feature",
            ],
            correctAnswer: "A network security device that monitors traffic",
          },
          {
            id: "cyber-1-1-4",
            question: "What is phishing?",
            options: [
              "A social engineering attack to steal sensitive information",
              "A fishing technique",
              "A programming method",
              "A database query",
            ],
            correctAnswer: "A social engineering attack to steal sensitive information",
          },
          {
            id: "cyber-1-1-5",
            question: "What is encryption?",
            options: ["Converting data into a coded format", "Deleting data", "Copying data", "Compressing data"],
            correctAnswer: "Converting data into a coded format",
          },
        ],
      ],
    },
  },
  "cloud computing": {
    1: {
      questionSets: [
        [
          {
            id: "cloud-1-1-1",
            question: "What is cloud computing?",
            options: [
              "Delivery of computing services over the internet",
              "Computing in the sky",
              "A programming language",
              "A database system",
            ],
            correctAnswer: "Delivery of computing services over the internet",
          },
          {
            id: "cloud-1-1-2",
            question: "Which of the following is a cloud service model?",
            options: ["SaaS", "PaaS", "IaaS", "All of the above"],
            correctAnswer: "All of the above",
          },
          {
            id: "cloud-1-1-3",
            question: "What does SaaS stand for?",
            options: ["Software as a Service", "System as a Service", "Storage as a Service", "Security as a Service"],
            correctAnswer: "Software as a Service",
          },
          {
            id: "cloud-1-1-4",
            question: "Which company provides AWS?",
            options: ["Google", "Microsoft", "Amazon", "IBM"],
            correctAnswer: "Amazon",
          },
          {
            id: "cloud-1-1-5",
            question: "What is the main advantage of cloud computing?",
            options: ["Scalability and cost-effectiveness", "Faster internet", "Better graphics", "More storage space"],
            correctAnswer: "Scalability and cost-effectiveness",
          },
        ],
      ],
    },
  },
  "data science": {
    1: {
      questionSets: [
        [
          {
            id: "ds-sci-1-1-1",
            question: "What is data science?",
            options: [
              "Extracting insights from data using scientific methods",
              "A programming language",
              "A database system",
              "A web framework",
            ],
            correctAnswer: "Extracting insights from data using scientific methods",
          },
          {
            id: "ds-sci-1-1-2",
            question: "Which programming language is most popular in data science?",
            options: ["Java", "C++", "Python", "JavaScript"],
            correctAnswer: "Python",
          },
          {
            id: "ds-sci-1-1-3",
            question: "What is big data?",
            options: [
              "Large, complex datasets that require special tools",
              "Important data",
              "Expensive data",
              "Secure data",
            ],
            correctAnswer: "Large, complex datasets that require special tools",
          },
          {
            id: "ds-sci-1-1-4",
            question: "What are the 3 V's of big data?",
            options: [
              "Volume, Velocity, Variety",
              "Value, Version, Validation",
              "Visual, Virtual, Verified",
              "Variable, Vector, Vertex",
            ],
            correctAnswer: "Volume, Velocity, Variety",
          },
          {
            id: "ds-sci-1-1-5",
            question: "What is data visualization?",
            options: [
              "Graphical representation of data",
              "Data storage method",
              "Data encryption technique",
              "Data compression method",
            ],
            correctAnswer: "Graphical representation of data",
          },
        ],
      ],
    },
  },
  blockchain: {
    1: {
      questionSets: [
        [
          {
            id: "block-1-1-1",
            question: "What is blockchain?",
            options: [
              "A distributed ledger technology",
              "A programming language",
              "A database system",
              "A web framework",
            ],
            correctAnswer: "A distributed ledger technology",
          },
          {
            id: "block-1-1-2",
            question: "What is a block in blockchain?",
            options: ["A container of transactions", "A programming function", "A database table", "A web page"],
            correctAnswer: "A container of transactions",
          },
          {
            id: "block-1-1-3",
            question: "What is Bitcoin?",
            options: [
              "A cryptocurrency based on blockchain",
              "A programming language",
              "A database system",
              "A web browser",
            ],
            correctAnswer: "A cryptocurrency based on blockchain",
          },
          {
            id: "block-1-1-4",
            question: "What is mining in blockchain?",
            options: [
              "Process of validating transactions and adding blocks",
              "Extracting data from blocks",
              "Creating new cryptocurrencies",
              "Deleting old transactions",
            ],
            correctAnswer: "Process of validating transactions and adding blocks",
          },
          {
            id: "block-1-1-5",
            question: "What is a smart contract?",
            options: [
              "Self-executing contract with terms directly written into code",
              "A legal document",
              "A database query",
              "A web service",
            ],
            correctAnswer: "Self-executing contract with terms directly written into code",
          },
        ],
      ],
    },
  },
  devops: {
    1: {
      questionSets: [
        [
          {
            id: "devops-1-1-1",
            question: "What is DevOps?",
            options: [
              "A set of practices combining software development and IT operations",
              "A programming language",
              "A database system",
              "A web framework",
            ],
            correctAnswer: "A set of practices combining software development and IT operations",
          },
          {
            id: "devops-1-1-2",
            question: "What is CI/CD?",
            options: [
              "Continuous Integration/Continuous Deployment",
              "Computer Integration/Computer Deployment",
              "Code Integration/Code Deployment",
              "Cloud Integration/Cloud Deployment",
            ],
            correctAnswer: "Continuous Integration/Continuous Deployment",
          },
          {
            id: "devops-1-1-3",
            question: "Which tool is commonly used for containerization?",
            options: ["Git", "Docker", "Jenkins", "Ansible"],
            correctAnswer: "Docker",
          },
          {
            id: "devops-1-1-4",
            question: "What is Infrastructure as Code (IaC)?",
            options: [
              "Managing infrastructure through code",
              "Writing code for infrastructure",
              "Infrastructure documentation",
              "Infrastructure testing",
            ],
            correctAnswer: "Managing infrastructure through code",
          },
          {
            id: "devops-1-1-5",
            question: "Which tool is used for version control?",
            options: ["Docker", "Jenkins", "Git", "Kubernetes"],
            correctAnswer: "Git",
          },
        ],
      ],
    },
  },
}

// Function to get quiz attempt count from headers or generate random
function getQuizAttemptNumber(request: NextRequest, topic: string, level: number): number {
  // Try to get from custom header (if frontend tracks attempts)
  const attemptHeader = request.headers.get("x-quiz-attempt")
  if (attemptHeader) {
    return Number.parseInt(attemptHeader, 10) || 1
  }

  // Generate a consistent attempt number based on topic, level, and current time
  // This ensures some variation while being somewhat predictable
  const seed = `${topic}-${level}-${Math.floor(Date.now() / (1000 * 60 * 60 * 24))}` // Changes daily
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash % 4) + 1 // Returns 1-4
}

// Improved function to check if Gemini API key is valid
function isValidGeminiKey(key: string | undefined): boolean {
  if (!key) {
    console.log("🔍 No Gemini API key provided")
    return false
  }

  if (key.length < 30) {
    console.log("🔍 Gemini API key too short")
    return false
  }

  if (!key.startsWith("AIzaSy")) {
    console.log("🔍 Gemini API key doesn't start with AIzaSy")
    return false
  }

  // Check for common placeholder patterns
  const placeholderPatterns = ["your-gemini-api-key", "placeholder", "demo", "test", "example", "here"]

  const lowerKey = key.toLowerCase()
  for (const pattern of placeholderPatterns) {
    if (lowerKey.includes(pattern)) {
      console.log(`🔍 Gemini API key contains placeholder pattern: ${pattern}`)
      return false
    }
  }

  console.log("✅ Gemini API key appears valid")
  return true
}

// Generate fallback questions for any topic with rotation
function generateFallbackQuestions(topic: string, level: number, attemptNumber: number) {
  const topicKey = topic.toLowerCase().replace(/\s+/g, "")

  // Check if we have specific data for this topic
  if (FALLBACK_QUIZ_DATA[topicKey] && FALLBACK_QUIZ_DATA[topicKey][level]) {
    const questionSets = FALLBACK_QUIZ_DATA[topicKey][level].questionSets
    if (questionSets && questionSets.length > 0) {
      // Rotate through available question sets
      const setIndex = (attemptNumber - 1) % questionSets.length
      console.log(
        `📚 Using predefined questions for ${topic} level ${level}, set ${setIndex + 1}/${questionSets.length}`,
      )
      return questionSets[setIndex]
    }
  }

  // If no specific questions found, generate better generic ones
  console.log(`🎲 Generating improved generic questions for ${topic} level ${level}, attempt ${attemptNumber}`)

  const levelDescriptions = {
    1: "beginner",
    2: "intermediate",
    3: "advanced",
    4: "expert",
    5: "master",
  }

  const levelDesc = levelDescriptions[level as keyof typeof levelDescriptions] || "intermediate"

  // Generate different questions based on attempt number
  const questionVariations = [
    {
      question: `What is a fundamental concept you should know about ${topic} at ${levelDesc} level?`,
      options: [
        `Understanding basic ${topic} principles`,
        `Advanced ${topic} algorithms`,
        `${topic} design patterns`,
        `${topic} performance optimization`,
      ],
      correctAnswer: `Understanding basic ${topic} principles`,
    },
    {
      question: `Which skill is most important when learning ${topic}?`,
      options: [
        "Practice and hands-on experience",
        "Memorizing syntax",
        "Reading documentation only",
        "Watching videos",
      ],
      correctAnswer: "Practice and hands-on experience",
    },
    {
      question: `What is a common challenge beginners face with ${topic}?`,
      options: ["Understanding core concepts", "Finding resources", "Setting up environment", "All of the above"],
      correctAnswer: "All of the above",
    },
    {
      question: `How can you improve your ${topic} skills?`,
      options: ["Build projects", "Read books only", "Watch tutorials only", "Memorize code"],
      correctAnswer: "Build projects",
    },
    {
      question: `What makes ${topic} valuable in today's technology landscape?`,
      options: ["High demand and practical applications", "Easy to learn", "No competition", "Quick results"],
      correctAnswer: "High demand and practical applications",
    },
  ]

  // Select questions based on attempt number to provide variety
  const startIndex = ((attemptNumber - 1) * 2) % questionVariations.length
  const selectedQuestions = []

  for (let i = 0; i < 5; i++) {
    const questionIndex = (startIndex + i) % questionVariations.length
    const baseQuestion = questionVariations[questionIndex]

    selectedQuestions.push({
      id: `${topicKey}-${level}-${attemptNumber}-${i + 1}`,
      question: baseQuestion.question,
      options: baseQuestion.options,
      correctAnswer: baseQuestion.correctAnswer,
    })
  }

  return selectedQuestions
}

export async function POST(request: NextRequest) {
  try {
    const { topic, level } = await request.json()

    console.log(`🎯 Quiz request: ${topic} (Level ${level})`)

    if (!topic || !level) {
      return NextResponse.json({ error: "Topic and level are required" }, { status: 400 })
    }

    // Get attempt number for question rotation
    const attemptNumber = getQuizAttemptNumber(request, topic, level)
    console.log(`🔄 Quiz attempt number: ${attemptNumber}`)

    // Get environment variables with fallbacks
    const geminiApiKey = process.env.GEMINI_API_KEY || "AIzaSyAlM_FhGm0UpcKKUCdwQjBI9B419TGzmMY"

    // Check if we should use AI or fallback
    const useAI = isValidGeminiKey(geminiApiKey)

    if (useAI) {
      try {
        console.log("🤖 Attempting to generate quiz with Gemini AI...")

        const prompt = `Generate exactly 5 multiple choice questions about ${topic} at ${level === 1 ? "beginner" : level === 2 ? "intermediate" : level === 3 ? "advanced" : "expert"} level.

Requirements:
- Each question should have exactly 4 options
- Questions should be practical and test real understanding
- Avoid overly theoretical or trick questions
- Make sure questions are relevant to ${topic}
- Vary question difficulty within the level
- Include both conceptual and practical questions

Return ONLY a JSON array in this exact format:
[
  {
    "id": "unique-id-1",
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Option A"
  }
]

Topic: ${topic}
Level: ${level === 1 ? "Beginner" : level === 2 ? "Intermediate" : level === 3 ? "Advanced" : "Expert"}
Attempt: ${attemptNumber} (make questions different from previous attempts)`

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: prompt,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 2048,
              },
            }),
          },
        )

        if (!response.ok) {
          throw new Error(`Gemini API error: ${response.status}`)
        }

        const data = await response.json()

        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
          const generatedText = data.candidates[0].content.parts[0].text
          console.log("📝 Raw Gemini response:", generatedText.substring(0, 200) + "...")

          // Clean and parse the JSON
          let cleanedText = generatedText.trim()

          // Remove markdown code blocks if present
          cleanedText = cleanedText.replace(/```json\s*/g, "").replace(/```\s*/g, "")

          // Remove any text before the first [ and after the last ]
          const startIndex = cleanedText.indexOf("[")
          const endIndex = cleanedText.lastIndexOf("]")

          if (startIndex !== -1 && endIndex !== -1) {
            cleanedText = cleanedText.substring(startIndex, endIndex + 1)
          }

          try {
            const questions = JSON.parse(cleanedText)

            if (Array.isArray(questions) && questions.length === 5) {
              // Validate question structure
              const validQuestions = questions.every(
                (q) =>
                  q.id &&
                  q.question &&
                  Array.isArray(q.options) &&
                  q.options.length === 4 &&
                  q.correctAnswer &&
                  q.options.includes(q.correctAnswer),
              )

              if (validQuestions) {
                console.log("✅ Successfully generated AI quiz questions")
                return NextResponse.json({ questions })
              } else {
                console.log("❌ AI questions failed validation")
              }
            } else {
              console.log("❌ AI response doesn't contain 5 questions")
            }
          } catch (parseError) {
            console.log("❌ Failed to parse AI response as JSON:", parseError)
          }
        }

        throw new Error("Invalid AI response format")
      } catch (aiError) {
        console.log("❌ AI generation failed:", aiError)
        console.log("🔄 Falling back to predefined questions...")
      }
    } else {
      console.log("🔄 Using fallback questions (no valid Gemini API key)")
    }

    // Use fallback questions with rotation
    const questions = generateFallbackQuestions(topic, level, attemptNumber)

    return NextResponse.json({
      questions,
      source: "fallback",
      attempt: attemptNumber,
    })
  } catch (error) {
    console.error("❌ Quiz generation error:", error)
    return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 })
  }
}
