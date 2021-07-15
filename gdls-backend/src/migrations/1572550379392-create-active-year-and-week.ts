/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class createActiveYearAndWeek1572550379392 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`insert into "year" (year, "isActive", id) values (2019, true, 1)`, undefined);
        await queryRunner.query(`insert into "week" ("weekNumber", "isActive", "yearId") values (43, true, 1)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
