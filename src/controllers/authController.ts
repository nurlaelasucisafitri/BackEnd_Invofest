import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/db.js";

export const login = async(req: Request, res: Response) => {
    const {email, password} = req.body;

    if(!email || !password ){
        return res.status(400)
        .json({message: 'Email dan password harus diisi'});
    }

    const existingUser = await prisma.user.findUnique({
        where:{ email }
    })

    if (!existingUser) {
        return res.status(401)
        .json({message: "Email tidak ditemukan"});
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
        return res.status(400)
        .json({message: "Password salah"});
    }

    const token = jwt.sign(
        { id: existingUser.id, email: existingUser.email },
        process.env.JWT_SECRET || "secret123",
        { expiresIn: "1d" }
    );

    res.status(200).json({
        message: "Login berhasil",
        token,
        user: {
            name: existingUser.name,
            email: existingUser.email,
        }
    });
}

export const register = async(req: Request, res: Response) => {
    try {
        const {name, email, password, foto} = req.body;

        if(!name || !email || !password || !foto){
            return res.status(400)
            .json({message: 'Nama, email, dan password harus diisi'});
        }

        const existingUser = await prisma.user.findUnique({
            where:{ email }
        })

        if (existingUser) {
            return res.status(409).json({
                message: "Email sudah digunakan",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword, foto }
        })

        return res.status(201).json({
            message: "Register berhasil",
            data: { 
                id: newUser.id, 
                email: newUser.email, 
                name: newUser.name,
                foto: newUser.foto
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan server",
        });
    }
};