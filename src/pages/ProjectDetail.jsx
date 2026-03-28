/** @format */

import { useEffect, useState } from "react";
import { RiArrowLeftLine, RiCalendarLine, RiExternalLinkLine, RiGroupLine, RiStarLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import { getProject } from "../utils/api";

export default function ProjectDetail() {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lightbox, setLightbox] = useState(null);
    const revealRef = useReveal();

    useEffect(() => {
        getProject(slug)
            .then((res) => {
                const data = res.data?.data || res.data;
                setProject(data);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [slug]);

    return (
        <div className="min-h-screen px-6 lg:px-12 py-16" ref={revealRef}>
            <div className="max-w-5xl mx-auto pt-8">
                {loading ? (
                    <ProjectDetailSkeleton />
                ) : !project ? (
                    <div className="min-h-screen flex items-center justify-center">
                        <p style={{ color: "var(--text-muted)" }}>Project not found</p>
                    </div>
                ) : (
                    <>
                        {/* Back */}
                        <div className="reveal mb-8">
                            <Link
                                to="/projects"
                                className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:gap-3"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                <RiArrowLeftLine size={16} /> Back to Projects
                            </Link>
                        </div>

                        {/* Banner */}
                        {project.banner?.url && (
                            <div
                                className="reveal reveal-delay-1 w-full rounded-2xl overflow-hidden mb-8 cursor-pointer"
                                style={{ height: "clamp(200px, 35vw, 420px)", boxShadow: "var(--shadow-lg)" }}
                                onClick={() => setLightbox(project.banner.url)}
                            >
                                <img
                                    src={project.banner.url}
                                    alt={`${project.title} banner`}
                                    className="w-full h-full object-cover"
                                    style={{ transition: "transform 0.5s ease" }}
                                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
                                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Title Card */}
                                <div
                                    className="reveal card-glass p-6"
                                    style={{ background: "#fce4ec", border: "1px solid rgba(255,255,255,0.7)" }}
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {project.projectType && (
                                                    <span
                                                        className="tag"
                                                        style={{
                                                            background: "rgba(255,255,255,0.6)",
                                                            color: "var(--text-secondary)",
                                                            fontSize: "11px",
                                                        }}
                                                    >
                                                        {project.projectType}
                                                    </span>
                                                )}
                                                {project.status && (
                                                    <span
                                                        className="tag"
                                                        style={{
                                                            background:
                                                                project.status === "completed" ? "#e8f5e9" : "#fff9c4",
                                                            color:
                                                                project.status === "completed" ? "#388e3c" : "#f57f17",
                                                            fontSize: "11px",
                                                        }}
                                                    >
                                                        {project.status}
                                                    </span>
                                                )}
                                                {project.featured && (
                                                    <span
                                                        className="tag inline-flex items-center gap-1"
                                                        style={{
                                                            background: "#fff3e0",
                                                            color: "#e65100",
                                                            fontSize: "11px",
                                                        }}
                                                    >
                                                        <RiStarLine size={11} /> Featured
                                                    </span>
                                                )}
                                            </div>
                                            <h1
                                                className="section-heading"
                                                style={{ fontSize: "clamp(22px, 4vw, 34px)" }}
                                            >
                                                {project.title}
                                            </h1>
                                        </div>
                                        {project.projectUrl && (
                                            <a
                                                href={project.projectUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium flex-shrink-0"
                                                style={{
                                                    background: "rgba(255,255,255,0.6)",
                                                    border: "1px solid rgba(0,0,0,0.08)",
                                                    color: "var(--text-primary)",
                                                }}
                                            >
                                                <RiExternalLinkLine size={15} /> Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Description */}
                                <div
                                    className="reveal reveal-delay-1 card-glass p-6"
                                    style={{ background: "#ffecd2", border: "1px solid rgba(255,255,255,0.7)" }}
                                >
                                    <h3 className="font-semibold text-sm mb-3" style={{ color: "var(--text-primary)" }}>
                                        About this project
                                    </h3>
                                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                        {project.shortDescription ||
                                            project.longDescription ||
                                            "No description available."}
                                    </p>
                                </div>

                                {/* Gallery */}
                                {project.gallery?.length > 0 && (
                                    <div
                                        className="reveal reveal-delay-2 card-glass p-6"
                                        style={{ background: "#e8f5e9", border: "1px solid rgba(255,255,255,0.7)" }}
                                    >
                                        <h3
                                            className="font-semibold text-sm mb-4"
                                            style={{ color: "var(--text-primary)" }}
                                        >
                                            Gallery
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {project.gallery.map((img, i) => (
                                                <div
                                                    key={img._id || i}
                                                    className="img-overlay rounded-xl cursor-pointer"
                                                    style={{ height: "120px" }}
                                                    onClick={() => setLightbox(img.url)}
                                                >
                                                    <img
                                                        src={img.url}
                                                        alt={img.name || `Gallery ${i + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div
                                                        className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-xl"
                                                        style={{ background: "rgba(26,26,46,0.4)" }}
                                                    >
                                                        <span className="text-white text-xs">View</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-5">
                                {/* Thumbnail */}
                                {project.thumbnail?.url && (
                                    <div
                                        className="reveal card-glass overflow-hidden"
                                        style={{ background: "#ede7f6", border: "1px solid rgba(255,255,255,0.7)" }}
                                    >
                                        <p
                                            className="text-xs font-medium px-4 pt-4 pb-2"
                                            style={{ color: "var(--text-muted)" }}
                                        >
                                            Preview
                                        </p>
                                        <div
                                            className="img-overlay cursor-pointer"
                                            style={{ height: "160px" }}
                                            onClick={() => setLightbox(project.thumbnail.url)}
                                        >
                                            <img
                                                src={project.thumbnail.url}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Project Info */}
                                <div
                                    className="reveal reveal-delay-1 card-glass p-5"
                                    style={{ background: "#e3f2fd", border: "1px solid rgba(255,255,255,0.7)" }}
                                >
                                    <h4
                                        className="text-xs font-semibold mb-4 uppercase tracking-wider"
                                        style={{ color: "var(--text-muted)" }}
                                    >
                                        Project Info
                                    </h4>
                                    <div className="flex flex-col gap-3">
                                        {project.startedAt && (
                                            <div className="flex items-center gap-2">
                                                <RiCalendarLine
                                                    size={14}
                                                    style={{ color: "var(--accent)", flexShrink: 0 }}
                                                />
                                                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                                                    Started
                                                </span>
                                                <span
                                                    className="ml-auto text-xs font-medium"
                                                    style={{ color: "var(--text-primary)" }}
                                                >
                                                    {new Date(project.startedAt).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                        {project.completedAt && (
                                            <div className="flex items-center gap-2">
                                                <RiCalendarLine
                                                    size={14}
                                                    style={{ color: "var(--accent)", flexShrink: 0 }}
                                                />
                                                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                                                    Completed
                                                </span>
                                                <span
                                                    className="ml-auto text-xs font-medium"
                                                    style={{ color: "var(--text-primary)" }}
                                                >
                                                    {new Date(project.completedAt).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                        {project.teamSize > 0 && (
                                            <div className="flex items-center gap-2">
                                                <RiGroupLine
                                                    size={14}
                                                    style={{ color: "var(--accent)", flexShrink: 0 }}
                                                />
                                                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                                                    Team Size
                                                </span>
                                                <span
                                                    className="ml-auto text-xs font-medium"
                                                    style={{ color: "var(--text-primary)" }}
                                                >
                                                    {project.teamSize} members
                                                </span>
                                            </div>
                                        )}
                                        {project.viewsCount > 0 && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                                                    Views
                                                </span>
                                                <span
                                                    className="ml-auto text-xs font-medium"
                                                    style={{ color: "var(--text-primary)" }}
                                                >
                                                    {project.viewsCount}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Technologies */}
                                {project.technologies?.length > 0 && (
                                    <div
                                        className="reveal reveal-delay-2 card-glass p-5"
                                        style={{ background: "#fffde7", border: "1px solid rgba(255,255,255,0.7)" }}
                                    >
                                        <h4
                                            className="text-xs font-semibold mb-3 uppercase tracking-wider"
                                            style={{ color: "var(--text-muted)" }}
                                        >
                                            Technologies
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="tag"
                                                    style={{
                                                        background: "rgba(255,255,255,0.6)",
                                                        color: "var(--text-secondary)",
                                                        fontSize: "11px",
                                                    }}
                                                >
                                                    {tech?.name || tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-pointer"
                    style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
                    onClick={() => setLightbox(null)}
                >
                    <img
                        src={lightbox}
                        alt="Full view"
                        className="max-w-full max-h-full rounded-xl"
                        style={{ boxShadow: "0 25px 80px rgba(0,0,0,0.5)", maxHeight: "90vh", maxWidth: "90vw" }}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        className="absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                        style={{ background: "rgba(255,255,255,0.2)" }}
                        onClick={() => setLightbox(null)}
                    >
                        ×
                    </button>
                </div>
            )}
        </div>
    );
}

function ProjectDetailSkeleton() {
    return (
        <div className="min-h-screen px-6 lg:px-12 py-16 animate-pulse">
            <div className="max-w-5xl mx-auto pt-8">
                <div className="h-4 bg-gray-100 rounded w-32 mb-8" />
                <div className="w-full h-72 bg-gray-100 rounded-2xl mb-8" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-5">
                        <div className="h-32 bg-gray-100 rounded-2xl" />
                        <div className="h-24 bg-gray-100 rounded-2xl" />
                    </div>
                    <div className="space-y-5">
                        <div className="h-40 bg-gray-100 rounded-2xl" />
                        <div className="h-28 bg-gray-100 rounded-2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
