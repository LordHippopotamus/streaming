-- CreateTable
CREATE TABLE "Stream" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
