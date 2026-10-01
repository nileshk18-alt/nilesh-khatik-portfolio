
export const personalInfo = {
  fullName: "Khatik Nilesh Abasaheb",
  firstName: "Nilesh",
  lastName: "Khatik",
  role: "Computer Engineering Student & Full-Stack Developer",
  statusBadge: "Available for new opportunities",
  email: "nileshkhatik700@gmail.com",
  phone: "+91 9511866805",
  location: "SPPU, Maharashtra, India",
  college: "Savitribai Phule Pune University (SPPU)",
  cgpa: "9.071",
  profilePhoto: "/assets/images/nilesh-khatik.jpg",
  resumeUrl: "/resume/Nilesh_Resume_updated.pdf",
  summary:
    "Computer Engineering student with hands-on experience in MERN Stack development, Java, Python, MySQL, and MongoDB. Completed full-stack development internships and built real-world web applications involving frontend, backend, databases, APIs, and AI features. Strong interest in software development, problem solving, and responsive web applications.",
  aboutPitch:
    "Passionate Computer Engineering student with a strong foundation in full-stack architecture, data structures, and algorithms. Experienced in engineering complete web applications from intuitive client interfaces to scalable backend APIs and robust databases. Proven ability in collaborating across development teams during internships at SUMAGO INFOTECH, Kanak Digifex NexGen, and The Baap Company.",
};

export const navLinks = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "education", label: "Education", href: "#education" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const socialLinks = [
  {
    name: "GitHub",
    label: "github.com/nileshk18-alt",
    url: "https://github.com/nileshk18-alt",
    icon: "github",
  },
  {
    name: "LinkedIn",
    label: "linkedin.com/in/nilesh-khatik-03328632a",
    url: "https://linkedin.com/in/nilesh-khatik-03328632a",
    icon: "linkedin",
  },
  {
    name: "Email",
    label: "nileshkhatik700@gmail.com",
    url: "mailto:nileshkhatik700@gmail.com",
    icon: "mail",
  },
];

export const heroStats = [
  { label: "CGPA (SPPU)", value: "9.071" },
  { label: "Internships", value: "3" },
  { label: "Academic Projects", value: "10+" },
];

export const aboutCards = [
  {
    id: "full-stack",
    title: "Full-Stack Development",
    description: "Hands-on experience developing responsive web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js).",
    icon: "code",
  },
  {
    id: "core-engineering",
    title: "Computer Engineering",
    description: "B.E. student at SPPU with 9.071 CGPA, strong in Object-Oriented Programming, Data Structures & Algorithms.",
    icon: "graduation-cap",
  },
  {
    id: "certifications",
    title: "Full Stack Certified",
    description: "Formally certified in Full Stack Development with practical implementation of APIs, authentication, and databases.",
    icon: "award",
  },
  {
    id: "competitive-coding",
    title: "Coding Achievements",
    description: "Secured 3rd Rank in Blind Coding (Individual) and 2nd Rank in Debugging Competition (Group).",
    icon: "trophy",
  },
];

export const skillCategories = [
  {
    category: "Programming Languages",
    shortTitle: "PROGRAMMING",
    skills: [
      { name: "Python", level: "Proficient" },
      { name: "C++", level: "Proficient" },
      { name: "Java", level: "Beginner" },
    ],
  },
  {
    category: "Web & Frontend",
    shortTitle: "FRONTEND",
    skills: [
      { name: "HTML5", level: "Advanced" },
      { name: "CSS3", level: "Advanced" },
      { name: "JavaScript", level: "Advanced" },
      { name: "React.js", level: "Proficient" },
      { name: "Bootstrap", level: "Proficient" },
    ],
  },
  {
    category: "Backend & APIs",
    shortTitle: "BACKEND",
    skills: [
      { name: "Node.js", level: "Proficient" },
      { name: "Express.js", level: "Proficient" },
      { name: "REST APIs", level: "Proficient" },
    ],
  },
  {
    category: "Databases",
    shortTitle: "DATABASE",
    skills: [
      { name: "MongoDB", level: "Proficient" },
      { name: "MySQL", level: "Proficient" },
      { name: "Mongoose ODM", level: "Proficient" },
    ],
  },
  {
    category: "Tools & Core Concepts",
    shortTitle: "TOOLS & CONCEPTS",
    skills: [
      { name: "Git", level: "Proficient" },
      { name: "GitHub", level: "Proficient" },
      { name: "OOP", level: "Core Concept" },
      { name: "Data Structures & Algorithms", level: "Core Concept" },
    ],
  },
];

