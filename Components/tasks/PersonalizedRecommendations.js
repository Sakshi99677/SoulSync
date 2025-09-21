import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Heart, Brain } from "lucide-react";
import { motion } from "framer-motion";

export default function PersonalizedRecommendations({ moods }) {
  const getRecommendationBasedOnMood = () => {
    const recentMood = moods[0]?.mood;
    const avgIntensity = moods.reduce((sum, mood) => sum + mood.intensity, 0) / moods.length;

    const recommendations = {
      sad: {
        focus: "Gentle mood lifting activities",
        color: "from-blue-500 to-cyan-500",
        activities: ["Creative expression", "Gentle movement", "Connection with others"]
      },
      anxious: {
        focus: "Calming and grounding practices",
        color: "from-purple-500 to-indigo-500", 
        activities: ["Mindfulness meditation", "Breathing exercises", "Progressive relaxation"]
      },
      stressed: {
        focus: "Stress reduction and relaxation",
        color: "from-orange-500 to-red-500",
        activities: ["Time management", "Physical exercise", "Mindful breaks"]
      },
      happy: {
        focus: "Maintaining positive momentum",
        color: "from-green-500 to-emerald-500",
        activities: ["Gratitude practice", "Social connection", "Creative pursuits"]
      },
      neutral: {
        focus: "General wellness building",
        color: "from-gray-500 to-gray-600",
        activities: ["Habit building", "Learning new skills", "Self-care routines"]
      }
    };

    return recommendations[recentMood] || recommendations.neutral;
  };

  const recommendation = getRecommendationBasedOnMood();
  const avgIntensity = moods.reduce((sum, mood) => sum + mood.intensity, 0) / moods.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-none shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className={`w-8 h-8 bg-gradient-to-r ${recommendation.color} rounded-lg flex items-center justify-center`}
            >
              <Brain className="w-4 h-4 text-white" />
            </motion.div>
            AI Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span className="text-sm text-gray-600">Recent Mood Trend:</span>
              <Badge 
                variant="outline" 
                className={`bg-gradient-to-r ${recommendation.color} bg-opacity-10 border-indigo-200 text-indigo-800 capitalize`}
              >
                {moods[0]?.mood}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-600" />
              <span className="text-sm text-gray-600">Average Intensity:</span>
              <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                {avgIntensity.toFixed(1)}/10
              </Badge>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">
              Recommended Focus: {recommendation.focus}
            </h4>
            <div className="flex flex-wrap gap-2">
              {recommendation.activities.map((activity, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 bg-white/70 rounded-full text-sm text-gray-700 border border-indigo-200"
                >
                  {activity}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white/50 rounded-lg p-4 border border-indigo-200">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>💡 Pro Tip:</strong> Based on your recent mood patterns, focusing on {recommendation.focus.toLowerCase()} 
              can help you build resilience and maintain better emotional balance. The AI will prioritize tasks 
              in these areas for your personalized recommendations.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}