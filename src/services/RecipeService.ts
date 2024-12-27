import { DeepPartial } from "typeorm";
import BaseRepository, { IPagination } from "./BaseRepository";
import CustomError from "../utils/CustumError";
import { IsDuplicatesWithSort } from "../utils/GenerationCode";
import dataSource from "../dataSource";
import { Recipe } from "../entitys/Recipe";
import { RecipeModel } from "../models/modelRequest/RecipeModel";
import { RecipeCategory } from '../entitys/Recipe_Category';
import { RecipeIngredient } from "../entitys/Recipe_Ingredient";
import { Category } from "../entitys/Category";
import { Ingredient } from '../entitys/Ingredient';
import { IRecipeDTO } from "../models/modelResponse/RecipeDTO";

export default class RecipeService{
    protected repository:BaseRepository<Recipe>
    protected recipeCategoryRepository:BaseRepository<RecipeCategory>
    protected reciepeIngredient:BaseRepository<RecipeIngredient>
    protected categoryRepo:BaseRepository<Category>
    protected IngredientRepo:BaseRepository<Ingredient>
    constructor(){
        this.repository = new BaseRepository(Recipe,'recipe')
        this.reciepeIngredient = new BaseRepository(RecipeIngredient,'recipeIngredient')
        this.recipeCategoryRepository = new BaseRepository(RecipeCategory,'recipeCategory')
        this.categoryRepo = new BaseRepository(Category,'category')
        this.IngredientRepo = new BaseRepository(Ingredient,'ingredient')
    }
    protected async validateBase(id: number) {
        const records =await (await this.repository.getBy(id)).getOne()
        if(records == null){
            throw new CustomError(`Không tồn tại id = ${id} trong bản thể loại này`,404)
        }
        return records
    }
    protected async unique(data:DeepPartial<Recipe>){
        const record = await (await this.repository.getBy(data.name,'name')).getOne()
        if(record){
            return record
        }
    }
    protected async ExitsCategory(id:number){
        const records = (await this.categoryRepo.getBy(id)).getOne()
        if(records == null){
            throw new CustomError(`Không tồn tại id = ${id} trong bản thể loại`,404)
        }
        return records
    }
    protected async ExitsIngredient(id:number){
        const record = (await this.IngredientRepo.getBy(id)).getOne()
        if(record == null){
            throw new CustomError(`Không tồn tại id = ${id} trong bản nguyên liệu`,404)
        }
        return record
    }
    protected async validate(id: number, data:RecipeModel): Promise<void> {
        const record = await this.unique(data)
        await Promise.all(data.categoryId.map(async(item)=>await this.ExitsCategory(item)))
        await Promise.all(data.recipeIngredient.map(async(item)=>await this.ExitsIngredient(item.ingredientId)))
        if(record && record.id !== id){
            throw new CustomError(`Tên thể loại này đã tồn tại name = ${record.name}`,400,'name')
        }
    }
    async create(data:RecipeModel){
        await this.validate(0,data)
        await dataSource.manager.transaction(async(transtionEntityManager)=>{
            const recipeData = await this.repository.create(data,transtionEntityManager)
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
    async getFillter (name?:string,ingredientId?:string[],categoryId?:string[],orderBy?:string,sort?:string,page?: number, pageSize?: number): Promise<IPagination<Recipe>> {
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
        const data = await this.repository.getPagination(queryBuilder,page,pageSize)
        return data
    }
    async getById(id:number){
        const record = await this.validateBase(id)
        return record
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
                description:data.description
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
    // Xóa một đối tượng
  async remove(id: number): Promise<void> {
    const record = await this.validateBase(id)
    return this.repository.remove(record);
  }

  async removeArray(ids:number[]):Promise<void>{
    await dataSource.manager.transaction(async(transactionEntityManager)=>{
        await this.repository.removeArray(ids,transactionEntityManager)
    })
    }

    async getRecipesWithIngredients(ingredientIds: string[], page: number, pageSize: number) {
        const data = await (await this.repository
          .createQueryBuilder())
          .leftJoinAndSelect('recipe.recipeIngredients','recipeIngredient')
          .select([
            'recipe.id' as "id",
            'recipe.name' as "name",
            'recipe.description' as "description",
            'recipe.imageUrl' as "imageUrl",
          ])
          .addSelect('COUNT(recipeIngredient.id)', 'priorityLevel')
          .where('recipeIngredient.ingredientId IN (:...ingredientIds)', { ingredientIds })
          .groupBy('recipe.id')
          .having('COUNT(recipeIngredient.id) > :priorityLevel', { priorityLevel: 2 })
          .orderBy('COUNT(recipeIngredient.id)', 'DESC')
          .skip((page-1)*pageSize)
          .take(pageSize)
          .getRawMany()
          const dataDTO: IPagination<IRecipeDTO> = {
            records: data.map((item) => ({
              id: item.recipe_id,
              name: item.recipe_name,
              description: item.recipe_description, // dùng chính tả đúng tại đây
              imageUrl: item.recipe_imageUrl,
            })),
            total: data.length, // Cần thêm total để biết tổng số bản ghi nếu có phân trang
            page:page,
            pageSize:pageSize,
            totalPages: Math.ceil(data.length / pageSize),
          };                   
          return dataDTO
          
      
        
    }
}