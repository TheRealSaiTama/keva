 'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import StarryBackground from './StarryBackground';
import { useState, FormEvent } from 'react';
import { Toaster, toast } from 'sonner';

export default function Contact() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!firstName || !email || !message) {
      toast.error('Please fill out all required fields.');
      return;
    }

    setLoading(true);

    try {
      console.log('Submitting contact form...', { firstName, lastName, email, messageLength: message.length });
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          message,
        }),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      // Success!
      toast.success(data.message || 'Your message has been sent successfully!');
      
      // Clear the form
      setFirstName('');
      setLastName('');
      setEmail('');
      setMessage('');
      
    } catch (error) {
      console.error('Contact form submission error:', error);
      
      let errorMessage = 'Something went wrong. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <section className="py-16 sm:py-20 md:py-24 bg-black text-white relative overflow-hidden">
        <StarryBackground />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-block bg-purple-600/20 border border-purple-500/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm font-medium text-purple-300">Contact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Let's Build Something Amazing</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to transform your ideas into reality? Get in touch with our team of experts.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">First Name *</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-200 text-white placeholder-gray-400 text-sm sm:text-base min-h-[48px] touch-manipulation"
                      data-hoverable
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-200 text-white placeholder-gray-400 text-sm sm:text-base min-h-[48px] touch-manipulation"
                      data-hoverable
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-200 text-white placeholder-gray-400 text-sm sm:text-base min-h-[48px] touch-manipulation"
                    data-hoverable
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Details *</label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-200 resize-none text-white placeholder-gray-400 text-sm sm:text-base touch-manipulation"
                    placeholder="Tell us about your project..."
                    data-hoverable
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  data-hoverable
                  className="w-full bg-purple-600 text-white py-3 sm:py-4 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base min-h-[48px] touch-manipulation"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Get in Touch</h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6 sm:mb-8">
                  We're here to help you bring your vision to life. Whether you have a specific project in mind or just want to explore possibilities, we'd love to hear from you.
                </p>
              </div>
              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    icon: Mail,
                    title: "Email Us",
                    content: "hello@keva.agency",
                    subtitle: "We'll respond within 24 hours"
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    content: "+91 7065534964",
                    subtitle: "Mon-Fri 10AM-7PM IST"
                  },
                  {
                    icon: MapPin,
                    title: "Visit Us",
                    content: "Ghitorni, Delhi",
                    subtitle: "New Delhi, India 110030"
                  }
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-white/5 transition-all duration-300 touch-manipulation"
                    data-hoverable
                  >
                    <div className="p-2 sm:p-3 bg-purple-900/40 text-white rounded-lg border border-white/10 flex-shrink-0">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">{item.title}</h4>
                      <p className="text-purple-300 font-medium text-sm sm:text-base break-words">{item.content}</p>
                      <p className="text-xs sm:text-sm text-gray-400">{item.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}