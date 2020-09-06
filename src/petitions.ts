import { init, more } from "./request";
let msj: string = "";
//Definimos la clase

class petitions {
	public start(ctx: any) {
		ctx.reply(
			"Hola!,este bot hace scraping a la pagina Mercadolibre Venezuela"
		);
	}

	public help(ctx: any) {
		ctx.reply("Muy simple,solo escribe lo que quieras buscar y es todo!");
	}

	public search(ctx: any) {
		msj = ctx.message.text;
		ctx.reply("Espera un Momento...");
		init(ctx, msj, 0);
	}

	public more(ctx: any) {
		more(ctx, 5);
	}
}

export const StartPetitions = new petitions();
