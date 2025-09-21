
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Heart, Shield, Sparkles, ArrowRight, Brain, Users, MapPin, BookOpen, CheckSquare, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const features = [
    {
      icon: MessageCircle,
      title: "AI-Powered Companion",
      description: "Chat with Panda, our advanced AI that understands Gen Z and provides personalized mental health support 24/7",
      gradient: "from-purple-500 to-pink-500",
      link: createPageUrl("Chat")
    },
    {
      icon: CheckSquare,
      title: "Personalized Growth Tasks",
      description: "Get AI-recommended activities and learning paths tailored to your mood and mental health goals",
      gradient: "from-green-500 to-teal-500",
      link: createPageUrl("Tasks")
    },
    {
      icon: BarChart3,
      title: "Mood Intelligence",
      description: "Track your emotional patterns with advanced analytics and get insights into your mental wellness journey",
      gradient: "from-blue-500 to-cyan-500",
      link: createPageUrl("Dashboard")
    },
    {
      icon: MapPin,
      title: "Find Local Therapists",
      description: "Discover qualified mental health professionals near you with our interactive map and verified reviews",
      gradient: "from-emerald-500 to-green-500",
      link: createPageUrl("Therapists")
    },
    {
      icon: BookOpen,
      title: "Wellness Knowledge Hub",
      description: "Access curated articles, research, and stories about mental health written for Gen Z",
      gradient: "from-orange-500 to-red-500",
      link: createPageUrl("Blog")
    },
    {
      icon: Shield,
      title: "Privacy-First Approach",
      description: "Your conversations and data are encrypted and private. We prioritize your safety above everything",
      gradient: "from-indigo-500 to-purple-500",
      link: createPageUrl("Resources")
    }
  ];

  const stats = [
    { number: "50K+", label: "Gen Z Users Helped", icon: "👥" },
    { number: "95%", label: "Report Feeling Better", icon: "💜" },
    { number: "24/7", label: "AI Companion Availability", icon: "🐼" },
    { number: "1000+", label: "Verified Therapists", icon: "🏥" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section with Enhanced Animations */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-purple-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-32 w-24 h-24 bg-pink-200/40 rounded-full blur-2xl animate-bounce" />
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-indigo-200/20 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="inline-flex items-center gap-4 mb-8"
              >
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cdc2d00f398b3193135be0/83a1d6eab_image.png" alt="SoulSync Logo" className="w-20 h-20 rounded-full" />
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
                <div className="text-left">
                  <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    SoulSync
                  </h1>
                  <p className="text-lg text-indigo-600 font-medium">AI Mental Wellness Platform</p>
                </div>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-2xl md:text-4xl text-gray-800 mb-6 font-semibold max-w-4xl mx-auto leading-tight"
              >
                Where AI meets empathy to sync your soul with 
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> mental wellness</span> and 
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> emotional balance</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
              >
                Meet Panda, your AI companion who understands Gen Z's unique challenges. Get personalized support, 
                mood-adaptive music recommendations, creative activities, and professional mental health care—all in one platform.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link to={createPageUrl("Chat")}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-3xl transform transition-all duration-300 flex items-center">
                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cdc2d00f398b3193135be0/83a1d6eab_image.png" alt="Panda" className="w-8 h-8 mr-3"/>
                    Chat with Panda Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </Link>
              
              <Link to={createPageUrl("Therapists")}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="px-8 py-6 rounded-2xl text-lg font-semibold border-2 border-purple-300 hover:bg-purple-50 transition-all duration-300">
                    <MapPin className="w-6 h-6 mr-3" />
                    Find Local Therapists
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Grid with Enhanced Styling */}
      <div className="py-24 px-6 bg-gradient-to-b from-white/50 to-indigo-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Everything Gen Z Needs for Mental Wellness
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive platform with Panda as your AI companion, understanding your generation's unique challenges
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Link to={feature.link}>
                  <Card className="h-full bg-white/80 backdrop-blur-sm border-none shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:bg-white/90 overflow-hidden relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    <CardContent className="p-8 relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {feature.description}
                      </p>
                      <motion.div
                        className="mt-4 flex items-center text-purple-600 font-medium"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                      >
                        Learn more <ArrowRight className="w-4 h-4 ml-1" />
                      </motion.div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section with Enhanced Design */}
      <div className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl" />
            <div className="absolute inset-0 bg-black/10 rounded-3xl" />
            <div className="relative z-10 text-center p-12 text-white">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="mb-6 flex justify-center items-center gap-4 text-5xl"
              >
                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cdc2d00f398b3193135be0/83a1d6eab_image.png" alt="Panda" className="w-16 h-16"/>
                <span>💜</span>
                <span>🌱</span>
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Sync Your Soul with Wellness?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
                Join thousands of Gen Z users who've found their path to better mental health through Panda's AI-powered support and professional care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={createPageUrl("Chat")}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-3xl transform transition-all duration-300 flex items-center">
                       <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cdc2d00f398b3193135be0/83a1d6eab_image.png" alt="Panda" className="w-8 h-8 mr-3"/>
                      Chat with Panda Now
                    </Button>
                  </motion.div>
                </Link>
                <Link to={createPageUrl("Tasks")}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300">
                      <CheckSquare className="w-6 h-6 mr-3" />
                      Explore Growth Tasks
                    </Button>
                  </motion.div>
                </Link>
              </div>
              <p className="text-sm mt-6 opacity-75">
                Free, private, and designed specifically for Gen Z mental wellness
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
