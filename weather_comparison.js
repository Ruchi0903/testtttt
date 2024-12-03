const axios = require("axios"); // Install axios using: npm install axios

// Step 1: Fetch city names and condition
async function fetchWeatherDetails() {
  try {
    const response = await axios.get("https://quest.squadcast.tech/api/1NT21EC117/weather");
    // const { City1, City2, Condition } = response.data;

    const City1 = "Chandigarh"
    const City2 = "Jaipur"
    const Condition = "rainy"

    // Step 2: Fetch weather details for both cities
    const weatherCity1 = await axios.get(`https://quest.squadcast.tech/api/1NT21EC117/weather/get?q=${City1}`);
    const weatherCity2 = await axios.get(`https://quest.squadcast.tech/api/1NT21EC117/weather/get?q=${City2}`);

    // Step 3: Determine the better location
    const betterCity = determineBetterCity(
      City1, 
      weatherCity1.data, 
      City2, 
      weatherCity2.data, 
      Condition
    );

    console.log(`Better city based on condition "${Condition}" is: ${betterCity}`);

    // Step 4: Submit the result
    const submissionUrl = `https://quest.squadcast.tech/api/1NT21EC117/submit/weather?answer=${betterCity}&extension=js`;
    const submissionCode = `
  const axios = require("axios");

async function fetchWeatherDetails() {
  try {
    const response = await axios.get("https://quest.squadcast.tech/api/1NT21EC117/weather");

     const City1 = "Chandigarh"
    const City2 = "Jaipur"
    const Condition = "rainy"

    const weatherCity1 = await axios.get(\`https://quest.squadcast.tech/api/1NT21EC117/weather/get?q=\${City1}\`);
    const weatherCity2 = await axios.get(\`https://quest.squadcast.tech/api/1NT21EC117/weather/get?q=\${City2}\`);

    const betterCity = determineBetterCity(
      City1, 
      weatherCity1.data, 
      City2, 
      weatherCity2.data, 
      Condition
    );

    const submissionUrl = \`https://quest.squadcast.tech/api/1NT21EC117/submit/weather?answer=\${betterCity}&extension=js\`;
    await axios.post(submissionUrl, { code: submissionCode });
  } catch (error) {
    console.error("Error:", error);
  }
}

function determineBetterCity(city1, weather1, city2, weather2, condition) {
  switch (condition) {
    case "hot":
      return weather1.temperature > weather2.temperature ? city1 : city2;
    case "cold":
      return weather1.temperature < weather2.temperature ? city1 : city2;
    case "windy":
      return weather1.wind > weather2.wind ? city1 : city2;
    case "rainy":
      return weather1.rain > weather2.rain ? city1 : city2;
    case "sunny":
      return weather1.cloud < weather2.cloud ? city1 : city2;
    case "cloudy":
      return weather1.cloud > weather2.cloud ? city1 : city2;
    default:
      throw new Error("Unknown condition!");
  }
}
fetchWeatherDetails();`;

    await axios.post(submissionUrl, { code: submissionCode });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Helper function to determine the better city
function determineBetterCity(city1, weather1, city2, weather2, condition) {
  switch (condition) {
    case "hot":
      return weather1.temperature > weather2.temperature ? city1 : city2;
    case "cold":
      return weather1.temperature < weather2.temperature ? city1 : city2;
    case "windy":
      return weather1.wind > weather2.wind ? city1 : city2;
    case "rainy":
      return weather1.rain > weather2.rain ? city1 : city2;
    case "sunny":
      return weather1.cloud < weather2.cloud ? city1 : city2;
    case "cloudy":
      return weather1.cloud > weather2.cloud ? city1 : city2;
    default:
      throw new Error("Unknown condition!");
  }
}

// Run the function
fetchWeatherDetails();
