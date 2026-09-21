import type { Adapter } from "next-auth/adapters";
import { db } from "./prisma8";

function stripUndefined<T extends object>(obj: T): any {
    const data: any = {};
    for (const key in obj) {
        if (obj[key] !== undefined) {
            if (obj[key] instanceof Date) {
                data[key] = (obj[key] as Date).toISOString();
            } else {
                data[key] = obj[key];
            }
        }
    }
    return data;
}

export function Prisma8Adapter(): Adapter {
    return {
        createUser: async ({ id, ...data }: any) => {
            const cleaned = stripUndefined(data);
            cleaned.id = id || crypto.randomUUID();
            if (!cleaned.updatedAt) cleaned.updatedAt = new Date().toISOString();
            return await (db.orm.public.User.create as any)(cleaned);
        },
        getUser: async (id) => {
            const user = await (db.orm.public.User.where as any)({ id }).first();
            if (user?.emailVerified) user.emailVerified = new Date(user.emailVerified);
            return user ?? null;
        },
        getUserByEmail: async (email) => {
            const user = await (db.orm.public.User.where as any)({ email }).first();
            if (user?.emailVerified) user.emailVerified = new Date(user.emailVerified);
            return user ?? null;
        },
        async getUserByAccount(provider_providerAccountId) {
            const account = await db.orm.public.Account
                .where({
                    provider: provider_providerAccountId.provider,
                    providerAccountId: provider_providerAccountId.providerAccountId,
                })
                .include('user', (u: any) => u)
                .first();
            const user = account?.user as any;
            if (user?.emailVerified) user.emailVerified = new Date(user.emailVerified);
            return user ?? null;
        },
        updateUser: async ({ id, ...data }) => {
            const cleaned = stripUndefined(data);
            return await (db.orm.public.User.where as any)({ id: id! }).update(cleaned);
        },
        deleteUser: async (id) => {
            await (db.orm.public.User.where as any)({ id }).delete();
        },
        linkAccount: async (data: any) => {
            const { type, ...rest } = data;
            const mappedData = { ...rest, _type: type, id: crypto.randomUUID() } as any;
            return await (db.orm.public.Account.create as any)(mappedData);
        },
        unlinkAccount: async (provider_providerAccountId) => {
            await db.orm.public.Account.where({
                provider: provider_providerAccountId.provider,
                providerAccountId: provider_providerAccountId.providerAccountId,
            }).delete();
        },
        async getSessionAndUser(sessionToken) {
            const userAndSession = await (db.orm.public.Session.where as any)({ sessionToken })
                .include('user', (u: any) => u)
                .first();
            if (!userAndSession) return null;
            const { user, ...session } = userAndSession;
            if (session?.expires) session.expires = new Date(session.expires);
            if (user?.emailVerified) user.emailVerified = new Date(user.emailVerified);
            return { user: user as any, session: session as any };
        },
        createSession: async (data) => {
            const cleaned = stripUndefined(data);
            cleaned.id = crypto.randomUUID();
            if (!cleaned.updatedAt) cleaned.updatedAt = new Date().toISOString();
            return await (db.orm.public.Session.create as any)(cleaned);
        },
        updateSession: async (data) => {
            const cleaned = stripUndefined(data);
            return await (db.orm.public.Session.where as any)({ sessionToken: data.sessionToken }).update(cleaned);
        },
        deleteSession: async (sessionToken) => {
            await (db.orm.public.Session.where as any)({ sessionToken }).delete();
        },
        async createVerificationToken(data) {
            const cleaned = stripUndefined(data);
            const verificationToken = await (db.orm.public.VerificationToken.create as any)(cleaned);
            if ("id" in verificationToken && (verificationToken as any).id) delete (verificationToken as any).id;
            if (verificationToken?.expires) (verificationToken as any).expires = new Date(verificationToken.expires as string);
            return verificationToken as any;
        },
        async useVerificationToken(identifier_token) {
            const verificationToken = await db.orm.public.VerificationToken.where({
                identifier: identifier_token.identifier,
                token: identifier_token.token,
            }).first();

            if (!verificationToken) return null;

            await db.orm.public.VerificationToken.where({
                identifier: identifier_token.identifier,
                token: identifier_token.token,
            }).delete();

            if ("id" in verificationToken && (verificationToken as any).id) delete (verificationToken as any).id;
            if (verificationToken?.expires) (verificationToken as any).expires = new Date(verificationToken.expires as string);
            return verificationToken as any;
        },
    } as Adapter;
}
