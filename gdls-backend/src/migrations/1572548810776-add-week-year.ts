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

export class addWeekYear1572548810776 implements MigrationInterface {
    name = 'addWeekYear1572548810776'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "year" ("id" SERIAL NOT NULL, "year" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_506885a7430147dbff28fa689fd" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "week" DROP COLUMN "year"`, undefined);
        await queryRunner.query(`ALTER TABLE "round" DROP COLUMN "weekNumber"`, undefined);
        await queryRunner.query(`ALTER TABLE "round" DROP COLUMN "year"`, undefined);
        await queryRunner.query(`ALTER TABLE "week" ADD "isActive" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "week" ADD "yearId" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "round" ADD "weekId" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "week" ADD CONSTRAINT "FK_06eae9b1eb133bb88822a6b1ea5" FOREIGN KEY ("yearId") REFERENCES "year"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "round" ADD CONSTRAINT "FK_35e503e576565d25cb3fe09398b" FOREIGN KEY ("weekId") REFERENCES "week"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "round" DROP CONSTRAINT "FK_35e503e576565d25cb3fe09398b"`, undefined);
        await queryRunner.query(`ALTER TABLE "week" DROP CONSTRAINT "FK_06eae9b1eb133bb88822a6b1ea5"`, undefined);
        await queryRunner.query(`ALTER TABLE "round" DROP COLUMN "weekId"`, undefined);
        await queryRunner.query(`ALTER TABLE "week" DROP COLUMN "yearId"`, undefined);
        await queryRunner.query(`ALTER TABLE "week" DROP COLUMN "isActive"`, undefined);
        await queryRunner.query(`ALTER TABLE "round" ADD "year" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "round" ADD "weekNumber" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "week" ADD "year" integer NOT NULL`, undefined);
        await queryRunner.query(`DROP TABLE "year"`, undefined);
    }

}
