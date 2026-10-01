# Nilesh Khatik — Professional Developer Portfolio

A production-ready, accessible, high-performance portfolio website for **Nilesh Khatik**, built with **React**, **Vite**, and **Tailwind CSS**. 

The design is a faithful implementation of the official Figma Make specification, and all personal qualifications, experience, and academic projects are strictly grounded in Nilesh Khatik's verified resume.

---

## 🚀 Tech Stack

- **Frontend Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/) (Fast HMR & optimized production bundling)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) (Accessible SVG feather icons)
- **Deployment**: Static output (`dist/`) ready for GitHub Pages, Vercel, Netlify, or Firebase Hosting.

---

## 📁 Project Structure

```text
My Portfolio/
├── public/
│   └── assets/
│       └── images/
│           └── nilesh-khatik.jpg       # Original professional photo
├── src/
│   ├── components/                     # Reusable UI building blocks
│   │   ├── Button.jsx                  # Accessible button & link component
│   │   ├── ProjectCard.jsx             # Project card with tags & links
│   │   ├── SectionHeading.jsx          # Category tag & accent heading
│   │   ├── SkillCard.jsx               # Categorized skill cards
│   │   └── SocialLinks.jsx             # Safe external social profile links
│   ├── data/
│   │   └── portfolioData.js            # Single source of truth (resume content)
│   ├── sections/                       # Main page sections
│   │   ├── Navbar.jsx                  # Header with scroll spy & mobile menu
│   │   ├── Hero.jsx                    # Intro headline, photo & stat badges
│   │   ├── About.jsx                   # Bio, metrics & 4 Bento cards
│   │   ├── Skills.jsx                  # Technical expertise categories
│   │   ├── Projects.jsx                # Featured full-stack project showcase
│   │   ├── Experience.jsx              # Work history timeline (internships)
│   │   ├── Education.jsx               # Academic degrees, certs & achievements
│   │   ├── Contact.jsx                 # Direct contacts & validated contact form
│   │   └── Footer.jsx                  # Signature, navigation & copyright
│   ├── styles/
│   │   └── index.css                   # Tailwind directives & focus styles
│   ├── App.jsx                         # Main application layout
│   └── main.jsx                        # React root entry point
├── index.html                          # SEO metadata, Open Graph, fonts
├── tailwind.config.js                  # Exact Figma color palette tokens
├── vite.config.js                      # Vite configuration
└── package.json
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables (`.env`)
Create or edit `.env` in the root folder:
```env
PORT=5000
RECIPIENT_EMAIL=nileshkhatik700@gmail.com

# SMTP Configuration (Recommended: Gmail App Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=nileshkhatik700@gmail.com
SMTP_PASS=your_16_character_app_password
SMTP_FROM=nileshkhatik700@gmail.com

FRONTEND_URL=http://localhost:3000
USE_ETHEREAL=false
```

#### How to get a Gmail App Password:
1. Go to your **Google Account Security** settings: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Ensure **2-Step Verification** is turned ON.
3. Under *App Passwords*, type an app name (e.g., `Portfolio Mailer`).
4. Google will generate a unique 16-character password (e.g. `abcd efgh ijkl mnop`).
5. Copy that password into `SMTP_PASS` in your `.env` file (without spaces).
6. Set `USE_ETHEREAL=false`. All submissions will now land directly in your real Gmail inbox!

### 3. Run Backend & Frontend

#### Terminal 1 — Start the Backend Email API:
```bash
npm run server
```
Runs the Express backend on `http://localhost:5000`.

#### Terminal 2 — Start the Frontend:
```bash
npm run dev
```
Runs the React/Vite development server on `http://localhost:3000` with automatic `/api` proxying to port 5000.

### 4. Build for Production
```bash
npm run build
```
Creates an optimized static bundle in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🔒 Security & Best Practices

1. **No Hardcoded Secrets**: Zero API keys, private tokens, or credentials inside client code.
2. **Safe External Links**: All external anchors utilize `target="_blank"` with `rel="noopener noreferrer"`.
3. **Form Validation & Anti-Spam**: Contact form contains regex email validation, length restrictions, and an invisible honeypot field.
4. **Accessible Semantics**: Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) with visible `:focus-visible` rings and `prefers-reduced-motion` compliance.

---

## 👨‍💻 Author Information

- **Name**: Khatik Nilesh Abasaheb
- **Education**: B.E. Computer Engineering, Savitribai Phule Pune University (SPPU) — CGPA 9.071
- **Email**: [nileshkhatik700@gmail.com](mailto:nileshkhatik700@gmail.com)
- **GitHub**: [github.com/nileshk18-alt](https://github.com/nileshk18-alt)
- **LinkedIn**: [linkedin.com/in/nilesh-khatik-03328632a](https://linkedin.com/in/nilesh-khatik-03328632a)
