/* eslint-disable */
/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class addYardageToHoleInOne1575075942666 implements MigrationInterface {
    name = 'addYardageToHoleInOne1575075942666'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "hole_in_one" ADD "yardage" integer NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "hole_in_one" DROP COLUMN "yardage"`, undefined);
    }

}