export const projects = [
  {
    id: "tradesense-ai",
    title: "TradeSense AI",
    subtitle: "Stock Market Analysis & Portfolio Management Platform",
    tagline: "Full-stack stock analysis platform with real-time market data, interactive financial charts, and simulated paper trading.",
    badge: "MERN + AI",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "AI Prediction"],
    points: [
      "Built a stock analysis platform using React.js, Node.js, Express.js, MongoDB, REST APIs, and interactive financial charts.",
      "Added market data, watchlists, virtual portfolios, P&L tracking, and paper trading with simulated buy/sell orders and portfolio management.",
      "Integrated RSI, MACD, moving averages, AI-based trend prediction, news sentiment, risk insights, and configurable market alerts.",
    ],
    githubUrl: "https://github.com/nileshk18-alt",
    liveDemoUrl: "#",
    featured: true,
    themeColor: "#FF5C35",
  },
  {
    id: "drivelux-ai",
    title: "DriveLux",
    subtitle: "AI Based Car Rental Web Application",
    tagline: "Full-stack car rental platform with dedicated user & admin dashboards, conflict-free booking, and dynamic pricing.",
    badge: "MERN Stack + AI",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT Auth", "AI"],
    points: [
      "Built a full-stack car rental platform using React.js, Node.js, Express.js, MongoDB, and Mongoose with user and admin dashboards.",
      "Added vehicle search, filtering, JWT authentication, booking management, conflict prevention, dynamic pricing, and role-based access.",
      "Integrated AI vehicle recommendations, demo payment options, PDF invoices, loyalty features, and booking management APIs.",
    ],
    githubUrl: "https://github.com/nileshk18-alt",
    liveDemoUrl: "#",
    featured: true,
    themeColor: "#18181B",
  },
  {
    id: "careernova",
    title: "CareerNova",
    subtitle: "Smart Recruitment & Career Management Platform",
    tagline: "AI-powered career platform designed to connect candidates with opportunities through intelligent resume analysis, skill matching, and career guidance.",
    badge: "AI & CareerTech",
    technologies: ["React.js", "Vite", "Tailwind CSS", "JavaScript", "Node.js", "Express.js", "MongoDB", "AI", "RAG"],
    points: [
      "Designed an AI-powered recruitment and career management platform with resume parsing, ATS scoring, skill extraction, and job-candidate matching.",
      "Planned intelligent career guidance features including skill-gap analysis, personalized learning roadmaps, AI-generated interview questions, and mock interview evaluation.",
      "Developed a scalable platform concept with recruiter dashboards, placement analytics, recommendation workflows, and an AI-powered RAG career assistant."
    ],
    githubUrl: "https://github.com/nileshk18-alt",
    liveDemoUrl: "#",
    featured: true,
    themeColor: "#FF5C35",
  },
  {
    id: "simon-says-game",
    title: "Simon Says Game",
    subtitle: "Interactive Memory & Sequence Game",
    tagline: "Interactive browser-based memory game designed to challenge users to remember and repeat increasingly complex sequences.",
    badge: "JavaScript Game",
    technologies: ["HTML5", "CSS3", "JavaScript", "DOM Manipulation", "Event Handling"],
    points: [
      "Developed an interactive Simon Says game where players memorize and reproduce dynamically generated color sequences.",
      "Implemented game-level progression, user input validation, score tracking, and game-over conditions using JavaScript.",
      "Designed a responsive and engaging interface with real-time visual feedback and interactive game controls."
    ],
    githubUrl: "https://nileshk18-alt.github.io/Mini-project/",
    liveDemoUrl: "#",
    featured: false,
    themeColor: "#FF5C35",
  },

];

