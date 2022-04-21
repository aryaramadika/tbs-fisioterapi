const Queue = require('./model')
// const EMR = require('../emr/model')
module.exports ={
    index: async(req,res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert ={ message : alertMessage , status:alertStatus}
            const queue = await Queue.find()
            res.render('admin/queue/view_queue',{
                queue,
                alert,
                name: req.session.user.name,
                title: 'TBS Queuing Page'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            console.log(err)
            res.redirect('/queue')
        }
    },
    viewCreate : async(req,res) =>{
        try {
            const queue = await Queue.find()
            res.render('admin/queue/create',{
                name: req.session.user.name,
                title: 'Add Queuing Page'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/queue')
        }
    },
    actionCreate : async(req,res)=>{
        try {
            const {name,age,gender,phoneNumber,lementation} = req.body
            let queue = await Queue({name,age,gender,phoneNumber,lementation})
            await queue.save();
            req.flash('alertMessage',"added successfully")
            req.flash('alertStatus', "success")
            console.log('Berhasil')
            res.redirect('/queue') 
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/queue')
            console.log('gagal')
        }
    },
    viewEdit: async(req,res) =>{
        try {
            const{id}= req.params;
            const queue = await Queue.findOne({_id:id})
            
            res.render('admin/queue/edit',{
                queue,
                name: req.session.user.name,
                title: 'Edit Queue Page'
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/queue')
        }
    },
    actionEdit : async(req,res)=>{
        try {
            const{id}= req.params;
            const {name,age,gender,phoneNumber} = req.body
             await Queue.findByIdAndUpdate({
                _id:id
            },{name,age,gender,phoneNumber})
            req.flash('alertMessage',"edit successfully")
            req.flash('alertStatus', "success")
            res.redirect('/queue')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/queue')
            
        }
    },
    actionDelete : async(req,res) =>{
        try {
            const{id}= req.params;

            await Queue.findOneAndRemove({
                _id:id
            })
            req.flash('alertMessage',"delete successfully")
            req.flash('alertStatus', "success")
            res.redirect('/queue')

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/queue')
        }
    },
    actionStatus :  async (req, res)=>{
        try {
    
          const { id } = req.params
          console.log("id >>")
          console.log(id)
          const { status } = req.query
    
          await Queue.findByIdAndUpdate({_id : id}, { status })
    
          req.flash('alertMessage', `Berhasil ubah status`)
          req.flash('alertStatus', 'success')
          res.redirect('/queue')
    
          
        } catch (err) {
          req.flash('alertMessage', `${err.message}`)
          req.flash('alertStatus', 'danger')
          res.redirect('/queue')
        }
      }

}