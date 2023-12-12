import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { SeedModule } from 'seed/seed.module';
import { SharesModule } from './shares/shares.module';
import config from './common/config.common';

@Module({
  imports: [
    MongooseModule.forRoot(config.DB_NAME),
    SharesModule,
    // SeedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
