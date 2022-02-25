const Recommendation = require('./model')
const EMR = require('../emr/model')
const Therapist = require('../therapist/model')

module.exports ={
    index: async(req,res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert ={ message : alertMessage , status:alertStatus}
            const recommendation = await Recommendation.find()
            .populate('therapist')
            .populate('emr')
            console.log('alert >>>')
            // console.log(recommendation)

            res.render('admin/recommendation/view_recommendation',{
                recommendation,
                alert,
                name: req.session.user.name,
                title: 'Recommendation  Page'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            // console.log(err)
            res.redirect('/recommendation')
        }
    },
    viewCreate : async(req,res) =>{
        try {
            const therapist = await Therapist.find()
            const emr = await EMR.find()
            res.render('admin/recommendation/create',{
                therapist,
                emr,
                name: req.session.user.name,
                title: 'Add Recommendation Page'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/recommendation')
        }
    },
  
    actionCreate : async(req,res)=>{
        try {
            const {emr,recommend,date,therapist} =  req.body
            let recommendation = new Recommendation({
                emr,
                recommend,
                date,
                therapist
            })
            console.log(req.body)
            console.log(recommendation)
            await recommendation.save();
            console.log(req.body)
            console.log(recommendation)
            req.flash('alertMessage',"added successfully")
            req.flash('alertStatus', "success")
            console.log('Berhasil')
            res.redirect('/recommendation') 
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/recommendation')
            console.log('gagal')
        }
    },
    viewEdit: async(req,res) =>{
        try {
            const{id}= req.params;
            const emr = await EMR.find()
            const therapist = await Therapist.find()
            const recommendation = await Recommendation.findOne({_id:id})
            .populate('therapist')
            .populate('emr')
            
            res.render('admin/recommendation/edit',{
                emr,
                recommendation,
                therapist,
                name: req.session.user.name,
                title: 'Edit EMR Page'
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/recommendation')
        }
    },
    // actionEdit : async(req,res)=>{
    //     try {
            
    //         const{id}= req.params;
    //         const{name,age,gender,address,job,
    //             hospitalData,primaryComplain,famHistory,
    //             medHistory,vitalExam,inspection,palpation,
    //             percussion,auscultation,functionCheck,specificInspect,
    //             diagnosis,plan,intervensi1,intervensi2,intervensi3,
    //             intervensi4,intervensi5,intervensi6,intervensi7,therapist,date}=req.body
    //          await EMR.findByIdAndUpdate({
    //             _id:id
    //         },{name,age,gender,address,job,
    //             hospitalData,primaryComplain,famHistory,
    //             medHistory,vitalExam,inspection,palpation,
    //             percussion,auscultation,functionCheck,specificInspect,
    //             diagnosis,plan,intervensi1,intervensi2,intervensi3,
    //             intervensi4,intervensi5,intervensi6,intervensi7,therapist,date})
    //         req.flash('alertMessage',"edit successfully")
    //         req.flash('alertStatus', "success")
    //         res.redirect('/emr')
    //     } catch (err) {
    //         req.flash('alertMessage', `${err.message}`)
    //         req.flash('alertStatus', 'danger')
    //         res.redirect('/emr')
            
    //     }
    // },
    actionDelete : async(req,res) =>{
        try {
            const{id}= req.params;

            await Recommendation.findOneAndRemove({
                _id:id
            })
            req.flash('alertMessage',"delete successfully")
            req.flash('alertStatus', "success")
            res.redirect('/recommendation')

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/recommendation')
        }
    }
}