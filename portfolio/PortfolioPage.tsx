"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
    TrendingUp,
    PieChart,
    Feather,
    Download,
    ArrowRight,
    Users,
    Award,
    Target,
    Sparkles,
    ExternalLink,
    ChevronRight
} from 'lucide-react';

// ============================================
// ANIMATION VARIANTS
// ============================================
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
};

// ============================================
// GLITCH IMAGE COMPONENT
// ============================================
const GlitchImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Main Image */}
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}
            />

            {/* Glitch Layers */}
            {isHovered && (
                <>
                    <img
                        src={src}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-color-dodge animate-glitch-1"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}
                    />
                    <img
                        src={src}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-exclusion animate-glitch-2"
                        style={{ clipPath: 'polygon(0 45%, 100% 45%, 100% 100%, 0 100%)' }}
                    />
                </>
            )}

            {/* Scan Lines */}
            <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-10" />

            {/* RGB Split Border on Hover */}
            <div className={`absolute inset-0 border-2 rounded-2xl transition-all duration-300 ${isHovered
                    ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4),-2px_0_0_rgba(59,130,246,0.5),2px_0_0_rgba(236,72,153,0.5)]'
                    : 'border-white/10'
                }`} />
        </div>
    );
};

// ============================================
// BENTO CARD COMPONENT
// ============================================
interface BentoCardProps {
    title: string;
    role: string;
    metrics: string[];
    icon: React.ElementType;
    gradient: string;
    delay?: number;
}

