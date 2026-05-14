# Content Editing Guide

**Project:** s-profile-kaka Portfolio  
**Last Updated:** 2026-05-14  
**Version:** 1.0

---

## 📝 Overview

This guide explains how to update your portfolio content without touching any code. All content is stored in Markdown files with frontmatter (metadata at the top of each file).

---

## 📁 Content Structure

```
content/
├── profile.md              # Your main profile information
├── experience/             # Work experience entries
│   ├── 01-ai-power.md
│   ├── 02-pi-associates.md
│   ├── 03-future-software-engineer.md
│   ├── 04-future-ai-engineer.md
│   └── 05-future-product-engineer.md
├── academic/               # Academic timeline entries
│   ├── 01-thong-tay-hoi.md
│   ├── 02-le-hong-phong.md
│   ├── 03-university-bachelor.md
│   └── 04-university-master.md
└── projects/               # Project showcase entries
    ├── 01-stripkaka.md
    ├── 02-portfolio-systems.md
    └── 03-product-storytelling.md
```

---

## 🎯 Quick Start

### 1. Find the File You Want to Edit

- **Profile info** (name, title, about): `content/profile.md`
- **Work experience**: `content/experience/*.md`
- **Education**: `content/academic/*.md`
- **Projects**: `content/projects/*.md`

### 2. Open the File

Use any text editor:
- **VS Code** (recommended)
- **Notepad++**
- **Sublime Text**
- Even **Notepad** works!

### 3. Edit the Content

Each file has two parts:

**Frontmatter** (between `---` lines):
```markdown
---
title: My Project
featured: true
---
```

**Content** (below the frontmatter):
```markdown
# My Project

This is the project description...
```

### 4. Save and Rebuild

```bash
npm run build
```

---

## 📋 Editing Profile Information

**File:** `content/profile.md`

### Frontmatter Fields

```yaml
---
name: Your Full Name
title: Your Job Title
email: your.email@example.com
location: Your City, Country
about: Brief description about yourself
personalNote: A personal note or fun fact
availability: Your current availability status
---
```

### Example

```yaml
---
name: Vo Hoang Ngan
title: Software Engineer
email: vohoangngan85@gmail.com
location: Go Vap, Ho Chi Minh City
about: I enjoy crafting interfaces that feel premium, memorable, and intuitive.
personalNote: Outside code, I enjoy turning travel memories into digital stories.
availability: Available for frontend opportunities and UI-focused collaborations.
---
```

### What You Can Change

- ✅ Your name and title
- ✅ Email and location
- ✅ About text
- ✅ Personal note
- ✅ Availability status

### What to Keep

- ❌ Don't remove the `---` lines
- ❌ Don't change field names (like `name:`, `title:`)
- ❌ Keep the YAML format (field: value)

---

## 💼 Editing Work Experience

**Location:** `content/experience/`

### File Naming

Files are numbered to control order:
- `01-ai-power.md` appears first
- `02-pi-associates.md` appears second
- etc.

### Frontmatter Fields

```yaml
---
period: Start Date — End Date
business: Company Name
role: Your Role/Title
highlights:
  - Technology 1
  - Technology 2
  - Technology 3
---
```

### Example

```yaml
---
period: 1/2026 — 4/2026
business: AI POWER
role: Fullstack Developer Intern
highlights:
  - Java
  - React
  - PostgreSQL
  - Unit Testing
---
```

### Content Section

```markdown
# Company Name - Your Role

**Period:** Start Date — End Date

## Responsibilities

- First responsibility
- Second responsibility

## Technologies

List of technologies used
```

### Adding New Experience

1. Create new file: `content/experience/06-new-company.md`
2. Copy structure from existing file
3. Update all fields
4. Save file

### Removing Experience

1. Delete the file
2. Or rename it to `.md.backup` to hide it

---

## 🎓 Editing Academic Timeline

**Location:** `content/academic/`

### Frontmatter Fields

```yaml
---
period: Start Year — End Year
title: School/University Name
institution: Program/Department
highlights:
  - Highlight 1
  - Highlight 2
images:
  - path/to/image1.jpg
  - path/to/image2.jpg
---
```

### Example

