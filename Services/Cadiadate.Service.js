const Jobs  = require('../Models/Jobs.Models');

module.exports.getAllJobsService = async ()=>{
    const allJobs = await Jobs.find();
    return allJobs;
}
module.exports.getAJobsService = async (JobId)=>{
    const job = await Jobs.find({_id:JobId});
    return job;
}
module.exports.applyToAJobService = async (JobId,CandidateData)=>{
    const applied = await Jobs.updateOne({_id:JobId},{$set:CandidateData},{runValidators:true});
    const job = await Jobs.findOne({_id:JobId});
    job.$inc("appliedCandiates",1);
    await job.save();
    return applied;
}