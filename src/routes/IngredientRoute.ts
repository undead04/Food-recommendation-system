
import { authenticateToken } from "../Middlewares/Auth";
import NotFoundHandle from "../Middlewares/NotFoundHandle";
import ValidateErrorDTO from "../Middlewares/ValidateErrorDTO";
import AppRole from "../models/modelRequest/AppRole";
import { DeleteModel } from "../models/modelRequest/DeleteModel";
import express  from 'express';
import { IngredinetModel } from "../models/modelRequest/IngredientModel";
import { Ingredient } from "../entitys/Ingredient";
import IngredientController from "../controllers/IngredientController";
const validateDTORemove = new ValidateErrorDTO(DeleteModel)
const validateDTO = new ValidateErrorDTO(IngredinetModel)
const validateNotFound = new NotFoundHandle(Ingredient,'ingredient','nguyên liệu')
const ingredientController = new IngredientController()
const router = express.Router()

router.get('/',ingredientController.getFilter)
router.get('/:id'
  ,ingredientController.getById)
router.post('/'
  ,authenticateToken([AppRole.Admin])
  ,validateDTO.ValidateError
  ,ingredientController.create)

router.post('/createArray'
  ,authenticateToken([AppRole.Admin])
  ,validateDTO.ValidateError
  ,ingredientController.createArray
)
router.put('/:id'
  ,authenticateToken([AppRole.Admin])
  ,validateNotFound.IsNotFound
  ,validateDTO.ValidateError
  ,ingredientController.update
)
router.delete('/:id'
  ,authenticateToken([AppRole.Admin])
  ,ingredientController.remove
)
router.delete('/'
  ,authenticateToken([AppRole.Admin])
  ,validateDTORemove.ValidateError
  ,validateNotFound.IsNotFoundArray
  ,ingredientController.removeArray
)


router
export default router