import request from "request-promise";
import cheerio from "cheerio";
let indexNumber: number = 0;
let finish: number = 0;
let ArrayResults: string[] = [];

//Hace la petición

export async function init(ctx: any, msj: string, initial: number) {

	ArrayResults = []; //Por cada nueva búsqueda reinicia el array

	const $ = await request({
		uri: `https://listado.mercadolibre.com.ve/${msj}#D[A:${msj}]`,
		transform: (body) => cheerio.load(body, { decodeEntities: false }),
	}).catch((err) => {
		ctx.reply("Ah ocurrido un error,sorry :c");
	});

	//Busca los resultados de la búsqueda según los parámetros recibidos

	indexNumber = initial;

	$("ol li.ui-search-layout__item").each((i: number, el: string) => {
		const Products_Name: string = $(el)
			.find("div.ui-search-result__wrapper div a h2")
			.html();
		const Price_Product: number = $(el)
			.find(
				"div.ui-search-result__wrapper div div div div span span.price-tag-fraction"
			)
			.html();
		finish = i + indexNumber + 1;
		ArrayResults.push(
			    (i + 1) +
				"." +
				Products_Name +
				"\n" +
				"💰" +
				Price_Product +
				" Bs.S" +
				"\n\n"
		);
	});

	more(ctx, 0);
}

export function more(ctx: any, number: number) {
	let messageOut: string = "";

	//Suma el indice de busqueda en el array

	indexNumber += number;

	if (indexNumber > finish) {
		messageOut = "";
	} else {
		for (var i = indexNumber; i < indexNumber + 5; i++) {
			if (ArrayResults[i]) {
				messageOut += ArrayResults[i];
			}
		}
	}

	if (messageOut == "") {
		ctx.reply("No hay mas resultados que mostrar");
	} else {
		ctx.reply("Resultado de búsqueda:" + "\n\n" + messageOut, {
			reply_markup: {
				inline_keyboard: [
					[{ text: "Ver mas resultados", callback_data: "more" }],
				],
			},
		});
	}
}