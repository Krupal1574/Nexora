/**
 * Prisma 7 compatibility shim over Prisma 8 ORM.
 * 
 * This provides a prisma.model.findUnique/findMany/create/update/delete/upsert/count/deleteMany
 * API that delegates to db.orm.public.* from Prisma 8.
 * 
 * This allows all existing routes to keep their prisma.* calls working
 * while the underlying driver is Prisma 8.
 */
import { db } from "./prisma8";

type WhereClause = Record<string, any>;

function stripUndefined(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}

/**
 * Creates a model proxy that translates Prisma 7 query patterns to Prisma 8 ORM calls.
 */
function createModelProxy(model: any) {
  return {
    async findUnique(args: { where: WhereClause; select?: any; include?: any }) {
      let query = model.where(args.where);
      // Note: Prisma 8 ORM doesn't support select/include in the same way,
      // but .first() returns all fields by default which is safe.
      return await query.first() ?? null;
    },

    async findFirst(args?: { where?: WhereClause; orderBy?: any; select?: any }) {
      let query = model;
      if (args?.where) query = query.where(args.where);
      if (args?.orderBy) {
        query = applyOrderBy(query, args.orderBy);
      }
      return await query.first() ?? null;
    },

    async findMany(args?: { where?: WhereClause; orderBy?: any; take?: number; skip?: number; select?: any; include?: any }) {
      let query = model;
      if (args?.where) {
        query = applyWhere(query, args.where);
      }
      if (args?.orderBy) {
        query = applyOrderBy(query, args.orderBy);
      }
      if (args?.skip) query = query.offset(args.skip);
      if (args?.take) query = query.limit(args.take);
      return await query.all();
    },

    async create(args: { data: any }) {
      const data = { ...args.data };
      if (!data.id) data.id = crypto.randomUUID();
      if (!data.updatedAt) data.updatedAt = new Date().toISOString();
      return await model.create(data);
    },

    async update(args: { where: WhereClause; data: any }) {
      const rows = await model.where(args.where).update(stripUndefined(args.data));
      // Prisma 7 update returns a single object; Prisma 8 returns the updated row
      return rows;
    },

    async delete(args: { where: WhereClause }) {
      return await model.where(args.where).delete();
    },

    async deleteMany(args?: { where?: WhereClause }) {
      if (args?.where) {
        const q = applyWhere(model, args.where);
        await q.delete();
      } else {
        await model.delete();
      }
      return { count: 0 }; // Prisma 8 doesn't return count from delete
    },

    async upsert(args: { where: WhereClause; create: any; update: any }) {
      const existing = await model.where(args.where).first();
      if (existing) {
        return await model.where(args.where).update(stripUndefined(args.update));
      } else {
        const data = { ...args.create };
        if (!data.id) data.id = crypto.randomUUID();
        if (!data.updatedAt) data.updatedAt = new Date().toISOString();
        return await model.create(data);
      }
    },

    async count(args?: { where?: WhereClause }) {
      let query = model;
      if (args?.where) {
        query = applyWhere(query, args.where);
      }
      const result = await query.aggregate((a: any) => ({
        count: a.count(),
      }));
      return result.count;
    },
  };
}

/**
 * Applies a Prisma 7-style where clause with operators like { lt, gt, gte, lte, contains, in }
 * to a Prisma 8 query using lambda predicates.
 */
function applyWhere(query: any, where: WhereClause) {
  for (const [key, value] of Object.entries(where)) {
    if (value === undefined) continue;
    if (value !== null && typeof value === "object" && !Array.isArray(value) && !(value instanceof Date) && !(value instanceof Buffer)) {
      // Operator object like { lt: ..., gte: ..., contains: ... }
      for (const [op, opVal] of Object.entries(value as Record<string, any>)) {
        switch (op) {
          case "lt":
            query = query.where((f: any) => f[key].lt(opVal));
            break;
          case "lte":
            query = query.where((f: any) => f[key].lte(opVal));
            break;
          case "gt":
            query = query.where((f: any) => f[key].gt(opVal));
            break;
          case "gte":
            query = query.where((f: any) => f[key].gte(opVal));
            break;
          case "contains":
            query = query.where((f: any) => f[key].ilike(`%${opVal}%`));
            break;
          case "in":
            query = query.where((f: any) => f[key].in(opVal));
            break;
          case "not":
            query = query.where((f: any) => f[key].neq(opVal));
            break;
          default:
            // For unknown operators, try direct equality
            query = query.where({ [key]: value });
            break;
        }
      }
    } else {
      // Direct equality
      query = query.where({ [key]: value });
    }
  }
  return query;
}

/**
 * Applies Prisma 7-style orderBy to a Prisma 8 query.
 */
function applyOrderBy(query: any, orderBy: any) {
  if (Array.isArray(orderBy)) {
    for (const ob of orderBy) {
      query = applyOrderBy(query, ob);
    }
    return query;
  }

  for (const [field, dir] of Object.entries(orderBy)) {
    if (dir === "asc") {
      query = query.orderBy((f: any) => f[field].asc());
    } else {
      query = query.orderBy((f: any) => f[field].desc());
    }
  }
  return query;
}

const prisma = {
  user: createModelProxy(db.orm.public.User),
  account: createModelProxy(db.orm.public.Account),
  session: createModelProxy(db.orm.public.Session),
  verificationToken: createModelProxy(db.orm.public.VerificationToken),
  address: createModelProxy(db.orm.public.Address),
  adminAuditLog: createModelProxy(db.orm.public.AdminAuditLog),
  blogPost: createModelProxy(db.orm.public.BlogPost),
  candidatePhoto: createModelProxy(db.orm.public.CandidatePhoto),
  candidateProfile: createModelProxy(db.orm.public.CandidateProfile),
  contactInquiry: createModelProxy(db.orm.public.ContactInquiry),
  coupon: createModelProxy(db.orm.public.Coupon),
  course: createModelProxy(db.orm.public.Course),
  enrollment: createModelProxy(db.orm.public.Enrollment),
  externalArticle: createModelProxy(db.orm.public.ExternalArticle),
  module: createModelProxy(db.orm.public.Module),
  lesson: createModelProxy(db.orm.public.Lesson),
  mediaAsset: createModelProxy(db.orm.public.MediaAsset),
  order: createModelProxy(db.orm.public.Order),
  product: createModelProxy(db.orm.public.Product),
  orderItem: createModelProxy(db.orm.public.OrderItem),
  payment: createModelProxy(db.orm.public.Payment),
  pendingEmailChange: createModelProxy(db.orm.public.PendingEmailChange),
  rateLimit: createModelProxy(db.orm.public.RateLimit),
  resume: createModelProxy(db.orm.public.Resume),
  siteSetting: createModelProxy(db.orm.public.SiteSetting),
  testimonial: createModelProxy(db.orm.public.Testimonial),
  userLessonProgress: createModelProxy(db.orm.public.UserLessonProgress),
  $disconnect: async () => {},
};

export { prisma };
export default prisma;
