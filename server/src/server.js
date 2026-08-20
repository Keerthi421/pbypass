import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {problems,users,state} from './data.js';

const app=express(); const PORT=process.env.PORT||4000; const SECRET=process.env.JWT_SECRET||'dev-secret-change-me';
app.use(cors()); app.use(express.json());
const key=id=>String(id);
function auth(req,res,next){const h=req.headers.authorization||'';const token=h.replace('Bearer ','');try{req.user=jwt.verify(token,SECRET);next()}catch{return res.status(401).json({error:'Unauthorized'})}}
function publicProblem(p,user){const allowed=!p.premium||user?.plan==='premium';return {...p,solution:allowed?p.solution:undefined,locked:!allowed};}
app.get('/health',(req,res)=>res.json({ok:true}));
app.post('/api/auth/register',async(req,res)=>{const {name,email,password}=req.body;if(!name||!email||!password)return res.status(400).json({error:'name, email and password required'});if(users.has(email))return res.status(409).json({error:'User exists'});const passwordHash=await bcrypt.hash(password,10);const user={id:crypto.randomUUID(),name,email,passwordHash,plan:'free',createdAt:new Date().toISOString()};users.set(email,user);const token=jwt.sign({id:user.id,email:user.email,plan:user.plan},SECRET,{expiresIn:'7d'});res.status(201).json({token,user:{id:user.id,name,email,plan:user.plan}})});
app.post('/api/auth/login',async(req,res)=>{const {email,password}=req.body;const user=users.get(email);if(!user||!await bcrypt.compare(password,user.passwordHash))return res.status(401).json({error:'Invalid credentials'});const token=jwt.sign({id:user.id,email:user.email,plan:user.plan},SECRET,{expiresIn:'7d'});res.json({token,user:{id:user.id,name:user.name,email,plan:user.plan}})});
app.get('/api/profile',auth,(req,res)=>{const user=[...users.values()].find(x=>x.id===req.user.id);res.json({id:user.id,name:user.name,email:user.email,plan:user.plan})});
app.get('/api/subscription',auth,(req,res)=>res.json({plan:req.user.plan,isActive:req.user.plan==='premium'}));
app.post('/api/demo/plan',auth,(req,res)=>{const user=[...users.values()].find(x=>x.id===req.user.id);const plan=req.body.plan==='premium'?'premium':'free';user.plan=plan;res.json({plan})});
app.get('/api/problems',auth,(req,res)=>res.json(problems.map(p=>publicProblem(p,req.user))));
app.get('/api/problems/:id',auth,(req,res)=>{const p=problems.find(x=>x.id===req.params.id);if(!p)return res.status(404).json({error:'Not found'});res.json(publicProblem(p,req.user))});
app.get('/api/bookmarks',auth,(req,res)=>res.json([... (state.bookmarks.get(key(req.user.id))||new Set())]));
app.post('/api/bookmarks/:id',auth,(req,res)=>{const id=key(req.user.id);const set=state.bookmarks.get(id)||new Set();set.has(req.params.id)?set.delete(req.params.id):set.add(req.params.id);state.bookmarks.set(id,set);res.json({bookmarked:set.has(req.params.id)})});
app.get('/api/progress',auth,(req,res)=>res.json([... (state.progress.get(key(req.user.id))||new Map()).values()]));
app.put('/api/progress/:id',auth,(req,res)=>{const id=key(req.user.id),m=state.progress.get(id)||new Map();const value={problemId:req.params.id,status:req.body.status||'in_progress',updatedAt:new Date().toISOString()};m.set(req.params.id,value);state.progress.set(id,m);res.json(value)});
app.get('/api/workspaces/:id',auth,(req,res)=>res.json(state.workspaces.get(key(req.user.id)+':'+req.params.id)||{nodes:[],edges:[],notes:''}));
app.put('/api/workspaces/:id',auth,(req,res)=>{const value={nodes:req.body.nodes||[],edges:req.body.edges||[],notes:req.body.notes||'',updatedAt:new Date().toISOString()};state.workspaces.set(key(req.user.id)+':'+req.params.id,value);res.json(value)});
app.listen(PORT,()=>console.log(`InterviewForge API listening on ${PORT}`));
