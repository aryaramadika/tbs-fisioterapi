const User = require('./model')
const bcrypt = require('bcryptjs')
const res = require('express/lib/response')

module.exports = {
  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")
      const user = await User.find({})
      const alert = { message: alertMessage, status: alertStatus }
      console.log(user)
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
          title: 'Sign Up Page for Therapists'
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
        const{name, email,password,status} = req.body

        bcrypt.hash(password,10).then((hash) =>{
        let user = new User({
            name,
            email,
            password:hash,
            status,
            
        })
        user.save()
        })
        req.flash('alertMessage', "Berhasil Registrasi")
        req.flash('alertStatus', "success")
        res.redirect('/setup_profile')
    } catch (err) {
        req.flash('alertMessage', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/sign_up')
    }
  },
  viewSetupProfile: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = { message: alertMessage, status: alertStatus }
      if (req.session.user === null || req.session.user === undefined) {
        res.render('admin/users/view_setupProfile', {
          alert,
          // name: req.session.user.name,
          title: 'SignUp Page for Therapists'
        })
      }else{
        res.redirect('/setup_profile')
      }

      
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/')

    }
  },actionSetupProfile: async(req,res)=>{
    try {
        const{ Address,role,DateofBirth,phoneNumber} = req.body
        // const user = await User.findById(req.user._id)
        // const{id} = req.params
        // const{name, email,password,status,Address,role,DateofBirth,phoneNumbe} = req.body
        // await User.findByIdAndUpdate({
        //   _id:id
        // }),{name, email,password,status,Address,role,DateofBirth,phoneNumbe}
        // if(user)
        // {
        //   user.Address = req.body.Address || user.Address
        //   user.role = req.body.role || user.role
        //   user.DateofBirth = req.body.DateofBirth || user.DateofBirth
        //   user.phoneNumbe = req.body.phoneNumbe || user.phoneNumbe
        // }
        let user = new User({
            Address,
            role,
            DateofBirth,
            phoneNumber
        })
        user.save()
        
        req.flash('alertMessage', "Berhasil Registrasi")
        req.flash('alertStatus', "success")
        res.redirect('/')
    } catch (err) {
        req.flash('alertMessage', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/setup_profile')
    }
  }
}