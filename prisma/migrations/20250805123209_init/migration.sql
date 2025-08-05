-- CreateTable
CREATE TABLE "microplates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "microplates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "well_measurements" (
    "id" TEXT NOT NULL,
    "microplateId" TEXT NOT NULL,
    "row" TEXT NOT NULL,
    "column" INTEGER NOT NULL,
    "confluencyPercentage" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "well_measurements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "well_measurements_microplateId_row_column_timestamp_key" ON "well_measurements"("microplateId", "row", "column", "timestamp");

-- AddForeignKey
ALTER TABLE "well_measurements" ADD CONSTRAINT "well_measurements_microplateId_fkey" FOREIGN KEY ("microplateId") REFERENCES "microplates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
