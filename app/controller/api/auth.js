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
        // console.log(!Number.isInteger(password));
        if(password.length>6 || !Number.isInteger(password)){
            return res.status(400).json({
                status:"Fail!",
                message:"Password harus kurang dari 6 dan bertipe numeric!"
            })
        }
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
    },
    registerPageForm: async (req,res,next)=>{
        try {
            const{email,password,name,job_role,alamat}=req.body;
            const user= await prisma.user.findFirst({
                where:{email}
            })
            if(user){
               return res.redirect('/register')
            }
    
            const createUser=await prisma.user.create({
                data:{
                    email,
                    name,
                    alamat,
                    job_role,
                    password: await encryptPassword(password)
                }
            })
    
           
            return res.redirect('/login')
        } catch (error) {
            next(error)
        }
       
    },
    async loginPageForm(req,res,next){
     
        const {email,password}=req.body

        const user=await prisma.user.findFirst({
            where:{email}
        })
        if(!user){
            return res.redirect('/login')
        }
        const isPasswordCorrect=await checkPassword(
            password,user.password
        )
        if(!isPasswordCorrect){
            return res.redirect('/login')
        }

        delete user.password
        const token=await JWTsign(user)
        req.data=user
        // console.log(req.data.id)
        req.userListData=await prisma.list.findMany({
            where: {
                userId: +req.data.id,
            }
        })
        next()

    }
}