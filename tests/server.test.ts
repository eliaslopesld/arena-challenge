import assert from 'assert';
import { beforeEach, afterEach, describe, it } from 'node:test';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { IpLookupService } from '../src/domain/ip-location/services/ip-lookup.service';

let app: INestApplication;

async function start(port: number) {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(IpLookupService)
    .useValue({
      find: () => null,
    })
    .compile();

  app = moduleRef.createNestApplication();
  await app.init();
  await app.listen(port);
}

async function stop() {
  if (app) {
    await app.close();
  }
}

describe('integration tests', () => {
  const PORT = 3999;
  const PATH = '/ip/location';

  beforeEach(async () => {
    await start(PORT);
  });

  afterEach(async () => {
    await stop();
  });

  it("should return 404 when the ip didn't exists", async () => {
    const result = await fetch(
      `http://localhost:${PORT}${PATH}?ip=255.255.255.255`
    );

    assert.strictEqual(result.status, 404, 'should return status code 404');
  });
});
