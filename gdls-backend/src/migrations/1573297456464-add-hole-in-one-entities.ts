/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class addHoleInOneEntities1573297456464 implements MigrationInterface {
    name = 'addHoleInOneEntities1573297456464'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "hole_in_one_payment_obligation" ("id" SERIAL NOT NULL, "didPay" character varying NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userWithPaymentObligationId" integer NOT NULL, "holeInOneId" integer NOT NULL, CONSTRAINT "PK_4414b1c1a8bdd10aeeb695a10dd" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "hole_in_one" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "courseName" character varying NOT NULL, "holeNumber" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "clubId" integer NOT NULL, "winnerId" integer NOT NULL, CONSTRAINT "PK_02e1dfe5b0a79b0c0a692e1c60a" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "club" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_79282481e036a6e0b180afa38aa" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "hole_in_one_payment_obligation" ADD CONSTRAINT "FK_6e454cdb2f5088877cf66810fe2" FOREIGN KEY ("userWithPaymentObligationId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "hole_in_one_payment_obligation" ADD CONSTRAINT "FK_27f939138dfd9464f4dba0f0530" FOREIGN KEY ("holeInOneId") REFERENCES "hole_in_one"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "hole_in_one" ADD CONSTRAINT "FK_4829bbc7897e234333e1b862f5b" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "hole_in_one" ADD CONSTRAINT "FK_c768d315d4ed148b1aa44393cd0" FOREIGN KEY ("winnerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "hole_in_one" DROP CONSTRAINT "FK_c768d315d4ed148b1aa44393cd0"`, undefined);
        await queryRunner.query(`ALTER TABLE "hole_in_one" DROP CONSTRAINT "FK_4829bbc7897e234333e1b862f5b"`, undefined);
        await queryRunner.query(`ALTER TABLE "hole_in_one_payment_obligation" DROP CONSTRAINT "FK_27f939138dfd9464f4dba0f0530"`, undefined);
        await queryRunner.query(`ALTER TABLE "hole_in_one_payment_obligation" DROP CONSTRAINT "FK_6e454cdb2f5088877cf66810fe2"`, undefined);
        await queryRunner.query(`DROP TABLE "club"`, undefined);
        await queryRunner.query(`DROP TABLE "hole_in_one"`, undefined);
        await queryRunner.query(`DROP TABLE "hole_in_one_payment_obligation"`, undefined);
    }

}