```yaml
---
period: 2023 — 2027
title: VNU-HCM, University of Technology
institution: Computer Science
highlights:
  - CS
  - IELTS
  - Scholarship
images:
  - https://images.unsplash.com/photo-1518770660439-4636190af475
  - https://images.unsplash.com/photo-1461749280684-dccba630e2f6
---
```

### Content Section

```markdown
# School Name

**Period:** Start Year — End Year  
**Program:** Your Program

## Achievements

- Achievement 1
- Achievement 2
- Achievement 3

## Focus Areas

Area 1, Area 2, Area 3
```

### Adding Images

**Option 1: Use Unsplash URLs**
```yaml
images:
  - https://images.unsplash.com/photo-123456789
```

**Option 2: Use Local Images**
1. Add image to `public/learning-photoes/school-name/`
2. Reference in frontmatter:
```yaml
images:
  - learning-photoes/school-name/photo1.jpg
```

---

## 🚀 Editing Projects

**Location:** `content/projects/`

### Frontmatter Fields

```yaml
---
title: Project Name
meta: Project Category
featured: true or false
role: Your Role
previewImage: URL or path to image
liveUrl: Link to live project
codeUrl: Link to code repository
caseStudyUrl: Link to case study
stack:
  - Technology 1
  - Technology 2
highlights:
  - Feature 1
  - Feature 2
outcome: What was achieved
proof: Evidence of success
---
```

### Example

```yaml
---
title: sTripKaka
meta: Featured Live Project
featured: true
role: Lead frontend engineer
previewImage: https://images.unsplash.com/photo-1500530855697
liveUrl: https://s-trip-kaka.vercel.app
codeUrl: https://github.com/NganKaka
stack:
  - React
  - TypeScript
  - Vite
highlights:
  - Interactive travel stories
  - Dynamic gallery system
outcome: Delivered a polished live product
proof: Deployed publicly
---
```

### Featured Project

Only ONE project should have `featured: true`. This project appears larger on the portfolio.

### Content Section

```markdown
# Project Name

Brief project description.

## Project Overview

Detailed description of the project.

## Key Features

- Feature 1
- Feature 2
- Feature 3

## Technologies Used

List of technologies

## Links

- [Live Demo](url)
- [View Code](url)
```

---

## ✏️ Markdown Formatting

### Headers

```markdown
# Large Header (H1)
## Medium Header (H2)
### Small Header (H3)
```

### Lists

**Unordered:**
```markdown
- Item 1
- Item 2
- Item 3
```

**Ordered:**
```markdown
1. First item
2. Second item
3. Third item
```

### Links

```markdown
[Link Text](https://example.com)
```

### Bold and Italic

```markdown
**Bold text**
*Italic text*
```

### Code

```markdown
Inline `code` here

```
Code block here
```
```

---

## 🔧 Common Tasks

### Update Your Job Title

1. Open `content/profile.md`
2. Find `title: Software Engineer`
3. Change to your new title
4. Save file

### Add New Work Experience

1. Create `content/experience/06-new-job.md`
2. Copy structure from existing file
3. Update all fields
4. Save file
5. Rebuild: `npm run build`

### Change Project Order

Rename files to change order:
- `01-project-a.md` → `03-project-a.md`
- `02-project-b.md` → `01-project-b.md`

### Update Contact Email

1. Open `content/profile.md`
2. Find `email: vohoangngan85@gmail.com`
3. Change to new email
4. Save file

### Add New Project

1. Create `content/projects/04-new-project.md`
2. Copy structure from `01-stripkaka.md`
3. Update all fields
4. Add project description
5. Save file

---

## ⚠️ Important Rules

### DO:
- ✅ Edit text content freely
- ✅ Add new files following the naming pattern
- ✅ Update URLs and links
- ✅ Change dates and periods
- ✅ Modify lists (add/remove items)

### DON'T:
- ❌ Remove the `---` frontmatter delimiters
- ❌ Change field names (like `title:` to `name:`)
- ❌ Break YAML syntax (watch indentation!)
- ❌ Delete required fields
- ❌ Use special characters in filenames

---

## 🐛 Troubleshooting

### Build Fails After Editing

**Problem:** `npm run build` shows errors

