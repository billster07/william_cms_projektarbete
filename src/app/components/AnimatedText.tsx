"use client";

import React from "react";
import { useAnimatedText } from "../hooks/useAnimatedText";

interface Props {
  text: string;
  speed?: number;
  className?: string;
}

export default function AnimatedText({ text, speed = 80, className }: Props) {
  const { displayedText, isComplete } = useAnimatedText(text, speed);

  return (
    <div className={`font-mono ${className}`}>
      {displayedText}
      {!isComplete && <span className="animate-blink">|</span>}
    </div>
  );
}
