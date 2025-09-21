
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Globe, BookOpen, Music, Heart, Users, Brain } from "lucide-react";
import { motion } from "framer-motion";

const crisisResources = [
  {
    name: "Vandrevala Foundation",
    contact: "9999 666 555",
    description: "24/7 crisis support for anyone in distress.",
    icon: Phone,
    urgent: true
  },
  {
    name: "iCALL Psychosocial Helpline",
    contact: "9152987821",
    description: "Mon-Sat, 10 AM - 8 PM. Professional counseling.",
    icon: Phone,
    urgent: false
  },
  {
    name: "AASRA",
    contact: "9820466726",
    description: "24/7 helpline for emotional distress and suicide prevention.",
    icon: MessageCircle,
    urgent: true
  },
  {
    name: "Snehi Helpline",
    contact: "9311911935",
    description: "Delhi-based 24/7 emotional support helpline.",
    icon: Phone,
    urgent: true
  }
];

const selfCareActivities = [
  {
    title: "Mindful Breathing",
    description: "5-minute breathing exercises to reduce anxiety",
    icon: Brain,
    gradient: "from-blue-500 to-cyan-500",
    activities: [
      "Box breathing: 4-4-4-4 count",
      "Deep belly breathing",
      "4-7-8 breathing technique",
      "Mindful breathing meditation"
    ]
  },
  {
    title: "Creative Expression",
    description: "Channel emotions through creativity",
    icon: Music,
    gradient: "from-purple-500 to-pink-500",
    activities: [
      "Write in a journal",
      "Draw or sketch your feelings",
      "Listen to mood-matching music",
      "Create a mood playlist"
    ]
  },
  {
    title: "Physical Wellness",
    description: "Move your body to boost mood",
    icon: Heart,
    gradient: "from-green-500 to-emerald-500",
    activities: [
      "Take a 10-minute walk",
      "Do simple stretches",
      "Dance to your favorite song",
      "Try gentle yoga"
    ]
  },
  {
    title: "Social Connection",
    description: "Reach out and connect with others",
    icon: Users,
    gradient: "from-orange-500 to-red-500",
    activities: [
      "Text a friend how you're feeling",
      "Join online support communities",
      "Call someone who cares",
      "Share with a trusted person"
    ]
  }
];

const mentalHealthApps = [
  {
    name: "Evolve",
    description: "Mental health app for LGBTQ+ community",
    url: "https://www.evolveinc.io/"
  },
  {
    name: "Wysa",
    description: "AI chatbot for mental wellness",
    url: "https://www.wysa.io/"
  },
  {
    name: "YourDOST",
    description: "Online counseling platform",
    url: "https://yourdost.com/"
  },
  {
    name: "Amaha",
    description: "Comprehensive mental health support",
    url: "https://www.amahahealth.com/"
  }
];

export default function ResourcesPage() {
  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Mental Health Resources
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            You're not alone in this journey. Panda and SoulSync connect you with professional resources and self-care tools to support your mental health.
          </p>
        </motion.div>

        {/* Crisis Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-red-700 text-xl flex items-center gap-2">
                <Phone className="w-6 h-6" />
                Crisis Support Helplines (India)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-600 font-semibold mb-4">
                If you're in immediate danger or having thoughts of self-harm, please reach out now. Panda cares about you, but professional help is what you need right now:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {crisisResources.map((resource, index) => (
                  <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${resource.urgent ? 'bg-red-100' : 'bg-blue-100'}`}>
                        <resource.icon className={`w-5 h-5 ${resource.urgent ? 'text-red-600' : 'text-blue-600'}`} />
                      </div>
                      <h3 className="font-semibold text-gray-800">{resource.name}</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-2">
                      {resource.contact}
                    </p>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Self-Care Activities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-purple-600" />
            Self-Care Activities
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {selfCareActivities.map((category, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${category.gradient} shadow-lg`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg text-gray-800">{category.title}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.activities.map((activity, actIndex) => (
                      <li key={actIndex} className="flex items-center gap-2 text-gray-700">
                        <div className="w-2 h-2 bg-purple-400 rounded-full" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Mental Health Apps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Globe className="w-6 h-6 text-purple-600" />
            Recommended Mental Health Apps (India)
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mentalHealthApps.map((app, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{app.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{app.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(app.url, '_blank')}
                    className="w-full rounded-lg hover:bg-purple-50"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Professional Help */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-none shadow-lg">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                When to Seek Professional Help
              </h2>
              <div className="max-w-3xl mx-auto text-gray-700 space-y-3">
                <p>Consider reaching out to a mental health professional if you experience:</p>
                <ul className="text-left space-y-2 max-w-2xl mx-auto">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                    Persistent feelings of sadness, anxiety, or emptiness
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                    Difficulty functioning in daily activities
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                    Thoughts of self-harm or suicide
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                    Substance abuse or unhealthy coping mechanisms
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                    Significant changes in sleep, appetite, or behavior
                  </li>
                </ul>
                <p className="pt-4 font-semibold text-purple-700">
                  Remember: Seeking help is a sign of strength, not weakness. You deserve support and care. 💜
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
