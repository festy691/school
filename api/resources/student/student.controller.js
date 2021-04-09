const StudentModel = require("./student.model");

module.exports =  {
    async createStudent(req,res){
        try {
            let student = new StudentModel();

            let data = req.body;

            if (!data.course) return res.status(400).send({"error":"course is required"});
            if (!data.user) return res.status(400).send({"error":"User is required"});
            if (!data.session) return res.status(400).send({"error":"Session is required"});

            student.course = data.course;
            student.session = data.session;
            student.user = data.user;

            await student.save((err, docs)=>{
                if (!err){
                    return res.status(200).send({"success":"Student created"});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async updateStudent(req,res){
        try {

            let data = req.body;

            const student = await StudentModel.findOne({_id : req.params.id});

            if (!student) return res.status(404).send({"error":'Student not found'});

            if (data.coursework) student.coursework = data.coursework;
            if (data.exam) student.exam = data.exam;

            if(student.exam !== null && student.coursework !== null){
                let grade = student.exam + student.exam;
                if(grade >= 70) student.grade = "A";
                else if(grade >= 60) student.grade = "B";
                else if(grade >= 50) student.grade = "C";
                else if(grade >= 45) student.grade = "D";
                else if(grade <= 45) student.grade = "F";
            }

            await student.save((err, doc)=>{
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

    async getOneStudent(req,res){
        try {
            StudentModel.findOne(({_id : req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"Student not found"});
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

    async getAllStudents(req,res){
        try {
            const {course, session} = req.query;
            if (course !== null && session !== null) StudentModel.find({session:session, course:course},(err, docs)=>{
                if(!err){
                    return res.status(200).send(docs);
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
            else if (course !== null) StudentModel.find({course:course},(err, docs)=>{
                if(!err){
                    return res.status(200).send(docs);
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
            else if (session !== null) StudentModel.find({session:session, course:course},(err, docs)=>{
                if(!err){
                    return res.status(200).send(docs);
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
            else StudentModel.find((err, docs)=>{
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
            const {page,perPage,course, session} = req.query;
            const options = {
                page: parseInt(page,10) || 1,
                limit: parseInt(perPage,10) || 10,
                sort: {date: -1},
            }
            await StudentModel.paginate({course:course, session:session},options,(err, docs)=>{
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

    async deleteStudent(req,res){
        try {
            StudentModel.findOne(({_id: req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc) return res.status(404).send({"error":"student not found"});
                    doc.remove((err, docs)=>{
                        if (!err){
                            return res.status(200).send({"success":"student deleted"});
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