"use client";


export interface RootState {
  jobs: {
    applicantJobDetails: any; 
    allJobs: any[];
   
    status: string;
  };

}



import React, { useEffect, useState } from "react";
import map from "../../../../../../public/map.png";
import Image from "next/image";
import { CiClock2, CiUser } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { GoBriefcase } from "react-icons/go";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { RelatedJobs } from "@/components/JobListlings/relatedJobs/RelatedJobs";
import { useDispatch, useSelector } from "react-redux";
import {
  applyJobs,
  getAllJobs,
  getApplicantJobDetails,
  getEmployerJobsDetails,
} from "@/redux/app/jobSlice";
import { format } from "timeago.js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import "@cyntler/react-doc-viewer/dist/index.css";
import { PDFViewer } from "@react-pdf/renderer";
import { MyPdf } from "@/components/pdf/MyPdf";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { JobDetailsSkeletonName, JobDetailsSkeletonText } from "@/components/skeleton/JobDetailsSkeleton";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoMdCall } from "react-icons/io";



const ApplicantsDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { applicantJobDetails, allJobs, status } = useAppSelector(
    (state: RootState) => state.jobs
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getApplicantJobDetails(id));
    dispatch(getAllJobs());
  }, [id, dispatch]);

  const isRelated = allJobs.filter(
    (job) => job?.positions === applicantJobDetails?.positions
  );

  const sliceRelatedJobs = isRelated?.slice(0, 3);
  console.log({ sliceRelatedJobs });

  console.log(applicantJobDetails);

  return (
    <main className=" mt-10">
      <section className="lg:flex justify-center gap-14 mb-10 w-11/12 mx-auto">
        <section>
          {status === "loading" ? (
            <JobDetailsSkeletonName />
          ) : (
            <div className=" bg-[#DBF7FD] p-7 rounded-xl w-[500px] max-w-full">
              <p className=" mt-10 font-semibold text-xl">Job Information:</p>

              <section className=" bg-white shadow-xl p-5 w-fit mt-3 rounded-xl border-2 flex flex-col gap-2">
                <p className=" font-semibold">Applicant Details:</p>

                <p className=" font-semibold flex items-center gap-2">
                  <span>
                    <CiUser size={20} />
                  </span>{" "}
                  First Name:{" "}
                  <span className="text-blue-300 font-medium">
                    {" "}
                    {applicantJobDetails?.firstname}
                  </span>
                </p>

                <p className=" font-semibold flex items-center gap-2">
                  <span>
                    <CiUser size={20} />
                  </span>{" "}
                  Last Name:{" "}
                  <span className="text-blue-300 font-medium">
                    {" "}
                    {applicantJobDetails?.lastname}
                  </span>
                </p>

                <p className=" font-semibold flex items-center gap-2">
                  <span>
                    <MdOutlineMailOutline size={20} />
                  </span>{" "}
                  Email Address:{" "}
                  <span className="text-blue-300 font-medium">
                    {" "}
                    {applicantJobDetails?.email}{" "}
                  </span>
                </p>

                <p className=" font-semibold flex items-center gap-2">
                  <span>
                    <IoMdCall size={20} />
                  </span>{" "}
                  Phone Number:{" "}
                  <span className="text-blue-300 font-medium">
                    {" "}
                    {applicantJobDetails?.phonenumber}
                  </span>
                </p>
              </section>
            </div>
          )}
        </section>
        <section className="mx-5 lg:mx-0 mt-7 lg:mt-0">
          {status === "loading" ? (
            <JobDetailsSkeletonText />
          ) : (
            <h2 className="font-semibold text-2xl">Job Description:</h2>
          )}

          {status === "loading" ? (
            <JobDetailsSkeletonText />
          ) : (
            <p className="font-semibold text-sm">Cover letter</p>
          )}

          {status === "loading" ? (
            <JobDetailsSkeletonText />
          ) : (
            <p> {applicantJobDetails?.coverletter}</p>
          )}

          {/* <PDFViewer>
            <MyPdf applicantJobDetails={applicantJobDetails?.resume} />
          </PDFViewer>

          <iframe
            src={applicantJobDetails?.resume}
            width="500px"
            height="600px"
          /> */}
        </section>
      </section>
    </main>
  );
};

export default ApplicantsDetails;
