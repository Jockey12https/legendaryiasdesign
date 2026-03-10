"use client";

import { useState, useEffect } from "react";

const BANNER_STORAGE_KEY = "air284_banner_dismissed";

export default function ResultAnnouncementBanner() {
    const [visible, setVisible] = useState(false);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const dismissed = localStorage.getItem(BANNER_STORAGE_KEY);
        if (!dismissed) setVisible(true);
    }, []);

    const handleDismiss = () => {
        setExiting(true);
        setTimeout(() => {
            localStorage.setItem(BANNER_STORAGE_KEY, "true");
            setVisible(false);
        }, 400);
    };

    if (!visible) return null;

    return (
        <div
            className="relative overflow-hidden w-full"
            style={{
                background: "linear-gradient(90deg, #92400e, #b45309, #d97706, #f59e0b, #d97706, #b45309, #92400e)",
                backgroundSize: "200% 100%",
                animation: exiting
                    ? "bannerSlideUp 0.4s ease forwards"
                    : "shimmerBanner 3s linear infinite",
                transition: "max-height 0.4s ease, opacity 0.4s ease",
                opacity: exiting ? 0 : 1,
                zIndex: 100,
            }}
        >
            {/* Shimmer overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmerSweep 2.5s ease-in-out infinite",
                }}
            />

            <div className="relative flex items-center justify-center gap-2 px-4 py-2 text-center flex-wrap">
                {/* Left icons */}
                <span className="text-white text-base select-none hidden sm:inline">🏆</span>

                {/* Main text */}
                <span
                    className="text-white font-black text-xs sm:text-sm tracking-wide"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
                >
                    🎉 RESULT!
                </span>

                <span className="hidden sm:block w-px h-4 bg-white/40 mx-1" />

                <span
                    className="text-yellow-100 font-semibold text-xs sm:text-sm"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
                >
                    Our student&nbsp;
                    <strong className="text-white font-black">Anusha A S</strong>
                    &nbsp;achieves&nbsp;
                    <strong
                        className="font-black"
                        style={{
                            color: "#FFF9C4",
                            textShadow: "0 0 8px rgba(255,215,0,0.6)",
                        }}
                    >
                        AIR 284
                    </strong>
                    &nbsp;in IAS 2025
                </span>

                <span className="hidden sm:block w-px h-4 bg-white/40 mx-1" />

                <span className="text-white/90 text-xs hidden md:inline font-medium">
                    Legendary IAS Mentor 🇮🇳
                </span>

                <span className="text-white text-base select-none hidden sm:inline">✨</span>

                {/* Dismiss button */}
                <button
                    onClick={handleDismiss}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200 rounded-full p-1 hover:bg-white/10"
                    aria-label="Dismiss banner"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                    </svg>
                </button>
            </div>

            <style jsx global>{`
        @keyframes shimmerBanner {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes shimmerSweep {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes bannerSlideUp {
          from { max-height: 48px; opacity: 1; }
          to { max-height: 0; opacity: 0; }
        }
      `}</style>
        </div>
    );
}
