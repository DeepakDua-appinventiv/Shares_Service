import { Module } from '@nestjs/common';
import { SharesController } from './shares.controller';
import { SharesService } from './shares.service';
import { CompanySchema } from 'entity/company.entity';
import { SharesSchema } from 'entity/shares.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { ORDERS_PACKAGE_NAME, ORDERS_SERVICE_NAME } from './orders.pb';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Company', schema: CompanySchema},
      { name: 'Share', schema: SharesSchema }
    ]),
    ClientsModule.register([
      {
        name: ORDERS_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: ORDERS_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-nest-proto/proto/orders.proto',
        },
      },
    ]),
  ],
  controllers: [SharesController],
  providers: [SharesService]
})
export class SharesModule {}
