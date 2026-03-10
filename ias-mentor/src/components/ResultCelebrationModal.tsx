"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const STORAGE_KEY = "air284_celebration_shown";

interface Particle {
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    speedX: number;
    speedY: number;
    rotation: number;
    rotationSpeed: number;
    shape: "square" | "circle" | "ribbon";
    opacity: number;
}

const CONFETTI_COLORS = [
    "#FFD700", "#FFA500", "#FF6B35", "#C8A951",
    "#FFFFFF", "#FFE066", "#F4C430", "#DAA520",
];

function generateParticles(count: number): Particle[] {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: 6 + Math.random() * 10,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: 1.5 + Math.random() * 2.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        shape: (["square", "circle", "ribbon"] as const)[Math.floor(Math.random() * 3)],
        opacity: 0.8 + Math.random() * 0.2,
    }));
}

export default function ResultCelebrationModal() {
    const [visible, setVisible] = useState(false);
    const [exiting, setExiting] = useState(false);
    const animFrameRef = useRef<number | null>(null);
    const particleDataRef = useRef<Particle[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const shown = sessionStorage.getItem(STORAGE_KEY);
        if (!shown) {
            const t = setTimeout(() => setVisible(true), 800);
            return () => clearTimeout(t);
        }
    }, []);


    // Confetti canvas animation
    useEffect(() => {
        if (!visible || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        particleDataRef.current = generateParticles(45);

        // Stop confetti after 5 seconds
        const stopTimer = setTimeout(() => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 5000);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particleDataRef.current = particleDataRef.current
                .map((p) => {
                    const nx = p.x + p.speedX * 0.3;
                    const ny = p.y + p.speedY * 0.4;
                    const nr = p.rotation + p.rotationSpeed;
                    const newP = { ...p, x: nx, y: ny, rotation: nr };
                    ctx.save();
                    ctx.globalAlpha = p.opacity;
                    ctx.translate((nx / 100) * canvas.width, (ny / 100) * canvas.height);
                    ctx.rotate((nr * Math.PI) / 180);
                    ctx.fillStyle = p.color;
                    if (p.shape === "circle") {
                        ctx.beginPath();
                        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                        ctx.fill();
                    } else if (p.shape === "ribbon") {
                        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
                    } else {
                        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                    }
                    ctx.restore();
                    return newP;
                })
                .filter((p) => p.y < 110);

            while (particleDataRef.current.length < 30) {
                const base = generateParticles(1)[0];
                particleDataRef.current.push({ ...base, y: -5 });
            }

            animFrameRef.current = requestAnimationFrame(draw);
        };

        animFrameRef.current = requestAnimationFrame(draw);

        return () => {
            clearTimeout(stopTimer);
            window.removeEventListener("resize", resize);
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, [visible]);

    const handleClose = () => {
        setExiting(true);
        sessionStorage.setItem(STORAGE_KEY, "true");
        setTimeout(() => setVisible(false), 600);
    };

    if (!visible) return null;

    return (
        <div
            className={`fixed inset-0 z-[80] flex items-center justify-center`}
            style={{
                opacity: exiting ? 0 : 1,
                transition: "opacity 0.6s ease",
            }}
        >
            {/* ── Premium Animated Background ── */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden>
                {/* Base deep gradient */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at 30% 40%, #1a0a00 0%, #0d0600 40%, #000000 100%)",
                    }}
                />

                {/* Animated gradient orbs */}
                <div className="celebration-orb orb-1" />
                <div className="celebration-orb orb-2" />
                <div className="celebration-orb orb-3" />
                <div className="celebration-orb orb-4" />

                {/* Rising light columns */}
                <div className="light-column col-1" />
                <div className="light-column col-2" />
                <div className="light-column col-3" />

                {/* Horizontal shimmer lines */}
                <div className="shimmer-line line-1" />
                <div className="shimmer-line line-2" />

                {/* Top dark vignette to keep text readable */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)",
                    }}
                />
            </div>

            {/* Confetti Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 1 }}
            />



            {/* Main content card */}
            <div
                className="relative z-10 flex flex-col items-center px-6 py-0 max-w-2xl w-full mx-4"
                style={{
                    animation: exiting ? "none" : "celebrationEntrance 0.8s cubic-bezier(0.22,1,0.36,1) forwards",
                }}
            >
                {/* Top badge */}
                <div className="flex items-center gap-2 mb-5">
                    <span
                        className="text-xs font-bold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border"
                        style={{
                            background: "rgba(212,175,55,0.15)",
                            borderColor: "rgba(212,175,55,0.5)",
                            color: "#FFD700",
                        }}
                    >
                        🏆 &nbsp; IAS 2025 Final Result
                    </span>
                </div>

                {/* Headline */}
                <h1
                    className="text-white text-center font-black leading-tight mb-1"
                    style={{
                        fontSize: "clamp(2rem, 5vw, 3.2rem)",
                        fontFamily: "'Oswald', sans-serif",
                        textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                        letterSpacing: "0.02em",
                    }}
                >
                    Legendary Result!
                </h1>
                <p
                    className="text-center mb-7 font-medium"
                    style={{
                        color: "rgba(255,255,255,0.75)",
                        fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
                        textShadow: "0 1px 8px rgba(0,0,0,0.6)",
                    }}
                >
                    Our student makes India proud 🇮🇳
                </p>

                {/* Student card */}
                <div
                    className="relative flex flex-col items-center rounded-3xl px-10 py-8 w-full"
                    style={{
                        background: "rgba(255,255,255,0.05)",
                        backdropFilter: "blur(28px)",
                        WebkitBackdropFilter: "blur(28px)",
                        border: "1px solid rgba(212,175,55,0.35)",
                        boxShadow:
                            "0 0 80px rgba(212,175,55,0.18), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                >
                    {/* Sparkle corners */}
                    <span className="absolute top-3 left-4 text-yellow-400 text-xl select-none">✦</span>
                    <span className="absolute top-3 right-4 text-yellow-400 text-xl select-none">✦</span>
                    <span className="absolute bottom-3 left-4 text-yellow-400/50 text-sm select-none">✦</span>
                    <span className="absolute bottom-3 right-4 text-yellow-400/50 text-sm select-none">✦</span>

                    {/* Photo with spinning gold ring */}
                    <div className="relative mb-5">
                        <div
                            className="absolute inset-[-4px] rounded-full"
                            style={{
                                background: "conic-gradient(from 0deg, #FFD700, #FFA500, #FFE066, #C8A951, #FFD700)",
                                animation: "spinRing 4s linear infinite",
                                borderRadius: "9999px",
                            }}
                        />
                        <div
                            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden"
                            style={{
                                border: "4px solid #1a0a00",
                                boxShadow: "0 0 30px rgba(212,175,55,0.6), 0 0 60px rgba(212,175,55,0.3)",
                            }}
                        >
                            <Image
                                src="https://ik.imagekit.io/8vvkoi3dt/Result/Anusha.jpg"
                                alt="Anusha A S — AIR 284"
                                fill
                                className="object-cover object-center"
                                priority
                            />
                        </div>
                        <div
                            className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full flex items-center justify-center text-base"
                            style={{
                                background: "linear-gradient(135deg, #FFD700, #FFA500)",
                                boxShadow: "0 2px 10px rgba(212,175,55,0.5)",
                                border: "2px solid #1a0a00",
                            }}
                        >
                            🏅
                        </div>
                    </div>

                    {/* Name */}
                    <h2
                        className="text-white font-black text-center tracking-wide mb-1"
                        style={{
                            fontSize: "clamp(1.5rem, 4vw, 2rem)",
                            fontFamily: "'Oswald', sans-serif",
                            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                        }}
                    >
                        Anusha A S
                    </h2>

                    {/* AIR 284 */}
                    <div className="flex items-center gap-3 my-3">
                        <span
                            className="font-black tracking-tight"
                            style={{
                                fontSize: "clamp(2.8rem, 7vw, 4.5rem)",
                                fontFamily: "'Oswald', sans-serif",
                                background: "linear-gradient(135deg, #FFD700 0%, #FFA500 30%, #FFD700 60%, #C8A951 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                filter: "drop-shadow(0 2px 8px rgba(212,175,55,0.5))",
                                lineHeight: 1,
                            }}
                        >
                            AIR 284
                        </span>
                    </div>

                    <div
                        className="w-24 h-px my-3"
                        style={{
                            background: "linear-gradient(to right, transparent, rgba(212,175,55,0.6), transparent)",
                        }}
                    />

                    <p
                        className="text-center text-sm font-semibold uppercase tracking-widest"
                        style={{ color: "rgba(255,215,0,0.75)" }}
                    >
                        Legendary IAS Mentor · IAS 2025
                    </p>
                    <p
                        className="text-center mt-1 text-xs"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                        Civil Services Examination 2025
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-sm">
                    <button
                        onClick={handleClose}
                        className="flex-1 py-3 px-6 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                            background: "linear-gradient(135deg, #FFD700, #FFA500, #FF8C00)",
                            color: "#1a1a1a",
                            boxShadow: "0 4px 20px rgba(212,175,55,0.4)",
                        }}
                    >
                        🎉 &nbsp; Congratulations!
                    </button>

                </div>
            </div>

            {/* ── All CSS animations ── */}
            <style jsx global>{`
        @keyframes celebrationEntrance {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
        }
        @keyframes spinRing {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }

        /* Floating glow orbs */
        .celebration-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .orb-1 {
          width: 420px; height: 420px;
          top: -10%; left: -10%;
          background: radial-gradient(circle, rgba(180,90,0,0.55) 0%, transparent 70%);
          animation: orbFloat1 8s ease-in-out infinite;
        }
        .orb-2 {
          width: 350px; height: 350px;
          bottom: -5%; right: -5%;
          background: radial-gradient(circle, rgba(212,140,0,0.45) 0%, transparent 70%);
          animation: orbFloat2 10s ease-in-out infinite;
        }
        .orb-3 {
          width: 280px; height: 280px;
          top: 30%; right: 10%;
          background: radial-gradient(circle, rgba(120,50,0,0.4) 0%, transparent 70%);
          animation: orbFloat3 7s ease-in-out infinite;
        }
        .orb-4 {
          width: 200px; height: 200px;
          bottom: 20%; left: 15%;
          background: radial-gradient(circle, rgba(255,180,0,0.3) 0%, transparent 70%);
          animation: orbFloat1 12s ease-in-out infinite reverse;
        }

        @keyframes orbFloat1 {
          0%,100% { transform: translate(0, 0)      scale(1);    }
          33%      { transform: translate(60px, 40px) scale(1.08); }
          66%      { transform: translate(-30px,60px) scale(0.95); }
        }
        @keyframes orbFloat2 {
          0%,100% { transform: translate(0, 0)        scale(1);    }
          40%      { transform: translate(-50px,-30px) scale(1.1);  }
          70%      { transform: translate(40px, 50px)  scale(0.92); }
        }
        @keyframes orbFloat3 {
          0%,100% { transform: translate(0, 0)      scale(1);   }
          50%      { transform: translate(-40px,40px) scale(1.05);}
        }

        /* Rising vertical light columns */
        .light-column {
          position: absolute;
          bottom: 0;
          width: 2px;
          height: 60%;
          pointer-events: none;
          border-radius: 2px;
          opacity: 0;
          animation: columnRise 4s ease-in-out infinite;
        }
        .col-1 {
          left: 20%;
          background: linear-gradient(to top, transparent, rgba(255,200,0,0.35), transparent);
          animation-delay: 0s;
        }
        .col-2 {
          left: 50%;
          background: linear-gradient(to top, transparent, rgba(255,160,0,0.3), transparent);
          animation-delay: 1.4s;
          width: 3px;
        }
        .col-3 {
          left: 78%;
          background: linear-gradient(to top, transparent, rgba(255,200,0,0.28), transparent);
          animation-delay: 2.8s;
        }
        @keyframes columnRise {
          0%   { opacity: 0; transform: translateY(0);     }
          20%  { opacity: 1; }
          80%  { opacity: 0.6; }
          100% { opacity: 0; transform: translateY(-120%); }
        }

        /* Horizontal shimmer lines */
        .shimmer-line {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          pointer-events: none;
          background: linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.3) 40%, rgba(255,215,0,0.6) 50%, rgba(255,215,0,0.3) 60%, transparent 100%);
          animation: shimmerScan 5s linear infinite;
          opacity: 0;
        }
        .line-1 {
          top: 30%;
          animation-delay: 0s;
        }
        .line-2 {
          top: 70%;
          animation-delay: 2.5s;
        }
        @keyframes shimmerScan {
          0%   { opacity: 0; transform: translateX(-100%); }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { opacity: 0; transform: translateX(100%); }
        }
      `}</style>
        </div>
    );
}
