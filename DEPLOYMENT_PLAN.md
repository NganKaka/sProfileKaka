# Deployment Plan

**Status:** Ready to Deploy  
**Time:** 10:26 AM, May 14, 2026

---

## 🚀 Deployment Steps

### Step 1: Login to Vercel
You need to run this command manually in your terminal:
```bash
vercel login
```

This will open your browser to authenticate. Choose your preferred login method (GitHub, GitLab, Bitbucket, or Email).

---

### Step 2: Deploy to Vercel
After logging in, run:
```bash
vercel
```

**Answer the prompts:**
- Set up and deploy? **Yes**
- Which scope? **Select your account**
- Link to existing project? **No**
- What's your project's name? **s-profile-kaka** (or your choice)
- In which directory is your code located? **./** (press Enter)
- Want to override settings? **No**

This creates a **preview deployment** and gives you a URL.

---

### Step 3: Deploy to Production
Once the preview works, deploy to production:
```bash
vercel --prod
```

You'll get your production URL like: `https://s-profile-kaka.vercel.app`

---

### Step 4: Post-Deployment Tasks

#### A. Update Formspree (5 min)
1. Go to https://formspree.io and sign up
2. Create a new form
3. Copy your form ID
4. Update `src/components/Contact.tsx` line 48
5. Commit and redeploy

#### B. Update Domain URLs (5 min)
Replace `your-domain.com` with your Vercel URL in:
- `index.html` (8 places)
- `public/sitemap.xml` (7 places)
- `public/robots.txt` (1 place)

Then:
```bash
git add .
git commit -m "Update URLs with Vercel domain"
git push origin main
vercel --prod
```

#### C. Add Analytics (Optional - 5 min)
1. Sign up for Plausible Analytics
2. Add script to `index.html`
3. Commit and redeploy

---

## ⏭️ After Deployment: Sprint 3

Once deployed, we'll continue to **Sprint 3: Enhanced Features**

### Sprint 3 Tasks:
1. **Theme Switcher** - Light/dark mode toggle
2. **Advanced Animations** - Page transitions, loading skeletons
3. **UX Improvements** - Error boundaries, better loading states

**Estimated Time:** 8-10 hours

---

## 📝 Manual Steps Required

I cannot run `vercel login` for you as it requires browser authentication.

**Please run these commands in your terminal:**

```bash
# 1. Login to Vercel
vercel login

# 2. Deploy preview
vercel

# 3. Deploy to production
vercel --prod
```

**Then let me know your Vercel URL and we'll:**
1. Update all domain references
2. Configure Formspree
3. Continue to Sprint 3

---

Ready to deploy? Run the commands above and share your Vercel URL! 🚀
