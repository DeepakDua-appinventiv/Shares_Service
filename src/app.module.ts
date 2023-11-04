import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { SeedModule } from 'seed/seed.module';
import { SharesModule } from './shares/shares.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/comapanyDB"),
    SharesModule,
    // SeedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
