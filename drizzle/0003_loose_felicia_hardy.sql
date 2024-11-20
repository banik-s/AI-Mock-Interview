ALTER TABLE "newsletter" ADD COLUMN "newname" varchar;--> statement-breakpoint
ALTER TABLE "newsletter" ADD COLUMN "newemail" varchar;--> statement-breakpoint
ALTER TABLE "newsletter" ADD COLUMN "newmessage" text;--> statement-breakpoint
ALTER TABLE "question" ADD COLUMN "mockquestionjsonresp" text NOT NULL;--> statement-breakpoint
ALTER TABLE "question" ADD COLUMN "jobposition" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "question" ADD COLUMN "jobdesc" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "question" ADD COLUMN "jobexperience" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "question" ADD COLUMN "typequestion" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "question" ADD COLUMN "createdby" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "question" ADD COLUMN "createdat" varchar;--> statement-breakpoint
ALTER TABLE "question" ADD COLUMN "mockid" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "userAnswer" ADD COLUMN "mockid" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "userAnswer" ADD COLUMN "correctans" text;--> statement-breakpoint
ALTER TABLE "userAnswer" ADD COLUMN "userans" text;--> statement-breakpoint
ALTER TABLE "userAnswer" ADD COLUMN "useremail" varchar;--> statement-breakpoint
ALTER TABLE "userAnswer" ADD COLUMN "createdat" varchar;--> statement-breakpoint
ALTER TABLE "newsletter" DROP COLUMN IF EXISTS "newName";--> statement-breakpoint
ALTER TABLE "newsletter" DROP COLUMN IF EXISTS "newEmail";--> statement-breakpoint
ALTER TABLE "newsletter" DROP COLUMN IF EXISTS "newMessage";--> statement-breakpoint
ALTER TABLE "question" DROP COLUMN IF EXISTS "MockQuestionJsonResp";--> statement-breakpoint
ALTER TABLE "question" DROP COLUMN IF EXISTS "jobPosition";--> statement-breakpoint
ALTER TABLE "question" DROP COLUMN IF EXISTS "jobDesc";--> statement-breakpoint
ALTER TABLE "question" DROP COLUMN IF EXISTS "jobExperience";--> statement-breakpoint
ALTER TABLE "question" DROP COLUMN IF EXISTS "typeQuestion";--> statement-breakpoint
ALTER TABLE "question" DROP COLUMN IF EXISTS "createdBy";--> statement-breakpoint
ALTER TABLE "question" DROP COLUMN IF EXISTS "createdAt";--> statement-breakpoint
ALTER TABLE "question" DROP COLUMN IF EXISTS "mockId";--> statement-breakpoint
ALTER TABLE "userAnswer" DROP COLUMN IF EXISTS "mockId";--> statement-breakpoint
ALTER TABLE "userAnswer" DROP COLUMN IF EXISTS "correctAns";--> statement-breakpoint
ALTER TABLE "userAnswer" DROP COLUMN IF EXISTS "userAns";--> statement-breakpoint
ALTER TABLE "userAnswer" DROP COLUMN IF EXISTS "userEmail";--> statement-breakpoint
ALTER TABLE "userAnswer" DROP COLUMN IF EXISTS "createdAt";