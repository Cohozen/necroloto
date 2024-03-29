// @ts-nocheck
import { PrismaClient } from "@prisma/client";

declare global {
    namespace NodeJS {
        interface Global {
            prisma: PrismaClient;
        }
    }
}

let prisma: PrismaClient;

if (!global.prisma) {
    global.prisma = new PrismaClient({
        log: ["info"]
    });
}

prisma = global.prisma;

export default prisma;
