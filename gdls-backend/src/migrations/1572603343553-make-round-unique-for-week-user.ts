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

export class makeRoundUniqueForWeekUser1572603343553 implements MigrationInterface {
    name = 'makeRoundUniqueForWeekUser1572603343553'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "round" ADD CONSTRAINT "UQ_c553dadffc666b2d23c5a022ea3" UNIQUE ("userId", "weekId")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "round" DROP CONSTRAINT "UQ_c553dadffc666b2d23c5a022ea3"`, undefined);
    }

}
