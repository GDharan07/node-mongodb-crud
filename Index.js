const express=require('express')
const app=express();
const mongoose=require('mongoose')

const collections=require('./models/schema')
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/collections',{
  useNewUrlParser:true,useUnifiedTopology:true
},(err)=>{
  if (err){
    console.log(err)
  }else{
    console.log('DB Connected')
  }
})



app.get('/', async(req,res)=>{
  const collt= await collections.find()
   res.json(collt)
} )
app.get('/:id', async(req,res)=>{
  const collt= await collections.findById(req.params.id)
   res.json(collt)
} )

app.post('/', async(req,res)=>{
  const collt= await new collections({
    email:req.body.email,
    password:req.body.password

  })
  collt.save();
  res.json('added successfully')
})

app.put('/:id', async(req,res)=>{
  const collt= await collections.findById(req.params.id)

  collt.email=req.body.email,
  collt.password=req.body.password
 
collt.save();
res.json('Updated sucessfully')
})

app.delete('/:id', async(req,res)=>{
  await collections.findByIdAndDelete(req.params.id)
  res.json('deleted')
})

app.listen(8080,()=>{
console.log('Sever Started')
})