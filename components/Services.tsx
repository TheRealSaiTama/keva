'use client';

import StarryBackground from './StarryBackground';
import { Monitor, Smartphone, Cloud, Database, Palette, Shield } from 'lucide-react';

const services = [
  {
    icon: Monitor,
    title: 'Web Development',
    description: 'Modern, responsive websites built with cutting-edge technologies',
    features: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'Performance Optimized']
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications',
    features: ['React Native', 'iOS & Android', 'App Store Deployment', 'Push Notifications']
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and deployment',
    features: ['AWS & Vercel', 'Auto Scaling', 'CDN Integration', '99.9% Uptime']
  },
  {
    icon: Database,
    title: 'Backend Systems',
    description: 'Robust APIs and database architecture',
    features: ['Node.js & Python', 'PostgreSQL & MongoDB', 'RESTful APIs', 'Microservices']
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive user interfaces and experiences',
    features: ['Figma Design', 'User Research', 'Prototyping', 'Design Systems']
  },
  {
    icon: Shield,
    title: 'Security & Testing',
    description: 'Comprehensive security audits and quality assurance',
    features: ['Security Audits', 'Automated Testing', 'Code Reviews', 'Performance Testing']
  }
];

export default function Services() {
  return (
    <section className="relative bg-black text-white py-24 overflow-hidden">
      <div className="absolute inset-0">
        <StarryBackground />
      </div>
      <div className="relative container mx-auto px-6">
        <div className="inline-block bg-purple-600/20 border border-purple-500/30 rounded-full px-4 py-2 backdrop-blur-sm mb-6">
          <span className="text-sm font-medium text-purple-300">Our Services</span>
        </div>
        <h2 className="text-5xl font-bold mb-12">Solutions That Drive Results</h2>
        <div className="overflow-x-auto pb-4 sm:pb-8">
          <div className="flex gap-8 sm:gap-12 lg:gap-16 w-max">
            {services.map((service) => {
              const Icon = service.icon;
                return (
                <div key={service.title} className="service-card w-80 md:w-96 flex-shrink-0">
                  <div>
                    <Icon className="w-10 h-10 text-purple-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                        <p className="text-gray-400 text-base mb-6">{service.description}</p>
                      </div>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                          <li key={feature} className="text-sm text-gray-300 flex items-center">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </section>
  );
}