# Portfolio Upgrade - Implementation Roadmap

**Project:** s-profile-kaka Portfolio Upgrade  
**Owner:** Vo Hoang Ngan  
**Start Date:** 2026-05-14  
**Target Completion:** 2026-06-30 (6 weeks)

---

## Overview

This roadmap breaks down the portfolio upgrade into weekly sprints with clear deliverables, dependencies, and success criteria. Each sprint builds on the previous one, ensuring steady progress toward a production-ready portfolio.

---

## Sprint Structure

- **Sprint Duration:** 1 week (5 working days)
- **Daily Commitment:** 4-6 hours
- **Weekly Review:** Friday afternoon
- **Total Sprints:** 6

---

## Sprint 1: Foundation & Quick Wins (Week 1)
**Dates:** May 14-18, 2026  
**Focus:** SEO, Performance, Basic Accessibility  
**Effort:** 20-28 hours

### Goals
- Implement all quick wins from QUICK_WINS.md
- Establish baseline metrics
- Set up monitoring and analytics

### Tasks

#### Day 1 (Wednesday) - SEO Optimization
- [ ] Update `index.html` with meta tags
- [ ] Add Open Graph and Twitter Card tags
- [ ] Create structured data (JSON-LD)
- [ ] Create `robots.txt` and `sitemap.xml`
- [ ] Design and add OG image (1200x630px)
- [ ] Test with Facebook Debugger and Twitter Validator

**Deliverable:** Complete SEO implementation  
**Success Criteria:** 95+ SEO score on Lighthouse

---

#### Day 2 (Thursday) - Performance Optimization
- [ ] Install and configure `vite-plugin-image-optimizer`
- [ ] Update font loading strategy
- [ ] Enhance `FadeInImage` component with lazy loading
- [ ] Add preload/preconnect hints
- [ ] Configure code splitting in Vite
- [ ] Run Lighthouse audit and document results

**Deliverable:** Optimized build configuration  
**Success Criteria:** 90+ Performance score, < 2s load time

---

#### Day 3 (Friday) - Accessibility Improvements
- [ ] Add skip navigation link
- [ ] Improve focus indicators in CSS
- [ ] Add ARIA labels to navigation
- [ ] Test keyboard navigation flow
- [ ] Add focus trap for modals
- [ ] Run axe DevTools audit

**Deliverable:** WCAG 2.1 AA baseline compliance  
**Success Criteria:** 90+ Accessibility score, no critical issues

---

#### Day 4 (Saturday) - Contact Form
- [ ] Install react-hook-form, zod, @hookform/resolvers
- [ ] Implement Contact component with validation
- [ ] Sign up for Formspree and configure
- [ ] Add form to App.tsx
- [ ] Style form to match portfolio aesthetic
- [ ] Test form submission and error handling

**Deliverable:** Functional contact form  
**Success Criteria:** Form submits successfully, validation works

---

#### Day 5 (Sunday) - Analytics & Testing
- [ ] Set up Plausible Analytics account
- [ ] Add analytics script to index.html
- [ ] Create analytics utility functions
- [ ] Add event tracking to key interactions
- [ ] Run full Lighthouse audit on all sections
- [ ] Document baseline metrics
- [ ] Create Sprint 1 completion report

**Deliverable:** Analytics integration + Sprint report  
**Success Criteria:** Analytics tracking events, all metrics documented

---

### Sprint 1 Success Metrics
- Lighthouse Performance: 90+
- Lighthouse SEO: 95+
- Lighthouse Accessibility: 90+
- Contact form conversion: Trackable
- Page load time: < 2s

---

## Sprint 2: Content Management System (Week 2)
**Dates:** May 19-25, 2026  
**Focus:** MDX-based content system  
**Effort:** 24-30 hours

### Goals
- Convert hardcoded data to MDX files
- Create content loading utilities
- Implement content validation
- Make content easily updatable

### Tasks

