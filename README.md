# Shivam Dapkekar: personal portfolio website

Built with **React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · Motion** (Framer Motion) · lucide icons.

```
D:\shivam_portfolio
├── site\                 the website (source code)
│   ├── src\data.ts       ALL text: profile, experience, projects, publications, extras, skills
│   ├── src\components\   page sections (Hero, About, Experience, Projects, Publications, Extras, Skills, Contact)
│   ├── public\images\    project images (WebP, made from the figures in each repo)
│   ├── dist\             built website after "npm run build" (upload this folder to host it)
│   └── scripts\screenshot.mjs   takes screenshots of the site for checking
├── publications\         publication list + links (publications.json, README.md)
├── .tools\               portable Node.js (no system install needed)
└── start_website.ps1     one-click: starts the site at http://localhost:5173
```

## Run it

Double-click / run `start_website.ps1`. It opens http://localhost:5173 with live reload.
Edit `site\src\data.ts` and the page updates instantly.

## Build for hosting

```powershell
$env:Path = "$(Get-Content D:\shivam_portfolio\.tools\NODE_DIR.txt);$env:Path"
cd D:\shivam_portfolio\site
npm run build          # output in site\dist (works from any folder or sub-path)
```

Free hosting options for `site\dist`: GitHub Pages (`shivamd2502.github.io`), Netlify or Vercel.

## Project pages and posters

Each project card opens its own page (`#/projects/<slug>`):
- a wide poster (the problem, a key outcome and the project visual);
- the GitHub repo and PDFs;
- the workflow steps, "what we did", the figures, and the research paper and documents.

To use AI-generated posters, follow `posters\PROMPTS.md` and save the images as
`site\public\posters\<slug>.webp`. They replace the designed poster automatically.

## Content rules used

* Project cards show outcomes (speed, scale, design choices), not accuracy figures.
* Interests: Applied AI, AI vision research, multimodal learning (VLM / VLA), computer vision research.
* No web, data/Python or geospatial skill groups; no instrumentation coursework; no DC Motor project; no bus-suspension controller.
* Accepted papers are labelled "Accepted · publication pending"; the ISRO paper is "In preparation".
* Phone number is not published; email, LinkedIn, X, GitHub and Google Scholar are.
