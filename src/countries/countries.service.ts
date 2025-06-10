import { Injectable } from '@nestjs/common';

@Injectable()
export class CountriesService {
  private countries = require('./mock/countries.json');

  findAll() {
    return this.countries;
  }

  findByCode(code: string) {
    return this.countries.find((c) => c.code === code);
  }
}
