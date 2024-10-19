import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCocktails, selectCocktailsLoading } from "./coctailsSlice";
import { fetchCocktails } from "./cocktailsThunk";
import { CircularProgress } from "@mui/material";
import { selectUser } from "../User/userSlice";
import CocktailItem from "./components/CocktailItem";

const Cocktails = ()=>{
    const dispatch = useAppDispatch();
    const coctails = useAppSelector(selectCocktails);
    const loading = useAppSelector(selectCocktailsLoading);
    const user = useAppSelector(selectUser);
    
    let content: React.ReactNode = (
        <h5 className="text-center my-5">
            The cocktail list is empty.
        </h5>
    );
    
    if (coctails.length > 0) {
        content = coctails.map((cocktail)=>{
            if (user?.role === 'admin') {
                return(
                    <CocktailItem key={cocktail._id} user={cocktail.user} recipe={cocktail.recipe} ingredients={cocktail.ingredients} isPublished={cocktail.isPublished} image={cocktail.image} name={cocktail.name} _id={cocktail._id}/>
                )
            }
            if(cocktail.isPublished){
                return(
                    <CocktailItem key={cocktail._id} user={cocktail.user} recipe={cocktail.recipe} ingredients={cocktail.ingredients} isPublished={cocktail.isPublished} image={cocktail.image} name={cocktail.name} _id={cocktail._id}/>
                )
            }else{
                return(
                    <h5 key={cocktail._id} className="text-center my-5">
                        The cocktail list is empty.
                    </h5>
                )
            }
        })
    }
    
    
        useEffect(()=>{
            dispatch(fetchCocktails());
        }, [dispatch]);
    
    return(
        <>  
            <h3 className="text-center my-5">Cocktails</h3>
            {loading? (
                <CircularProgress></CircularProgress>
            ) : (
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                    {content}
                </div>
            )}
        </>
    );
}

export default Cocktails;