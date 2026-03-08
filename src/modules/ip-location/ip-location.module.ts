import { Module } from '@nestjs/common';
import { IpLocationController } from './ip-location.controller';
import { IpLookupService } from '../../domain/ip-location/services/ip-lookup.service';

@Module({
  controllers: [IpLocationController],
  providers: [IpLookupService],
})
export class IpLocationModule {}
