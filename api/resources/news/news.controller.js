const url = require("url");
const path = require("path");
const cloudinary = require('../../../config/cloudinary');
const fs = require('fs');

const NewsModel = require("./news.model");

module.exports =  {
    async createNews(req,res){
        try {
            let news = new NewsModel();

            let data = req.body;

            if (!data.title) return res.status(400).send({"error":"News title is required"});
            if (!data.subtitle) return res.status(400).send({"error":"News subtitle is required"});
            if (!data.details) return res.status(400).send({"error":"News details is required"});
            if (!data.author) return res.status(400).send({"error":"News author is required"});

            news.title = data.title;
            news.subtitle = data.subtitle;
            news.details = data.details;
            news.author = data.author;

            await news.save((err, docs)=>{
                if (!err){
                    return res.status(200).send({"success":"news created"});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async updateNewsImage(req,res){
        try {
            const news = await NewsModel.findOne(({_id:req.params.id}));

            if(!news) return res.status(404).send({"error":'News not found'});

            let data = req.body;

            if(!data.image) return res.status(400).send({"error":'Image cannot be null'});

            news.image = data.image;

            await news.save(({_id:req.params.id}),(err, docs)=>{
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

    async updateNews(req,res){
        try {

            let data = req.body;

            const news = await NewsModel.findOne({_id : req.params.id});

            if(data.title) news.title = data.title;
            if(data.subtitle) news.subtitle = data.subtitle;
            if(data.details) news.details = data.details;
            if(data.author) news.author = data.author;

            await news.save((err, doc)=>{
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

    async getOneNews(req,res){
        try {
            NewsModel.findOne(({_id : req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"News not found"});
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

    async getAllNews(req,res){
        try {
            NewsModel.find((err, docs)=>{
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
            await NewsModel.paginate({},options,(err, docs)=>{
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

    async deleteNews(req,res){
        try {
            NewsModel.findOne(({_id: req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"news not found"});

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