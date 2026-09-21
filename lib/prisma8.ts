import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from '../generated/prisma8/contract.d';
import contractJson from '../generated/prisma8/contract.json' with { type: 'json' };

export const db = postgres<Contract>({
  contractJson,
  url: process.env['DATABASE_URL']!,
});
