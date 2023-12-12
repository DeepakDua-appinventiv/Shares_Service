import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Company extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  foundedYear: number;

  @Prop({ required: true })
  industry: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
