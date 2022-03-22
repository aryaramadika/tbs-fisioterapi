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
      if (req.session.user === null || req.session.user === undefined) {
        res.render('admin/users/view_signin', {
          alert,
          user,
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
              Address: check.Address,
              phoneNumber: check.phoneNumber,
              DateofBirth: check.DateofBirth,
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
        const{name, email,password,status, role, Address, DateofBirth, phoneNumber} = req.body

        bcrypt.hash(password,10).then((hash) =>{
        let user = new User({
            name,
            email,
            password:hash,
            status,
            role,
            Address,
            DateofBirth,
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
  },

  viewManageProfile: async(req,res) =>{
    try {
        // const{id}= req.params;
        // const user = await User.findOne({id:req.session.user._id})
        
        res.render('admin/users/editProfile',{
            user: req.session.user,
            name: req.session.user.name,
            title: 'Manage Profile Page'
        });
    } catch (err) {
        req.flash('alertMessage', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/user')
        console.log(err);
    }
},

actionManageProfile : async(req,res)=>{
    try {
        console.log(req.body)
        const{id}= req.params;
        const{name,Address,phoneNumber,DateofBirth}=req.body
        
         await User.findByIdAndUpdate({
            _id:req.session.user.id
        },{name,Address,phoneNumber,DateofBirth})
        req.session.user = {
          id: req.session.user.id,
          email: req.session.user.email,
          Address: Address,
          phoneNumber: phoneNumber,
          DateofBirth: DateofBirth,
          status: req.session.user.status,
          name: name
        }
        req.flash('alertMessage',"edit successfully")
        req.flash('alertStatus', "success")
        res.redirect('/dashboard')
    } catch (err) {
        req.flash('alertMessage', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/manage_profile')
        console.log(err)
    }
},
index: async(req,res) => {
  try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")
      const{id}= req.params;
      id = _id
      const alert ={ message : alertMessage , status:alertStatus}
      const user = await User.find({})
      // .populate('emr')
      // const emr = await EMR.countDocuments()
      // const emrss = await EMR.find({_id:id})
      // console.log('alert >>>')
      // console.log(users)
      
      res.render('admin/users/viewEditProfile',{
          user,
          alert,
          name: req.session.user.name,
          title: 'TBS Physiotherapy Staff Page'
      })
  } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      console.log(err)
      res.redirect('/users')
  
}}

}