"use strict";

const { group } = require("console");
const db = require("../models");
const project = db.project;

exports.get = (req, res) => {
  console.log("routing set");
  res.send("sucess");
};
exports.getProject = (req, res) => {
  project
    // .aggregate([
    //   {
    //     $lookup: {
    //       from: "projects",
    //       localField: "projectName",
    //       foreignField: "projectName",
    //       as: "projectDetails",
    //     },
    //   }
    // ])
    .find({req})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      request.status(err.status).send({
        message: err.message,
      });
    });
};
exports.addProjects = (req, res) => {
  const { projectName, amt, projectType, month, projectTopic } = req.body.projectDetails;
  const projectDetails = new project({
    projectName: projectName,
    amt: amt,
    projectType: projectType,
    month: month,
    projectTopic: projectTopic,
  });
  console.log("Project", projectDetails);
  projectDetails
    .save()
    .then((data) => {
      console.log("project data", data);
      res.status(200).send("success");
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message,
      });
    });
};
exports.getProjectsById = (req, res) => {
    const id = req.params.id
    console.log('project id',id);
    project.find({id},{}).then((data)=> {
        res.status(200).send(data);
    }).
    catch((error)=> {
        res.status(500).send(error.message);
    })
}
exports.updateData = async (req, res) => {
    console.log('request body',req.body.projectId)
    try {
        const update = {
            $set : {
                ...req.body.projectDetails
            }
        }
        const object = await project.findByIdAndUpdate(
            req.body.projectId,
            update
        )
       return res.status(200).send(object);
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};
exports.deleteProject = (req, res) => {
    const projectId = req.params.id
    console.log('project Id',projectId)

    project.findByIdAndDelete({ _id: projectId }).then(() => {
        try  {
            res.send({
                statusCode: 200,
                message: 'Project deleted successfully'
            });
        }catch(error) {
            res.send({
                statusCode: error.statusCode,
                message: error.message
            })
        };
    })
}
// pagiation APi //
exports.project = async (req,res)=> {
  const page = req.query.page || 0
  const projectPerPage = req.query.recordPerPage
   await project.find()
  .skip(page * projectPerPage)
  .limit(projectPerPage)
  .then((d)=> 
  res.status(200).send({
    success: true,
    message: 'success',
    data: d
  })).catch((error)=> res.status(500).send({message:error.message}));
}