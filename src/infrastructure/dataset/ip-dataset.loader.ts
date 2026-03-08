import fs from 'fs';
import readline from 'readline';

export class DatasetLoader {
  lower!: Uint32Array;
  upper!: Uint32Array;

  countryIds!: Uint16Array;
  cityIds!: Uint32Array;

  countriesDict: string[] = [];
  citiesDict: string[] = [];

  private countryIndex = new Map<string, number>();
  private cityIndex = new Map<string, number>();

  async load(file: string) {
    const size = await this.countLines(file);

    this.lower = new Uint32Array(size);
    this.upper = new Uint32Array(size);

    this.countryIds = new Uint16Array(size);
    this.cityIds = new Uint32Array(size);

    await this.fill(file);
  }

  private async countLines(file: string): Promise<number> {
    let count = 0;

    const rl = readline.createInterface({
      input: fs.createReadStream(file),
    });

    for await (const _ of rl) count++;

    return count;
  }

  private getCountryId(country: string): number {
    let id = this.countryIndex.get(country);

    if (id === undefined) {
      id = this.countriesDict.length;
      this.countriesDict.push(country);
      this.countryIndex.set(country, id);
    }

    return id;
  }

  private getCityId(city: string): number {
    let id = this.cityIndex.get(city);

    if (id === undefined) {
      id = this.citiesDict.length;
      this.citiesDict.push(city);
      this.cityIndex.set(city, id);
    }

    return id;
  }

  private async fill(file: string) {
    const rl = readline.createInterface({
      input: fs.createReadStream(file),
    });

    let i = 0;

    for await (const line of rl) {
      const parts = line.replace(/"/g, '').split(',');

      const country = parts[3];
      const city = parts[5];

      this.lower[i] = Number(parts[0]);
      this.upper[i] = Number(parts[1]);

      this.countryIds[i] = this.getCountryId(country);
      this.cityIds[i] = this.getCityId(city);

      i++;
    }
  }
}
