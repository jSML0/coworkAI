# JustCo — AI Smart Meeting & Space Orchestrator Prototype

A 100% client-side, serverless interactive prototype built with React 19, TypeScript, Tailwind CSS, and Vite.

---

## 🌐 Hosting on GitHub Pages (No Server Required!)

This prototype has **zero server dependencies** and can be hosted directly on **GitHub Pages** for free.

### Step 1: Push Code to GitHub
Ensure all your files (including `.github/workflows/deploy.yml` and `vite.config.ts`) are committed and pushed to your GitHub repository:
```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

### Step 2: Enable GitHub Actions Deployment in Repo Settings
1. On GitHub, navigate to your repository.
2. Click **Settings** (top tab) → **Pages** (in the left sidebar under *Code and automation*).
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. That's it! Every time you push to `main` (or trigger it manually under the **Actions** tab), GitHub will automatically build and publish the prototype.

Your prototype will be live at:
`https://<your-github-username>.github.io/<repository-name>/`

---

## 🛠️ Local Development

To run or test the prototype locally:

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build static production bundle
npm run build

# 4. Preview the built production output
npm run preview
```

---

## 📂 Architecture & Features

- **100% Client-Side State**: Uses React Context API (`src/context/OrchestratorContext.tsx`) and mock data (`src/data/mockData.ts`).
- **Interactive Multi-Step Flow**:
  1. **Schedule & Space Setup**: Interactive date picker, team & visitor roster, room layout & AV hardware selection, catering packages.
  2. **AI Recommendation & Floor Matching**: Proximity clustering score, floor maps, trade-off comparisons.
  3. **Pass Distribution & Ticket Automation**: Digital visitor passes with QR codes, NFC passes, facility Ops tickets.
  4. **Utilization & Cost Analytics**: Real-time budget breakdown, ESG carbon offsets, attendance tracking, and space utilization heatmap.
