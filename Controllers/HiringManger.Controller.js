const { addAJobService, updateAJobService, aJobsOfTheManagerService, allJobsOfTheManagerService } = require("../Services/hiringManger.Service");

module.exports.getAllJobsOfTheManager = async(req,res)=>{
    try {
        const {manager} =req.parmas;
        const alljobs  = await allJobsOfTheManagerService(manager);
        res.status(200).json({
            status:'passed',
            message:"got all the jobs",
            Data:alljobs
        })
    } catch (err) {
        res.status(400).json({
            status:'You shall not pass',
            message:"Can't get the jobs",
            error:err.message
        })
    }
}

module.exports.getAJobsOfTheManager = async(req,res)=>{
    try {
        const {manager,id} = req.parmas;
        const job  = await aJobsOfTheManagerService(id,manager);
        res.status(200).json({
            status:'passed',
            message:"got the job",
            Data:job
        })
    } catch (err) {
        res.status(400).json({
            status:'You shall not pass',
            message:"Can't get the job",
            error:err.message
        })
    }
}


module.exports.addAJob = async(req,res)=>{
    try {
        const data = req.body;
        const result = await addAJobService(data);
        res.status(200).json({
            status:'passed',
            message:"Added a new Job",
            Data:result
        })
    } catch (err) {
        res.status(400).json({
            status:'You shall not pass',
            message:"Can't add a new job, sorry",
            error:err.message
        })
    }
}
module.exports.updateAJob = async(req,res)=>{
    try {
        const {id}= req.params;
        const data = req.body;
        const result = await updateAJobService(id,data);
        res.status(200).json({
            status:'passed',
            message:"update the  Job",
            Data:result
        })
    } catch (err) {
        res.status(400).json({
            status:'You shall not pass',
            message:"Can't add a new job, sorry",
            error:err.message
        })
    }
}