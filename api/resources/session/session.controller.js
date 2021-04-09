const SessionModel = require("./session.model");

module.exports =  {
    async createSession(req,res){
        try {
            let session = new SessionModel();

            let data = req.body;

            if (!data.title) return res.status(400).send({"error":"Session title is required"});
            if (!data.startDate) return res.status(400).send({"error":"Session start date is required"});
            if (!data.endDate) return res.status(400).send({"error":"Session end date is required"});

            session.title = data.title;
            session.startDate = data.startDate;
            session.endDate = data.endDate;

            await session.save((err, docs)=>{
                if (!err){
                    return res.status(200).send({"success":"Session created"});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async updateSession(req,res){
        try {

            let data = req.body;

            const session = await SessionModel.findOne({_id : req.params.id});

            if (!session) return res.status(404).send({"error":'Session not found'});

            if (data.startDate) session.startDate = data.startDate;
            if (data.endDate) session.endDate = data.endDate;

            await session.save((err, doc)=>{
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

    async getOneSession(req,res){
        try {
            SessionModel.findOne(({_id : req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"Session not found"});
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

    async getAllSessions(req,res){
        try {
            SessionModel.find((err, docs)=>{
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
            await SessionModel.paginate({},options,(err, docs)=>{
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

    async deleteSession(req,res){
        try {
            SessionModel.findOne(({_id: req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc) return res.status(404).send({"error":"session not found"});
                    doc.remove((err, docs)=>{
                        if (!err){
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