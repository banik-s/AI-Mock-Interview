"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDailog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      console.log("Job Details:", { jobPosition, jobDesc, jobExperience });
  
      const InputPrompt = `
        Job Position: ${jobPosition}, 
        Job Description: ${jobDesc}, 
        Years of Experience: ${jobExperience}.
        Based on this information, please provide 5 interview questions with answers in JSON format.
      `;
  
      console.log("Input Prompt Sent to AI:", InputPrompt);
  
      // AI Call
      const result = await chatSession.sendMessage(InputPrompt);
      const rawText = await result.response.text(); // Ensure await to get the actual response text
      console.log("Raw Response from AI:", result);
      console.log("Raw Text Response:", rawText);
  
      // Parse the AI response safely
      let jsonmockresp;
      try {
        jsonmockresp = JSON.parse(rawText.replace(/```json|```/g, "").trim());
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError);
        throw new Error("Failed to parse AI response as JSON.");
      }
  
      if (!jsonmockresp || jsonmockresp.length === 0) {
        throw new Error("Parsed jsonmockresp is empty or null");
      }
  
      // Convert JSON to string and escape problematic characters
      let jsonmockrespStr = JSON.stringify(jsonmockresp);
      jsonmockrespStr = jsonmockrespStr.replace(/'/g, "''"); // Escape single quotes for SQL compatibility
      console.log("Escaped jsonmockresp:", jsonmockrespStr);
  
      const mockId = uuidv4();
      console.log("Generated Mock ID:", mockId);
  
      const dataToInsert = {
        jsonmockresp: jsonmockrespStr,
        jobposition: jobPosition,
        jobdesc: jobDesc,
        jobexperience: jobExperience,
        createdby: user?.primaryEmailAddress?.emailAddress || "unknown",
        createdat: moment().format("YYYY-MM-DD"),
        mockid: mockId,
      };
  
      console.log("Data to be inserted into the database:", dataToInsert);
  
      // Insert into database
      const resp = await db.insert(MockInterview).values(dataToInsert).returning();
      console.log("Database Insert Response:", resp);
  
      if (resp) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + resp[0]?.mockid);
      }
    } catch (error) {
      console.error("Error fetching interview questions:", error);
    } finally {
      setLoading(false);
    }
  };
  

  
  
  
  


  return (
    <div>
      <div
        className="p-10 rounded-lg border bg-secondary hover:scale-105 hover:shadow-sm transition-all cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className=" text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDailog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviwing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div className="my-3">
                  <h2>
                    Add Details about your job position, job descritpion and
                    years of experience
                  </h2>

                  <div className="mt-7 my-3">
                    <label className="text-black">Job Role/job Position</label>
                    <Input
                      className="mt-1"
                      placeholder="Ex. Full stack Developer"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="my-5">
                    <label className="text-black">
                      Job Description/ Tech stack (In Short)
                    </label>
                    <Textarea
                      className="placeholder-opacity-50"
                      placeholder="Ex. React, Angular, Nodejs, Mysql, Nosql, Python"
                      required
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className="my-5">
                    <label className="text-black">Years of Experience</label>
                    <Input
                      className="mt-1"
                      placeholder="Ex. 5"
                      max="50"
                      type="number"
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="goast"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating From AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
