const User = require('./model')
const bcrypt = require('bcryptjs')
const res = require('express/lib/response')

module.exports = {
  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = { message: alertMessage, status: alertStatus }
      if (req.session.user === null || req.session.user === undefined) {
        res.render('admin/users/view_signin', {
          alert,
          // name: req.session.user.name,
          title: 'Login Page for Therapists'
        })
      }else{
        res.redirect('/dashboard')
      }

      
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/')

    }
  },
  actionSignin: async (req, res) => {
    try {
      const { email, password } = req.body
      const check = await User.findOne({ email: email })
      console.log(check)
      if (check) {
        if (check.status === 'Y') {
          const checkPassword = await bcrypt.compare(password, check.password)
          if (checkPassword) {
            req.session.user = {
              id: check._id,
              email: check.email,
              status: check.status,
              name: check.name
            }
            res.redirect('/dashboard')
          } else {
            req.flash('alertMessage', `Kata sandi yang anda inputkan salah`)
            req.flash('alertStatus', 'danger')
            res.redirect('/')
          }

        } else {
          req.flash('alertMessage', `Mohon maaf status anda belum aktif`)
          req.flash('alertStatus', 'danger')
          res.redirect('/')
        }

      } else {
        req.flash('alertMessage', `Email yang anda inputkan salah`)
        req.flash('alertStatus', 'danger')
        res.redirect('/')
      }

    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/')
    }
  },
  actionLogout : (req, res)=>{
    req.session.destroy();
    res.redirect('/')
  },
  viewSignup: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = { message: alertMessage, status: alertStatus }
      if (req.session.user === null || req.session.user === undefined) {
        res.render('admin/users/view_signup', {
          alert,
          // name: req.session.user.name,
          title: 'SignUp Page for Therapists'
        })
      }else{
        res.redirect('/sign_up')
      }

      
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/')

    }
  },actionSignup: async(req,res)=>{
    try {
        const{email,name,password,role,status,phoneNumber} = req.body
        const check = await User.findOne({ email: email })
        console.log(check)
        if(check !== null){
          req.flash('alertMessage', 'email sudah digunakan')
          req.flash('alertStatus', 'danger')
          res.redirect('/sign_up')
        }
        bcrypt.hash(password,10).then((hash) =>{
        let user = new User({
            email,
            name,
            password:hash,
            role,
            status,
            phoneNumber
        })
        user.save()
        })
        req.flash('alertMessage', "Berhasil Registrasi")
        req.flash('alertStatus', "success")
        res.redirect('/')
    } catch (err) {
        req.flash('alertMessage', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/sign_up')
    }
  }
}