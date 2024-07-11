"use client";

import { EmployerJobList } from "@/components/JobListlings/employerJobLists/EmployerJobList";
import { JobLists } from "@/components/JobListlings/JobsList/JobLists";
import { getEmployerJobs } from "@/redux/app/jobSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Employer = () => {
  const dispatch = useDispatch();
  const { employerJobs } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getEmployerJobs());
  }, []);

  return (
    <main className=" w-11/12 mx-auto mb-10">
      {employerJobs.map((j) => (
        <EmployerJobList key={j.id} j={j} />
      ))}
    </main>
  );
};

export default Employer;
