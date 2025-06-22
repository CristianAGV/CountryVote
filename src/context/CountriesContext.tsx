import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Country } from "../models/Country";
import { useQuery } from "@tanstack/react-query";
import { MOCK_COUNTRIES } from "../mocks/countries";
import type { WeatherResponse } from "../models/WeatherReponse";
import pLimit from "p-limit";

interface CountriesContextProps {
  countries: Country[];
  isWeatherLoading: boolean;
  isFormSubmitted: boolean;
  increaseCountryVote: (country: string) => void;
}

const CountriesContext = createContext<CountriesContextProps | undefined>(
  undefined
);

const fetchAllWeather = async (countries: Country[]): Promise<Country[]> => {
  const limit = pLimit(5); // limit to 5 concurrent requests

  const weatherPromises = countries.map((country) =>
    limit(async () => {
      try {
        const res = await fetch(
          `https://wttr.in/${encodeURIComponent(country.name)}?format=j1`
        );
        const data: WeatherResponse = await res.json();
        const weather = `${data.current_condition[0].weatherDesc[0].value} ${data.current_condition[0].temp_C} °C`;
        return { ...country, weather };
      } catch {
        return { ...country, weather: "N/A" };
      }
    })
  );

  return Promise.all(weatherPromises);
};

export const CountriesProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [countries, setCountries] = useState(MOCK_COUNTRIES);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const { data: countriesWithWeather, isLoading: isWeatherLoading } = useQuery({
    queryKey: ["countries-weather"],
    queryFn: () => fetchAllWeather(countries),
  });

  const increaseCountryVote = (country: string) => {
    setCountries((prev) =>
      prev.map((c) => {
        if (c.name === country) return { ...c, votes: c.votes + 1 };

        return c;
      })
    );
    setIsFormSubmitted(true);
  };

  useEffect(() => {
    if (!countriesWithWeather) return;

    // Merge weather into current countries, preserving votes
    setCountries((prevCountries) =>
      countriesWithWeather.map((newCountry) => {
        const existing = prevCountries.find((c) => c.name === newCountry.name);
        return {
          ...newCountry,
          votes: existing?.votes ?? 0,
        };
      })
    );
  }, [countriesWithWeather]);

  return (
    <CountriesContext.Provider
      value={{
        countries,
        isWeatherLoading,
        increaseCountryVote,
        isFormSubmitted,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};

export const useCountries = () => {
  const context = useContext(CountriesContext);
  if (!context) {
    throw new Error("useContries must be used within a CountriesProvider");
  }
  return context;
};
