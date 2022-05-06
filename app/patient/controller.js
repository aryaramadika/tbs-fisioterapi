const Patient = require('./model')
const Therapist = require('../therapist/model')
const Treatment = require('../treatment/model')
const Bank = require('../bank/model')
const Payment = require('../payment/model')
const Transaction = require('../transaction/model')
const Recommendation = require('../recommendation/model')
const EMR = require('../emr/model')
const Queue = require('../queue/model')
const fs = require('fs')
const config = require('../../config')

module.exports = {
    landingPage: async(req, res) => {
        try {
            const therapist = await Therapist.find()
            .select('therapistName thumbnail therapistAge')
            // .populate('therapist')

            res.status(200).json({data: therapist})

        } catch (err) {
            res.status(500).json({message: err.message || `Internal Server Error`})
        }
    },
    detaiTherapistPage: async(req, res) => {
        try {
            const { id } = req.params
            const therapist = await Therapist.findOne({_id: id})
            .populate('user')
            .select('_id therapistName therapistAge description therapistGender thumbnail')

            if(!therapist){
                return res.status(404).json({message : "therapist staff not found"})
            }
            res.status(200).json({data: therapist})

        } catch (err) {
            res.status(500).json({message: err.message || `Internal Server Error`})

        }
    },
    treatmentDetail: async(req, res) => {
        try {
            const { id } = req.params
            const treatment = await Treatment.findOne({_id: id})
            .populate('user','_id name phoneNumber')
            .select('_id treatmentType price')

            if(!treatment){
                return res.status(404).json({message : "therapist staff not found"})
            }
            res.status(200).json({data: treatment})

        } catch (err) {
            res.status(500).json({message: err.message || `Internal Server Error`})

        }
    },
    paymentMethod: async(req, res) => {
      try {
          const { id } = req.params
          const payment = await Payment.find()
          .populate('user','_id name phoneNumber')
          .populate('banks')
          .select('_id type banks bankName')

          if(!payment){
              return res.status(404).json({message : "therapist staff not found"})
          }
          res.status(200).json({data: payment})

      } catch (err) {
          res.status(500).json({message: err.message || `Internal Server Error`})

      }
  },
  emr: async(req, res) => {
    try {
        const { id } = req.params
        const emr = await EMR.find({_id:id})
        .populate('user','_id name phoneNumber')
        // .populate('banks')
        .select('_id name diagnosis plan')

        if(!emr){
            return res.status(404).json({message : "emr  not found"})
        }
        res.status(200).json({data: emr})

    } catch (err) {
        res.status(500).json({message: err.message || `Internal Server Error`})

    }
},
  recommendation: async(req, res) => {
    try {
        const { id } = req.params
        const recommendation = await Recommendation.find()
        .populate('user','_id name phoneNumber')
        .populate('emr')
        .select('_id emr recommend date status')

        if(!recommendation){
            return res.status(404).json({message : "recommendation not found"})
        }
        res.status(200).json({data: recommendation})

    } catch (err) {
        res.status(500).json({message: err.message || `Internal Server Error`})

    }
},
  reservationPage: async(req, res) => {
    try {
        const { id } = req.params
        const que = await Queue.find()
        // .populate('user','_id name phoneNumber')
        // .populate('banks')
        .populate('treatment')
        .populate('payment')
        .populate('user','_id name phoneNumber')
        .select('_id name age phoneNumber lementation')

        if(!que){
            return res.status(404).json({message : "treatment staff not found"})
        }
        res.status(200).json({data: que})

    } catch (err) {
        res.status(500).json({message: err.message || `Internal Server Error`})

    }
},
    ques: async(req,res)=>{
        try {
          const {accountUser, name, treatment, que, phoneNumber,lementation,age,bank,payment} = req.body
          const res_que = await Queue.findOne({ _id : que})
          .select('_id name age phoneNumber lementation')
          .populate('treatment')
          .populate('user')

          if (!res_que) return res.status(404).json({ message: 'que not found' })

          const res_treatment = await Treatment.findOne({_id:treatment})
          if (!res_treatment) return res.status(404).json({ message: 'treatment not found' })
        
          const res_payment = await Payment.findOne({ _id: payment })
        
          if (!res_payment) return res.status(404).json({ message: 'payment not found' })
        
          const res_bank = await Bank.findOne({ _id: bank })
        
          if (!res_bank) return res.status(404).json({ message: 'bank not found' })

          let adminFee = (1/100) * res_treatment._doc.price
          let total = res_treatment._doc.price + adminFee
          console.log(res_treatment)
          const payload ={
            historyTreatment: {
                name: res_que._doc.name,
                age: res_que._doc.age,
                phoneNumber: res_que._doc.phoneNumber,
                lementation: res_que._doc.lementation,
                treatmentType: res_treatment._doc.treatmentType ,
                price: res_treatment._doc.price
              },
              historyPayments:{
                name: res_bank._doc.name,
                type: res_payment._doc.type,
                bankName: res_bank._doc.bankName,
                noRekening: res_bank._doc.noRekening,
              },
            name: name,
            phoneNumber:phoneNumber,
            patient: req.patient._id,
            // treatment: treatment,
            // que:
            lementation:lementation,
            // gender:gender,
            adminFee: adminFee,
            total: total,
            age:age,
            accountUser: accountUser,
            historyUser: {
              name: res_que._doc.user?.name,
              phoneNumber: res_que._doc.user?.phoneNumber
            },
            user: res_que._doc.user?._id
          }
          const ques = new Queue(payload)
          const transaction = new Transaction(payload)
          await ques.save(ques)
          await transaction.save(transaction)

          res.status(201).json({
            data: transaction
          })

        } catch (err) {
          res.status(500).json({
            message: err.message || 'Internal Server Error' 
          })
        }


    },
    book : async(req, res) => {

        try {
          const {accountUser, name, treatment, payment, bank, phoneNumber,lementation,age,gender} = req.body
      
          const res_treatment = await Treatment.findOne({ _id : treatment})
          .select('treatmentType _id price user')
          .populate('user')
        
          if (!res_treatment) return res.status(404).json({ message: 'treatment not found' })
        
          const res_payment = await Payment.findOne({ _id: payment })
        
          if (!res_payment) return res.status(404).json({ message: 'payment not found' })
        
          const res_bank = await Bank.findOne({ _id: bank })
        
          if (!res_bank) return res.status(404).json({ message: 'bank not found' })
        
          let adminFee = (1/100) * res_treatment._doc.price
          let total = res_treatment._doc.price + adminFee
        
          console.log("TREATMENT TYPE")
          console.log(res_treatment._doc )
          const payload = {
            historyTreatment: {
            //   queue: res_treatment._doc.queue,
              name,
              age,
              phoneNumber,
              gender,
              lementation,
              treatmentType: res_treatment._doc.treatmentType,
              price: res_treatment._doc.price
            },
            historyPayments:{
              name: res_bank._doc.name,
              type: res_payment._doc.type,
              bankName: res_bank._doc.bankName,
              noRekening: res_bank._doc.noRekening,
            },
            name: name,
            accountUser: accountUser,
            lementation:lementation,
            phoneNumber:phoneNumber,
            treatment,
            gender:gender,
            age:age,
            adminFee: adminFee,
            total: total,
            patient: req.patient._id,
            historyUser: {
              name: res_treatment._doc.user?.name,
              phoneNumber: res_treatment._doc.user?.phoneNumber
            },
            user: res_treatment._doc.user?._id
          }

          const transaction = new Transaction(payload)
          const que = new Queue(payload)
          await que.save(que)
          await transaction.save(transaction)
          
          res.status(201).json({
            data: transaction,
          })
      
        } catch (err) {
          res.status(500).json({
            message: err.message || 'Internal Server Error' 
          })
        }
    },
    history:async(req, res)=>{
        try {
            const {status = ''} = req.query;
            let criteria ={}

            if(status.length){
                criteria ={
                    ...criteria,
                    status:{$regex: `${status}`,$options:'i'}
                }
            }

            if(req.patient._id){
                criteria={
                    ...criteria,
                    patient: req.patient._id
                }
            }

            const history = await Transaction.find(criteria)
            let totalTransaction = await Transaction.aggregate([
                { $match: criteria },
                {
                  $group: {
                    _id: null,
                    total: { $sum: "$total" }
                  }
                }
              ])
            res.status(200).json({
                data: history,
                totalTransaction: totalTransaction.length ? totalTransaction[0].total : 0

            })
            
        } catch (error) {
            res.status(500).json({
                message: err.message || 'Internal Server Error' 
              })
        }
    },
    historyDetail: async (req, res) => {
        try {
          const { id } = req.params
    
          const history = await Transaction.findOne({ _id: id })
    
          if (!history) return res.status(404).json({ message: "history tidak ditemukan." })
    
          res.status(200).json({ data: history })
    
        } catch (err) {
          res.status(500).json({ message: err.message || `Internal server error` })
        }
      },

      dashboard:async(req, res) => {
        try {
          const count = await Transaction.aggregate([
            {$match :{
              patient: req.patient._id
            }},
            {
              $group:{
                _id: '$treatment',
                total: {$sum: '$total'}
              }
            }
          ])
          const treatment = await Treatment.find({})

        treatment.forEach(element => {
        count.forEach(data => {
          if (data._id.toString() === element._id.toString()) {
            data.treatmentType = element.treatmentType
              }
          } )
          });
          const history = await Transaction.find({ patient: req.patient._id })
          .populate('treatment')
          .sort({ 'updatedAt': -1 })

          console.log(count.data)
          res.status(200).json({ data: history, count: count })

        } catch (err) {
          res.status(500).json({ message: err.message || `Internal server error` })
        }
      },
      profile: async(req,res) =>{
        try {
          const patient ={
            id: req.patient._id,
            username: req.patient.username,
            email: req.patient.email,
            name: req.patient.name,
            avatar: req.patient.avatar,
            phoneNumber: req.patient.phoneNumber
    
          }
          console.log(req.patient.phoneNumber)
            res.status(200).json({data : patient})
        } catch (err) {
            res.status(500).json({
                message : err.message || 'Internal Server Error'
            })
        }
    },
    editProfile: async (req, res, next) => {
      try {
        const { name = "", phoneNumber = "" } = req.body
  
        const payload = {}
  
        if (name.length) payload.name = name
        if (phoneNumber.length) payload.phoneNumber = phoneNumber
  
        if (req.file) {
  
          let tmp_path = req.file.path;
          let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
          let filename = req.file.filename + '.' + originaExt;
          let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)
  
          const src = fs.createReadStream(tmp_path)
          const dest = fs.createWriteStream(target_path)
  
          src.pipe(dest)
  
          src.on('end', async () => {
            let patient = await Patient.findOne({ _id: req.patient._id })
  
            let currentImage = `${config.rootPath}/public/uploads/${patient.avatar}`;
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage)
            }
  
            patient = await Patient.findOneAndUpdate({
              _id: req.patient._id
            }, {
              ...payload,
              avatar: filename
            }, { new: true, runValidators: true })
  
            console.log(patient)
  
            res.status(201).json({
              data: {
                id: patient.id,
                name: patient.name,
                phoneNumber: patient.phoneNumber,
                avatar: patient.avatar,
              }
            })
          })
  
          src.on('err', async () => {
            next(err)
          })
  
        } else {
          const patient = await Patient.findOneAndUpdate({
            _id: req.patient._id
          }, payload, { new: true, runValidators: true })
  
          res.status(201).json({
            data: {
              id: patient.id,
              name: patient.name,
              phoneNumber: patient.phoneNumber,
              avatar: patient.avatar,
            }
          })
        }
  
      } catch (err) {
        if (err && err.name === "ValidationError") {
          res.status(422).json({
            error: 1,
            message: err.message,
            fields: err.errors
          })
        }
      }
    },
    detailPriceTreatmentPage: async(req, res) => {
      try {
          // const { id } = req.params
          const treatment = await Treatment.find()
          // .populate('user')
          .select('_id treatmentType price')

          if(!treatment){
              return res.status(404).json({message : "therapist staff not found"})
          }
          res.status(200).json({data: treatment})

      } catch (err) {
          res.status(500).json({message: err.message || `Internal Server Error`})

      }
  },
  checkupHistory: async(req, res) =>{
    try {
      const {primaryComplain, diagnosis, date} = req.body
      const {status = ''} = req.query;
      let criteria ={}

      if(status.length){
          criteria ={
              ...criteria,
              status:{$regex: `${status}`,$options:'i'}
          }
      }

      if(req.patient._id){
          criteria={
              ...criteria,
              patient: req.patient._id,
          }
      }

      const cpHistory = await EMR.find(criteria)
      let totalCP = await EMR.aggregate([
        { $match: criteria },
        {
          $group: {
            _id: null,
          }
        }
      ])
      // .select('primaryComplain diagnosis date')
      res.status(200).json({
        data: cpHistory,
        totalCP: totalCP.length ? totalCP[0].total : 0
      })

  } catch (err) {
    res.status(500).json({
      message: err.message || 'Internal Server Error' 
    })
  }
},

