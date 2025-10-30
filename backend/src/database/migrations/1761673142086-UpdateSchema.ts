import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSchema1761673142086 implements MigrationInterface {
  name = 'UpdateSchema1761673142086';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "podcasts" ("id" SERIAL NOT NULL, "trackId" integer NOT NULL, "trackName" character varying NOT NULL, "artistName" character varying, "collectionName" character varying, "trackViewUrl" character varying, "artworkUrl100" character varying, "artworkUrl600" character varying, "feedUrl" text, "country" character varying, "primaryGenreName" character varying, "trackCount" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1a3c75b20e25359cfc2add68aee" UNIQUE ("trackId"), CONSTRAINT "PK_6df41936ccc877b29da54f11912" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_PODCAST_CREATED_AT" ON "podcasts" ("createdAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_PODCAST_ARTIST_NAME" ON "podcasts" ("artistName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_PODCAST_TRACK_NAME" ON "podcasts" ("trackName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_PODCAST_TRACK_ID" ON "podcasts" ("trackId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_PODCAST_TRACK_ID"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_PODCAST_TRACK_NAME"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_PODCAST_ARTIST_NAME"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_PODCAST_CREATED_AT"`);
    await queryRunner.query(`DROP TABLE "podcasts"`);
  }
}
