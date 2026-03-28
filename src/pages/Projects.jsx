/** @format */

import { useEffect, useState } from "react";
import { RiArrowRightLine, RiExternalLinkLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import { getProjects } from "../utils/api";

const CARD_COLORS = [
    "var(--pastel-pink)",
    "var(--pastel-peach)",
    "var(--pastel-mint)",
    "var(--pastel-lavender)",
    "var(--pastel-sky)",
    "var(--pastel-yellow)",
];

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [categories, setCategories] = useState(["All"]);
    const revealRef = useReveal();

    useEffect(() => {
        getProjects({ limit: 50 })
            .then((res) => {
                const data = res.data?.data || res.data || [];
                setProjects(data);
                const cats = ["All", ...new Set(data.map((p) => p.category).filter(Boolean))];
                setCategories(cats);
            })
            .catch(() => setProjects([]))
            .finally(() => setLoading(false));
    }, []);

    const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

    return (
        <div className="min-h-screen px-6 lg:px-12 py-16" ref={revealRef}>
            <div className="max-w-5xl mx-auto pt-8">
                {/* Header */}
                <div className="reveal mb-8">
                    <h2 className="section-heading">Projects</h2>
                    <p className="section-sub">Things I've built with passion</p>
                </div>

                {/* Filter */}
                {categories.length > 1 && (
                    <div className="reveal reveal-delay-1 flex flex-wrap gap-2 mb-10">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className="tag transition-all duration-200 cursor-pointer"
                                style={{
                                    background: filter === cat ? "var(--accent)" : "var(--card-bg)",
                                    color: filter === cat ? "white" : "var(--text-secondary)",
                                    border: `1px solid ${filter === cat ? "var(--accent)" : "var(--border)"}`,
                                    padding: "6px 16px",
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {loading ? (
                    <ProjectsSkeleton />
                ) : filtered.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map((project, i) => (
                            <ProjectCard
                                key={project._id}
                                project={project}
                                color={CARD_COLORS[i % CARD_COLORS.length]}
                                delay={Math.min((i % 3) + 1, 4)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function ProjectCard({ project, color, delay }) {
    return (
        <div
            className={`reveal reveal-delay-${delay} card-glass overflow-hidden group`}
            style={{ background: color, border: "1px solid rgba(255,255,255,0.7)" }}
        >
            {/* Thumbnail / Banner */}
            <div className="img-overlay h-44">
                {project.thumbnail ? (
                    <img src={project.thumbnail?.url} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                    <div
                        className="w-full h-full flex items-center justify-center text-2xl font-bold"
                        style={{ background: "rgba(255,255,255,0.4)" }}
                    >
                        <span style={{ color: "var(--text-secondary)", opacity: 0.5 }}>
                            {project.title?.[0] || "P"}
                        </span>
                    </div>
                )}

                {/* Overlay on hover */}
                <div
                    className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(26,26,46,0.6)" }}
                >
                    {project.projectUrl && (
                        <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-transform duration-200 hover:scale-110"
                            style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <RiExternalLinkLine size={17} />
                        </a>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-5" style={{ background: "rgba(255,255,255,0.45)" }}>
                {project.status && (
                    <span
                        className="tag mb-3 inline-flex"
                        style={{
                            background: "rgba(255,255,255,0.6)",
                            color: "var(--text-secondary)",
                            fontSize: "11px",
                        }}
                    >
                        {project.status}
                    </span>
                )}

                <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--text-primary)" }}>
                    {project.title}
                </h3>

                {project.shortDescription && (
                    <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                        {project.shortDescription}
                    </p>
                )}

                <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-medium transition-all duration-200 hover:gap-2"
                    style={{ color: "var(--accent)" }}
                >
                    View Details <RiArrowRightLine size={13} />
                </Link>
            </div>
        </div>
    );
}

function ProjectsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="card-glass overflow-hidden">
                    <div className="h-44 bg-gray-100" />
                    <div className="p-5">
                        <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                        <div className="h-3 bg-gray-100 rounded w-full mb-1" />
                        <div className="h-3 bg-gray-100 rounded w-2/3" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function EmptyState() {
    return (
        <div className="card-glass p-12 text-center">
            <p style={{ color: "var(--text-muted)" }}>No projects found</p>
        </div>
    );
}
