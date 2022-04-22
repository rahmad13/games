import axios from 'axios';
import cheerio from'cheerio';

var pickrandom = async(ext) => {
  return ext[Math.floor(Math.random() * ext.length)]
}

async function TiktokDownloader (Url) {
	return new Promise (async (resolve, reject) => {
		await axios.request({
			url: "https://ttdownloader.com/",
			method: "GET",
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"accept-language": "en-US,en;q=0.9,id;q=0.8",
				"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
				"cookie": "_ga=GA1.2.1240046717.1620835673; PHPSESSID=i14curq5t8omcljj1hlle52762; popCookie=1; _gid=GA1.2.1936694796.1623913934"
			}
		}).then(respon => {
			const $ = cheerio.load(respon.data)
			const token = $('#token').attr('value')
			axios({
				url: "https://ttdownloader.com/req/",
				method: "POST",
				data: new URLSearchParams(Object.entries({url: Url, format: "", token: token})),
				headers: {
					"accept": "*/*",
					"accept-language": "en-US,en;q=0.9,id;q=0.8",
					"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
					"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
					"cookie": "_ga=GA1.2.1240046717.1620835673; PHPSESSID=i14curq5t8omcljj1hlle52762; popCookie=1; _gid=GA1.2.1936694796.1623913934"
				}
			}).then(res => {
				const ch = cheerio.load(res.data)
				const result = {
					status: res.status,
					result: {
						nowatermark: ch('#results-list > div:nth-child(2)').find('div.download > a').attr('href'),
						watermark: ch('#results-list > div:nth-child(3)').find('div.download > a').attr('href'),
						audio: ch('#results-list > div:nth-child(4)').find(' div.download > a').attr('href')
					}
				}
				resolve(result)
			}).catch(reject)
		}).catch(reject)
	})
}

async function musicaldown(URL) {

    return new Promise((resolve, rejecet) => {

        axios.get('https://musicaldown.com/id', {
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            }
        }).then(res => {
            const $ = cheerio.load(res.data)
            const url_name = $("#link_url").attr("name")
            const token_name = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("name")
            const token_ = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("value")
            const verify = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(3)").attr("value")
            let data = {
                [`${url_name}`]: URL,
                [`${token_name}`]: token_,
                verify: verify
            }
        axios.request({
            url: 'https://musicaldown.com/id/download',
            method: 'post',
            data: new URLSearchParams(Object.entries(data)),
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                'cookie': res.headers["set-cookie"]
            }
        }).then(respon => {
            const ch = cheerio.load(respon.data)
        axios.request({
            url: 'https://musicaldown.com/id/mp3',
            method: 'post',
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                'cookie': res.headers["set-cookie"]
            }
        }).then(resaudio => { 
            const hc = cheerio.load(resaudio.data)       
            const result = {
                creator: 'Arya-kun >///<',
                video: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)').attr('href'),
                audio: hc('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)').attr('href'),
                video_original: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)').attr('href'),
                audio_original: hc('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)').attr('href'),
                preview: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4 > img').attr('src')
            }
        resolve(result)
        })
    })
    })
    })
}

