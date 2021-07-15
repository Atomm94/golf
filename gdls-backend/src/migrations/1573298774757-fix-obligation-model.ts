/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class fixObligationModel1573298774757 implements MigrationInterface {
    name = 'fixObligationModel1573298774757'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "hole_in_one_payment_obligation" ALTER COLUMN "amountToPay" DROP DEFAULT`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "hole_in_one_payment_obligation" ALTER COLUMN "amountToPay" SET DEFAULT 500`, undefined);
    }

}
