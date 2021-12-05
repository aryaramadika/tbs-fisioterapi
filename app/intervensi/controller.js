const Intervensi = require('./model')

module.exports ={
    index: async(req,res) => {
        try {
            // const alertMessage = req.flash("alertMessage")
            // const alertStatus = req.flash("alertStatus")

            // const alert ={ message : alertMessage , status:alertStatus}
            const intervensi = await Intervensi.find()
            console.log('alert >>>')
            console.log(intervensi)

            res.render('admin/intervensi/view_intervensi',{
                intervensi,
                // alert,
                // name: req.session.user.name,
                title: 'intervensi Page'
            })
        } catch (err) {
            // req.flash('alertMessage', `${err.message}`)
            // req.flash('alertStatus', 'danger')
            console.log(err)
            res.redirect('/intervensi')
        }
    },
    viewCreate : async(req,res) =>{
        try {
            res.render('admin/intervensi/create',{
                // name: req.session.user.name,
                title: 'Add intervensi Page'
            })
        } catch (err) {
            // req.flash('alertMessage', `${err.message}`)
            // req.flash('alertStatus', 'danger')
            res.redirect('/emr/create')
        }
    },
    actionCreate : async(req,res)=>{
        try {
            const {intervensiName} = req.body
            let intervensi = await Intervensi({intervensiName})
            await intervensi.save();
            // req.flash('alertMessage',"added successfully")
            // req.flash('alertStatus', "success")
            console.log('Berhasil')
            res.redirect('/emr/create') 
        } catch (error) {
            // req.flash('alertMessage', `${err.message}`)
            // req.flash('alertStatus', 'danger')
            res.redirect('/emr/create')
            console.log('gagal')
        }
    },viewEdit: async(req,res) =>{
        try {
            const{id}= req.params;
            const intervensi = await Intervensi.findOne({_id:id})
            
            res.render('admin/intervensi/edit',{
                intervensi,
                // name: req.session.user.name,
                title: 'Edit intervensi Page'
            });
        } catch (err) {
            // req.flash('alertMessage', `${err.message}`)
            // req.flash('alertStatus', 'danger')
            res.redirect('/emr/create')
        }
    },
    actionEdit : async(req,res)=>{
        try {
            const{id}= req.params;
            const{intervensiName}=req.body
             await Intervensi.findByIdAndUpdate({
                _id:id
            },{intervensiName})
            // req.flash('alertMessage',"edit successfully")
            // req.flash('alertStatus', "success")
            res.redirect('/emr/create')
        } catch (err) {
            // req.flash('alertMessage', `${err.message}`)
            // req.flash('alertStatus', 'danger')
            res.redirect('/emr/create')
            
        }
    },
    actionDelete : async(req,res) =>{
        try {
            const{id}= req.params;

            await Intervensi.findOneAndRemove({
                _id:id
            })
            // req.flash('alertMessage',"delete successfully")
            // req.flash('alertStatus', "success")
            res.redirect('/emr/create')

        } catch (err) {
            // req.flash('alertMessage', `${err.message}`)
            // req.flash('alertStatus', 'danger')
            res.redirect('/emr/create')
        }
    }

    

}