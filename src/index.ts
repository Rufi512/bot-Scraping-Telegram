import telegraf from 'telegraf'
import dotenv from "dotenv"
dotenv.config();
import {start,search,help} from './commands'
import {showResult} from './controllers'

const token:string = process.env.TOKEN || 'YOU_TOKEN'

const bot = new telegraf(token)

bot.start(start) //Bienvenida

bot.help(help) //Ayuda

bot.on('text', search) //Recibe texto y luego realiza la búsqueda

bot.action('showResult',showResult) //Muestra mas resultado de la misma búsqueda

bot.launch()

console.log('Bot iniciado!')