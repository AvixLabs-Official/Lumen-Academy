/**
 * LUMEN ACADEMY - Courses, Instructors, Modules, & Quiz Data Model
 */

const INSTRUCTORS_DATA = [
  {
    id: "inst-01",
    name: "Maya Chen",
    role: "Lead Product Designer & UX Strategist",
    bio: "Ex-Design Lead at Stripe and Figma. Maya has spent 10+ years shaping digital products used by millions worldwide.",
    experience: "10+ Years Exp",
    rating: 4.9,
    students: "18,400+",
    coursesCount: 3,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "inst-02",
    name: "Arjun Rao",
    role: "Senior Frontend Architect",
    bio: "Full-stack developer and open-source contributor specializing in modern JavaScript, React, and performance engineering.",
    experience: "8+ Years Exp",
    rating: 4.85,
    students: "22,100+",
    coursesCount: 2,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "inst-03",
    name: "Rhea Sen",
    role: "Growth Marketing Director",
    bio: "Growth strategist helping scaling startups master customer acquisition, SEO, content architecture, and paid performance.",
    experience: "7+ Years Exp",
    rating: 4.78,
    students: "12,900+",
    coursesCount: 2,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "inst-04",
    name: "David Park",
    role: "Principal Data Scientist",
    bio: "Data consultant advising fintech and SaaS platforms on predictive modeling, SQL pipeline design, and Python analytics.",
    experience: "9+ Years Exp",
    rating: 4.88,
    students: "15,600+",
    coursesCount: 2,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "inst-05",
    name: "Ananya Kapoor",
    role: "Executive Career Coach",
    bio: "Founder of TalentLab. Ananya has coached over 3,000 design and engineering professionals into high-impact remote roles.",
    experience: "11+ Years Exp",
    rating: 4.92,
    students: "9,800+",
    coursesCount: 3,
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=400&auto=format&fit=crop"
  }
];

