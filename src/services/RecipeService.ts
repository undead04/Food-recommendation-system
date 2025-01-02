import { DeepPartial } from "typeorm";
import BaseRepository, { IPagination } from "./BaseRepository";
import CustomError from "../utils/CustumError";
import dataSource from "../dataSource";
import { Recipe } from "../entitys/Recipe";
import { RecipeModel } from "../models/modelRequest/RecipeModel";
import { RecipeCategory } from '../entitys/Recipe_Category';
import { RecipeIngredient } from "../entitys/Recipe_Ingredient";
import { IRecipeDTO } from "../models/modelResponse/RecipeDTO";
import BaseService from "../utils/BaseService";
import RegionService from "./RegionService";
import IngredientService from "./IngredientService";
import CategoryService from "./CategoryService";

export default class RecipeService extends BaseService<Recipe>{
    protected recipeCategoryRepository:BaseRepository<RecipeCategory>
    protected reciepeIngredient:BaseRepository<RecipeIngredient>
    protected categoryService = new CategoryService()
    protected ingredientService = new IngredientService()
    protected regionService = new RegionService()
    constructor(){
        super(Recipe,'recipe')
        this.reciepeIngredient = new BaseRepository(RecipeIngredient,'recipeIngredient')
        this.recipeCategoryRepository = new BaseRepository(RecipeCategory,'recipeCategory')
    }
    protected transfromDTO(data: DeepPartial<Recipe>): DeepPartial<Recipe> {
        throw new Error("Method not implemented.");
    }
    protected async unique(data:DeepPartial<Recipe>){
        const record = await (await this.repository.getBy(data.name,'name')).getOne()
        if(record){
            return record
        }
    }
    protected async validate(id: number, data:RecipeModel): Promise<void> {
        const record = await this.unique(data)
        await Promise.all(data.categoryId.map(async(item)=>await this.categoryService.getById(item)))
        await Promise.all(data.recipeIngredient.map(async(item)=>await this.ingredientService.getById(item.ingredientId)))
        await this.regionService.getById(data.regionId)
        if(record && record.id !== id){
            throw new CustomError(`Tên món ăn này đã tồn tại name = ${record.name}`,400,'name')
        }
    }
    async create(data:RecipeModel){
        await this.validate(0,data)
        await dataSource.manager.transaction(async(transtionEntityManager)=>{
            const recipeData = await this.repository.create({...data,region:{id:data.regionId}},transtionEntityManager)
            await this.recipeCategoryRepository.createArray(data.categoryId.map(item=>({
                recipe:{id:recipeData.id},
                category:{id:item}
            })),transtionEntityManager)
            await this.reciepeIngredient.createArray(data.recipeIngredient.map(item=>({
                recipe:{id:recipeData.id},
                ingredient:{id:item.ingredientId},
                unit:item.unit,
                quantity:item.quantity
            })),transtionEntityManager)
        })
    }
    async getFilter (name?:string,ingredientId?:string[],categoryId?:string[],orderBy?:string,sort?:string,page?: number, pageSize?: number): Promise<IPagination<Recipe>> {
        const queryBuilder = (await this.repository.createQueryBuilder())
        .innerJoin('recipe.recipeCategorys','recipaCategory')
        .innerJoin('recipe.recipeIngredients','recipeIngredient')
        const sortOrder: "ASC" | "DESC" = (sort as "ASC" | "DESC") || "ASC";
        if (name) {
            // Đảm bảo truyền giá trị name vào một cách an toàn
            queryBuilder.where(`
                MATCH (recipe.name) AGAINST (:name IN BOOLEAN MODE)
            `, {name:`*${name}*`});
        }
        if(ingredientId){
            queryBuilder.andWhere('recipeIngredient.ingredientId IN (:...ingredientId)',{ingredientId})
        }
        if(categoryId){
            queryBuilder.andWhere('recipaCategory.ingredientId IN (:...categoryId)',{categoryId})
        }
        if(orderBy){
            
            queryBuilder.orderBy(`genre.${orderBy}`,sortOrder)
        }
        console.log(page,pageSize)
        const data = await this.repository.getPagination(queryBuilder,page,pageSize)
        return data
    }
    async createArray(models: RecipeModel[]) {
        // Validate tất cả models trước khi thực hiện giao dịch
        await Promise.all(models.map(async model=>await this.validate(0,model)))
    
        // Thực hiện giao dịch
        await dataSource.manager.transaction(async (transactionEntityManager) => {
            // Tạo recipe và lấy danh sách ID
            const recipeData = await this.repository.createArray(
                models.map((model) => ({
                    ...model,
                    region: { id: model.regionId },
                })),
                transactionEntityManager
            );
    
            const categoryData = [];
            const ingredientData = [];
    
            // Lặp qua từng model để xử lý các thông tin cần thiết cho chèn
            for (let i = 0; i < models.length; i++) {
                const model = models[i];
                const currentRecipe = recipeData.identifiers[i];
    
                // Thêm tất cả category vào mảng categoryData
                categoryData.push(...model.categoryId.map((categoryId) => ({
                    recipe: { id: currentRecipe.id },
                    category: { id: categoryId },
                })));
    
                // Thêm tất cả ingredients vào mảng ingredientData
                ingredientData.push(...model.recipeIngredient.map((ingredient) => ({
                    recipe: { id: currentRecipe.id },
                    ingredient: { id: ingredient.ingredientId },
                    unit: ingredient.unit,
                    quantity: ingredient.quantity,
                })));
            }
    
            // Chèn tất cả recipe categories và ingredients trong một lần
            await this.recipeCategoryRepository.createArray(categoryData, transactionEntityManager);
            await this.reciepeIngredient.createArray(ingredientData, transactionEntityManager);
        });
    }
    
    
    async update(id:number,data:RecipeModel){
        await this.validate(id,data)
        const record = await (await this.repository.getBy(id))
        .leftJoinAndSelect('recipe.recipeCategorys','recipaCategory')
        .leftJoinAndSelect('recipe.recipeIngredients','recipeIngredient')
        .getOne()
        await dataSource.transaction(async(transtionEntityManager)=>{
            await this.repository.update(id,{
                name:data.name,
                imageUrl:data.imageUrl,
                instructions:data.instructions,
                description:data.description,
                region:{id:data.regionId}
            },transtionEntityManager)
            await this.reciepeIngredient.removeArray(record.recipeIngredients.map(item=>item.id),transtionEntityManager)
            await this.recipeCategoryRepository.removeArray(record.recipeCategorys.map(item=>item.id),transtionEntityManager)
            await this.recipeCategoryRepository.createArray(data.categoryId.map(item=>({
                recipe:{id:id},
                category:{id:item}
            })),transtionEntityManager)
            await this.reciepeIngredient.createArray(data.recipeIngredient.map(item=>({
                recipe:{id:id},
                ingredient:{id:item.ingredientId},
                unit:item.unit,
                quantity:item.quantity
            })),transtionEntityManager)
        })
    }
   
}