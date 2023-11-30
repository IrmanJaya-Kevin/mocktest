const { PrismaClient}=require('@prisma/client')

const prisma = new PrismaClient();


module.exports = {
    async destroy(req, res){
        if(!req.params.listId) res.status(400).json({ 
            status: 'fail', 
            code: 400, 
            message: 'List id tidak ada!!',
        })
        listId=req.params.listId;
        const list = await prisma.list.delete({
            where: {
              id: +listId,
            },
          })
        if(list){
            res.status(200).json({ 
                status: 'success', 
                code: 200, 
                message: 'Success Data terhapus!',
            })
        }
    },
    async create(req,res){
        try {
            const{userId,to_do,status}=req.body;
            const createList=await prisma.list.create({
                data:{
                    userId,
                    to_do,
                    status,
                }
            })
            if(createList){
                return res.status(201).json({ 
                    status: 'success', 
                    code: 200, 
                    message: 'Data ditambahkan!',
                    data: createList
                })
            }
        } catch (error) {
            return res.status(400).json({ 
                status: 'success', 
                code: 400, 
                message: 'Data gagal ditambahkan!',
            })
        }
    }
   
}