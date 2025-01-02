
import { da } from "@faker-js/faker/.";
import { Recipe } from "../entitys/Recipe";
import { Region } from "../entitys/Region";
import { User } from "../entitys/User";
import BaseRepository from "./BaseRepository";

export default class StatisticsService{
    protected recipeRepo = new BaseRepository(Recipe,'recipe')
    protected userRepo = new BaseRepository(User,'user')
    protected regionRepo = new BaseRepository(Region,'region')
    async statisticsRecipe(){
        const data =await (await this.recipeRepo.createQueryBuilder())
        .select([
            'COUNT(recipe.id) as totalRecipes',
            'COUNT(CASE WHEN MONTH(recipe.createAt) = MONTH(CURRENT_DATE) THEN 1 END) as recipesThisMonth'
        ]).getRawOne()
        return data
    }
    async statisticsHighlyAppreciatedUsers(){
        const data = await (await this.userRepo.createQueryBuilder())
        .leftJoinAndSelect('user.ratings','rating')
        .select([
            'user.id',
            'user.username',
            'COUNT(rating.id) as totalRatings',
            'AVG(rating.rate) as averageRatingGiven'
        ])
        .groupBy('user.id')
        .having('averageRatingGiven >= 4')
        .orderBy('totalRatings','DESC')
        .addOrderBy('averageRatingGiven','DESC')
        .getRawMany()
        return data
    }
    async statisticsRecipeEngagement(recipeId:number){
        const data =await (await this.recipeRepo.createQueryBuilder())
        .innerJoin('recipe.ratings','rating')
        .select([
            'recipe.id',
            'recipe.name',
            'COUNT(rating.id) as totalRatings',
            "AVG(rating.rate) as AVGRatings"
        ])
        .andWhere('recipe.id =:recipeId',{recipeId})
        .groupBy('recipe.id')
        .getRawOne()
        return data

    }
    async statisticsRecipesByRegion(){
        const data = await (await this.recipeRepo.createQueryBuilder())
        .innerJoin('recipe.region','region')
        .innerJoin('recipe.ratings','rating')
        .select([
            'region.id',
            'region.name',
            'recipe.id AS recipeId',
            'recipe.name AS mostPopularRecipe',
            'COUNT(recipe.id) AS totalRecipes',
            'AVG(rating.rate) AS averageRating',
            'ROW_NUMBER() OVER (PARTITION BY region.id ORDER BY AVG(rating.rate) DESC, COUNT(recipe.id) DESC) AS rank',
          ])
          .groupBy('region.id')
          .addGroupBy('recipe.id')
          .getRawMany()
         
          const filteredData = data.filter(item => item.rank == 1);
        return filteredData;
    }
    async statisticsRecipesByCategory(){
        const data = await (await this.recipeRepo.createQueryBuilder())
        .innerJoin('recipe.recipeCategorys','recipeCategory')
        .innerJoin('recipeCategory.category','category')
        .innerJoin('recipe.ratings','rating')
        .select([
            'category.id',
            'category.name',
            'COUNT(recipe.id) as totalRecipes',
            'AVG(rating.rate) as averageRating'
        ])
        .groupBy('category.id')
        .addGroupBy('category.name')
        .orderBy('averageRating','DESC')
        .addOrderBy('category.name','ASC')
        .getRawMany()
        return data
    }
    async statisticsRecipesTime() {
        const data = await (await this.recipeRepo.createQueryBuilder())
            .select([
                'COALESCE(COUNT(CASE WHEN MONTH(recipe.createAt) = MONTH(CURRENT_DATE) THEN 1 END), 0) as recipesAddedThisMonth',
                'COALESCE(COUNT(CASE WHEN WEEK(recipe.createAt) = WEEK(CURRENT_DATE) THEN 1 END), 0) as recipesAddedThisWeek',
                'COALESCE(COUNT(CASE WHEN DATE(recipe.createAt) = CURRENT_DATE THEN 1 END), 0) as recipesAddedToday'
            ])
            .getRawOne()
        console.log(data);
        return data;
    }
    
}