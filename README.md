# 🚀 Digvijay Bhota — Developer Portfolio

A fully-featured, animated personal portfolio built with **React 18** featuring:
- Particle canvas animation in the Hero
- Custom magnetic cursor
- Typewriter role cycling
- Scroll-reveal animations
- Skill bar animations
- Project filtering
- Contact form (EmailJS integration)
- Glassmorphism UI with glowing neon accents
- Fully responsive (mobile-first)

---

## 📁 Project Structure

```
portfolio/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Cursor.js / Cursor.css
│   │   ├── Loader.js / Loader.css
│   │   ├── Navbar.js / Navbar.css
│   │   ├── Hero.js / Hero.css
│   │   ├── About.js / About.css
│   │   ├── Skills.js / Skills.css
│   │   ├── Projects.js / Projects.css
│   │   ├── Contact.js / Contact.css
│   │   └── Footer.js / Footer.css
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

---

## ⚡ Quick Start (Local Development)

### Prerequisites
- **Node.js** v18+ ([download](https://nodejs.org))
- **npm** v9+ (comes with Node)
- **Git** ([download](https://git-scm.com))

### Step 1 — Clone or create the project

```bash
# If you have the zip:
unzip portfolio.zip && cd portfolio

# Or create fresh with Create React App:
npx create-react-app portfolio
cd portfolio
```

### Step 2 — Install dependencies

```bash
npm install
```

Or if you want to install all dependencies at once:

```bash
npm install react@18 react-dom@18 react-scripts@5 react-router-dom@6 framer-motion@11 @emailjs/browser react-icons
```

### Step 3 — Replace source files

Copy all files from `src/` and `public/` folders into your project.

### Step 4 — Add your personal assets

```bash
public/
├── Varsha_Resume.pdf     ← your actual CV
└── (optional) favicon.ico
```

### Step 5 — Run the development server

```bash
npm start
```

Opens **http://localhost:3000** — the app hot-reloads on file changes.

---

## 📧 Setting Up Contact Form with EmailJS

The contact form currently simulates sending. To make it real:

### Step 1 — Create a free account at [emailjs.com](https://emailjs.com)

### Step 2 — Create an Email Service (Gmail, Outlook, etc.)

### Step 3 — Create an Email Template

Use these template variables:
```
From: {{from_name}} ({{from_email}})
Subject: {{subject}}
Message: {{message}}
```

### Step 4 — Install EmailJS

```bash
npm install @emailjs/browser
```

### Step 5 — Update Contact.js

Replace the `handleSubmit` function in `src/components/Contact.js`:

```javascript
import emailjs from '@emailjs/browser';

const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus('sending');
  
  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',      // from EmailJS dashboard
      'YOUR_TEMPLATE_ID',     // from EmailJS dashboard
      {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
      },
      'YOUR_PUBLIC_KEY'       // from EmailJS Account > API Keys
    );
    setStatus('sent');
    setForm({ name: '', email: '', subject: '', message: '' });
  } catch (err) {
    console.error(err);
    setStatus('error');
  }
  
  setTimeout(() => setStatus('idle'), 4000);
};
```

---

## 🔧 Customization Guide

### Update your personal info

**Hero section** — `src/components/Hero.js`:
```javascript
// Change your name, roles, and stats
const ROLES = ['Full Stack Developer', 'React Specialist', ...];
```

**About section** — `src/components/About.js`:
```javascript
// Update highlights, bio text
const highlights = [
  { icon: '🚀', label: 'Projects Delivered', value: '10+' },
  ...
];
```

**Projects section** — `src/components/Projects.js`:
```javascript
// Add/edit your real projects
const projects = [
  {
    id: 1,
    title: 'Your Project Name',
    link: 'https://your-live-link.com',
    github: 'https://github.com/you/repo',
    ...
  }
];
```

**Contact section** — `src/components/Contact.js`:
```javascript
// Update your email, location, social links
const socials = [
  { label: 'GitHub', href: 'https://github.com/YOUR_USERNAME' },
  ...
];
```

### Change the color theme

In `src/App.css`, edit the CSS variables:
```css
:root {
  --accent-violet: #7c3aed;   /* main accent */
  --accent-cyan: #22d3ee;     /* secondary accent */
  --accent-pink: #ec4899;     /* highlights */
}
```

---

## 🏗️ Production Build

```bash
npm run build
```

Creates an optimized `build/` folder ready for deployment.

---

## 🌐 Deployment — Step by Step

---

### Option 1: Netlify (Recommended — Free)

**Method A: Drag and Drop (Easiest)**

1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com) → Sign up/Login
3. Drag the `build/` folder onto the Netlify dashboard
4. Done! Your site is live instantly 🎉

**Method B: Git + Auto-Deploy**

```bash
# 1. Initialize git
git init
git add .
git commit -m "Initial portfolio commit"

