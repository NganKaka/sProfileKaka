# Deployment Checklist

**Project:** s-profile-kaka Portfolio  
**Date:** 2026-05-14  
**Status:** Ready for Deployment 🚀

---

## ✅ Pre-Deployment Checklist

### 1. Service Setup (15-20 minutes)

#### Formspree (Contact Form)
- [ ] Go to https://formspree.io
- [ ] Create free account
- [ ] Create new form
- [ ] Copy form ID (format: `xyzabc123`)
- [ ] Update `src/components/Contact.tsx` line 48:
  ```typescript
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  ```
- [ ] Test form submission locally

#### Plausible Analytics
- [ ] Go to https://plausible.io
- [ ] Sign up ($9/month or self-hosted)
- [ ] Add your domain
- [ ] Copy analytics script
- [ ] Add to `index.html` in `<head>` section:
  ```html
  <script defer data-domain="your-domain.com" src="https://plausible.io/js/script.js"></script>
  ```

---

### 2. Create Assets (30-45 minutes)

#### OG Image (Social Sharing)
- [ ] Create 1200x630px image
- [ ] Include:
  - Your name: "Vo Hoang Ngan"
  - Title: "Software Engineer"
  - Visual branding (colors: #e9c349, #0d1b2a, #22d3ee)
  - Optional: Profile photo
- [ ] Save as `public/og-image.jpg`
- [ ] Optimize (should be < 300KB)

#### Favicon
- [ ] Create 32x32px (minimum) SVG or PNG
- [ ] Use your initials or logo
- [ ] Save as `public/favicon.svg` or `public/favicon.ico`

#### Apple Touch Icon
- [ ] Create 180x180px PNG
- [ ] Same design as favicon
- [ ] Save as `public/apple-touch-icon.png`

**Quick Tool:** Use https://realfavicongenerator.net/ to generate all formats

---

### 3. Update Domain URLs (5 minutes)

Replace `https://your-domain.com/` with your actual domain in:

#### index.html
- [ ] Line 10: `<link rel="canonical" href="..." />`
- [ ] Line 13: `<meta property="og:url" content="..." />`
- [ ] Line 16: `<meta property="og:image" content="..." />`
- [ ] Line 21: `<meta property="twitter:url" content="..." />`
- [ ] Line 23: `<meta property="twitter:image" content="..." />`
- [ ] Line 42: `"url": "..."`
- [ ] Line 43: `"image": "..."`

#### public/sitemap.xml
- [ ] Replace all 7 instances of `https://your-domain.com/`

#### public/robots.txt
- [ ] Line 4: `Sitemap: https://your-domain.com/sitemap.xml`

---

### 4. Local Testing (20-30 minutes)

#### Development Server
```bash
npm run dev
```

- [ ] Homepage loads correctly
- [ ] All sections visible (Hero, About, Academic, Experience, Skills, Projects, Contact)
- [ ] Navigation links work
- [ ] Images load properly
- [ ] Animations work smoothly

#### Contact Form Testing
- [ ] Form displays correctly
- [ ] Name validation works (min 2 chars)
- [ ] Email validation works (valid email format)
- [ ] Subject validation works (min 5 chars)
- [ ] Message validation works (min 20 chars)
- [ ] Submit button shows loading state
- [ ] Success message appears after submission
- [ ] Form resets after successful submission

#### Keyboard Navigation
- [ ] Press Tab - skip link appears
- [ ] Press Enter on skip link - jumps to main content
- [ ] Tab through all interactive elements
- [ ] Focus indicators visible
- [ ] All buttons/links accessible via keyboard

#### Mobile Testing
- [ ] Open in mobile viewport (375px width)
- [ ] All sections responsive
- [ ] Navigation works
- [ ] Form usable on mobile
- [ ] Images scale properly

---

### 5. Production Build (10 minutes)

```bash
npm run build
```

- [ ] Build completes successfully
- [ ] No TypeScript errors
- [ ] Image optimization runs (check for green checkmarks)
- [ ] Bundle size reasonable (~186KB gzipped)

```bash
npm run preview
```

- [ ] Preview server starts
- [ ] Site works in production mode
- [ ] All features functional
- [ ] No console errors

---

### 6. Deploy to Hosting (15-20 minutes)

#### Option A: Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Follow prompts:**
- [ ] Link to existing project or create new
- [ ] Confirm settings
- [ ] Wait for deployment

4. **Set up domain:**
- [ ] Go to Vercel dashboard
- [ ] Add custom domain
- [ ] Update DNS records
- [ ] Wait for SSL certificate

#### Option B: Netlify

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Deploy:**
```bash
netlify deploy --prod
```

3. **Or use drag-and-drop:**
- [ ] Build locally: `npm run build`
- [ ] Go to https://app.netlify.com/drop
- [ ] Drag `dist` folder
- [ ] Set up custom domain

#### Option C: GitHub Pages

1. **Install gh-pages:**
```bash
npm install -D gh-pages
```

2. **Add to package.json:**
```json
{
  "scripts": {
    "deploy": "vite build && gh-pages -d dist"
  }
}
```

3. **Deploy:**
```bash
npm run deploy
```

---

### 7. Post-Deployment Testing (20-30 minutes)

#### Basic Functionality
- [ ] Visit production URL
- [ ] All sections load
- [ ] Images display correctly
- [ ] Animations work
- [ ] No console errors

#### Contact Form
- [ ] Fill out form with test data
- [ ] Submit form
- [ ] Check for success message
- [ ] Verify email received (check Formspree dashboard)

#### Analytics
- [ ] Visit site
- [ ] Click on project links
- [ ] Submit contact form
- [ ] Check Plausible dashboard for events
- [ ] Verify page views tracked

#### SEO Testing
- [ ] **Facebook Sharing Debugger:**
  - Go to https://developers.facebook.com/tools/debug/
  - Enter your URL
  - Click "Scrape Again"
  - Verify OG image and text appear correctly

- [ ] **Twitter Card Validator:**
  - Go to https://cards-dev.twitter.com/validator
  - Enter your URL
  - Verify card preview looks good

- [ ] **Google Rich Results Test:**
  - Go to https://search.google.com/test/rich-results
  - Enter your URL
  - Verify structured data is valid

#### Performance Testing
- [ ] **Lighthouse Audit:**
  - Open Chrome DevTools
  - Go to Lighthouse tab
  - Run audit
  - Check scores:
    - Performance: 90+ ✅
    - Accessibility: 90+ ✅
    - Best Practices: 90+ ✅
    - SEO: 95+ ✅

- [ ] **PageSpeed Insights:**
  - Go to https://pagespeed.web.dev/
  - Enter your URL
  - Check mobile and desktop scores

#### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

#### Mobile Testing
- [ ] Test on real mobile device
- [ ] Portrait and landscape orientations
- [ ] Touch interactions work
- [ ] Form usable on mobile
- [ ] No horizontal scrolling

---

### 8. SEO Setup (15-20 minutes)

#### Google Search Console
- [ ] Go to https://search.google.com/search-console
- [ ] Add property (your domain)
- [ ] Verify ownership (DNS or HTML file)
- [ ] Submit sitemap: `https://your-domain.com/sitemap.xml`
- [ ] Request indexing for homepage

#### Bing Webmaster Tools (Optional)
- [ ] Go to https://www.bing.com/webmasters
- [ ] Add site
- [ ] Verify ownership
- [ ] Submit sitemap

---

### 9. Monitoring Setup (10 minutes)

#### Error Tracking (Optional but Recommended)
- [ ] Sign up for Sentry (free tier)
- [ ] Create new project
- [ ] Add Sentry SDK to project
- [ ] Test error tracking

#### Uptime Monitoring (Optional)
- [ ] Sign up for UptimeRobot (free tier)
- [ ] Add monitor for your domain
- [ ] Set up email alerts

---

### 10. Final Verification (10 minutes)

- [ ] All services configured and working
- [ ] All assets created and uploaded
- [ ] All URLs updated
- [ ] Contact form sends emails
- [ ] Analytics tracking events
- [ ] Social sharing works
- [ ] Lighthouse scores 90+
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Cross-browser compatible

---

## 🎉 Launch Announcement

Once everything is verified:

### Social Media
- [ ] Share on LinkedIn with project highlights
- [ ] Share on Facebook
- [ ] Share on Twitter/X
- [ ] Update GitHub profile README with link

### Professional Networks
- [ ] Update resume with portfolio link
- [ ] Add to email signature
- [ ] Share with professional contacts
- [ ] Add to job applications

---

## 📊 Post-Launch Monitoring (First Week)

### Daily
- [ ] Check analytics dashboard
- [ ] Monitor contact form submissions
- [ ] Check for errors in Sentry (if set up)
- [ ] Respond to any inquiries within 24 hours

### Weekly
- [ ] Review analytics trends
- [ ] Check which projects get most clicks
- [ ] Monitor contact form conversion rate
- [ ] Check search console for indexing status

---

## 🐛 Troubleshooting

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

### Lighthouse Score Low
1. Check for render-blocking resources
2. Verify images are optimized
3. Check for unused JavaScript
4. Test on incognito mode
5. Test on different network speeds

---

## 📝 Notes

### Important Reminders
- Keep Formspree and Plausible credentials secure
- Back up your code regularly (Git)
- Monitor analytics weekly
- Update content regularly
- Respond to inquiries promptly

### Future Improvements
After launch, consider:
- Adding blog section (Sprint 2)
- Implementing theme switcher (Sprint 3)
- Adding testimonials section
- Creating case study pages
- Setting up automated testing

---

## ✅ Deployment Complete!

Once all items are checked:

**🎊 Congratulations! Your portfolio is live!**

Share your success:
- Portfolio URL: ___________________________
- Deployed on: ___________________________
- Launch date: ___________________________

---

**Checklist Version:** 1.0  
**Last Updated:** 2026-05-14  
**Status:** Ready to Use 🚀
