# Classroom Unblocked

A high-performance portal for unblocked educational games and tools.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```

## Deployment to GitHub Pages

The easiest way to put your site online:

1. **Push your code to GitHub** (if you haven't already).
2. **Run the deploy command** in your terminal:
   ```bash
   npm run deploy
   ```
   *Note: This will build the project and create a `gh-pages` branch.*
3. **Activate the branch**:
   - Go to your Repo on GitHub.
   - Settings > Pages.
   - Set the **Branch** to `gh-pages` and folder to `/(root)`.
   - Save.

## Why was my page blank (404)?
GitHub Pages is a static host. It cannot read your `.tsx` source files directly. You must "build" them into a `dist` folder containing plain HTML/JS. The `npm run deploy` command I added handles this whole process for you.

## Technical Info

- Framework: React 18+ with Vite
- Styling: Tailwind CSS
- Server: Express for SPA routing and asset serving
