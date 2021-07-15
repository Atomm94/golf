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

export class addedUserPhoneField1572173232102 implements MigrationInterface {
    name = 'addedUserPhoneField1572173232102'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`, undefined);
    }

}
