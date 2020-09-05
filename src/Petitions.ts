import request from 'request-promise'
import cheerio from 'cheerio'

//Definimos la clase

class Petitions { 

	public start (ctx:any) {
	   ctx.reply('Hola!,este bot hace scraping a la pagina Mercadolibre Venezuela,solo mostrara los 3 primeros resultados de una búsqueda')
}


    public help (ctx:any){
	   ctx.reply('Muy simple,solo escribe lo que quieras buscar y es todo!')
   }



     public search(ctx:any){
		const msj = ctx.message.text
        ctx.reply('Espera un Momento...')
        init(msj)
        
//Hace la peticion
async function init(msj:string){ 
	
const $ = await request({uri: `https://listado.mercadolibre.com.ve/${msj}#D[A:${msj}]`,
transform: body => cheerio.load(body,{ decodeEntities: false })
}).catch((err)=>{
	ctx.reply('Ah ocurrido un error,sorry :c')
})

//Busca los 3 primeros resultados de la busqueda

const name_product_1 = $('ol li').find('div div h2')
const name_product_2 = $('ol li').next().find('div div h2')
const name_product_3 = $('ol li').next().next().find('div div h2')
const price_product_1 = $('ol li').find('div div span .price-tag-fraction')
const price_product_2 = $('ol li').next().find('div div span .price-tag-fraction')
const price_product_3 = $('ol li').next().next().find('div div span .price-tag-fraction')

//Imprime los resultados de la busqueda

const resultado:string = 'Se han encontrado: \n\n' + name_product_1.html() + '\n' + '💰' + price_product_1.html() + ' Bs.S' 
		 + '\n\n'
		 + name_product_2.html() + '\n' + '💰' + price_product_2.html() + ' Bs.S'
		 + '\n\n'
		 + name_product_3.html() + '\n' + '💰' + price_product_3.html() + ' Bs.S'


ctx.reply(resultado)


}


}



}





export const StartPetitions = new Petitions() 

