/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controllers/UserController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StatisticsController } from './../controllers/StatisticsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RegionController } from './../controllers/RegionController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RecipeController } from './../controllers/RecipeController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RatingController } from './../controllers/RatingController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { IngredientController } from './../controllers/IngredientController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HintRecipeController } from './../controllers/HintRecipeController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FavouriteController } from './../controllers/FavouriteController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoryController } from './../controllers/CategoryController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../controllers/AuthController';
import { expressAuthentication } from './../Middlewares/authentication';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "RepositoryDTO_unknown_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","required":true},
            "message": {"dataType":"any","required":true},
            "data": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeleteModel": {
        "dataType": "refObject",
        "properties": {
            "ids": {"dataType":"array","array":{"dataType":"double"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RepositoryDTO_any_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","required":true},
            "message": {"dataType":"any","required":true},
            "data": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PasswordModel": {
        "dataType": "refObject",
        "properties": {
            "oldPassword": {"dataType":"string","required":true},
            "newPassword": {"dataType":"string","required":true},
            "confirmPassword": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TypeSort": {
        "dataType": "refEnum",
        "enums": [0,1],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "userFilterModel": {
        "dataType": "refObject",
        "properties": {
            "page": {"dataType":"double"},
            "pageSize": {"dataType":"double"},
            "orderBy": {"dataType":"string"},
            "sort": {"ref":"TypeSort"},
            "username": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserModel": {
        "dataType": "refObject",
        "properties": {
            "spice_preference": {"dataType":"double","required":true},
            "sweetness_preference": {"dataType":"double","required":true},
            "saltiness_preference": {"dataType":"double","required":true},
            "description": {"dataType":"string","required":true},
            "regionId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RepositoryDTO_any-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","required":true},
            "message": {"dataType":"any","required":true},
            "data": {"dataType":"array","array":{"dataType":"any"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Recipe": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "instructions": {"dataType":"string","required":true},
            "imageUrl": {"dataType":"string","required":true},
            "timeCook": {"dataType":"double","required":true},
            "spice_level": {"dataType":"double","required":true},
            "sweetness_level": {"dataType":"double","required":true},
            "saltiness_level": {"dataType":"double","required":true},
            "createAt": {"dataType":"datetime","required":true},
            "updateAt": {"dataType":"datetime","required":true},
            "recipeIngredients": {"dataType":"array","array":{"dataType":"refObject","ref":"RecipeIngredient"},"required":true},
            "recipeCategorys": {"dataType":"array","array":{"dataType":"refObject","ref":"RecipeCategory"},"required":true},
            "reciepeUsers": {"dataType":"array","array":{"dataType":"refObject","ref":"RecipeUser"},"required":true},
            "ratings": {"dataType":"array","array":{"dataType":"refObject","ref":"Rating"},"required":true},
            "region": {"ref":"Region","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RecipeIngredient": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "quantity": {"dataType":"double","required":true},
            "unit": {"dataType":"string","required":true},
            "recipe": {"ref":"Recipe","required":true},
            "ingredient": {"ref":"Ingredient","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Ingredient": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "imageUrl": {"dataType":"string","required":true},
            "createAt": {"dataType":"datetime","required":true},
            "updateAt": {"dataType":"datetime","required":true},
            "recipeIngredients": {"dataType":"array","array":{"dataType":"refObject","ref":"RecipeIngredient"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RecipeCategory": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "recipe": {"ref":"Recipe","required":true},
            "category": {"ref":"Category","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Category": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "createAt": {"dataType":"datetime","required":true},
            "updateAt": {"dataType":"datetime","required":true},
            "recipeCategorys": {"dataType":"array","array":{"dataType":"refObject","ref":"RecipeCategory"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "statusUser": {
        "dataType": "refEnum",
        "enums": [0,1,2],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RecipeUser": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "user": {"ref":"User","required":true},
            "recipe": {"ref":"Recipe","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "User": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "username": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "status": {"ref":"statusUser","required":true},
            "spice_preference": {"dataType":"double","required":true},
            "sweetness_preference": {"dataType":"double","required":true},
            "saltiness_preference": {"dataType":"double","required":true},
            "description": {"dataType":"string","required":true},
            "createAt": {"dataType":"datetime","required":true},
            "updateAt": {"dataType":"datetime","required":true},
            "recipeUsers": {"dataType":"array","array":{"dataType":"refObject","ref":"RecipeUser"},"required":true},
            "groupRole": {"ref":"GroupRole","required":true},
            "searchHistorys": {"dataType":"array","array":{"dataType":"refObject","ref":"SearchHistory"},"required":true},
            "ratings": {"dataType":"array","array":{"dataType":"refObject","ref":"Rating"},"required":true},
            "region": {"ref":"Region","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GroupRole": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "users": {"dataType":"array","array":{"dataType":"refObject","ref":"User"},"required":true},
            "groupRolePermissions": {"dataType":"array","array":{"dataType":"refObject","ref":"GroupRolePermission"},"required":true},
            "created_at": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GroupRolePermission": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "groupRole": {"ref":"GroupRole","required":true},
            "permission": {"ref":"Permission","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Permission": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "groupRolePermissions": {"dataType":"array","array":{"dataType":"refObject","ref":"GroupRolePermission"},"required":true},
            "created_at": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SearchHistory": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "search": {"dataType":"string","required":true},
            "createAt": {"dataType":"datetime","required":true},
            "updateAt": {"dataType":"datetime","required":true},
            "user": {"ref":"User","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Rating": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "comment": {"dataType":"string","required":true},
            "rate": {"dataType":"double","required":true},
            "createAt": {"dataType":"datetime","required":true},
            "updateAt": {"dataType":"datetime","required":true},
            "recipe": {"ref":"Recipe","required":true},
            "user": {"ref":"User","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Region": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "createAt": {"dataType":"datetime","required":true},
            "updateAt": {"dataType":"datetime","required":true},
            "recipes": {"dataType":"array","array":{"dataType":"refObject","ref":"Recipe"},"required":true},
            "users": {"dataType":"array","array":{"dataType":"refObject","ref":"User"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RepositoryDTO_Region-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","required":true},
            "message": {"dataType":"any","required":true},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"Region"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "recipeFilterModel": {
        "dataType": "refObject",
        "properties": {
            "page": {"dataType":"double"},
            "pageSize": {"dataType":"double"},
            "orderBy": {"dataType":"string"},
            "sort": {"ref":"TypeSort"},
            "ingredientIds": {"dataType":"string","required":true},
            "categoryIds": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RecipeIngredientModel": {
        "dataType": "refObject",
        "properties": {
            "ingredientId": {"dataType":"double","required":true},
            "quantity": {"dataType":"double","required":true},
            "unit": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RecipeModel": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "instructions": {"dataType":"string","required":true},
            "imageUrl": {"dataType":"string","required":true},
            "categoryId": {"dataType":"array","array":{"dataType":"double"},"required":true},
            "regionId": {"dataType":"double","required":true},
            "recipeIngredient": {"dataType":"array","array":{"dataType":"refObject","ref":"RecipeIngredientModel"},"required":true},
            "timeCook": {"dataType":"double","required":true},
            "spice_level": {"dataType":"double","required":true},
            "sweetness_level": {"dataType":"double","required":true},
            "saltiness_level": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RatingFilter": {
        "dataType": "refObject",
        "properties": {
            "page": {"dataType":"double"},
            "pageSize": {"dataType":"double"},
            "orderBy": {"dataType":"string"},
            "sort": {"ref":"TypeSort"},
            "recipeId": {"dataType":"string"},
            "star": {"dataType":"double"},
            "userId": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RatingRequest": {
        "dataType": "refObject",
        "properties": {
            "comment": {"dataType":"string","required":true},
            "rate": {"dataType":"double","required":true},
            "recipeId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IngredientFilter": {
        "dataType": "refObject",
        "properties": {
            "page": {"dataType":"double"},
            "pageSize": {"dataType":"double"},
            "orderBy": {"dataType":"string"},
            "sort": {"ref":"TypeSort"},
            "name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IngredientModel": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "imageUrl": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPagination_any_": {
        "dataType": "refObject",
        "properties": {
            "records": {"dataType":"array","array":{"dataType":"any"},"required":true},
            "total": {"dataType":"double","required":true},
            "page": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "totalPages": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RepositoryDTO_IPagination_any__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","required":true},
            "message": {"dataType":"any","required":true},
            "data": {"ref":"IPagination_any_","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HintIngredientFilterRequest": {
        "dataType": "refObject",
        "properties": {
            "page": {"dataType":"double"},
            "pageSize": {"dataType":"double"},
            "orderBy": {"dataType":"string"},
            "sort": {"ref":"TypeSort"},
            "ingredientIds": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "filterPagination": {
        "dataType": "refObject",
        "properties": {
            "page": {"dataType":"double"},
            "pageSize": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FavouriteModel": {
        "dataType": "refObject",
        "properties": {
            "recipeId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FavouriteFilterRequest": {
        "dataType": "refObject",
        "properties": {
            "page": {"dataType":"double"},
            "pageSize": {"dataType":"double"},
            "orderBy": {"dataType":"string"},
            "sort": {"ref":"TypeSort"},
            "name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryFilter": {
        "dataType": "refObject",
        "properties": {
            "page": {"dataType":"double"},
            "pageSize": {"dataType":"double"},
            "orderBy": {"dataType":"string"},
            "sort": {"ref":"TypeSort"},
            "name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryModel": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginModel": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RepositoryDTO_void-or-User_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","required":true},
            "message": {"dataType":"any","required":true},
            "data": {"dataType":"union","subSchemas":[{"dataType":"void"},{"ref":"User"}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"silently-remove-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUserController_deleteArray: Record<string, TsoaRoute.ParameterSchema> = {
                data: {"in":"body","name":"data","required":true,"ref":"DeleteModel"},
        };
        app.delete('/api/user',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.deleteArray)),

            async function UserController_deleteArray(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_deleteArray, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'deleteArray',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_getMe: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/api/user/getMe',
            authenticateMiddleware([{"JWT":[null,null]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getMe)),

            async function UserController_getMe(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getMe, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getMe',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_updatePassword: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                data: {"in":"body","name":"data","required":true,"ref":"PasswordModel"},
        };
        app.put('/api/user/password',
            authenticateMiddleware([{"JWT":[null,null]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.updatePassword)),

            async function UserController_updatePassword(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_updatePassword, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'updatePassword',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_getOne: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/api/user/:id',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getOne)),

            async function UserController_getOne(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getOne, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getOne',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_getFilter: Record<string, TsoaRoute.ParameterSchema> = {
                filter: {"in":"queries","name":"filter","required":true,"ref":"userFilterModel"},
        };
        app.get('/api/user',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getFilter)),

            async function UserController_getFilter(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getFilter, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getFilter',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_banUser: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.put('/api/user/:id',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.banUser)),

            async function UserController_banUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_banUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'banUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_updateUser: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                data: {"in":"body","name":"data","required":true,"ref":"UserModel"},
        };
        app.put('/api/user',
            authenticateMiddleware([{"JWT":[null,null]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.updateUser)),

            async function UserController_updateUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_updateUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'updateUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_delete: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/api/user/:id',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.delete)),

            async function UserController_delete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_delete, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'delete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_deleteMe: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/api/user/getMe',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.deleteMe)),

            async function UserController_deleteMe(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_deleteMe, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'deleteMe',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStatisticsController_statisticsRecipe: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/statistics/recipe',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(StatisticsController)),
            ...(fetchMiddlewares<RequestHandler>(StatisticsController.prototype.statisticsRecipe)),

            async function StatisticsController_statisticsRecipe(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStatisticsController_statisticsRecipe, request, response });

                const controller = new StatisticsController();

              await templateService.apiHandler({
                methodName: 'statisticsRecipe',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStatisticsController_statisticsHighlyAppreciatedUsers: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/statistics/highlyUsers',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(StatisticsController)),
            ...(fetchMiddlewares<RequestHandler>(StatisticsController.prototype.statisticsHighlyAppreciatedUsers)),

            async function StatisticsController_statisticsHighlyAppreciatedUsers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStatisticsController_statisticsHighlyAppreciatedUsers, request, response });

                const controller = new StatisticsController();

              await templateService.apiHandler({
                methodName: 'statisticsHighlyAppreciatedUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStatisticsController_statisticsRecipeEngagement: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/api/statistics/recipeEngagement/:id',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(StatisticsController)),
            ...(fetchMiddlewares<RequestHandler>(StatisticsController.prototype.statisticsRecipeEngagement)),

            async function StatisticsController_statisticsRecipeEngagement(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStatisticsController_statisticsRecipeEngagement, request, response });

                const controller = new StatisticsController();

              await templateService.apiHandler({
                methodName: 'statisticsRecipeEngagement',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStatisticsController_statisticsRecipesByRegion: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/statistics/recipeRegion',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(StatisticsController)),
            ...(fetchMiddlewares<RequestHandler>(StatisticsController.prototype.statisticsRecipesByRegion)),

            async function StatisticsController_statisticsRecipesByRegion(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStatisticsController_statisticsRecipesByRegion, request, response });

                const controller = new StatisticsController();

              await templateService.apiHandler({
                methodName: 'statisticsRecipesByRegion',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStatisticsController_statisticsRecipesByCategory: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/statistics/recipeCategory',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(StatisticsController)),
            ...(fetchMiddlewares<RequestHandler>(StatisticsController.prototype.statisticsRecipesByCategory)),

            async function StatisticsController_statisticsRecipesByCategory(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStatisticsController_statisticsRecipesByCategory, request, response });

                const controller = new StatisticsController();

              await templateService.apiHandler({
                methodName: 'statisticsRecipesByCategory',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStatisticsController_statisticsRecipesTime: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/statistics/recipeTime',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(StatisticsController)),
            ...(fetchMiddlewares<RequestHandler>(StatisticsController.prototype.statisticsRecipesTime)),

            async function StatisticsController_statisticsRecipesTime(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStatisticsController_statisticsRecipesTime, request, response });

                const controller = new StatisticsController();

              await templateService.apiHandler({
                methodName: 'statisticsRecipesTime',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRegionController_getFilter: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/region',
            ...(fetchMiddlewares<RequestHandler>(RegionController)),
            ...(fetchMiddlewares<RequestHandler>(RegionController.prototype.getFilter)),

            async function RegionController_getFilter(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRegionController_getFilter, request, response });

                const controller = new RegionController();

              await templateService.apiHandler({
                methodName: 'getFilter',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRecipeController_getFilter: Record<string, TsoaRoute.ParameterSchema> = {
                filter: {"in":"queries","name":"filter","required":true,"ref":"recipeFilterModel"},
        };
        app.get('/api/recipe',
            ...(fetchMiddlewares<RequestHandler>(RecipeController)),
            ...(fetchMiddlewares<RequestHandler>(RecipeController.prototype.getFilter)),

            async function RecipeController_getFilter(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRecipeController_getFilter, request, response });

                const controller = new RecipeController();

              await templateService.apiHandler({
                methodName: 'getFilter',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRecipeController_create: Record<string, TsoaRoute.ParameterSchema> = {
                data: {"in":"body","name":"data","required":true,"ref":"RecipeModel"},
        };
        app.post('/api/recipe',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(RecipeController)),
            ...(fetchMiddlewares<RequestHandler>(RecipeController.prototype.create)),

            async function RecipeController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRecipeController_create, request, response });

                const controller = new RecipeController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRecipeController_update: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                data: {"in":"body","name":"data","required":true,"ref":"RecipeModel"},
        };
        app.put('/api/recipe/:id',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(RecipeController)),
            ...(fetchMiddlewares<RequestHandler>(RecipeController.prototype.update)),

            async function RecipeController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRecipeController_update, request, response });

                const controller = new RecipeController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRecipeController_getOne: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/api/recipe/:id',
            ...(fetchMiddlewares<RequestHandler>(RecipeController)),
            ...(fetchMiddlewares<RequestHandler>(RecipeController.prototype.getOne)),

            async function RecipeController_getOne(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRecipeController_getOne, request, response });

                const controller = new RecipeController();

              await templateService.apiHandler({
                methodName: 'getOne',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRecipeController_delete: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/api/recipe/:id',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(RecipeController)),
            ...(fetchMiddlewares<RequestHandler>(RecipeController.prototype.delete)),

            async function RecipeController_delete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRecipeController_delete, request, response });

                const controller = new RecipeController();

              await templateService.apiHandler({
                methodName: 'delete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRecipeController_deleteArray: Record<string, TsoaRoute.ParameterSchema> = {
                data: {"in":"body","name":"data","required":true,"ref":"DeleteModel"},
        };
        app.delete('/api/recipe',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(RecipeController)),
            ...(fetchMiddlewares<RequestHandler>(RecipeController.prototype.deleteArray)),

            async function RecipeController_deleteArray(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRecipeController_deleteArray, request, response });

                const controller = new RecipeController();

              await templateService.apiHandler({
                methodName: 'deleteArray',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRatingController_getFilter: Record<string, TsoaRoute.ParameterSchema> = {
                filter: {"in":"queries","name":"filter","required":true,"ref":"RatingFilter"},
        };
        app.get('/api/rating',
            ...(fetchMiddlewares<RequestHandler>(RatingController)),
            ...(fetchMiddlewares<RequestHandler>(RatingController.prototype.getFilter)),

            async function RatingController_getFilter(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRatingController_getFilter, request, response });

                const controller = new RatingController();

              await templateService.apiHandler({
                methodName: 'getFilter',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRatingController_create: Record<string, TsoaRoute.ParameterSchema> = {
                data: {"in":"body","name":"data","required":true,"ref":"RatingRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/api/rating',
            authenticateMiddleware([{"JWT":[null,null]}]),
            ...(fetchMiddlewares<RequestHandler>(RatingController)),
            ...(fetchMiddlewares<RequestHandler>(RatingController.prototype.create)),

            async function RatingController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRatingController_create, request, response });

                const controller = new RatingController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRatingController_getOne: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/api/rating/:id',
            ...(fetchMiddlewares<RequestHandler>(RatingController)),
            ...(fetchMiddlewares<RequestHandler>(RatingController.prototype.getOne)),

            async function RatingController_getOne(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRatingController_getOne, request, response });

                const controller = new RatingController();

              await templateService.apiHandler({
                methodName: 'getOne',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRatingController_getRatingMe: Record<string, TsoaRoute.ParameterSchema> = {
                recipeId: {"in":"path","name":"recipeId","required":true,"dataType":"double"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/api/rating/getRatingMe/:recipeId',
            authenticateMiddleware([{"JWT":[null,null]}]),
            ...(fetchMiddlewares<RequestHandler>(RatingController)),
            ...(fetchMiddlewares<RequestHandler>(RatingController.prototype.getRatingMe)),

            async function RatingController_getRatingMe(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRatingController_getRatingMe, request, response });

                const controller = new RatingController();

              await templateService.apiHandler({
                methodName: 'getRatingMe',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRatingController_update: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                data: {"in":"body","name":"data","required":true,"ref":"RatingRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.put('/api/rating/:id',
            authenticateMiddleware([{"JWT":[null,null]}]),
            ...(fetchMiddlewares<RequestHandler>(RatingController)),
            ...(fetchMiddlewares<RequestHandler>(RatingController.prototype.update)),

            async function RatingController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRatingController_update, request, response });

                const controller = new RatingController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRatingController_delete: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/api/rating/:id',
            authenticateMiddleware([{"JWT":[null,null]}]),
            ...(fetchMiddlewares<RequestHandler>(RatingController)),
            ...(fetchMiddlewares<RequestHandler>(RatingController.prototype.delete)),

            async function RatingController_delete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRatingController_delete, request, response });

                const controller = new RatingController();

              await templateService.apiHandler({
                methodName: 'delete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRatingController_deleteArray: Record<string, TsoaRoute.ParameterSchema> = {
                data: {"in":"body","name":"data","required":true,"ref":"DeleteModel"},
        };
        app.delete('/api/rating',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(RatingController)),
            ...(fetchMiddlewares<RequestHandler>(RatingController.prototype.deleteArray)),

            async function RatingController_deleteArray(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRatingController_deleteArray, request, response });

                const controller = new RatingController();

              await templateService.apiHandler({
                methodName: 'deleteArray',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsIngredientController_getFilter: Record<string, TsoaRoute.ParameterSchema> = {
                filter: {"in":"queries","name":"filter","required":true,"ref":"IngredientFilter"},
        };
        app.get('/api/ingredient',
            ...(fetchMiddlewares<RequestHandler>(IngredientController)),
            ...(fetchMiddlewares<RequestHandler>(IngredientController.prototype.getFilter)),

            async function IngredientController_getFilter(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsIngredientController_getFilter, request, response });

                const controller = new IngredientController();

              await templateService.apiHandler({
                methodName: 'getFilter',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsIngredientController_create: Record<string, TsoaRoute.ParameterSchema> = {
                data: {"in":"body","name":"data","required":true,"ref":"IngredientModel"},
        };
        app.post('/api/ingredient',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(IngredientController)),
            ...(fetchMiddlewares<RequestHandler>(IngredientController.prototype.create)),

            async function IngredientController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsIngredientController_create, request, response });

                const controller = new IngredientController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsIngredientController_update: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                data: {"in":"body","name":"data","required":true,"ref":"IngredientModel"},
        };
        app.put('/api/ingredient/:id',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(IngredientController)),
            ...(fetchMiddlewares<RequestHandler>(IngredientController.prototype.update)),

            async function IngredientController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsIngredientController_update, request, response });

                const controller = new IngredientController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsIngredientController_getOne: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/api/ingredient/:id',
            ...(fetchMiddlewares<RequestHandler>(IngredientController)),
            ...(fetchMiddlewares<RequestHandler>(IngredientController.prototype.getOne)),

            async function IngredientController_getOne(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsIngredientController_getOne, request, response });

                const controller = new IngredientController();

              await templateService.apiHandler({
                methodName: 'getOne',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsIngredientController_delete: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/api/ingredient/:id',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(IngredientController)),
            ...(fetchMiddlewares<RequestHandler>(IngredientController.prototype.delete)),

            async function IngredientController_delete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsIngredientController_delete, request, response });

                const controller = new IngredientController();

              await templateService.apiHandler({
                methodName: 'delete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsIngredientController_deleteArray: Record<string, TsoaRoute.ParameterSchema> = {
                data: {"in":"body","name":"data","required":true,"ref":"DeleteModel"},
        };
        app.delete('/api/ingredient',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(IngredientController)),
            ...(fetchMiddlewares<RequestHandler>(IngredientController.prototype.deleteArray)),

            async function IngredientController_deleteArray(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsIngredientController_deleteArray, request, response });

                const controller = new IngredientController();

              await templateService.apiHandler({
                methodName: 'deleteArray',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHintRecipeController_getHintIngredient: Record<string, TsoaRoute.ParameterSchema> = {
                filter: {"in":"queries","name":"filter","required":true,"ref":"HintIngredientFilterRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/api/hint/ingredient',
            authenticateMiddleware([{"JWT":[null,null]}]),
            ...(fetchMiddlewares<RequestHandler>(HintRecipeController)),
            ...(fetchMiddlewares<RequestHandler>(HintRecipeController.prototype.getHintIngredient)),

            async function HintRecipeController_getHintIngredient(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHintRecipeController_getHintIngredient, request, response });

                const controller = new HintRecipeController();

              await templateService.apiHandler({
                methodName: 'getHintIngredient',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHintRecipeController_getHintIngredientPublic: Record<string, TsoaRoute.ParameterSchema> = {
                filter: {"in":"queries","name":"filter","required":true,"ref":"HintIngredientFilterRequest"},
        };
        app.get('/api/hint/ingredient/public',
            ...(fetchMiddlewares<RequestHandler>(HintRecipeController)),
            ...(fetchMiddlewares<RequestHandler>(HintRecipeController.prototype.getHintIngredientPublic)),

            async function HintRecipeController_getHintIngredientPublic(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHintRecipeController_getHintIngredientPublic, request, response });

                const controller = new HintRecipeController();

              await templateService.apiHandler({
                methodName: 'getHintIngredientPublic',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHintRecipeController_getHintUser: Record<string, TsoaRoute.ParameterSchema> = {
                filter: {"in":"queries","name":"filter","required":true,"ref":"filterPagination"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/api/hint/recipeUser',
            authenticateMiddleware([{"JWT":[null,null]}]),
            ...(fetchMiddlewares<RequestHandler>(HintRecipeController)),
            ...(fetchMiddlewares<RequestHandler>(HintRecipeController.prototype.getHintUser)),

            async function HintRecipeController_getHintUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHintRecipeController_getHintUser, request, response });

                const controller = new HintRecipeController();

              await templateService.apiHandler({
                methodName: 'getHintUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHintRecipeController_getHintSimilar: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                filter: {"in":"queries","name":"filter","ref":"filterPagination"},
        };
        app.get('/api/hint/recipeSimilar/:id',
            ...(fetchMiddlewares<RequestHandler>(HintRecipeController)),
            ...(fetchMiddlewares<RequestHandler>(HintRecipeController.prototype.getHintSimilar)),

            async function HintRecipeController_getHintSimilar(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHintRecipeController_getHintSimilar, request, response });

                const controller = new HintRecipeController();

              await templateService.apiHandler({
                methodName: 'getHintSimilar',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHintRecipeController_getHighlyAppreciated: Record<string, TsoaRoute.ParameterSchema> = {
                filter: {"in":"queries","name":"filter","required":true,"ref":"filterPagination"},
        };
        app.get('/api/hint/recipeHightly',
            ...(fetchMiddlewares<RequestHandler>(HintRecipeController)),
            ...(fetchMiddlewares<RequestHandler>(HintRecipeController.prototype.getHighlyAppreciated)),

            async function HintRecipeController_getHighlyAppreciated(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHintRecipeController_getHighlyAppreciated, request, response });

                const controller = new HintRecipeController();

              await templateService.apiHandler({
                methodName: 'getHighlyAppreciated',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsFavouriteController_create: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                model: {"in":"body","name":"model","required":true,"ref":"FavouriteModel"},
        };
        app.post('/api/favourite',
            authenticateMiddleware([{"JWT":[null,null]}]),
            ...(fetchMiddlewares<RequestHandler>(FavouriteController)),
            ...(fetchMiddlewares<RequestHandler>(FavouriteController.prototype.create)),

            async function FavouriteController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsFavouriteController_create, request, response });

                const controller = new FavouriteController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsFavouriteController_remove: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/api/favourite/:id',
            authenticateMiddleware([{"JWT":[null,null]}]),
            ...(fetchMiddlewares<RequestHandler>(FavouriteController)),
            ...(fetchMiddlewares<RequestHandler>(FavouriteController.prototype.remove)),

            async function FavouriteController_remove(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsFavouriteController_remove, request, response });

                const controller = new FavouriteController();

              await templateService.apiHandler({
                methodName: 'remove',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsFavouriteController_removeArray: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                model: {"in":"body","name":"model","required":true,"ref":"DeleteModel"},
        };
        app.delete('/api/favourite',
            authenticateMiddleware([{"JWT":[null,null]}]),
            ...(fetchMiddlewares<RequestHandler>(FavouriteController)),
            ...(fetchMiddlewares<RequestHandler>(FavouriteController.prototype.removeArray)),

            async function FavouriteController_removeArray(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsFavouriteController_removeArray, request, response });

                const controller = new FavouriteController();

              await templateService.apiHandler({
                methodName: 'removeArray',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsFavouriteController_getFilter: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                filter: {"in":"queries","name":"filter","ref":"FavouriteFilterRequest"},
        };
        app.get('/api/favourite',
            authenticateMiddleware([{"JWT":[null,null]}]),
            ...(fetchMiddlewares<RequestHandler>(FavouriteController)),
            ...(fetchMiddlewares<RequestHandler>(FavouriteController.prototype.getFilter)),

            async function FavouriteController_getFilter(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsFavouriteController_getFilter, request, response });

                const controller = new FavouriteController();

              await templateService.apiHandler({
                methodName: 'getFilter',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoryController_getFilter: Record<string, TsoaRoute.ParameterSchema> = {
                filter: {"in":"queries","name":"filter","required":true,"ref":"CategoryFilter"},
        };
        app.get('/api/category',
            ...(fetchMiddlewares<RequestHandler>(CategoryController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryController.prototype.getFilter)),

            async function CategoryController_getFilter(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoryController_getFilter, request, response });

                const controller = new CategoryController();

              await templateService.apiHandler({
                methodName: 'getFilter',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoryController_create: Record<string, TsoaRoute.ParameterSchema> = {
                data: {"in":"body","name":"data","required":true,"ref":"CategoryModel"},
        };
        app.post('/api/category',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(CategoryController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryController.prototype.create)),

            async function CategoryController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoryController_create, request, response });

                const controller = new CategoryController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoryController_getOne: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/api/category/:id',
            ...(fetchMiddlewares<RequestHandler>(CategoryController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryController.prototype.getOne)),

            async function CategoryController_getOne(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoryController_getOne, request, response });

                const controller = new CategoryController();

              await templateService.apiHandler({
                methodName: 'getOne',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoryController_update: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                data: {"in":"body","name":"data","required":true,"ref":"CategoryModel"},
        };
        app.put('/api/category/:id',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(CategoryController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryController.prototype.update)),

            async function CategoryController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoryController_update, request, response });

                const controller = new CategoryController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoryController_delete: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/api/category/:id',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(CategoryController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryController.prototype.delete)),

            async function CategoryController_delete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoryController_delete, request, response });

                const controller = new CategoryController();

              await templateService.apiHandler({
                methodName: 'delete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoryController_deleteArray: Record<string, TsoaRoute.ParameterSchema> = {
                data: {"in":"body","name":"data","required":true,"ref":"DeleteModel"},
        };
        app.delete('/api/category',
            authenticateMiddleware([{"JWT":[null]}]),
            ...(fetchMiddlewares<RequestHandler>(CategoryController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryController.prototype.deleteArray)),

            async function CategoryController_deleteArray(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoryController_deleteArray, request, response });

                const controller = new CategoryController();

              await templateService.apiHandler({
                methodName: 'deleteArray',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_login: Record<string, TsoaRoute.ParameterSchema> = {
                model: {"in":"body","name":"model","required":true,"ref":"LoginModel"},
        };
        app.post('/api/login',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.login)),

            async function AuthController_login(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_login, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_logout: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/logout',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.logout)),

            async function AuthController_logout(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_logout, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'logout',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_register: Record<string, TsoaRoute.ParameterSchema> = {
                model: {"in":"body","name":"model","required":true,"ref":"LoginModel"},
        };
        app.post('/api/register',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.register)),

            async function AuthController_register(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_register, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'register',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_refreshToken: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/api/refreshToken',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.refreshToken)),

            async function AuthController_refreshToken(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_refreshToken, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'refreshToken',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
