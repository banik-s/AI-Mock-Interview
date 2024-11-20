CREATE TABLE IF NOT EXISTS "mockinterview" (
	"id" serial PRIMARY KEY NOT NULL,
	"jsonmockresp" text NOT NULL,
	"jobPosition" varchar NOT NULL,
	"jobDesc" varchar NOT NULL,
	"jobExperience" varchar NOT NULL,
	"createdBy" varchar NOT NULL,
	"createdAt" varchar NOT NULL,
	"mockId" varchar NOT NULL
);
--> statement-breakpoint
DROP TABLE "mockInterview" CASCADE;