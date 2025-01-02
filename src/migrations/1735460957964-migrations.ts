import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1735460957964 implements MigrationInterface {
    name = 'Migrations1735460957964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`description\` text NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_240853a0c3353c25fb12434ad3\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group_role_permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`groupRoleId\` int NULL, \`permissionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group_role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`description\` text NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_280f82055c16b81ab2f90983f4\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ingredient\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`imageUrl\` varchar(255) NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), FULLTEXT INDEX \`IDX_Name\` (\`name\`), UNIQUE INDEX \`IDX_b6802ac7fbd37aa71d856a95d8\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recipe_ingredient\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`unit\` varchar(255) NOT NULL, \`recipeId\` int NULL, \`ingredientId\` int NULL, INDEX \`IDX_Recipe_Ingredient\` (\`recipeId\`, \`ingredientId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), FULLTEXT INDEX \`fulltext_idx\` (\`name\`), UNIQUE INDEX \`IDX_23c05c292c439d77b0de816b50\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recipe_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`recipeId\` int NULL, \`categoryId\` int NULL, INDEX \`IDX_Recipe_Category\` (\`recipeId\`, \`categoryId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rating\` (\`id\` int NOT NULL AUTO_INCREMENT, \`comment\` varchar(255) NOT NULL, \`rate\` int NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`recipeId\` int NULL, \`userId\` int NULL, INDEX \`IDX_Rating\` (\`recipeId\`, \`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`region\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), FULLTEXT INDEX \`fulltext_idx\` (\`name\`), UNIQUE INDEX \`IDX_8d766fc1d4d2e72ecd5f6567a0\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recipe\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NULL, \`description\` varchar(250) NOT NULL, \`instructions\` text NOT NULL, \`imageUrl\` varchar(255) NOT NULL, \`timeCook\` int NOT NULL, \`spice_level\` int NOT NULL, \`sweetness_level\` int NOT NULL, \`saltiness_level\` int NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`regionId\` int NULL, INDEX \`IDX_Recipe\` (\`regionId\`, \`timeCook\`), FULLTEXT INDEX \`fulltext_index\` (\`name\`, \`description\`), UNIQUE INDEX \`IDX_5b490d0ac36eb4d537228888bf\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recipe_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, \`recipeId\` int NULL, INDEX \`IDX_User_Recipe\` (\`userId\`, \`recipeId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`search_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`search\` text NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, INDEX \`IDX_SearchHistory\` (\`userId\`), FULLTEXT INDEX \`IDX_Fulltext\` (\`search\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, \`isActivate\` tinyint NOT NULL DEFAULT 0, \`spice_preference\` int NOT NULL, \`sweetness_preference\` int NOT NULL, \`saltiness_preference\` int NOT NULL, \`description\` varchar(255) NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`groupRoleId\` int NULL, \`regionId\` int NULL, INDEX \`IDX_GroupRole\` (\`groupRoleId\`, \`regionId\`), FULLTEXT INDEX \`fulltext_index\` (\`username\`), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`group_role_permission\` ADD CONSTRAINT \`FK_542fcdecad4a79dbee3bbe27250\` FOREIGN KEY (\`groupRoleId\`) REFERENCES \`group_role\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_role_permission\` ADD CONSTRAINT \`FK_83ebabf176958d675e0a73892be\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` ADD CONSTRAINT \`FK_1ad3257a7350c39854071fba211\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` ADD CONSTRAINT \`FK_2879f9317daa26218b5915147e7\` FOREIGN KEY (\`ingredientId\`) REFERENCES \`ingredient\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_category\` ADD CONSTRAINT \`FK_8e2c8741a606a3eb15302bed707\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_category\` ADD CONSTRAINT \`FK_a94ab495765ad778b0825031675\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rating\` ADD CONSTRAINT \`FK_52e568d130cc658fc17c9dd00ff\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rating\` ADD CONSTRAINT \`FK_a6c53dfc89ba3188b389ef29a62\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe\` ADD CONSTRAINT \`FK_fcc6d455fec2c53016070741f58\` FOREIGN KEY (\`regionId\`) REFERENCES \`region\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_user\` ADD CONSTRAINT \`FK_72840498f373d843ed1f056639b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_user\` ADD CONSTRAINT \`FK_f54e802ace39545846bf874e766\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`search_history\` ADD CONSTRAINT \`FK_11fdc5f9da08d75bbab5296bcd5\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_88ff32ea732221f2c9ed3818908\` FOREIGN KEY (\`groupRoleId\`) REFERENCES \`group_role\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_f1a2565b8f2580a146871cf1142\` FOREIGN KEY (\`regionId\`) REFERENCES \`region\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_f1a2565b8f2580a146871cf1142\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_88ff32ea732221f2c9ed3818908\``);
        await queryRunner.query(`ALTER TABLE \`search_history\` DROP FOREIGN KEY \`FK_11fdc5f9da08d75bbab5296bcd5\``);
        await queryRunner.query(`ALTER TABLE \`recipe_user\` DROP FOREIGN KEY \`FK_f54e802ace39545846bf874e766\``);
        await queryRunner.query(`ALTER TABLE \`recipe_user\` DROP FOREIGN KEY \`FK_72840498f373d843ed1f056639b\``);
        await queryRunner.query(`ALTER TABLE \`recipe\` DROP FOREIGN KEY \`FK_fcc6d455fec2c53016070741f58\``);
        await queryRunner.query(`ALTER TABLE \`rating\` DROP FOREIGN KEY \`FK_a6c53dfc89ba3188b389ef29a62\``);
        await queryRunner.query(`ALTER TABLE \`rating\` DROP FOREIGN KEY \`FK_52e568d130cc658fc17c9dd00ff\``);
        await queryRunner.query(`ALTER TABLE \`recipe_category\` DROP FOREIGN KEY \`FK_a94ab495765ad778b0825031675\``);
        await queryRunner.query(`ALTER TABLE \`recipe_category\` DROP FOREIGN KEY \`FK_8e2c8741a606a3eb15302bed707\``);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` DROP FOREIGN KEY \`FK_2879f9317daa26218b5915147e7\``);
        await queryRunner.query(`ALTER TABLE \`recipe_ingredient\` DROP FOREIGN KEY \`FK_1ad3257a7350c39854071fba211\``);
        await queryRunner.query(`ALTER TABLE \`group_role_permission\` DROP FOREIGN KEY \`FK_83ebabf176958d675e0a73892be\``);
        await queryRunner.query(`ALTER TABLE \`group_role_permission\` DROP FOREIGN KEY \`FK_542fcdecad4a79dbee3bbe27250\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`fulltext_index\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_GroupRole\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_Fulltext\` ON \`search_history\``);
        await queryRunner.query(`DROP INDEX \`IDX_SearchHistory\` ON \`search_history\``);
        await queryRunner.query(`DROP TABLE \`search_history\``);
        await queryRunner.query(`DROP INDEX \`IDX_User_Recipe\` ON \`recipe_user\``);
        await queryRunner.query(`DROP TABLE \`recipe_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_5b490d0ac36eb4d537228888bf\` ON \`recipe\``);
        await queryRunner.query(`DROP INDEX \`fulltext_index\` ON \`recipe\``);
        await queryRunner.query(`DROP INDEX \`IDX_Recipe\` ON \`recipe\``);
        await queryRunner.query(`DROP TABLE \`recipe\``);
        await queryRunner.query(`DROP INDEX \`IDX_8d766fc1d4d2e72ecd5f6567a0\` ON \`region\``);
        await queryRunner.query(`DROP INDEX \`fulltext_idx\` ON \`region\``);
        await queryRunner.query(`DROP TABLE \`region\``);
        await queryRunner.query(`DROP INDEX \`IDX_Rating\` ON \`rating\``);
        await queryRunner.query(`DROP TABLE \`rating\``);
        await queryRunner.query(`DROP INDEX \`IDX_Recipe_Category\` ON \`recipe_category\``);
        await queryRunner.query(`DROP TABLE \`recipe_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_23c05c292c439d77b0de816b50\` ON \`category\``);
        await queryRunner.query(`DROP INDEX \`fulltext_idx\` ON \`category\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP INDEX \`IDX_Recipe_Ingredient\` ON \`recipe_ingredient\``);
        await queryRunner.query(`DROP TABLE \`recipe_ingredient\``);
        await queryRunner.query(`DROP INDEX \`IDX_b6802ac7fbd37aa71d856a95d8\` ON \`ingredient\``);
        await queryRunner.query(`DROP INDEX \`IDX_Name\` ON \`ingredient\``);
        await queryRunner.query(`DROP TABLE \`ingredient\``);
        await queryRunner.query(`DROP INDEX \`IDX_280f82055c16b81ab2f90983f4\` ON \`group_role\``);
        await queryRunner.query(`DROP TABLE \`group_role\``);
        await queryRunner.query(`DROP TABLE \`group_role_permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_240853a0c3353c25fb12434ad3\` ON \`permission\``);
        await queryRunner.query(`DROP TABLE \`permission\``);
    }

}
