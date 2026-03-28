/** @format */

import { useEffect, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { getSkills } from "../utils/api";

const PASTEL_COLORS = [
    { bg: "#fce4ec", bar: "#f48fb1" },
    { bg: "#ffecd2", bar: "#ffb74d" },
    { bg: "#e8f5e9", bar: "#81c784" },
    { bg: "#ede7f6", bar: "#ba68c8" },
    { bg: "#e3f2fd", bar: "#64b5f6" },
    { bg: "#fffde7", bar: "#ffd54f" },
    { bg: "#fce4ec", bar: "#f06292" },
    { bg: "#e0f7fa", bar: "#4dd0e1" },
];

export default function Skills() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const revealRef = useReveal();

    useEffect(() => {
        getSkills()
            .then((res) => {
                const raw = res.data?.data || [];
                const mapped = raw.map((s) => ({
                    _id: s._id,
                    name: s.technologyId?.name || "Unknown",
                    logo: s.technologyId?.logo?.url || null,
                    proficiency: s.proficiencyPercentage || 0,
                    category: s.technologyId?.category || null,
                    isPrimary: s.isPrimarySkill,
                }));
                setSkills(mapped);
            })
            .catch(() => setSkills([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen px-6 lg:px-12 py-16" ref={revealRef}>
            <div className="max-w-4xl mx-auto pt-8">
                <div className="reveal mb-10">
                    <h2 className="section-heading">Skills - Tech</h2>
                    <p className="section-sub">Tools and technologies I work with</p>
                </div>

                {loading ? (
                    <SkillsSkeleton />
                ) : skills.length === 0 ? (
                    <div className="card-glass p-12 text-center">
                        <p style={{ color: "var(--text-muted)" }}>No skills found</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Timeline */}
                        <div className="hidden md:block relative">
                            <div
                                className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
                                style={{
                                    background: "linear-gradient(to bottom, var(--accent), transparent)",
                                    boxShadow: "0 0 8px 2px var(--accent-light)",
                                }}
                            />
                            <div className="flex flex-col gap-8">
                                {skills.map((skill, i) => {
                                    const isLeft = i % 2 === 0;
                                    const color = PASTEL_COLORS[i % PASTEL_COLORS.length];
                                    const delay = Math.min((i % 4) + 1, 4);
                                    return (
                                        <div
                                            key={skill._id || i}
                                            className={`reveal reveal-delay-${delay} relative flex items-center ${
                                                isLeft ? "flex-row" : "flex-row-reverse"
                                            }`}
                                        >
                                            <div className="w-[calc(50%-28px)]">
                                                <SkillCard skill={skill} color={color} />
                                            </div>
                                            <div className="flex-shrink-0 w-14 flex items-center justify-center z-10 relative">
                                                <div
                                                    className="absolute h-0.5"
                                                    style={{
                                                        width: "50%",
                                                        left: isLeft ? "0%" : "50%",
                                                        background: "var(--accent)",
                                                        boxShadow: "0 0 6px 2px var(--accent-light)",
                                                    }}
                                                />
                                                <div
                                                    className="w-3 h-3 rounded-full border-2 border-white z-10 relative"
                                                    style={{
                                                        background: "var(--accent)",
                                                        boxShadow:
                                                            "0 0 0 3px var(--accent-light), 0 0 10px 3px var(--accent-light)",
                                                    }}
                                                />
                                            </div>
                                            <div className="w-[calc(50%-28px)]" />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Mobile Timeline — left side line, cards alternating left/right */}
                        <div className="md:hidden relative">
                            <div
                                className="absolute left-4 top-0 bottom-0 w-px"
                                style={{
                                    background: "linear-gradient(to bottom, var(--accent), transparent)",
                                    boxShadow: "0 0 8px 2px var(--accent-light)",
                                }}
                            />
                            <div className="flex flex-col gap-6">
                                {skills.map((skill, i) => {
                                    const color = PASTEL_COLORS[i % PASTEL_COLORS.length];
                                    const delay = Math.min((i % 4) + 1, 4);
                                    const isRight = i % 2 === 0;
                                    return (
                                        <div
                                            key={skill._id || i}
                                            className={`reveal reveal-delay-${delay} relative flex items-center`}
                                        >
                                            {/* Dot on left line */}
                                            <div className="flex-shrink-0 w-8 flex items-center justify-center z-10 relative">
                                                <div
                                                    className="absolute h-0.5"
                                                    style={{
                                                        width: "100%",
                                                        left: "50%",
                                                        background: "var(--accent)",
                                                        boxShadow: "0 0 6px 2px var(--accent-light)",
                                                    }}
                                                />
                                                <div
                                                    className="w-3 h-3 rounded-full border-2 border-white z-10 relative flex-shrink-0"
                                                    style={{
                                                        background: "var(--accent)",
                                                        boxShadow:
                                                            "0 0 0 3px var(--accent-light), 0 0 10px 3px var(--accent-light)",
                                                    }}
                                                />
                                            </div>

                                            {/* Card — full remaining width */}
                                            <div className="flex-1 min-w-0">
                                                <SkillCard skill={skill} color={color} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

function SkillCard({ skill, color, isLeft }) {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setWidth(skill.proficiency), 400);
        return () => clearTimeout(timer);
    }, [skill.proficiency]);

    return (
        <div
            className="card-glass p-5"
            style={{
                background: color.bg,
                border: "1px solid rgba(255,255,255,0.7)",
            }}
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    {skill.logo ? (
                        <img src={skill.logo} alt={skill.name} className="w-7 h-7 object-contain rounded" />
                    ) : (
                        <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                            style={{ background: color.bar }}
                        >
                            {skill.name?.[0]}
                        </div>
                    )}
                    <span className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>
                        {skill.name}
                    </span>
                    {skill.isPrimary && (
                        <span
                            className="tag"
                            style={{
                                background: "var(--accent-light)",
                                color: "var(--accent)",
                                fontSize: "10px",
                                padding: "2px 7px",
                            }}
                        >
                            Primary
                        </span>
                    )}
                </div>
                <span className="text-sm font-semibold flex-shrink-0" style={{ color: "var(--text-secondary)" }}>
                    {skill.proficiency}%
                </span>
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.6)" }}>
                <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${width}%`, background: color.bar }}
                />
            </div>
        </div>
    );
}
function SkillsSkeleton() {
    return (
        <>
            {/* Desktop Skeleton */}
            <div className="hidden md:block relative">
                <div
                    className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
                    style={{
                        background: "linear-gradient(to bottom, var(--accent), transparent)",
                        boxShadow: "0 0 8px 2px var(--accent-light)",
                    }}
                />
                <div className="flex flex-col gap-8 animate-pulse">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className={`relative flex items-center ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                        >
                            <div className="w-[calc(50%-28px)] card-glass h-20 bg-gray-50" />
                            <div className="w-14 flex justify-center">
                                <div className="w-3 h-3 rounded-full bg-gray-200" />
                            </div>
                            <div className="w-[calc(50%-28px)]" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Skeleton */}
            <div className="md:hidden relative">
                <div
                    className="absolute left-4 top-0 bottom-0 w-px"
                    style={{
                        background: "linear-gradient(to bottom, var(--accent), transparent)",
                        boxShadow: "0 0 8px 2px var(--accent-light)",
                    }}
                />
                <div className="flex flex-col gap-6 animate-pulse">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="relative flex items-center">
                            <div className="flex-shrink-0 w-8 flex justify-center">
                                <div className="w-3 h-3 rounded-full bg-gray-200" />
                            </div>
                            <div className="flex-1 card-glass h-20 bg-gray-50" />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
