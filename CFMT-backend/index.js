const express = require('express');
const cors = require('cors');
const CompanyFunding = require('./firebase-fonfig5');
const { stringify } = require('nodemon/lib/utils');
const app = express();

app.use(express.json());


app.use(cors());
app.use(express.static(process.cwd()+"/cfmt-ui/"));

app.get('/', (req,res) => {
    res.sendFile(process.cwd()+"/cfmt-ui/index.html")
  });
  app.get('/charts', (req,res) => {
    res.sendFile(process.cwd()+"/cfmt-ui/index.html")
  });
  app.get('/table', (req,res) => {
    res.sendFile(process.cwd()+"/cfmt-ui/index.html")
  });

app.get("/api/", async(req,res)=>{
    const snapshot = await CompanyFunding.get()
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ... doc.data()}))
    res.send(list)
    console.log(Object.keys(list).length)
})
app.get("/api/category-pie", async(req,res)=>{
    const snapshot = await CompanyFunding.get()
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ... doc.data()}))
    let map = new Map()
    for (let i = 0; i<list.length;i++){
        const category = list[i].category;
        if(list[i].category=="hardware")
        {
            console.log("raisedAmt",list[i].raisedAmt)
        }
        console.log(i.category);
        if(!map.has(category)){
            map.set(category,{count: 1, funding: list[i].raisedAmt});
        }
        else{
            map.get(category).count++;
            map.get(category).funding =  Number(map.get(category).funding) + Number(list[i].raisedAmt);
        }
    }
   
    const obj = Object.fromEntries(map);
    console.log(map)
    res.send(obj)
})

app.get("/api/state-pie", async(req,res)=>{
    const snapshot = await CompanyFunding.get()
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ... doc.data()}))
    let map = new Map()
    for (let i = 0; i<list.length;i++){
        const state = list[i].state;
        if(!map.has(state)){
            map.set(state,{count: 1, funding: list[i].raisedAmt});
        }
        else{
            map.get(state).count++;
            map.get(state).funding =  Number(map.get(state).funding) + Number(list[i].raisedAmt);
        }
    }
   
    const obj = Object.fromEntries(map);
    console.log(map)
    res.send(obj)
})
app.get("/api/date-bar", async(req,res)=>{
    const snapshot = await CompanyFunding.get()
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ... doc.data()}))
    let map = new Map()
    for (let i = 0; i<list.length;i++){
        const date = list[i].fundedDate;
        if(!map.has(date)){
            map.set(date,{count: 1, funding: list[i].raisedAmt});
        }
        else{
            map.get(date).count++;
            map.get(date).funding =  Number(map.get(date).funding) + Number(list[i].raisedAmt);
        }
    }
   
    const obj = Object.fromEntries(map);
    console.log(map)
    res.send(obj)
})

app.get("/api/round", async(req,res)=>{
    const snapshot = await CompanyFunding.get()
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ... doc.data()}))
    let map = []
    for (let i = 0; i<list.length;i++){
        const round = list[i].round;
        if(map.indexOf(round)==-1){
            map.push(round);
        }
        else{
            
        }
    }
   
    
    res.send(map)
})

app.post("/api/create", async(req,res)=>{
    const data = req.body
    await CompanyFunding.add(data)
    console.log(data);
    res.send({msg: "user added"})
})
app.post("/api/update", async(req,res)=>{
    const id = req.body.id;
    delete req.body.id
    await CompanyFunding.doc(id).update(req.body);
    console.log(req.body);
    res.send({msg: "user updated"})
})
app.post("/api/delete", async(req,res)=>{
    const id = req.body.id;
    await CompanyFunding.doc(id).delete();
    res.send({msg: "user deleted"})
})

app.post("/api/roundwise", async(req,res)=>{
    const round = req.body.round
    console.log(req);
    const snapshot = await CompanyFunding.where('round', '==', round).get();;
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ... doc.data()}))
    res.send(list)
    console.log(Object.keys(list).length)

})

app.listen(4000,()=> console.log("server up at port 4000"));