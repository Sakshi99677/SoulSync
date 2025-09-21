import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, BookOpen, Coffee, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const moodSuggestions = {
  sad: {
    title: "Feeling down? Let's lift your spirits 🌈",
    suggestions: [
      { icon: Music, text: "Listen to uplifting music", color: "from-pink-500 to-red-500" },
      { icon: BookOpen, text: "Try journaling your thoughts", color: "from-blue-500 to-purple-500" },
      { icon: Coffee, text: "Make your favorite warm drink", color: "from-orange-500 to-red-500" }
    ]
  },
  anxious: {
    title: "Let's calm those nerves together 🌸",
    suggestions: [
      { icon: Sparkles, text: "Try 5-minute breathing exercise", color: "from-green-500 to-blue-500" },
      { icon: Music, text: "Play calming nature sounds", color: "from-blue-500 to-cyan-500" },
      { icon: Coffee, text: "Ground yourself with tea", color: "from-purple-500 to-pink-500" }
    ]
  },
  stressed: {
    title: "Time to decompress 🌿",
    suggestions: [
      { icon: Sparkles, text: "5-minute meditation", color: "from-green-500 to-emerald-500" },
      { icon: Music, text: "Lo-fi study beats", color: "from-purple-500 to-blue-500" },
      { icon: BookOpen, text: "Write down your worries", color: "from-orange-500 to-yellow-500" }
    ]
  },
  happy: {
    title: "Love the positive vibes! ✨",
    suggestions: [
      { icon: Music, text: "Dance to your favorite song", color: "from-yellow-500 to-orange-500" },
      { icon: BookOpen, text: "Write about what made you happy", color: "from-pink-500 to-purple-500" },
      { icon: Sparkles, text: "Share the joy with a friend", color: "from-blue-500 to-green-500" }
    ]
 