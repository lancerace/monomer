'use client';

import { useEffect, useState } from 'react';
import { formatDate, formatDateTime } from '@/utils/dateFormat';

interface DateDisplayProps {
  date: Date | string;
  format?: 'date' | 'datetime';
  fallback?: string;
}

export function DateDisplay({ date, format = 'date', fallback = 'N/A' }: DateDisplayProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted on client
  if (!mounted) {
    return <span suppressHydrationWarning>{fallback}</span>;
  }

  try {
    const formattedDate = format === 'datetime' ? formatDateTime(date) : formatDate(date);
    return <span suppressHydrationWarning>{formattedDate}</span>;
  } catch (error) {
    return <span suppressHydrationWarning>{fallback}</span>;
  }
}