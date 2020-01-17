const Prestador = require('../models/Prestador');

module.exports = {
    async getFind(req, res){
        try{
            const prestador = await Prestador.findById(req.params.id);
            
            return res.json({
                status:200,
                data: prestador
            });
        }catch(e){
            return res.json({
                status:500,
                data: undefined,
                message: 'Não foi possível realizar essa operação!'
            });
        }
    },

    async list(req, res){
        try{
            const {latitude, longitude, servicos} = req.body;
            
			const prestador = await Prestador
				.find({
                    servicos:{
                        $in:servicos
                    },
                    location:{
                        $near:{
                            $geometry:{
                                type:'Point',
                                coordinates:[longitude, latitude]
                            },
                            $maxDistance: 10000
                        }
                    }
                });

			return res.json({
				status:200,
				data: prestador
			});
        }catch(e){
            return res.json({
                status:500,
                data: undefined,
                message: 'Não foi possível realizar essa operação!'
            });
        }
    },

    async create(req, res){
        try{
            await Prestador.create(req.body);

            return res.json({
                status:200,
                message: 'Registro cadastrado com sucesso'
            });
        }catch(e){
            return res.json({
                status:500,
                data: undefined,
                message: 'Não foi possível realizar essa operação!'
            });
        }
    },
}