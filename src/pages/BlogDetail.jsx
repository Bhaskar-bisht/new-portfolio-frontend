import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { RiArrowLeftLine, RiCalendarLine, RiTimeLine } from 'react-icons/ri'
import { getBlog } from '../utils/api'
import { useReveal } from '../hooks/useReveal'

export default function BlogDetail() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const revealRef = useReveal()

  useEffect(() => {
    getBlog(id)
      .then((res) => setBlog(res.data?.data || res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="min-h-screen px-6 lg:px-12 py-16 animate-pulse">
      <div className="max-w-3xl mx-auto pt-8">
        <div className="h-4 bg-gray-100 rounded w-32 mb-8" />
        <div className="h-8 bg-gray-100 rounded w-3/4 mb-4" />
        <div className="w-full h-64 bg-gray-100 rounded-2xl mb-8" />
      </div>
    </div>
  )

  if (!blog) return (
    <div className="min-h-screen flex items-center justify-center">
      <p style={{ color: 'var(--text-muted)' }}>Blog post not found</p>
    </div>
  )

  return (
    <div className="min-h-screen px-6 lg:px-12 py-16" ref={revealRef}>
      <div className="max-w-3xl mx-auto pt-8">
        {/* Back */}
        <div className="reveal mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:gap-3"
            style={{ color: 'var(--text-secondary)' }}
          >
            <RiArrowLeftLine size={16} /> Back to Blog
          </Link>
        </div>

        {/* Header */}
        <div className="reveal mb-6">
          {blog.category && (
            <span
              className="tag mb-3 inline-flex"
              style={{ background: 'var(--pastel-sky)', color: 'var(--text-secondary)', fontSize: '12px' }}
            >
              {blog.category}
            </span>
          )}
          <h1 className="section-heading mb-4" style={{ fontSize: 'clamp(22px, 4vw, 36px)' }}>
            {blog.title}
          </h1>
          <div className="flex items-center gap-4">
            {blog.createdAt && (
              <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-muted)' }}>
                <RiCalendarLine size={14} />
                {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            )}
            {blog.readTime && (
              <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-muted)' }}>
                <RiTimeLine size={14} />
                {blog.readTime} min read
              </span>
            )}
          </div>
        </div>

        {/* Thumbnail */}
        {blog.thumbnail && (
          <div
            className="reveal reveal-delay-1 rounded-2xl overflow-hidden mb-8"
            style={{ height: 'clamp(200px, 30vw, 360px)', boxShadow: 'var(--shadow-lg)' }}
          >
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="reveal reveal-delay-2 card-glass p-8"
          style={{ lineHeight: 1.8 }}
        >
          {blog.content ? (
            <div
              className="prose-custom text-sm"
              style={{ color: 'var(--text-secondary)' }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          ) : (
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {blog.excerpt}
            </p>
          )}
        </div>

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="reveal reveal-delay-3 flex flex-wrap gap-2 mt-6">
            {blog.tags.map((tag, i) => (
              <span
                key={i}
                className="tag"
                style={{ background: 'var(--accent-light)', color: 'var(--accent)', fontSize: '11px' }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
