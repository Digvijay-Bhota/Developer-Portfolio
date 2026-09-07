export const projectsData = [
  // TIER A - SELECTED WORK
  {
    id: 1,
    slug: 'chopal-orchard',
    title: 'Chopal Orchard',
    summary: 'Premium e-commerce platform for an apple orchard with batch traceability and B2B integration.',
    category: 'Full-Stack',
    featured: true,
    status: 'Production',
    tier: 'A',
    tech: ['Next.js 14', 'PostgreSQL', 'Prisma', 'Redis', 'Razorpay', 'Tailwind CSS'],
    github: 'https://github.com/Digvijay-Bhota/chopal-orchard-website-complete',
    link: 'https://chopal-orchard-website-complete.vercel.app',
    primaryImage: '',
    secondaryImages: [],
    emoji: '🍎',
    color: '#ef4444',
    problem: 'The orchard needed a direct-to-consumer sales channel capable of handling high-traffic seasonal orders, secure payments, and a batch traceability system to verify apple origins.',
    approach: 'Built a full-stack Next.js 14 application with server-side rendering for SEO. Integrated PostgreSQL via Prisma for robust inventory management and Upstash Redis for caching external APIs to prevent rate limits.',
    architectureDiagramDef: `Client
↓
Next.js Application
↓
API Routes
↓
Prisma
↓
PostgreSQL

External integrations:
- Upstash Redis
- Razorpay
- Cloudinary
- Notifications`,
    keyDecisions: [
      'Implemented Upstash Redis to cache OpenWeatherMap API responses, preventing free-tier rate limits during high traffic.',
      'Used Next.js API Routes coupled with Prisma to eliminate the need for a separate Node backend.',
      'Secured payments via Razorpay with server-side webhook verification to prevent client-side tampering.'
    ],
    challenges: [
      { label: 'High-Traffic API Limits', solution: 'Added Redis caching layer with TTL to serve weather/proxy data without hitting external APIs constantly.' },
      { label: 'Payment Verification', solution: 'Implemented robust server-side Razorpay webhook handlers to ensure transactional integrity.' }
    ],
    metrics: [],
    lessonLearned: 'Caching is critical even for seemingly simple third-party API integrations when traffic spikes are expected.'
  },
  {
    id: 2,
    slug: 'chanshal-camping',
    title: 'Chanshal Camping & Trekking',
    summary: 'Full-stack property and booking management platform for camping and trekking adventures.',
    category: 'Full-Stack',
    featured: true,
    status: 'Active',
    tier: 'A',
    tech: ['React 19', 'Node.js', 'Express', 'PostgreSQL', 'Vite', 'Razorpay'],
    github: 'https://github.com/Digvijay-Bhota/chanshal-camping-and-trekking',
    link: '',
    primaryImage: '',
    secondaryImages: [],
    emoji: '🏕️',
    color: '#10b981',
    problem: 'Managing camping inventory and tracking capacity availability on specific dates required a robust backend rather than generic booking software.',
    approach: 'Developed a decoupled architecture with a React/Vite frontend and a Node.js/Express backend. Designed a custom PostgreSQL schema to track availability and capacity on a per-date basis.',
    architectureDiagramDef: `React Client
↓
Express API
↓
PostgreSQL

External:
- Razorpay`,
    keyDecisions: [
      'Separated frontend and backend architectures (deployed to Vercel and Render respectively) to allow independent scaling.',
      'Designed PostgreSQL schema specifically to handle complex availability logic and prevent overbooking.',
      'Implemented JWT-based authentication for the admin dashboard to secure inventory operations.'
    ],
    challenges: [
      { label: 'Capacity Management', solution: 'Modeled database relationships to accurately reflect date-specific camp availability and capacity.' }
    ],
    metrics: [],
    lessonLearned: 'Database modeling is the foundation of a booking system; getting the schema right prevents race conditions and overbooking.'
  },
  {
    id: 3,
    slug: 'documind',
    title: 'DocuMind (AI Doc Scanner)',
    summary: 'AI-powered document scanner that extracts text from images/PDFs and generates structured summaries.',
    category: 'AI / ML',
    featured: true,
    status: 'Completed',
    tier: 'A',
    tech: ['React', 'Express', 'PostgreSQL', 'Tesseract.js', 'Gemini AI', 'JWT'],
    github: 'https://github.com/Digvijay-Bhota/ai-doc-scanner',
    link: '',
    primaryImage: '',
    secondaryImages: [],
    emoji: '📄',
    color: '#3b82f6',
    problem: 'Users needed a seamless way to extract actionable insights and structured summaries from static images and large PDF documents.',
    approach: 'Built a multi-modal processing pipeline in Node.js. It routes images to Tesseract.js for OCR and documents to pdf-parse, then pipes the extracted text to Google Gemini AI for structured summarization.',
    architectureDiagramDef: `React Client
↓
Express API
↓
OCR / PDF Processing
↓
Gemini
↓
PostgreSQL`,
    keyDecisions: [
      'Used server-side OCR (Tesseract.js) to offload heavy processing from the client browser.',
      'Integrated Google Gemini AI for reliable structured output and sentiment analysis.',
      'Secured the API with Helmet, Express Rate Limiting, and JWT authentication.'
    ],
    challenges: [
      { label: 'Multi-format Parsing', solution: 'Abstracted the parsing logic to handle images (OCR) and PDFs differently before sending a unified text stream to the LLM.' }
    ],
    metrics: [],
    lessonLearned: 'Building robust AI pipelines requires strong error handling for when external LLMs or OCR engines fail to process obscure inputs.'
  },

  // TIER B - ENGINEERING INFRASTRUCTURE
  {
    id: 4,
    slug: 'codeforge-ai',
    title: 'CodeForge AI',
    summary: 'Engineering foundation for an autonomous software-engineering AI agent platform.',
    category: 'Backend / Infrastructure',
    featured: false,
    status: 'Phase 0',
    tier: 'B',
    tech: ['FastAPI', 'Python', 'PostgreSQL', 'Pytest', 'Ruff', 'Mypy'],
    github: 'https://github.com/Digvijay-Bhota/codeforge-ai',
    link: '',
    primaryImage: '',
    secondaryImages: [],
    emoji: '🤖',
    color: '#8b5cf6',
    problem: 'Building autonomous AI coding agents requires a rock-solid, observable, and secure backend foundation before intelligent features can be safely added.',
    approach: 'Developed the Phase 0 infrastructure using FastAPI and Pydantic. Implemented rigorous static analysis and CI pipelines to ensure absolute architectural discipline.',
    architectureDiagramDef: '',
    keyDecisions: [
      'Enforced strict typing with Mypy and linting with Ruff from Day 1 to prevent technical debt in a complex agentic system.',
      'Used Pydantic Settings for environment-variable-driven configuration without hard-coded secrets.',
      'Set up Pytest with asyncio support to prepare for heavy asynchronous LLM API calls.'
    ],
    challenges: [],
    metrics: [],
    lessonLearned: 'A strong engineering foundation with strict CI/CD and linting is critical before writing the actual "AI" logic.'
  },
  {
    id: 5,
    slug: 'ai-news-intelligence',
    title: 'AI News Intelligence',
    summary: 'Cloudflare Workers edge API for high-performance data aggregation.',
    category: 'Backend / Infrastructure',
    featured: false,
    status: 'Phase 0',
    tier: 'B',
    tech: ['Cloudflare Workers', 'Hono', 'D1', 'KV', 'TypeScript'],
    github: 'https://github.com/Digvijay-Bhota/ai-news-intelligence',
    link: '',
    primaryImage: '',
    secondaryImages: [],
    emoji: '📰',
    color: '#f59e0b',
    problem: 'News aggregation APIs require ultra-low latency, aggressive caching, and robust security to prevent malicious scraping.',
    approach: 'Architected an edge-first API using Cloudflare Workers and Hono. Integrated D1 for SQL storage and KV namespaces for sub-millisecond caching.',
    architectureDiagramDef: '',
    keyDecisions: [
      'Adopted Cloudflare Workers for global low-latency execution and zero cold starts.',
      'Implemented HMAC signatures and Nonce replay protection to secure internal endpoints.',
      'Used TypeScript and Vitest to ensure type safety and testability in the edge environment.'
    ],
    challenges: [],
    metrics: [],
    lessonLearned: 'Building for the edge requires rethinking state and database access patterns compared to traditional Node servers.'
  },

  // TIER C - SUPPORTING PROJECTS
  {
    id: 6,
    slug: 'amazon-project',
    title: 'Amazon Project',
    summary: 'Interactive frontend e-commerce clone focusing on Vanilla JS DOM manipulation.',
    category: 'Frontend',
    featured: false,
    status: 'Learning',
    tier: 'C',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    github: 'https://github.com/Digvijay-Bhota/amazon-project',
    link: '',
    primaryImage: '',
    secondaryImages: [],
    emoji: '🛒',
    color: '#f97316',
    problem: 'Practicing pure JavaScript DOM manipulation, state management, and HTML generation without relying on modern frameworks.',
    approach: 'Built an interactive cart and checkout flow using Vanilla JavaScript. Focused on cleanly saving data, generating dynamic HTML, and managing interactive UI states.',
    architectureDiagramDef: '',
    keyDecisions: [],
    challenges: [],
    metrics: [],
    lessonLearned: 'Building complex UIs without React highlights exactly why modern component-based frameworks were invented.'
  },
  {
    id: 7,
    slug: 'airbnb-clone',
    title: 'Airbnb Clone',
    summary: 'Frontend clone of Airbnb built to practice complex UI components and date picking.',
    category: 'Frontend',
    featured: false,
    status: 'Learning',
    tier: 'C',
    tech: ['React', 'Material UI', 'react-date-range'],
    github: 'https://github.com/Digvijay-Bhota/airbnb-clone',
    link: '',
    primaryImage: '',
    secondaryImages: [],
    emoji: '🏠',
    color: '#ec4899',
    problem: 'Learning to integrate advanced UI component libraries and manage complex date-range states.',
    approach: 'Developed a responsive frontend using React and Material UI, integrating react-date-range for the booking experience.',
    architectureDiagramDef: '',
    keyDecisions: [],
    challenges: [],
    metrics: [],
    lessonLearned: 'Material UI drastically speeds up development but requires careful custom styling to avoid looking generic.'
  },
  {
    id: 8,
    slug: 'todo-app',
    title: 'Todo App',
    summary: 'Minimalist task management application focusing on fast interactions.',
    category: 'Frontend',
    featured: false,
    status: 'Learning',
    tier: 'C',
    tech: ['React 19', 'Vite', 'Supabase', 'Framer Motion'],
    github: 'https://github.com/Digvijay-Bhota/todo-app',
    link: '',
    primaryImage: '',
    secondaryImages: [],
    emoji: '✅',
    color: '#06b6d4',
    problem: 'Needed a playground for testing React 19 features, Vite tooling, and Supabase integration.',
    approach: 'Built a highly interactive list with Framer Motion for fluid animations and Supabase for persistent data storage.',
    architectureDiagramDef: '',
    keyDecisions: [],
    challenges: [],
    metrics: [],
    lessonLearned: 'Supabase provides an incredibly fast path from frontend prototyping to a real persistent database.'
  }
];

export function getProjectBySlug(slug) {
  return projectsData.find(p => p.slug === slug);
}
