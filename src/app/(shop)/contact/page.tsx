'use client';

import { useState } from 'react';
import Image from "next/image"
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { contactApi } from '@/lib/api/client';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import bg from "../../../images/bg.jpg"

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const contactCards = [
  {
    icon: Phone,
    title: 'Phone',
    lines: ['+91 77606 93333'],
    sub: 'Mon - Sat: 10:30 AM - 7:00 PM',
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['info@mattressfactory.in'],
    sub: 'We\'ll respond within 24 hours',
  },
  {
    icon: MapPin,
    title: 'Address',
    lines: ['Sulakshmi Enterprise','No. 29/2 (Old No. 1), Studio Road', 'J.B. Kaval, Near Rajkumar Samadhi', 'Munneshwara Block, Yeshwanthpur', 'Bangalore – 560058', 'Karnataka, India'],
    sub: 'Visit our showroom',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    lines: ['Mon - Sat: 09:00 AM - 8:00 PM'],
    sub: 'Sunday: 10:00 AM - 4:00 PM',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await contactApi.submit(formData);
      setSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to send message. Please try again later.');
      console.error('Error submitting contact form:', err);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = 'w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white';

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={bg} alt="contact background" fill className="object-cover" />
          <div className="absolute inset-0 bg-navy-700/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="bg-accent-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
              Contact
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
          >
            Get in{' '}
        Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-white max-w-2xl"
          >
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </motion.p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <StaggerItem key={card.title}>
                  <div className="bg-white rounded-2xl p-6 text-center card-hover border border-gray-100 h-full">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent-50 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-accent-500" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-700 mb-2">{card.title}</h3>
                    {card.lines.map((line, i) => (
                      <p key={i} className="text-gray-600 text-sm">{line}</p>
                    ))}
                    <p className="text-gray-400 text-xs mt-2">{card.sub}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact Form + Sidebar */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <AnimatedSection direction="right" className="lg:col-span-3">
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-navy-700">Send us a Message</h2>
                    <p className="text-gray-500 text-sm">We&apos;ll get back to you within 24 hours</p>
                  </div>
                </div>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-green-700 font-semibold text-sm">
                      Thank you! Your message has been sent successfully.
                    </p>
                  </div>
                )}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-700 font-semibold text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                      <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className={inputClasses} placeholder="John" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                      <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className={inputClasses} placeholder="Doe" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClasses} placeholder="john@example.com" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className={inputClasses} placeholder="+91 90000 00000" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                    <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required className={inputClasses}>
                      <option value="">Select a subject</option>
                      <option value="general-inquiry">General Inquiry</option>
                      <option value="product-question">Product Question</option>
                      <option value="order-issue">Order Issue</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className={inputClasses} placeholder="Tell us how we can help..." />
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? 'Sending...' : (
                      <>Send Message <Send className="w-4 h-4 ml-2" /></>
                    )}
                  </Button>
                </form>
              </div>
            </AnimatedSection>

            {/* Sidebar */}
            <AnimatedSection direction="left" delay={0.2} className="lg:col-span-2">
              <div className="space-y-6">
                {/* Map placeholder */}
                <div className="rounded-2xl overflow-hidden shadow-md aspect-video">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d18504.791105067987!2d77.527018!3d13.021601!3m2!1i1024!2i768!4f13.1!2m1!1sMattress%20Factory%20NO-1%2C%20STUDIO%20ROAD%2C%20J.B.KAVAL%2C%20near%20RAJKUMAR%20SAMADHI%2C%20Munneshwara%20Block%2C%20Yeswanthpur%2C%20Bengaluru%2C%20Karnataka%20560058!5e1!3m2!1sen!2sus!4v1773224375694!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>

                {/* FAQ Quick */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-lg font-bold text-navy-700 mb-4">Common Questions</h3>
                  <div className="space-y-3">
                    {[
                      { q: 'What is your return policy?', a: '100-night sleep trial on all mattresses.' },
                      { q: 'Do you offer free delivery?', a: 'Yes, on orders above Rs 5,000.' },
                      { q: 'What warranty do you provide?', a: '10-year warranty on premium mattresses.' },
                      { q: 'How can I track my order?', a: 'Track via order ID sent to your email.' },
                    ].map((faq, i) => (
                      <details key={i} className="group border-b border-gray-100 pb-3 last:border-0">
                        <summary className="font-medium text-sm text-gray-800 cursor-pointer flex items-center justify-between list-none">
                          {faq.q}
                          <svg className="w-4 h-4 text-accent-500 faq-arrow transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <p className="text-gray-600 text-sm mt-2">{faq.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
