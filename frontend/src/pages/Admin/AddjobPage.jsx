import React, { useState } from "react";
import { Container, TextField, Button, Alert } from "@mui/material";
import axios from "axios";

export default function AddJobPage() {
  const [form, setForm] = useState({
    companyName: "",
    jobTitle: "",
    description: "",
    salary: "",
  });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/create/job", form);
      setMsg("Job Posted Successfully!");
      setForm({ companyName: "", jobTitle: "", description: "", salary: "" });
    } catch (err) {
      setMsg("Error posting job");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <h2>Admin: Post a Job</h2>
      {msg && <Alert severity="info">{msg}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Company"
          fullWidth
          margin="normal"
          value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
        />
        <TextField
          label="Job Title"
          fullWidth
          margin="normal"
          value={form.jobTitle}
          onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
        />
        <TextField
          label="Salary"
          fullWidth
          margin="normal"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Post Job
        </Button>
      </form>
    </Container>
  );
}
