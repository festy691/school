const CourseModel = require("./course.model");

module.exports =  {
    async createCourse(req,res){
        try {
            let course = new CourseModel();

            let data = req.body;

            if (!data.title) return res.status(400).send({"error":"Course Title is required"});
            if (!data.syllabus) return res.status(400).send({"error":"Course Syllabus is required"});
            if (!data.faculty) return res.status(400).send({"error":"Faculty is required"});
            //if (!data.material) return res.status(400).send({"error":"Course Phone Number is required"});
            if (!data.tutor) return res.status(400).send({"error":"Tutor is required"});

            course.title = data.title;
            course.syllabus = data.syllabus;
            course.faculty = data.faculty;
            course.tutor = data.tutor;
            if(data.material) course.material = data.material;

            await course.save((err, docs)=>{
                if (!err){
                    return res.status(200).send({"success":"Course created"});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async updateCourse(req,res){
        try {

            let data = req.body;

            const course = await CourseModel.findOne({_id : req.params.id});

            if (!course) return res.status(404).send({"error":'Course not found'});

            if(data.title) course.title = data.title;
            if(data.syllabus) course.syllabus = data.syllabus.toLowerCase();
            if(data.faculty) course.faculty = data.faculty;
            if(data.tutor) course.tutor = data.tutor;
            if(data.material) course.material = data.material;

            await course.save((err, doc)=>{
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

    async getOneCourse(req,res){
        try {
            CourseModel.findOne(({_id : req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"Course not found"});
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

    async getAllCourses(req,res){
        try {
            CourseModel.find((err, docs)=>{
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
            await CourseModel.paginate({},options,(err, docs)=>{
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

    async deleteCourse(req,res){
        try {
            CourseModel.findOne(({_id: req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc) return res.status(404).send({"error":"course not found"});
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