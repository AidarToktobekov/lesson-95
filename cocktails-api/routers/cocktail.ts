import express from 'express';
import Cocktail from '../models/Cocktail';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import mongoose from 'mongoose';
import { imagesUpload } from '../multer';

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', async(req, res, next)=>{
    try{
        const userId = req.query.user_id as string;
        if (userId){
            const cocktais = await Cocktail.find({user: userId});
            return res.send(cocktais);
        }else {
            const cocktais = await Cocktail.find(); 
            return res.send(cocktais);
        }
    }catch(e){
        next(e);
    }
});

cocktailsRouter.post('/', auth, imagesUpload.single('image'), async(req, res, next)=>{
    try{
        const user = (req as RequestWithUser).user;
        if (!user) {
            res.status(403).send({error: 'Unauthorized'});
        }
        
        const cocktailMutation = {
            name: req.body.name,
            user: user?._id,
            image: req.file?.filename,
            recipe: req.body.recipe,
            ingredients: JSON.parse(req.body.ingredients),
        }
        
        const cocktail = new Cocktail(cocktailMutation);
        cocktail.save();

        return res.send(cocktail);
    }catch(error){
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
})

cocktailsRouter.patch('/:id/togglePublished', auth, permit('admin'), async(req, res, next)=>{
    try{
        const cocktails = await Cocktail.findById(req.params.id);
        await Cocktail.findByIdAndUpdate(req.params.id, {isPublished: !cocktails?.isPublished});
        return res.send(cocktails);
    }catch(e){
        next(e);
    }
});


cocktailsRouter.delete('/:id', auth, permit('admin'), async(req, res, next)=>{
    try{
        const cocktail = await Cocktail.findByIdAndDelete(req.params.id);
        return res.send(cocktail);
    }catch(e){
        next(e);
    }
});

export default cocktailsRouter;
