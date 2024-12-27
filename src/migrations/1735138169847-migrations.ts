import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1735138169847 implements MigrationInterface {
    name = 'Migrations1735138169847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`description\` text NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_240853a0c3353c25fb12434ad3\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group_role_permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`groupRoleId\` int NULL, \`permissionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group_role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`description\` text NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_280f82055c16b81ab2f90983f4\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`groupRoleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ingredient\` CHANGE \`name\` \`name\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`ingredient\` CHANGE \`imageUrl\` \`imageUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`name\` \`name\` varchar(50) NULL`);
        await queryRunner.query(`DROP INDEX \`fulltext_index\` ON \`recipe\``);
        await queryRunner.query(`ALTER TABLE \`recipe\` CHANGE \`name\` \`name\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`recipe\` CHANGE \`description\` \`description\` varchar(250) NULL`);
        await queryRunner.query(`ALTER TABLE \`recipe\` CHANGE \`instructions\` \`instructions\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`username\` \`username\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`recipe_user\` DROP FOREIGN KEY \`FK_72840498f373d843ed1f056639b\``);
        await queryRunner.query(`ALTER TABLE \`recipe_user\` DROP FOREIGN KEY \`FK_f54e802ace39545846bf874e766\``);
        await queryRunner.query(`DROP INDEX \`IDX_User_Recipe\` ON \`recipe_user\``);
        await queryRunner.query(`ALTER TABLE \`recipe_user\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`recipe_user\` CHANGE \`recipeId\` \`recipeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` DROP FOREIGN KEY \`FK_1ad3257a7350c39854071fba211\``);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` DROP FOREIGN KEY \`FK_2879f9317daa26218b5915147e7\``);
        await queryRunner.query(`DROP INDEX \`IDX_Recipe_Ingredient\` ON \`recipe_ingredient\``);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` CHANGE \`quantity\` \`quantity\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` CHANGE \`unit\` \`unit\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` CHANGE \`recipeId\` \`recipeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` CHANGE \`ingredientId\` \`ingredientId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`recipe_category\` DROP FOREIGN KEY \`FK_8e2c8741a606a3eb15302bed707\``);
        await queryRunner.query(`ALTER TABLE \`recipe_category\` DROP FOREIGN KEY \`FK_a94ab495765ad778b0825031675\``);
        await queryRunner.query(`DROP INDEX \`IDX_Recipe_Category\` ON \`recipe_category\``);
        await queryRunner.query(`ALTER TABLE \`recipe_category\` CHANGE \`recipeId\` \`recipeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`recipe_category\` CHANGE \`categoryId\` \`categoryId\` int NULL`);
        await queryRunner.query(`CREATE FULLTEXT INDEX \`fulltext_idx\` ON \`category\` (\`name\`)`);
        await queryRunner.query(`CREATE INDEX \`fulltext_index\` ON \`recipe\` (\`name\`, \`description\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_GroupRole\` ON \`user\` (\`groupRoleId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_User_Recipe\` ON \`recipe_user\` (\`userId\`, \`recipeId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_Recipe_Ingredient\` ON \`recipe_ingredient\` (\`recipeId\`, \`ingredientId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_Recipe_Category\` ON \`recipe_category\` (\`recipeId\`, \`categoryId\`)`);
        await queryRunner.query(`ALTER TABLE \`group_role_permission\` ADD CONSTRAINT \`FK_542fcdecad4a79dbee3bbe27250\` FOREIGN KEY (\`groupRoleId\`) REFERENCES \`group_role\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_role_permission\` ADD CONSTRAINT \`FK_83ebabf176958d675e0a73892be\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_88ff32ea732221f2c9ed3818908\` FOREIGN KEY (\`groupRoleId\`) REFERENCES \`group_role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_user\` ADD CONSTRAINT \`FK_72840498f373d843ed1f056639b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_user\` ADD CONSTRAINT \`FK_f54e802ace39545846bf874e766\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` ADD CONSTRAINT \`FK_1ad3257a7350c39854071fba211\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` ADD CONSTRAINT \`FK_2879f9317daa26218b5915147e7\` FOREIGN KEY (\`ingredientId\`) REFERENCES \`ingredient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_category\` ADD CONSTRAINT \`FK_8e2c8741a606a3eb15302bed707\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_category\` ADD CONSTRAINT \`FK_a94ab495765ad778b0825031675\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipe_category\` DROP FOREIGN KEY \`FK_a94ab495765ad778b0825031675\``);
        await queryRunner.query(`ALTER TABLE \`recipe_category\` DROP FOREIGN KEY \`FK_8e2c8741a606a3eb15302bed707\``);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` DROP FOREIGN KEY \`FK_2879f9317daa26218b5915147e7\``);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` DROP FOREIGN KEY \`FK_1ad3257a7350c39854071fba211\``);
        await queryRunner.query(`ALTER TABLE \`recipe_user\` DROP FOREIGN KEY \`FK_f54e802ace39545846bf874e766\``);
        await queryRunner.query(`ALTER TABLE \`recipe_user\` DROP FOREIGN KEY \`FK_72840498f373d843ed1f056639b\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_88ff32ea732221f2c9ed3818908\``);
        await queryRunner.query(`ALTER TABLE \`group_role_permission\` DROP FOREIGN KEY \`FK_83ebabf176958d675e0a73892be\``);
        await queryRunner.query(`ALTER TABLE \`group_role_permission\` DROP FOREIGN KEY \`FK_542fcdecad4a79dbee3bbe27250\``);
        await queryRunner.query(`DROP INDEX \`IDX_Recipe_Category\` ON \`recipe_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_Recipe_Ingredient\` ON \`recipe_ingredient\``);
        await queryRunner.query(`DROP INDEX \`IDX_User_Recipe\` ON \`recipe_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_GroupRole\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`fulltext_index\` ON \`recipe\``);
        await queryRunner.query(`DROP INDEX \`fulltext_idx\` ON \`category\``);
        await queryRunner.query(`ALTER TABLE \`recipe_category\` CHANGE \`categoryId\` \`categoryId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`recipe_category\` CHANGE \`recipeId\` \`recipeId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`CREATE INDEX \`IDX_Recipe_Category\` ON \`recipe_category\` (\`recipeId\`, \`categoryId\`)`);
        await queryRunner.query(`ALTER TABLE \`recipe_category\` ADD CONSTRAINT \`FK_a94ab495765ad778b0825031675\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_category\` ADD CONSTRAINT \`FK_8e2c8741a606a3eb15302bed707\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` CHANGE \`ingredientId\` \`ingredientId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` CHANGE \`recipeId\` \`recipeId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` CHANGE \`unit\` \`unit\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` CHANGE \`quantity\` \`quantity\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`CREATE INDEX \`IDX_Recipe_Ingredient\` ON \`recipe_ingredient\` (\`recipeId\`, \`ingredientId\`)`);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` ADD CONSTRAINT \`FK_2879f9317daa26218b5915147e7\` FOREIGN KEY (\`ingredientId\`) REFERENCES \`ingredient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` ADD CONSTRAINT \`FK_1ad3257a7350c39854071fba211\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_user\` CHANGE \`recipeId\` \`recipeId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`recipe_user\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`CREATE INDEX \`IDX_User_Recipe\` ON \`recipe_user\` (\`userId\`, \`recipeId\`)`);
        await queryRunner.query(`ALTER TABLE \`recipe_user\` ADD CONSTRAINT \`FK_f54e802ace39545846bf874e766\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_user\` ADD CONSTRAINT \`FK_72840498f373d843ed1f056639b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`username\` \`username\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`recipe\` CHANGE \`instructions\` \`instructions\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`recipe\` CHANGE \`description\` \`description\` varchar(250) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`recipe\` CHANGE \`name\` \`name\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`CREATE INDEX \`fulltext_index\` ON \`recipe\` (\`name\`, \`description\`)`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`name\` \`name\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`ingredient\` CHANGE \`imageUrl\` \`imageUrl\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`ingredient\` CHANGE \`name\` \`name\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`groupRoleId\``);
        await queryRunner.query(`DROP INDEX \`IDX_280f82055c16b81ab2f90983f4\` ON \`group_role\``);
        await queryRunner.query(`DROP TABLE \`group_role\``);
        await queryRunner.query(`DROP TABLE \`group_role_permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_240853a0c3353c25fb12434ad3\` ON \`permission\``);
        await queryRunner.query(`DROP TABLE \`permission\``);
    }

}
