import { createContext, useEffect, useState } from "react";
import { getIpData, getRandomQuote, getTimeData } from "../services/api";
import { getHours } from "../utils/timeUtils";

export const ClockContext = createContext();

export const ClockProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const [randomQuote, setQuote] = useState(null);
  const [ipData, setIpData] = useState(null);
  const [timeData, setTimeData] = useState(null);
  const toggleClockDetails = () => {
    setIsExpanded((prev) => !prev);
  };

  const getQuote = async () => {
    try {
      const data = await getRandomQuote();
      setQuote(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const loadQuote = async () => {
      try {
        const data = await getRandomQuote();
        setQuote(data);
      } catch (err) {
        setQuote({
          content:
            "Always be yourself, express yourself, have faith in yourself, do not go out and look for a successful personality and duplicate it.",
          author: "Bruce Lee",
        });
        console.log(err.message);
      }
    };

    const loadTimeData = async () => {
      try {
        const data = await getTimeData();

        //set Dark if hour between 18h and 5h
        const { datetime } = data;
        const hour = getHours(datetime);
        const isNight = hour >= 18 || hour < 5;
        setIsDark(isNight);
        if (isNight) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");

        setTimeData(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    const loadIpData = async () => {
      try {
        const data = await getIpData();
        setIpData(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    loadQuote();
    loadIpData();
    loadTimeData();
  }, []);

  const value = {
    isExpanded,
    isDark,
    randomQuote,
    timeData,
    ipData,
    toggleClockDetails,
    getQuote,
  };
  return (
    <ClockContext.Provider value={value}>{children}</ClockContext.Provider>
  );
};
