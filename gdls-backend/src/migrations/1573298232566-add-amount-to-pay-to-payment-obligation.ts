/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class addAmountToPayToPaymentObligation1573298232566 implements MigrationInterface {
    name = 'addAmountToPayToPaymentObligation1573298232566'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "hole_in_one_payment_obligation" ADD "amountToPay" integer NOT NULL DEFAULT 500`, undefined);
        await queryRunner.query(`ALTER TABLE "hole_in_one_payment_obligation" DROP COLUMN "didPay"`, undefined);
        await queryRunner.query(`ALTER TABLE "hole_in_one_payment_obligation" ADD "didPay" boolean NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "hole_in_one_payment_obligation" DROP COLUMN "didPay"`, undefined);
        await queryRunner.query(`ALTER TABLE "hole_in_one_payment_obligation" ADD "didPay" character varying NOT NULL DEFAULT false`, undefined);
        await queryRunner.query(`ALTER TABLE "hole_in_one_payment_obligation" DROP COLUMN "amountToPay"`, undefined);
    }

}
