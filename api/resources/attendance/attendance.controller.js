const AttendanceModel = require("./attendance.model");
const crypto = require('crypto');

module.exports =  {
    async createAttendance(req,res){
        try {
            let attendance = new AttendanceModel();

            let data = req.body;

            if (!data.course) return res.status(400).send({"error":"Course is required"});
            if (!data.topic) return res.status(400).send({"error":"Topic is required"});
            if (!data.lecturer) return res.status(400).send({"error":"Lecturer is required"});
            if (!data.session) return res.status(400).send({"error":"Academic session is required"});

            attendance.course = data.course;
            attendance.topic = data.topic;
            attendance.lecturer = data.lecturer;
            attendance.session = data.session;
            const resetToken = crypto.randomBytes(20).toString('hex');

            attendance.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

            attendance.resetPasswordExpire = Date.now() + 10 * 60 * 60 * 1000;

            await attendance.save((err, docs)=>{
                if (!err){
                    return res.status(200).send({"success":"Attendance created"});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async updateAttendance(req,res){
        try {

            let data = req.body;

            const attendance = await AttendanceModel.findOne({_id : req.params.id});

            if (!attendance) return res.status(404).send({"error":'Attendance not found'});

            //HASHING THE password with bcryptjs
            const attendanceToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

            const attend = await AttendanceModel.findOne({
                attendanceToken,
                attendanceExpire: { $gt: Date.now() }
            });

            if (!attend) return res.status(400).send({"error":'Expired or Invalid attendance link'});

            if (data.student) attendance.student.push(data.student);

            await attendance.save((err, doc)=>{
                if (!err){
                    return res.status(200).send({"success":`Attendance registered`});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });

        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async getOneAttendance(req,res){
        try {
            AttendanceModel.findOne(({_id : req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"Attendance not found"});
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

    async getAllAttendances(req,res){
        try {
            const {session,course} = req.query;
            if (session && course) AttendanceModel.find({session,course},(err, docs)=>{
                if(!err){
                    return res.status(200).send(docs);
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
            else if (session) AttendanceModel.find({session},(err, docs)=>{
                if(!err){
                    return res.status(200).send(docs);
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
            else if (course) AttendanceModel.find({course},(err, docs)=>{
                if(!err){
                    return res.status(200).send(docs);
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
            else AttendanceModel.find((err, docs)=>{
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
            const {page,perPage,session,course} = req.query;
            const options = {
                page: parseInt(page,10) || 1,
                limit: parseInt(perPage,10) || 10,
                sort: {date: -1}
            }
            await AttendanceModel.paginate({session,course},options,(err, docs)=>{
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

    async deleteAttendance(req,res){
        try {
            AttendanceModel.findOne(({_id: req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc) return res.status(404).send({"error":"attendance not found"});
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