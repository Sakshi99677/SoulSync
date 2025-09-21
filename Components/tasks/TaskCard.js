import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Clock, Brain, Zap, Sparkles, Users, TrendingUp, Target } from "lucide-react";
import { motion } from "framer-motion";

const categoryIcons = {
  mindfulness: Brain,
  physical: Zap,
  creative: Sparkles,
  social: Users,
  learning: TrendingUp,
  self_care: Target
};

const categoryColors = {
  mindfulness: "from-purple-500 to-indigo-500",
  physical: "from-green-500 to-emerald-500",
  creative: "from-pink-500 to-rose-500",
  social: "from-blue-500 to-cyan-500",
  learning: "from-orange-500 to-yellow-500",
  self_care: "from-teal-500 to-green-500"
};

const difficultyColors = {
  easy: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  hard: "bg-red-100 text-red-800 border-red-200"
};

export default function TaskCard({ task, index, onComplete }) {
  const CategoryIcon = categoryIcons[task.category] || Target;
  const categoryGradient = categoryColors[task.category] || "from-gray-500 to-gray-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Card className="h-full bg-white/80 backdrop-blur-sm border-none shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
        {/* AI Badge */}
        {task.ai_generated && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 right-4 z-10"
          >
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none shadow-md">
              <Brain className="w-3 h-3 mr-1" />
              AI Generated
            </Badge>
          </motion.div>
        )}

        {/* Gradient Background Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${categoryGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

        <CardContent className="p-6 relative z-10">
          {/* Category Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`w-12 h-12 bg-gradient-to-r ${categoryGradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
          >
            <CategoryIcon className="w-6 h-6 text-white" />
          </motion.div>

          {/* Task Title */}
          <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300 line-clamp-2">
            {task.title}
          </h3>

          {/* Task Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300 line-clamp-3">
            {task.description}
          </p>

          {/* Task Metadata */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge 
              variant="outline" 
              className={`${difficultyColors[task.difficulty]} border font-medium`}
            >
              {task.difficulty}
            </Badge>
            
            {task.duration_minutes && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Clock className="w-3 h-3 mr-1" />
                {task.duration_minutes}m
              </Badge>
            )}

            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 capitalize">
              {task.category.replace('_', ' ')}
            </Badge>
          </div>

          {/* Mood Targets */}
          {task.mood_target && task.mood_target.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Helps with:</p>
              <div className="flex flex-wrap gap-1">
                {task.mood_target.map((mood, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs bg-amber-50 text-amber-700 border-amber-200 capitalize"
                  >
                    {mood}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Complete Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => onComplete(task.id)}
              className={`w-full rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r ${categoryGradient} hover:shadow-lg transform hover:scale-105`}
            >
              <CheckSquare className="w-4 h-4 mr-2" />
              Complete Task
            </Button>
          </motion.div>

          {/* Progress Indicator */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Ready to start</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-2 h-2 rounded-full bg-gradient-to-r ${categoryGradient}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}