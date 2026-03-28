/** @format */

import { useEffect, useState } from "react";
import {
    RiCheckLine,
    RiExternalLinkLine,
    RiGithubLine,
    RiGlobalLine,
    RiLinkedinLine,
    RiMailLine,
    RiSendPlaneLine,
    RiTwitterLine,
} from "react-icons/ri";
import { useReveal } from "../hooks/useReveal";
import { getAbout, sendContact } from "../utils/api";

const SOCIAL_ICONS = {
    github: RiGithubLine,
    linkedin: RiLinkedinLine,
    twitter: RiTwitterLine,
    website: RiGlobalLine,
};

const SOCIAL_COLORS = {
    github: "#333",
    linkedin: "#0077b5",
    twitter: "#1da1f2",
    website: "var(--accent)",
};

const PASTEL_BG = {
    github: "#f3f4f6",
    linkedin: "#e3f2fd",
    twitter: "#e8f5fe",
    website: "#ede7f6",
};

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState("idle");
    const [profile, setProfile] = useState(null);
    const revealRef = useReveal();

    useEffect(() => {
        getAbout()
            .then((res) => setProfile(res.data?.data))
            .catch(() => {});
    }, []);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.message) return;
        setStatus("loading");
        try {
            await sendContact(form);
            setStatus("success");
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen px-6 lg:px-12 py-16" ref={revealRef}>
            <div className="max-w-4xl mx-auto pt-8">
                {/* Header */}
                <div className="reveal mb-12">
                    <h2 className="section-heading">Get in Touch</h2>
                    <p className="section-sub">Let's talk about your project or just say hello</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {/* Info Side */}
                    <div className="md:col-span-2 space-y-5">
                        {/* Email */}
                        {profile?.email && (
                            <div
                                className="reveal card-glass p-6"
                                style={{
                                    background: "var(--pastel-lavender)",
                                    border: "1px solid rgba(255,255,255,0.7)",
                                }}
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                                    style={{ background: "rgba(255,255,255,0.6)" }}
                                >
                                    <RiMailLine size={20} style={{ color: "var(--accent)" }} />
                                </div>
                                <h4 className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                                    Email
                                </h4>

                                <a
                                    href={`mailto:${profile.email}`}
                                    className="text-sm hover:underline"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    {profile.email}
                                </a>
                            </div>
                        )}

                        {/* Availability */}
                        {profile?.availabilityStatus && (
                            <div
                                className="reveal reveal-delay-1 card-glass p-6"
                                style={{ background: "var(--pastel-mint)", border: "1px solid rgba(255,255,255,0.7)" }}
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                                    style={{ background: "rgba(255,255,255,0.6)" }}
                                >
                                    <span
                                        className="w-4 h-4 rounded-full"
                                        style={{
                                            background:
                                                profile.availabilityStatus === "available" ? "#66bb6a" : "#ffa726",
                                        }}
                                    />
                                </div>
                                <h4 className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                                    Status
                                </h4>
                                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                    {profile.availabilityStatus === "available"
                                        ? "Available for work — Open to freelance & full-time opportunities."
                                        : "Currently not available for new projects."}
                                </p>
                            </div>
                        )}

                        {/* Social Links */}
                        {profile?.socialLinks?.length > 0 && (
                            <div
                                className="reveal reveal-delay-2 card-glass p-6"
                                style={{ background: "var(--pastel-peach)", border: "1px solid rgba(255,255,255,0.7)" }}
                            >
                                <h4 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>
                                    Social Links
                                </h4>
                                <div className="flex flex-col gap-3">
                                    {profile.socialLinks.map((link, i) => {
                                        const platform = link.platform?.toLowerCase() || "website";
                                        const Icon = SOCIAL_ICONS[platform] || RiExternalLinkLine;
                                        const color = SOCIAL_COLORS[platform] || "var(--accent)";
                                        const bg = PASTEL_BG[platform] || "#f3f4f6";
                                        return (
                                            <a
                                                key={i}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 text-sm font-medium transition-opacity hover:opacity-70"
                                                style={{ color: "var(--text-primary)" }}
                                            >
                                                <div
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                                    style={{ background: bg }}
                                                >
                                                    <Icon size={16} style={{ color }} />
                                                </div>
                                                <span className="capitalize">{link.platform || "Website"}</span>
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Form */}
                    <div className="md:col-span-3">
                        <div className="reveal reveal-delay-1 card-glass p-7">
                            {status === "success" ? (
                                <div className="text-center py-8">
                                    <div
                                        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                                        style={{ background: "var(--pastel-mint)" }}
                                    >
                                        <RiCheckLine size={28} style={{ color: "#66bb6a" }} />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
                                        Message Sent!
                                    </h3>
                                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                        I'll get back to you as soon as possible.
                                    </p>
                                    <button
                                        className="mt-5 text-sm font-medium"
                                        style={{ color: "var(--accent)" }}
                                        onClick={() => setStatus("idle")}
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                className="block text-xs font-medium mb-1.5"
                                                style={{ color: "var(--text-secondary)" }}
                                            >
                                                Name *
                                            </label>
                                            <input
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder="Your name"
                                                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                                                style={{
                                                    background: "var(--pastel-sky)",
                                                    border: "1px solid rgba(255,255,255,0.8)",
                                                    color: "var(--text-primary)",
                                                }}
                                                onFocus={(e) =>
                                                    (e.target.style.boxShadow = "0 0 0 3px var(--accent-light)")
                                                }
                                                onBlur={(e) => (e.target.style.boxShadow = "none")}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className="block text-xs font-medium mb-1.5"
                                                style={{ color: "var(--text-secondary)" }}
                                            >
                                                Email *
                                            </label>
                                            <input
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="your@email.com"
                                                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                                                style={{
                                                    background: "var(--pastel-sky)",
                                                    border: "1px solid rgba(255,255,255,0.8)",
                                                    color: "var(--text-primary)",
                                                }}
                                                onFocus={(e) =>
                                                    (e.target.style.boxShadow = "0 0 0 3px var(--accent-light)")
                                                }
                                                onBlur={(e) => (e.target.style.boxShadow = "none")}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            className="block text-xs font-medium mb-1.5"
                                            style={{ color: "var(--text-secondary)" }}
                                        >
                                            Subject
                                        </label>
                                        <input
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            placeholder="What's this about?"
                                            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                                            style={{
                                                background: "var(--pastel-sky)",
                                                border: "1px solid rgba(255,255,255,0.8)",
                                                color: "var(--text-primary)",
                                            }}
                                            onFocus={(e) =>
                                                (e.target.style.boxShadow = "0 0 0 3px var(--accent-light)")
                                            }
                                            onBlur={(e) => (e.target.style.boxShadow = "none")}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            className="block text-xs font-medium mb-1.5"
                                            style={{ color: "var(--text-secondary)" }}
                                        >
                                            Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Tell me about your project..."
                                            rows={5}
                                            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                                            style={{
                                                background: "var(--pastel-sky)",
                                                border: "1px solid rgba(255,255,255,0.8)",
                                                color: "var(--text-primary)",
                                            }}
                                            onFocus={(e) =>
                                                (e.target.style.boxShadow = "0 0 0 3px var(--accent-light)")
                                            }
                                            onBlur={(e) => (e.target.style.boxShadow = "none")}
                                        />
                                    </div>

                                    {status === "error" && (
                                        <p className="text-xs" style={{ color: "#e57373" }}>
                                            Something went wrong. Please try again.
                                        </p>
                                    )}

                                    <button
                                        onClick={handleSubmit}
                                        disabled={status === "loading"}
                                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-medium transition-all duration-200 hover:opacity-90 hover:scale-[1.01] disabled:opacity-60"
                                        style={{
                                            background: "linear-gradient(135deg, #5b6cf0, #a78bfa)",
                                            boxShadow: "0 4px 20px rgba(91,108,240,0.3)",
                                        }}
                                    >
                                        {status === "loading" ? (
                                            <>
                                                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <RiSendPlaneLine size={16} /> Send Message
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
