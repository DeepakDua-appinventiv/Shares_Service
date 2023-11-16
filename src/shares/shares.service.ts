import { HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from 'entity/company.entity';
import { Share } from 'entity/shares.entity';
import {
  GetCompanyRequest,
  GetCompanyResponse,
  GetShareRequest,
  GetShareResponse,
} from './shares.pb';
import mongoose, { Model, Mongoose } from 'mongoose';
import { ORDERS_SERVICE_NAME, OrdersServiceClient } from './orders.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SharesService implements OnModuleInit {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
    @InjectModel(Share.name) private readonly shareModel: Model<Share>,
  ) {}
  private svc: OrdersServiceClient;

  @Inject(ORDERS_SERVICE_NAME)
  private readonly client: ClientGrpc;
  public onModuleInit(): void {
    this.svc = this.client.getService<OrdersServiceClient>(ORDERS_SERVICE_NAME);
  }

  public async searchCompany(
    payload: GetCompanyRequest,
  ): Promise<GetCompanyResponse> {
    try {
      const companyName  = payload.name;

      let companies;

      if(companyName){
        companies = await this.companyModel.aggregate([
          {
            $match: { name: { $regex: new RegExp(companyName, 'i') } }           
          },
          {
            $project: {  _id: 1, name: 1, industry: 1 }
          }
        ]);
      }else{
       companies = await this.companyModel.aggregate([
        {
          $project: { _id: 1, name: 1, industry: 1 },
        },
      ]);
    }
      return { status: HttpStatus.OK, companies: companies, error: null };
    } catch (error) {}
  }

  public async getShare(payload: GetShareRequest): Promise<GetShareResponse> {
    try {
      console.log(payload);

      const companyId = payload.companyId;
      const userId = payload.userId;

      console.log(companyId);

      const shares: GetShareResponse = await firstValueFrom(
        this.svc.getShare({ userId:userId , companyId: companyId }),
      );

      return shares;
    } 
      catch (error) {
      return { status: 500, shares: [], error: ['Error retrieving shares'] };
    }
  }
}
