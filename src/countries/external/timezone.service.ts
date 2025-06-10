import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class TimezoneService {
  async getTimezonesByCountry(countryCode: string) {
    const { data } = await axios.get(
      `http://worldtimeapi.org/api/timezone`,
    );
    return data.filter((tz) => tz.includes(countryCode));
  }

  async getCurrentTime(timezone: string) {
    const { data } = await axios.get(
      `http://worldtimeapi.org/api/timezone/${timezone}`,
    );
    return {
      datetime: data.datetime,
      timezone: data.timezone,
    };
  }
}
