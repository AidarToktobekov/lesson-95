import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCocktails, selectCocktailsLoading } from "./coctailsSlice";
import { useEffect } from "react";
import { fetchCocktails } from "./cocktailsThunk";
import { CircularProgress } from "@mui/material";
import CocktailItem from "./components/CocktailItem";

const MyCocktails = ()=>{

    const cocktails = useAppSelector(selectCocktails);
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectCocktailsLoading)
    const {id} = useParams();

    useEffect(()=>{
        dispatch(fetchCocktails(id));
    }, [])

    let content: React.ReactNode = (
        <h5 className="text-center my-5">
            The cocktail list is empty.
        </h5>
    );
    
    if (cocktails.length > 0) {
        content = cocktails.map((cocktail)=>{
            return(
                <CocktailItem key={cocktail._id} user={cocktail.user} recipe={cocktail.recipe} ingredients={cocktail.ingredients} isPublished={cocktail.isPublished} image={cocktail.image} name={cocktail.name} _id={cocktail._id}/>
            )
        })
    }

    return(
        <>
            <h3 className="text-center my-3">
                My Cocktails
            </h3>
            {loading? (
                <CircularProgress></CircularProgress>
            ) : (
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                    {content}
                </div>
            )}
        </>
    )
}

export default MyCocktails;