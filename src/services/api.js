export const getRandomQuote = async () => {
  const response = await fetch("https://api.quotable.io/random");

  if (!response.ok) throw new Error("HTTP Error: " + response.status);

  return response.json();
};

export const getTimeData = async () => {
  const url = "https://world-time-api3.p.rapidapi.com/ip"; //change the ip based on the user IP
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-host": "world-time-api3.p.rapidapi.com",
      "x-rapidapi-key": "c67c7498c1msh4fcfb3f9992a009p1d3702jsn662129e8f1b7",
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) throw new Error("time data HTTP Error: " + response.status);

  return response.json();
};

export const getIpData = async () => {
  const url =
    "https://ipapi.co/json/?token=1HHdbVjzDNd97atR9gYwXsbFFiKD5TiSi09ubBKED8p0gNDVsB";
  const response = await fetch(url);

  if (!response.ok)
    throw new Error("Ip Data HTTP Error: " + (await response).status);

  return response.json();
};
