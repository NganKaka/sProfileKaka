import { z } from 'zod';

/**
 * Profile Schema
 * Main profile information
 */
export const profileSchema = z.object({
  name: z.string(),
  title: z.string(),
  heroImage: z.string().url().optional(),
  profileImage: z.string().optional(),
  resumeUrl: z.string().optional(),
  availability: z.string(),
  contactCta: z.string(),
  personalNote: z.string(),
  tagline: z.array(z.string()),
  summary: z.string(),
  about: z.string(),
  location: z.string(),
  email: z.string().email(),
  tripSiteUrl: z.string().url().optional(),
});

export type Profile = z.infer<typeof profileSchema>;

/**
 * Social Link Schema
 */
export const socialSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export type Social = z.infer<typeof socialSchema>;

/**
 * Stat Schema
 */
export const statSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export type Stat = z.infer<typeof statSchema>;

/**
 * Language Skill Schema
 */
export const languageSkillSchema = z.object({
  name: z.string(),
  level: z.number().min(0).max(100),
});

export type LanguageSkill = z.infer<typeof languageSkillSchema>;

/**
 * Experience Schema
 */
export const experienceSchema = z.object({
  period: z.string(),
  business: z.string(),
  role: z.string(),
  details: z.array(z.string()).optional(),
  highlights: z.array(z.string()),
});

export type Experience = z.infer<typeof experienceSchema>;

/**
 * Academic Timeline Schema
 */
export const academicSchema = z.object({
  period: z.string(),
  title: z.string(),
  institution: z.string(),
  achievements: z.array(z.string()).optional(),
  images: z.array(z.string()),
  highlights: z.array(z.string()),
  story: z.string().optional(),
});

export type Academic = z.infer<typeof academicSchema>;

/**
 * Skill Schema
 */
export const skillSchema = z.object({
  title: z.string(),
  body: z.string(),
});

export type Skill = z.infer<typeof skillSchema>;

/**
 * Hobby Schema
 */
export const hobbySchema = z.object({
  title: z.string(),
  body: z.string(),
  image: z.string(),
  accent: z.string(),
});

export type Hobby = z.infer<typeof hobbySchema>;

/**
 * Project Schema
 */
export const projectSchema = z.object({
  title: z.string(),
  meta: z.string(),
  body: z.string().optional(),
  href: z.string().optional(),
  cta: z.string().optional(),
  liveUrl: z.string(),
  codeUrl: z.string(),
  caseStudyUrl: z.string(),
  previewImage: z.string(),
  featured: z.boolean(),
  role: z.string(),
  stack: z.array(z.string()),
  highlights: z.array(z.string()),
  outcome: z.string(),
  proof: z.string(),
});

export type Project = z.infer<typeof projectSchema>;

/**
 * Blog Post Schema
 */
export const blogPostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  excerpt: z.string(),
  tags: z.array(z.string()),
  readTime: z.number(),
  coverImage: z.string().optional(),
  featured: z.boolean().optional(),
});

export type BlogPost = z.infer<typeof blogPostSchema>;

/**
 * Testimonial Schema
 */
export const testimonialSchema = z.object({
  name: z.string(),
  role: z.string(),
  company: z.string(),
  quote: z.string(),
  avatar: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
});

export type Testimonial = z.infer<typeof testimonialSchema>;
