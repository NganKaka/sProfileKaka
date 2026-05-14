# Vercel Deployment Guide

**Project:** s-profile-kaka Portfolio  
**Date:** 2026-05-14  
**Deployment Platform:** Vercel

---

## 🚀 Quick Deployment Steps

### Step 1: Pre-Deployment Checklist (5 minutes)

Before deploying, we need to configure a few things:

#### A. Sign up for Formspree (Contact Form)
1. Go to https://formspree.io
2. Sign up for free account
3. Click "New Form"
4. Name it "Portfolio Contact"
5. Copy your form ID (looks like: `xyzabc123`)
6. Update `src/components/Contact.tsx` line 48:
   ```typescript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```
   Replace `YOUR_FORM_ID` with your actual form ID

#### B. Sign up for Plausible Analytics (Optional but Recommended)
1. Go to https://plausible.io
2. Sign up ($9/month or self-hosted free)
3. Add your domain (you can add this after deployment)
4. Get your analytics script
5. We'll add this after deployment when you have your domain

---

### Step 2: Deploy to Vercel (10 minutes)

#### Option A: Deploy via Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Select your account)
# - Link to existing project? No
# - What's your project's name? s-profile-kaka (or your choice)
# - In which directory is your code located? ./
# - Want to override settings? No

# This creates a preview deployment
# To deploy to production:
vercel --prod
```

#### Option B: Deploy via Vercel Dashboard

1. Go to https://vercel.com
2. Sign up / Log in
3. Click "Add New Project"
4. Import your Git repository:
   - If on GitHub: Connect GitHub and select repository
   - If local: Use Vercel CLI (Option A above)
5. Configure project:
   - **Framework Preset:** Vite
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Click "Deploy"

---

### Step 3: Post-Deployment Configuration (15 minutes)

#### A. Update Domain URLs

Once deployed, Vercel gives you a URL like: `https://s-profile-kaka.vercel.app`

Update these files with your actual Vercel URL:

**1. index.html** (8 places)
```html
<!-- Replace all instances of https://your-domain.com/ with your Vercel URL -->
<link rel="canonical" href="https://s-profile-kaka.vercel.app/" />
<meta property="og:url" content="https://s-profile-kaka.vercel.app/" />
<meta property="og:image" content="https://s-profile-kaka.vercel.app/og-image.jpg" />
<meta property="twitter:url" content="https://s-profile-kaka.vercel.app/" />
<meta property="twitter:image" content="https://s-profile-kaka.vercel.app/og-image.jpg" />
<!-- And in JSON-LD structured data -->
"url": "https://s-profile-kaka.vercel.app",
"image": "https://s-profile-kaka.vercel.app/profile-photo.png",
```

**2. public/sitemap.xml** (7 places)
```xml
<!-- Replace all URLs -->
<loc>https://s-profile-kaka.vercel.app/</loc>
<loc>https://s-profile-kaka.vercel.app/#about</loc>
<!-- etc. -->
```

**3. public/robots.txt**
```txt
Sitemap: https://s-profile-kaka.vercel.app/sitemap.xml
```

**Then commit and redeploy:**
```bash
git add .
git commit -m "Update URLs with Vercel domain"
git push origin main
vercel --prod
```

#### B. Add Plausible Analytics Script

Add to `index.html` in `<head>`:
```html
<!-- Plausible Analytics -->
<script defer data-domain="s-profile-kaka.vercel.app" src="https://plausible.io/js/script.js"></script>
```

Commit and redeploy:
```bash
git add index.html
git commit -m "Add Plausible analytics"
git push origin main
vercel --prod
```

---

### Step 4: Create Assets (Optional but Recommended)

#### A. Create OG Image (1200x630px)

