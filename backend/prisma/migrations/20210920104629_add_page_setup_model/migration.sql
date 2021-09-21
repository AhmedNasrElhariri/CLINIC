-- CreateTable
CREATE TABLE "PageSetup" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "top" INTEGER NOT NULL DEFAULT 0,
    "right" INTEGER NOT NULL DEFAULT 0,
    "bottom" INTEGER NOT NULL DEFAULT 0,
    "left" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PageSetup" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
