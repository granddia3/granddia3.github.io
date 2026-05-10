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

## Common Errors

### "MIME type of 'application/octet-stream'"
If you see this error, it means the browser is trying to load a `.tsx` file (source code) as if it were a regular JavaScript file.
- **In Development**: This usually means the Vite dev server isn't running or the `index.html` is being served by a plain server that doesn't understand React/TypeScript. Always use `npm run dev`.
- **On GitHub**: This happens if you try to open the `index.html` from your repository file list. GitHub Pages can only serve the **built** version of your site. You must run `npm run deploy` and then view the site via the URL provided in your repository's "Pages" settings.

- Framework: React 18+ with Vite
- Styling: Tailwind CSS
- Server: Express for SPA routing and asset serving
