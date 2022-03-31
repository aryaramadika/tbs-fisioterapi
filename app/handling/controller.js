const Handling = require('./model')
const EMR = require('../emr/model')
const Therapist = require('../therapist/model')

module.exports = {
    index: async(req,res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const emrs = await EMR.find()
            const therapist = await Therapist.find()


            const alert ={ message : alertMessage , status:alertStatus}
            const handling = await Handling.find().populate('therapist').populate('emr')
            .populate('therapist')
            console.log('alert >>>')
            console.log(handling)
            // EMR.count({therapist: _id})

            res.render('admin/handling/view_handling',{
                handling,
                therapist,
                alert,
                name: req.session.user.name,
                title: 'Handled Page'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            // console.log(err)
            res.redirect('/handling')
        }
    },
}