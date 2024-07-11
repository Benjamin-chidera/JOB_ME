"use client";

import React, { useEffect, useState } from "react";
import insta from "../../../../../public/insta.png";
import map from "../../../../../public/map.png";
import Image from "next/image";
import { CiClock2, CiUser } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { GoBriefcase } from "react-icons/go";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { RelatedJobs } from "@/components/JobListlings/relatedJobs/RelatedJobs";
import { useDispatch, useSelector } from "react-redux";
import { getEmployerJobsDetails } from "@/redux/app/jobSlice";
import { format } from "timeago.js";

const EmployerJobDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const dispatch = useDispatch();
  const { getEmployerJobsDetail } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getEmployerJobsDetails(id));
  }, [id]);

  const responsibilities = getEmployerJobsDetail?.responsibilities
    ? JSON.parse(getEmployerJobsDetail?.responsibilities)
    : [];
  const skills = getEmployerJobsDetail?.skills
    ? JSON.parse(getEmployerJobsDetail?.skills)
    : [];

  return (
    <main className=" mt-10">
      <section className="lg:flex justify-center gap-14 mb-10 w-11/12 mx-auto">
        <section>
          <div className=" bg-[#DBF7FD] p-7 rounded-xl w-[500px] max-w-full">
            <Image
              src={getEmployerJobsDetail?.companyImage}
              alt="company-logo"
              width={40}
              height={40}
              className="w-10 h-10 shadow-lg"
            />
            <h2 className=" font-semibold text-2xl mt-3">
              {getEmployerJobsDetail?.positions}
            </h2>
            <p className=" max-w-md my-3">
              {getEmployerJobsDetail?.description}
            </p>

            <p className=" mt-10 font-semibold text-xl">Job Information:</p>

            <section className=" bg-white shadow-xl p-5 w-fit mt-3 rounded-xl border-2 flex flex-col gap-2">
              <p className=" font-semibold flex items-center gap-2">
                <span>
                  <CiUser size={20} />
                </span>{" "}
                Employment Type:{" "}
                <span className="text-blue-300 font-medium">
                  {" "}
                  {getEmployerJobsDetail?.jobType}
                </span>
              </p>

              <p className=" font-semibold flex items-center gap-2">
                <span>
                  <IoLocationOutline size={20} />
                </span>{" "}
                Location:{" "}
                <span className="text-blue-300 font-medium">
                  {" "}
                  {getEmployerJobsDetail?.country}
                </span>
              </p>

              <p className=" font-semibold flex items-center gap-2">
                <span>
                  <CiClock2 size={20} />
                </span>{" "}
                Date Posted:{" "}
                <span className="text-blue-300 font-medium">
                  {" "}
                  {format(getEmployerJobsDetail?.created_at)}
                </span>
              </p>

              <p className=" font-semibold flex items-center gap-2">
                <span>
                  <GoBriefcase size={20} />
                </span>{" "}
                Experience:{" "}
                <span className="text-blue-300 font-medium">
                  {" "}
                  {getEmployerJobsDetail?.experience}{" "}
                  {getEmployerJobsDetail?.experience > 2 ? "Year" : "Years"}
                </span>
              </p>

              <p className=" font-semibold flex items-center gap-2">
                <span>
                  <BsCurrencyDollar size={20} />
                </span>{" "}
                Salary:{" "}
                <span className="text-blue-300 font-medium">
                  {" "}
                  {getEmployerJobsDetail?.salary}
                </span>
              </p>
            </section>
          </div>

          <div className=" mt-4">
            <Image
              src={map}
              alt="map"
              className=" w-[500px] max-w-full h-[400px] object-cover rounded-xl"
            />
          </div>
        </section>
        <section className="mx-5 lg:mx-0 mt-7 lg:mt-0">
          <h2 className=" font-semibold text-2xl">Job Description:</h2>
          <p className="max-w-4xl my-5">{getEmployerJobsDetail?.description}</p>

          <section className=" mt-10">
            {/*   Duties & Responsibilities: */}
            <h2 className=" font-semibold text-2xl">
              Duties & Responsibilities:
            </h2>

            <div className=" mt-5">
              <ul className=" space-y-3">
                {responsibilities.map((item, index) => (
                  <li
                    key={index}
                    className=" flex md:items-center gap-2 font-[500]"
                  >
                    <span>
                      <IoIosCheckmarkCircle color="#0DCAF0" size={24} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className=" mt-10">
            {/*  Skills & Qualifications: */}
            <h2 className=" font-semibold text-2xl">
              Skills & Qualifications:
            </h2>

            <div className=" mt-5">
              <ul className=" space-y-3">
                {skills.map((item, index) => (
                  <li
                    key={index}
                    className=" flex md:items-center gap-2 font-[500]"
                  >
                    <span>
                      <IoIosCheckmarkCircle color="#0DCAF0" size={24} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </section>
      </section>

      <section className=" mt-24 mb-10">
        <div className=" text-center">
          <h2 className=" font-semibold text-xl">Related Jobs</h2>
          <p className=" font-medium">
            Lorem ipsum dolor sit amet consectetur. Risus tempus eget egestas
            dolor ut. At interdum amet id duis pulvinar quis massa elit. Amet
            quam commodo est pulvinar vitae.
          </p>
        </div>

        <div className=" mt-10">
          <RelatedJobs />
        </div>
      </section>
    </main>
  );
};

export default EmployerJobDetails;
