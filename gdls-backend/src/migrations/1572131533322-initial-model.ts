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
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class initialModel1572131533322 implements MigrationInterface {
    name = 'initialModel1572131533322'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_f0f2188b3e254ad31ba2b95ec4b"`, undefined);
        await queryRunner.query(`CREATE TABLE "week" ("id" SERIAL NOT NULL, "weekNumber" integer NOT NULL, "year" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1f85dfadd5f363a1d0bce2b9664" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "round" ("id" SERIAL NOT NULL, "score" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, "weekId" integer NOT NULL, CONSTRAINT "PK_34bd959f3f4a90eb86e4ae24d2d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "postId"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "location" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "description" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "handicap" integer NOT NULL DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "round" ADD CONSTRAINT "FK_ec27aa2ac080b5ed3ec7c8c3c8a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "round" ADD CONSTRAINT "FK_35e503e576565d25cb3fe09398b" FOREIGN KEY ("weekId") REFERENCES "week"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "round" DROP CONSTRAINT "FK_35e503e576565d25cb3fe09398b"`, undefined);
        await queryRunner.query(`ALTER TABLE "round" DROP CONSTRAINT "FK_ec27aa2ac080b5ed3ec7c8c3c8a"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "handicap"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "description"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "location"`, undefined);
        await queryRunner.query(`ALTER TABLE "file" ADD "postId" integer`, undefined);
        await queryRunner.query(`DROP TABLE "round"`, undefined);
        await queryRunner.query(`DROP TABLE "week"`, undefined);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_f0f2188b3e254ad31ba2b95ec4b" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
    }

}
