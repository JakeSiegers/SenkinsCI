function Job(JakeCI){
    this.JakeCI = JakeCI;
}

Job.prototype.getAllJobs = function(request, response){
    this.JakeCI.models['JobEditor'].getAllJobs({
        success:function(jobs){
            var formattedJobs = [];
            for(var i=0;i<jobs.length;i++){
                formattedJobs.push([
                    jobs[i].name,
                    jobs[i].description,
                    jobs[i].exec,
                    "lastRun??",
                    "lastFailure??"
                ]);
            }
            this.JakeCI.sendResponse(response,formattedJobs);
        },
        error:function(error){
            this.JakeCI.sendError(response,error);
        },
        scope:this
    });
};

Job.prototype.getJob = function(request, response){
    this.JakeCI.models['JobEditor'].getJob({
        data:request.body,
        success:function(reply){
            this.JakeCI.sendResponse(response,reply);
        },
        error:function(error){
            this.JakeCI.sendError(response,error);
        },
        scope:this
    });
};

Job.prototype.saveJob = function(request, response){
    this.JakeCI.models['JobEditor'].saveJob({
        data:request.body,
        success:function(reply){
            this.JakeCI.sendResponse(response,reply);
        },
        error:function(error){
            this.JakeCI.sendError(response,error);
        },
        scope:this
    });
};

//TODO: this needs to be moved to a model....
Job.prototype.newJob = function(request, response){

    var errors = this.JakeCI.functions.verifyRequiredPostFields(request.body,['name']);
    if(errors !== ''){
        this.JakeCI.sendError(response,errors);
        return;
    }
    var data = request.body;

    var sThis = this;
    var newJobFolder = this.JakeCI.path.join(this.JakeCI.config.jobPath,data.name);
    var buildsFolder = this.JakeCI.path.join(this.JakeCI.config.jobPath,data.name,'builds');
    var workspaceFolder = this.JakeCI.path.join(this.JakeCI.config.jobPath,data.name,'workspace');


    this.JakeCI.fs.stat(newJobFolder, function(err, stats) {
        //Check if error defined and the error code is "not exists"
        if (err && err.code === 'ENOENT') {
            sThis.JakeCI.fs.mkdirAsync(newJobFolder)
                .then(sThis.JakeCI.fs.mkdirAsync(buildsFolder))
                .then(sThis.JakeCI.fs.mkdirAsync(workspaceFolder))
                .then(sThis.JakeCI.fs.writeFileAsync(sThis.JakeCI.path.join(sThis.JakeCI.config.jobPath,data.name,'config.json'), JSON.stringify(data)))
                .then(function(){
                    sThis.JakeCI.sendResponse(response,{jobName:data.name});
                }).catch(function(e){
                    console.log(e);
                    sThis.JakeCI.sendError(response,"Failed to create Job (does it already exist?)");
                });
        } else {
            sThis.JakeCI.sendError(response,'Failed to create Job (does it already exist?)');
        }
    });
};

Job.prototype.runJob = function(request, response){

    var errors = this.JakeCI.functions.verifyRequiredPostFields(request.body,['job']);
    if(errors !== ''){
        this.JakeCI.sendError(response,errors);
        return;
    }
    var job = request.body.job;

    this.JakeCI.models['JobRunner'].addJobToQueue({
        job:job,
        success:this.JakeCI.sendResponse.bind(this.JakeCI,response),
        error:this.JakeCI.sendError.bind(this.JakeCI,response)
    });

};

module.exports = Job;