export const internships = [
  {
    id: "the-baap-company",
    role: "Full-Stack Web Development Intern",
    company: "The Baap Company",
    period: "Aug 2026 – Nov 2026",
    badge: "Aug 2026 – Nov 2026",
    location: "Sangamner ,India",
    points: [
      "Working on real-world web applications across frontend, backend, database, and API development.",
      "Contributing to development, debugging, testing, and application improvements.",
    ],
    technologies: ["Full-Stack Development", "Backend APIs", "Database", "Debugging & Testing"],
  },
  {
    id: "kanak-digifex",
    role: "Full-Stack Web Developer Intern",
    company: "Kanak Digifex NexGen Pvt. Ltd.",
    period: "Apr 2026 – Jun 2026",
    badge: "Apr 2026 – Jun 2026 ",
    location: "Ahilyanager, India",
    points: [
      "Worked on client projects involving frontend and backend development.",
      "Assisted with debugging, testing, API development, and project implementation.",
      "Supported client coordination, project tasks, and development workflow.",
    ],
    technologies: ["Client Solutions", "Frontend", "Backend APIs", "Testing & Coordination"],
  },
  {
    id: "sumago-infotech",
    role: "Full-Stack Web Development Intern",
    company: "SUMAGO INFOTECH PVT LTD",
    period: "Jan 2026 – Feb 2026",
    badge: "Jan 2026 – Feb 2026 ",
    location: "Pune, India",
    points: [
      "Developed responsive full-stack web applications using the MERN Stack.",
      "Worked with React.js, Node.js, Express.js, MongoDB, and Bootstrap.",
      "Collaborated with team members using Git and GitHub for version control.",
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Bootstrap", "Git"],
  },
];

export const educationList = [
  {
    id: "b-e-engineering",
    degree: "B.E. Computer Engineering",
    institution: "Savitribai Phule Pune University (SPPU)",
    period: "2023 – 2027",
    score: "CGPA: 9.071",
    scoreDetail: "1st – 3rd Year Cumulative",
    current: true,
  },
  {
    id: "hsc-twelfth",
    degree: "XII (HSC)",
    institution: "Jr. College Kukana",
    period: "2023",
    score: "60.0%",
    scoreDetail: "Maharashtra State Board",
    current: false,
  },
  {
    id: "ssc-tenth",
    degree: "X (SSC)",
    institution: "S.M.P.M.V. Tarwadi",
    period: "2021",
    score: "85.2%",
    scoreDetail: "Maharashtra State Board",
    current: false,
  },
];

export const certifications = [
  {
    id: "full-stack-web-dev-cert",
    title: "Full Stack Web Development",
    issuer: "Apna College",
    course: "Delta (Full Stack Web Development)",
    credentialId: "6abbd18f679b92021d0d24a9",
    description: "End-to-end full-stack web development program completed through Apna College (Delta batch), covering React.js, Node.js, Express.js, MongoDB, REST APIs, and production deployment.",
    documentUrl: "/assets/certificates/full-stack-web-development-certificate.png",
    pdfUrl: "/assets/certificates/full-stack-web-development-certificate.pdf",
  },
  {
    id: "dsa-java-cert",
    title: "DSA with Java",
    issuer: "Apna College",
    course: "Alpha (DSA with Java)",
    credentialId: "6a7bfb7ab5a46a9fe60d68f0",
    description: "Comprehensive data structures and algorithms training in Java completed through Apna College (Alpha batch), covering recursion, binary trees, graphs, dynamic programming, and algorithmic optimization.",
    documentUrl: "/assets/certificates/dsa-java-certificate.png",
    pdfUrl: "/assets/certificates/dsa-java-certificate.pdf",
  },
  {
    id: "dsa-cpp-cert",
    title: "DSA with C++",
    issuer: "Apna College",
    course: "C++ DSA",
    credentialId: "6a7bfabf8449cce18b0ec6d6",
    description: "Intensive data structures and algorithms specialization in C++ completed through Apna College, covering Standard Template Library (STL), pointers, memory management, and competitive problem solving.",
    documentUrl: "/assets/certificates/dsa-cpp-certificate.png",
    pdfUrl: "/assets/certificates/dsa-cpp-certificate.pdf",
  },
];

export const achievements = [
  {
    id: "blind-coding",
    title: "3rd Rank – Blind Coding Competition",
    detail: "2nd Year (Individual)",
    description: "Achieved 3rd position solving algorithmic programming challenges without syntax highlighting or screen display assistance.",
  },
  {
    id: "debugging-comp",
    title: "2nd Rank – Debugging Competition",
    detail: "3rd Year (Group)",
    description: "Secured 2nd rank by rapidly identifying, troubleshooting, and patching edge-case logic bugs and runtime exceptions in complex codebases.",
  },
  {
    id: "kabaddi-champ",
    title: "Inter-Department Kabaddi Champion",
    detail: "1st & 3rd Year",
    description: "Represented the Computer Engineering department and secured champion titles demonstrating teamwork, endurance, and strategy.",
  },
];
