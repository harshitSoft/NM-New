# NM Group Redesign

This is a complete redesign of the NM Group website, featuring an architectural blueprint aesthetic inspired by modern design principles.

## How to Run Locally

1. Make sure you have Node.js installed.
2. Navigate to the `frontend` directory: `cd frontend`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open your browser to the local URL provided (usually `http://localhost:5173`).

## How to Edit Colors and Fonts

All design tokens for colors and fonts are centralized in a single CSS file.

1. Open `src/index.css`.
2. Locate the `@theme` block at the top of the file.
3. Modify the CSS variables to change the look and feel across the entire site.

For example, to change the primary accent color (currently Cobalt Blue), modify `--color-brand-accent`:
```css
@theme {
  --color-brand-base: #F4EFE6;
  --color-brand-surface: #F7F4EE;
  --color-brand-accent: #2B4C9B; /* Change this hex code */
}
```

To change fonts, first import the new Google Fonts in `index.html`, then map them in `index.css`:
```css
  --font-sans: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Space Mono", ui-monospace, monospace;
  --font-handwriting: "Caveat", cursive;
```

## How to Swap the Hero Illustration or Animation

The hero section features a custom animated SVG illustration. If you would like to swap this out for your own custom 3D render (mp4/webm video or Lottie animation), you can easily do this via the configuration file without touching the core React components.

1. Open `src/config/heroConfig.js`.
2. Change the `type` property from `'svg'` to `'video'` or `'lottie'`.
3. Provide the path to your custom asset in `videoSrc` or `lottieSrc`.
4. Adjust the `writingDuration` to match the exact duration of your custom writing animation in seconds so the text sync remains perfect.

```js
export const heroConfig = {
  type: 'video', // 'svg', 'video', or 'lottie'
  videoSrc: '/assets/video/custom-hero-writing.mp4',
  lottieSrc: '/assets/lottie/hero-writing.json',
  writingDuration: 4.5, // Sync this with your custom animation's duration
};
```

## How to Deploy to Netlify

This project is built using Vite and React, making it straightforward to deploy to Netlify.

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. In your Netlify dashboard, click **Add new site** > **Import an existing project**.
3. Select your repository.
4. Set the following build settings:
   - **Base directory:** `frontend` (if you are deploying the whole repository)
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
5. Click **Deploy Site**.

Netlify will automatically build the project and deploy it. Since React Router is used, make sure you have a `_redirects` file in your `public` folder with `/* /index.html 200` to handle client-side routing, or Netlify will handle it automatically if properly configured.
