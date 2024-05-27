import {jwt} from "json-web-token"
import { JWT_SECRET } from "../config"

const authMiddleware = (req, res , next) =>{
    const authHeader = req.header.authorization
    if(!authHeader || authHeader.startsWith("Bearer ")){
        res.status(403).send({
            msg : "No token"
        })
    }
    const token = authHeader.split('')[1]
    try {
        const decoded = jwt.verify(token , JWT_SECRET)
        req.userId = decoded.userId
        next()
    }catch{
        res.status(403).send({})
    }

    
}


module.exports({
    authMiddleware
})