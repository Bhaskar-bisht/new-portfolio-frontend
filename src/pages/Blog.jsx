import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RiCalendarLine, RiTimeLine, RiArrowRightLine } from 'react-icons/ri'
import { getBlogs } from '../utils/api'
import { useReveal } from '../hooks/useReveal'

const CARD_COLORS = [
  'var(--pastel-sky)',
  'var(--pastel-mint)',
  'var(--pastel-lavender)',
  'var(--pastel-peach)',
  'var(--pastel-pink)',
  'var(--pastel-yellow)',
]

export default function Blog() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const revealRef = useReveal()

  useEffect(() => {
    getBlogs({ limit: 20 })
      .then((res) => {
        const data = res.data?.data || res.data || []
        setBlogs(data)
      })
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen px-6 lg:px-12 py-16" ref={revealRef}>
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="reveal mb-12">
          <h2 className="section-heading">Blog</h2>
          <p className="section-sub">Thoughts, learnings & tutorials</p>
        </div>

        {loading ? (
          <BlogSkeleton />
        ) : blogs.length === 0 ? (
          <div className="card-glass p-12 text-center">
            <p style={{ color: 'var(--text-muted)' }}>No blog posts yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {blogs.map((blog, i) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                color={CARD_COLORS[i % CARD_COLORS.length]}
                delay={Math.min(i % 4 + 1, 4)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function BlogCard({ blog, color, delay }) {
  return (
    <Link
      to={`/blog/${blog._id}`}
      className={`reveal reveal-delay-${delay} card-glass p-6 flex flex-col md:flex-row gap-5 group`}
      style={{ textDecoration: 'none', background: 'rgba(255,255,255,0.8)' }}
    >
      {/* Thumbnail */}
      {blog.thumbnail && (
        <div className="img-overlay w-full md:w-40 h-32 flex-shrink-0 rounded-xl">
          <img src={blog.thumbnail} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      )}
      {!blog.thumbnail && (
        <div
          className="w-full md:w-40 h-32 flex-shrink-0 rounded-xl flex items-center justify-center text-2xl font-bold"
          style={{ background: color }}
        >
          <span style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>✍</span>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {blog.category && (
          <span
            className="tag mb-2 inline-flex"
            style={{ background: color, color: 'var(--text-secondary)', fontSize: '11px' }}
          >
            {blog.category}
          </span>
        )}
        <h3
          className="font-semibold mb-2 group-hover:text-indigo-600 transition-colors"
          style={{ fontSize: '16px', color: 'var(--text-primary)', lineHeight: 1.4 }}
        >
          {blog.title}
        </h3>
        {blog.excerpt && (
          <p className="text-sm line-clamp-2 mb-3" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {blog.excerpt}
          </p>
        )}
        <div className="flex items-center gap-4">
          {blog.createdAt && (
            <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
              <RiCalendarLine size={12} />
              {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          )}
          {blog.readTime && (
            <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
              <RiTimeLine size={12} />
              {blog.readTime} min read
            </span>
          )}
          <span
            className="ml-auto flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: 'var(--accent)' }}
          >
            Read more <RiArrowRightLine size={13} />
          </span>
        </div>
      </div>
    </Link>
  )
}

function BlogSkeleton() {
  return (
    <div className="flex flex-col gap-5 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="card-glass p-6 flex gap-5">
          <div className="w-40 h-32 bg-gray-100 rounded-xl flex-shrink-0" />
          <div className="flex-1">
            <div className="h-4 bg-gray-100 rounded w-3/4 mb-3" />
            <div className="h-3 bg-gray-100 rounded w-full mb-2" />
            <div className="h-3 bg-gray-100 rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}
