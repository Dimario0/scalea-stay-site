
export interface Apartment {
  id: string;
  name: string;
  nameKey: string;
  description: string;
  descriptionKey: string;
  price: string;
  beds: number;
  distanceToSea: string;
  images: string[];
  features: string[];
  featuresKeys: string[];
}

export interface Review {
  name: string;
  nameKey: string;
  text: string;
  textKey: string;
  rating: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface DayForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  seaTemp?: number;
}

export interface WeatherInfo {
  daily: DayForecast[];
}
