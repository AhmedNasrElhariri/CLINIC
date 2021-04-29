-- CreateTable
CREATE TABLE "Sales" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "salesDefinitionId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sales" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD FOREIGN KEY ("salesDefinitionId") REFERENCES "SalesDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
