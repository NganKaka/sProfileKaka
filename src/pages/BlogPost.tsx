import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import { loadBlogBySlug } from '../lib/contentLoader';
import { blogPostSchema } from '../schemas/content';
import SiteNavbar from '../components/SiteNavbar';
import SiteFooter from '../components/SiteFooter';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const entry = useMemo(() => (slug ? loadBlogBySlug(slug, blogPostSchema) : null), [slug]);

  if (!slug) return <Navigate to="/blog" />;
  if (!entry) return <Navigate to="/404" />;

  const post = entry.data;
  const content = entry.content;

  return (
    <div className="min-h-screen relative text-on-surface">
      <SiteNavbar />

      <main className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 pt-32 pb-20">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-tech uppercase tracking-[0.14em] text-secondary/70 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft size={14} />
              Back to blog
            </Link>

            <header className="space-y-4">
              {post.featured && (
                <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-tech text-[10px] uppercase tracking-[0.16em] text-primary">
                  Featured
                </span>
              )}

              <h1 className="font-headline text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">
                {post.title}
              </h1>

              <p className="text-lg text-secondary/85 leading-relaxed">{post.excerpt}</p>

              <div className="flex flex-wrap items-center gap-4 text-[11px] font-tech uppercase tracking-[0.16em] text-secondary/60">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={12} />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={12} />
                  {post.readTime} min read
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cyan-300/20 bg-cyan-950/15 px-3 py-1 font-tech text-[10px] uppercase tracking-[0.12em] text-cyan-100/75"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full rounded-2xl border border-white/10"
              />
            )}

            <div className="prose prose-invert max-w-none prose-headings:font-headline prose-headings:text-on-surface prose-p:text-secondary/85 prose-a:text-cyan-300 prose-strong:text-on-surface prose-code:text-cyan-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[#0a0e14] prose-pre:border prose-pre:border-white/10">
            <pre className="whitespace-pre-wrap font-body text-secondary/85 leading-relaxed bg-transparent border-0 p-0">
              {content}
            </pre>
          </div>
        </motion.article>
      </main>

      <SiteFooter />
    </div>
  );
}
