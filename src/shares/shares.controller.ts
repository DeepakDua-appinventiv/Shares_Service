import { Controller,Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SHARES_SERVICE_NAME, GetShareRequest, GetShareResponse, GetCompanyRequest, GetCompanyResponse } from './shares.pb';
import { SharesService } from './shares.service';

@Controller('shares')
export class SharesController {
    @Inject(SharesService)
    private readonly service: SharesService;

    @GrpcMethod(SHARES_SERVICE_NAME, 'searchCompany')
    private searchCompany(payload: GetCompanyRequest): Promise<GetCompanyResponse> {
        return this.service.searchCompany(payload);
    }

    @GrpcMethod(SHARES_SERVICE_NAME, 'getShare')
    private getShare(payload: GetShareRequest): Promise<any> {
        console.log(payload);
        const companyId = payload.companyId ;
        return this.service.getShare(companyId);
    }
}
