// const Transaction = require('../transaction/model')
// const Voucher = require('../voucher/model')
const EMR = require('../emr/model')
const THERAPIST = require('../therapist/model')

module.exports = {
  index: async (req, res) => {
    try {

      const emr = await EMR.countDocuments()
      const therapist = await THERAPIST.countDocuments()
      res.render('admin/dashboard/view_dashboard', {
        name: req.session.user.name,
        title: 'Halaman Dashboard',
        count: {
          emr,
          therapist
        }
      })

      res.render('index')
    } catch (err) {
      console.log(err)

    }
  }
}