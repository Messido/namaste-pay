import {express} from "express"
import {cors } from "cors"
const app = express()
app.use(cors())
app.use(express.json())
const router = express.Router()

module.exports = {
    Router
}


app.listen(3000)