const config = require('../../config')
const jwt = require('jsonwebtoken')
const user = require('../users/model')
var express = require('express');
var router = express.Router();
const Patient = require('../patient/model')


module.exports = {
  isLoginAdmin: (req, res, next) => {
    if (req.session.user === null || req.session.user === undefined) {
      req.flash('alertMessage', `Mohon maaf session anda telah habis silahkan login kembali`)
      req.flash('alertStatus', 'danger')
      res.redirect('/')
    } else {
      next()
    }
  },



  isLoginPatient : async(req, res, next) =>{ 
    try {
      const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

      const data = jwt.verify(token, config.jwtKey)

      const patient = await Patient.findOne({_id : data.patient.id})

      if(!patient){
        throw new Error()
      }

      req.patient =  patient
      req.token =  token
      next()
    } catch (err) {
      res.status(401).json({
        error:  'Not authorized to acces this resource'
      })
    }

  }
}