const Jobs = require('../Models/Jobs.Models')


module.exports.allJobsOfTheManagerService = async (manager) =>{
    const allJobs = Jobs.find({'manager.id':manager});
    return allJobs;
}
module.exports.aJobsOfTheManagerService = async(id, manager)=>{
    const job = Jobs.findOne({ _id: id, 'manager.id': manager });
    return job;
}
module.exports.addAJobService = async (data)=>{
    const newJob = await Jobs.create(data);
    return newJob;
}

module.exports.updateAJobService = async (id,data)=>{
    const updatedJob = Jobs.updateOne({_id:id},{$set:data},{runValidators:true});
    return updatedJob; 
} 

/* 
module.exports.getJobService = async ()=>{
    const jobs = await Job.find({}).select('-product -suppliers');
    return jobs;
}
module.exports.getJobByIdService = async (id) =>{
    const job = await Job.findOne({_id:id}).select('-product -suppliers');
    return job;
}*/