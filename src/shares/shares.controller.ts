import { Controller,Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SHARES_SERVICE_NAME, GetShareRequest, GetShareResponse, GetCompanyRequest, GetCompanyResponse, UpdateShareRequest } from './shares.pb';
import { SharesService } from './shares.service';
import { UpdateShareResponse } from './orders.pb';

@Controller('shares')
export class SharesController {
    @Inject(SharesService)
    private readonly service: SharesService;

    @GrpcMethod(SHARES_SERVICE_NAME, 'searchCompany')
    private searchCompany(payload: GetCompanyRequest): Promise<GetCompanyResponse> {
        return this.service.searchCompany(payload);
    }

    @GrpcMethod(SHARES_SERVICE_NAME, 'getShare')
    private getShare(payload: GetShareRequest): Promise<GetShareResponse> {
        console.log(payload);
        const companyId = payload.companyId ;
        return this.service.getShare(payload);
    }

    @GrpcMethod(SHARES_SERVICE_NAME, 'updateShare')
    private async updateShare(payload:  UpdateShareRequest): Promise<UpdateShareResponse> {
        try {
            const userId = payload.userId;
            const shareIdsList = payload.sharesBought;
            const askPrice = payload.askPrice;
            await this.service.updateBoughtShares(userId, shareIdsList, askPrice);
            return {
                status: 200,
                message: 'Shares details updated successfully',
            };
        } catch (error) {
            console.error('Error updating shares:', error);
            throw new Error('Failed to update shares');
        }
    }
}
