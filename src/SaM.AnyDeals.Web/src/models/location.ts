import { City } from "./api/city";
import { Country } from "./api/country";

export interface Location {
  city?: City;
  country?: Country;
}
