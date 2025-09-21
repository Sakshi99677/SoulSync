
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { MessageCircle, BarChart3, BookOpen, User, Heart, Menu, X, MapPin, CheckSquare, Newspaper, Brain, Sparkles, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { motion, AnimatePresence } from "framer-motion";

const navigationItems = [
  {
    title: "Home",
    url: createPageUrl("Home"),
    icon: Home,
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    title: "AI Companion",
    url: createPageUrl("Chat"),
    icon: MessageCircle,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Growth Tasks",
    url: createPageUrl("Tasks"),
    icon: CheckSquare,
    gradient: "from-green-500 to-teal-500"
  },
  {
    title: "Mood Insights",
    url: createPageUrl("Dashboard"),
    icon: BarChart3,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Find Therapists",
    url: createPageUrl("Therapists"),
    icon: MapPin,
    gradient: "from-emerald-500 to-green-500"
  },
  {
    title: "Wellness Blog",
    url: createPageUrl("Blog"),
    icon: Newspaper,
    gradient: "from-orange-500 to-red-500"
  },
  {
    title: "Resources",
    url: createPageUrl("Resources"),
    icon: BookOpen,
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    title: "Profile",
    url: createPageUrl("Profile"),
    icon: User,
    gradient: "from-pink-500 to-rose-500"
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <Sidebar className="border-r border-white/30 backdrop-blur-lg bg-white/20">
          <SidebarHeader className="border-b border-white/20 p-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cdc2d00f398b3193135be0/83a1d6eab_image.png" alt="SoulSync Logo" className="w-11 h-11 rounded-full" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-gray-800 text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  SoulSync
                </h2>
                <p className="text-xs text-gray-600">AI Mental Wellness Platform</p>
              </div>
            </motion.div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {navigationItems.map((item, index) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`group relative overflow-hidden rounded-2xl p-4 transition-all duration-500 border-2 hover:scale-105 hover:shadow-xl ${
                          location.pathname === item.url 
                            ? 'border-purple-300 bg-white/80 shadow-lg backdrop-blur-sm' 
                            : 'border-transparent hover:border-white/30 hover:bg-white/40'
                        }`}
                      >
                        <Link to={item.url}>
                          <motion.div 
                            className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                            whileHover={{ scale: 1.1 }}
                          />
                          <div className="flex items-center gap-3 relative z-10">
                            <motion.div 
                              className={`p-2 rounded-xl bg-gradient-to-r ${item.gradient} shadow-lg`}
                              whileHover={{ rotate: 5, scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <item.icon className="w-4 h-4 text-white" />
                            </motion.div>
                            <span className="font-semibold text-gray-700 group-hover:text-gray-900">
                              {item.title}
                            </span>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="mt-6 p-4 bg-gradient-to-br from-purple-100/80 to-pink-100/80 rounded-2xl backdrop-blur-sm border border-white/30">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold text-purple-800 text-sm">Daily Reminder</span>
                </div>
                <p className="text-xs text-purple-700 leading-relaxed">
                  Your mental health journey is unique. Every step forward, no matter how small, is progress. 💜
                </p>
              </motion.div>
            </div>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          {/* Enhanced Header */}
          <motion.header 
            className={`sticky top-0 z-40 transition-all duration-300 ${
              isScrolled 
                ? 'bg-white/95 backdrop-blur-md border-b border-white/50 shadow-lg' 
                : 'bg-white/60 backdrop-blur-sm border-b border-white/30'
            } px-6 py-4`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden hover:bg-purple-100 p-2 rounded-lg transition-colors duration-200" />
                <div className="hidden md:flex items-center gap-2">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center"
                  >
                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cdc2d00f398b3193135be0/83a1d6eab_image.png" alt="SoulSync Logo" className="w-7 h-7 rounded-full" />
                  </motion.div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    SoulSync
                  </h1>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-purple-700">AI Companion Online</span>
                </motion.div>
                
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <Heart className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>

          {/* Enhanced Footer */}
          <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 mb-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl flex items-center justify-center">
                      <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cdc2d00f398b3193135be0/83a1d6eab_image.png" alt="SoulSync Logo" className="w-11 h-11 rounded-full" />
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl">SoulSync</h3>
                      <p className="text-sm text-purple-200">Syncing minds to wellness</p>
                    </div>
                  </motion.div>
                  <p className="text-purple-200 leading-relaxed mb-4 max-w-md">
                    Empowering Gen Z with AI-driven mental health support, personalized wellness journeys, and professional care connections. Your mental health matters, and you're never alone.
                  </p>
                  <div className="flex gap-4">
                    {['💜', '🌱', '✨'].map((emoji, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-lg cursor-pointer"
                      >
                        {emoji}
                      </motion.div>
                    ))}
                     <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-lg cursor-pointer"
                      >
                        <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cdc2d00f398b3193135be0/83a1d6eab_image.png" alt="Panda" className="w-8 h-8"/>
                      </motion.div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-purple-200">Platform</h4>
                  <ul className="space-y-2">
                    {['AI Companion', 'Mood Tracking', 'Find Therapists', 'Wellness Blog'].map((item) => (
                      <motion.li 
                        key={item}
                        whileHover={{ x: 5 }}
                        className="text-sm text-purple-300 hover:text-white cursor-pointer transition-colors duration-200"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-purple-200">Support</h4>
                  <ul className="space-y-2">
                    {['Crisis Resources', 'Privacy Policy', 'Terms of Service', 'Contact Us'].map((item) => (
                      <motion.li 
                        key={item}
                        whileHover={{ x: 5 }}
                        className="text-sm text-purple-300 hover:text-white cursor-pointer transition-colors duration-200"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-purple-700/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-purple-300">
                  © 2024 SoulSync. Made with 💜 for Gen Z mental wellness.
                </p>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <span className="text-xs text-purple-400">Crisis Hotline:</span>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="tel:9999666555"
                    className="text-sm font-bold text-white bg-red-500 px-3 py-1 rounded-full hover:bg-red-600 transition-colors duration-200"
                  >
                    9999 666 555
                  </motion.a>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </SidebarProvider>
  );
}
