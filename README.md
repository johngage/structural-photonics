# Structural Photonics Website

Professional website for Structural Photonics - Critical infrastructure monitoring through distributed fiber optic sensing.

## Project Structure

```
structural-photonics/
├── index.html              # Home page
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── main.js             # JavaScript functionality
├── pages/
│   ├── technology.html     # DFOS technology explanation
│   ├── applications.html   # Infrastructure applications
│   ├── team.html           # Team members
│   ├── about.html          # Company information
│   └── contact.html        # Contact form
├── images/                 # Image assets (add as needed)
├── _headers                # Cloudflare Pages headers
├── _redirects              # Cloudflare Pages redirects
└── README.md
```

## Local Development

This is a static site with no build process required. To preview locally:

### Option 1: Python (built-in on macOS/Linux)
```bash
cd structural-photonics
python3 -m http.server 8000
```
Then open http://localhost:8000

### Option 2: Node.js
```bash
npx serve
```

### Option 3: VS Code
Install the "Live Server" extension and click "Go Live"

## Deployment to Cloudflare Pages

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Structural Photonics website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/structural-photonics.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Pages** > **Create a project**
   - Select **Connect to Git**
   - Authorize GitHub access and select your repository
   - Configure build settings:
     - **Framework preset:** None
     - **Build command:** (leave empty)
     - **Build output directory:** `/` (root)
   - Click **Save and Deploy**

3. **Configure Custom Domain (Optional):**
   - In your Pages project, go to **Custom domains**
   - Add `structuralphotonics.com` (or your domain)
   - Update your domain's DNS to point to Cloudflare

### Method 2: Direct Upload

1. **Prepare files:**
   Ensure all files are in a single directory.

2. **Upload to Cloudflare:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Pages** > **Create a project**
   - Select **Direct Upload**
   - Drag and drop your project folder or use the file picker
   - Click **Deploy**

## Configuration Files

### _headers
Security headers and caching configuration for Cloudflare Pages. Includes:
- Security headers (X-Frame-Options, CSP hints)
- Long-term caching for static assets
- No-cache for HTML files

### _redirects
URL routing configuration:
- Clean URLs (e.g., `/technology` → `/pages/technology.html`)
- 404 handling

## Customization

### Updating Content
- Edit HTML files directly in the `pages/` directory
- Update company information, team members, or technical specs as needed

### Styling
- All styles are in `css/styles.css`
- CSS variables at the top of the file control colors, fonts, and spacing
- Design system is mobile-first and responsive

### Adding Images
1. Add image files to the `images/` directory
2. Reference them in HTML: `<img src="images/your-image.jpg" alt="Description">`
3. For team photos, replace the SVG placeholders in `team.html`

### Contact Form
The contact form currently shows a success message on submission. To make it functional:

1. **Cloudflare Workers:** Create a Worker to handle form submissions
2. **Third-party service:** Integrate Formspree, Netlify Forms, or similar
3. **Custom backend:** Point the form action to your API endpoint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Performance

The site is optimized for performance:
- No JavaScript frameworks (vanilla JS only)
- CSS variables for efficient styling
- System fonts with Inter as primary
- Minimal dependencies
- Optimized for Core Web Vitals

## License

Copyright 2025 Structural Photonics, Inc. All rights reserved.
