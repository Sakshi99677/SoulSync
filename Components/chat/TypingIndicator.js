import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start mb-4"
    >
      <div className="flex items-end gap-2">
         <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cdc2d00f398b3193135be0/83a1d6eab_image.png" alt="Panda Avatar" className="w-8 h-8 rounded-full shadow-sm" />
        <div>
          <span className="text-sm font-medium text-gray-700 ml-2 mb-1 block">Panda is thinking...</span>
          <Card className="p-4 bg-white/90 backdrop-blur-sm shadow-sm border-none ml-2">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-purple-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}