#### Day 1 (Monday) - MDX Setup
- [ ] Install @mdx-js/rollup, gray-matter, remark-gfm
- [ ] Configure Vite for MDX support
- [ ] Create content directory structure
- [ ] Test basic MDX rendering

**Deliverable:** MDX infrastructure  
**Files:** `vite.config.ts`, `content/` directory

---

#### Day 2 (Tuesday) - Profile & About Content
- [ ] Create `content/profile.mdx`
- [ ] Create `content/about.mdx`
- [ ] Create content loader utility
- [ ] Update About component to use MDX
- [ ] Test content rendering

**Deliverable:** Profile and About as MDX  
**Files:** `content/profile.mdx`, `src/lib/contentLoader.ts`

---

#### Day 3 (Wednesday) - Experience Content
- [ ] Create `content/experience/` directory
- [ ] Convert each experience to MDX file
- [ ] Update ExperienceTimeline component
- [ ] Add frontmatter validation with Zod
- [ ] Test timeline rendering

**Deliverable:** Experience as MDX  
**Files:** `content/experience/*.mdx`, `src/schemas/experience.ts`

---

#### Day 4 (Thursday) - Projects & Academic Content
- [ ] Create `content/projects/` directory
- [ ] Create `content/academic/` directory
- [ ] Convert projects to MDX
- [ ] Convert academic timeline to MDX
- [ ] Update respective components
- [ ] Test all content rendering

**Deliverable:** All content as MDX  
**Files:** `content/projects/*.mdx`, `content/academic/*.mdx`

---

#### Day 5 (Friday) - Skills & Documentation
- [ ] Create `content/skills.mdx`
- [ ] Create `content/hobbies.mdx`
- [ ] Update Skills component
- [ ] Create content editing guide (CONTENT_GUIDE.md)
- [ ] Test all sections with new content system
- [ ] Sprint 2 completion report

**Deliverable:** Complete MDX migration + documentation  
**Success Criteria:** All content editable via MDX files

---

### Sprint 2 Success Metrics
- All content in MDX format
- Content updates require no code changes
- Content validation prevents errors
- Documentation for content editing

---

## Sprint 3: Enhanced Features (Week 3)
**Dates:** May 26 - June 1, 2026  
**Focus:** Theme switcher, animations, UX improvements  
**Effort:** 22-28 hours

### Goals
- Implement light/dark theme toggle
- Add advanced animations
- Improve user experience
- Polish existing features

### Tasks

#### Day 1 (Monday) - Theme System Foundation
- [ ] Design light theme color palette
- [ ] Create theme context and provider
- [ ] Add theme variables to CSS
- [ ] Implement theme persistence (localStorage)
- [ ] Test theme switching

**Deliverable:** Theme infrastructure  
**Files:** `src/contexts/ThemeContext.tsx`, `src/index.css`

---

#### Day 2 (Tuesday) - Theme UI Components
- [ ] Create ThemeToggle component
- [ ] Add theme toggle to navbar
- [ ] Update all components for theme support
- [ ] Add smooth theme transition
- [ ] Test in both themes

**Deliverable:** Complete theme switcher  
**Files:** `src/components/ThemeToggle.tsx`

---

#### Day 3 (Wednesday) - Advanced Animations
- [ ] Create AnimatedCounter component
- [ ] Add page transition animations
- [ ] Implement loading skeleton screens
- [ ] Add parallax effects to background
- [ ] Test performance impact

**Deliverable:** Enhanced animations  
**Files:** `src/components/ui/AnimatedCounter.tsx`

---

#### Day 4 (Thursday) - UX Improvements
- [ ] Add loading states for async operations
- [ ] Improve error handling with error boundaries
- [ ] Create 404 page
- [ ] Add toast notifications system
- [ ] Improve mobile navigation

**Deliverable:** Better UX patterns  
**Files:** `src/components/ErrorBoundary.tsx`, `src/pages/404.tsx`

---

