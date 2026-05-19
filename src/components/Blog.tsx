import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Calendar, Clock, X } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  readTime: string;
  category: string;
  author: string;
  slug: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "How We Built a Geofence Engine with Sub-100ms Latency",
    excerpt: "An in-depth look into using Node.js, Redis, and PostgreSQL for real-time location tracking and geofencing event propagation.",
    content: [
      "In modern logistics and dynamic dispatching applications, geofencing is a core pillar. When we set out to build our tracking systems, the challenge was clear: we needed to detect geofence breach events (entry/exit) with sub-100ms latency, handling up to 10,000 active drivers sending coordinates every 3 seconds.",
      "Our architecture uses a multi-layered approach. The ingress layer accepts UDP and WebSocket location feeds and places them on a Redis Stream. Location coordinates are matched against zones stored in PostgreSQL using PostGIS indexing. However, running PostGIS spatial queries on every ping was too heavy.",
      "To optimize this, we introduced a Redis-based cache storing the grid coordinates of our zones. Driver locations are first filtered using a simple bounding box check. If a driver is close to a boundary, we run a precise check in Redis using custom Lua scripts. If there's a zone transition, an event is fired asynchronously to our webhook dispatcher.",
      "Through this optimization, we reduced database load by 94% and achieved an average event propagation latency of 78ms, far below our initial 100ms target."
    ],
    date: "May 15, 2026",
    readTime: "5 min read",
    category: "Backend",
    author: "Bonsa Desalegn",
    slug: "building-geofence-engine"
  },
  {
    id: 2,
    title: "Why Playwright is Overriding Selenium for Modern E2E Testing",
    excerpt: "Analyzing the architecture differences, execution speed, and developer experience between Selenium and Playwright in enterprise environments.",
    content: [
      "For years, Selenium has been the de facto standard for end-to-end web testing. However, the modern web has evolved. Dynamic single-page applications, shadow DOMs, and real-time state synchronization demand a testing tool built for modern web architectures. Enter Playwright.",
      "Unlike Selenium, which communicates with browsers using the HTTP-based WebDriver protocol (causing latency and synchronization issues), Playwright connects directly to browsers via the Chrome DevTools Protocol (CDP) and equivalent WebSocket-based debugging protocols for Firefox and WebKit.",
      "This bidirectional communication enables auto-waiting. Playwright automatically waits for elements to be actionable before performing actions, which eliminates 90% of the flaky sleep/timeout statements that plague Selenium test suites. Furthermore, Playwright runs tests in browser contexts rather than separate browser instances, allowing thousands of tests to run in parallel in a fraction of the time.",
      "In our migration, we observed a 60% reduction in test execution times and cut flaky test alerts in our CI/CD pipelines to near zero."
    ],
    date: "May 10, 2026",
    readTime: "7 min read",
    category: "QA Automation",
    author: "Bonsa Desalegn",
    slug: "playwright-vs-selenium"
  },
  {
    id: 3,
    title: "Implementing Secure HMAC Webhook Verification in Node.js",
    excerpt: "A step-by-step guide to securing public API endpoints against unauthorized payloads using SHA256 HMAC signatures.",
    content: [
      "Webhooks are the glue of the modern web, letting applications communicate in real-time. But exposing a public HTTP endpoint that triggers background processing or database mutations introduces a massive security risk: payload tampering and replay attacks.",
      "The industry standard for securing webhooks is HMAC (Hash-based Message Authentication Code). By hashing the payload using a shared secret known only to the sender and the receiver, the receiver can verify both the authenticity (the sender is who they claim to be) and the integrity (the payload was not mutated in transit) of the request.",
      "Implementing this in Node.js is simple. We capture the raw request body (before JSON parsing) and compute a SHA256 HMAC hash using our shared secret. We then compare this computed hash against the signature provided in the request headers (e.g., X-Signature) using crypto.timingSafeEqual to prevent timing attacks.",
      "In this guide, we walk through the exact middleware implementation, error handling for expired timestamps, and setting up secure secrets in your environment configuration."
    ],
    date: "May 01, 2026",
    readTime: "4 min read",
    category: "Security",
    author: "Bonsa Desalegn",
    slug: "hmac-webhook-verification"
  }
];

export function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedPost]);

  return (
    <section id="blog" className="py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-6">
            <span className="text-primary font-mono text-[10px] tracking-[0.4em] uppercase">Insights</span>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mt-4">Technical <br /> Articles.</h2>
          </div>
          <div className="lg:col-span-6 flex items-end justify-end">
            <p className="text-muted-foreground font-mono text-sm max-w-sm text-right">
              Sharing thoughts on automated testing pipelines, software reliability, and high-performance backend design.
            </p>
          </div>
        </div>

        <div className="flex flex-col border-t border-border">
          {BLOG_POSTS.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group border-b border-border py-12 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-muted/30 transition-all duration-300 px-4 md:px-8"
            >
              <div className="space-y-4 max-w-3xl">
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
                  <span className="text-primary uppercase tracking-wider">{post.category}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div 
                onClick={() => setSelectedPost(post)}
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground font-bold border border-border group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all px-6 py-3 w-fit shrink-0 cursor-pointer"
              >
                Read Post
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Modal Detail Overlay */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-3xl max-h-[85vh] bg-card border border-border flex flex-col brutalist-shadow overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border bg-muted/20">
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
                  <span className="text-primary uppercase tracking-wider">{selectedPost.category}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {selectedPost.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {selectedPost.readTime}</span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 border border-border hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  aria-label="Close details"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6">
                <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-foreground">
                  {selectedPost.title}
                </h3>
                
                <div className="h-px bg-border" />
                
                <div className="space-y-6 font-mono text-sm leading-relaxed text-muted-foreground">
                  {selectedPost.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-6 text-xs font-mono text-muted-foreground">
                  Written by: <span className="text-foreground font-bold">{selectedPost.author}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
