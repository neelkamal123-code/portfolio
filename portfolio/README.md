# Portfolio

Premium personal portfolio built with Next.js 14, Tailwind CSS, and Framer Motion.

## Stack

- **Framework**: Next.js 14 (App Router, Static Export)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Font**: DM Sans + DM Mono (Google Fonts)
- **Deployment**: Netlify

## Setup

```bash
npm install
npm run dev        # development server → localhost:3000
npm run build      # production static export → ./out
```

## Customization

Edit `app/data.ts` to update all content:
- `profile` — name, title, bio, links
- `experience` — job history with description + tech stack
- `education` — academic background
- `projects` — portfolio work with demo/source links
- `skills` — proficiency levels (0–100)
- `certifications` — credential links

## Deploy to Netlify

### Option A — CLI
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=out
```

### Option B — Git Integration
1. Push repo to GitHub
2. New site → Import from Git in Netlify
3. Build command: `npm run build`
4. Publish directory: `out`
5. Deploy

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css        # Global styles, design tokens
│   ├── layout.tsx         # Root layout + metadata
│   ├── page.tsx           # Entry point
│   ├── PortfolioClient.tsx # Tab state + AnimatePresence router
│   └── data.ts            # All content data
├── components/
│   ├── Card.tsx            # Reusable card primitive
│   ├── Modal.tsx           # Demo modal with ESC + click-outside
│   ├── Nav.tsx             # Top navigation with mobile menu
│   ├── ProfileSection.tsx
│   ├── ExperienceSection.tsx
│   ├── EducationSection.tsx
│   ├── ProjectsSection.tsx
│   ├── SkillsSection.tsx
│   └── CertificationsSection.tsx
├── public/
│   └── resume.pdf          # Drop your resume here
├── next.config.js          # Static export config
├── tailwind.config.js
├── netlify.toml
└── tsconfig.json
```

## Design Notes

**Background**: `#0B0F14` deep charcoal with central radial gradient and noise overlay  
**Cards**: Matte dark surface `#0E1419`, 1px border at 5.5% opacity, subtle box shadow  
**Typography**: DM Sans — clean, professional, slight personality  
**Motion**: All animations use `cubic-bezier(0.42, 0, 0.58, 1)` — physics-like, no bounce  
**Palette**: Monochromatic blue-gray; accent is simply increased opacity of base text color
