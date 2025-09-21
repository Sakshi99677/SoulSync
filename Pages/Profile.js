
import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Settings, User as UserIcon, Heart, Save, LogOut, LogIn } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState({
    supportStyle: "gentle",
    reminderTime: "20:00",
    dailyGoal: "",
    personalNote: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setIsLoading(true);
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      if (currentUser.preferences) {
        setPreferences(prev => ({ ...prev, ...currentUser.preferences }));
      }
    } catch (error) {
      console.error("User not logged in:", error);
      setUser(null);
    }
    setIsLoading(false);
  };

  const handleLogin = async () => {
    await User.login();
  };

  const handleLogout = async () => {
    await User.logout();
    setUser(null);
    // Reset preferences to default or clear them
    setPreferences({
      supportStyle: "gentle",
      reminderTime: "20:00",
      dailyGoal: "",
      personalNote: ""
    });
  };

  const savePreferences = async () => {
    setIsSaving(true);
    try {
      await User.updateMyUserData({ preferences });
      // You can add a success toast here
    } catch (error) {
      console.error("Error saving preferences:", error);
      // You can add an error toast here
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen flex items-center justify-center">
        <div className="animate-pulse w-full max-w-4xl mx-auto space-y-6">
          <div className="h-12 bg-white/50 rounded w-1/3"></div>
          <div className="h-40 bg-white/50 rounded-xl"></div>
          <div className="h-96 bg-white/50 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Card className="bg-white/70 backdrop-blur-sm border-none shadow-xl p-8">
            <UserIcon className="w-16 h-16 text-purple-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">View Your Profile</h2>
            <p className="text-gray-600 mb-8 max-w-sm mx-auto">
              Please sign in to view your profile, set preferences, and personalize your SoulSync experience.
            </p>
            <Button onClick={handleLogin} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl px-8 py-3">
              <LogIn className="w-5 h-5 mr-2" />
              Sign In / Sign Up
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Profile
            </h1>
            <p className="text-gray-600 mt-2">Personalize your mental health journey</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-gray-600 hover:text-gray-800 rounded-xl"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </motion.div>

        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl text-gray-800">{user?.full_name || "User"}</h2>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Member since</p>
                  <p className="font-medium">
                    {new Date(user?.created_date || Date.now()).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Account type</p>
                  <p className="font-medium capitalize">{user?.role || "User"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-600" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Support Style */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  How would you like Panda to support you?
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: "gentle", label: "Gentle & Calm", emoji: "🌸" },
                    { value: "encouraging", label: "Encouraging & Upbeat", emoji: "💪" },
                    { value: "direct", label: "Direct & Practical", emoji: "🎯" }
                  ].map((style) => (
                    <button
                      key={style.value}
                      onClick={() => setPreferences(prev => ({ ...prev, supportStyle: style.value }))}
                      className={`p-4 rounded-xl text-center transition-all duration-300 border-2 ${
                        preferences.supportStyle === style.value
                          ? 'border-purple-500 bg-purple-50 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <div className="text-2xl mb-2">{style.emoji}</div>
                      <div className="font-medium text-gray-800">{style.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Daily Goal */}
              <div>
                <Label htmlFor="dailyGoal" className="text-base font-semibold mb-3 block">
                  Daily mental health goal
                </Label>
                <Input
                  id="dailyGoal"
                  value={preferences.dailyGoal}
                  onChange={(e) => setPreferences(prev => ({ ...prev, dailyGoal: e.target.value }))}
                  placeholder="e.g., Practice gratitude, Take deep breaths, Connect with friends"
                  className="rounded-xl"
                />
              </div>

              {/* Personal Note */}
              <div>
                <Label htmlFor="personalNote" className="text-base font-semibold mb-3 block">
                  Personal reminder note
                </Label>
                <Textarea
                  id="personalNote"
                  value={preferences.personalNote}
                  onChange={(e) => setPreferences(prev => ({ ...prev, personalNote: e.target.value }))}
                  placeholder="Something encouraging to remind yourself..."
                  className="rounded-xl resize-none"
                  rows={3}
                />
              </div>

              {/* Reminder Time */}
              <div>
                <Label htmlFor="reminderTime" className="text-base font-semibold mb-3 block">
                  Daily check-in reminder time
                </Label>
                <Input
                  id="reminderTime"
                  type="time"
                  value={preferences.reminderTime}
                  onChange={(e) => setPreferences(prev => ({ ...prev, reminderTime: e.target.value }))}
                  className="rounded-xl w-48"
                />
              </div>

              <Button
                onClick={savePreferences}
                disabled={isSaving}
                className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Preferences"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Support Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-none shadow-lg">
            <CardContent className="p-8 text-center">
              <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">You're Doing Great! <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cdc2d00f398b3193135be0/83a1d6eab_image.png" alt="Panda" className="w-8 h-8"/>💜</h3>
              <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Remember that taking care of your mental health is a journey, not a destination. 
                Every small step counts, and you're not alone in this. SoulSync is here whenever you need support, 
                guidance, or just someone to listen.
              </p>
              <div className="mt-6 p-4 bg-white/50 rounded-xl">
                <p className="text-sm text-purple-700 font-medium">
                  "Your mental health matters. You matter. Take it one day at a time. 💜"
                </p>
              </div>
            </CardContent>
