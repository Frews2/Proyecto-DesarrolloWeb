import express from "express";
import Cuenta from "../models/cuenta.js";
import Administrador from "../models/administrador.js";
import Coleccionista from "../models/coleccionista.js";
import Periodista from "../models/periodista.js";
import bcrypt  from "bcrypt";
import jwt from "jsonwebtoken";



const router = express.Router();

router.post("/registeruser", async (req, res) => {
    Cuenta.find({Email: req.body.email})
    .exec()
    .then(user => {
        if(user.length >= 1) {
            return res.status(422).json({
                success: false,
                origin: "accounts/registeruser",
                data: {
                    message: "Could not create account due to duplicate email:",
                    result: null
                }
            });
        } else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        success: false,
                        origin: "accounts/registeruser",
                        data: {
                            message: "Could not generate password encryption protection",
                            result: null
                        }
                    });
                } else {
                    const newUser = new Cuenta({
                        Id: new mongoose.Types.ObjectId(),
                        Email: req.body.email,
                        TipoCuenta: req.body.tipoCuenta,
                        Password: hash
                    });
                    const userType = newUser.TipoCuenta;
                    const newUserInfo = new Cuenta;
                    switch (userType) {
                        case "Administrador":
                            newUserInfo = new Administrador({
                                IdCuenta: newUser.Id,
                                Apodo: req.body.apodo
                            });
                            break;
                        case "Coleccionista":
                            newUserInfo = new Coleccionista({
                                IdCuenta: newUser.Id,
                                Apodo: req.body.apodo,
                                FechaRegistro: req.body.fechaRegistro,
                                FechaNacimiento: req.body.fechaNacimiento,
                                Pais: req.body.pais,
                                Sexo: req.body.sexo,
                                Estatus: "Activo"
                            });
                            break;
                        case "Periodista":
                            newUserInfo = new Periodista({
                                IdCuenta: newUser.Id,
                                Nombre: req.body.nombre,
                                Ocupacion: req.body.ocupacion,
                                FechaRegistro: req.body.fechaRegistro,
                                FechaNacimiento: req.body.fechaNacimiento,
                                Pais: req.body.pais,
                                Sexo: req.body.sexo
                            });
                            break;
                    }
                    newUser.save();
                    newUserInfo.save()
                        .then(result => {
                            console.log(result);
                            return res.status(201).json({
                                success: true,
                                origin: "accounts/registeruser",
                                data: {
                                    message: "ACCOUNT GENERATED SUCCESSFULLY",
                                    result: newUser
                                }
                            })
                        })
                        .catch(error => {
                            console.error("An error ocurred while creating account", error);
                            return res.status(500).json({
                                success: false,
                                origin: "accounts/registeruser",
                                data: {
                                    message: "Could not create account due to error:" + error,
                                    result: null
                                }
                            });
                        });
                }
            });
        }
    })
});

router.post("/login", async (req, res) => {
    User.findOne({Email: req.body.email})
    .exec()
    .then(userLogin => {
        if(userLogin.length < 1) {
            return res.status(401).json({
                success: false,
                origin: "accounts/login",
                data: {
                    message: "Authorization failed. Could not login user",
                    result: null
                }
            });
        }
        bcrypt.compare(req.body.password, userLogin.Password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    origin: "accounts/login",
                    data: {
                        message: "Authorization failed. Could not login user",
                        result: null
                    }
                });
            }
            if (result) {
                const token = jwt.sign(
                    {
                        userId: userLogin.Id,
                        email: userLogin.Email
                    },
                    process.env.JWT_KEY, 
                    {
                        expiresIn: "2h"
                    }
                );
                return res.status(200).json({
                    success: true,
                    origin: "accounts/registeruser",
                    data: {
                        message: "LOGIN SUCCESSFUL",
                        result: token
                    }
                })

            } else {
                return res.status(401).json({
                    success: false,
                    origin: "accounts/login",
                    data: {
                        message: "Authorization failed. Could not login user",
                        result: null
                    }
                });
            }
        });
    })
    .catch(err => {
        console.error("An error ocurred while loggin in", error);
        return res.status(500).json({
            success: false,
            origin: "accounts/login",
            data: {
                message: "Could not login user",
                result: null
            }
        });
    });
});

export default router;