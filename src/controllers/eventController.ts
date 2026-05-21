import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. Menampilkan semua events
export const getEvents = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany({
            orderBy: { id: "asc" },
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data event", error });
    }
};

// 2. Menyimpan event baru
export const createEvent = async (req: Request, res: Response) => {
    const { name, categoryId, location, dateEvent, description } = req.body;

    if (!name || !categoryId || !location || !dateEvent) {
        return res.status(400).json({ message: "name, categoryId, location, dan dateEvent harus diisi" });
    }

    try {
        const newEvent = await prisma.event.create({
            data: {
                name,
                categoryId: Number(categoryId),
                location,
                dateEvent: new Date(dateEvent),
                description: description || "",
                createdAt: new Date(),
            },
        });
        res.status(201).json({ message: "Data berhasil disimpan", event: newEvent });
    } catch (error) {
        res.status(500).json({ message: "Gagal menyimpan event", error });
    }
};

// 3. Menampilkan satu event berdasarkan id
export const showEvent = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const event = await prisma.event.findUnique({
            where: { id: Number(id) },
        });

        if (!event) {
            return res.status(404).json({ message: "Event tidak ditemukan" });
        }

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil event", error });
    }
};

// 4. Update event berdasarkan id
export const updateEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, categoryId, location, dateEvent, description } = req.body;

    try {
        const existing = await prisma.event.findUnique({
            where: { id: Number(id) },
        });

        if (!existing) {
            return res.status(404).json({ message: "Event tidak ditemukan" });
        }

        const updated = await prisma.event.update({
            where: { id: Number(id) },
            data: {
                ...(name && { name }),
                ...(categoryId && { categoryId: Number(categoryId) }),
                ...(location && { location }),
                ...(dateEvent && { dateEvent: new Date(dateEvent) }),
                ...(description !== undefined && { description }),
            },
        });

        res.json({ message: "Data event berhasil diupdate", event: updated });
    } catch (error) {
        res.status(500).json({ message: "Gagal mengupdate event", error });
    }
};

// 5. Hapus event berdasarkan id
export const deleteEvent = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const existing = await prisma.event.findUnique({
            where: { id: Number(id) },
        });

        if (!existing) {
            return res.status(404).json({ message: "Event tidak ditemukan" });
        }

        await prisma.event.delete({
            where: { id: Number(id) },
        });

        res.json({ message: "Event berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus event", error });
    }
};
