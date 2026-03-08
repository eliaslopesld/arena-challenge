import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { IpLookupService } from '../../domain/ip-location/services/ip-lookup.service';
import { ipToId } from '../../shared/utils/ip-to-id';

@Controller('ip')
export class IpLocationController {
  constructor(private readonly lookupService: IpLookupService) {}

  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @Get('location')
  getLocation(@Query('ip') ip: string) {
    try {
      const ipId = ipToId(ip);

      const result = this.lookupService.find(ipId);

      if (!result) {
        throw new NotFoundException();
      }

      return result;
    } catch {
      throw new NotFoundException();
    }
  }
}
