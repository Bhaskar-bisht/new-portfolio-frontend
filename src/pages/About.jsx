/** @format */

import { useEffect, useState } from "react";
import { RiBriefcaseLine, RiCalendarLine, RiGraduationCapLine } from "react-icons/ri";
import { useReveal } from "../hooks/useReveal";
import { getAbout } from "../utils/api";

export default function About() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const revealRef = useReveal();

    useEffect(() => {
        getAbout()
            .then((res) => setProfile(res.data?.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen px-6 lg:px-12 py-16" ref={revealRef}>
            <div className="max-w-4xl mx-auto pt-8">
                <div className="reveal mb-12">
                    <h2 className="section-heading">About Me</h2>
                    <p className="section-sub">A little about who I am and what I do</p>
                </div>

                {loading ? (
                    <AboutSkeleton />
                ) : !profile ? (
                    <div className="card-glass p-12 text-center">
                        <p style={{ color: "var(--text-muted)" }}>Could not load profile</p>
                    </div>
                ) : (
                    <>
                        {/* Profile Card */}
                        <div
                            className="reveal reveal-delay-1 card-glass p-8 mb-8"
                            style={{ background: "rgba(255,255,255,0.8)" }}
                        >
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Avatar fallback — initials */}
                                <div className="flex-shrink-0">
                                    <div
                                        className="w-32 h-32 md:w-44 md:h-44 rounded-2xl overflow-hidden flex-shrink-0"
                                        style={{ background: "linear-gradient(135deg, #5b6cf0, #a78bfa)" }}
                                    >
                                        {profile?.avatar?.url ? (
                                            <img
                                                src={profile.avatar.url}
                                                alt={profile.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="w-full h-full flex items-center justify-center text-4xl font-bold text-white">
                                                {profile.name?.[0]}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3
                                        className="text-2xl font-semibold mb-1"
                                        style={{ color: "var(--text-primary)" }}
                                    >
                                        {profile.name}
                                    </h3>
                                    <p className="text-sm font-medium mb-4" style={{ color: "var(--accent)" }}>
                                        {profile.currentPosition || "Full Stack Developer"}
                                    </p>
                                    {profile.bio && (
                                        <p
                                            className="text-sm leading-relaxed mb-6"
                                            style={{ color: "var(--text-secondary)" }}
                                        >
                                            {profile.bio}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap gap-4">
                                        {profile.yearsOfExperience > 0 && (
                                            <div
                                                className="flex items-center gap-2 text-sm"
                                                style={{ color: "var(--text-muted)" }}
                                            >
                                                <RiBriefcaseLine size={15} />
                                                {profile.yearsOfExperience}+ years experience
                                            </div>
                                        )}
                                        <div
                                            className="flex items-center gap-2 text-sm"
                                            style={{ color: "var(--text-muted)" }}
                                        >
                                            <span
                                                className="w-2 h-2 rounded-full"
                                                style={{
                                                    background:
                                                        profile.availabilityStatus === "available"
                                                            ? "#66bb6a"
                                                            : "#ffa726",
                                                }}
                                            />
                                            {profile.availabilityStatus === "available"
                                                ? "Available for work"
                                                : "Not available"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Experience */}
                        {profile.experiences?.length > 0 && (
                            <div className="reveal reveal-delay-2 mb-8">
                                <h3
                                    className="text-xl font-semibold mb-6"
                                    style={{ fontFamily: "Playfair Display, serif", color: "var(--text-primary)" }}
                                >
                                    Experience
                                </h3>
                                <div className="relative">
                                    <div
                                        className="absolute left-5 top-0 bottom-0 w-px"
                                        style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }}
                                    />
                                    <div className="flex flex-col gap-5">
                                        {profile.experiences.map((exp, i) => (
                                            <div key={exp._id || i} className="flex gap-6 pl-14 relative">
                                                <div
                                                    className="absolute left-3.5 top-2 w-3 h-3 rounded-full border-2 border-white"
                                                    style={{
                                                        background: "var(--accent)",
                                                        boxShadow: "0 0 0 3px var(--accent-light)",
                                                    }}
                                                />
                                                <div className="card-glass p-5 flex-1">
                                                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                                                        <div>
                                                            <h4
                                                                className="font-semibold text-sm"
                                                                style={{ color: "var(--text-primary)" }}
                                                            >
                                                                {exp.position}
                                                            </h4>
                                                            <p className="text-sm" style={{ color: "var(--accent)" }}>
                                                                {exp.companyName}
                                                            </p>
                                                        </div>
                                                        <span
                                                            className="tag text-xs"
                                                            style={{
                                                                background: "var(--pastel-sky)",
                                                                color: "var(--text-secondary)",
                                                            }}
                                                        >
                                                            <RiCalendarLine size={11} className="mr-1" />
                                                            {new Date(exp.startDate).getFullYear()} —{" "}
                                                            {exp.isCurrent
                                                                ? "Present"
                                                                : exp.endDate
                                                                  ? new Date(exp.endDate).getFullYear()
                                                                  : ""}
                                                        </span>
                                                    </div>
                                                    {exp.employmentType && (
                                                        <span
                                                            className="tag mt-2 inline-flex"
                                                            style={{
                                                                background: "var(--pastel-mint)",
                                                                color: "var(--text-secondary)",
                                                                fontSize: "11px",
                                                            }}
                                                        >
                                                            {exp.employmentType.replace("_", " ")}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Education */}
                        {profile.educations?.length > 0 && (
                            <div className="reveal reveal-delay-3 mb-8">
                                <h3
                                    className="text-xl font-semibold mb-6"
                                    style={{ fontFamily: "Playfair Display, serif", color: "var(--text-primary)" }}
                                >
                                    Education
                                </h3>
                                <div className="flex flex-col gap-4">
                                    {profile.educations.map((edu, i) => (
                                        <div
                                            key={edu._id || i}
                                            className="card-glass p-5"
                                            style={{
                                                background: "var(--pastel-lavender)",
                                                border: "1px solid rgba(255,255,255,0.7)",
                                            }}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                                    style={{ background: "rgba(255,255,255,0.6)" }}
                                                >
                                                    <RiGraduationCapLine size={20} style={{ color: "var(--accent)" }} />
                                                </div>
                                                <div className="flex-1">
                                                    <h4
                                                        className="font-semibold text-sm"
                                                        style={{ color: "var(--text-primary)" }}
                                                    >
                                                        {edu.degree}
                                                        {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                                                    </h4>
                                                    <p className="text-sm" style={{ color: "var(--accent)" }}>
                                                        {edu.institutionName}
                                                    </p>
                                                    <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                                                        {new Date(edu.startDate).getFullYear()} —{" "}
                                                        {edu.isCurrent
                                                            ? "Present"
                                                            : edu.endDate
                                                              ? new Date(edu.endDate).getFullYear()
                                                              : ""}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Certifications */}
                        {profile.certifications?.length > 0 && (
                            <div className="reveal reveal-delay-4">
                                <h3
                                    className="text-xl font-semibold mb-6"
                                    style={{ fontFamily: "Playfair Display, serif", color: "var(--text-primary)" }}
                                >
                                    Certifications
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {profile.certifications.map((cert, i) => (
                                        <div
                                            key={cert._id || i}
                                            className="card-glass p-5"
                                            style={{
                                                background: "var(--pastel-peach)",
                                                border: "1px solid rgba(255,255,255,0.7)",
                                            }}
                                        >
                                            <h4
                                                className="font-semibold text-sm mb-1"
                                                style={{ color: "var(--text-primary)" }}
                                            >
                                                {cert.title}
                                            </h4>
                                            <p className="text-sm" style={{ color: "var(--accent)" }}>
                                                {cert.issuingOrganization}
                                            </p>
                                            {cert.issueDate && (
                                                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                                                    {new Date(cert.issueDate).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

function AboutSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="card-glass p-8 mb-8">
                <div className="flex gap-8">
                    <div className="w-44 h-44 rounded-2xl bg-gray-100" />
                    <div className="flex-1">
                        <div className="h-7 bg-gray-100 rounded-lg w-48 mb-3" />
                        <div className="h-4 bg-gray-100 rounded w-32 mb-5" />
                        <div className="h-4 bg-gray-100 rounded w-full mb-2" />
                        <div className="h-4 bg-gray-100 rounded w-3/4" />
                    </div>
                </div>
            </div>
        </div>
    );
}
