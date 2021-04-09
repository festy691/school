const EventModel = require("./event.model");

module.exports =  {
    async createEvent(req,res){
        try {
            let event = new EventModel();

            let data = req.body;

            if (!data.title) return res.status(400).send({"error":"Event title is required"});
            if (!data.description) return res.status(400).send({"error":"Event description is required"});
            if (!data.event) return res.status(400).send({"error":"Event is required"});
            if (!data.eventDate) return res.status(400).send({"error":"Event date is required"});

            event.title = data.title;
            event.description = data.description;
            event.event = data.event;
            event.eventDate = data.eventDate;

            await event.save((err, docs)=>{
                if (!err){
                    return res.status(200).send({"success":"event created"});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async updateEvent(req,res){
        try {

            let data = req.body;

            const event = await EventModel.findOne({_id : req.params.id});

            if (!event) return res.status(404).send({"error":'Event not found'});

            if (data.title) event.title = data.title;
            if (data.description) event.description = data.description;
            if (data.event) event.event = data.event;
            if (data.eventDate) event.eventDate = data.eventDate;

            await event.save((err, doc)=>{
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

    async getOneEvent(req,res){
        try {
            EventModel.findOne(({_id : req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"Event not found"});
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

    async getAllEvents(req,res){
        try {
            EventModel.find((err, docs)=>{
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
            await EventModel.paginate({},options,(err, docs)=>{
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

    async deleteEvent(req,res){
        try {
            EventModel.findOne(({_id: req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"event not found"});

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