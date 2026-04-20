/** @format */

import { useEffect, useState } from "react";
import {
    RiArrowLeftLine,
    RiCalendarLine,
    RiExternalLinkLine,
    RiGroupLine,
    RiStarLine,
    RiUserLine,
} from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
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

                        {/* Top — 40/60 split */}
                        <div className="reveal reveal-delay-1 grid grid-cols-1 lg:grid-cols-5 gap-14 mb-8">
                            {/* Left 40% — Title card only */}
                            <div className="lg:col-span-2">
                                <div
                                    className="card-glass p-6 h-full"
                                    style={{
                                        background: "var(--pastel-sky)",
                                        border: "1px solid rgba(255,255,255,0.7)",
                                    }}
                                >
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {project.projectType && (
                                            <span
                                                className="tag"
                                                style={{
                                                    background: "var(--accent-light)",
                                                    color: "var(--accent)",
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
                                                    background: project.status === "completed" ? "#e8f5e9" : "#fff9c4",
                                                    color: project.status === "completed" ? "#388e3c" : "#f57f17",
                                                    fontSize: "11px",
                                                }}
                                            >
                                                {project.status}
                                            </span>
                                        )}
                                        {project.featured && (
                                            <span
                                                className="tag inline-flex items-center gap-1"
                                                style={{ background: "#fff3e0", color: "#e65100", fontSize: "11px" }}
                                            >
                                                <RiStarLine size={11} /> Featured
                                            </span>
                                        )}
                                    </div>
                                    <h1 className="section-heading mb-3" style={{ fontSize: "clamp(20px, 3vw, 28px)" }}>
                                        {project.title}
                                    </h1>
                                    {project.shortDescription && (
                                        <p
                                            className="text-sm leading-relaxed mb-4"
                                            style={{ color: "var(--text-secondary)" }}
                                        >
                                            {project.shortDescription}
                                        </p>
                                    )}
                                    <div className="flex gap-2 flex-wrap">
                                        {project.projectUrl && (
                                            <a
                                                href={
                                                    project.projectUrl.startsWith("http")
                                                        ? project.projectUrl
                                                        : `https://${project.projectUrl}`
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
                                                style={{
                                                    background: "var(--accent-light)",
                                                    color: "var(--accent)",
                                                    border: "1px solid var(--border)",
                                                }}
                                            >
                                                <RiExternalLinkLine size={15} /> Live Demo
                                            </a>
                                        )}
                                        {project.demoUrl && project.demoUrl !== project.projectUrl && (
                                            <a
                                                href={
                                                    project.demoUrl.startsWith("http")
                                                        ? project.demoUrl
                                                        : `https://${project.demoUrl}`
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
                                                style={{
                                                    background: "var(--card-bg)",
                                                    color: "var(--text-secondary)",
                                                    border: "1px solid var(--border)",
                                                }}
                                            >
                                                <RiExternalLinkLine size={15} /> Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right 60% — Slider */}
                            <div
                                className="lg:col-span-3"
                                ststyle={{
                                    width: "100%",
                                    height: "240px",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            >
                                {project.thumbnail?.url || project.gallery?.length > 0 ? (
                                    <ImageSlider
                                        images={[
                                            ...(project.thumbnail?.url
                                                ? [{ url: project.thumbnail.url, name: "thumbnail" }]
                                                : []),
                                            ...(project.gallery || []),
                                        ]}
                                        onImageClick={(url) => setLightbox(url)}
                                    />
                                ) : (
                                    <div
                                        className="w-full h-full rounded-2xl flex items-center justify-center"
                                        style={{
                                            background: "var(--card-bg)",
                                            border: "1px solid var(--border)",
                                            minHeight: "340px",
                                        }}
                                    >
                                        <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                                            No preview available
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bottom — 2 col: main content + sidebar */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-6">
                                {project.fullDescription && (
                                    <div
                                        className="reveal reveal-delay-1 card-glass p-6"
                                        style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
                                    >
                                        <h3
                                            className="font-semibold text-sm mb-3"
                                            style={{ color: "var(--text-primary)" }}
                                        >
                                            Full Description
                                        </h3>
                                        <p
                                            className="text-sm leading-relaxed whitespace-pre-line"
                                            style={{ color: "var(--text-secondary)" }}
                                        >
                                            {project.fullDescription}
                                        </p>
                                    </div>
                                )}

                                {project.features?.length > 0 && (
                                    <div
                                        className="reveal reveal-delay-2 card-glass p-6"
                                        style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
                                    >
                                        <h3
                                            className="font-semibold text-sm mb-3"
                                            style={{ color: "var(--text-primary)" }}
                                        >
                                            Features
                                        </h3>
                                        <ul className="flex flex-col gap-2">
                                            {project.features.map((f, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-2 text-sm"
                                                    style={{ color: "var(--text-secondary)" }}
                                                >
                                                    <span style={{ color: "var(--accent)", marginTop: "2px" }}>✦</span>{" "}
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-5">
                                <div
                                    className="reveal card-glass p-5"
                                    style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
                                >
                                    <h4
                                        className="text-xs font-semibold mb-4 uppercase tracking-wider"
                                        style={{ color: "var(--text-muted)" }}
                                    >
                                        Project Info
                                    </h4>
                                    <div className="flex flex-col gap-3">
                                        {project.clientName && (
                                            <div className="flex items-center gap-2">
                                                <RiUserLine
                                                    size={14}
                                                    style={{ color: "var(--accent)", flexShrink: 0 }}
                                                />
                                                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                                                    Client
                                                </span>
                                                <span
                                                    className="ml-auto text-xs font-medium"
                                                    style={{ color: "var(--text-primary)" }}
                                                >
                                                    {project.clientName}
                                                </span>
                                            </div>
                                        )}
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
                                        {/* {project.viewsCount > 0 && (
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
                                        )} */}
                                    </div>
                                </div>

                                {project.technologies?.length > 0 && (
                                    <div
                                        className="reveal reveal-delay-1 card-glass p-5"
                                        style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
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
                                                        background: "var(--accent-light)",
                                                        color: "var(--accent)",
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
