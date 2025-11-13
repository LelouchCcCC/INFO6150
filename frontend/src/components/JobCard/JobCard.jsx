// frontend/src/components/JobCard/JobCard.jsx
import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Chip } from '@mui/material';
import { Box } from '@mui/system';

export default function JobCard({ job }) {
  return (
    <Card sx={{ minWidth: 275, mb: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {job.title}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {job.description}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          Last Updated: {job.lastUpdated}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" href={job.applyLink} target="_blank">
          Apply Now
        </Button>
      </CardActions>
    </Card>
  );
}