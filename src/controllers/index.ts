import axios from "axios";
import cheerio from "cheerio";
import { Context } from "telegraf";
let indexNumber: number = 0;
let finish: number = 0;
let arrayResults: string[] = [];

export const request = async (search: string) => {
	const URI = `https://listado.mercadolibre.com.ve/${search}#D[A:${search}]`;

	arrayResults = []; //Por cada nueva búsqueda reinicia el array
	indexNumber = 0; // Reiniciamos Indice
	const res = await axios
		.get(URI)
		.then((response) => {
			const $ = cheerio.load(response.data, { decodeEntities: false });

			$("ol li.ui-search-layout__item").each(
				(i: number, el: CheerioElement) => {
					const Products_Name = $(el)
						.find("div.ui-search-result__wrapper div a h2")
						.html();

					const Price_Product = $(el)
						.find(
							"div.ui-search-result__wrapper div div div div span span.price-tag-fraction"
						)
						.html();

					const Link_Product = $(el).find("div div a").attr("href");

					finish = i + 1;

					arrayResults.push(
						i +
							1 +
							"." +
							Products_Name +
							"\n" +
							"💰" +
							Price_Product +
							" Bs.S " +
							"[Visitar Pagina](" +
							Link_Product +
							")" +
							"\n\n"
					);
				}
			);

			return response;
		})
		.catch((err) => {
			console.log(err);
		});

	if (res && res.status === 200) {
		return true;
	} else {
		return false;
	}
};

export const showResult = (ctx: Context) => {
	
	let messageOut:string = "";

	if (indexNumber >= finish) {
		messageOut = "";
		ctx.reply("No hay mas resultados que mostrar");
	} else {
		for (let i = indexNumber; i < indexNumber + 5; i++) {
			if (arrayResults[i]) {
				messageOut += arrayResults[i];
			}
		}

		//Suma el indice de busqueda en el array
		indexNumber += 5;

		ctx.reply("Resultado de búsqueda:" + "\n\n" + messageOut, {
			parse_mode: "Markdown",
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: "Ver mas resultados",
							callback_data: "showResult",
						},
					],
				],
			},
		});
	}
};