import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);
export default Job;