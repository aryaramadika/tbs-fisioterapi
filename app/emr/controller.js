const EMR = require('./model')
const Therapist = require('../therapist/model')
const Intervensi = require('../intervensi/model')
const Queue = require('../queue/model')

const handlingModel = require('../handling/model')
module.exports ={
    index: async(req,res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert ={ message : alertMessage , status:alertStatus}
            const emr = await EMR.find()
            .populate('queue')
            .populate('therapist')
            console.log('alert >>>')
            console.log(emr)

            res.render('admin/emr/view_emr',{
                emr,
                alert,
                name: req.session.user.name,
                title: 'Electronic Medical Record Page'
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
            const queue = await Queue.find()

            
            res.render('admin/emr/create',{
                therapist,
                intervensi,
                queue,
                name: req.session.user.name,
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
            // let dates = emr.date
            // dates = new Date().toString()
            
            let {name,age,gender,address,job,
                hospitalData,primaryComplain,famHistory,
                medHistory,vitalExam,inspection,palpation,
                percussion,auscultation,functionCheck,specificInspect,
                diagnosis,plan,intervensi1,intervensi2,intervensi3,
                intervensi4,intervensi5,intervensi6,intervensi7,therapist,date,handled,patient,que
                 } = req.body
            let emr = await EMR({name,age,gender,address,job,
                hospitalData,primaryComplain,famHistory,
                medHistory,vitalExam,inspection,palpation,
                percussion,auscultation,functionCheck,specificInspect,
                diagnosis,plan,intervensi1,intervensi2,intervensi3,
                intervensi4,intervensi5,intervensi6,intervensi7,therapist,
                date,patient,que })
            // if(emr !== null ){
            //     for(let i; i < emr.length;i++){
            //         if(emr._id === therapist._id){
            //             handled += i
            //         }
            //     }
            //     req.therapist.handled+=1
            // }
            console.log("--------handled-------")
            console.log(handled)    
            console.log("--------handled-------")
            console.log(req.body)
            let handling = await handlingModel.insertMany({
                emrs: emr._id,
                therapists: emr.therapist
            })
            therapist = await Therapist.findByIdAndUpdate(
                {_id: emr.therapist},
                {$inc:{handled: +1}},
                

            )
            console.log("--------handling-------")
            console.log(handling)
            console.log(emr)    
            await emr.save();
            console.log(date)
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
                name: req.session.user.name,
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
                intervensi4,intervensi5,intervensi6,intervensi7,therapist,date}=req.body
             await EMR.findByIdAndUpdate({
                _id:id
            },{name,age,gender,address,job,
                hospitalData,primaryComplain,famHistory,
                medHistory,vitalExam,inspection,palpation,
                percussion,auscultation,functionCheck,specificInspect,
                diagnosis,plan,intervensi1,intervensi2,intervensi3,
                intervensi4,intervensi5,intervensi6,intervensi7,therapist,date})

                // console.log("--------emr id-------")
                // console.log(emr._id)
                
                // console.log("--------terapist id-------")
                // console.log(emr.therapist)
    
                // let handling = await handlingModel.insertMany({
                //     emrs: emr._id,
                //     therapists: emr.therapist
                // })
                // console.log("--------handling-------")
                // console.log(handling)    
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
    },
    patientHandled : async(req,res) =>{
        try {
            // const{id}= req.query
            const {handled} = req.body
            const therapist = await Therapist.findOne({_id})
            const emr = await EMR.find()
                    total = db.emr.aggregate([
                        {
                            $match: {_id:therapist}
                        },
                        {
                            $group: {_id:"$therapist._id",total:{$sum:"$quantity"}}
                        }
                        
                    ])

            handled = total
            await Therapist.save()
            res.render('admin/therapist/view_therapist',{
                therapist,
                emr,
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/therapist')
        }
    },
    // patientHandled: async (req, res) => {
    //     try {
    //       const { handled } = req.body;
    
    //       let criteria = {}
    
    //     //   if (handled.length) {
    //     //     criteria = {
    //     //       ...criteria,
    //     //       handled: { $regex: "${handled}", $options: 'i' }
    //     //     }
    //     //   }
    
    //       if (req.therapist._id) {
    //         criteria = {
    //           ...criteria,
    //           therapist: req.therapist._id
    //         }
    //       }
    //       console.log("criteria")
    //       console.log(criteria)
    //       const patientHandled = await Therapist.find(criteria)
    //       // res.status(200).json({
    //       //   data: history
    //       // })
    
    //       handled = await Therapist.aggregate([
    //         { $match: criteria },
    //         {
    //           $group: {
    //             _id: null,
    //             value: { $sum: "$value" }
    //           }
    //         }
    //       ])
    //     //   handled = total
    //       console.log("ini criteria")
    //       console.log(criteria)
    //       res.status(200).json({
    //         data: handled,
    //         handled: patientHandled.length ? patientHandled[0].value : 0
    //       })
    
    //     } catch (err) {
    //       res.status(500).json({ message: err.message || `Internal server error` })
    //     }
    //   },

    

}