-- AlterTable
ALTER TABLE "Logging" ADD COLUMN     "tagName" TEXT;

-- CreateTable
CREATE TABLE "LoggingTag" (
    "model" "LoggingModel" NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,

    CONSTRAINT "LoggingTag_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "LoggingTag_model_name_key" ON "LoggingTag"("model", "name");

-- AddForeignKey
ALTER TABLE "Logging" ADD CONSTRAINT "Logging_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "LoggingTag"("name") ON DELETE SET NULL ON UPDATE CASCADE;
INSERT INTO "LoggingTag"
VALUES ('Revenue', 'revenue from appointment', 'from appointment'),
('Revenue', 'revenue from user', 'from user'),
('Expense', 'expense from appointment', 'from appointment'),
('Expense', 'expense from user', 'from user'),
('BankRevenue', 'bankRevenue from appointment', 'from appointment'),
('BankRevenue', 'bankRevenue from user', 'from user'),
('BankExpense', 'bankExpense from appointment', 'from appointment'),
('BankExpense', 'bankExpense from user', 'from user');