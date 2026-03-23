
import React, { useState, useEffect } from 'react';
import { DayForecast } from '../types';
import { useLanguage } from '../context/LanguageContext';

const getWeatherIcon = (code: number) => {
  if (code === 0) return '☀️'; 
  if (code <= 3) return '🌤️'; 
  if (code >= 51 && code <= 67) return '🌧️'; 
  return '☁️';
};

const WeatherForecast: React.FC = () => {
  const { t, language } = useLanguage();
  const [forecast, setForecast] = useState<DayForecast[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Use the standard weather_code parameter
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=39.81&longitude=15.79&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
      
      const weatherRes = await fetch(weatherUrl);
      if (!weatherRes.ok) {
        throw new Error(`Weather API returned status ${weatherRes.status}`);
      }
      
      const weatherData = await weatherRes.json();

      if (!weatherData?.daily || !weatherData.daily.time) {
        throw new Error("Invalid weather data format from API");
      }

      // Fetch marine data separately and don't let it block weather
      let marineData = null;
      try {
        const marineRes = await fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=39.81&longitude=15.79&hourly=sea_surface_temperature&timezone=auto`);
        if (marineRes.ok) {
          marineData = await marineRes.json();
        }
      } catch (e) {
        console.warn("Marine data fetch failed", e);
      }

      const combinedForecast = weatherData.daily.time.slice(0, 5).map((t: string, i: number) => {
        let avgSeaTemp = null;
        if (marineData?.hourly?.sea_surface_temperature) {
          const hourlyTemps = marineData.hourly.sea_surface_temperature;
          const dayStartIndex = i * 24;
          const daySeaTemps = hourlyTemps.slice(dayStartIndex, dayStartIndex + 24);
          if (daySeaTemps.length > 0) {
            const validTemps = daySeaTemps.filter((temp: any) => typeof temp === 'number');
            if (validTemps.length > 0) {
              const sum = validTemps.reduce((a: number, b: number) => a + b, 0);
              avgSeaTemp = Math.round(sum / validTemps.length);
            }
          }
        }

        // Handle weather code property names safely (Open-Meteo changed weathercode to weather_code)
        const wCode = (weatherData.daily.weather_code && weatherData.daily.weather_code[i] !== undefined)
          ? weatherData.daily.weather_code[i] 
          : ((weatherData.daily.weathercode && weatherData.daily.weathercode[i] !== undefined) ? weatherData.daily.weathercode[i] : 0);

        return {
          date: t,
          maxTemp: Math.round(weatherData.daily.temperature_2m_max?.[i] ?? 0),
          minTemp: Math.round(weatherData.daily.temperature_2m_min?.[i] ?? 0),
          weatherCode: wCode,
          seaTemp: avgSeaTemp
        };
      });

      setForecast(combinedForecast);
    } catch (e) { 
      console.error("Weather load error:", e);
      setForecast([]);
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="weather" className="py-10 px-4 bg-white scroll-mt-40 min-h-[100px]">
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : forecast.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-400 text-sm mb-4">{t('weatherError')}</p>
            <button 
              onClick={() => fetchData()} 
              className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 transition-colors"
            >
              {t('tryAgain')}
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-white px-3 py-1.5 rounded-xl text-indigo-600 font-bold text-[10px] shadow-sm border border-slate-100 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                <span>LIVE: SCALEA</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 uppercase break-words hyphens-auto">
                {t('weather')}
              </h2>
              <p className="text-slate-400 text-sm font-medium mt-6 uppercase tracking-widest">{t('weatherSubtitle') || 'Актуальный прогноз для вашего отдыха'}</p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4">
              {forecast.map((day, idx) => (
                <div key={idx} className={`relative p-2 sm:p-4 rounded-2xl sm:rounded-3xl flex flex-col items-center transition-all duration-500 ${
                  idx === 0 
                  ? 'bg-white border-2 border-indigo-100 shadow-lg shadow-indigo-50 z-10' 
                  : 'bg-white border border-slate-100 shadow-sm opacity-80 hover:opacity-100'
                }`}>
                  <span className={`text-[9px] font-black uppercase tracking-widest mb-2 ${idx === 0 ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {idx === 0 ? t('weatherToday') : new Date(day.date).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', { weekday: 'short' })}
                  </span>
                  
                  <span className="text-xl sm:text-2xl mb-1 sm:mb-3">{getWeatherIcon(day.weatherCode)}</span>
                  
                  <div className="flex items-baseline space-x-1 mb-1 sm:mb-2">
                    <span className="text-base sm:text-lg font-black">{day.maxTemp}°</span>
                    <span className="text-[10px] font-bold text-slate-400">{day.minTemp}°</span>
                  </div>

                  {day.seaTemp !== null && (
                    <div className={`pt-2 border-t w-full flex items-center justify-center space-x-1.5 ${idx === 0 ? 'border-indigo-50' : 'border-slate-100'}`}>
                       <span className="text-xs">🌊</span>
                       <span className="text-xs font-black">{day.seaTemp}°</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default WeatherForecast;
