const { PrismaClient}=require('@prisma/client')
const {encryptPassword,checkPassword}=require('../../../utils/auth')
const {JWTsign}=require('../../../utils/jwt')


const prisma = new PrismaClient();

module.exports={
    async login(req,res){
     
        const {email,password}=req.body

        const user=await prisma.user.findFirst({
            where:{email}
        })
        if(!user){
            return res.status(404).json({
                status:"Fail!",
                message:"Email tidak ditemukan!"
            })
        }
        const isPasswordCorrect=await checkPassword(
            password,user.password
        )
        if(!isPasswordCorrect){
            return res.status(401).json({
                status:"Fail!",
                message:"Password Salah"
            })
        }

        delete user.password
        const token=await JWTsign(user)
        return res.status(201).json({
            status:"Success!",
            message:"Berhasil Login!",
            data:{user,token},
        })
    },
    async whoami(req,res){
        return res.status(200).json({
            status:"Success",
            message:"OK",
            data:{
                user:req.user
            }
        })
    },
    async register(req,res){
        const{email,password,name,alamat,job_role}=req.body;
        const user= await prisma.user.findFirst({
            where:{email}
        })
        if(user){
            return res.status(404).json({
                status:"Fail!",
                message:"Email sudah terdaftar!"
            })
        }
        const createUser=await prisma.user.create({
            data:{
                email,
                alamat,
                job_role,
                name,
                password: await encryptPassword(password)
            }
        })

        return res.status(201).json({
            status:'success',
            code:200,
            message:'Berhasil Register!',
            data:createUser
        })
    }
}