import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { BLOG_POSTS } from "./Blog";
import { useEffect } from "react";

export function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl font-black uppercase">Post Not Found</h1>
        <Link 
          to="/" 
          className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-foreground font-bold border border-border hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all px-6 py-3"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="noise-bg min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground mb-6">
            <span className="text-primary uppercase tracking-wider">{post.category}</span>
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {post.date}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-12">
            {post.title}
          </h1>

          <div className="h-px bg-border mb-12" />

          <div className="space-y-8 font-mono text-base md:text-lg leading-relaxed text-muted-foreground">
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-border flex items-center justify-between font-mono text-sm">
            <span className="text-muted-foreground">Written by: <span className="text-foreground font-bold">{post.author}</span></span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
