-- CreateTable
CREATE TABLE "cnab" (
    "id" SERIAL NOT NULL,
    "type" INT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "cpf" TEXT NOT NULL,
    "card" TEXT NOT NULL,
    "store_owner" TEXT NOT NULL,
    "store_name" TEXT NOT NULL,

    CONSTRAINT "cnab_pkey" PRIMARY KEY ("id")
);
CREATE INDEX idx_cnab_store_name ON "cnab" ("store_name");