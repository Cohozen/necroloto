-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT,
    "image" TEXT,
    "username" TEXT,
    "firstname" TEXT,
    "lastname" TEXT,
    "clerkCreatedAt" TIMESTAMP(3),
    "clerkUpdatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Celebrity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birth" TIMESTAMP(3),
    "death" TIMESTAMP(3),
    "photo" TEXT,

    CONSTRAINT "Celebrity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CelebritiesOnBet" (
    "betId" TEXT NOT NULL,
    "celebrityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CelebritiesOnBet_pkey" PRIMARY KEY ("betId","celebrityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CelebritiesOnBet" ADD CONSTRAINT "CelebritiesOnBet_betId_fkey" FOREIGN KEY ("betId") REFERENCES "Bet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CelebritiesOnBet" ADD CONSTRAINT "CelebritiesOnBet_celebrityId_fkey" FOREIGN KEY ("celebrityId") REFERENCES "Celebrity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
