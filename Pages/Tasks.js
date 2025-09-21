import React, { useState, useEffect } from "react";
import { Task } from "@/entities/Task";
import { MoodEntry } from "@/entities/MoodEntry";
import { User } from "@/entities/User";
import { InvokeLLM } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Clock, Brain, Sparkles, TrendingUp, Target, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "../components/tasks/TaskCard";
import PersonalizedRecommendations from "../components/tasks/PersonalizedRecommendations";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isGeneratingTasks, setIsGeneratingTasks] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [user, setUser] = useState(null);
  const [recentMoods, setRecentMoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { value: "all", label: "All Tasks", icon: Target, color: "from-gray-500 to-gray-600" },
    { value: "mindfulness", label: "Mindfulness", icon: Brain, color: "from-purple-500 to-indigo-500" },
    { value: "physical", label: "Physical", icon: Zap, color: "from-green-500 to-emerald-500" },
    { value: "creative", label: "Creative", icon: Sparkles, color: "from-pink-500 to-rose-500" },
    { value: "social", label: "Social", icon: CheckSquare, color: "from-blue-500 to-cyan-500" },
    { value: "learning", label: "Learning", icon: TrendingUp, color: "from-orange-500 to-yellow-500" },
    { value: "self_care", label: "Self Care", icon: Clock, color: "from-teal-500 to-green-500" }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Try to get user if signed in, but don't require it
      try {
        const userProfile = await User.me();
        setUser(userProfile);
      } catch (error) {
        setUser(null); // Not signed in, that's fine
      }

      const [allTasks, moods] = await Promise.all([
        Task.list('-created_date'),
        MoodEntry.list('-created_date', 10)
      ]);
      
      const completed = allTasks.filter(task => task.completed);
      const pending = allTasks.filter(task => !task.completed);
      
      setTasks(pending);
      setCompletedTasks(completed);
      setRecentMoods(moods);
    } catch (error) {
      console.error("Error loading data:", error);
      // Even if there's an error, continue with empty arrays
      setTasks([]);
      setCompletedTasks([]);
      setRecentMoods([]);
    }
    setIsLoading(false);
  };

  const generatePersonalizedTasks = async () => {
    setIsGeneratingTasks(true);
    
    try {
      const moodContext = recentMoods.length > 0 
        ? recentMoods.map(mood => `${mood.mood}: ${mood.intensity}/10`).join(', ')
        : 'No recent mood data';
      
      const userPreferences = user?.preferences || {};
      
      const prompt = `Generate 5 personalized mental health tasks for a Gen Z user in India based on:
      Recent moods: ${moodContext}
      Support style preference: ${userPreferences.supportStyle || 'gentle and supportive'}
      Daily goal: ${userPreferences.dailyGoal || 'general wellness and stress reduction'}
      
      Create tasks that are:
      - Specific and actionable
      - Culturally relevant for India
      - Varied in categories (mindfulness, physical, creative, social, learning, self_care)
      - 5-60 minutes duration
      - Include difficulty levels (easy, medium, hard)
      - Suitable for students and working professionals
      
      Return a JSON array with this structure for each task:
      {
        "title": "string",
        "description": "string", 
        "category": "mindfulness|physical|creative|social|learning|self_care",
        "difficulty": "easy|medium|hard",
        "duration_minutes": number,
        "mood_target": ["mood1", "mood2"],
        "ai_generated": true
      }`;

      const response = await InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            tasks: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  category: { type: "string" },
                  difficulty: { type: "string" },
                  duration_minutes: { type: "number" },
                  mood_target: { type: "array", items: { type: "string" } },
                  ai_generated: { type: "boolean" }
                }
              }
            }
          }
        }
      });

      if (response.tasks) {
        const createdTasks = [];
        for (const taskData of response.tasks) {
          const newTask = await Task.create(taskData);
          createdTasks.push(newTask);
        }
        setTasks(prev => [...createdTasks, ...prev]);
      }
    } catch (error) {
      console.error("Error generating tasks:", error);
    }
    
    setIsGeneratingTasks(false);
  };

  const handleTaskComplete = async (taskId) => {
    try {
      await Task.update(taskId, { completed: true });
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        setTasks(prev => prev.filter(t => t.id !== taskId));
        setCompletedTasks(prev => [...prev, { ...task, completed: true }]);
      }
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const filteredTasks = selectedCategory === "all" 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);

  const getStreakCount = () => {
    const today = new Date().toDateString();
    const todayTasks = completedTasks.filter(task => 
      new Date(task.updated_date).toDateString() === today
    );
    return todayTasks.length;
  };
  
  if (isLoading) {
     return (
      <div className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen flex items-center justify-center">
        <div className="animate-pulse w-full max-w-7xl mx-auto space-y-6">
          <div className="h-16 bg-white/50 rounded w-1/3 mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="h-28 bg-white/50 rounded-2xl"></div>
            <div className="h-28 bg-white/50 rounded-2xl"></div>
            <div className="h-28 bg-white/50 rounded-2xl"></div>
            <div className="h-28 bg-white/50 rounded-2xl"></div>
          </div>
          <div className="h-64 bg-white/50 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex justify-center mb-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl"
            >
              <CheckSquare className="w-8 h-8 text-white" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Your Growth Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            AI-powered personalized tasks designed to boost your mental wellness, build resilience, and help you thrive.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Today's Streak", value: getStreakCount(), icon: "🔥" },
              { label: "Total Completed", value: completedTasks.length, icon: "✅" },
              { label: "Active Tasks", value: tasks.length, icon: "📝" },
              { label: "Growth Score", value: Math.min(100, completedTasks.length * 5), icon: "🌱" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Task Generation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-none shadow-xl">
            <CardContent className="p-8 text-center">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <Brain className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Get AI-Powered Personalized Tasks
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our AI analyzes your recent moods, preferences, and progress to create tasks perfectly tailored to your mental wellness journey.
              </p>
              <Button
                onClick={generatePersonalizedTasks}
                disabled={isGeneratingTasks}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isGeneratingTasks ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                    />
                    Generating Your Tasks...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-3" />
                    Generate Personalized Tasks
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {categories.map((category) => (
            <motion.button
