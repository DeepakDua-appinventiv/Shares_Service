import { Controller,Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SHARES_SERVICE_NAME, GetShareRequest, GetShareResponse } from './shares.pb';
import { SharesService } from './shares.service';

@Controller('shares')
export class SharesController {
    @Inject(SharesService)
    private readonly service: SharesService;

    @GrpcMethod(SHARES_SERVICE_NAME, 'getShare')
    private getShare(payload: GetShareRequest): Promise<GetShareResponse> {
        return this.service.getShare(payload);
    }

}
