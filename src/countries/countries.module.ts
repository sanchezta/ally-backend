import { Module } from '@nestjs/common';

import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
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
