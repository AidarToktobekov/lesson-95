import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../User/userSlice";
import { deleteCocktails, fetchCocktail, publishCocktails } from "./cocktailsThunk";
import { useEffect } from "react";
import { selectCocktail } from "./coctailsSlice";
import { API_URL } from "../../constants";

const OneCocktail = ()=>{
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const cocktail = useAppSelector(selectCocktail);

    useEffect(()=>{
        if (id) {
            dispatch(fetchCocktail(id));
        }
    },[dispatch]);

    const deleteCocktail = ()=>{
        if (id) {
            dispatch(deleteCocktails(id));
        }
        navigate('/');
    }
    const publishCocktail = ()=>{
        if (id) {
            dispatch(publishCocktails(id));
        }
        navigate('/');
    }

    return(
        <>
            <h3 className="text-center my-4">
                {cocktail?.name}
            </h3>
            <div className="mb-3" style={{width: '100px'}}>
                <img src={`${API_URL}/images/${cocktail?.image}`} alt="#"className="w-100"/>
            </div>
            <div className="mb-3">
                {cocktail?.ingredients.map((ingredient)=>{
                    return(
                        <div>
                            {ingredient.name} - {ingredient.quantity}
                        </div>
                    )
                })}
            </div>
            <div className="mb-3">
                {cocktail?.recipe}
            </div>

         {user?.role === 'admin'? (
                <>
                    <button onClick={deleteCocktail} className="btn btn-danger">
                        Delete
                    </button>
                    {cocktail?.isPublished? (
                        null
                    ):(
                        <button onClick={publishCocktail} className="btn btn-primary">
                            Publish
                        </button>
                    )}
                </>
            ):(
                null
            )}
        </>
    )
}

export default OneCocktail;