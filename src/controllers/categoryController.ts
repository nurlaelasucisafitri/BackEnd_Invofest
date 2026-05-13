import { Request, Response } from "express";
import { Category } from "../types/category";

let categories: Category[] = [];

//1. menampilkan list categories
export const getCategories = (req: Request, res: Response) => {
    res.json(categories);
};

//2. menampilkan data category
export const createCategories = (req: Request, res: Response) => {
        const { name } = req.body;
    
        //buat validasi sederhana, jika name belum diisi
        if (!name ) {
        res.status(500).json({ message: "Nama harus diisi"})
        }
    
        //jika validasi berhasil
        const newCategories: Category = {
            id: Date.now(),
            name: name
        };
    
        //jika sudah disusun, simpan ke array atau database
        categories.push(newCategories);
    
        //jika data berhasil disimpan
        res.status(200).json({message: "Data berhasil disimpan", categories: newCategories });
    };

//3. menampilkan data category berdasarkan id
export const showCategories = (req: Request, res: Response) => {
    const { id } = req.params;
    
    // Cari kategori yang ID-nya pas
    const ketemuCategory = categories.find(c => c.id === Number(id));

    // Validasi kalau nggak ketemu
    if (!ketemuCategory) {
        return res.status(404).json({ message: "Kategori nggak ada nih" });
    }

    res.json(ketemuCategory);
};

//4. mengupdate category berdasarkan id
export const updateCategories = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    
    // Cari datanya dulu
    const dataCategory = categories.find(c => c.id === Number(id));

    if (!dataCategory) {
        return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }

    // Update manual namanya saja
    if (name) dataCategory.name = name;

    res.json({ 
        message: "Kategori berhasil diubah", 
        categories: dataCategory 
    });
};

//5. menghapus category berdasarkan id
export const deleteCategories = (req: Request, res: Response) => {
    const { id } = req.params;

    // Cek dulu biar nggak asal hapus
    const cekAda = categories.find(c => c.id === Number(id));

    if (!cekAda) {
        return res.status(404).json({ message: "ID kategori salah, nggak bisa hapus" });
    }

    // Buang yang ID-nya dipilih
    categories = categories.filter(c => c.id !== Number(id));

    res.json({ message: "Kategori sudah terhapus!" });
};
