import matter from 'gray-matter';
import { z } from 'zod';

/**
 * Content Loader Utility
 * Loads and parses MDX files with frontmatter validation
 */

/**
 * Load a single MDX file with frontmatter
 */
export async function loadMDXFile<T>(
  path: string,
  schema: z.ZodSchema<T>
): Promise<{ data: T; content: string }> {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load ${path}: ${response.statusText}`);
    }

    const fileContent = await response.text();
    const { data, content } = matter(fileContent);

    // Validate frontmatter with schema
    const validatedData = schema.parse(data);

    return {
      data: validatedData,
      content,
    };
  } catch (error) {
    console.error(`Error loading MDX file ${path}:`, error);
    throw error;
  }
}

/**
 * Load multiple MDX files from a directory
 */
export async function loadMDXFiles<T>(
  paths: string[],
  schema: z.ZodSchema<T>
): Promise<Array<{ data: T; content: string; path: string }>> {
  const results = await Promise.all(
    paths.map(async (path) => {
      try {
        const result = await loadMDXFile(path, schema);
        return { ...result, path };
      } catch (error) {
        console.error(`Failed to load ${path}:`, error);
        return null;
      }
    })
  );

  return results.filter((result): result is { data: T; content: string; path: string } => result !== null);
}

/**
 * Load all MDX files from a directory pattern
 * Note: In production, you'll need to explicitly list files or use a build-time plugin
 */
export async function loadMDXDirectory<T>(
  directory: string,
  schema: z.ZodSchema<T>
): Promise<Array<{ data: T; content: string; filename: string }>> {
  // This is a placeholder - in a real implementation, you'd use:
  // 1. Vite's import.meta.glob for build-time file discovery
  // 2. Or explicitly list files in the directory

  console.warn('loadMDXDirectory requires explicit file listing or build-time plugin');
  return [];
}

/**
 * Parse frontmatter from a string
 */
export function parseFrontmatter<T>(
  content: string,
  schema: z.ZodSchema<T>
): { data: T; content: string } {
  const { data, content: body } = matter(content);
  const validatedData = schema.parse(data);

  return {
    data: validatedData,
    content: body,
  };
}

/**
 * Validate frontmatter data against a schema
 */
export function validateFrontmatter<T>(
  data: unknown,
  schema: z.ZodSchema<T>
): T {
  return schema.parse(data);
}

/**
 * Helper to get all files matching a glob pattern using Vite's import.meta.glob
 * This should be used at build time
 */
export function getContentFiles(pattern: string) {
  // Example usage in a component:
  // const files = import.meta.glob('/content/**/*.mdx', { eager: true });
  return import.meta.glob(pattern, { eager: false, as: 'raw' });
}
