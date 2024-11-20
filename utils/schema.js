import { pgTable, serial, varchar, text, date } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockinterview', {
    id: serial('id').primaryKey(),
    jsonmockresp: text('jsonmockresp').notNull(),
    jobposition: varchar('jobposition').notNull(),
    jobdesc: varchar('jobdesc').notNull(),
    jobexperience: varchar('jobexperience').notNull(),
    createdby: varchar('createdby').notNull(),
    createdat: date('createdat').notNull(),
    mockid: varchar('mockid').notNull(),
});

export const Question = pgTable('question', {
    id: serial('id').primaryKey(),
    mockquestionjsonresp: text('mockquestionjsonresp').notNull(),
    jobposition: varchar('jobposition').notNull(),
    jobdesc: varchar('jobdesc').notNull(),
    jobexperience: varchar('jobexperience').notNull(),
    typequestion: varchar('typequestion').notNull(),
    company: varchar('company').notNull(),
    createdby: varchar('createdby').notNull(),
    createdat: varchar('createdat'),
    mockid: varchar('mockid').notNull()
});



export const UserAnswer = pgTable('userAnswer',{
    id: serial('id').primaryKey(),
    mockidref: varchar('mockid').notNull(),
    question: varchar('question').notNull(),
    correctans: text('correctans'),
    userans: text('userans'),
    feedback: text('feedback'),
    rating: varchar('rating'),
    useremail: varchar('useremail'),
    createdat: varchar('createdat')
})


export const Newsletter = pgTable('newsletter',{
    id: serial('id').primaryKey(),
    newname: varchar('newname'),
    newemail: varchar('newemail'),
    newmessage: text('newmessage'),
    createdAt: varchar('createdAt')
})