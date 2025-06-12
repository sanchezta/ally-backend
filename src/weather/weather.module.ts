import { Module } from '@nestjs/common';

import { CountriesController } from './weather.controller';
import { CountriesService } from './weather.service';
import { WeatherService } from './external/weather.service';
import { TimezoneService } from './external/timezone.service';

@Module({
  controllers: [CountriesController],
  providers: [
    CountriesService,
    WeatherService,
    TimezoneService
  ]
})
export class CountriesModule { }
