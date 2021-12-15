const Therapist = require('./model')
const EMR = require('../emr/model')
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
            const emrss = await EMR.find({_id:id})
            console.log('alert >>>')
            console.log(therapist)
            
            res.render('admin/therapist/view_therapist',{
                therapist,
                alert,
                count : {
                    emr
                },
                emrss,
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
            const {therapistName,therapistAge,therapistGender,therapistpPhoneNumber,patient} = req.body
            let therapist = await Therapist({therapistName,therapistAge,therapistGender,therapistpPhoneNumber,patient})
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
            const{therapistName,therapistAge,therapistGender,therapistpPhoneNumber,patient}=req.body
             await Therapist.findByIdAndUpdate({
                _id:id
            },{therapistName,therapistAge,therapistGender,therapistpPhoneNumber,patient})
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
    }
    ,patientHandled : async(req,res) =>{
        try {
            const{id}=req.params
            const {patient} = req.body
            const therapist = await Therapist.find()
            const emr = await EMR.find()
            const handled = await EMR.find({},therapist._id)
            for (let i = 0 ; i < emr.length;i++){
                if (id === handled){
                    handled += i 
                    patient = handled
                    await Therapist.save()
                    res.render('admin/therapist/view_therapist',{
                        therapist,
                        patient,
                        count : {
                            handled
                        }
                    })

                    console.log(handled)
                }
            }
        } catch (err) {
            
        }
    }

    

}