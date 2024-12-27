import dataSource from "./dataSource";
import { GroupRole } from "./entitys/GroupRole";
import AppRole from "./models/modelRequest/AppRole";
import BaseRepository from "./services/BaseRepository";


const seedDatabase = async () => {
  await dataSource.initialize()

  const repository = new BaseRepository(GroupRole,'groupRole');

  // Tạo dữ liệu giả
  const record = [
    { name: AppRole.Admin, description: "Là Admin" },
    { name: AppRole.User, price: "Là User" },
  ];

  await dataSource.manager.transaction(async(transactionEntityManager)=>{
    await repository.createArray(record,transactionEntityManager)
  })

  console.log('Data seeded!');
  await dataSource.destroy();
};

seedDatabase().catch((error) => console.error(error));
