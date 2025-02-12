import { PrismaService } from "src/prisma/prisma.service"

export const getInvestmentJobs = async (): Promise<{
    success: boolean,
    status: number,
    message: string,
    data:any
}> =>{
    try {
        const prisma = new PrismaService();

        const data = await prisma.user.findMany({});
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