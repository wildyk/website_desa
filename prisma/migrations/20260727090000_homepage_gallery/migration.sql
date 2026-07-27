ALTER TABLE "ProfilDesa"
  ADD COLUMN "captionUtama" TEXT NOT NULL DEFAULT 'Desa Maju, Sejahtera & Bermartabat',
  ADD COLUMN "subcaption" TEXT NOT NULL DEFAULT 'Portal digital resmi desa untuk informasi publik dan kegiatan masyarakat.';

CREATE TABLE "Galeri" (
  "id" SERIAL NOT NULL,
  "judul" TEXT NOT NULL,
  "image" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Galeri_pkey" PRIMARY KEY ("id")
);

INSERT INTO "StatistikDesa" ("label", "nilai", "updatedAt") VALUES
  ('Total Penduduk', '3.842', CURRENT_TIMESTAMP),
  ('Kepala Keluarga', '1.024', CURRENT_TIMESTAMP),
  ('RT / RW', '8', CURRENT_TIMESTAMP),
  ('Dusun', '2', CURRENT_TIMESTAMP)
ON CONFLICT ("label") DO NOTHING;

INSERT INTO "ProfilDesa" ("nama", "kepala", "captionUtama", "subcaption", "updatedAt")
SELECT 'Desa Rejosari', '', 'Desa Maju, Sejahtera & Bermartabat', 'Portal digital resmi desa untuk informasi publik dan kegiatan masyarakat.', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM "ProfilDesa");
