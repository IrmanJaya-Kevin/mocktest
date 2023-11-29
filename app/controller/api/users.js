const { PrismaClient}=require('@prisma/client')

const prisma = new PrismaClient();


module.exports = {
    async get(req, res){
        const user=await prisma.user.findMany()
      
        if(!user.length) return res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data Kosong'
        })

       return res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Berhasil!',
            data: user
        })
    },
    async getById(req, res){
        if(!req.params.userId) res.status(400).json({ 
            status: 'fail', 
            code: 400, 
            message: 'User id tidak ada!!',
        })
        const user = await prisma.user.findFirst({
            where: {
                id: +req.params.userId,
            },
            include:{
                profile:true
            }
        })
  
        if(!user) return res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data Kosong'
        })
        return res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Berhasil!',
            data: user
        })

    },
    async destroy(req, res){
        if(!req.params.userId) res.status(400).json({ 
            status: 'fail', 
            code: 400, 
            message: 'User id tidak ada!!',
        })
        userId=req.params.userId;
        const user = await prisma.user.delete({
            where: {
              id: +userId,
            },
          })
        if(user){
            res.status(200).json({ 
                status: 'success', 
                code: 200, 
                message: 'Success Data terhapus!',
            })
        }
    }
   
}