import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class WeatherService {
  private readonly apiKey = process.env.WEATHER_API_KEY;

  async getWeatherByCity(city: string) {
    const { data } = await axios.get(
      `http://api.weatherapi.com/v1/current.json`,
      {
        params: {
          key: this.apiKey,
          q: city,
          aqi: 'no',
        },
      },
    );
    return data;
  }
}
