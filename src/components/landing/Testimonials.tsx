"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/ui/card";
import Avatar from "boring-avatars";

const testimonials = [
  {
    quote:
      "Slug made sharing links for our campaign effortless — tracking and analytics are excellent.",
    name: "Alex Johnson",
    role: "Product Manager",
  },
  {
    quote:
      "Fast, reliable, and privacy-first. Perfect for our internal tools and public links.",
    name: "Priya Singh",
    role: "Engineering Lead",
  },
  {
    quote:
      "Integration was simple and the UX is delightful. Our team loves it.",
    name: "Marco Rossi",
    role: "Designer",
  },
  {
    quote:
      "The best link shortening tool I've used. It's simple, fast, and has great analytics.",
    name: "Ahmed Ali",
    role: "Software Engineer",
  },
  {
    quote:
      "I love how easy it is to use. It's perfect for my needs.",
    name: "María Gómez",
    role: "Marketing Manager",
  },
  {
    quote:
      "Reliable and lightweight — integrated it in minutes.",
    name: "Liu Wei",
    role: "CTO",
  }
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="container my-16 px-6">
      <div className="mx-auto max-w-4xl text-center">
        <h3 className="text-2xl font-semibold">What people say</h3>
        <p className="mt-2 text-muted-foreground">Real feedback from users.</p>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {testimonials.map((t) => (
          <motion.div key={t.name} variants={item} transition={{ duration: 0.6 }}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Avatar
                    size={40}
                    name={t.name}
                    variant="beam"
                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                  />
                  <div>
                    <CardTitle className="text-sm">{t.name}</CardTitle>
                    <CardDescription className="text-xs">{t.role}</CardDescription>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">"{t.quote}"</p>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}