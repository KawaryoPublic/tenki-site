-- CreateTable
CREATE TABLE "public"."DateInfo" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "plan" TEXT,

    CONSTRAINT "DateInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DateInfo_date_key" ON "public"."DateInfo"("date");
