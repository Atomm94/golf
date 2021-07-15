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
/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class addActiveFlags1572550291900 implements MigrationInterface {
    name = 'addActiveFlags1572550291900'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "year" ADD "isActive" boolean NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "week" DROP COLUMN "isActive"`, undefined);
        await queryRunner.query(`ALTER TABLE "week" ADD "isActive" boolean NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "week" DROP COLUMN "isActive"`, undefined);
        await queryRunner.query(`ALTER TABLE "week" ADD "isActive" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "year" DROP COLUMN "isActive"`, undefined);
    }

}
