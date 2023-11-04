// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { SeedService } from './seed.service';
// import { Company, CompanySchema } from 'entity/company.entity';

// @Module({
//     imports: [
//         MongooseModule.forRoot('mongodb://localhost/construction_db'),

//         MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
//     ],
//     providers: [SeedService],
// })
// export class SeedModule { }