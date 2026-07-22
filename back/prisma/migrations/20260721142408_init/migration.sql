-- CreateTable
CREATE TABLE "Publication" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "liked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);
