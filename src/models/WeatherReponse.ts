type WeatherDescription = {
  value: string;
};

type WeatherCurrentCondition = {
  temp_C: string;
  weatherDesc: WeatherDescription[];
};

export type WeatherResponse = {
  current_condition: WeatherCurrentCondition[];
};
