const Treatment = require('./model')
const queModel = require('../queue/model')
const Bank = require('../bank/model')
const Payment = require('../payment/model')
const Transaction = require('../transaction/model')
const fs = require('fs')
const config = require('../../config')
const { name } = require('ejs')

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = { message: alertMessage, status: alertStatus }
      const treatment = await Treatment.find() 
      .populate('que')
      
      console.log('treatment>>>')
      console.log(treatment)
     
      res.render('admin/treatment/view_treatment', {
        treatment,
        alert,
        name: req.session.user.name,
        title: 'Halaman Treatment'
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/treatment')

    }
  },
  viewCreate: async (req, res) => {
    try {
      const queue = await queModel.find()
      res.render('admin/treatment/create', {
        queue,
        name: req.session.user.name,
        title: 'Halaman tambah treatment'
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/treatment')
    }
  },

  actionCreate : async(req,res)=>{
    try {
        const {treatmentType, queue, price} = req.body
        let treatment = await Treatment({
            treatmentType,
            queue,
            price
        })
        console.log(req.body)
        await treatment.save()
        console.log(req.body)

        req.flash('alertMessage',"added successfully")
        req.flash('alertStatus', "success")
        console.log('Berhasil')
        res.redirect('/treatment') 
    } catch (error) {
        req.flash('alertMessage', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/treatment')
        console.log('gagal')
    }
},

viewEdit : async(req, res)=>{
  try {
    const { id } = req.params
    
    const treatment = await Treatment.findOne({_id : id})

    res.render('admin/treatment/edit', {
      treatment,
      name: req.session.user.name,
      title: 'Halaman ubah treatment'
    })
    
  } catch (err) {
    req.flash('alertMessage', `${err.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect('/treatment')
  }
},

actionEdit: async(req, res)=>{
  try {
    const { id } = req.params;
    const { treatmentType, price } = req.body

    await Treatment.findOneAndUpdate({
      _id: id
    },{ treatmentType,price });

    req.flash('alertMessage', "Berhasil ubah treatment")
    req.flash('alertStatus', "success")

    res.redirect('/treatment')
    
  } catch (err) {
    req.flash('alertMessage', `${err.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect('/treatment')
  }
},

actionDelete : async(req,res) =>{
  try {
      const{id}= req.params;

      await Treatment.findOneAndRemove({
          _id:id
      })
      req.flash('alertMessage',"delete successfully")
      req.flash('alertStatus', "success")
      res.redirect('/treatment')

  } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/treatment')
  }
},


}

//   actionStatus : async (req, res)=>{
//     try {
//       const { id } = req.params
//       let voucher = await Voucher.findOne({_id: id})

//       let status = voucher.status === 'Y' ? 'N' : 'Y'

//       voucher = await Voucher.findOneAndUpdate({
//         _id : id
//       }, {status})
      
//       req.flash('alertMessage', "Berhasil ubah status")
//       req.flash('alertStatus', "success")

//       res.redirect('/voucher')

      
//     } catch (err) {
//       req.flash('alertMessage', `${err.message}`)
//       req.flash('alertStatus', 'danger')
//       res.redirect('/voucher')
//     }
//   }