function ttSearch (query) {
	return new Promise((resolve, reject) => {
		axios.get('https://brainans.com/search?query='+query).then(res => {
			const $ = cheerio.load(res.data)
			const result = []
			const main = $('#search-container > div')
			main.each( function() {
				const user_url = 'https://brainans.com'+$(this).find('div.content__text > a').attr('href')
				const user = $(this).find('div.content__text > a').text()
				const username = $(this).find('div.content__text > p').text()
				result.push({ user, username, user_url })
				const hasil = {
					result: result
				}
				resolve(hasil)
			})
		}).catch(reject)
	})
}
async function ttUser (url) {
	return new Promise(async(resolve, reject) => {
		axios.get(url).then(res => {
			const $ = cheerio.load(res.data)
			const result = []
			const main = $('#videos_container > div > div.content__list.grid.infinite_scroll.cards > div')
			main.each( function() {
				const idVid = 'https://brainans.com'+$(this).find('a').attr('href')
				const upload_at = $(this).find('span').text()
				const desc = $(this).find('p').text()
				const user = $('#user-page > div.user.container > div > div.col-md-4.col-8.my-3 > div > a > h1').text()
				const username = $('#user-page > div.user.container > div > div.col-md-4.col-8.my-3 > div > h4').text()
				const video_count = $('#user-page > div.user.container > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(1) > strong').text()
				const followers = $('#user-page > div.user.container > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(2) > strong').text()
				const following = $('#user-page > div.user.container > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(3) > strong').text()
				const likes = $('#user-page > div.user.container > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(4) > strong').text()
				const bio = $('#user-page > div.user.container > div > div.col-md-5.my-3 > div').text()
				const thumb = $('#user-page > div.user.container > div > div.col-md-3.col-4.my-3 > div').attr('style').replace("background-image: url('", '').replace("');", '') 
				result.push({ idVid, upload_at, desc })
				const hasil = {
					user: user,
					username: username,
					video_count: video_count,
					followers: followers,
					following: following,
					likes: likes,
					bio: bio,
					thumb: thumb,
					video: result
				}
				resolve(hasil)
			})
		}).catch(reject)
	})
}
function getVid (url) {
	return new Promise((resolve, reject) => {
		axios.get(url).then(res => {
			const $ = cheerio.load(res.data)
			const obj = {}
			obj.link = $('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.main__image-container > div > video').attr('src')
			obj.like = $('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.content__btns.d-flex > div:nth-child(1) > span').text()
			obj.comment = $('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.content__btns.d-flex > div:nth-child(2) > span').text()
			obj.share = $('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.content__btns.d-flex > div:nth-child(3) > span').text()
			resolve(obj)
		}).catch(reject)
	})
}
async function randomTiktok(query) {
	return new Promise( async(resolve, reject) => {
		await axios.get('https://brainans.com/search?query='+query).then(response => {
			const $ = cheerio.load(response.data)
			const User = $('#search-container > div:nth-child(1) > div.content__text > a').attr('href')
			axios.get('https://brainans.com/'+User).then(respon => {
				const soup = cheerio.load(respon.data)
				const Vidlink = []
				const main = soup('#videos_container > div > div.content__list.grid.infinite_scroll.cards > div > div > a')
				main.each( function() {
					const Vlink = 'https://brainans.com/'+soup(this).attr('href')
					Vidlink.push(Vlink)
				})
				pickrandom(Vidlink).then(res => {
				axios.get(res).then(resp => {
					const ch = cheerio.load(resp.data)
					const result = {
						username: ch('#card-page > div > div.row > div > div > div > div > div.main__user-desc.align-self-center.ml-2 > a').text(),
						caption: ch('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.main__list').text(),
						likes: ch('#card-page > div > div.row > div > div > div.main__info.mb-4 > div > div:nth-child(1) > span').text(),
						comment: ch('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.content__btns.d-flex > div:nth-child(2) > span').text(),
						share: ch('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.content__btns.d-flex > div:nth-child(3) > span').text(),
						video: ch('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.main__image-container > div > video').attr('src')
					}
					resolve(result)
				})		
				}).catch(resolve)
			}).catch(resolve)
		}).catch(resolve)
	})
}
async function tiktokHastag(query) {
	return new Promise((resolve, reject) => {
		axios.get('https://tiktokder.com/hashtag/'+query).then(resp => {
			const $ = cheerio.load(resp.data)
			const Vidlink = []
			const main = $('body > div.videos-grid > div > a')
			main.each(function() {
				const URL = 'https://tiktokder.com'+$(this).attr('href')
				Vidlink.push(URL)
			})
			pickrandom(Vidlink).then(res => {
				axios.get(res).then(respon => {
					const ch = cheerio.load(respon.data)
					resolve({
						url: ch('#tiktok-video-result > div > div.download-buttons > div > a').attr('href').replace('https://savetiknowm.org/?tiktok_url=', ''),
						usernameNick: ch('#tiktok-video-result > div > div.result > div:nth-child(2) > div.profile > a.user-nickname').text(),
						username: ch('#tiktok-video-result > div > div.result > div:nth-child(2) > div.profile > a.username').text(),
						description: ch('#tiktok-video-result > div > div.result > div:nth-child(2) > p').text(),
						nowm: 'https://tyz-api.herokuapp.com/downloader/tiktoknowm?link='+ch('#tiktok-video-result > div > div.download-buttons > div > a').attr('href').replace('https://savetiknowm.org/?tiktok_url=', ''),
						original: ch('#tiktok-video-result > div > div.download-buttons > a').attr('href')
					})
				})
			})
		}).catch(reject)
	})
}
export default { TiktokDownloader, musicaldown, ttUser, randomTiktok, tiktokHastag };
