import { promises } from 'fs'
import request from 'request'
import fetch from 'node-fetch'
import topdf from 'image-to-pdf'
import { getDoujin } from 'nhentai-node-api'


let handler = async (m, { conn, args, usedPrefix, command }) => {

        if (!args[0]) return m.reply('Cari apa?')
	if (isNaN(args[0])) return m.reply('Pake angka')
   	
        await m.reply('Loading...')
        let doujin = await getDoujin(args[0])
	let count = 0
	let ResultPdf = []
	let title = doujin.title.default
	let details = doujin.details
	let parodies = details.parodies.map(v => v.name)
	let characters = details.characters.map(v => v.name)
	let tags = details.tags.map(v => v.name)
	let artists = details.artists.map(v => v.name)
	let groups = details.groups.map(v => v.name)
	let categories = details.categories.map(v => v.name)
	let array_page = doujin.pages

	conn.sendFile(m.chat,await (await fetch(array_page[0])).buffer(),"hentai.jpg", `*${title}*\n_${doujin.title.native || ''}_\nLanguage: ${doujin.language}\nParodies: ${parodies.join(', ')}\nGroups: ${groups.join(', ')}\nArtists: ${artists.join(', ')}\nTags: ${tags.join(', ')}\nCategories: ${categories.join(', ')}\nPages: ${array_page.length}\nFavorited: ${doujin.favorites}\nLink: ${doujin.link.replace('nhentai.net/g', 'cin.pw/v')}`, m)

	for (let index = 0; index < array_page.length; index++) {
		if (!promises.existsSync('./nhentai')) promises.mkdirSync('./nhentai')
		let image_name = './nhentai/' + title + index + '.jpg'
		await new Promise((resolve) => request(array_page[index]).pipe(promises.createWriteStream(image_name)).on('finish', resolve))
		console.log(array_page[index])
		ResultPdf.push(image_name)
		count++
	}

	await new Promise((resolve) =>
		topdf(ResultPdf, 'A4')
		.pipe(promises.createWriteStream('./nhentai/' + title + '.pdf'))
		.on('finish', resolve)
	)

	for (let i = 0; i < array_page.length; i++) {
		promises.unlinkSync('./nhentai/' + title + i + '.jpg')
	}
        let size = await promises.statSync(`./nhentai/${title}.pdf`).size
	if (size < 45000000) {
		m.reply('Uploading...')
		let thumbnail = await (await fetch(doujin.cover)).buffer()
		await conn.sendFile(m.chat, promises.readFileSync(`./nhentai/${title}.pdf`), `${title}.pdf`, '', m, false, { asDocument: true })
		.then(() => promises.unlinkSync(`./nhentai/${title}.pdf`))
	} else {
		m.reply('Uploading to anonfiles because file size to large')
		let options = {
			method: 'POST',
			url: 'https://api.anonfiles.com/upload',
			formData: {
				file: promises.createReadStream(`./nhentai/${title}.pdf`),
			},
		}

		request(options, function(err, res, body) {
			if (err) throw err
			promises.unlinkSync(`./nhentai/${title}.pdf`)
			m.reply('Link download to file: ' + JSON.parse(body).data.file.url.full)
		})
	  }
    }
handler.help = ['hentai'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(n(hentai)?(hentong)?)$/i
handler.limit = 5

export default handler