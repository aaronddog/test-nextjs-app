"use client";
import { useEffect } from "react";

export const ErrorTrigger = () => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      throw new Error("This is a test error raised after two seconds!");
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);
  return null;
};
