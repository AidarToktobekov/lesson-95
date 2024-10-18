import { NavLink } from "react-router-dom";
import { ICocktail } from "../../../types";
import { API_URL } from "../../../constants";

const CocktailItem: React.FC<ICocktail> = ({_id, name, image})=>{
    return(
        <NavLink to={`/cocktails/${_id}`} style={{maxWidth: '400px', minWidth: '300px'}} className="d-flex border border-2 align-items-center rounded-3 p-2 text-dark">
            <div style={{width: '100px', height: '100px'}}>
                <img src={`${API_URL}/images/${image}`} alt="#"className="w-100"/>
            </div>
            <div className="ms-4">
                {name}
            </div>
        </NavLink>
    )
}

export default CocktailItem;