#### Day 5 (Friday) - Polish & Testing
- [ ] Fix any theme-related bugs
- [ ] Optimize animation performance
- [ ] Test on multiple devices
- [ ] Update documentation
- [ ] Sprint 3 completion report

**Deliverable:** Polished features + report  
**Success Criteria:** Theme works flawlessly, animations smooth

---

### Sprint 3 Success Metrics
- Theme switcher functional
- No animation jank (60fps)
- Error boundaries catch all errors
- Mobile experience improved

---

## Sprint 4: Testing & Quality Assurance (Week 4)
**Dates:** June 2-8, 2026  
**Focus:** Automated testing, CI/CD, quality  
**Effort:** 24-32 hours

### Goals
- Set up comprehensive testing suite
- Implement CI/CD pipeline
- Ensure code quality
- Automate quality checks

### Tasks

#### Day 1 (Monday) - Testing Infrastructure
- [ ] Install Vitest, Testing Library, Playwright
- [ ] Configure Vitest
- [ ] Configure Playwright
- [ ] Create test utilities and helpers
- [ ] Write first test

**Deliverable:** Testing setup  
**Files:** `vitest.config.ts`, `playwright.config.ts`

---

#### Day 2 (Tuesday) - Unit Tests
- [ ] Write tests for utility functions
- [ ] Write tests for hooks
- [ ] Write tests for context providers
- [ ] Achieve 70%+ coverage on utilities
- [ ] Fix any bugs found

**Deliverable:** Unit test suite  
**Files:** `src/**/*.test.ts`

---

#### Day 3 (Wednesday) - Component Tests
- [ ] Write tests for UI components
- [ ] Write tests for form validation
- [ ] Write tests for theme switching
- [ ] Test accessibility with Testing Library
- [ ] Achieve 60%+ component coverage

**Deliverable:** Component test suite  
**Files:** `src/components/**/*.test.tsx`

---

#### Day 4 (Thursday) - E2E Tests
- [ ] Write E2E test for homepage flow
- [ ] Write E2E test for contact form
- [ ] Write E2E test for navigation
- [ ] Write E2E test for theme switching
- [ ] Test on multiple browsers

**Deliverable:** E2E test suite  
**Files:** `tests/e2e/**/*.spec.ts`

---

#### Day 5 (Friday) - CI/CD Pipeline
- [ ] Create GitHub Actions workflow for CI
- [ ] Add automated testing on PR
- [ ] Add Lighthouse CI
- [ ] Add automated deployment
- [ ] Set up preview deployments
- [ ] Sprint 4 completion report

**Deliverable:** Full CI/CD pipeline  
**Files:** `.github/workflows/ci.yml`, `.github/workflows/deploy.yml`

---

### Sprint 4 Success Metrics
- 70%+ test coverage
- All E2E tests passing
- CI/CD pipeline functional
- Automated quality checks

---

## Sprint 5: Advanced Features (Week 5)
**Dates:** June 9-15, 2026  
**Focus:** Blog, testimonials, enhanced projects  
**Effort:** 20-26 hours

### Goals
- Implement blog section (optional)
- Add testimonials
- Enhance project showcase
- Add case study pages

### Tasks

#### Day 1 (Monday) - Blog Infrastructure
- [ ] Design blog layout
- [ ] Create blog listing component
- [ ] Create blog post component
- [ ] Set up blog content structure
- [ ] Add syntax highlighting

**Deliverable:** Blog foundation  
**Files:** `src/components/Blog.tsx`, `content/blog/`

---

#### Day 2 (Tuesday) - Blog Features
- [ ] Add blog post metadata (tags, date, reading time)
- [ ] Implement blog filtering and search
- [ ] Add RSS feed generation
- [ ] Create first blog post
- [ ] Test blog functionality

**Deliverable:** Complete blog system  
**Files:** `src/lib/blogLoader.ts`, `public/rss.xml`

---

