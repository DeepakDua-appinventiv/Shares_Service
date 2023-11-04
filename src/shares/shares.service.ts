import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from 'entity/company.entity';
import { Share } from 'entity/shares.entity';
import { GetShareRequest, GetShareResponse } from './shares.pb';
import mongoose, { Model, Mongoose } from 'mongoose';

@Injectable()
export class SharesService {
    constructor(
        @InjectModel(Company.name) private readonly companyModel: Model<Company>,
        @InjectModel(Share.name) private readonly shareModel : Model<Share>
    ) {}

  public async getShare(payload: any): Promise<any> {
    const regex = new RegExp(payload, 'i');

    const shares = await this.shareModel.aggregate([
        {
          $lookup: {
            from: 'companyModel',
            localField: 'companyId',
            foreignField: '_id',
            as: 'companyDetails'
          }
        },
        {
          $match: {
            'companyDetails.name': { $regex: regex }
          }
        }
      ]);
      

    return { status: HttpStatus.OK, error:null, shares };
  }
}
