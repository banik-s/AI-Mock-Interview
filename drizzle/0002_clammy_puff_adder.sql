ALTER TABLE "mockinterview" ADD COLUMN "jobposition" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "mockinterview" ADD COLUMN "jobdesc" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "mockinterview" ADD COLUMN "jobexperience" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "mockinterview" ADD COLUMN "createdby" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "mockinterview" ADD COLUMN "createdat" date NOT NULL;--> statement-breakpoint
ALTER TABLE "mockinterview" ADD COLUMN "mockid" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "mockinterview" DROP COLUMN IF EXISTS "jobPosition";--> statement-breakpoint
ALTER TABLE "mockinterview" DROP COLUMN IF EXISTS "jobDesc";--> statement-breakpoint
ALTER TABLE "mockinterview" DROP COLUMN IF EXISTS "jobExperience";--> statement-breakpoint
ALTER TABLE "mockinterview" DROP COLUMN IF EXISTS "createdBy";--> statement-breakpoint
ALTER TABLE "mockinterview" DROP COLUMN IF EXISTS "createdAt";--> statement-breakpoint
ALTER TABLE "mockinterview" DROP COLUMN IF EXISTS "mockId";