#### Day 3 (Wednesday) - Testimonials
- [ ] Design testimonials section
- [ ] Create testimonials carousel
- [ ] Add testimonial data
- [ ] Implement auto-play with controls
- [ ] Add to homepage

**Deliverable:** Testimonials section  
**Files:** `src/components/Testimonials.tsx`

---

#### Day 4 (Thursday) - Enhanced Projects
- [ ] Create project detail modal
- [ ] Add project filtering
- [ ] Implement project search
- [ ] Add more project metadata
- [ ] Improve project cards

**Deliverable:** Better project showcase  
**Files:** `src/components/ProjectDetail.tsx`

---

#### Day 5 (Friday) - Case Studies
- [ ] Create case study template
- [ ] Write case study for sTripKaka
- [ ] Add case study routing
- [ ] Link from projects section
- [ ] Sprint 5 completion report

**Deliverable:** Case study pages  
**Files:** `content/case-studies/*.mdx`

---

### Sprint 5 Success Metrics
- Blog functional and SEO-optimized
- Testimonials add credibility
- Projects more engaging
- Case studies tell full story

---

## Sprint 6: Polish & Launch (Week 6)
**Dates:** June 16-22, 2026  
**Focus:** Final polish, optimization, launch prep  
**Effort:** 20-24 hours

### Goals
- Final bug fixes and polish
- Performance optimization
- Documentation completion
- Launch preparation

### Tasks

#### Day 1 (Monday) - Bug Fixes
- [ ] Review all open issues
- [ ] Fix critical bugs
- [ ] Fix UI inconsistencies
- [ ] Test on all browsers
- [ ] Test on all devices

**Deliverable:** Bug-free experience  

---

#### Day 2 (Tuesday) - Performance Audit
- [ ] Run comprehensive Lighthouse audit
- [ ] Optimize any slow sections
- [ ] Reduce bundle size if needed
- [ ] Test on slow connections
- [ ] Verify Core Web Vitals

**Deliverable:** Optimized performance  
**Success Criteria:** All Lighthouse scores 90+

---

#### Day 3 (Wednesday) - Documentation
- [ ] Complete README.md
- [ ] Write CONTRIBUTING.md
- [ ] Document all components
- [ ] Create deployment guide
- [ ] Update all documentation

**Deliverable:** Complete documentation  
**Files:** `README.md`, `CONTRIBUTING.md`, `docs/`

---

#### Day 4 (Thursday) - Pre-launch Checklist
- [ ] Verify all links work
- [ ] Test contact form end-to-end
- [ ] Verify analytics tracking
- [ ] Test SEO on staging
- [ ] Run accessibility audit
- [ ] Get feedback from 3-5 people

**Deliverable:** Launch-ready site  

---

#### Day 5 (Friday) - Launch!
- [ ] Deploy to production
- [ ] Verify production deployment
- [ ] Submit to search engines
- [ ] Share on social media
- [ ] Monitor analytics and errors
- [ ] Final project report

**Deliverable:** Live portfolio + report  
**Success Criteria:** Site live and performing well

---

### Sprint 6 Success Metrics
- Zero critical bugs
- All documentation complete
- Successfully deployed
- Positive user feedback

---

## Post-Launch Activities (Week 7+)

### Week 7: Monitor & Iterate
- Monitor analytics daily
- Fix any reported bugs
- Gather user feedback
- Make minor improvements

### Week 8: Content Updates
- Write 2-3 blog posts
- Add new projects
- Update experience section
- Refresh academic achievements

### Month 2-3: Feature Additions
- Implement user-requested features
- Add internationalization if needed
- Enhance existing sections
- Consider advanced features from Phase 5

---

## Risk Management

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| MDX migration breaks existing features | Medium | High | Thorough testing, gradual migration |
| Performance degradation with new features | Medium | Medium | Regular Lighthouse audits, lazy loading |
| Theme switching causes visual bugs | Medium | Medium | Comprehensive theme testing |
| CI/CD pipeline failures | Low | Medium | Test locally first, gradual rollout |
| Browser compatibility issues | Low | High | Cross-browser testing in each sprint |

