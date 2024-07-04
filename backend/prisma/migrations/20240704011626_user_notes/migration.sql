-- CreateTable
CREATE TABLE "Note" (
    "noteId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("noteId")
);

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
