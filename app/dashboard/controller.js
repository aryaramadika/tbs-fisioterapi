// const Transaction = require('../transaction/model')
// const Voucher = require('../voucher/model')
const EMR = require('../emr/model')
const THERAPIST = require('../therapist/model')
const Transaction = require('../transaction/model')
module.exports = {
  index: async (req, res) => {
    try {

      const emr = await EMR.countDocuments()
      const therapist = await THERAPIST.countDocuments()
      const transaction = await Transaction.countDocuments()

      const patientEMR = await EMR.aggregate([
        {$group :{_id:{$toObjectId:"$_id}"}, therapist:{$sum:1}}}
      ])

   
      console.log("EMR by therapist")
      console.log(patientEMR);

      res.render('admin/dashboard/view_dashboard', {
        name: req.session.user.name,
        title: 'Halaman Dashboard',
        count: {
          emr,
          therapist,
          transaction
        }
      })

      res.render('index')
    } catch (err) {
      console.log(err)

    }
  }
}