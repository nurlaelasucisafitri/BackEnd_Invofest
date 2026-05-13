import { Request, Response } from "express";
import { Pembicara } from "../types/pembicara";

let pembicara: Pembicara[] = [];

// 1. Menampilkan list pembicara
export const getPembicara = (req: Request, res: Response) => {
    res.json(pembicara);
};

// 2. Menambah data pembicara
export const createPembicara = (req: Request, res: Response) => {
    const { name, role, foto } = req.body;

    // Validasi
    if (!name || !role) {
        return res.status(400).json({ message: "Nama dan Role harus diisi" });
    }

    const newPembicara: Pembicara = {
        id: Date.now(),
        name: name,
        role: role,
        foto: foto || ""
    };

    pembicara.push(newPembicara);
    res.status(200).json({ message: "Data berhasil disimpan", pembicara: newPembicara });
};

// 5. Menghapus pembicara berdasarkan id
export const deletePembicara = (req: Request, res: Response) => {
    const { id } = req.params;
    
    // Pastikan ID diubah ke Number
    const initialLength = pembicara.length;
    pembicara = pembicara.filter(p => p.id !== Number(id));

    if (pembicara.length === initialLength) {
        return res.status(404).json({ message: "ID tidak ditemukan" });
    }

    res.json({ message: "Data berhasil dihapus" });
};