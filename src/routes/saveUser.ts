import express from 'express'
import { prisma } from "../config/prismaClient";

const router = express.Router()

router.post("/", async (req, res) => {
    const { id, image, email, name } = req.body

    try {
        const user = await prisma.user.upsert({
            where: { email },
            update: { image, FullName: name },
            create: {
                userId: id,
                email,
                image,
                FullName: name,
                isGoogle: true
            }
        });

        const newuser: boolean = user.createdAt === user.updatedAt ? true : false

        res.status(200).json({
            success: true,
            message: "Login/SignUp successful",
            newUser: newuser,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login/SignUp unsuccessful",
        })
    }
})

export default router