**Quick Option - Use Canva:**
1. Go to https://canva.com
2. Create custom size: 1200 x 630 px
3. Add:
   - Your name: "Vo Hoang Ngan"
   - Title: "Software Engineer"
   - Background with your brand colors (#0d1b2a, #e9c349, #22d3ee)
   - Optional: Your profile photo
4. Download as JPG
5. Save as `public/og-image.jpg`

**Or use this placeholder for now:**
- Copy your profile photo as og-image.jpg
- You can create a proper one later

#### B. Create Favicons

**Quick Option - Use RealFaviconGenerator:**
1. Go to https://realfavicongenerator.net/
2. Upload an image (your initials or logo)
3. Generate all formats
4. Download and extract to `public/`
5. Files needed:
   - `favicon.svg` or `favicon.ico`
   - `apple-touch-icon.png`

**Or skip for now:**
- Vercel will still work without favicons
- Add them later when you have time

---

### Step 5: Test Your Deployment (10 minutes)

#### A. Basic Functionality
- [ ] Visit your Vercel URL
- [ ] All sections load correctly
- [ ] Images display properly
- [ ] Navigation works
- [ ] Animations work smoothly

#### B. Contact Form
- [ ] Fill out the form with test data
- [ ] Submit the form
- [ ] Check for success message
- [ ] Verify email received in Formspree dashboard

#### C. Analytics
- [ ] Visit your site
- [ ] Click on project links
- [ ] Check Plausible dashboard for events
- [ ] Verify page views are tracked

#### D. SEO Testing
- [ ] **Facebook Sharing Debugger:**
  - Go to https://developers.facebook.com/tools/debug/
  - Enter your Vercel URL
  - Click "Scrape Again"
  - Verify OG image and text appear

- [ ] **Twitter Card Validator:**
  - Go to https://cards-dev.twitter.com/validator
  - Enter your Vercel URL
  - Verify card preview

#### E. Performance Testing
- [ ] **Lighthouse Audit:**
  - Open Chrome DevTools (F12)
  - Go to Lighthouse tab
  - Run audit
  - Check scores (target: 90+ all categories)

- [ ] **PageSpeed Insights:**
  - Go to https://pagespeed.web.dev/
  - Enter your Vercel URL
  - Check mobile and desktop scores

---

## 🎯 Vercel-Specific Configuration

### Environment Variables (if needed later)

In Vercel Dashboard:
1. Go to your project
2. Settings → Environment Variables
3. Add any secrets (API keys, etc.)

### Custom Domain (Optional)

To add your own domain:
1. Go to project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)
5. Update all URLs in your code to use custom domain

### Automatic Deployments

Vercel automatically deploys when you push to GitHub:
- **Push to main branch** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployment with unique URL

---

## 📋 Quick Deployment Checklist

### Before First Deploy
- [ ] Build succeeds locally (`npm run build`)
- [ ] No TypeScript errors (`npm run lint`)
- [ ] All features work in dev mode

### First Deploy
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Login: `vercel login`
- [ ] Deploy: `vercel`
- [ ] Deploy to production: `vercel --prod`

### After First Deploy
- [ ] Sign up for Formspree
- [ ] Update Contact.tsx with form ID
- [ ] Update all URLs with Vercel domain
- [ ] Add Plausible analytics script
- [ ] Commit and redeploy
- [ ] Test everything

### Optional Enhancements
- [ ] Create OG image
- [ ] Create favicons
- [ ] Add custom domain
- [ ] Set up Google Search Console
- [ ] Submit sitemap

---

## 🐛 Troubleshooting

### Build Fails on Vercel

**Check build logs:**
1. Go to Vercel dashboard
2. Click on failed deployment
3. View build logs
4. Fix errors locally
5. Push and redeploy

**Common issues:**
- Missing dependencies: `npm install`
- TypeScript errors: `npm run lint`
- Build command wrong: Should be `npm run build`
- Output directory wrong: Should be `dist`

### Contact Form Not Working

1. Verify Formspree form ID is correct
2. Check browser console for errors
3. Test with different email addresses
4. Check Formspree dashboard for submissions
5. Verify CORS settings if needed

### Analytics Not Tracking

1. Verify Plausible script is in `<head>`
2. Check domain matches exactly
3. Disable ad blockers for testing
4. Check browser console for errors
5. Wait 5-10 minutes for data to appear

### Images Not Loading

1. Check file paths are correct
2. Verify images exist in `public/` folder
3. Check browser console for 404 errors
4. Clear browser cache
5. Rebuild and redeploy

---

## 🚀 Deployment Commands Reference

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm [deployment-url]

# Link to existing project
vercel link

# Pull environment variables
vercel env pull
```

---

## 📊 Expected Results

### After Deployment
- ✅ Portfolio live at Vercel URL
- ✅ All features working
- ✅ Fast loading (< 2s)
- ✅ SEO optimized
- ✅ Contact form functional
- ✅ Analytics tracking

### Lighthouse Scores (Target)
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 95+

---

## 🎉 Success!

Once deployed, your portfolio will be:
- ✅ Live on the internet
- ✅ Accessible to everyone
- ✅ Optimized for search engines
- ✅ Ready for job applications
- ✅ Automatically deployed on git push

**Share your portfolio:**
- Add to resume
- Share on LinkedIn
- Share on Twitter/X
- Add to email signature
- Include in job applications

---

**Deployment Guide Version:** 1.0  
**Last Updated:** 2026-05-14  
**Status:** Ready to Deploy 🚀
