import { prismaConnection } from "@/@core/drivers/prisma/prisma-connection";
import { PrismaMessageRepository } from "../PrismaMessageRepository";

export const prismaRepository = new PrismaMessageRepository(
	prismaConnection,
);
