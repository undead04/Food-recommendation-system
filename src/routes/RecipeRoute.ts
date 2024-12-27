
import { authenticateToken } from "../Middlewares/Auth";
import NotFoundHandle from "../Middlewares/NotFoundHandle";
import ValidateErrorDTO from "../Middlewares/ValidateErrorDTO";
import AppRole from "../models/modelRequest/AppRole";
import { DeleteModel } from "../models/modelRequest/DeleteModel";
import express  from 'express';
import { RecipeModel } from "../models/modelRequest/RecipeModel";
import { Recipe } from '../entitys/Recipe';
import RecipeController from "../controllers/RecipeController";
const validateDTORemove = new ValidateErrorDTO(DeleteModel)
const validateDTO = new ValidateErrorDTO(RecipeModel)
const validateNotFound = new NotFoundHandle(Recipe,'recipe','đồ ăn')
const recipeController = new RecipeController()
const router = express.Router()

router.get('/',recipeController.getFilter)
router.get('/hint',recipeController.hintRecipe)
router.get('/:id'
  ,recipeController.getById)
router.post('/'
  ,authenticateToken([AppRole.Admin])
  ,validateDTO.ValidateError
  ,recipeController.create)

router.put('/:id'
  ,authenticateToken([AppRole.Admin])
  ,validateNotFound.IsNotFound
  ,validateDTO.ValidateError
  ,recipeController.update
)
router.delete('/:id'
  ,authenticateToken([AppRole.Admin])
  ,recipeController.remove
)
router.delete('/'
  ,authenticateToken([AppRole.Admin])
  ,validateDTORemove.ValidateError
  ,validateNotFound.IsNotFoundArray
  ,recipeController.removeArray
)


router
export default router