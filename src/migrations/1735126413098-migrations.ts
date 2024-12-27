import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1735126413098 implements MigrationInterface {
    name = 'Migrations1735126413098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(50) NULL, \`password\` varchar(50) NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`fulltext_index\` (\`username\`), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recipe\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NULL, \`description\` varchar(250) NULL, \`instructions\` text NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`fulltext_index\` (\`name\`, \`description\`), UNIQUE INDEX \`IDX_5b490d0ac36eb4d537228888bf\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recipe_ingredient\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NULL, \`unit\` varchar(255) NULL, \`recipeId\` int NULL, \`ingredientId\` int NULL, INDEX \`IDX_Recipe_Ingredient\` (\`recipeId\`, \`ingredientId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recipe_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`recipeId\` int NULL, \`categoryId\` int NULL, INDEX \`IDX_Recipe_Category\` (\`recipeId\`, \`categoryId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recipe_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, \`recipeId\` int NULL, INDEX \`IDX_User_Recipe\` (\`userId\`, \`recipeId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ingredient_recipes_recipe\` (\`ingredientId\` int NOT NULL, \`recipeId\` int NOT NULL, INDEX \`IDX_072bbf7228576c8f78cd665789\` (\`ingredientId\`), INDEX \`IDX_d6419735e518590462fb34edc8\` (\`recipeId\`), PRIMARY KEY (\`ingredientId\`, \`recipeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category_recipes_recipe\` (\`categoryId\` int NOT NULL, \`recipeId\` int NOT NULL, INDEX \`IDX_fad83fdc5221169a730aa97936\` (\`categoryId\`), INDEX \`IDX_352ccbbbbc0256587a592a90e0\` (\`recipeId\`), PRIMARY KEY (\`categoryId\`, \`recipeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_favorite_recipes_recipe\` (\`userId\` int NOT NULL, \`recipeId\` int NOT NULL, INDEX \`IDX_ac7e011f61dde4ba68a295f5be\` (\`userId\`), INDEX \`IDX_eedce219e439c004d5b8b53d77\` (\`recipeId\`), PRIMARY KEY (\`userId\`, \`recipeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recipe_ingredients_ingredient\` (\`recipeId\` int NOT NULL, \`ingredientId\` int NOT NULL, INDEX \`IDX_b67e81a9afa83f2ee13440175c\` (\`recipeId\`), INDEX \`IDX_d2bbcf7bab477bfdcec65465c0\` (\`ingredientId\`), PRIMARY KEY (\`recipeId\`, \`ingredientId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recipe_categories_category\` (\`recipeId\` int NOT NULL, \`categoryId\` int NOT NULL, INDEX \`IDX_5ccd26151b1b1dbc4610aa9143\` (\`recipeId\`), INDEX \`IDX_20b2cfc776de9e8424c519d099\` (\`categoryId\`), PRIMARY KEY (\`recipeId\`, \`categoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recipe_users_user\` (\`recipeId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_fb09d2c3872126737e0fc8867e\` (\`recipeId\`), INDEX \`IDX_5f694e3c2cc7657e43ffd9c574\` (\`userId\`), PRIMARY KEY (\`recipeId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ingredient\` CHANGE \`name\` \`name\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`ingredient\` CHANGE \`imageUrl\` \`imageUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`name\` \`name\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` ADD CONSTRAINT \`FK_1ad3257a7350c39854071fba211\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` ADD CONSTRAINT \`FK_2879f9317daa26218b5915147e7\` FOREIGN KEY (\`ingredientId\`) REFERENCES \`ingredient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_category\` ADD CONSTRAINT \`FK_8e2c8741a606a3eb15302bed707\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_category\` ADD CONSTRAINT \`FK_a94ab495765ad778b0825031675\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_user\` ADD CONSTRAINT \`FK_72840498f373d843ed1f056639b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_user\` ADD CONSTRAINT \`FK_f54e802ace39545846bf874e766\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ingredient_recipes_recipe\` ADD CONSTRAINT \`FK_072bbf7228576c8f78cd6657898\` FOREIGN KEY (\`ingredientId\`) REFERENCES \`ingredient\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`ingredient_recipes_recipe\` ADD CONSTRAINT \`FK_d6419735e518590462fb34edc89\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`category_recipes_recipe\` ADD CONSTRAINT \`FK_fad83fdc5221169a730aa979365\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`category_recipes_recipe\` ADD CONSTRAINT \`FK_352ccbbbbc0256587a592a90e0e\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_favorite_recipes_recipe\` ADD CONSTRAINT \`FK_ac7e011f61dde4ba68a295f5be9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_favorite_recipes_recipe\` ADD CONSTRAINT \`FK_eedce219e439c004d5b8b53d77c\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredients_ingredient\` ADD CONSTRAINT \`FK_b67e81a9afa83f2ee13440175ce\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredients_ingredient\` ADD CONSTRAINT \`FK_d2bbcf7bab477bfdcec65465c0c\` FOREIGN KEY (\`ingredientId\`) REFERENCES \`ingredient\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`recipe_categories_category\` ADD CONSTRAINT \`FK_5ccd26151b1b1dbc4610aa9143a\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`recipe_categories_category\` ADD CONSTRAINT \`FK_20b2cfc776de9e8424c519d0997\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`recipe_users_user\` ADD CONSTRAINT \`FK_fb09d2c3872126737e0fc8867eb\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`recipe_users_user\` ADD CONSTRAINT \`FK_5f694e3c2cc7657e43ffd9c574f\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipe_users_user\` DROP FOREIGN KEY \`FK_5f694e3c2cc7657e43ffd9c574f\``);
        await queryRunner.query(`ALTER TABLE \`recipe_users_user\` DROP FOREIGN KEY \`FK_fb09d2c3872126737e0fc8867eb\``);
        await queryRunner.query(`ALTER TABLE \`recipe_categories_category\` DROP FOREIGN KEY \`FK_20b2cfc776de9e8424c519d0997\``);
        await queryRunner.query(`ALTER TABLE \`recipe_categories_category\` DROP FOREIGN KEY \`FK_5ccd26151b1b1dbc4610aa9143a\``);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredients_ingredient\` DROP FOREIGN KEY \`FK_d2bbcf7bab477bfdcec65465c0c\``);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredients_ingredient\` DROP FOREIGN KEY \`FK_b67e81a9afa83f2ee13440175ce\``);
        await queryRunner.query(`ALTER TABLE \`user_favorite_recipes_recipe\` DROP FOREIGN KEY \`FK_eedce219e439c004d5b8b53d77c\``);
        await queryRunner.query(`ALTER TABLE \`user_favorite_recipes_recipe\` DROP FOREIGN KEY \`FK_ac7e011f61dde4ba68a295f5be9\``);
        await queryRunner.query(`ALTER TABLE \`category_recipes_recipe\` DROP FOREIGN KEY \`FK_352ccbbbbc0256587a592a90e0e\``);
        await queryRunner.query(`ALTER TABLE \`category_recipes_recipe\` DROP FOREIGN KEY \`FK_fad83fdc5221169a730aa979365\``);
        await queryRunner.query(`ALTER TABLE \`ingredient_recipes_recipe\` DROP FOREIGN KEY \`FK_d6419735e518590462fb34edc89\``);
        await queryRunner.query(`ALTER TABLE \`ingredient_recipes_recipe\` DROP FOREIGN KEY \`FK_072bbf7228576c8f78cd6657898\``);
        await queryRunner.query(`ALTER TABLE \`recipe_user\` DROP FOREIGN KEY \`FK_f54e802ace39545846bf874e766\``);
        await queryRunner.query(`ALTER TABLE \`recipe_user\` DROP FOREIGN KEY \`FK_72840498f373d843ed1f056639b\``);
        await queryRunner.query(`ALTER TABLE \`recipe_category\` DROP FOREIGN KEY \`FK_a94ab495765ad778b0825031675\``);
        await queryRunner.query(`ALTER TABLE \`recipe_category\` DROP FOREIGN KEY \`FK_8e2c8741a606a3eb15302bed707\``);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` DROP FOREIGN KEY \`FK_2879f9317daa26218b5915147e7\``);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` DROP FOREIGN KEY \`FK_1ad3257a7350c39854071fba211\``);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`name\` \`name\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`ingredient\` CHANGE \`imageUrl\` \`imageUrl\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`ingredient\` CHANGE \`name\` \`name\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`IDX_5f694e3c2cc7657e43ffd9c574\` ON \`recipe_users_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_fb09d2c3872126737e0fc8867e\` ON \`recipe_users_user\``);
        await queryRunner.query(`DROP TABLE \`recipe_users_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_20b2cfc776de9e8424c519d099\` ON \`recipe_categories_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_5ccd26151b1b1dbc4610aa9143\` ON \`recipe_categories_category\``);
        await queryRunner.query(`DROP TABLE \`recipe_categories_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_d2bbcf7bab477bfdcec65465c0\` ON \`recipe_ingredients_ingredient\``);
        await queryRunner.query(`DROP INDEX \`IDX_b67e81a9afa83f2ee13440175c\` ON \`recipe_ingredients_ingredient\``);
        await queryRunner.query(`DROP TABLE \`recipe_ingredients_ingredient\``);
        await queryRunner.query(`DROP INDEX \`IDX_eedce219e439c004d5b8b53d77\` ON \`user_favorite_recipes_recipe\``);
        await queryRunner.query(`DROP INDEX \`IDX_ac7e011f61dde4ba68a295f5be\` ON \`user_favorite_recipes_recipe\``);
        await queryRunner.query(`DROP TABLE \`user_favorite_recipes_recipe\``);
        await queryRunner.query(`DROP INDEX \`IDX_352ccbbbbc0256587a592a90e0\` ON \`category_recipes_recipe\``);
        await queryRunner.query(`DROP INDEX \`IDX_fad83fdc5221169a730aa97936\` ON \`category_recipes_recipe\``);
        await queryRunner.query(`DROP TABLE \`category_recipes_recipe\``);
        await queryRunner.query(`DROP INDEX \`IDX_d6419735e518590462fb34edc8\` ON \`ingredient_recipes_recipe\``);
        await queryRunner.query(`DROP INDEX \`IDX_072bbf7228576c8f78cd665789\` ON \`ingredient_recipes_recipe\``);
        await queryRunner.query(`DROP TABLE \`ingredient_recipes_recipe\``);
        await queryRunner.query(`DROP INDEX \`IDX_User_Recipe\` ON \`recipe_user\``);
        await queryRunner.query(`DROP TABLE \`recipe_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_Recipe_Category\` ON \`recipe_category\``);
        await queryRunner.query(`DROP TABLE \`recipe_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_Recipe_Ingredient\` ON \`recipe_ingredient\``);
        await queryRunner.query(`DROP TABLE \`recipe_ingredient\``);
        await queryRunner.query(`DROP INDEX \`IDX_5b490d0ac36eb4d537228888bf\` ON \`recipe\``);
        await queryRunner.query(`DROP INDEX \`fulltext_index\` ON \`recipe\``);
        await queryRunner.query(`DROP TABLE \`recipe\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`fulltext_index\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
