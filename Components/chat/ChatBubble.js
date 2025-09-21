import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function ChatBubble({ message }) {
  const isPanda = message.sender === "panda";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex ${isPanda ? "justify-start" : "justify-end"} mb-4`}
    >
      <div className={`max-w-[80%] md:max-w-[60%] flex items-end gap-2 ${isPanda ? "" : "flex-row-reverse"}`}>
        {isPanda && (
           <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cdc2d00f398b3193135be0/83a1d6eab_image.png" alt="Panda Avatar" className="w-8 h-8 rounded-full shadow-sm mb-4" />
        )}
        <div className="flex-1">
            {isPanda && (
              <span className="text-sm font-medium text-gray-700 ml-2 mb-1 block">Panda</span>
            )}
            
            <Card className={`p-3 md:p-4 shadow-sm border-none ${
              isPanda 
                ? "bg-white/90 backdrop-blur-sm" 
                : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            }`}>
              <div className={`text-sm leading-relaxed ${isPanda ? "text-gray-800" : "text-white"}`}>
                {message.message.split('\n').map((line, index) => (
                  <div key={index}>
                    {line}
                    {index < message.message.split('\n').length - 1 && <br />}
                  </div>
                ))}
              </div>
            </Card>
            
            <div className={`flex items-center gap-2 mt-1 text-xs text-gray-500 ${
 