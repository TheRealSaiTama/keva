'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useRef, FC, ReactNode, useState, useEffect } from 'react';

interface Project {
    title: string;
    category: string;
    description: string;
    image: string;
    tech: string[];
}

const projects: Project[] = [
    {
      title: "E-Commerce Platform",
      category: "Web Application",
      description: "A modern e-commerce solution with advanced analytics and AI-powered recommendations",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"]
    },
    {
      title: "FinTech Mobile App",
      category: "Mobile Application",
      description: "Secure financial management app with real-time transactions and budgeting tools",
        image: "https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React Native", "Node.js", "MongoDB", "Plaid API"]
    },
    {
      title: "Healthcare Dashboard",
      category: "Web Application",
      description: "Comprehensive patient management system with real-time monitoring and analytics",
      image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "Python", "FastAPI", "PostgreSQL"]
    },
    {
      title: "AI-Powered SaaS",
      category: "Cloud Platform",
      description: "Machine learning platform for automated business intelligence and predictions",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Next.js", "Python", "TensorFlow", "AWS"]
    }
  ];

const ProjectCard: FC<{ project: Project; isMobile: boolean }> = ({ project, isMobile }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isMobile || !ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
    const imageX = useTransform(mouseXSpring, [-0.5, 0.5], ["-10px", "10px"]);
    const imageY = useTransform(mouseYSpring, [-0.5, 0.5], ["-10px", "10px"]);

    if (isMobile) {
        return (
            <div className="bg-gradient-to-br from-gray-900 to-black/90 rounded-2xl border border-white/10 overflow-hidden">
                <div className="aspect-video relative">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-4 sm:p-6">
                    <span className="text-xs sm:text-sm text-purple-400 font-medium uppercase tracking-widest">{project.category}</span>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-2 mb-2 sm:mb-3 text-white">{project.title}</h3>
                    <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                            <span key={tech} className="px-2 sm:px-3 py-1 bg-gray-800/80 text-xs sm:text-sm rounded-full border border-gray-700/50 backdrop-blur-sm">{tech}</span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

  return (
          <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="relative flex-shrink-0 w-full h-full rounded-2xl bg-gradient-to-br from-gray-900 to-black/90 p-8 border border-white/10"
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
            }}
                className="absolute inset-4 grid place-content-center rounded-xl bg-transparent"
            >
                <motion.img
                    src={project.image}
                    alt={project.title}
                    style={{
                        translateX: imageX,
                        translateY: imageY,
                        transformStyle: "preserve-3d"
                    }}
                    className="w-full h-full object-cover rounded-lg shadow-2xl shadow-black/40"
                />
            </div>
            <div style={{ transform: "translateZ(75px)" }} className="mt-48 text-left">
                <span className="text-sm text-purple-400 font-medium uppercase tracking-widest">{project.category}</span>
                <h3 className="text-3xl font-bold mt-2 mb-3 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech) => (
                        <span key={tech} className="px-4 py-1.5 bg-gray-800/80 text-sm rounded-full border border-gray-700/50 backdrop-blur-sm">{tech}</span>
        ))}
      </div>
            </div>
        </motion.div>
    );
};

export default function Portfolio() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section className="py-16 sm:py-20 md:py-24 bg-black text-white relative">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={itemVariants}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-block bg-purple-600/20 border border-purple-500/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-medium text-purple-300">Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Featured Work</h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Showcasing our latest projects and the innovative solutions we've delivered
          </p>
        </motion.div>

            <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className={isMobile ? "space-y-6 sm:space-y-8" : "grid md:grid-cols-2 gap-12"}
                    style={!isMobile ? { perspective: "1000px" } : {}}
                >
                    {projects.map((project, index) => (
                        <motion.div 
                            key={index} 
                            variants={itemVariants} 
                            style={!isMobile ? { height: "450px" } : {}}
                        >
                            <ProjectCard project={project} isMobile={isMobile} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}