const Handled = require('./model')
const EMR = require('../emr/model')
const Therapist = require('../therapist/model')

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")
      const emrs = await EMR.find()
      const therapist = await Therapist.find()
      const alert = { message: alertMessage, status: alertStatus }
      const handled = await Handled.find().populate('therapist').populate('emr')
      console.log(EMR)
      // let criteria = {}
      // if (req.therapist._id) {
      //   criteria = {
      //     ...criteria,
      //     therapist: req.therapist._id
      //   }
      // }
      // const history = await EMR.find(criteria)
      const patienThe = await EMR.aggregate([
        
        {$group: {_id:"$therapist",quantityHandled:{$sum:1}}}
      ])
      console.log("--------------------")
      console.log(handled)
      console.log("EMR HANDLED BY THERAPTST")
      console.log(patienThe.length)
      console.log(patienThe._id === handled.therapist)
      // for(let i = 0 ; i < handled.length;i++){
      //   for(let o = 0; o < patienThe.length; o++){
      //     if(handled[i].therapist === patienThe[x]._id){
      //       handled[i].quantityHandled = patienThe[x].count
      //     }
      //   }
      // }

      res.render('admin/handled/view_handled', {
        handled,
        // data : history,
        patienThe ,
        alert,
        emrs,
        therapist,
        name: req.session.user.name,
        title: 'Halaman metode pembayaran'
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/handled')

    }
  },
  viewHandledChecker: async(req,res) => {
    try {
        const therapist = await Therapist.find()
        const emr = await EMR.find()
 
        console.log("--------------------------------")
        console.log(emr.therapist)
        res.render('admin/handled/create',{
            therapist,
            emr,
            name: req.session.user.name,
            title: 'Handled Checker Page'
        })
    } catch (err) {
        req.flash('alertMessage', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/handled')
    }

  },
  handledChecker: async(req,res) =>{
      try {
        const {therapist,emr,quantityHandled} = req.body
        
        const emrs = await EMR.find()
        const patienThe = await EMR.aggregate([
          {$group: {_id:"$therapist",count:{$sum:1}}}
        ])
        // emrs.forEach(emrs =>{
        //     if(patienThe._id === emrs.therapist){
        //         emr = emrs.name,
        //         quantityHandled = patienThe[1].count
        //     }
        //   return quantityHandled      
        //   })
        let handled = await Handled({therapist,emr,quantityHandled})
        await handled.save()
        console.log("--------------------------------")
        console.log(quantityHandled)  
        console.log("--------------------------------")
        req.flash('alertMessage',"checked successfully")
        req.flash('alertStatus', "success")
        console.log('Berhasil')
        res.redirect('/handled') 
      } catch (err) {
        req.flash('alertMessage', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/handled')
        console.log('gagal')
      }
  },
  
  actionDelete : async(req,res) =>{
    try {
        const{id}= req.params;

        await Handled.findOneAndRemove({
            _id:id
        })
        req.flash('alertMessage',"delete successfully")
        req.flash('alertStatus', "success")
        res.redirect('/handled')

    } catch (err) {
        req.flash('alertMessage', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/handled')
    }
},

}