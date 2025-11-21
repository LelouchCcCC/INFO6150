import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('/api/jobs').then(res => setJobs(res.data));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <h2>Available Jobs</h2>
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job._id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{job.jobTitle}</Typography>
                <Typography color="text.secondary">{job.companyName}</Typography>
                <Typography variant="body2">{job.description}</Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>{job.salary}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}