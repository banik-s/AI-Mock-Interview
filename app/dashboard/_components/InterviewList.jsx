"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import InterviewItemCard from "./InterviewItemCard";
import { Skeleton } from "@/components/ui/skeleton";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.createdby, user?.primaryEmailAddress?.emailAddress)) // updated 'createdBy' to 'createdby'
        .orderBy(desc(MockInterview.id));

      console.log(result);
      setInterviewList(result);
    } catch (error) {
      console.error("Failed to fetch interview list:", error);
    }
  };

  const handleDeleteInterview = async (mockId) => {
    try {
      await db
        .delete(MockInterview)
        .where(eq(MockInterview.mockid, mockId))
        .execute(); // Ensure the delete operation is executed properly

      // Update state by filtering out the deleted interview
      setInterviewList((prevList) => prevList.filter((item) => item.mockid !== mockId));
      console.log(`Successfully deleted interview with ID: ${mockId}`);
    } catch (error) {
      console.error("Failed to delete interview:", error);
      alert("An error occurred while deleting the interview. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>

      {interviewList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {interviewList.map((interview, index) => (
            <InterviewItemCard
              key={index}
              interview={interview}
              onDelete={() => handleDeleteInterview(interview.mockid)} // Pass delete handler
            />
          ))}
        </div>
      ) : (
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      )}
    </div>
  );
};

export default InterviewList;
