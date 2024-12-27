import CategoryController from "../controllers/CategoryController";
import { Category } from "../entitys/Category";
import { authenticateToken } from "../Middlewares/Auth";
import NotFoundHandle from "../Middlewares/NotFoundHandle";
import ValidateErrorDTO from "../Middlewares/ValidateErrorDTO";
import AppRole from "../models/modelRequest/AppRole";
import { CategoryModel } from "../models/modelRequest/CategoryModel";
import { DeleteModel } from "../models/modelRequest/DeleteModel";
import express  from 'express';
const validateDTORemove = new ValidateErrorDTO(DeleteModel)
const validateDTO = new ValidateErrorDTO(CategoryModel)
const validateNotFound = new NotFoundHandle(Category,'category','thể loại đồ ăn')
const categoryController = new CategoryController()
const router = express.Router()

router.get('/',categoryController.getFilter)
router.get('/:id'
  ,categoryController.getById)
router.post('/'
  ,authenticateToken([AppRole.Admin])
  ,validateDTO.ValidateError
  ,categoryController.create)

router.post('/createArray'
  ,authenticateToken([AppRole.Admin])
  ,validateDTO.ValidateError
  ,categoryController.createArray
)
router.put('/:id'
  ,authenticateToken([AppRole.Admin])
  ,validateNotFound.IsNotFound
  ,validateDTO.ValidateError
  ,categoryController.update
)
router.delete('/:id'
  ,authenticateToken([AppRole.Admin])
  ,categoryController.remove
)
router.delete('/'
  ,authenticateToken([AppRole.Admin])
  ,validateDTORemove.ValidateError
  ,validateNotFound.IsNotFoundArray
  ,categoryController.removeArray
)


router
export default router