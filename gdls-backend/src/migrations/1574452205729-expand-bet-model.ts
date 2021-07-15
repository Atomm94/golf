/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class expandBetModel1574452205729 implements MigrationInterface {
    name = 'expandBetModel1574452205729'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bet" ADD "currentAdvantage" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "bet" ADD "nextAdvantage" integer`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bet" DROP COLUMN "nextAdvantage"`, undefined);
        await queryRunner.query(`ALTER TABLE "bet" DROP COLUMN "currentAdvantage"`, undefined);
    }

}
