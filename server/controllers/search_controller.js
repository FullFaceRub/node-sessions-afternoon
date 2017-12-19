const swag = require('../models/swag');

module.exports = {
    search: (req,res,next)=>{
        const {category} = req.query

        const swagArr = swag.filter(swag=>swag.category == category)

        if (swagArr.length>0){
            res.status(200).send(swagArr)
        } else {res.status(200).send(swag)};
    }
}