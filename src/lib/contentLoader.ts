import { z } from 'zod';

/**
 * Build-time content loader. Markdown files under src/content are pulled in by
 * Vite's import.meta.glob in raw mode and parsed once at module init. No
 * runtime fetch, no gray-matter, no Buffer polyfill.
 */

type ParsedFrontmatter = Record<string, unknown>;

/**
 * Tiny YAML-frontmatter parser. Supports the subset used by this project:
 * - scalars: strings, numbers, booleans
 * - block sequences (`- item`) of scalars
 * - quoted strings ("..." or '...')
 *
 * Anything more complex than that should be added intentionally.
 */
function parseFrontmatter(raw: string): { data: ParsedFrontmatter; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const [, head, body] = match;
  const data: ParsedFrontmatter = {};
  const lines = head.split(/\r?\n/);

  let currentKey: string | null = null;
  let currentList: string[] | null = null;

  for (const rawLine of lines) {
    if (!rawLine.trim()) continue;
    const listMatch = rawLine.match(/^\s+-\s+(.*)$/);

    if (listMatch && currentKey && currentList) {
      currentList.push(unquote(listMatch[1].trim()));
      continue;
    }

    const kv = rawLine.match(/^([A-Za-z0-9_]+)\s*:\s*(.*)$/);
    if (!kv) continue;

    if (currentKey && currentList) {
      data[currentKey] = currentList;
    }

    const [, key, valueRaw] = kv;
    const value = valueRaw.trim();

    if (value === '') {
      currentKey = key;
      currentList = [];
    } else {
      currentKey = null;
      currentList = null;
      data[key] = coerce(unquote(value));
    }
  }

  if (currentKey && currentList) {
    data[currentKey] = currentList;
  }

  return { data, content: body ?? '' };
}

function unquote(value: string): string {
  if (value.length >= 2) {
    const first = value[0];
    const last = value[value.length - 1];
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return value.slice(1, -1);
    }
  }
  return value;
}

function coerce(value: string): unknown {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  if (/^-?\d+$/.test(value)) return Number(value);
  if (/^-?\d+\.\d+$/.test(value)) return Number(value);
  return value;
}

export type LoadedContent<T> = {
  data: T;
  content: string;
  /** Path relative to /src, with leading slash. Stable identifier for keys. */
  path: string;
};

type RawModules = Record<string, string>;

function buildEntries<T>(modules: RawModules, schema: z.ZodSchema<T>): LoadedContent<T>[] {
  return Object.keys(modules)
    .sort()
    .map((path) => {
      const raw = modules[path];
      const { data, content } = parseFrontmatter(raw);
      const validated = schema.parse(data);
      return { data: validated, content, path };
    });
}

const academicModules = import.meta.glob('/src/content/academic/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as RawModules;

const experienceModules = import.meta.glob('/src/content/experience/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as RawModules;

const projectModules = import.meta.glob('/src/content/projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as RawModules;

const blogModules = import.meta.glob('/src/content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as RawModules;

const testimonialModules = import.meta.glob('/src/content/testimonials/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as RawModules;

export function loadAcademic<T>(schema: z.ZodSchema<T>) {
  return buildEntries(academicModules, schema);
}
export function loadExperience<T>(schema: z.ZodSchema<T>) {
  return buildEntries(experienceModules, schema);
}
export function loadProjects<T>(schema: z.ZodSchema<T>) {
  return buildEntries(projectModules, schema);
}
export function loadBlog<T>(schema: z.ZodSchema<T>) {
  return buildEntries(blogModules, schema);
}
export function loadTestimonials<T>(schema: z.ZodSchema<T>) {
  return buildEntries(testimonialModules, schema);
}

export function loadBlogBySlug<T extends { slug: string }>(
  slug: string,
  schema: z.ZodSchema<T>,
): LoadedContent<T> | null {
  return loadBlog(schema).find((entry) => entry.data.slug === slug) ?? null;
}
