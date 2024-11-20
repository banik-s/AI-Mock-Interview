"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import Link from "next/link";
import { useContext } from 'react';
import { WebCamContext } from "../../layout";
import { use } from "react";

const Interview = ({ params: paramsPromise }) => {
  const params = use(paramsPromise); // Unwrap the params promise
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const [interviewData, setInterviewData] = useState();

  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails(params.interviewId); // Pass the unwrapped interviewId to GetInterviewDetails
  }, [params]);
  
  const GetInterviewDetails = async (interviewId) => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockid, interviewId));

      if (result && result.length > 0) {
        console.log("Fetched Interview Data:", result[0]);
        setInterviewData(result[0]);
      } else {
        console.error("No interview data found for ID:", interviewId);
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div className="my-10 mx-auto max-w-6xl flex flex-col items-center">
      <h2 className="font-bold text-3xl text-center mb-8">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
        {/* Job Details Section */}
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-lg border shadow-md bg-white">
            <h2 className="text-lg mb-3 font-semibold">
              <strong>Job Role/Job Position:</strong> {interviewData?.jobposition}
            </h2>
            <h2 className="text-lg mb-3 font-semibold">
              <strong>Job Description/Job Stack:</strong> {interviewData?.jobdesc}
            </h2>
            <h2 className="text-lg mb-3 font-semibold">
              <strong>Years of Experience:</strong> {interviewData?.jobexperience}
            </h2>
          </div>
          <div className="p-6 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 shadow-md">
            <h2 className="flex gap-2 items-center text-yellow-700 mb-4">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="text-yellow-600">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>
        {/* Webcam Section */}
        <div className="flex flex-col items-center justify-between">
          {webCamEnabled ? (
            <div className="flex items-center justify-center p-4 w-full">
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                height={300}
                width={300}
                mirrored={true}
                className="rounded-lg shadow-lg border"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center mt-4 w-full">
              <WebcamIcon className="h-60 w-60 p-6 bg-secondary rounded-lg border shadow-md" />
            </div>
          )}
          <div className="w-full mt-6">
            <Button
              className={`${webCamEnabled ? "w-full" : "w-full"} bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300`}
              onClick={() => setWebCamEnabled((prev) => !prev)}
            >
              {webCamEnabled ? "Close Webcam" : "Enable Webcam and Microphone"}
            </Button>
          </div>
        </div>
      </div>
      {/* Start Interview Button */}
      <div className="w-full flex justify-center mt-12">
        <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-md transition duration-300 shadow-md">
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
