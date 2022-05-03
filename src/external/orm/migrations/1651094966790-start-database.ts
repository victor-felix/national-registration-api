import {MigrationInterface, QueryRunner} from "typeorm";

export class startDatabase1651094966790 implements MigrationInterface {
    name = 'startDatabase1651094966790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "national_registration" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" character varying(14) NOT NULL, "blocked" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_48280cd27cca326bab694aa2715" UNIQUE ("number"), CONSTRAINT "PK_3fc59294b3772e33caaa9439562" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "national_registration"`);
    }

}
