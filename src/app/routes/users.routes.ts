import { Router } from 'express';
import { authenticateUser, createUser, deleteUser, getUsers, updateUser } from '../controllers/users.controllers';

const userRouters = Router();
userRouters.get('/users', getUsers); 
userRouters.post('/users', createUser); 
userRouters.put('/users/:id', updateUser); 
userRouters.delete('/users/:id', deleteUser); 

userRouters.post('/users/authenticate', authenticateUser);

export default userRouters;