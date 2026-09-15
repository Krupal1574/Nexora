import prisma from "@/lib/prisma";

export async function storeResume(userId: string, fileName: string, mimeType: string, buffer: Buffer, parsedData?: any) {
  return prisma.resume.upsert({
    where: { userId },
    update: {
      fileName,
      mimeType,
      fileSize: buffer.length,
      data: buffer as any,
      parsedData: parsedData || {},
    },
    create: {
      userId,
      fileName,
      mimeType,
      fileSize: buffer.length,
      data: buffer as any,
      parsedData: parsedData || {},
    },
  });
}

export async function getResume(userId: string) {
  return prisma.resume.findUnique({
    where: { userId },
  });
}

export async function deleteResume(userId: string) {
  return prisma.resume.delete({
    where: { userId },
  });
}
