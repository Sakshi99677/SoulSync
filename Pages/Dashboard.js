import React, { useState, useEffect } from "react";
import { MoodEntry } from "@/entities/MoodEntry";
import { ChatMessage } from "@/entities/ChatMessage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Heart, MessageCircle, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import MoodLogger from "../components/dashboard/MoodLogger";

export default function DashboardPage() {
  const [moodEntries, setMoodEntries] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [showMoodLogger, setShowMoodLogger] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Assuming MoodEntry.list and ChatMessage.filter are configured to allow public access
      // or will return an empty list gracefully if no data is available for an unauthenticated user.
      const [moods, messages] = await Promise.all([
        MoodEntry.list('-created_date', 50),
        ChatMessage.filter({ sender: 'user' }, '-created_date', 20)
      ]);
      setMoodEntries(moods);
      setChatMessages(messages);
    } catch (error) {
      console.error("Error loading data:", error);
      // Continue with empty arrays if there's an error,
      // which is a graceful way to handle potential backend authentication requirements
      // that might prevent data fetching for public access.
      setMoodEntries([]);
      setChatMessages([]);
    }
    setLoading(false);
  };

  const getMoodStats = () => {
    const moodCounts = {};
    const last7Days = [];
    
    moodEntries.forEach(entry => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });

    // Get mood data for last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayMoods = moodEntries.filter(entry => 
        new Date(entry.created_date).toISOString().split('T')[0] === dateStr
      );
      
      const avgMood = dayMoods.length > 0 
        ? dayMoods.reduce((sum, entry) => sum + entry.intensity, 0) / dayMoods.length
        : 5; // Default to neutral if no moods for the day

      last7Days.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        mood: Math.round(avgMood * 10) / 10,
        count: dayMoods.length
      });
    }

    return { moodCounts, last7Days };
  };

  const { moodCounts, last7Days } = getMoodStats();

  const moodColors = {
    very_happy: '#10B981',
    happy: '#34D399', 
    neutral: '#6B7280',
    sad: '#F59E0B',
    very_sad: '#EF4444',
    anxious: '#8B5CF6',
    stressed: '#F97316',
    angry: '#DC2626',
    excited: '#06B6D4',
    tired: '#64748B'
  };

  const pieData = Object.entries(moodCounts).map(([mood, count]) => ({
    name: mood.replace('_', ' '),
    value: count,
    fill: moodColors[mood] || '#6B7280'
  }));

  const totalMoods = moodEntries.length;
  const averageIntensity = totalMoods > 0 
    ? (moodEntries.reduce((sum, entry) => sum + entry.intensity, 0) / totalMoods).toFixed(1)
    : 0;

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Mood Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Track your emotional journey and see your progress</p>
          </div>
          <Button
            onClick={() => setShowMoodLogger(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl"
          >
            <Heart className="w-4 h-4 mr-2" />
            Log Current Mood
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              title: "Total Mood Entries",
              value: totalMoods,
              icon: Heart,
              gradient: "from-purple-500 to-pink-500"
            },
            {
              title: "Average Intensity", 
              value: `${averageIntensity}/10`,
              icon: TrendingUp,
              gradient: "from-blue-500 to-cyan-500"
            },
            {
              title: "Chat Sessions",
              value: new Set(chatMessages.map(m => m.session_id)).size,
              icon: MessageCircle,
              gradient: "from-green-500 to-emerald-500"
            },
            {
              title: "Days Active",
              value: new Set(moodEntries.map(m => 
                new Date(m.created_date).toDateString()
              )).size,
              icon: Calendar,
              gradient: "from-orange-500 to-red-500"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mood Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Mood Intensity (Last 7 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={last7Days}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#666" />
                    <YAxis domain={[0, 10]} stroke="#666" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="mood" fill="url(#moodGradient)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mood Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-purple-600" />
                  Mood Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No mood data yet</p>
                      <p className="text-sm">Start logging your moods to see insights</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
            <CardHeader>
              <CardTitle>Recent Mood Entries</CardTitle>
            </CardHeader>
            <CardContent>
              {moodEntries.length > 0 ? (
                <div className="space-y-3">
                  {moodEntries.slice(0, 5).map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: moodColors[entry.mood] }}
                        />
                        <div>
                          <p className="font-medium capitalize">{entry.mood.replace('_', ' ')}</p>
                          <p className="text-sm text-gray-600">Intensity: {entry.intensity}/10</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(entry.created_date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No mood entries yet</p>
                  <Button
                    onClick={() => setShowMoodLogger(true)}
                    variant="outline"
                    className="mt-4"
                  >
                    Log your first mood
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Mood Logger Modal */}
        {showMoodLogger && (
          <MoodLogger
            onClose={() => setShowMoodLogger(false)}
            onSave={loadData}
          />
        )}
      </div>
    </div>
  );
}