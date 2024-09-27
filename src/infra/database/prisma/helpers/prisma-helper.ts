import { PrismaClient } from '@prisma/client';

export class PrismaHelper {
  private static prisma: null | PrismaClient;

  private static async connect(): Promise<void> {
    if (!this.prisma) {
      this.prisma = new PrismaClient();
      await this.prisma.$connect();
    }
  }

  static async disconnect(): Promise<void> {
    if (this.prisma) {
      await this.prisma.$disconnect();
      this.prisma = null;
    }
  }

  static async getPrisma(): Promise<PrismaClient> {
    if (!this.prisma) {
      await this.connect();
    }
    return this.prisma as PrismaClient;
  }
}
