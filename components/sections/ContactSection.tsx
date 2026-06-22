"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MessageSquare } from "lucide-react";
import { fadeUp } from "@/lib/animations";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const fields = [
    {
      key: "name" as const,
      label: "Name",
      placeholder: "Enter your name",
      icon: <User className="w-4 h-4" />,
      type: "text",
    },
    {
      key: "email" as const,
      label: "Email",
      placeholder: "Enter your email",
      icon: <Mail className="w-4 h-4" />,
      type: "email",
    },
    {
      key: "phone" as const,
      label: "Contact Number",
      placeholder: "321-654-879",
      icon: <Phone className="w-4 h-4" />,
      type: "tel",
    },
  ];

  return (
    <section id="contact" className="bg-[#000000] py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-white text-[48px] lg:text-[56px] font-medium tracking-tight mb-3"
          >
            Let&apos;s Work Together
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[#6b7280] text-[15px]"
          >
            Have a project in mind, a question, or just want to say hello?
            I&apos;d love to hear from you.
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-8 lg:p-12"
        >
          <form onSubmit={handleSubmit}>
            {/* Row 1: 3 inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              {fields.map(({ key, label, placeholder, icon, type }, i) => (
                <motion.div
                  key={key}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.08}
                >
                  <label
                    htmlFor={`field-${key}`}
                    className="text-white text-[13px] font-medium mb-2 block"
                  >
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      id={`field-${key}`}
                      type={type}
                      placeholder={placeholder}
                      value={formData[key]}
                      onChange={(e) =>
                        setFormData({ ...formData, [key]: e.target.value })
                      }
                      className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-[10px] px-4 py-3 text-[#b8b8b8] text-[14px] pr-10 focus:outline-none focus:border-[#c8f135] transition-colors placeholder:text-[#3a3a3a]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c8f135]">
                      {icon}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Textarea */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.25}
              className="mb-8"
            >
              <label
                htmlFor="field-message"
                className="text-white text-[13px] font-medium mb-2 block"
              >
                Message
              </label>
              <div className="relative">
                <textarea
                  id="field-message"
                  rows={6}
                  placeholder="Enter your message...."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-[10px] px-4 py-3 text-[#b8b8b8] text-[14px] resize-none focus:outline-none focus:border-[#c8f135] transition-colors placeholder:text-[#3a3a3a]"
                />
                <span className="absolute right-3 bottom-3 text-[#c8f135]">
                  <MessageSquare className="w-4 h-4" />
                </span>
              </div>
            </motion.div>

            {/* Submit */}
            <div>
              <div className="w-14 h-[2px] bg-[#c8f135] mb-3 rounded-full" />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03, backgroundColor: "#b8e020" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="bg-[#c8f135] text-black font-bold text-[15px] px-8 py-3 rounded-[10px] cursor-pointer"
              >
                {submitted ? "✓ Message Sent!" : "Submit"}
              </motion.button>
              <div className="w-14 h-[2px] bg-[#c8f135] mt-3 rounded-full" />
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
