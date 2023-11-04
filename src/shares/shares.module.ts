import { Module } from '@nestjs/common';
import { SharesController } from './shares.controller';
import { SharesService } from './shares.service';
import { CompanySchema } from 'entity/company.entity';
import { SharesSchema } from 'entity/shares.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Company', schema: CompanySchema},
      { name: 'Share', schema: SharesSchema }
    ])
  ],
  controllers: [SharesController],
  providers: [SharesService]
})
export class SharesModule {}
