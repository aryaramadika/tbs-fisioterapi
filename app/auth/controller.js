const Patient = require('../patient/model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



module.exports ={
    signup : async(req,res,next) =>{
        try {
            const payload = req.body
             
            if(req.file){
                let tmp_path= req.file.path;
                let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originaExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)

                src.pipe(dest)

                src.on('end', async ()=>{
                try {

                    const patient = new Patient({
                        ...payload,
                        avatar: filename
                    })

                    await patient.save();

                    delete patient._doc.password

                    res.status(201).json({
                        data : patient
                    })
                    
                } catch (err) {
                    if (err && err.name === "ValidationError") {
                        return res.status(422).json({
                            error : 1,
                            message: err.message,
                            fields: err.errors 
                        })
                    }
                }
            })
            }else{
                let patient = new Patient(payload)

                await patient.save()

                delete patient._doc.password

                res.status(201).json({
                    data : patient
                })
            }


            // res.status(201).json({
            //     message: payload
            // })
        } catch (err) { 
            if (err && err.name === "ValidationError") {
                return res.status(422).json({
                    error : 1,
                    message: err.message,
                    fields: err.errors 
                })
            }
        }
    },
    signin : async(req,res,next) =>{
        const{ email, password } = req.body

        Patient.findOne({email:email}).then((patient) =>{
            if(patient){
                const passwordCheck = bcrypt.compareSync(password, patient.password)
                if(passwordCheck){
                    const token = jwt.sign({
                        patient : {
                            id : patient.id,
                            username : patient.username,
                            email : patient.email,
                            name : patient.name,
                            phoneNumber : patient.phoneNumber,
                            avatar : patient.avatar
                        }
                    }, config.jwtKey)

                    res.status(200).json({
                        data: {token}
                    })
                }else{
                    res.status(403).json({
                        message : 'Incorrect Password'
                    })
                }
            }else{
                res.status(403).json({
                    message: 'Email not found' 
                })
            }
        }).catch((err)=>{
            res.status(500).json({
                message : err.message || 'Internal Server Error'
            })
            next()
        })
    },

}