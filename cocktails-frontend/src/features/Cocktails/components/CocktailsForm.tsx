import { useNavigate } from "react-router-dom";
import FileInput from "../../../UI/FileInput/FileInput";
import { useAppDispatch } from "../../../app/hooks";
import { ChangeEvent, useState } from "react";

const CocktailsForm = ()=>{
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [state, setState] = useState({
        name: '',
        ingredients: [
            {
                name: '',
                quantity: '',
            }
        ],
        recipe: '',
        image: null,
    });

    const submitFormHandler = (event: React.FormEvent) => {
        event.preventDefault();        
        console.log(state);
        
        // dispatch(createCoctails(state));
        navigate('/');
    };
    
    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setState((prevState) => ({
          ...prevState,
          [name]: value,
    }))};

    const addIngredient = ()=>{
        const ingredients = state.ingredients;
        ingredients.push({
            name: '',
            quantity: '',
        })
        setState((prev) => ({
            ...prev,
            ingredients,
        }))
    }

    const deleteIngredient = (index: number)=>{
        const ingredients = state.ingredients;
        ingredients.splice(index, 1)
        setState((prev) => ({
            ...prev,
            ingredients,
        }))
    }

    const ingredientChange = (event: ChangeEvent<HTMLInputElement>, type: string ,index: number)=>{
        const ingredients = state.ingredients;
        if (type === 'name') {
            ingredients[index].name = event.target.value;
        }
        else{
            ingredients[index].quantity = event.target.value;
        }
        setState(prev=>({
            ...prev,
            ingredients,
        }));
    }

    const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = event.target;
        const value = files && files[0] ? files[0] : null;
    
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };

    return(
        <>
            <form onSubmit={submitFormHandler}>
                <div>
                    <div className="mb-3"> 
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" required onChange={inputChangeHandler} name="name"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Ingredients</label>
                        {state.ingredients.map((ingredient, index)=>{
                            return(
                                <div key={index} className="mb-3 d-flex gap-3">
                                    <input type="text" required className="form-control" placeholder="ingredient" name="name" onChange={(event: ChangeEvent<HTMLInputElement>)=>ingredientChange(event, 'name', index)} value={ingredient.name}/>
                                    <input type="number" required min={1} className="form-control" name="quantity" placeholder="quantity" onChange={(event: ChangeEvent<HTMLInputElement>)=>ingredientChange(event, 'quantity', index)} value={ingredient.quantity}/>
                                    <button onClick={()=>deleteIngredient(index)} disabled={index === 0} className="btn btn-danger">Delete</button>
                                </div>
                            )
                        })}
                        <button className="btn btn-dark" type="button" onClick={addIngredient}>Add ingredient</button>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Recipe</label>
                        <textarea className="form-control" required onChange={inputChangeHandler} name="recipe"></textarea>
                    </div>
                    <div className="mb-3">
                        <FileInput onChange={fileInputChangeHandler} name="image" label="Image"></FileInput>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CocktailsForm;