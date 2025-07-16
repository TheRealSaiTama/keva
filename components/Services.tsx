'use client';

import { useRef } from 'react';
import StarryBackground from './StarryBackground';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Monitor, Smartphone, Cloud, Database, Palette, Shield } from 'lucide-react';

const services = [
    {
        icon: Monitor,
        title: 'Web Development',
        description: 'Modern, responsive websites built with cutting-edge technologies',
        features: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'Performance Optimized'],
        color: 'from-purple-500',
        borderColor: 'border-purple-500/30'
    },
    {
        icon: Smartphone,
        title: 'Mobile Apps',
        description: 'Native and cross-platform mobile applications',
        features: ['React Native', 'iOS & Android', 'App Store Deployment', 'Push Notifications'],
        color: 'from-sky-500',
        borderColor: 'border-sky-500/30'
    },
    {
        icon: Cloud,
        title: 'Cloud Solutions',
        description: 'Scalable cloud infrastructure and deployment',
        features: ['AWS & Vercel', 'Auto Scaling', 'CDN Integration', '99.9% Uptime'],
        color: 'from-emerald-500',
        borderColor: 'border-emerald-500/30'
    },
    {
        icon: Database,
        title: 'Backend Systems',
        description: 'Robust APIs and database architecture',
        features: ['Node.js & Python', 'PostgreSQL & MongoDB', 'RESTful APIs', 'Microservices'],
        color: 'from-rose-500',
        borderColor: 'border-rose-500/30'
    },
    {
        icon: Palette,
        title: 'UI/UX Design',
        description: 'Beautiful, intuitive user interfaces and experiences',
        features: ['Figma Design', 'User Research', 'Prototyping', 'Design Systems'],
        color: 'from-amber-500',
        borderColor: 'border-amber-500/30'
    },
    {
        icon: Shield,
        title: 'Security & Testing',
        description: 'Comprehensive security audits and quality assurance',
        features: ['Security Audits', 'Automated Testing', 'Code Reviews', 'Performance Testing'],
        color: 'from-indigo-500',
        borderColor: 'border-indigo-500/30'
    }
];

const cardVariants: Variants = {
    initial: { opacity: 0, y: 50 },
    animate: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.5,
            ease: 'easeOut'
        }
    })
};

const ServiceCard = ({ service, i }: { service: typeof services[0], i: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <motion.div
            ref={cardRef}
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            custom={i}
            className={`group relative w-full h-full flex-shrink-0 p-8 rounded-3xl border ${service.borderColor} bg-slate-900/50 backdrop-blur-md overflow-hidden flex flex-col justify-between`}
        >
            <div className={`absolute top-0 left-0 h-48 w-full bg-gradient-to-b ${service.color} to-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
            <div className="absolute inset-0 bg-dot-pattern opacity-5"></div>

            <div className="relative z-10">
                <service.icon className="w-10 h-10 text-white/80 mb-6" />
                <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-400 text-base mb-6 min-h-[5rem]">{service.description}</p>
            </div>

            <ul className="space-y-3 relative z-10 mt-auto">
                {service.features.map((feature) => (
                    <li key={feature} className="text-sm text-gray-300 flex items-center">
                        <div className={`w-1.5 h-1.5 rounded-full mr-3 bg-gradient-to-r ${service.color} to-transparent`} />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <div
                className={`absolute -inset-2 bg-gradient-to-br ${service.color} to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10`}
            ></div>
        </motion.div>
    )
}

export default function Services() {
    const containerRef = useRef<HTMLElement>(null);
    return (
        <section ref={containerRef} className="relative bg-black text-white py-24 sm:py-32 overflow-hidden">
            <div className="absolute inset-0">
                <StarryBackground />
            </div>
            <div className="relative container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <div className="inline-block bg-purple-600/20 border border-purple-500/30 rounded-full px-4 py-2 backdrop-blur-sm mb-6">
                        <span className="text-sm font-medium text-purple-300">Our Services</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">Solutions That Drive Results</h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-16">
                        From sleek web platforms to robust cloud infrastructure, we build digital products that are secure, scalable, and beautiful.
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <ServiceCard key={service.title} service={service} i={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}