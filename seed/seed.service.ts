import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from 'entity/company.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(@InjectModel(Company.name) private readonly CompanyModel: Model<Company>) {}

  async onModuleInit() {
    await this.seedDB();
  }

  async seedDB() {
    const companyData = [
        {
            name: "Hindustan Unilever (HUL)",
            description: "A global consumer goods and sales company.",
            foundedYear: 1933,
            industry: "Consumer Goods"
          },
          {
            name: "ICICI Bank",
            description: "An investment and financial firm.",
            foundedYear: 1994,
            industry: "Banking"
          },
          {
            name: "HDFC Bank",
            description: "An investment and financial firm.",
            foundedYear: 1994,
            industry: "Banking"
          },
          {
            name: "Tata Consultancy Services (TCS)",
            description: "A multinational technology company.",
            foundedYear: 1968,
            industry: "Information Technology"
          },
          {
            name: "Reliance Industries",
            description: "A global manufacturing company.",
            foundedYear: 1966,
            industry: "Conglomerate"
          }
    ];

    try {
        await this.CompanyModel.insertMany(companyData);
        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
  }
}