### Schedule Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Sprint overruns | Medium | Medium | Buffer time in estimates, prioritize ruthlessly |
| Scope creep | High | High | Stick to roadmap, defer nice-to-haves |
| Unexpected bugs | Medium | Medium | Allocate 20% time for bug fixes |
| External dependencies delay | Low | Medium | Choose reliable services, have backups |

---

## Success Criteria

### Technical Excellence
- ✅ Lighthouse scores: 90+ across all categories
- ✅ Test coverage: 70%+ overall
- ✅ Zero critical accessibility issues
- ✅ Core Web Vitals: All green
- ✅ Mobile-friendly: 100%

### User Experience
- ✅ Contact form conversion: 5%+
- ✅ Average session duration: 2+ minutes
- ✅ Bounce rate: < 40%
- ✅ Page load time: < 2s
- ✅ Positive user feedback

### Content & Features
- ✅ All content in MDX format
- ✅ Blog with 3+ posts
- ✅ Theme switcher functional
- ✅ Contact form working
- ✅ Analytics tracking

### Documentation
- ✅ Complete README
- ✅ Content editing guide
- ✅ Component documentation
- ✅ Deployment guide
- ✅ Contribution guidelines

---

## Resource Requirements

### Time Investment
- **Total:** 142-188 hours
- **Per Week:** 20-30 hours
- **Per Day:** 4-6 hours
- **Duration:** 6 weeks

### Tools & Services
- **Development:** VS Code, Git, Node.js
- **Testing:** Vitest, Playwright, Testing Library
- **Analytics:** Plausible Analytics ($9/month)
- **Forms:** Formspree (Free tier)
- **Hosting:** Vercel/Netlify (Free tier)
- **Monitoring:** Sentry (Free tier)

### Budget
- **Development:** Self-managed (no cost)
- **Services:** $0-20/month
- **Domain:** $10-15/year
- **Total Year 1:** $50-250

---

## Communication Plan

### Weekly Updates
- **When:** Every Friday
- **Format:** Sprint completion report
- **Content:** Completed tasks, blockers, next week plan

### Milestone Celebrations
- Sprint 1: Foundation complete 🎉
- Sprint 2: Content system live 🎉
- Sprint 4: Testing complete 🎉
- Sprint 6: Launch! 🚀

---

## Rollback Plan

If critical issues arise post-launch:

1. **Immediate:** Revert to previous stable version
2. **Within 1 hour:** Identify root cause
3. **Within 4 hours:** Deploy hotfix or keep rollback
4. **Within 24 hours:** Post-mortem and prevention plan

---

## Maintenance Plan

### Daily (First Week)
- Monitor analytics
- Check error logs
- Respond to user feedback

### Weekly
- Review analytics trends
- Update content
- Fix minor bugs

### Monthly
- Security updates
- Dependency updates
- Performance audit
- Content refresh

### Quarterly
- Major feature additions
- Design refresh
- Comprehensive audit
- User survey

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-05-14 | Initial roadmap created |
| 1.1 | TBD | Post-Sprint 1 adjustments |
| 2.0 | TBD | Post-launch updates |

---

## Appendix

### Useful Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview production build
npm run preview

# Type check
npm run lint

# Run tests
npm run test

# Run E2E tests
npm run test:e2e

# Run Lighthouse CI
npm run lighthouse
```

### Useful Links
- [Upgrade Plan](./UPGRADE_PLAN.md)
- [Quick Wins Guide](./QUICK_WINS.md)
- [Content Editing Guide](./CONTENT_GUIDE.md) (to be created)
- [Component Documentation](./docs/components.md) (to be created)

---

**Document Version:** 1.0  
**Last Updated:** 2026-05-14  
**Status:** Ready for Execution  
**Next Review:** 2026-05-18 (End of Sprint 1)
