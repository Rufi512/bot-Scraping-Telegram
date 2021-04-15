import { Context } from "telegraf";
import { request, showResult } from "../controllers";

export const start = (ctx: Context) => {
	ctx.reply(
		"Hola!,este bot realiza consulta de productos en la pagina Mercadolibre Venezuela"
	);
};

export const search = async (ctx: Context) => {

	const search = ctx.message ? ctx.message.text : "";

	if((!/^[A-Za-zẃéŕúíóṕáśḱĺźćǘḿńẂÉŔÚÍÓṔÁŚǴḰĹŹĆǗŃḾ1234567890{}[+´'"-_!#$%&/()=?¿ ]+$/.test(search as string))){
		return ctx.reply('Hey!,no envíes emojis o cosas raras en tu búsqueda')
	}
    
    ctx.reply("Espera un momento...");
	const res = await request(search as string);
	
	if (res) {
		showResult(ctx);
	} else {
		ctx.reply("Ah ocurrido un error,pero intenta buscar otra cosa!,sorry :c");
	}

};

export const help = (ctx: Context) => {
	ctx.reply("Solo escribe el nombre del producto que deseas buscar!");
};