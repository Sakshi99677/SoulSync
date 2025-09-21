
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChatMessage } from "@/entities/ChatMessage";
import { MoodEntry } from "@/entities/MoodEntry";
import { InvokeLLM } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Music, BookOpen, Coffee, Heart, AlertTriangle, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBubble from "../components/chat/ChatBubble";
import MoodSuggestions from "../components/chat/MoodSuggestions";
import TypingIndicator from "../components/chat/TypingIndicator";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const [showCrisisResources, setShowCrisisResources] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const loadMessages = useCallback(async () => {
    try {
      const chatMessages = await ChatMessage.filter({ session_id: sessionId }, "-created_date");
      setMessages(chatMessages);
      return chatMessages;
    } catch (error) {
      console.error("Error loading messages:", error);
      return [];
    }
  }, [sessionId]);

  useEffect(() => {
    const initializeChat = async () => {
      if (hasInitialized) return;
      
      const existingMessages = await loadMessages();
      
      // Only send welcome message if no messages exist for this session
      if (existingMessages.length === 0) {
        setTimeout(() => {
          const welcomeMessage = {
            message: "Hey there! I'm Panda, your AI mental health companion from SoulSync. This is a completely safe and private space where you can share anything on your mind. I can help you with mood-adaptive music suggestions, creative activities, mindfulness practices, and gentle guidance. How are you feeling today?",
            sender: "panda",
            session_id: sessionId
          };
          setMessages([welcomeMessage]);
        }, 1000);
      }
      
      setHasInitialized(true);
    };

    initializeChat();
  }, [sessionId, hasInitialized, loadMessages]);

  const detectMood = (message) => {
    const moodKeywords = {
      sad: ["sad", "depressed", "down", "upset", "crying", "lonely", "empty", "hopeless", "worthless"],
      anxious: ["anxious", "worried", "nervous", "panic", "scared", "afraid", "stress", "overwhelmed"],
      stressed: ["stressed", "overwhelmed", "pressure", "busy", "exhausted", "tired"],
      angry: ["angry", "mad", "furious", "annoyed", "frustrated", "hate"],
      happy: ["happy", "good", "great", "amazing", "excited", "joy", "wonderful"],
      tired: ["tired", "sleepy", "exhausted", "drained", "worn out", "fatigued"],
      crisis: ["suicide", "kill myself", "end it all", "hurt myself", "self harm", "die", "killing"]
    };

    const lowerMessage = message.toLowerCase();
    
    // Check for crisis keywords first
    for (const keyword of moodKeywords.crisis) {
      if (lowerMessage.includes(keyword)) {
        return "crisis";
      }
    }
    
    for (const [mood, keywords] of Object.entries(moodKeywords)) {
      if (mood !== "crisis" && keywords.some(keyword => lowerMessage.includes(keyword))) {
        return mood;
      }
    }
    return "neutral";
  };

  const generateMoodAdaptiveResponse = (detectedMood, userMessage) => {
    const responses = {
      crisis: {
        message: `I'm really concerned about you right now, and I want you to know that you're not alone. Your life has value, and there are people who want to help. Please reach out to a professional immediately - they have the training to support you through this. 

🚨 **Immediate Help:**
• National Suicide Prevention: 988 (US)
• Crisis Text Line: Text HOME to 741741
• Vandrevala Foundation: 9999 666 555 (India)

Would you like me to help you find more local resources, or would you prefer to talk about what's making you feel this way? I'm here to listen. 💜`,
        showCrisis: true,
        musicSuggestion: null
      },
      sad: {
        message: `I can hear the sadness in your words, and I want you to know that it's okay to feel this way. Your emotions are valid. 💙 

Here are some things that might help:
🎵 **Music Therapy**: I'd love to suggest some uplifting songs - "Here Comes the Sun" by The Beatles or "Good as Hell" by Lizzo can be mood-boosters
✨ **Creative outlet**: Try writing down three small things you're grateful for today
🧘 **Mindfulness**: Take 5 deep breaths with me - in for 4, hold for 4, out for 6

What sounds most appealing to you right now?`,
        showCrisis: false,
        musicSuggestion: ["Here Comes the Sun - The Beatles", "Good as Hell - Lizzo", "Happy - Pharrell Williams"]
      },
      tired: {
        message: `It sounds like you're feeling drained. Sometimes our souls need rest just as much as our bodies. 😴💜

Let me suggest some gentle ways to recharge:
🎵 **Calming Music**: "Weightless" by Marconi Union or "Clair de Lune" by Debussy
🛁 **Self-care**: A warm bath with calming music or a short meditation
📱 **Digital break**: Maybe 30 minutes away from screens?
☕ **Comfort ritual**: Make your favorite warm drink mindfully

What would help you feel more rested?`,
        showCrisis: false,
        musicSuggestion: ["Weightless - Marconi Union", "Clair de Lune - Debussy", "River - Joni Mitchell"]
      },
      anxious: {
        message: `I can sense you're feeling anxious. Let's work through this together - you're stronger than you know. 🌸

Here are some techniques that can help right now:
🎵 **Calming sounds**: "Breathe Me" by Sia or nature sounds like rain/ocean waves
🧘 **Breathing**: Try the 4-7-8 technique - breathe in for 4, hold for 7, out for 8
✍️ **Journaling prompt**: "What's one thing I can control in this situation?"
🎨 **Creative distraction**: Doodle, color, or sketch your feelings

Which of these feels most doable for you?`,
        showCrisis: false,
        musicSuggestion: ["Breathe Me - Sia", "The Night We Met - Lord Huron", "Holocene - Bon Iver"]
      },
      happy: {
        message: `I love hearing the positivity in your message! Your joy is contagious. 😊✨

Let's amplify these good vibes:
🎵 **Upbeat music**: "Can't Stop the Feeling" by Justin Timberlake or "Walking on Sunshine" by Katrina and the Waves
📝 **Gratitude journaling**: Write down what's making you happy today
🤝 **Share the joy**: Maybe message a friend or family member to spread the positivity
💃 **Movement**: Dance to your favorite song or take a joyful walk

What's bringing you the most happiness today?`,
        showCrisis: false,
        musicSuggestion: ["Can't Stop the Feeling - Justin Timberlake", "Walking on Sunshine - Katrina and the Waves", "Happy - Pharrell Williams"]
      }
    };

    return responses[detectedMood] || {
      message: `Thanks for sharing with me. I'm here to listen and support you in whatever way feels helpful. 🐼💜

Would you like me to suggest:
🎵 **Music** to match or shift your mood?
✨ **A creative activity** like journaling or drawing?
🧘 **Mindfulness practice** to help you feel more grounded?
📱 **Connection ideas** to reach out to someone you care about?

What sounds most appealing to you right now?`,
      showCrisis: false,
      musicSuggestion: null
    };
  };

  const generatePandaResponse = async (userMessage, detectedMood) => {
    try {
      const moodResponse = generateMoodAdaptiveResponse(detectedMood, userMessage);
      
      if (detectedMood === "crisis") {
        setShowCrisisResources(true);
        return moodResponse.message;
      }

      // For non-crisis situations, get AI-enhanced response
      const prompt = `You are Panda, SoulSync's caring mental health AI companion for Gen Z. The user just said: "${userMessage}"

      Their detected mood seems to be: ${detectedMood}

      Provide a warm, empathetic response that:
      - Uses Gen Z language naturally (not forced)
      - Offers genuine emotional support
      - Suggests specific creative activities, mindfulness practices, or journaling prompts
      - Includes music recommendations when appropriate (especially for sad/tired moods)
      - Shows you truly care about their wellbeing
      - Keeps responses conversational (2-3 sentences max)
      - Use emojis sparingly and meaningfully
      - Be authentic and never judgmental
      
      This is a safe space. Focus on practical, immediate help they can use right now.`;

      const response = await InvokeLLM({ prompt });
      return response || moodResponse.message;
    } catch (error) {
      console.error("Error generating response:", error);
      return generateMoodAdaptiveResponse(detectedMood, userMessage).message;
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      message: newMessage,
      sender: "user",
      session_id: sessionId
    };

    setMessages(prev => [...prev, userMessage]);
    
    try {
      await ChatMessage.create(userMessage);
    } catch (error) {
      console.error("Error saving user message:", error);
    }

    const detectedMood = detectMood(newMessage);
    setNewMessage("");
    setIsTyping(true);

    try {
      const pandaResponse = await generatePandaResponse(newMessage, detectedMood);
      
      const pandaMessage = {
        message: pandaResponse,
        sender: "panda",
        mood_detected: detectedMood,
        session_id: sessionId
      };

      setMessages(prev => [...prev, pandaMessage]);
      
      try {
        await ChatMessage.create(pandaMessage);
      } catch (error) {
        console.error("Error saving Panda message:", error);
      }

      // Save mood entry if significant mood detected
      if (detectedMood !== "neutral") {
        try {
          await MoodEntry.create({
            mood: detectedMood === "crisis" ? "very_sad" : detectedMood,
            intensity: detectedMood === "crisis" ? 1 : 5, 
            notes: newMessage,
            triggers: ["other"]
          });
        } catch (error) {
          console.error("Error saving mood entry:", error);
        }
      }

    } catch (error) {
      console.error("Error processing message:", error);
      const errorMessage = {
        message: "I'm having trouble connecting right now, but I'm still here for you. Please try again in a moment. If you're in crisis, please reach out to a professional helpline immediately.",
        sender: "panda",
        session_id: sessionId
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    
    setIsTyping(false);
  };

  const quickReplies = [
    { text: "I'm feeling overwhelmed", icon: "😰" },
    { text: "I had a good day", icon: "😊" },
    { text: "I'm anxious about something", icon: "😟" },
    { text: "I need motivation", icon: "💪" },
    { text: "I'm feeling sad", icon: "😢" },
    { text: "Can you suggest some music?", icon: "🎵" }
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Crisis Resources Banner */}
      <AnimatePresence>
        {showCrisisResources && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="bg-red-500 text-white p-4 text-center relative"
          >
            <button
              onClick={() => setShowCrisisResources(false)}
              className="absolute right-4 top-4 text-white hover:text-gray-200"
            >
              ✕
            </button>
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-bold">Crisis Support Available 24/7</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="tel:988" className="flex items-center gap-1 hover:underline">
                <Phone className="w-4 h-4" />
                US: 988
              </a>
              <a href="tel:9999666555" className="flex items-center gap-1 hover:underline">
                <Phone className="w-4 h-4" />
                India: 9999 666 555
              </a>
              <span>Text: HOME to 741741</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/50 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cdc2d00f398b3193135be0/83a1d6eab_image.png" alt="Panda Avatar" className="w-11 h-11 rounded-full" />
          </div>
          <div>
            <h1 className="font-bold text-gray-800 text-lg">Panda - Your AI Companion</h1>
            <p className="text-sm text-gray-600">SoulSync Mental Wellness • Always here for you</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <ChatBubble key={index} message={message} />
          ))}
        </AnimatePresence>
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length <= 2 && (
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-3 text-center">Quick ways to start chatting with Panda:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                className="rounded-full text-sm bg-white/70 hover:bg-purple-100 border-purple-200"
                onClick={() => setNewMessage(reply.text)}
              >
                <span className="mr-2">{reply.icon}</span>
                {reply.text}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-white/50">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Share what's on your mind with Panda..."
            className="flex-1 rounded-2xl border-purple-200 focus:border-purple-400 bg-white/90"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim() || isTyping}
            className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-xs text-center text-gray-500 mt-2">
          This conversation is completely private and confidential • Crisis support available 24/7
        </p>
      </div>

      {/* Mood-based suggestions */}
      {messages.length > 0 && (
        <MoodSuggestions 
          lastMood={messages[messages.length - 1]?.mood_detected} 
        />
      )}
    </div>
  );
}
