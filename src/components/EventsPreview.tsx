import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { romeToday } from '../content/events';
import { renderEventsTeaser } from '../content/eventsMarkup';

export default function EventsPreview() {
  const { language } = useLanguage();
  const [today, setToday] = useState(romeToday);
  useEffect(() => {
    const timer = window.setInterval(() => setToday(romeToday()), 60000);
    return () => window.clearInterval(timer);
  }, []);
  return language === 'it' ? <div dangerouslySetInnerHTML={{ __html: renderEventsTeaser(today) }} /> : null;
}
