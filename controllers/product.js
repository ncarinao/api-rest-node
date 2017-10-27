'use strict'
const Product = require('../models/product')


function getProduct(req,res){
  let productId=req.params.id
  console.log(productId)
  Product.findById(productId, (err,product)=>{
    if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
    if(!product) return res.status(404).send({message:`El producto no existe`})
    res.status(200).send({product})
  })
}

function getProducts(req,res){
  Product.find({}, (err,products)=>{
    if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
    if(!products) return res.status(404).send({message:`No existen productos`})
    res.status(200).send({products})
  })
}

function saveProduct(req,res){
  console.log('POST /api/product')
  console.log(req.body)
  let product = new Product()
  product.name=req.body.name
  product.picture=req.body.picture
  product.price=req.body.price
  product.category=req.body.category
  product.description=req.body.description
  product.save((err,productStored)=>{
    if (err) res.status(500).send({message:`error: ${err}`})
    res.status(200).send({product:productStored})
  })
}

function updateProduct(req,res){
  let productId=req.params.id
  let update=req.body
  console.log(productId)
  Product.findByIdAndUpdate(productId,update, (err,product)=>{
    if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
    if(!product) return res.status(404).send({message:`El producto no existe`})
    res.status(200).send({product})
  })
}

function deleteProduct(req,res){
  let productId=req.params.id
  console.log(productId)
  Product.findById(productId, (err,product)=>{
    if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
    if(!product) return res.status(404).send({message:`El producto no existe`})
    product.remove(err=>{
      if(err) res.status(500).send({message:`Error al realizar la peticion: ${err}`})
      res.status(200).send({message:`El producto ha sido eliminado`})
    })
  })
}

module.exports = {
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  saveProduct
}