patientRecommendation: async(req, res) =>{
  //   try {
  //     const {status = ''} = req.query;
  //     let criteria ={}
  
  //     if(status.length){
  //         criteria ={
  //             ...criteria,
  //             status:{$regex: `${status}`,$options:'i'}
  //         }
  //     }
  
  //     if(req.patient_id){
  //         criteria={
  //             ...criteria,
  //             patient: req.patient._id
  //         }
  //     }
  
  //     const history = await Transaction.find(criteria)
  //     let totalTransaction = await Transaction.aggregate([
  //         { $match: criteria },
  //         {
  //           $group: {
  //             _id: null,
  //             total: { $sum: "$total" }
  //           }
  //         }
  //       ])
  //     res.status(200).json({
  //         data: history,
  //         totalTransaction: totalTransaction.length ? totalTransaction[0].total : 0
  
  //     })
      
  // } catch (error) {
  //     res.status(500).json({
  //         message: err.message || 'Internal Server Error' 
  //       })
  // }
    try {
      const {primaryComplain, diagnosis, date} = req.body
      const {status = ''} = req.query;
      let criteria ={}
  
      if(status.length){
          criteria ={
              ...criteria,
              status:{$regex: `${status}`,$options:'i'}
          }
      }
  
      if(req.patient_id){
          criteria={
              ...criteria,
              patient: req.patient._id,
          }
      }
  
      const viewRec = await Recommendation.find(criteria)
      let totalRec = await Recommendation.aggregate([
                { $match: criteria },
                {
                  $group: {
                    _id: null,
                  }
                }
              ])
      // .select('recommend therapist date status')
      res.status(200).json({
        data: viewRec,
        totalRec: totalRec.length ? totalRec[0].total : 0
      })
  
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Internal Server Error' 
    })
  }
  }



}