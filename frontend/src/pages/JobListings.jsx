// frontend/src/pages/JobListings.jsx
import React from "react";
import { Container, Typography } from "@mui/material";
import JobCard from "../components/JobCard/JobCard";
import { jobPosts } from "../data/jobPosts";

export default function JobListings() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Job Listings
      </Typography>
      {jobPosts.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </Container>
  );
}
