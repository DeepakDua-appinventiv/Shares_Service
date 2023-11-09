import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Company } from './company.entity';

@Schema({  timestamps: true  })
export class Share {
  @Prop({ type: Types.ObjectId, ref:() => Company })
  companyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  userId: Types.ObjectId;

  @Prop()
  exchange: string;

  @Prop({ required: true })
  currentPrice: number;

}

export const SharesSchema = SchemaFactory.createForClass(Share);
