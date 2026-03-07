// @ts-nocheck
'use client';

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Award, Box, BriefcaseBusiness, Building2, ChevronDown, Download, ExternalLink, Github, GraduationCap, Heart, Linkedin, Link2, Mail, MapPin, Moon, Search, Sun, Sparkles } from 'lucide-react';
import { certifications, education, experience, profile, projects, skills } from "@/app/data";
import { trackEvent } from "@/lib/analytics";
const sectionLinks = [
    {
        id: "profile",
        label: "Profile"
    },
    {
        id: "stack",
        label: "Stack"
    },
    {
        id: "projects",
        label: "Projects"
    },
    {
        id: "experience",
        label: "Experience"
    },
    {
        id: "education",
        label: "Education"
    },
    {
        id: "certifications",
        label: "Certifications"
    }
];
const textFixups = [
    [
        /\u00E2\u20AC\u201D/g,
        "\u2014"
    ],
    [
        /\u00E2\u20AC\u201C/g,
        "\u2013"
    ],
    [
        /\u00C2\u00B7/g,
        "\xb7"
    ],
    [
        /\u00C3\u00A2\u00E2\u201A\u00AC\u00E2\u20AC\u009D/g,
        "\u2014"
    ],
    [
        /\u00C2/g,
        ""
    ]
];
const reveal = {
    initial: {
        opacity: 0,
        y: 16
    },
    whileInView: {
        opacity: 1,
        y: 0
    },
    viewport: {
        once: true,
        amount: 0.24
    },
    transition: {
        duration: 0.45,
        ease: [
            0.22,
            1,
            0.36,
            1
        ]
    }
};
const avatarFrames = [
    {
        id: "wave",
        greeting: "Hi!"
    },
    {
        id: "wink",
        greeting: "Hello!"
    },
    {
        id: "grin",
        greeting: "Hey!"
    }
];
const stackLogos = [
    {
        name: "TypeScript",
        slug: "typescript",
        color: "3178C6"
    },
    {
        name: "JavaScript",
        slug: "javascript",
        color: "F7DF1E"
    },
    {
        name: "Python",
        slug: "python",
        color: "3776AB"
    },
    {
        name: "Node.js",
        slug: "nodedotjs",
        color: "5FA04E"
    },
    {
        name: "Bun",
        slug: "bun",
        color: "FBF0DF",
        lightColor: "2B2F37"
    },
    {
        name: "React",
        slug: "react",
        color: "61DAFB"
    },
    {
        name: "Next.js",
        slug: "nextdotjs",
        color: "FFFFFF",
        lightColor: "0F172A"
    },
    {
        name: "Tailwind CSS",
        slug: "tailwindcss",
        color: "06B6D4"
    },
    {
        name: "Docker",
        slug: "docker",
        color: "2496ED"
    },
    {
        name: "MySQL",
        slug: "mysql",
        color: "4479A1"
    },
    {
        name: "MongoDB",
        slug: "mongodb",
        color: "47A248"
    },
    {
        name: "Git",
        slug: "git",
        color: "F05032"
    },
    {
        name: "Redux",
        slug: "redux",
        color: "764ABC"
    },
    {
        name: "PostgreSQL",
        slug: "postgresql",
        color: "4169E1"
    },
    {
        name: "Prisma",
        slug: "prisma",
        color: "FFFFFF",
        lightColor: "0F172A"
    },
    {
        name: "Figma",
        slug: "figma",
        color: "F24E1E"
    },
    {
        name: "OpenAI",
        icon: "openai"
    },
    {
        name: "Claude",
        slug: "anthropic",
        color: "D97757"
    },
    {
        name: "Gemini",
        slug: "googlegemini",
        color: "8AB4F8"
    },
    {
        name: "Vercel",
        slug: "vercel",
        color: "FFFFFF",
        lightColor: "111827"
    },
    {
        name: "Firebase",
        slug: "firebase",
        color: "FFCA28"
    },
    {
        name: "Kubernetes",
        slug: "kubernetes",
        color: "326CE5"
    }
];
const THEME_STORAGE_KEY = "portfolio-theme";
function resolveInitialTheme() {
    if ("undefined" === "undefined") return "dark";
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === "light" || storedTheme === "dark") return storedTheme;
    return "dark";
}
function applyTheme(theme) {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
}
function OpenAIIcon() {
    return /*#__PURE__*/ _jsx("svg", {
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": "OpenAI",
        children: /*#__PURE__*/ _jsx("path", {
            fill: "currentColor",
            d: "M22.282 9.821a6 6 0 0 0-.516-4.91a6.05 6.05 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a6 6 0 0 0-3.998 2.9a6.05 6.05 0 0 0 .743 7.097a5.98 5.98 0 0 0 .51 4.911a6.05 6.05 0 0 0 6.515 2.9A6 6 0 0 0 13.26 24a6.06 6.06 0 0 0 5.772-4.206a6 6 0 0 0 3.997-2.9a6.06 6.06 0 0 0-.747-7.073M13.26 22.43a4.48 4.48 0 0 1-2.876-1.04l.141-.081l4.779-2.758a.8.8 0 0 0 .392-.681v-6.737l2.02 1.168a.07.07 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494M3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085l4.783 2.759a.77.77 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646M2.34 7.896a4.5 4.5 0 0 1 2.366-1.973V11.6a.77.77 0 0 0 .388.677l5.815 3.354l-2.02 1.168a.08.08 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.08.08 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667m2.01-3.023l-.141-.085l-4.774-2.782a.78.78 0 0 0-.785 0L9.409 9.23V6.897a.07.07 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.8.8 0 0 0-.393.681zm1.097-2.365l2.602-1.5l2.607 1.5v2.999l-2.597 1.5l-2.607-1.5Z"
        })
    });
}
function cleanText(value) {
    return textFixups.reduce((out, [pattern, replacement])=>out.replace(pattern, replacement), value);
}
function filterByQuery(items, query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item)=>{
        const searchable = [
            item.name,
            item.sub,
            item.period,
            item.desc,
            item.companyAbout,
            item.tech?.join(" ")
        ].filter(Boolean).join(" ").toLowerCase();
        return searchable.includes(normalized);
    });
}
function getDomain(url) {
    try {
        return new URL(url).hostname.replace(/^www\./, "");
    } catch  {
        return url;
    }
}
function getProjectHighlights(item) {
    if (item.desc) {
        const highlights = cleanText(item.desc).split(/(?<=[.!?])\s+/).map((sentence)=>sentence.replace(/[.!?]+$/g, "").trim()).filter((sentence)=>sentence.length > 28);
        if (highlights.length > 0) {
            return highlights.slice(0, 3);
        }
    }
    return (item.tech ?? []).slice(0, 3).map((tech)=>`${cleanText(tech)} implementation`);
}
function getProjectMeta(item) {
    const cleanedPeriod = cleanText(item.period ?? "");
    if (/[·•]/.test(cleanedPeriod)) {
        return cleanedPeriod;
    }
    if (item.tech && item.tech.length > 0) {
        return item.tech.slice(0, 3).map((tech)=>cleanText(tech)).join(" \xb7 ");
    }
    return cleanedPeriod;
}
export default function PortfolioClient() {
    const [theme, setTheme] = useState("dark");
    const [themeReady, setThemeReady] = useState(false);
    const [projectQuery, setProjectQuery] = useState("");
    const [certQuery, setCertQuery] = useState("");
    const [visibleProjects, setVisibleProjects] = useState(4);
    const [avatarFrameIndex, setAvatarFrameIndex] = useState(0);
    const [failedLogos, setFailedLogos] = useState({});
    const [openProjects, setOpenProjects] = useState({});
    const [openExperience, setOpenExperience] = useState({});
    const [openEducation, setOpenEducation] = useState({});
    const filteredProjects = useMemo(()=>filterByQuery(projects, projectQuery), [
        projectQuery
    ]);
    const projectsToRender = projectQuery.trim() ? filteredProjects : filteredProjects.slice(0, visibleProjects);
    const canShowMoreProjects = !projectQuery.trim() && visibleProjects < filteredProjects.length;
    const filteredCertifications = useMemo(()=>filterByQuery(certifications, certQuery), [
        certQuery
    ]);
    useEffect(()=>{
        const stored = resolveInitialTheme();
        setTheme(stored);
        applyTheme(stored);
        setThemeReady(true);
    }, []);
    useEffect(()=>{
        if (!themeReady) return;
        applyTheme(theme);
        try { window.localStorage.setItem(THEME_STORAGE_KEY, theme); } catch {}
    }, [theme, themeReady]);
    useEffect(()=>{
        const interval = setInterval(()=>{
            setAvatarFrameIndex((prev)=>prev === 0 ? 1 : 0);
        }, 1200);
        return ()=>clearInterval(interval);
    }, []);
    const currentAvatarFrame = avatarFrames[avatarFrameIndex];
    return /*#__PURE__*/ _jsxs("div", {
        className: "portfolio-shell",
        id: "top",
        children: [
            /*#__PURE__*/ _jsxs("header", {
                className: "top-bar",
                children: [
                    /*#__PURE__*/ _jsx("a", {
                        href: "#top",
                        className: "icon-button",
                        "aria-label": "Back to top",
                        children: /*#__PURE__*/ _jsx(Heart, {
                            size: 22,
                            strokeWidth: 2
                        })
                    }),
                    /*#__PURE__*/ _jsx("nav", {
                        className: "top-links",
                        "aria-label": "Section navigation",
                        children: sectionLinks.map((link)=>/*#__PURE__*/ _jsx("a", {
                                href: `#${link.id}`,
                                onClick: ()=>trackEvent("top_nav_click", {
                                        section: link.id
                                    }),
                                children: link.label
                            }, link.id))
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: "top-actions",
                        children: [
                            /*#__PURE__*/ _jsxs("a", {
                                href: profile.github,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "icon-button compact",
                                onClick: ()=>trackEvent("social_click", {
                                        platform: "github"
                                    }),
                                children: [
                                    /*#__PURE__*/ _jsx(Github, {
                                        size: 18
                                    }),
                                    /*#__PURE__*/ _jsx("span", {
                                        children: projects.length
                                    })
                                ]
                            }),
                            /*#__PURE__*/ _jsx("a", {
                                href: profile.linkedin,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "icon-button compact",
                                onClick: ()=>trackEvent("social_click", {
                                        platform: "linkedin"
                                    }),
                                children: /*#__PURE__*/ _jsx(Linkedin, {
                                    size: 18
                                })
                            }),
                            /*#__PURE__*/ _jsx("button", {
                                type: "button",
                                className: "theme-toggle",
                                "aria-label": `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
                                onClick: ()=>setTheme((previous)=>previous === "dark" ? "light" : "dark"),
                                children: /*#__PURE__*/ _jsx("span", {
                                    className: "theme-toggle-ring",
                                    "aria-hidden": "true",
                                    children: theme === "dark" ? /*#__PURE__*/ _jsx(Moon, {
                                        size: 17
                                    }) : /*#__PURE__*/ _jsx(Sun, {
                                        size: 17
                                    })
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("main", {
                className: "portfolio-main",
                children: [
                    /*#__PURE__*/ _jsxs(motion.section, {
                        id: "profile",
                        className: "frame profile-frame",
                        ...reveal,
                        children: [
                            /*#__PURE__*/ _jsx("div", {
                                className: "avatar-box",
                                children: /*#__PURE__*/ _jsxs("div", {
                                    className: "avatar-core",
                                    children: [
                                        /*#__PURE__*/ _jsxs("div", {
                                            className: `cartoon-avatar cartoon-${currentAvatarFrame.id}`,
                                            role: "img",
                                            "aria-label": "Cartoon avatar waving hello",
                                            children: [
                                                /*#__PURE__*/ _jsx("span", {
                                                    className: "cartoon-hair"
                                                }),
                                                /*#__PURE__*/ _jsx("span", {
                                                    className: "cartoon-eye cartoon-eye-left"
                                                }),
                                                /*#__PURE__*/ _jsx("span", {
                                                    className: "cartoon-eye cartoon-eye-right"
                                                }),
                                                /*#__PURE__*/ _jsx("span", {
                                                    className: "cartoon-mouth"
                                                }),
                                                /*#__PURE__*/ _jsx("span", {
                                                    className: "cartoon-cheek cartoon-cheek-left"
                                                }),
                                                /*#__PURE__*/ _jsx("span", {
                                                    className: "cartoon-cheek cartoon-cheek-right"
                                                }),
                                                /*#__PURE__*/ _jsx("span", {
                                                    className: "cartoon-hand"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ _jsx("span", {
                                            className: `speech-bubble bubble-${currentAvatarFrame.id}`,
                                            children: currentAvatarFrame.greeting
                                        }, currentAvatarFrame.id)
                                    ]
                                })
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                className: "identity-box",
                                children: [
                                    /*#__PURE__*/ _jsx("p", {
                                        className: "eyebrow",
                                        children: cleanText(profile.title)
                                    }),
                                    /*#__PURE__*/ _jsxs("h1", {
                                        style: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
                                        children: [
                                            cleanText(profile.name),
                                            /*#__PURE__*/ _jsx("svg", {
                                                viewBox: "0 0 22 22",
                                                width: "28",
                                                height: "28",
                                                style: { flexShrink: 0 },
                                                "aria-label": "Verified",
                                                children: /*#__PURE__*/ _jsx("path", {
                                                    fill: "#1d9bf0",
                                                    d: "M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.143.271.586.702 1.084 1.24 1.438s1.167.55 1.813.568c.647-.018 1.275-.215 1.817-.568s.972-.853 1.245-1.44c.607.223 1.264.27 1.897.14.634-.131 1.218-.437 1.687-.882.445-.47.75-1.055.882-1.69.13-.634.083-1.29-.14-1.898.586-.273 1.084-.704 1.438-1.244.354-.54.552-1.17.57-1.817zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsxs("p", {
                                        className: "hero-subline",
                                        children: [
                                            cleanText(profile.title),
                                            " ",
                                            "\xb7",
                                            " ",
                                            cleanText(profile.location)
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsx("p", {
                                        className: "hero-bio",
                                        children: cleanText(profile.bio)
                                    }),
                                    /*#__PURE__*/ _jsxs("div", {
                                        className: "hero-actions",
                                        children: [
                                            /*#__PURE__*/ _jsxs("a", {
                                                href: profile.resumeUrl,
                                                download: true,
                                                className: "mono-button",
                                                onClick: ()=>trackEvent("resume_download_click"),
                                                children: [
                                                    /*#__PURE__*/ _jsx(Download, {
                                                        size: 16
                                                    }),
                                                    "Resume"
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsxs("a", {
                                                href: `mailto:${profile.email}`,
                                                className: "mono-button",
                                                onClick: ()=>trackEvent("contact_click", {
                                                        method: "mailto"
                                                    }),
                                                children: [
                                                    /*#__PURE__*/ _jsx(Mail, {
                                                        size: 16
                                                    }),
                                                    "Email"
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsxs("a", {
                                                href: profile.github,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "mono-button",
                                                onClick: ()=>trackEvent("social_click", {
                                                        platform: "github"
                                                    }),
                                                children: [
                                                    /*#__PURE__*/ _jsx(Github, {
                                                        size: 16
                                                    }),
                                                    "GitHub"
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs(motion.section, {
                        className: "frame info-frame",
                        ...reveal,
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                className: "info-row",
                                children: [
                                    /*#__PURE__*/ _jsx("span", {
                                        className: "info-icon",
                                        children: /*#__PURE__*/ _jsx(Building2, {
                                            size: 18
                                        })
                                    }),
                                    /*#__PURE__*/ _jsxs("span", {
                                        children: [
                                            "Building @ ",
                                            cleanText(experience[0]?.name || "Current Company")
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                className: "info-row",
                                children: [
                                    /*#__PURE__*/ _jsx("span", {
                                        className: "info-icon",
                                        children: /*#__PURE__*/ _jsx(MapPin, {
                                            size: 18
                                        })
                                    }),
                                    /*#__PURE__*/ _jsx("span", {
                                        children: cleanText(profile.location)
                                    })
                                ]
                            }),
                            /*#__PURE__*/ _jsxs("a", {
                                href: `mailto:${profile.email}`,
                                className: "info-row info-link",
                                children: [
                                    /*#__PURE__*/ _jsx("span", {
                                        className: "info-icon",
                                        children: /*#__PURE__*/ _jsx(Mail, {
                                            size: 18
                                        })
                                    }),
                                    /*#__PURE__*/ _jsx("span", {
                                        children: profile.email
                                    })
                                ]
                            }),
                            /*#__PURE__*/ _jsxs("a", {
                                href: profile.github,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "info-row info-link",
                                children: [
                                    /*#__PURE__*/ _jsx("span", {
                                        className: "info-icon",
                                        children: /*#__PURE__*/ _jsx(Github, {
                                            size: 18
                                        })
                                    }),
                                    /*#__PURE__*/ _jsx("span", {
                                        children: getDomain(profile.github)
                                    })
                                ]
                            }),
                            /*#__PURE__*/ _jsxs("a", {
                                href: profile.linkedin,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "info-row info-link",
                                children: [
                                    /*#__PURE__*/ _jsx("span", {
                                        className: "info-icon",
                                        children: /*#__PURE__*/ _jsx(Linkedin, {
                                            size: 18
                                        })
                                    }),
                                    /*#__PURE__*/ _jsx("span", {
                                        children: getDomain(profile.linkedin)
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs(motion.section, {
                        className: "section-block contributions-section",
                        ...reveal,
                        children: [
                            /*#__PURE__*/ _jsx("div", {
                                className: "contributions-graph",
                                children: /*#__PURE__*/ _jsx("img", {
                                    src: `https://ghchart.rshah.org/718096/${profile.github.replace(/^https?:\/\/github\.com\//, '').replace(/\/$/, '')}`,
                                    alt: "GitHub Contribution Graph",
                                    loading: "lazy",
                                    style: { width: '100%', height: 'auto', display: 'block' }
                                })
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                className: "contributions-footer",
                                children: [
                                    /*#__PURE__*/ _jsxs("span", {
                                        children: [
                                            "Contributions in ",
                                            new Date().getFullYear(),
                                            " on ",
                                            /*#__PURE__*/ _jsx("a", {
                                                href: profile.github,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                style: { color: 'inherit', textDecoration: 'underline' },
                                                children: "GitHub"
                                            }),
                                            "."
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsxs("span", {
                                        className: "contributions-legend",
                                        children: [
                                            "Less",
                                            /*#__PURE__*/ _jsx("span", { className: "legend-box l1" }),
                                            /*#__PURE__*/ _jsx("span", { className: "legend-box l2" }),
                                            /*#__PURE__*/ _jsx("span", { className: "legend-box l3" }),
                                            /*#__PURE__*/ _jsx("span", { className: "legend-box l4" }),
                                            "More"
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs(motion.section, {
                        id: "stack",
                        className: "section-block",
                        ...reveal,
                        children: [
                            /*#__PURE__*/ _jsx("h2", {
                                children: "Stack"
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                className: "stack-logo-panel",
                                children: /*#__PURE__*/ _jsx("div", {
                                    className: "stack-logo-grid",
                                    children: stackLogos.map((logo)=>{
                                        const iconColor = theme === "light" ? logo.lightColor ?? (logo.color === "FFFFFF" ? "0F172A" : logo.color ?? "0F172A") : logo.color ?? "FFFFFF";
                                        return /*#__PURE__*/ _jsx("span", {
                                            className: "stack-logo",
                                            "data-label": logo.name,
                                            title: logo.name,
                                            children: logo.icon === "openai" ? /*#__PURE__*/ _jsx("span", {
                                                className: "stack-logo-openai",
                                                children: /*#__PURE__*/ _jsx(OpenAIIcon, {})
                                            }) : logo.slug && !failedLogos[logo.name] ? /*#__PURE__*/ _jsx("img", {
                                                src: `https://cdn.simpleicons.org/${logo.slug}/${iconColor}`,
                                                alt: logo.name,
                                                loading: "lazy",
                                                decoding: "async",
                                                referrerPolicy: "no-referrer",
                                                onError: ()=>setFailedLogos((previous)=>({
                                                            ...previous,
                                                            [logo.name]: true
                                                        }))
                                            }) : /*#__PURE__*/ _jsx("span", {
                                                className: "stack-logo-fallback",
                                                children: logo.fallback || logo.name.slice(0, 2).toUpperCase()
                                            })
                                        }, logo.name);
                                    })
                                })
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                className: "stack-grid",
                                children: skills.map((skill)=>/*#__PURE__*/ _jsx("span", {
                                        className: "stack-chip",
                                        children: cleanText(skill.name)
                                    }, skill.name))
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs(motion.section, {
                        id: "projects",
                        className: "section-block",
                        ...reveal,
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                className: "section-head",
                                children: [
                                    /*#__PURE__*/ _jsxs("h2", {
                                        children: [
                                            "Projects ",
                                            /*#__PURE__*/ _jsxs("span", {
                                                children: [
                                                    "(",
                                                    filteredProjects.length,
                                                    ")"
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsxs("label", {
                                        className: "search-box",
                                        "aria-label": "Search projects",
                                        children: [
                                            /*#__PURE__*/ _jsx(Search, {
                                                size: 15
                                            }),
                                            /*#__PURE__*/ _jsx("input", {
                                                type: "text",
                                                placeholder: "Search projects, stack, and details",
                                                value: projectQuery,
                                                onChange: (event)=>setProjectQuery(event.currentTarget.value)
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                className: "project-list",
                                children: projectsToRender.map((item)=>{
                                    const isOpen = Boolean(openProjects[item.id]);
                                    const highlights = getProjectHighlights(item);
                                    return /*#__PURE__*/ _jsxs("article", {
                                        className: `project-item${isOpen ? " open" : ""}`,
                                        children: [
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "project-summary",
                                                children: [
                                                    /*#__PURE__*/ _jsx("div", {
                                                        className: "project-rail",
                                                        children: /*#__PURE__*/ _jsx("span", {
                                                            className: "project-node",
                                                            children: /*#__PURE__*/ _jsx(Box, {
                                                                size: 16
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className: "project-summary-main",
                                                        children: [
                                                            /*#__PURE__*/ _jsx("h3", {
                                                                children: cleanText(item.name)
                                                            }),
                                                            /*#__PURE__*/ _jsx("p", {
                                                                className: "project-meta",
                                                                children: getProjectMeta(item)
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ _jsx("div", {
                                                        className: "project-head-actions",
                                                        children: /*#__PURE__*/ _jsxs("div", {
                                                            className: "project-action-box",
                                                            children: [
                                                                item.sourceUrl && /*#__PURE__*/ _jsx("a", {
                                                                    href: item.sourceUrl,
                                                                    target: "_blank",
                                                                    rel: "noopener noreferrer",
                                                                    className: "icon-button compact",
                                                                    onClick: ()=>trackEvent("project_source_click", {
                                                                            project_id: item.id,
                                                                            project_name: item.name
                                                                        }),
                                                                    children: /*#__PURE__*/ _jsx(Link2, {
                                                                        size: 15
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ _jsx("button", {
                                                                    type: "button",
                                                                    className: "icon-button compact",
                                                                    "aria-expanded": isOpen,
                                                                    "aria-label": `Toggle details for ${item.name}`,
                                                                    onClick: ()=>setOpenProjects((previous)=>({
                                                                                ...previous,
                                                                                [item.id]: !previous[item.id]
                                                                            })),
                                                                    children: /*#__PURE__*/ _jsx(ChevronDown, {
                                                                        size: 16,
                                                                        className: isOpen ? "rotated" : ""
                                                                    })
                                                                })
                                                            ]
                                                        })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "project-body",
                                                children: [
                                                    item.desc && /*#__PURE__*/ _jsx("p", {
                                                        children: cleanText(item.desc)
                                                    }),
                                                    highlights.length > 0 && /*#__PURE__*/ _jsx("ul", {
                                                        className: "project-points",
                                                        children: highlights.map((point)=>/*#__PURE__*/ _jsx("li", {
                                                                children: point
                                                            }, `${item.id}-${point}`))
                                                    }),
                                                    item.sourceUrl && /*#__PURE__*/ _jsxs("p", {
                                                        className: "project-source-line",
                                                        children: [
                                                            "GitHub:",
                                                            " ",
                                                            /*#__PURE__*/ _jsx("a", {
                                                                href: item.sourceUrl,
                                                                target: "_blank",
                                                                rel: "noopener noreferrer",
                                                                onClick: ()=>trackEvent("project_source_click", {
                                                                        project_id: item.id,
                                                                        project_name: item.name
                                                                    }),
                                                                children: item.sourceUrl
                                                            })
                                                        ]
                                                    }),
                                                    item.tech && item.tech.length > 0 && /*#__PURE__*/ _jsx("div", {
                                                        className: "chip-row",
                                                        children: item.tech.map((tech)=>/*#__PURE__*/ _jsx("span", {
                                                                className: "chip",
                                                                children: cleanText(tech)
                                                            }, `${item.id}-${tech}`))
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className: "link-row",
                                                        children: [
                                                            item.sourceUrl && /*#__PURE__*/ _jsxs("a", {
                                                                href: item.sourceUrl,
                                                                target: "_blank",
                                                                rel: "noopener noreferrer",
                                                                onClick: ()=>trackEvent("project_source_click", {
                                                                        project_id: item.id,
                                                                        project_name: item.name
                                                                    }),
                                                                children: [
                                                                    "Source ",
                                                                    /*#__PURE__*/ _jsx(ExternalLink, {
                                                                        size: 13
                                                                    })
                                                                ]
                                                            }),
                                                            item.demoUrl && item.demoUrl !== "#" && /*#__PURE__*/ _jsxs("a", {
                                                                href: item.demoUrl,
                                                                target: "_blank",
                                                                rel: "noopener noreferrer",
                                                                onClick: ()=>trackEvent("visit_click", {
                                                                        section: "Projects",
                                                                        item_id: item.id,
                                                                        item_name: item.name
                                                                    }),
                                                                children: [
                                                                    "Demo ",
                                                                    /*#__PURE__*/ _jsx(ExternalLink, {
                                                                        size: 13
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }, item.id);
                                })
                            }),
                            canShowMoreProjects && /*#__PURE__*/ _jsxs("button", {
                                type: "button",
                                className: "show-more",
                                onClick: ()=>setVisibleProjects((previous)=>previous + 2),
                                children: [
                                    "Show More ",
                                    /*#__PURE__*/ _jsx(ChevronDown, {
                                        size: 16
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs(motion.section, {
                        id: "experience",
                        className: "section-block",
                        ...reveal,
                        children: [
                            /*#__PURE__*/ _jsx("h2", {
                                children: "Experience"
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                className: "timeline",
                                children: experience.map((item)=>{
                                    const isOpen = Boolean(openExperience[item.id]);
                                    return /*#__PURE__*/ _jsxs("article", {
                                        className: `timeline-item collapsible${isOpen ? " open" : ""}`,
                                        children: [
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "timeline-summary",
                                                children: [
                                                    /*#__PURE__*/ _jsx("span", {
                                                        className: "timeline-icon",
                                                        children: /*#__PURE__*/ _jsx(BriefcaseBusiness, {
                                                            size: 16
                                                        })
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className: "timeline-main",
                                                        children: [
                                                            /*#__PURE__*/ _jsx("h3", {
                                                                children: cleanText(item.name)
                                                            }),
                                                            /*#__PURE__*/ _jsx("p", {
                                                                className: "timeline-role",
                                                                children: cleanText(item.sub)
                                                            }),
                                                            /*#__PURE__*/ _jsx("p", {
                                                                className: "timeline-period",
                                                                children: cleanText(item.period)
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ _jsx("button", {
                                                        type: "button",
                                                        className: "icon-button compact timeline-toggle",
                                                        "aria-expanded": isOpen,
                                                        "aria-label": `Toggle details for ${item.name}`,
                                                        onClick: ()=>setOpenExperience((previous)=>({
                                                                    ...previous,
                                                                    [item.id]: !previous[item.id]
                                                                })),
                                                        children: /*#__PURE__*/ _jsx(ChevronDown, {
                                                            size: 16,
                                                            className: isOpen ? "rotated" : ""
                                                        })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "timeline-body",
                                                children: [
                                                    item.desc && /*#__PURE__*/ _jsx("p", {
                                                        children: cleanText(item.desc)
                                                    }),
                                                    item.tech && item.tech.length > 0 && /*#__PURE__*/ _jsx("div", {
                                                        className: "chip-row",
                                                        children: item.tech.map((tech)=>/*#__PURE__*/ _jsx("span", {
                                                                className: "chip",
                                                                children: cleanText(tech)
                                                            }, `${item.id}-${tech}`))
                                                    }),
                                                    item.url && /*#__PURE__*/ _jsxs("a", {
                                                        href: item.url,
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: "inline-link",
                                                        onClick: ()=>trackEvent("visit_click", {
                                                                section: "Experience",
                                                                item_id: item.id,
                                                                item_name: item.name
                                                            }),
                                                        children: [
                                                            "Company site ",
                                                            /*#__PURE__*/ _jsx(ExternalLink, {
                                                                size: 13
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }, item.id);
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs(motion.section, {
                        id: "education",
                        className: "section-block",
                        ...reveal,
                        children: [
                            /*#__PURE__*/ _jsx("h2", {
                                children: "Education"
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                className: "timeline",
                                children: education.map((item)=>{
                                    const isOpen = Boolean(openEducation[item.id]);
                                    return /*#__PURE__*/ _jsxs("article", {
                                        className: `timeline-item collapsible${isOpen ? " open" : ""}`,
                                        children: [
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "timeline-summary",
                                                children: [
                                                    /*#__PURE__*/ _jsx("span", {
                                                        className: "timeline-icon",
                                                        children: /*#__PURE__*/ _jsx(GraduationCap, {
                                                            size: 16
                                                        })
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className: "timeline-main",
                                                        children: [
                                                            /*#__PURE__*/ _jsx("h3", {
                                                                children: cleanText(item.name)
                                                            }),
                                                            /*#__PURE__*/ _jsx("p", {
                                                                className: "timeline-role",
                                                                children: cleanText(item.sub)
                                                            }),
                                                            /*#__PURE__*/ _jsx("p", {
                                                                className: "timeline-period",
                                                                children: cleanText(item.period)
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ _jsx("button", {
                                                        type: "button",
                                                        className: "icon-button compact timeline-toggle",
                                                        "aria-expanded": isOpen,
                                                        "aria-label": `Toggle details for ${item.name}`,
                                                        onClick: ()=>setOpenEducation((previous)=>({
                                                                    ...previous,
                                                                    [item.id]: !previous[item.id]
                                                                })),
                                                        children: /*#__PURE__*/ _jsx(ChevronDown, {
                                                            size: 16,
                                                            className: isOpen ? "rotated" : ""
                                                        })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "timeline-body",
                                                children: [
                                                    item.desc && /*#__PURE__*/ _jsx("p", {
                                                        children: cleanText(item.desc)
                                                    }),
                                                    item.tech && item.tech.length > 0 && /*#__PURE__*/ _jsx("div", {
                                                        className: "chip-row",
                                                        children: item.tech.map((tech)=>/*#__PURE__*/ _jsx("span", {
                                                                className: "chip",
                                                                children: cleanText(tech)
                                                            }, `${item.id}-${tech}`))
                                                    }),
                                                    item.url && /*#__PURE__*/ _jsxs("a", {
                                                        href: item.url,
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: "inline-link",
                                                        onClick: ()=>trackEvent("visit_click", {
                                                                section: "Education",
                                                                item_id: item.id,
                                                                item_name: item.name
                                                            }),
                                                        children: [
                                                            "Institution site ",
                                                            /*#__PURE__*/ _jsx(ExternalLink, {
                                                                size: 13
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }, item.id);
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs(motion.section, {
                        id: "skills",
                        className: "section-block",
                        ...reveal,
                        children: [
                            /*#__PURE__*/ _jsx("h2", {
                                children: "Skills"
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                className: "skills-list",
                                children: skills.map((skill)=>/*#__PURE__*/ _jsxs("div", {
                                        className: "skill-row",
                                        children: [
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "skill-head",
                                                children: [
                                                    /*#__PURE__*/ _jsx("span", {
                                                        children: cleanText(skill.name)
                                                    }),
                                                    /*#__PURE__*/ _jsxs("span", {
                                                        children: [
                                                            skill.level,
                                                            "%"
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsx("div", {
                                                className: "skill-track",
                                                children: /*#__PURE__*/ _jsx("span", {
                                                    className: "skill-fill",
                                                    style: {
                                                        width: `${Math.min(100, Math.max(0, skill.level))}%`
                                                    }
                                                })
                                            })
                                        ]
                                    }, skill.name))
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs(motion.section, {
                        id: "certifications",
                        className: "section-block",
                        ...reveal,
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                className: "section-head",
                                children: [
                                    /*#__PURE__*/ _jsxs("h2", {
                                        children: [
                                            "Certifications ",
                                            /*#__PURE__*/ _jsxs("span", {
                                                children: [
                                                    "(",
                                                    filteredCertifications.length,
                                                    ")"
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsxs("label", {
                                        className: "search-box",
                                        "aria-label": "Search certifications",
                                        children: [
                                            /*#__PURE__*/ _jsx(Search, {
                                                size: 15
                                            }),
                                            /*#__PURE__*/ _jsx("input", {
                                                type: "text",
                                                placeholder: "Search certifications, issuers, and skills",
                                                value: certQuery,
                                                onChange: (event)=>setCertQuery(event.currentTarget.value)
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                className: "timeline",
                                children: filteredCertifications.map((item)=>/*#__PURE__*/ _jsxs("article", {
                                        className: "timeline-item",
                                        children: [
                                            /*#__PURE__*/ _jsx("span", {
                                                className: "timeline-icon",
                                                children: /*#__PURE__*/ _jsx(Award, {
                                                    size: 16
                                                })
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "timeline-body",
                                                children: [
                                                    /*#__PURE__*/ _jsx("h3", {
                                                        children: cleanText(item.name)
                                                    }),
                                                    /*#__PURE__*/ _jsx("p", {
                                                        className: "timeline-role",
                                                        children: cleanText(item.sub)
                                                    }),
                                                    /*#__PURE__*/ _jsx("p", {
                                                        className: "timeline-period",
                                                        children: cleanText(item.period)
                                                    }),
                                                    item.desc && /*#__PURE__*/ _jsx("p", {
                                                        children: cleanText(item.desc)
                                                    }),
                                                    item.tech && item.tech.length > 0 && /*#__PURE__*/ _jsx("div", {
                                                        className: "chip-row",
                                                        children: item.tech.map((tech)=>/*#__PURE__*/ _jsx("span", {
                                                                className: "chip",
                                                                children: cleanText(tech)
                                                            }, `${item.id}-${tech}`))
                                                    }),
                                                    item.url && /*#__PURE__*/ _jsxs("a", {
                                                        href: item.url,
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: "inline-link",
                                                        onClick: ()=>trackEvent("credential_click", {
                                                                certification_id: item.id,
                                                                certification_name: item.name
                                                            }),
                                                        children: [
                                                            "View credential ",
                                                            /*#__PURE__*/ _jsx(ExternalLink, {
                                                                size: 13
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }, item.id))
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("footer", {
                className: "portfolio-footer",
                children: [
                    /*#__PURE__*/ _jsxs("p", {
                        children: [
                            "Built by ",
                            /*#__PURE__*/ _jsx("a", {
                                href: profile.github,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                children: cleanText(profile.name)
                            }),
                            ". The source code is available on ",
                            /*#__PURE__*/ _jsx("a", {
                                href: `${profile.github}/portfolio`,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                children: "GitHub"
                            }),
                            "."
                        ]
                    })
                ]
            })
        ]
    });
}
