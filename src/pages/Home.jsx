/** @format */

import { useEffect, useState } from "react";
import {
    RiArrowRightLine,
    RiCodeBoxLine,
    RiDownloadLine,
    RiFolderLine,
    RiGithubLine,
    RiGlobalLine,
    RiLinkedinLine,
    RiStackOverflowLine,
    RiStarLine,
    RiTimeLine,
    RiTwitterXLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import { getAbout, getProjects } from "../utils/api";

const PLATFORM_CONFIG = {
    github: { icon: RiGithubLine, badge: "#e8f0fe", color: "#1a1a2e" },
    linkedin: { icon: RiLinkedinLine, badge: "#e8f4fd", color: "#0077b5" },
    twitter: { icon: RiTwitterXLine, badge: "#e8f5e9", color: "#1da1f2" },
    stackoverflow: { icon: RiStackOverflowLine, badge: "#fff3e0", color: "#f48024" },
};

export default function Home() {
    const revealRef = useReveal();
    const [profile, setProfile] = useState(null);
    const [totalProjects, setTotalProjects] = useState(null);

    // Cloudinary URL mein fl_attachment add karo
    const getDownloadUrl = (url) => {
        if (!url) return "#";
        // https://res.cloudinary.com/.../upload/v123/file.pdf
        // →  https://res.cloudinary.com/.../upload/fl_attachment/v123/file.pdf
        return url.replace("/upload/", "/upload/fl_attachment/");
    };

    useEffect(() => {
        getAbout()
            .then((res) => setProfile(res.data?.data))
            .catch(() => {});

        getProjects({ limit: 1 })
            .then((res) => {
                const meta = res.data?.meta;
                setTotalProjects(meta?.total ?? null);
            })
            .catch(() => {});
    }, []);

    return (
        <div className="min-h-screen px-6 lg:px-12 py-16 flex flex-col justify-center" ref={revealRef}>
            {/* Hero */}
            <section className="max-w-4xl mx-auto w-full pt-8 pb-20">
                {/* Badge */}
                <div className="reveal fade-in-up mb-6">
                    <span className="tag" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
                        ✦ Available for work
                    </span>
                </div>

                {/* Heading */}
                <div className="reveal reveal-delay-1 mb-6">
                    <h1 className="section-heading" style={{ fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1.1 }}>
                        Hi, I'm <span className="gradient-text">{profile?.name?.split(" ")[0] || "Bhaskar"}</span>
                        <br />
                        {profile?.currentPosition || "Full Stack Developer"}
                    </h1>
                </div>

                {/* Description */}
                <div className="reveal reveal-delay-2 mb-10">
                    <p style={{ fontSize: "17px", color: "var(--text-secondary)", maxWidth: "520px", lineHeight: 1.7 }}>
                        {profile?.bio ||
                            "I craft clean, performant web applications with modern technologies. Passionate about turning complex problems into elegant digital solutions."}
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="reveal reveal-delay-3 flex flex-wrap gap-3 mb-14">
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium text-sm transition-all duration-200 hover:opacity-90 hover:scale-105"
                        style={{
                            background: "linear-gradient(135deg, #5b6cf0, #a78bfa)",
                            boxShadow: "0 4px 20px rgba(91,108,240,0.3)",
                        }}
                    >
                        View Projects <RiArrowRightLine size={16} />
                    </Link>

                    <a
                        href={getDownloadUrl(profile?.resume?.url)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105"
                        style={{
                            background: "var(--card-bg)",
                            border: "1px solid var(--border)",
                            color: "var(--text-primary)",
                            boxShadow: "var(--shadow-sm)",
                        }}
                    >
                        <RiDownloadLine size={16} /> Download CV
                    </a>
                </div>

                {/* Social Links */}
                <div className="reveal reveal-delay-4 flex items-center gap-4 flex-wrap">
                    <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                        Find me on
                    </span>
                    <div className="flex gap-3 flex-wrap">
                        {profile?.socialLinks
                            ?.filter((link) => link.isActive)
                            ?.map(({ platform, url, username }) => {
                                const config = PLATFORM_CONFIG[platform] || {
                                    icon: RiGlobalLine,
                                    badge: "#f3f4f6",
                                    color: "var(--text-secondary)",
                                };
                                const Icon = config.icon;

                                return (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 hover:scale-105"
                                        style={{
                                            background: "var(--card-bg)",
                                            border: "1px solid var(--border)",
                                            color: "var(--text-secondary)",
                                            boxShadow: "var(--shadow-sm)",
                                            textDecoration: "none",
                                        }}
                                        aria-label={platform}
                                    >
                                        <Icon size={18} style={{ color: config.color }} />
                                        <span
                                            className="text-xs font-medium px-2 py-0.5 rounded-full"
                                            style={{
                                                background: config.badge,
                                                color: config.color,
                                            }}
                                        >
                                            @{username}
                                        </span>
                                    </a>
                                );
                            })}
                    </div>
                </div>
            </section>

            {/* Stats strip */}
            <section className="max-w-4xl mx-auto w-full">
                <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        {
                            number: profile?.yearsOfExperience ? `${profile.yearsOfExperience}+` : "—",
                            label: "Years Experience",
                            color: "var(--pastel-pink)",
                            icon: RiTimeLine,
                        },
                        {
                            number: totalProjects !== null ? `${totalProjects}+` : "—",
                            label: "Projects Completed",
                            color: "var(--pastel-peach)",
                            icon: RiFolderLine,
                        },
                        {
                            number: profile?.skills?.length ? `${profile.skills.length}+` : "—",
                            label: "Technologies",
                            color: "var(--pastel-mint)",
                            icon: RiCodeBoxLine,
                        },
                        {
                            number: "100%",
                            label: "Client Satisfaction",
                            color: "var(--pastel-lavender)",
                            icon: RiStarLine,
                        },
                    ].map(({ number, label, color, icon: StatIcon }, i) => (
                        <div
                            key={label}
                            className={`card-glass p-6 text-center reveal reveal-delay-${i + 1}`}
                            style={{ background: color, border: "1px solid rgba(255,255,255,0.6)" }}
                        >
                            <StatIcon
                                size={18}
                                className="mx-auto mb-2"
                                style={{ color: "var(--text-secondary)", opacity: 0.6 }}
                            />
                            <div
                                className="font-bold mb-1"
                                style={{
                                    fontSize: "28px",
                                    fontFamily: "Playfair Display, serif",
                                    color: "var(--text-primary)",
                                }}
                            >
                                {number}
                            </div>
                            <div className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                                {label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
