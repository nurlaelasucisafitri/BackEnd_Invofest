import { Request, Response } from "express";
import { Event } from "./../types/event"

let events: Event[] = [];

//1. menampilkam data event
export const getEvents = (req: Request, res: Response) => {
    res.json(events);
};

//2. menyimpan data event
export const createEvent = (req: Request, res: Response) => {
    const { name, date, location, description } = req.body;

    //buat validasi sederhana, jika name belum diisi
    if (!name || !date || !location) {
    res.status(500).json({ message: "Nama, Date dan Location harus diisi"})
    }

    //jika validasi berhasil
    const newEvent: Event = {
        id: Date.now(),
        name: name,
        date: date,
        location: location,
        description: description,
    };

    //jika sudah disusun, simpan ke array atau database
    events.push(newEvent);

    //jika data berhasil disimpan
    res.status(200).json({message: "Data berhasil disimpan", event: newEvent });
};

//3. menampilkan data event berdasarkan id
export const showEvent = (req: Request, res: Response) => {
    const { id } = req.params;
    
    // Cari satu data yang ID-nya cocok
    const cariEvent = events.find(e => e.id === Number(id));

    // Validasi kalau data tidak ada
    if (!cariEvent) {
        return res.status(404).json({ message: "Yah, data event nggak ketemu" });
    }

    // Kirim data yang ketemu
    res.json(cariEvent);
};

//4. mengupdate event berdasarkan id
export const updateEvent = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, date, location, description } = req.body;
    
    // Cari data di array berdasarkan ID
    const dataEvent = events.find(e => e.id === Number(id));

    // Kalau data tidak ketemu
    if (!dataEvent) {
        return res.status(404).json({ message: "Data event tidak ditemukan" });
    }

    // Update manual satu-satu biar gampang dibaca dosen
    if (name) dataEvent.name = name;
    if (date) dataEvent.date = date;
    if (location) dataEvent.location = location;
    if (description) dataEvent.description = description;

    res.json({ 
        message: "Data berhasil diupdate", 
        event: dataEvent 
    });
};

//5. menghapus event berdasarkan id
export const deleteEvent = (req: Request, res: Response) => {
    const { id } = req.params;

    // Cek dulu datanya ada apa nggak sebelum dihapus
    const dataAda = events.find(e => e.id === Number(id));

    if (!dataAda) {
        return res.status(404).json({ message: "Mau hapus tapi ID-nya nggak ada" });
    }

    // Filter array: simpan semua kecuali yang ID-nya mau dihapus
    events = events.filter(e => e.id !== Number(id));

    res.json({ message: "Data event berhasil dihapus ya!" });
};