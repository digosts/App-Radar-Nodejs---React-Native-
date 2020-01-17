const mongoose = require('mongoose');
const Point = require('./Point');

const PrestadorSchema = new mongoose.Schema({
	nome:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true
    },
    descricao:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:'not-found.jpg'
    },
    servicos:{
        type:[String],
        require:true
    },
    location:{
        type:Point,
        index:'2dsphere'
    },
    telefone:{
        type:String
    },
    celular:{
        type:String
    },
    status:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Prestador',  PrestadorSchema);