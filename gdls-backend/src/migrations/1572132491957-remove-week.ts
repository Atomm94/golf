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
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class removeWeek1572132491957 implements MigrationInterface {
    name = 'removeWeek1572132491957'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "round" DROP CONSTRAINT "FK_35e503e576565d25cb3fe09398b"`, undefined);
        await queryRunner.query(`ALTER TABLE "round" DROP COLUMN "weekId"`, undefined);
        await queryRunner.query(`ALTER TABLE "round" ADD "weekNumber" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "round" ADD "year" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "handicap" DROP DEFAULT`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "handicap" SET DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "round" DROP COLUMN "year"`, undefined);
        await queryRunner.query(`ALTER TABLE "round" DROP COLUMN "weekNumber"`, undefined);
        await queryRunner.query(`ALTER TABLE "round" ADD "weekId" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "round" ADD CONSTRAINT "FK_35e503e576565d25cb3fe09398b" FOREIGN KEY ("weekId") REFERENCES "week"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

}
