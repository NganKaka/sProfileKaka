import { useState, useEffect } from 'react';
import matter from 'gray-matter';
import { z } from 'zod';

/**
 * React Hooks for Loading Content from MDX Files
 */

type ContentState<T> = {
  data: T | null;
  content: string | null;
  loading: boolean;
  error: Error | null;
};

/**
 * Hook to load a single content file
 */
export function useContent<T>(
  path: string,
  schema: z.ZodSchema<T>
): ContentState<T> {
  const [state, setState] = useState<ContentState<T>>({
    data: null,
    content: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadContent() {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));

        const response = await fetch(path);
        if (!response.ok) {
          throw new Error(`Failed to load ${path}: ${response.statusText}`);
        }

        const fileContent = await response.text();
        const { data, content } = matter(fileContent);

        // Validate with schema
        const validatedData = schema.parse(data);

        if (!cancelled) {
          setState({
            data: validatedData,
            content,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            data: null,
            content: null,
            loading: false,
            error: error instanceof Error ? error : new Error('Unknown error'),
          });
        }
      }
    }

    loadContent();

    return () => {
      cancelled = true;
    };
  }, [path, schema]);

  return state;
}

/**
 * Hook to load multiple content files
 */
export function useContentList<T>(
  paths: string[],
  schema: z.ZodSchema<T>
): {
  items: Array<{ data: T; content: string; path: string }>;
  loading: boolean;
  error: Error | null;
} {
  const [state, setState] = useState<{
    items: Array<{ data: T; content: string; path: string }>;
    loading: boolean;
    error: Error | null;
  }>({
    items: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadContents() {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));

        const results = await Promise.all(
          paths.map(async (path) => {
            try {
              const response = await fetch(path);
              if (!response.ok) {
                throw new Error(`Failed to load ${path}`);
              }

              const fileContent = await response.text();
              const { data, content } = matter(fileContent);
              const validatedData = schema.parse(data);

              return { data: validatedData, content, path };
            } catch (error) {
              console.error(`Error loading ${path}:`, error);
              return null;
            }
          })
        );

        const validResults = results.filter((r): r is { data: T; content: string; path: string } => r !== null);

        if (!cancelled) {
          setState({
            items: validResults,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            items: [],
            loading: false,
            error: error instanceof Error ? error : new Error('Unknown error'),
          });
        }
      }
    }

    if (paths.length > 0) {
      loadContents();
    } else {
      setState({ items: [], loading: false, error: null });
    }

    return () => {
      cancelled = true;
    };
  }, [paths.join(','), schema]);

  return state;
}

/**
 * Hook to load content using Vite's import.meta.glob
 * This is more efficient as it uses Vite's built-in module system
 */
export function useContentGlob<T>(
  pattern: string,
  schema: z.ZodSchema<T>
): {
  items: Array<{ data: T; content: string; filename: string }>;
  loading: boolean;
  error: Error | null;
} {
  const [state, setState] = useState<{
    items: Array<{ data: T; content: string; filename: string }>;
    loading: boolean;
    error: Error | null;
  }>({
    items: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadContents() {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));

        // Use Vite's import.meta.glob to get all matching files
        const modules = import.meta.glob('/content/**/*.md', {
          eager: false,
          as: 'raw'
        });

        const matchingPaths = Object.keys(modules).filter(path => {
          // Simple pattern matching (you can enhance this)
          return path.includes(pattern.replace('**/', ''));
        });

        const results = await Promise.all(
          matchingPaths.map(async (path) => {
            try {
              const fileContent = await modules[path]() as string;
              const { data, content } = matter(fileContent);
              const validatedData = schema.parse(data);
              const filename = path.split('/').pop() || '';

              return { data: validatedData, content, filename };
            } catch (error) {
              console.error(`Error loading ${path}:`, error);
              return null;
            }
          })
        );

        const validResults = results.filter((r): r is { data: T; content: string; filename: string } => r !== null);

        if (!cancelled) {
          setState({
            items: validResults,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            items: [],
            loading: false,
            error: error instanceof Error ? error : new Error('Unknown error'),
          });
        }
      }
    }

    loadContents();

    return () => {
      cancelled = true;
    };
  }, [pattern, schema]);

  return state;
}
