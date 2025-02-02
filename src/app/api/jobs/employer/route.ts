import Jobs from "@/models/jobs";
import { NextRequest, NextResponse } from "next/server";
import { server } from "@/libs/connect";

export const GET = async (req: NextRequest) => {
  try {
    await server();

     const employerJobs = await Jobs.find().populate(
       "user_id",
       "firstname"
     );

    return NextResponse.json(employerJobs, { status: 200 });
  } catch (error) {
    console.log("Error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ err: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { err: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
};
