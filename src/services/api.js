export const getRandomQuote = async () => {
  const response = await fetch("https://quote-three-hazel.vercel.app/random");

  if (!response.ok) throw new Error("HTTP Error: " + response.status);

  return response.json();
};

export const getTimeData = async () => {
  const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
  const url = "https://world-time-api3.p.rapidapi.com/ip";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-host": "world-time-api3.p.rapidapi.com",
      "x-rapidapi-key": RAPIDAPI_KEY,
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) throw new Error("time data HTTP Error: " + response.status);

  return response.json();
};

export const getIpData = async () => {
  const IPBASE_KEY = import.meta.env.VITE_IPBASE_KEY;
  const url = `https://api.ipbase.com/v2/info?apikey=${IPBASE_KEY}`;
  const response = await fetch(url);

  if (!response.ok) throw new Error("Ip Data HTTP Error: " + response.status);

  return response.json();
};
