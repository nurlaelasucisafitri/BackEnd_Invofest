import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. Menampilkan semua pembicara
export const getPembicara = async (req: Request, res: Response) => {
    try {
        const pembicara = await prisma.pembicara.findMany({
            orderBy: { id: "asc" },
        });
        res.json(pembicara);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data pembicara", error });
    }
};

// 2. Menambah pembicara baru
export const createPembicara = async (req: Request, res: Response) => {
    const { name, role, image } = req.body;

    if (!name || !role) {
        return res.status(400).json({ message: "Nama dan Role harus diisi" });
    }

    try {
        const newPembicara = await prisma.pembicara.create({
            data: {
                name,
                role,
                image: image || "",
                createdAt: new Date(),
            },
        });
        res.status(201).json({ message: "Data berhasil disimpan", pembicara: newPembicara });
    } catch (error) {
        res.status(500).json({ message: "Gagal menyimpan pembicara", error });
    }
};

// 3. Menampilkan satu pembicara berdasarkan id (TAMBAHAN BARU)
export const showPembicara = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const pembicara = await prisma.pembicara.findUnique({
            where: { id: Number(id) }
        });

        if (!pembicara) {
            return res.status(404).json({ message: "Pembicara tidak ditemukan" });
        }
        res.json(pembicara);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil detail pembicara", error });
    }
};

// 4. Mengupdate pembicara berdasarkan id (TAMBAHAN BARU)
export const updatePembicara = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, role, image } = req.body;
    try {
        const existing = await prisma.pembicara.findUnique({
            where: { id: Number(id) }
        });

        if (!existing) {
            return res.status(404).json({ message: "Pembicara tidak ditemukan" });
        }

        const updatedPembicara = await prisma.pembicara.update({
            where: { id: Number(id) },
            data: {
                name: name || existing.name,
                role: role || existing.role,
                image: image || existing.image
            }
        });
        res.json({ message: "Pembicara berhasil diupdate", pembicara: updatedPembicara });
    } catch (error) {
        res.status(500).json({ message: "Gagal mengupdate pembicara", error });
    }
};

// 5. Menghapus pembicara berdasarkan id
export const deletePembicara = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const existing = await prisma.pembicara.findUnique({
            where: { id: Number(id) },
        });

        if (!existing) {
            return res.status(404).json({ message: "Pembicara tidak ditemukan" });
        }

        await prisma.pembicara.delete({
            where: { id: Number(id) },
        });

        res.json({ message: "Pembicara berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus pembicara", error });
    }
};