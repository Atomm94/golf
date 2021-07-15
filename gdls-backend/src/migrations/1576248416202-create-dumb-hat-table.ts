/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class createDumbHatTable1576248416202 implements MigrationInterface {
    name = 'createDumbHatTable1576248416202'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "file" ADD "dumbHatUserId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "UQ_e305ae0f9385f4ff7ef5cdfac0a" UNIQUE ("dumbHatUserId")`, undefined);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_e305ae0f9385f4ff7ef5cdfac0a" FOREIGN KEY ("dumbHatUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_e305ae0f9385f4ff7ef5cdfac0a"`, undefined);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "UQ_e305ae0f9385f4ff7ef5cdfac0a"`, undefined);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "dumbHatUserId"`, undefined);
    }

}