# 2. Push to GitHub
gh repo create digvijay-portfolio --public
git push -u origin main
```

3. Go to Netlify → **New site from Git**
4. Connect GitHub → Select your repo
5. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
6. Click **Deploy site**

Every `git push` auto-deploys! ✅

**Add custom domain on Netlify:**
1. Site Settings → Domain Management → Add custom domain
2. Follow DNS instructions

---

### Option 2: Vercel (Recommended — Free)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (from project root)
vercel

# Follow prompts:
# ? Set up and deploy "portfolio"? Y
# ? Which scope? Your username
# ? Link to existing project? N
# ? What's your project name? varsha-portfolio
# ? In which directory is your code located? ./
# ? Override build settings? N

# Production deploy:
vercel --prod
```

Or via dashboard:
1. Go to [vercel.com](https://vercel.com) → Import Project
2. Connect GitHub → Select repo
3. Framework: **Create React App** (auto-detected)
4. Click **Deploy**

---

### Option 3: GitHub Pages (Free)

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json:
```

In `package.json`, add:
```json
{
  "homepage": "https://YOUR_GITHUB_USERNAME.github.io/portfolio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

```bash
# Deploy
npm run deploy
```

Live at `https://YOUR_USERNAME.github.io/portfolio`

---

### Option 4: Firebase Hosting (Google Cloud — Free tier)

```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Initialize (in project root)
firebase init hosting

# Options:
# ? What do you want to use as your public directory? build
# ? Configure as single-page app? Yes
# ? Set up automatic builds with GitHub? No (or Yes for CI/CD)

# 4. Build
npm run build

# 5. Deploy
firebase deploy
```

---

## 🐳 Docker (Optional — for self-hosted servers)

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:
```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
# Build image
docker build -t digvijay-portfolio .

# Run locally
docker run -p 3000:80 digvijay-portfolio
```

---

## 🔒 Environment Variables

For sensitive keys (EmailJS, etc.), create `.env` in root:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

Access in code: `process.env.REACT_APP_EMAILJS_SERVICE_ID`

> ⚠️ Never commit `.env` to Git. Add it to `.gitignore`.

```bash
echo ".env" >> .gitignore
```

On Netlify/Vercel: Add env vars in dashboard → Site Settings → Environment Variables.

---

## 📊 Performance Tips

- Replace emoji avatars with your real photo: `<img src="/your-photo.jpg" alt="Digvijay" />`
- Add `loading="lazy"` to all images
- Use WebP images for better performance
- Add a `robots.txt` for SEO
- Add Open Graph meta tags in `public/index.html`

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 |
| Styling | CSS3 (custom, no Tailwind) |
| Animations | CSS + Canvas API + requestAnimationFrame |
| Fonts | Google Fonts (Syne, Space Grotesk, JetBrains Mono) |
| Email | EmailJS |
| Deployment | Netlify / Vercel |

---

## 📄 License

MIT — Feel free to use and customize!

---

**Built with 💜 by Digvijay Bhota**
#   D e v e l o p e r - P o r t f o l i o 
 
 