const BentoCard: React.FC<BentoCardProps> = ({ title, role, metrics, icon: Icon, gradient, delay = 0 }) => {
    return (
        <motion.div
            variants={scaleIn}
            className="group relative overflow-hidden rounded-3xl bg-[#0A0A0A] border border-white/[0.08] p-8 hover:border-white/20 transition-all duration-500"
        >
            {/* Gradient Mesh Background */}
            <div className={`absolute -top-24 -right-24 w-48 h-48 ${gradient} rounded-full blur-[100px] opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />

            {/* Icon */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
            </div>

            {/* Content */}
            <h3 className="font-serif text-2xl font-medium text-white mb-2">{title}</h3>
            <p className="text-sm text-zinc-500 uppercase tracking-wider mb-6">{role}</p>

            {/* Metrics */}
            <div className="space-y-3">
                {metrics.map((metric, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        <span className="text-zinc-300 text-sm font-medium">{metric}</span>
                    </div>
                ))}
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent" />
            </div>
        </motion.div>
    );
};

// ============================================
// ECOSYSTEM CARD COMPONENT
// ============================================
interface EcosystemCardProps {
    title: string;
    role: string;
    context: string;
    icon: React.ElementType;
}

const EcosystemCard: React.FC<EcosystemCardProps> = ({ title, role, context, icon: Icon }) => {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="flex-shrink-0 w-[340px] p-6 rounded-2xl bg-[#0A0A0A] border border-white/[0.08] hover:border-purple-500/30 transition-all duration-300"
        >
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-purple-400" strokeWidth={1.5} />
                </div>
                <div>
                    <h4 className="font-medium text-white text-lg">{title}</h4>
                    <p className="text-purple-400 text-sm mt-1">{role}</p>
                    <p className="text-zinc-500 text-sm mt-2 leading-relaxed">{context}</p>
                </div>
            </div>
        </motion.div>
    );
};

// ============================================
// MAIN PORTFOLIO PAGE COMPONENT
// ============================================
const PortfolioPage: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Deployment/Strategy Cards Data
    const deployments = [
        {
            title: "Hyper-Local Growth Engine",
            role: "Growth Strategist · StockGro",
            metrics: ["Onboarded 1,100+ users", "Partnered with DSEU", "Led 30-member team"],
            icon: TrendingUp,
            gradient: "from-emerald-500 to-teal-600"
        },
        {
            title: "Market Intelligence Analysis",
            role: "Research Analyst · Finlatics",
            metrics: ["Improved STP by 15%", "Researched 20+ Firms", "Tested 3+ Growth Hypotheses"],
            icon: PieChart,
            gradient: "from-blue-500 to-indigo-600"
        },
        {
            title: "Brand Narrative Design",
            role: "Content Strategist · Corstone",
            metrics: ["Showcased at Leadership Level", "Boosted NPS Impact Metrics"],
            icon: Feather,
            gradient: "from-purple-500 to-pink-600"
        }
    ];

    // Ecosystem Leadership Data
    const ecosystemItems = [
        {
            title: "IIM Rohtak IT Committee",
            role: "Junior Coordinator",
            context: "Organizing Tech Talks & Workshops for the B-School ecosystem.",
            icon: Target
        },
        {
            title: "E-Cell DSEU",
            role: "President",
            context: "Scaled flagship event 'Riwaaz' to 1,500+ attendees.",
            icon: Sparkles
        },
        {
            title: "Placement Coordinator",
            role: "Lead",
            context: "Managed placement drives for 2,000+ students.",
            icon: Users
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans">
            {/* Global Styles */}
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
        
        :root {
          --font-serif: 'Playfair Display', Georgia, serif;
          --font-sans: 'Inter', system-ui, sans-serif;
        }
        
        .font-serif {
          font-family: var(--font-serif);
        }
        
        .font-sans {
          font-family: var(--font-sans);
        }
        
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-3px, 3px); }
          40% { transform: translate(-3px, -3px); }
          60% { transform: translate(3px, 3px); }
          80% { transform: translate(3px, -3px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          25% { transform: translate(3px, -3px); filter: hue-rotate(90deg); }
          50% { transform: translate(-3px, 3px); filter: hue-rotate(180deg); }
          75% { transform: translate(3px, 3px); filter: hue-rotate(270deg); }
        }
        
        .animate-glitch-1 {
          animation: glitch-1 0.3s infinite;
        }
        
        .animate-glitch-2 {
          animation: glitch-2 0.5s infinite;
        }
        
        .bg-scanlines {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.15) 2px,
            rgba(0,0,0,0.15) 4px
          );
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

            {/* ============================================
          SECTION 1: HERO - THE HOOK
          ============================================ */}
            <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto w-full relative z-10">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                    >
                        {/* Left - Headshot with Glitch Effect */}
                        <motion.div variants={fadeInUp} className="flex justify-center lg:justify-start order-2 lg:order-1">
                            <div className="w-full max-w-md">
                                <GlitchImage
                                    src="/portfolio/assets/robin-headshot.jpg"
                                    alt="Robin Gautam - Digital Strategist"
                                />
                            </div>
                        </motion.div>

                        {/* Right - Bio Card */}
                        <motion.div variants={fadeInUp} className="order-1 lg:order-2">
                            <div className="relative">
                                {/* Glassmorphism Card */}
                                <div className="relative p-8 sm:p-10 rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] overflow-hidden">
                                    {/* Gradient Border Effect */}
                                    <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 pointer-events-none" />

                                    {/* Headline */}
                                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6">
                                        Marketing Brain.
                                        <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                            Engineering Hands.
                                        </span>
                                    </h1>

                                    {/* Sub-headline */}
                                    <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed mb-6">
                                        <span className="text-white font-medium">MBA Candidate at IIM Rohtak.</span>{' '}
                                        I bridge the gap between Business Strategy and Technical Execution.
                                    </p>

                                    {/* Tagline */}
                                    <div className="flex items-center gap-3 text-purple-400">
                                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                                        <span className="text-sm font-medium tracking-wide">
                                            Founder of robingautam.in (Digital Product Studio)
                                        </span>
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/[0.08]">
                                        <div>
                                            <div className="text-3xl font-bold text-white">15+</div>
                                            <div className="text-sm text-zinc-500">Projects Shipped</div>
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold text-white">1.5K+</div>
                                            <div className="text-sm text-zinc-500">Users Impacted</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ============================================
          SECTION 2: IMPACT GRID - DEPLOYMENTS
          ============================================ */}
            <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
                            <Award className="w-4 h-4" />
                            Strategic Portfolio
                        </span>
                        <h2 className="font-serif text-4xl sm:text-5xl font-medium text-white mb-4">
                            Selected Deployments & Strategy
                        </h2>
                        <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
                            Real impact. Real metrics. From hyper-growth startups to enterprise consulting.
                        </p>
                    </motion.div>

                    {/* Bento Grid */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {deployments.map((deployment, index) => (
                            <BentoCard key={index} {...deployment} delay={index * 0.1} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ============================================
          SECTION 3: ECOSYSTEM LEADERSHIP
          ============================================ */}
            <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#030303] relative overflow-hidden">
                {/* Background Texture */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-sm font-medium mb-6">
                            <Users className="w-4 h-4" />
                            Leadership Roles
                        </span>
                        <div className="flex items-end justify-between">
                            <h2 className="font-serif text-4xl sm:text-5xl font-medium text-white">
                                Ecosystem Leadership
                            </h2>
                            <div className="hidden sm:flex items-center gap-2 text-zinc-500">
                                <span className="text-sm">Scroll</span>
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Horizontal Scroll */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar"
                    >
                        {ecosystemItems.map((item, index) => (
                            <EcosystemCard key={index} {...item} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ============================================
          SECTION 4: DUAL CTA FOOTER
          ============================================ */}
            <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative">
                {/* Background Glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[800px] h-[400px] bg-purple-600/5 rounded-full blur-[150px]" />
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-10 sm:p-16 overflow-hidden"
                    >
                        {/* Animated Border */}
                        <div className="absolute inset-0 rounded-3xl">
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 opacity-50" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 text-center">
                            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-6">
                                Let's Build Something{' '}
                                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                    Extraordinary
                                </span>
                            </h2>
                            <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10">
                                Whether you're recruiting for strategy roles or need a digital product partner,
                                I bring the same rigor to both.
                            </p>

                            {/* Dual CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                {/* Left - Download CV */}
                                <motion.a
                                    href="/Robin_Gautam_CV.pdf"
                                    download
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group flex items-center gap-3 px-8 py-4 rounded-xl border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-300"
                                >
                                    <Download className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                                    <span>Download CV (MBA Focus)</span>
                                </motion.a>

                                {/* Right - Hire Agency */}
                                <motion.a
                                    href="https://robingautam.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-lg shadow-purple-500/25"
                                >
                                    <span>Hire My Agency</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer Attribution */}
            <footer className="py-8 px-4 text-center border-t border-white/[0.05]">
                <p className="text-sm text-zinc-500">
                    Designed & Built by{' '}
                    <a
                        href="https://robingautam.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                        Robin Gautam
                    </a>
                </p>
            </footer>
        </div>
    );
};

export default PortfolioPage;
