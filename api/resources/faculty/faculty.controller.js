const url = require("url");
const path = require("path");
const cloudinary = require('../../../config/cloudinary');
const fs = require('fs');

const FacultyModel = require("./faculty.model");

module.exports =  {
    async createFaculty(req,res){
        try {
            let faculty = new FacultyModel();

            let data = req.body;

            if (!data.name) return res.status(400).send({"error":"Faculty Name is required"});
            if (!data.email) return res.status(400).send({"error":"Faculty Email is required"});
            if (!data.phonenumber) return res.status(400).send({"error":"Faculty Phone Number is required"});

            faculty.name = data.name;
            faculty.email = data.email.toLowerCase();
            faculty.phonenumber = data.phonenumber;

            await faculty.save((err, docs)=>{
                if (!err){
                    return res.status(200).send({"success":"faculty created"});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async updateFacuImage(req,res){
        try {
            const faculty = await FacultyModel.findOne(({_id:req.params.id}));

            if(!faculty) return res.status(404).send({"error":'Faculty not found'});

            let data = req.body;

            if(!data.image) return res.status(400).send({"error":'Image cannot be null'});

            faculty.image = data.image;

            await faculty.save(({_id:req.params.id}),(err, docs)=>{
                if (!err){
                    return res.status(200).send({"success":"Image updated"});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async updateFaculty(req,res){
        try {

            let data = req.body;

            const faculty = await FacultyModel.findOne({_id : req.params.id});

            if (!faculty) return res.status(404).send({"error":'Faculty not found'});

            if(data.name) faculty.name = data.name;
            if(data.email) faculty.email = data.email.toLowerCase();
            if(data.phonenumber) faculty.phonenumber = data.phonenumber;
            if(data.departments) faculty.departments.push(data.departments);

            await faculty.save((err, doc)=>{
                if (!err){
                    return res.status(200).send({"success":`updated`});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });

        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async getOneFaculty(req,res){
        try {
            FacultyModel.findOne(({_id : req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"Faculty not found"});
                    return res.status(200).send(doc);
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async getAllFaculties(req,res){
        try {
            FacultyModel.find((err, docs)=>{
                if(!err){
                    return res.status(200).send(docs);
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async findAllPaginate(req,res){
        try {
            const {page,perPage} = req.query;
            const options = {
                page: parseInt(page,10) || 1,
                limit: parseInt(perPage,10) || 10,
                sort: {date: -1}
            }
            await FacultyModel.paginate({},options,(err, docs)=>{
                if(!err){
                    if (docs) return res.status(200).send(docs);
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async deleteFaculty(req,res){
        try {
            FacultyModel.findOne(({_id: req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"faculty not found"});

                    doc.remove((err, docs)=>{
                        if (!err){
                            if (doc.image) destroy(nameFromUri(doc.image)).catch((result)=>{
                                console.log(result);
                            });
                            return res.status(200).send({"success":"Item deleted"});
                        }
                        else{
                            return res.status(400).send({"error":err});
                        }
                    });
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    }
}

function nameFromUri(myurl){
    let parsed = url.parse(myurl);
    let image = path.basename(parsed.pathname);
    return "images/"+path.parse(image).name
}

async function destroy(file) {
    await cloudinary.delete(file);
}