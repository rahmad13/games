/*//////////////////////////////////

Cretor : Hairul Lana Recode: Rizxyu(SXZY)
https://github.com/hairullana 

/*////////////////////////////////*/

let handler = async (m, { conn, text, participants, groupMetadata }) => {
	if(isNaN(text)) {
  	var number = text.split`@`[1]
  } else if(!isNaN(text)) {
  	var number = text
  }

  if(!text && !m.quoted) return conn.reply(m.chat, `Berikan nomor, tag atau balas pesan target.`, m)
  
  if(isNaN(number)) return conn.reply(m.chat, `Nomor yang anda masukan tidak salah!`, m)
  if(number.length > 15) return conn.reply(m.chat, `Format salah!`, m)
  try {
		if(text) {
			var user = number + '@s.whatsapp.net'
		} else if(m.quoted.sender) {
			var user = m.quoted.sender
		} else if(mentions) {
  		  var user = number + '@s.whatsapp.net'
			}  
		} catch (e) {
  } finally {
    let users = m.isGroup ? participants.find(u => u.jid == user) : {}
    if(!users) return conn.reply(m.chat, `Target atau Nomor tidak ditemukan, mungkin sudah keluar atau bukan anggota grup ini.`, m)
    if(user === m.sender) return conn.reply(m.chat, `Tidak bisa berpacaran dengan diri sendiri!`, m)
    if(user === conn.user.jid) return conn.reply(m.chat, `Tidak bisa berpacaran dengan saya t_t`, m)
    
    if(global.db.data.users[user].pasangan != m.sender){
      m.reply(`Maaf @${user.split('@')[0]} tidak sedang menembak anda`, m)
    }else{
      global.db.data.users[m.sender].pasangan = user
      m.reply(`Selamat anda resmi berpacaran dengan @${user.split('@')[0]}\n\nSemoga langgeng dan bahagia selalu @${user.split('@')[0]} 💓 @${m.sender.split('@')[0]} 🥳🥳🥳`,m)
    }
	}	
}
handler.help = ['terima *@tag*']
handler.tags = ['jadian']
handler.command = /^(terima)$/i
handler.group = true
handler.limit = false
handler.fail = null
export default handler
