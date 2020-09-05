const Telegraf = require('telegraf')
import {Bot_token} from './key'
import {StartPetitions} from './Petitions'

const bot = new Telegraf(Bot_token)

bot.start(StartPetitions.start) //Bienvenida

bot.help(StartPetitions.help) //Ayuda

bot.on('text', StartPetitions.search) //Recibe texto y luego busca

bot.launch()