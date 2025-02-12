
export const generatePasswordJobs = async (
    password:string
): Promise<{
    success: boolean,
    status: number,
    message: string,
    data:any
}> =>{
    try {
        const bcrypt = require('bcryptjs');
    const saltRounds= 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    const passwordGenerate = {
        password: password,
        generate_password: hash
    }
        const dataReturns = {
            success: true,
            status: 200,
            message: 'Succesfully !',
            data: passwordGenerate
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