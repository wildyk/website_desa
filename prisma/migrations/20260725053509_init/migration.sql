-- CreateTable
CREATE TABLE "ProfilDesa" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "kepala" TEXT NOT NULL,
    "alamat" TEXT,
    "kontak" TEXT,
    "deskripsi" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfilDesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Berita" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "ringkasan" TEXT NOT NULL,
    "isi" TEXT,
    "kategori" TEXT NOT NULL DEFAULT 'Umum',
    "emoji" TEXT NOT NULL DEFAULT '📰',
    "bgColor" TEXT NOT NULL DEFAULT '#E8EDE9',
    "tanggal" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Berita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pengumuman" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "isi" TEXT NOT NULL,
    "pengirim" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'aktif',
    "tanggal" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pengumuman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatistikDesa" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "nilai" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StatistikDesa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StatistikDesa_label_key" ON "StatistikDesa"("label");
