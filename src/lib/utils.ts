import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isWorkingDay(): boolean {
  const today = new Date();
  const dayOfWeek = today.getDay();
  return dayOfWeek >= 1 && dayOfWeek <= 5; // Monday to Friday (1 to 5)
}