const COURSES_DATA = [
  {
    id: "crs-01",
    title: "UI/UX Design Fundamentals",
    category: "UI/UX Design",
    description: "Master wireframing, visual hierarchy, interaction design principles, and user research to create intuitive digital products.",
    instructorId: "inst-01",
    price: 2499,
    priceFormatted: "₹2,499",
    rating: 4.9,
    reviewCount: 420,
    students: 3450,
    duration: "8 hours",
    lessonsCount: 24,
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop",
    featured: true,
    modules: [
      {
        id: "mod-1",
        title: "Module 01: Foundations of User Experience",
        lessons: [
          { id: "les-101", title: "01. What is User Experience Design?", duration: "12 min", type: "video" },
          { id: "les-102", title: "02. Understanding User Research Basics", duration: "15 min", type: "video" },
          { id: "les-103", title: "03. Creating User Personas & Scenarios", duration: "18 min", type: "reading" },
          { id: "les-104", title: "04. Module 1 Knowledge Check Quiz", duration: "10 min", type: "quiz" }
        ]
      },
      {
        id: "mod-2",
        title: "Module 02: Visual Hierarchy & Wireframing",
        lessons: [
          { id: "les-201", title: "05. Principles of Visual Hierarchy", duration: "20 min", type: "video" },
          { id: "les-202", title: "06. Low-Fidelity vs High-Fidelity Wireframes", duration: "22 min", type: "video" },
          { id: "les-203", title: "07. Design Systems & Component Specs", duration: "25 min", type: "video" }
        ]
      }
    ]
  },
  {
    id: "crs-02",
    title: "Modern JavaScript from Zero",
    category: "Web Development",
    description: "Learn ES6+, asynchronous JavaScript, DOM manipulation, APIs, and modern code architecture from scratch.",
    instructorId: "inst-02",
    price: 3499,
    priceFormatted: "₹3,499",
    rating: 4.8,
    reviewCount: 380,
    students: 4120,
    duration: "12 hours",
    lessonsCount: 36,
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    featured: true,
    modules: [
      {
        id: "mod-1",
        title: "Module 01: JS Essentials & Data Types",
        lessons: [
          { id: "les-201", title: "01. Variables, Let, Const & Scope", duration: "14 min", type: "video" },
          { id: "les-202", title: "02. Functions & Arrow Expressions", duration: "18 min", type: "video" }
        ]
      }
    ]
  },
  {
    id: "crs-03",
    title: "Build Your First Website",
    category: "Web Development",
    description: "Step-by-step guide to building beautiful, responsive websites using HTML5, CSS3, and modern flexbox/grid layouts.",
    instructorId: "inst-02",
    price: 1499,
    priceFormatted: "₹1,499",
    rating: 4.9,
    reviewCount: 290,
    students: 2890,
    duration: "6 hours",
    lessonsCount: 20,
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    featured: false,
    modules: []
  },
  {
    id: "crs-04",
    title: "Digital Marketing Essentials",
    category: "Marketing",
    description: "Master modern digital channels: social media strategy, content marketing funnel design, and campaign analytics.",
    instructorId: "inst-03",
    price: 1999,
    priceFormatted: "₹1,999",
    rating: 4.7,
    reviewCount: 210,
    students: 1950,
    duration: "7 hours",
    lessonsCount: 22,
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    featured: false,
    modules: []
  },
  {
    id: "crs-05",
    title: "Data Analytics with Excel",
    category: "Data & Analytics",
    description: "Transform raw spreadsheets into actionable business insights with PowerQuery, Pivot Tables, and dynamic dashboards.",
    instructorId: "inst-04",
    price: 2199,
    priceFormatted: "₹2,199",
    rating: 4.8,
    reviewCount: 310,
    students: 2780,
    duration: "9 hours",
    lessonsCount: 28,
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    featured: true,
    modules: []
  },
  {
    id: "crs-06",
    title: "Product Design Thinking",
    category: "UI/UX Design",
    description: "Learn how top tech companies solve complex problems using empathy mapping, rapid prototyping, and user testing.",
    instructorId: "inst-01",
    price: 2799,
    priceFormatted: "₹2,799",
    rating: 4.9,
    reviewCount: 195,
    students: 1680,
    duration: "6 hours",
    lessonsCount: 18,
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop",
    featured: false,
    modules: []
  },
  {
    id: "crs-07",
    title: "Freelancing Fundamentals",
    category: "Career Skills",
    description: "How to position your services, price projects confidently, find high-paying clients, and build a sustainable freelance career.",
    instructorId: "inst-05",
    price: 999,
    priceFormatted: "₹999",
    rating: 4.8,
    reviewCount: 410,
    students: 3910,
    duration: "4 hours",
    lessonsCount: 15,
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    featured: false,
    modules: []
  },
  {
    id: "crs-08",
    title: "Business Strategy for Beginners",
    category: "Business",
    description: "Understand market analysis, unit economics, value propositions, and competitive moats for startup success.",
    instructorId: "inst-05",
    price: 1799,
    priceFormatted: "₹1,799",
    rating: 4.7,
    reviewCount: 160,
    students: 1420,
    duration: "5 hours",
    lessonsCount: 17,
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
    featured: false,
    modules: []
  },
  {
    id: "crs-09",
    title: "Figma for Real Projects",
    category: "UI/UX Design",
    description: "Master auto-layout, interactive prototyping, component variants, and design systems in Figma.",
    instructorId: "inst-01",
    price: 2299,
    priceFormatted: "₹2,299",
    rating: 4.9,
    reviewCount: 530,
    students: 4890,
    duration: "7 hours",
    lessonsCount: 25,
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    featured: true,
    modules: []
  },
  {
    id: "crs-10",
    title: "Python for Data Analysis",
    category: "Data & Analytics",
    description: "Data manipulation with Pandas, NumPy, and interactive data visualization with Matplotlib and Seaborn.",
    instructorId: "inst-04",
    price: 3999,
    priceFormatted: "₹3,999",
    rating: 4.8,
    reviewCount: 340,
    students: 3120,
    duration: "14 hours",
    lessonsCount: 42,
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    featured: false,
    modules: []
  },
  {
    id: "crs-11",
    title: "SEO That Actually Works",
    category: "Marketing",
    description: "Technical SEO, keyword research strategies, backlink outreach, and content optimization that ranks on Google.",
    instructorId: "inst-03",
    price: 1899,
    priceFormatted: "₹1,899",
    rating: 4.8,
    reviewCount: 245,
    students: 2150,
    duration: "6 hours",
    lessonsCount: 20,
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop",
    featured: false,
    modules: []
  },
  {
    id: "crs-12",
    title: "Career Portfolio Masterclass",
    category: "Career Skills",
    description: "Build an outstanding design or engineering portfolio, write compelling case studies, and crush senior interviews.",
    instructorId: "inst-05",
    price: 899,
    priceFormatted: "₹899",
    rating: 4.9,
    reviewCount: 380,
    students: 3410,
    duration: "3 hours",
    lessonsCount: 12,
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
    featured: false,
    modules: []
  }
];

const SAMPLE_QUIZ_DATA = {
  courseId: "crs-01",
  lessonId: "les-104",
  title: "Module 1 Knowledge Check Quiz",
  questions: [
    {
      id: "q1",
      question: "What is the primary goal of user research in UI/UX Design?",
      options: [
        "A. Create complex visual animations",
        "B. Understand user needs, behaviors, and pain points",
        "C. Write production database queries",
        "D. Choose high-contrast primary colors"
      ],
      correctAnswerIndex: 1
    },
    {
      id: "q2",
      question: "Which of the following best describes a User Persona?",
      options: [
        "A. A real living user's exact legal identification profile",
        "B. A fictional representation of a target user segment based on research data",
        "C. An employee avatar used in corporate chat tools",
        "D. A customer service chatbot script"
      ],
      correctAnswerIndex: 1
    },
    {
      id: "q3",
      question: "What distinguishes a low-fidelity wireframe from a high-fidelity mockup?",
      options: [
        "A. Low-fidelity focuses on layout and structure without visual styling details",
        "B. High-fidelity wireframes are written in C++ code",
        "C. Low-fidelity wireframes can only be drawn on physical paper",
        "D. There is no structural difference between them"
      ],
      correctAnswerIndex: 0
    }
  ]
};
