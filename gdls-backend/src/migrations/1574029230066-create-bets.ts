/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class createBets1574029230066 implements MigrationInterface {
    name = 'createBets1574029230066'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "bets_group" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "PK_3ad3389ee019175627da8311e82" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "bet" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "amount" integer NOT NULL, "course" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "betsGroupId" integer NOT NULL, CONSTRAINT "PK_4ceea2cdef435807614b8e17aed" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "bets_group" ADD CONSTRAINT "FK_2240753a768db299a40e1e068ce" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "bet" ADD CONSTRAINT "FK_9b709ed3b2af53ad71fa43f07a8" FOREIGN KEY ("betsGroupId") REFERENCES "bets_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bet" DROP CONSTRAINT "FK_9b709ed3b2af53ad71fa43f07a8"`, undefined);
        await queryRunner.query(`ALTER TABLE "bets_group" DROP CONSTRAINT "FK_2240753a768db299a40e1e068ce"`, undefined);
        await queryRunner.query(`DROP TABLE "bet"`, undefined);
        await queryRunner.query(`DROP TABLE "bets_group"`, undefined);
    }

}
