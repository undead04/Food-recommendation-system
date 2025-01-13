import { dataSource } from "./dataSource";
import BaseRepository from "../utils/BaseRepository";
import { GroupRole } from "../entitys/GroupRole";
import AppRole from "../models/modelRequest/AppRole";
import { DeepPartial } from "typeorm";
import { Category } from "../entitys/Category";
import { Region } from "../entitys/Region";
import { faker } from "@faker-js/faker";
import { Ingredient } from "../entitys/Ingredient";
import { randomInt } from "crypto";
import { Recipe } from "../entitys/Recipe";
import { RecipeIngredient } from "../entitys/Recipe_Ingredient";
import { RecipeCategory } from "../entitys/Recipe_Category";
async function createRole() {
  const repo = new BaseRepository(GroupRole, "groupRole");
  const array: DeepPartial<GroupRole>[] = [
    {
      name: AppRole.Admin,
      description: "Là người quản lí trang admin",
    },
    {
      name: AppRole.User,
      description: "Là người dùng mặt định",
    },
  ];
  await dataSource.transaction(async (manager) => {
    await repo.createArray(array, manager);
  });
}
async function createCategory() {
  const repo = new BaseRepository(Category, "category");
  const array = [
    { name: "Fast Food" },
    { name: "Vegetarian" },
    { name: "Vegan" },
    { name: "Seafood" },
    { name: "Desserts" },
    { name: "Appetizers" },
    { name: "Beverages" },
    { name: "Main Course" },
    { name: "Salads" },
    { name: "Snacks" },
    { name: "Street Food" },
    { name: "Asian Cuisine" },
    { name: "European Cuisine" },
    { name: "Mexican Cuisine" },
    { name: "Middle Eastern Cuisine" },
    { name: "Indian Cuisine" },
    { name: "Italian Cuisine" },
    { name: "American Cuisine" },
  ];
  await dataSource.transaction(async (manager) => {
    await repo.createArray(array, manager);
  });
}
async function createRegion() {
  const repo = new BaseRepository(Region, "region");
  const array = [
    { name: "Vietnam" },
    { name: "United States" },
    { name: "Canada" },
    { name: "Australia" },
    { name: "Japan" },
    { name: "South Korea" },
    { name: "Germany" },
    { name: "France" },
    { name: "United Kingdom" },
    { name: "Italy" },
    { name: "India" },
    { name: "Brazil" },
    { name: "China" },
    { name: "Russia" },
    { name: "South Africa" },
  ];
  await dataSource.transaction(async (manager) => {
    await repo.createArray(array, manager);
  });
}
async function createIngredient() {
  const repo = new BaseRepository(Ingredient, "ingredient");
  const ingredients: string[] = [
    "Tomato",
    "Carrot",
    "Potato",
    "Onion",
    "Garlic",
    "Spinach",
    "Broccoli",
    "Cucumber",
    "Bell Pepper",
    "Eggplant",
    "Zucchini",
    "Lettuce",
    "Cabbage",
    "Cauliflower",
    "Pumpkin",
    "Sweet Potato",
    "Radish",
    "Celery",
    "Parsley",
    "Basil",
    "Mint",
    "Cilantro",
    "Green Beans",
    "Peas",
    "Corn",
    "Mushroom",
    "Cheese",
    "Chicken Breast",
    "Beef",
    "Pork",
    "Shrimp",
    "Fish",
    "Eggs",
    "Milk",
    "Yogurt",
    "Butter",
    "Flour",
    "Sugar",
    "Salt",
    "Pepper",
    "Rice",
    "Pasta",
    "Bread",
    "Olive Oil",
    "Vinegar",
    "Soy Sauce",
    "Chili",
    "Ginger",
    "Lemon",
    "Honey",
    "Banana",
    "Apple",
  ];
  const array = await ingredients.map((ing) => ({
    name: ing,
    imageUrl: faker.image.avatar(),
  }));
  await dataSource.transaction(async (manager) => {
    await repo.createArray(array, manager);
  });
}
async function createRecipe() {
  const repoRecipe = new BaseRepository(Recipe, "recipe");
  const repoCategory = new BaseRepository(Category, "category");
  const regionRepo = new BaseRepository(Region, "region");
  const repoRecipeIng = new BaseRepository(
    RecipeIngredient,
    "recipeIngredient"
  );
  const repoRecipeCate = new BaseRepository(RecipeCategory, "recipeCategory");
  const categoryIds = await (
    await (await repoCategory.createQueryBuilder()).getMany()
  ).map((item) => item.id);
  const regionIds = await (
    await (await regionRepo.createQueryBuilder()).getMany()
  ).map((item) => item.id);
  const ingredientRepo = new BaseRepository(Ingredient, "ingredient");
  const ingredientIds = await (
    await (await ingredientRepo.createQueryBuilder()).getMany()
  ).map((item) => item.id);
  try {
    // Tạo mảng unique gồm 10 đối tượng với name và image

    const uniqueNames = faker.helpers.uniqueArray(faker.food.dish, 100); // Tạo 4000 tên sản phẩm duy nhất
    const uniqueData = uniqueNames.map((name) => ({
      name,
      description: faker.food.description(),
      instructions: faker.food.adjective(),
      categoryId: Array.from(
        { length: randomInt(0, 4) },
        () => categoryIds[randomInt(0, categoryIds.length - 1)]
      ),
      regionId: regionIds[randomInt(0, regionIds.length - 1)],
      recipeIngredient: Array.from({ length: randomInt(6, 8) }, () => ({
        ingredientId: ingredientIds[randomInt(0, ingredientIds.length - 1)],
        quantity: randomInt(1, 5),
        unit: "grams",
      })),
      timeCook: randomInt(30, 60),
      spice_level: randomInt(1, 5),
      sweetness_level: randomInt(1, 5),
      saltiness_level: randomInt(1, 5),
      imageUrl: faker.image.avatar(), // `image` không cần duy nhất
    }));
    await dataSource.manager.transaction(async (transactionEntityManager) => {
      // Tạo recipe và lấy danh sách ID
      const recipeData = await repoRecipe.createArray(
        uniqueData.map((model) => ({
          ...model,
          region: { id: model.regionId },
        })),
        transactionEntityManager
      );

      const categoryData = [];
      const ingredientData = [];

      // Lặp qua từng model để xử lý các thông tin cần thiết cho chèn
      for (let i = 0; i < uniqueData.length; i++) {
        const model = uniqueData[i];
        const currentRecipe = recipeData.identifiers[i];

        // Thêm tất cả category vào mảng categoryData
        categoryData.push(
          ...model.categoryId.map((categoryId) => ({
            recipe: { id: currentRecipe.id },
            category: { id: categoryId },
          }))
        );

        // Thêm tất cả ingredients vào mảng ingredientData
        ingredientData.push(
          ...model.recipeIngredient.map((ingredient) => ({
            recipe: { id: currentRecipe.id },
            ingredient: { id: ingredient.ingredientId },
            unit: ingredient.unit,
            quantity: ingredient.quantity,
          }))
        );
      }

      // Chèn tất cả recipe categories và ingredients trong một lần
      await repoRecipeCate.createArray(categoryData, transactionEntityManager);
      await repoRecipeIng.createArray(ingredientData, transactionEntityManager);
    });
  } catch (error) {
    console.error(error.message); // "Exceeded maxRetries"
  }
}
const seedDatabase = async () => {
  await dataSource.initialize();
  const start = Date.now();
  await createRecipe();
  const end = Date.now();
  console.log(`Thời gian thêm dữ liệu vào sql ${(end - start) / 1000}`);
  console.log("Data seeded!");
  await dataSource.destroy();
};

seedDatabase().catch((error) => console.error(error));
