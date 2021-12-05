const EMR = require('./model')
const Therapist = require('../therapist/model')
const Intervensi = require('../intervensi/model')
module.exports ={
    index: async(req,res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert ={ message : alertMessage , status:alertStatus}
            const emr = await EMR.find()
            .populate('therapist')
            console.log('alert >>>')
            console.log(emr)

            res.render('admin/emr/view_emr',{
                emr,
                alert,
                // name: req.session.user.name,
                title: 'EMR Page'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            // console.log(err)
            res.redirect('/emr')
        }
    },
    viewCreate : async(req,res) =>{
        try {
            const therapist = await Therapist.find()
            const intervensi = await Intervensi.find()
            res.render('admin/emr/create',{
                therapist,
                intervensi,
                // name: req.session.user.name,
                title: 'Add EMR Page'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/emr')
        }
    },
    actionCreate : async(req,res)=>{
        try {
            const {name,age,gender,address,job,
                hospitalData,primaryComplain,famHistory,
                medHistory,vitalExam,inspection,palpation,
                percussion,auscultation,functionCheck,specificInspect,
                diagnosis,plan,intervensi1,intervensi2,intervensi3,
                intervensi4,intervensi5,intervensi6,intervensi7,therapist} = req.body
            let emr = await EMR({name,age,gender,address,job,
                hospitalData,primaryComplain,famHistory,
                medHistory,vitalExam,inspection,palpation,
                percussion,auscultation,functionCheck,specificInspect,
                diagnosis,plan,intervensi1,intervensi2,intervensi3,
                intervensi4,intervensi5,intervensi6,intervensi7,therapist})
            await emr.save();
            req.flash('alertMessage',"added successfully")
            req.flash('alertStatus', "success")
            console.log('Berhasil')
            res.redirect('/emr') 
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/emr')
            console.log('gagal')
        }
    },viewEdit: async(req,res) =>{
        try {
            const{id}= req.params;
            const intervensi = await Intervensi.find()
            const therapist = await Therapist.find()
            const emr = await EMR.findOne({_id:id})
            .populate('therapist')
            .populate('intervensi')
            
            res.render('admin/emr/edit',{
                emr,
                intervensi,
                therapist,
                // name: req.session.user.name,
                title: 'Edit EMR Page'
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/emr')
        }
    },
    actionEdit : async(req,res)=>{
        try {
            
            const{id}= req.params;
            const{name,age,gender,address,job,
                hospitalData,primaryComplain,famHistory,
                medHistory,vitalExam,inspection,palpation,
                percussion,auscultation,functionCheck,specificInspect,
                diagnosis,plan,intervensi1,intervensi2,intervensi3,
                intervensi4,intervensi5,intervensi6,intervensi7,therapist}=req.body
             await EMR.findByIdAndUpdate({
                _id:id
            },{name,age,gender,address,job,
                hospitalData,primaryComplain,famHistory,
                medHistory,vitalExam,inspection,palpation,
                percussion,auscultation,functionCheck,specificInspect,
                diagnosis,plan,intervensi1,intervensi2,intervensi3,
                intervensi4,intervensi5,intervensi6,intervensi7,therapist})
            req.flash('alertMessage',"edit successfully")
            req.flash('alertStatus', "success")
            res.redirect('/emr')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/emr')
            
        }
    },
    actionDelete : async(req,res) =>{
        try {
            const{id}= req.params;

            await EMR.findOneAndRemove({
                _id:id
            })
            req.flash('alertMessage',"delete successfully")
            req.flash('alertStatus', "success")
            res.redirect('/emr')

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/emr')
        }
    }

    

}