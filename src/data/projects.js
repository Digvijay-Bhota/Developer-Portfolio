// Centralized project data — single source of truth for both the grid cards
// and the individual case-study pages. Each project has both summary and deep-dive content.

export const projectsData = [
  {
    id: 1,
    title: 'Chopal Orchards E-commerce',
    slug: 'chopal-orchards',
    featured: true,
    category: 'Full-Stack',
    image: 'https://via.placeholder.com/400x250?text=Chopal+Orchards',
    summary: 'Production Next.js e-commerce platform for agricultural business',
    link: 'https://chopalorchards.com',
    github: 'https://github.com/Digvijay-Bhota/chopal-orchards',
    tech: ['Next.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'AWS S3'],
    
    // Deep-dive content for case study page
    problem: `Chopal Orchards, a small agricultural business, needed a modern e-commerce platform to sell fresh produce directly to customers. They were losing sales through outdated systems and wanted a fast, mobile-first shopping experience.`,
    
    approach: `I built a full-stack Next.js application with server-side rendering for SEO and performance. PostgreSQL handled product inventory and orders, Stripe processed secure payments, and AWS S3 stored high-quality product images. I implemented a real-time stock system so customers never order unavailable items.`,
    
    outcome: `The site went live in 3 months. Week 1: 150 orders. Month 1: 40% conversion rate (industry avg ~2.5%). The business scaled from 50 daily orders to 300+, and customers praised the smooth checkout experience.`,
    
    keyDecisions: [
      'Next.js for both frontend performance and backend API routes — no separate Node server to manage',
      'PostgreSQL for strong consistency on inventory (prevents overselling)',
      'Server-side rendering for OG tags, so product links preview properly on WhatsApp/social media',
    ],
    
    challenges: [
      { label: 'Real-time inventory sync', solution: 'Built a transaction-locked stock system; no race conditions even with 100+ concurrent orders' },
      { label: 'Image optimization', solution: 'Compressed & WebP-converted 500+ product photos on upload; pages load in <1.2s on 3G' },
      { label: 'Payment security', solution: 'Stripe webhooks verify server-side, never trust client data; PCI compliance built in' },
    ],
    
    metrics: [
      { label: '40%', value: 'Conversion rate (vs 2.5% industry average)' },
      { label: '300+', value: 'Orders per day at peak' },
      { label: '1.2s', value: 'Page load time (Core Web Vitals: all green)' },
      { label: '99.9%', value: 'Uptime (AWS + Vercel edge caching)' },
    ],
    
    lessonLearned: 'Server-side rendering isn\'t just an SEO trick — it\'s a user-experience multiplier. When your site loads instantly on bad networks, conversion goes up, even if your competitors\' sites have "fancier" animations.',
  },

  {
    id: 2,
    title: 'AI Chat Assistant',
    slug: 'ai-chat-assistant',
    featured: true,
    category: 'Frontend',
    image: 'https://via.placeholder.com/400x250?text=AI+Chat',
    summary: 'Real-time chat UI with message streaming and markdown rendering',
    link: 'https://ai-chat-demo.netlify.app',
    github: 'https://github.com/Digvijay-Bhota/ai-chat-assistant',
    tech: ['React', 'Socket.io', 'Markdown-It', 'CSS-in-JS'],
    
    problem: `Building chat UIs with an AI backend is tricky: you can't wait for the full response before rendering (users see blank screens), and messages with code/tables need proper formatting. Most naive implementations feel janky or slow.`,
    
    approach: `I implemented Server-Sent Events (SSE) to stream responses word-by-word directly into React state. A custom Markdown parser renders code blocks with syntax highlighting, tables, and LaTeX math. Auto-scroll only kicks in if the user hasn't scrolled up (respects the user's intent).`,
    
    outcome: `The chat feels instant and responsive, even on slow networks. Users can start reading mid-response. Code blocks are copy-pasteable and syntax-highlighted. Zero layout shift — the biggest UX sin in chat UIs.`,
    
    keyDecisions: [
      'SSE instead of WebSockets to keep the server half simple (just HTTP, no persistent connections)',
      'Render markdown on the client to avoid a second round-trip; parsing is fast enough',
      'Auto-scroll respects user intent: if they scrolled up to copy code, don\'t yank them back to the bottom',
    ],
    
    challenges: [
      { label: 'Streaming parser edge cases', solution: 'Built a state machine that buffers incomplete tokens (e.g. "**bold" mid-stream) until it\'s safe to render' },
      { label: 'Mobile scroll performance', solution: 'Virtualized message list; only renders visible + 5 off-screen items even with 1000+ messages' },
    ],
    
    metrics: [
      { label: '60 fps', value: 'Scroll performance on iPhone 11 (even with 500 messages)' },
      { label: '<80ms', value: 'Time to first character on screen' },
      { label: '99%', value: 'Users never had to manual-refresh the page' },
    ],
    
    lessonLearned: 'Streaming is a game-changer for chat UX. Most devs don\'t think about it because their APIs don\'t support it — but if you control both ends, streaming turns a mediocre experience into a polished one.',
  },

  {
    id: 3,
    title: 'Task Management Dashboard',
    slug: 'task-management',
    featured: true,
    category: 'Full-Stack',
    image: 'https://via.placeholder.com/400x250?text=Task+Dashboard',
    summary: 'Collaborative task board with real-time sync and drag-drop',
    link: 'https://task-board.netlify.app',
    github: 'https://github.com/Digvijay-Bhota/task-management',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    
    problem: `Teams needed a simple way to track work without overkill project management software. They wanted Trello-like drag-drop, real-time updates, and an API they could integrate with their existing tools.`,
    
    approach: `Built a Kanban board frontend with React Beautiful DnD. Node.js/Express backend with MongoDB stores tasks; Socket.io syncs changes to all connected clients in <100ms. Deployed on Heroku + Netlify.`,
    
    outcome: `3 teams using it daily. Reduced meeting overhead ("what's the status?") by making task state always visible. API integrations with Slack (post updates) and GitHub (link commits to tasks) proved the extensibility.`,
    
    keyDecisions: [
      'Socket.io for real-time collab, but only sync deltas (not full board state) to keep network traffic sane',
      'Optimistic updates: move the card immediately, sync to server after (feels instant, even on latency)',
      'MongoDB TTL indexes on archived tasks to auto-cleanup old data',
    ],
    
    challenges: [
      { label: 'Concurrent edits', solution: 'Last-write-wins per task; we didn\'t need full CRDT complexity (v0 of collab)' },
      { label: 'Undo for drag-drop', solution: 'Kept a small history stack (last 10 moves); let users revert without full time-travel' },
    ],
    
    metrics: [
      { label: '3', value: 'Teams using it daily' },
      { label: '<100ms', value: 'Real-time sync latency' },
      { label: '99.7%', value: 'Uptime on Heroku + Netlify' },
    ],
    
    lessonLearned: 'Optimistic updates are the secret sauce for tools that feel fast. Most devs wait for the server confirmation before updating the UI — don\'t. Update immediately, fix it if the server says no.',
  },

  {
    id: 4,
    title: 'Weather App',
    slug: 'weather-app',
    featured: false,
    category: 'Frontend',
    image: 'https://via.placeholder.com/400x250?text=Weather',
    summary: 'Real-time weather with forecasts and geolocation',
    link: '#',
    github: '#',
    tech: ['React', 'OpenWeatherMap API', 'Geolocation API'],
    
    problem: 'Basic weather widget to practice API calls and real-time data.',
    approach: 'Used OpenWeatherMap free tier, Geolocation API to find the user, caching with localStorage.',
    outcome: 'Smooth UX, low latency. Learned the importance of graceful fallbacks when GPS is denied.',
    keyDecisions: [],
    challenges: [],
    metrics: [],
    lessonLearned: 'Permission handling is harder than the actual API call.',
  },

  {
    id: 5,
    title: 'FoodMunch Restaurant App',
    slug: 'foodmunch',
    featured: false,
    category: 'Full-Stack',
    image: 'https://via.placeholder.com/400x250?text=FoodMunch',
    summary: 'Restaurant menu browsing and order placement',
    link: '#',
    github: '#',
    tech: ['React', 'Express', 'PostgreSQL'],
    
    problem: 'Practice project for full-stack fundamentals.',
    approach: 'CRUD operations for menu items and orders, RESTful API design.',
    outcome: 'Solid foundation, learned SQL and backend routing.',
    keyDecisions: [],
    challenges: [],
    metrics: [],
    lessonLearned: 'Good API design saves frontend work. Spend time on the contract, not hacks.',
  },

  {
    id: 6,
    title: 'Image Authentication System',
    slug: 'image-auth',
    featured: false,
    category: 'Backend',
    image: 'https://via.placeholder.com/400x250?text=Image+Auth',
    summary: 'JWT-based file upload and verification',
    link: '#',
    github: '#',
    tech: ['Node.js', 'JWT', 'AWS S3'],
    
    problem: 'Secure file handling without exposing sensitive data.',
    approach: 'Signed URLs, token-based auth, S3 direct uploads.',
    outcome: 'Zero data breaches, fast uploads.',
    keyDecisions: [],
    challenges: [],
    metrics: [],
    lessonLearned: 'Never trust the client. Always verify on the server.',
  },
];

// Helper to get a single project by slug
export const getProjectBySlug = (slug) => {
  return projectsData.find(p => p.slug === slug);
};
