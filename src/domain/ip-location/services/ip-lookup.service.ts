import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatasetLoader } from '../../../infrastructure/dataset/ip-dataset.loader';

@Injectable()
export class IpLookupService implements OnModuleInit {
  private lower!: Uint32Array;
  private upper!: Uint32Array;

  private countryIds!: Uint16Array;
  private cityIds!: Uint32Array;

  private countriesDict: string[] = [];
  private citiesDict: string[] = [];

  async onModuleInit() {
    const loader = new DatasetLoader();

    await loader.load('IP2LOCATION-LITE-DB11.CSV');

    this.lower = loader.lower;
    this.upper = loader.upper;

    this.countryIds = loader.countryIds;
    this.cityIds = loader.cityIds;

    this.countriesDict = loader.countriesDict;
    this.citiesDict = loader.citiesDict;

    console.log(`Dataset loaded: ${this.lower.length} ranges`);
  }

  find(ipId: number) {
    let left = 0;
    let right = this.lower.length - 1;

    while (left <= right) {
      const mid = (left + right) >> 1;

      if (ipId < this.lower[mid]) {
        right = mid - 1;
      } else if (ipId > this.upper[mid]) {
        left = mid + 1;
      } else {
        const country = this.countriesDict[this.countryIds[mid]];

        const city = this.citiesDict[this.cityIds[mid]];

        return { country, city };
      }
    }

    return null;
  }
}
