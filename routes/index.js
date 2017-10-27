'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const api = express.Router()
const userCtrl = require('../controllers/user')
const auth= require('../middlewares/auth')

api.get('/product', productCtrl.getProducts)
api.get('/product/:id', productCtrl.getProduct)
api.post('/product',auth, productCtrl.saveProduct)
api.put('/product/:id',auth, productCtrl.updateProduct)
api.delete('/product/:id', productCtrl.deleteProduct)
api.post('/singup', userCtrl.singUp)
api.post('/singin', userCtrl.singIn)
api.get('/private', auth, function(req,res){
  res.status(200).send({message:`Tienes acceso`})
})

module.exports = api