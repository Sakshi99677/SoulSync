import React, { useState } from "react";
import { MoodEntry } from "@/entities/MoodEntry";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const moods = [
  { value: "very_happy", emoji: "😄", label: "Very Happy", color: "bg-green-500" },
  { value: "happy", emoji: "😊", label: "Happy", color: "bg-green-400" },
  { value: "excited", emoji: "🤩", label: "Excited", color: "bg-yellow-400" },
  { value: "neutral", emoji: "😐", label: "Neutral", color: "bg-gray-400" },
  { value: "anxious", emoji: "😰", label: "Anxious", color: "bg-purple-500" },
  { value: "stressed", emoji: "😫", label: "Stressed", color: "bg-orange-500" },
  { value: "sad", emoji: "😢", label: "Sad", color: "bg-blue-500" },
  { value: "very_sad", emoji: "😭", label: "Very Sad", color: "bg-blue-600" },
  { value: "angry", emoji: "😠", label: "Angry", color: "bg-red-500" },
  { value: "tired", emoji: "😴", label: "Tired", color: "bg-gray-500" }
];

const triggers = [
  { value: "work", label: "Work", emoji: "💼" },
  { value: "studies", label: "Studies", emoji: "📚" },
  { value: "relationships", label: "Relationships", emoji: "💕" },
  { value: "family", label: "Family", emoji: "👨‍👩‍👧" },
  { value: "health", label: "Health", emoji: "🏥" },
  { value: "finances", label: "Finances", emoji: "💰" },
  { value: "social_media", label: "Social Media", emoji: "📱" },
  { value: "other", label: "Other", emoji: "❓" }
];

export default function MoodLogger({ onClose, onSave }) {
  const [selectedMood, setSelectedMood] = useState("");
  const [intensity, setIntensity] = useState([5]);
 