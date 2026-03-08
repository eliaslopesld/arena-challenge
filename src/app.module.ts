import { Module } from '@nestjs/common';
import { IpLocationModule } from './modules/ip-location/ip-location.module';

@Module({
  imports: [IpLocationModule],
})
export class AppModule {}
