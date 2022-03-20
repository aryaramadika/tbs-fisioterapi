const Therapist = require('./model')
const EMR = require('../emr/model')
const res = require('express/lib/response')
module.exports ={
    index: async(req,res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const{id}= req.params;
            // id = _id
            const alert ={ message : alertMessage , status:alertStatus}
            const therapist = await Therapist.find({})
            .populate('emr')
            const emr = await EMR.countDocuments()
            const emrss = await EMR.find({})
            const patientEMR = await EMR.aggregate([
                {$group :{_id:{$toObjectId:"$_id}"}, therapist:{$sum:1}}}
            ])
    
        
            console.log("EMR by therapist")
            console.log(patientEMR);
            const patienThe = await Therapist.aggregate([
            {$group: {_id:"$therapist",emr:{$sum:1}}}
            ])
            console.log("EMR HANDLED BY THERAPTST")
            console.log(patienThe)
        
            console.log('alert >>>')
            console.log(therapist)
            
            res.render('admin/therapist/view_therapist',{
                therapist,
                alert,
                name: req.session.user.name,
                title: 'TBS Physiotherapy Staff Page'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            console.log(err)
            res.redirect('/therapist')
        }
    },
    viewCreate : async(req,res) =>{
        try {
            const emr = await EMR.find()
            res.render('admin/therapist/create',{
                emr,
                name: req.session.user.name,
                title: 'Add therapist Page'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/therapist')
        }
    },
    actionCreate : async(req,res)=>{
        try {
            const {therapistName,therapistAge,therapistGender,therapistpPhoneNumber,handled} = req.body
            let therapist = await Therapist({therapistName,therapistAge,therapistGender,therapistpPhoneNumber,handled})
            await therapist.save();
            req.flash('alertMessage',"added successfully")
            req.flash('alertStatus', "success")
            console.log('Berhasil')
            res.redirect('/therapist') 
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/therapist')
            console.log('gagal')
        }
    },
    viewEdit: async(req,res) =>{
        try {
            const{id}= req.params;
            const therapist = await Therapist.findOne({_id:id})
            
            res.render('admin/therapist/edit',{
                therapist,
                name: req.session.user.name,
                title: 'Edit therapist Page'
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/therapist')
        }
    },
    actionEdit : async(req,res)=>{
        try {
            const{id}= req.params;
            const{therapistName,therapistAge,therapistGender,therapistpPhoneNumber}=req.body
             await Therapist.findByIdAndUpdate({
                _id:id
            },{therapistName,therapistAge,therapistGender,therapistpPhoneNumber})
            req.flash('alertMessage',"edit successfully")
            req.flash('alertStatus', "success")
            res.redirect('/therapist')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/therapist')
            
        }
    },
    actionDelete : async(req,res) =>{
        try {
            const{id}= req.params;

            await Therapist.findOneAndRemove({
                _id:id
            })
            req.flash('alertMessage',"delete successfully")
            req.flash('alertStatus', "success")
            res.redirect('/therapist')

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/therapist')
        }
    },
    // patientHandled : async(req,res) =>{
    //     try {
    //         const{id}= req.params;
    //         const{handled}=req.query
    //         const hand = await EMR.find()
    //         // handled = await EMR.aggregate([
                
    //         //     {$match:{therapist:{$in:[id],}}},
    //         //     {$group:{_id:"$therapist._id",totalpatient:{$sum:1}}}
            
    //         // ])
    //         let count = 0
    //         if(id === hand._id){
                
    //             count = db.hand.count({total: hand.therapist._id})
    //         }
    //         handled = count

    //         await therapist.save()
    //         res.status(200).json({
    //             data: hand,
    //             handled: handled.length ? handled[0].value : 0
    //           })
    //         // return handled
    //         // handled = total
    //         // await therapist.save()
    //         // req.flash('alertMessage',"Handled")
    //         // req.flash('alertStatus', "success")
    //         // res.redirect('/therapist')
            
    //     } catch (err) {
    //         req.flash('alertMessage', `${err.message}`)
    //         req.flash('alertStatus', 'danger')
    //         res.redirect('/therapist')
    //     }
    // }
    patientHandled : async(req,res) =>{
        try {
            // const{id}= req.query
            const { handled} = req.query;
            const patienThe = await EMR.aggregate([
                {$group: {_id:"$therapist",emr:{$sum:1}}}
              ])
            //   handled = patienThe.emr
            // const patienThe = await EMR.aggregate([
            //     {$group: {_id:"$therapist",emr:{$sum:1}}}
            //   ])
            handled = patienThe
            
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
    //     const{id}= req.params;

    //     const { handled } = req.query;
    //     // const { status = '' } = req.query;

    //       let criteria = {}
    
    //       if (status.length) {
    //         criteria = {
    //           ...criteria,
    //           status: { $regex: "${status}", $options: 'i' }
    //         }
    //       }
    
    //       if (req.therapist._id) {
    //         criteria = {
    //           ...criteria,
    //           therapist: req.therapist._id
    //         }
    //       }
    //       console.log("criteria")
    //       console.log(criteria)
    //       const patientHandled = await EMR.find(criteria)
    //       // res.status(200).json({
    //       //   data: history
    //       // })
    
    //       total = await EMR.aggregate([
    //         { $match: {id:{$_id}} },
    //         {
    //           $group: {
    //             _id: id,
    //             value: { $sum: "$value" }
    //           }
    //         }
    //       ])
    //       handled = total.value
    //       console.log("ini criteria")
    //       console.log(criteria)
    //       res.status(200).json({
    //         data: total,
    //         handled: patientHandled.length ? patientHandled[0].value : 0
    //       })
    
    //     } catch (err) {
    //       res.status(500).json({ message: err.message || `Internal server error` })
    //     }
    //   },

    

}