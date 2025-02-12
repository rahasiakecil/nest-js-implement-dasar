import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service"
import { loginAuthDto } from "../dto/login.dto";

export const validateUserJobs = async (
    body: loginAuthDto
): Promise<{
    success: boolean,
    status: number,
    message: string,
    data:User
}> =>{
    try {
        const prisma = new PrismaService();

        const data = await prisma.user.findUnique({
            where:{
                username: body.username,
            }
        });
        const dataReturns = {
            success: true,
            status: 200,
            message: 'Succesfully !',
            data: data
        }
        return dataReturns;
    } catch (error) {
        const dataReturns = {
            success: false,
            status: error.status,
            message: error.message,
            data: null
        }
        return dataReturns;
    }
}