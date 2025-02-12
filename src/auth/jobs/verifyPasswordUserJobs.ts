import { PrismaService } from "src/prisma/prisma.service";
import { verifyPasswordAuthDto } from "../dto/verifyPassword.dto";
import { UnauthorizedException } from "@nestjs/common";

export const verifyPasswordJobs = async (
    body: verifyPasswordAuthDto
): Promise<{
    success: boolean,
    status: number,
    message: string,
    data:any
}> =>{
    try {
        const prisma = new PrismaService();
        const bcrypt = require('bcryptjs');
        const {username, password} =body;
        
        const foundUser = await prisma.user.findUnique({
            where:{
                username: username,
            }
        });
        if(!foundUser){
            throw new UnauthorizedException({
                message:'user tidak ditemukan',
                status: false,
            });
        }
        const dataResultBcrypt = bcrypt.compareSync(body.password, foundUser.password);
        if(!dataResultBcrypt){
            throw new UnauthorizedException({
                message:'mohon inputkan username password yang benar!',
                status: false,
            });
        }
        const dataValid = {
            valid: true
        }
        const dataReturns = {
            success: true,
            status: 200,
            message: 'Succesfully !',
            data: dataValid
        }
        return dataReturns;
    } catch (error) {
        const dataReturns = {
            success: false,
            status: error.status,
            message: error.message,
            data: []
        }
        return dataReturns;
    }
}