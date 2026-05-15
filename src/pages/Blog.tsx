import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadBlog } from '../lib/contentLoader';
import { blogPostSchema, type BlogPost } from '../schemas/content';
import SiteNavbar from '../components/SiteNavbar';
import SiteFooter from '../components/SiteFooter';
import SectionHeading from '../components/ui/SectionHeading';

const posts = loadBlog(blogPostSchema);

export default function Blog() {
  return (
    <div className="min-h-screen relative text-on-surface">
      <SiteNavbar />

      <main className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-20 space-y-12">
        <SectionHeading
          eyebrow="Blog"
          title="Thoughts and tutorials"
          subtitle="Notes on engineering, design, and the craft of building software."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, index) => (
              <motion.article
                key={post.data.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link
                  to={`/blog/${post.data.slug}`}
                  className="glass-card block rounded-2xl overflow-hidden hover:border-cyan-300/35 transition-all"
                >
                  {post.data.coverImage && (
                    <div className="aspect-video overflow-hidden bg-white/[0.02]">
                      <img
                        src={post.data.coverImage}
                        alt={post.data.title}
                        className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                      />
                    </div>
                  )}

                  <div className="p-6 space-y-4">
                    {post.data.featured && (
                      <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-tech text-[9px] uppercase tracking-[0.16em] text-primary">
                        Featured
                      </span>
                    )}

                    <h2 className="font-headline text-2xl font-bold text-on-surface group-hover:text-cyan-200 transition-colors">
                      {post.data.title}
                    </h2>

                    <p className="text-sm text-secondary/80 leading-relaxed line-clamp-2">
                      {post.data.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-tech uppercase tracking-[0.16em] text-secondary/60">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={11} />
                        {new Date(post.data.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={11} />
                        {post.data.readTime} min read
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {post.data.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-cyan-300/20 bg-cyan-950/15 px-2.5 py-0.5 font-tech text-[9px] uppercase tracking-[0.12em] text-cyan-100/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-sm font-tech uppercase tracking-[0.14em] text-primary group-hover:gap-2.5 transition-all">
                      Read article
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
