import mongoose, { Types } from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;

const CoctailSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        validate: {
            validator: async(value: Types.ObjectId)=>{
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: 'User does not exist!',
        }
    },
    image: {
        type: String,
        required: true,
    },
    recipe: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
        required: true,
    },
    ingredients: {
        type: [{
            name: String,
            quantity: String,
        }],
        required: true,
    }
});

const Cocktail = mongoose.model('Cocktail', CoctailSchema);

export default Cocktail;