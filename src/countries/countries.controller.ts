import { Controller, Get, Param } from "@nestjs/common";
import { CountriesService } from "./countries.service";
import { WeatherService } from "./external/weather.service";
import { TimezoneService } from "./external/timezone.service";

@Controller('countries')
export class CountriesController {
  constructor(
    private countriesService: CountriesService,
    private weatherService: WeatherService,
    private timezoneService: TimezoneService,
  ) { }

  @Get()
  getCountries() {
    return this.countriesService.findAll();
  }

  @Get(':code')
  getCountry(@Param('code') code: string) {
    return this.countriesService.findByCode(code);
  }

  @Get(':code/weather')
  async getWeather(@Param('code') code: string) {
    const country = this.countriesService.findByCode(code);
    return this.weatherService.getWeatherByCity(country.capital);
  }

  @Get(':code/timezones')
  async getTimezones(@Param('code') code: string) {
    return this.timezoneService.getTimezonesByCountry(code);
  }

  @Get('/time/:zone')
  async getTime(@Param('zone') zone: string) {
    return this.timezoneService.getCurrentTime(zone);
  }
}
