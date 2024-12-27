
import { authenticateToken } from "../Middlewares/Auth";
import NotFoundHandle from "../Middlewares/NotFoundHandle";
import ValidateErrorDTO from "../Middlewares/ValidateErrorDTO";
import AppRole from "../models/modelRequest/AppRole";
import { DeleteModel } from "../models/modelRequest/DeleteModel";
import express  from 'express';
import { FavouriteModel } from "../models/modelRequest/FavouriteModel";
import { RecipeUser } from "../entitys/Recipe_User";
import FavouriteController from "../controllers/FavouriteController";
const validateDTORemove = new ValidateErrorDTO(DeleteModel)
const validateDTO = new ValidateErrorDTO(FavouriteModel)
const validateNotFound = new NotFoundHandle(RecipeUser,'recipeUser','Yêu thích')
const favouriteController = new FavouriteController()
const router = express.Router()

router.get('/'
    ,authenticateToken()
    ,favouriteController.getFilter)

router.get('/:id'
  ,authenticateToken()
  ,favouriteController.getById)

router.post('/'
  ,authenticateToken([AppRole.Admin])
  ,validateDTO.ValidateError
  ,favouriteController.create)

router.delete('/:id'
  ,authenticateToken([AppRole.Admin])
  ,favouriteController.remove
)

router.delete('/'
  ,authenticateToken([AppRole.Admin])
  ,validateDTORemove.ValidateError
  ,validateNotFound.IsNotFoundArray
  ,favouriteController.removeArray
)

export default router