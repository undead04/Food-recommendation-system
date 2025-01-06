import dataSource from "./config/dataSource";
import { GroupRole } from "./entitys/GroupRole";
import { Region } from "./entitys/Region";
import AppRole from "./models/modelRequest/AppRole";
import BaseRepository from "./utils/BaseRepository";
import { Ingredient } from "./entitys/Ingredient";
import { Faker, faker, vi } from "@faker-js/faker";
import { Category } from "./entitys/Category";
import RecipeService from "./services/RecipeService";
import { statusUser, User } from "./entitys/User";
import { Rating } from "./entitys/Rating";
import { Recipe } from "./entitys/Recipe";
import UserService from "./services/UserService";
async function createRole(){
  const repository = new BaseRepository(GroupRole,'groupRole');
  
  if(!await (await repository.createQueryBuilder()).getOne()){
    // Tạo dữ liệu giả
    const record = [
      { name: AppRole.Admin, description: "Là Admin" },
      { name: AppRole.User, price: "Là User" },
    ];

    await dataSource.manager.transaction(async(transactionEntityManager)=>{
      await repository.createArray(record,transactionEntityManager)
    })
  }
}
async function createRegion(){
  const repository = new BaseRepository(Region,'region')
  const countries = [
    { name: "Việt Nam" },
    { name: "Mỹ" },
    { name: "Nhật Bản" },
    { name: "Đức" },
    { name: "Ấn Độ" },
    { name: "Pháp" },
    { name: "Canada" },
    { name: "Australia" },
    { name: "Trung Quốc" },
    { name: "Nga" },
  ];
  await dataSource.transaction(async(transactionManager)=>{
    await repository.createArray(countries,transactionManager)
  })
}
async function  createCategory() {
  const repo = new BaseRepository(Category,'category')
  const foodCategories = [
    "Appetizers",
    "Breads",
    "Soups",
    "Salads",
    "Seafood",
    "Meat Dishes",
    "Pasta",
    "Rice Dishes",
    "Vegetarian Dishes",
    "Pizza",
    "Breakfast Foods",
    "Burgers and Sandwiches",
    "Sweets and Desserts",
    "Snacks",
    "Drinks",
    "Ethnic Foods",
    "Fried Foods",
    "Grilled Foods",
    "Casseroles",
    "Baked Goods",
    "Frozen Foods",
    "Vegan/Plant-based Foods"
  ];
  const data = foodCategories.map(category=>({name:category}))
  await dataSource.manager.transaction(async (transactionEntityManager)=>{
    await repo.createArray(data,transactionEntityManager)
  })
}
async function createIngredient(){
  const ingredientRepo = new BaseRepository(Ingredient,'ingredient')
  if(await(await ingredientRepo.createQueryBuilder()).getOne()) return
try {
 // Tạo mảng unique gồm 10 đối tượng với name và image
 const uniqueNames = faker.helpers.uniqueArray(faker.commerce.productName, 500); // Tạo 4000 tên sản phẩm duy nhất
 const uniqueData = uniqueNames.map(name => ({
   name,
   imageUrl: faker.image.avatar(), // `image` không cần duy nhất
 }));
 
await dataSource.manager.transaction(async (transactionEntityManager)=>{
  await ingredientRepo.createArray(uniqueData,transactionEntityManager)
})
  
} catch (error) {
  console.error(error.message); // "Exceeded maxRetries"
}
}
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


async function createRecipe(){
  const service = new RecipeService()
  const repoCategory = new BaseRepository(Category,'category')
  const regionRepo = new BaseRepository(Region,'region')
  const categoryIds = await (await (await repoCategory.createQueryBuilder()).getMany()).map(item=>item.id)
  const regionIds = await (await (await regionRepo.createQueryBuilder()).getMany()).map(item=>item.id)
  const ingredientRepo = new BaseRepository(Ingredient,'ingredient')
  const ingredientIds = await (await (await ingredientRepo.createQueryBuilder()).getMany()).map(item=>item.id)
  try {
    
   // Tạo mảng unique gồm 10 đối tượng với name và image
   
   const uniqueNames = faker.helpers.uniqueArray(faker.commerce.productName, 1000); // Tạo 4000 tên sản phẩm duy nhất
   const uniqueData = uniqueNames.map(name => ({
     name,
     description:faker.commerce.productDescription(),
     instructions:faker.commerce.productDescription(),
     categoryId:Array.from({length:randomInt(0,4)},()=>categoryIds[randomInt(0,categoryIds.length-1)]),
     regionId:regionIds[randomInt(0,regionIds.length-1)],
     recipeIngredient:Array.from({length:randomInt(4,8)},()=>({
      ingredientId:ingredientIds[randomInt(0,ingredientIds.length-1)],
      quantity:randomInt(1,5),
      unit:faker.commerce.product()
     })),
     timeCook:randomInt(10,60),
     spice_level:randomInt(1,5),
     sweetness_level:randomInt(1,5),
     saltiness_level:randomInt(1,5),
     imageUrl: faker.image.avatar(), // `image` không cần duy nhất
   }));
   
  await service.createArray(uniqueData)
   
    
  } catch (error) {
    console.error(error.message); // "Exceeded maxRetries"
  }
}
async function createRating(){
  const repoUser = new BaseRepository(User,'user')
  const repoRating = new BaseRepository(Rating,'rating')
  const repoRecipe = new BaseRepository(Recipe,'recipe')
  const users = (await (await repoUser.createQueryBuilder()).getMany()).map(item=>item.id)
  const recipes = (await (await repoRecipe.createQueryBuilder()).getMany()).map(item=>item.id)
  const models = []
  const lengthUser = users.length-1
  for(const recipe of recipes){
    for(let i =0 ; i<=3 ;i++){
      models.push(
        {
          comment:faker.food.description(),
      rate:randomInt(1,5),
      recipe:{id:recipe},
      user:{id:users[randomInt(0,lengthUser)]}
        }
      )
    }
  }
  await dataSource.transaction(async(entityManager)=>{
    await repoRating.createArray(models,entityManager)
  })
}
async function createUser() {
  const service = new UserService()
  const repo = new BaseRepository(User,'user')
  const regionRepo = new BaseRepository(Region,'region')
  const regionIds = await (await (await regionRepo.createQueryBuilder()).getMany()).map(item=>item.id)
  const uniqueNames = faker.helpers.uniqueArray(faker.person.fullName, 500);
  const models =[]
  for(const name in uniqueNames){
    const hash =await service.hashPassword("admin1234")
    models.push({
      username:name,
      status:statusUser.complete,
      spice_preference:randomInt(1,5),
      sweetness_preference:randomInt(1,5),
      saltiness_preference:randomInt(1,5),
      description:faker.food.description(),
      groupRole:{id:2},
      region:{id:regionIds[randomInt(0,regionIds.length-1)]},
      password: hash
    })
  }
  await dataSource.transaction(async manager=>{
    await repo.createArray(models,manager)
  })
}
const seedDatabase = async () => {
  await dataSource.initialize()
  const start = Date.now()
  await createRating()
  const end = Date.now()
  console.log(`Thời gian thêm dữ liệu vào sql ${(end - start)/1000}`)
  console.log('Data seeded!');
  await dataSource.destroy();
};

seedDatabase().catch((error) => console.error(error));