**Solutions:**
1. Check frontmatter syntax (YAML is picky about indentation)
2. Make sure all `---` delimiters are present
3. Check for missing required fields
4. Look for special characters in text

### Content Not Updating

**Problem:** Changes don't appear on site

**Solutions:**
1. Make sure you saved the file
2. Rebuild: `npm run build`
3. Clear browser cache (Ctrl+Shift+R)
4. Check you edited the right file

### Images Not Showing

**Problem:** Images don't load

**Solutions:**
1. Check image path is correct
2. Make sure image exists in `public/` folder
3. Use full URL for external images
4. Check image filename (case-sensitive!)

---

## 📚 Examples

### Adding a New Experience Entry

**File:** `content/experience/06-new-company.md`

```markdown
---
period: 5/2026 — Present
business: Tech Startup Inc
role: Senior Frontend Developer
highlights:
  - React
  - Next.js
  - TypeScript
  - Team Leadership
---

# Tech Startup Inc - Senior Frontend Developer

**Period:** May 2026 — Present

## Responsibilities

- Lead frontend development team of 5 developers
- Architect and implement new features using React and Next.js
- Mentor junior developers and conduct code reviews
- Collaborate with design and backend teams

## Technologies

React, Next.js, TypeScript, Team Leadership
```

### Updating Profile About Section

**File:** `content/profile.md`

```yaml
---
name: Vo Hoang Ngan
title: Senior Software Engineer
about: I specialize in building scalable web applications with modern JavaScript frameworks. My focus is on creating intuitive user experiences backed by clean, maintainable code.
---
```

### Marking a Project as Featured

**File:** `content/projects/01-stripkaka.md`

```yaml
---
title: sTripKaka
featured: true  # ← Set this to true
---
```

**File:** `content/projects/02-portfolio-systems.md`

```yaml
---
title: Portfolio Systems
featured: false  # ← Set others to false
---
```

---

## 🎨 Best Practices

### Writing Content

1. **Be concise** - Keep descriptions clear and to the point
2. **Use active voice** - "Built a feature" not "A feature was built"
3. **Highlight impact** - Focus on results and outcomes
4. **Update regularly** - Keep content current

### File Organization

1. **Use numbered prefixes** - Controls display order
2. **Descriptive filenames** - `01-company-name.md` not `01-job.md`
3. **Consistent naming** - Use lowercase and hyphens
4. **Backup before major changes** - Copy file to `.backup`

### Images

1. **Optimize before uploading** - Keep under 500KB
2. **Use descriptive names** - `project-screenshot.jpg` not `img1.jpg`
3. **Consistent dimensions** - Use similar aspect ratios
4. **Test on mobile** - Make sure images look good on small screens

---

## 🚀 Publishing Changes

### Local Testing

```bash
# Start development server
npm run dev

# Open http://localhost:3000
# Check your changes
```

### Building for Production

```bash
# Build the site
npm run build

# Preview production build
npm run preview
```

### Deploying

After making changes:

1. Test locally
2. Build for production
3. Commit changes to git
4. Push to repository
5. Deployment happens automatically (if set up)

---

## 📞 Need Help?

### Common Questions

**Q: Can I use HTML in markdown files?**  
A: Yes, but stick to markdown for simplicity.

**Q: How do I add a new section?**  
A: Create a new directory in `content/` and follow the same pattern.

**Q: Can I change the order of sections?**  
A: File numbering controls order within a section.

**Q: What if I break something?**  
A: Use git to revert: `git checkout -- content/`

### Getting Support

- Check this guide first
- Review example files in `content/`
- Test changes locally before deploying
- Keep backups of working versions

---

## 📝 Quick Reference

### File Locations

| Content Type | Location | Example |
|--------------|----------|---------|
| Profile | `content/profile.md` | Main info |
| Experience | `content/experience/*.md` | Work history |
| Education | `content/academic/*.md` | Schools |
| Projects | `content/projects/*.md` | Portfolio |

### Required Fields

**Profile:**
- name, title, email, about

**Experience:**
- period, business, role, highlights

**Academic:**
- period, title, institution, highlights

**Projects:**
- title, meta, featured, role, stack

### Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

**Guide Version:** 1.0  
**Last Updated:** 2026-05-14  
**Status:** Ready to Use ✅
