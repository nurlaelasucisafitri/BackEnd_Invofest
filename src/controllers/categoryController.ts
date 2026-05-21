import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. Menampilkan semua categories
export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { id: "asc" },
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data kategori", error });
    }
};

// 2. Menyimpan category baru
export const createCategories = async (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Nama harus diisi" });
    }

    try {
        const newCategory = await prisma.category.create({
            data: {
                name,
                createdAt: new Date(),
            },
        });
        res.status(201).json({ message: "Data berhasil disimpan", category: newCategory });
    } catch (error) {
        res.status(500).json({ message: "Gagal menyimpan kategori", error });
    }
};

// 3. Menampilkan satu category berdasarkan id
export const showCategories = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const category = await prisma.category.findUnique({
            where: { id: Number(id) },
        });

        if (!category) {
            return res.status(404).json({ message: "Kategori tidak ditemukan" });
        }

        res.json(category);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil kategori", error });
    }
};

// 4. Update category berdasarkan id
export const updateCategories = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const existing = await prisma.category.findUnique({
            where: { id: Number(id) },
        });

        if (!existing) {
            return res.status(404).json({ message: "Kategori tidak ditemukan" });
        }

        const updated = await prisma.category.update({
            where: { id: Number(id) },
            data: { name },
        });

        res.json({ message: "Kategori berhasil diubah", category: updated });
    } catch (error) {
        res.status(500).json({ message: "Gagal mengupdate kategori", error });
    }
};

// 5. Hapus category berdasarkan id
export const deleteCategories = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const existing = await prisma.category.findUnique({
            where: { id: Number(id) },
        });

        if (!existing) {
            return res.status(404).json({ message: "Kategori tidak ditemukan" });
        }

        await prisma.category.delete({
            where: { id: Number(id) },
        });

        res.json({ message: "Kategori berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus kategori", error });
    }
};
