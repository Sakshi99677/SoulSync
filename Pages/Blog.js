
import React, { useState, useEffect, useCallback } from "react";
import { BlogPost } from "@/entities/BlogPost";
import { InvokeLLM } from "@/integrations/Core"; // Note: InvokeLLM is imported but not used in this file.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Clock, User, Tag, Search, TrendingUp, Heart, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // Note: Link is imported but not used in this file.
import { createPageUrl } from "@/utils"; // Note: createPageUrl is imported but not used in this file.

const categories = [
  { value: "all", label: "All Posts", color: "from-gray-500 to-gray-600" },
  { value: "mental_health", label: "Mental Health", color: "from-purple-500 to-indigo-500" },
  { value: "wellness", label: "Wellness", color: "from-green-500 to-emerald-500" },
  { value: "lifestyle", label: "Lifestyle", color: "from-pink-500 to-rose-500" },
  { value: "research", label: "Research", color: "from-blue-500 to-cyan-500" },
  { value: "stories", label: "Stories", color: "from-orange-500 to-red-500" },
  { value: "tips", label: "Tips", color: "from-teal-500 to-green-500" }
];

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [featuredPost, setFeaturedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize generateSamplePosts to ensure stability if used in hooks, though not strictly necessary here.
  // This function doesn't depend on any state/props, so useCallback without dependencies is fine.
  const generateSamplePosts = useCallback(async () => {
    const samplePosts = [
      {
        title: "Understanding Gen Z's Mental Health Crisis: What You Need to Know",
        slug: "gen-z-mental-health-crisis",
        excerpt: "Dive deep into the unique mental health challenges facing Gen Z and discover evidence-based strategies for building resilience in an increasingly connected yet isolating world.",
        content: `# Understanding Gen Z's Mental Health Crisis

Gen Z faces unprecedented mental health challenges. Born between 1997 and 2012, this generation has grown up with social media, experienced global uncertainty, and faces unique stressors that previous generations never encountered.

## The Statistics
- 70% of Gen Z report anxiety as a major concern
- Depression rates have increased by 40% since 2010
- Social media usage correlates with increased mental health issues

## What's Different?
Unlike previous generations, Gen Z has:
- Constant connectivity and digital overwhelm
- Increased academic and career pressure
- Climate anxiety and global uncertainty
- Earlier exposure to traumatic news and events

## Building Resilience
Research shows that Gen Z can build resilience through:
1. Digital detox practices
2. Mindfulness and meditation
3. Strong social connections
4. Professional support when needed
5. Creative expression and hobbies

## The Path Forward
Understanding these challenges is the first step toward addressing them. With the right tools, support, and awareness, Gen Z can not only overcome these obstacles but thrive despite them.`,
        author: "Dr. Sarah Mitchell",
        featured_image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800",
        tags: ["mental health", "gen z", "research", "anxiety", "depression"],
        category: "mental_health",
        reading_time: 8,
        published: true
      },
      {
        title: "5 Science-Backed Strategies to Beat Social Media Anxiety",
        slug: "beat-social-media-anxiety",
        excerpt: "Learn how to maintain a healthy relationship with social media while protecting your mental health with these research-proven techniques.",
        content: `# 5 Science-Backed Strategies to Beat Social Media Anxiety

Social media can be a double-edged sword for mental health. Here are proven strategies to help you use it mindfully.

## 1. Set Intentional Time Boundaries
Research shows that limiting social media to 30 minutes per day can significantly reduce anxiety and depression symptoms.

## 2. Curate Your Feed Mindfully
Unfollow accounts that make you feel bad about yourself. Follow accounts that inspire, educate, or bring joy.

## 3. Practice the 3-2-1 Rule
- 3 hours before bed: No work
- 2 hours before bed: No food
- 1 hour before bed: No screens

## 4. Use Positive Engagement
Instead of passive scrolling, actively engage with content that matters to you. Comment meaningfully, share helpful resources.

## 5. Regular Digital Detoxes
Take regular breaks from social media. Even a 24-hour break can help reset your relationship with technology.

Remember: You control your social media experience. Make it work for your mental health, not against it.`,
        author: "Marcus Thompson",
        featured_image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800",
        tags: ["social media", "anxiety", "digital wellness", "tips"],
        category: "tips",
        reading_time: 5,
        published: true
      },
      {
        title: "The Power of Micro-Meditation: 2-Minute Practices for Busy Lives",
        slug: "micro-meditation-busy-lives", 
        excerpt: "Discover how short meditation practices can fit into your hectic schedule and provide immediate stress relief and mental clarity.",
        content: `# The Power of Micro-Meditation: 2-Minute Practices for Busy Lives

You don't need hours to meditate. These micro-practices can fit into any schedule and provide immediate benefits.

## What is Micro-Meditation?
Micro-meditation involves short, focused mindfulness practices lasting 1-5 minutes. Research shows these brief sessions can:
- Reduce cortisol levels
- Improve focus and concentration
- Lower blood pressure
- Increase emotional regulation

## 5 Quick Techniques

### 1. The 4-7-8 Breath (2 minutes)
- Inhale for 4 counts
- Hold for 7 counts  
- Exhale for 8 counts
- Repeat 4 times

### 2. Body Scan Express (3 minutes)
Quickly scan from head to toe, noticing tension and releasing it.

### 3. Gratitude Moment (1 minute)
Think of three things you're grateful for right now.

### 4. Mindful Sip (2 minutes)
Drink tea or coffee mindfully, focusing on taste, temperature, and aroma.

### 5. Walking Meditation (5 minutes)
Walk slowly, focusing on each step and your surroundings.

## Make it Habit
- Link micro-meditations to existing habits
- Set phone reminders
- Start with just one technique
- Be consistent, not perfect

Small moments of mindfulness throughout your day can create significant positive changes in your mental health.`,
        author: "Dr. Emily Chen",
        featured_image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        tags: ["meditation", "mindfulness", "stress relief", "wellness"],
        category: "wellness",
        reading_time: 4,
        published: true
      }
    ];

    for (const postData of samplePosts) {
      await BlogPost.create(postData);
    }
  }, []); // No dependencies as it doesn't use props or state directly

  // Memoize loadPosts to prevent unnecessary re-creations and potential issues with useEffect
  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      let existingPosts = await BlogPost.list('-created_date');
      
      if (existingPosts.length === 0) {
        await generateSamplePosts(); // generateSamplePosts is a stable reference due to useCallback
        existingPosts = await BlogPost.list('-created_date');
      }
      
      setPosts(existingPosts);
      setFeaturedPost(existingPosts[0]);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
    setIsLoading(false);
  }, [generateSamplePosts]); // Depends on generateSamplePosts which is memoized

  // Memoize filterPosts to ensure a stable function reference for useEffect dependencies
  const filterPosts = useCallback(() => {
    let filtered = [...posts];

    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
  }, [posts, searchQuery, selectedCategory]); // Dependencies for filterPosts itself

  // Initial data load effect
  useEffect(() => {
    loadPosts();
  }, [loadPosts]); // loadPosts is a stable reference due to useCallback

  // Effect for filtering posts based on search query or category changes
  useEffect(() => {
    filterPosts();
  }, [filterPosts]); // filterPosts is a stable reference due to useCallback

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex justify-center mb-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl"
            >
              <BookOpen className="w-8 h-8 text-white" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Wellness Knowledge Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Evidence-based articles, stories, and insights about mental health written specifically for Gen Z. 
            Stay informed, stay empowered.
          </p>
        </motion.div>

        {/* Search and Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50"
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search articles, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl border-orange-200 focus:border-orange-400 bg-white/90"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.value}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium transition-all duration-300 ${
                  selectedCategory === category.value
                    ? 'bg-white shadow-lg text-gray-800 border-2 border-orange-300'
                    : 'bg-white/60 text-gray-600 hover:bg-white/80 hover:shadow-md'
                }`}
              >
                <div className={`w-4 h-4 bg-gradient-to-r ${category.color} rounded-full`} />
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-r from-orange-100 to-red-100 border-none shadow-2xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredPost.featured_image}
