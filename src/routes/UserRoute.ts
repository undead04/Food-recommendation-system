
import UserController from "../controllers/UserController";
import { User } from "../entitys/User";
import { authenticateToken } from "../Middlewares/Auth";
import NotFoundHandle from "../Middlewares/NotFoundHandle";
import ValidateErrorDTO from "../Middlewares/ValidateErrorDTO";
import AppRole from "../models/modelRequest/AppRole";
import { DeleteModel } from "../models/modelRequest/DeleteModel";
import express  from 'express';
const validateDTORemove = new ValidateErrorDTO(DeleteModel)

const validateNotFound = new NotFoundHandle(User,'user','người dung')
const userController = new UserController()
const router = express.Router()

router.get('/',userController.getFilter)

router.get('/getMe'
    ,authenticateToken()
    ,userController.getMe
)
router.get('/:id'
    ,userController.getById)
router.delete('/:id'
  ,authenticateToken([AppRole.Admin])
  ,userController.remove
)
router.delete('/'
  ,authenticateToken([AppRole.Admin])
  ,validateDTORemove.ValidateError
  ,validateNotFound.IsNotFoundArray
  ,userController.removeArray
)


router
export default router