import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../lib/db.js";

// 1. Menampilkan semua users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: { id: "asc" },
            select: {
                id: true,
                name: true,
                email: true,
                foto: true,
            },
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data user", error });
    }
};

// 2. Menampilkan satu user berdasarkan id
export const showUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                name: true,
                email: true,
                foto: true,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil user", error });
    }
};

// 3. Membuat user baru
export const createUser = async (req: Request, res: Response) => {
    const { name, email, password, foto } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Nama, email, dan password harus diisi" });
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "Email sudah digunakan" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                foto: foto || "",
            },
        });

        res.status(201).json({
            message: "User berhasil dibuat",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                foto: newUser.foto,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal membuat user", error });
    }
};

// 4. Update user berdasarkan id
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password, foto } = req.body;

    try {
        const existing = await prisma.user.findUnique({ where: { id: Number(id) } });
        if (!existing) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        // Kalau email diubah, cek apakah sudah dipakai user lain
        if (email && email !== existing.email) {
            const emailTaken = await prisma.user.findUnique({ where: { email } });
            if (emailTaken) {
                return res.status(409).json({ message: "Email sudah digunakan" });
            }
        }

        // Kalau password diubah, hash dulu
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updated = await prisma.user.update({
            where: { id: Number(id) },
            data: {
                ...(name && { name }),
                ...(email && { email }),
                ...(hashedPassword && { password: hashedPassword }),
                ...(foto !== undefined && { foto }),
            },
        });

        res.json({
            message: "User berhasil diupdate",
            user: {
                id: updated.id,
                name: updated.name,
                email: updated.email,
                foto: updated.foto,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal mengupdate user", error });
    }
};

// 5. Hapus user berdasarkan id
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const existing = await prisma.user.findUnique({ where: { id: Number(id) } });
        if (!existing) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        await prisma.user.delete({ where: { id: Number(id) } });

        res.json({ message: "User berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus user", error });
    }
};
