import { areJidsSameUser } from '@adiwajshing/baileys'

let handler = async (m, { conn, usedPrefix, text, participants, groupMetadata}) => {
	if(isNaN(text)) {
  	var number = text.split`@`[1]
  } else if(!isNaN(text)) {
  	var number = text
  }

  if(!text && !m.quoted) return conn.reply(m.chat, `Masukan nomor, tag target atau balas pesan target`, m)
  
  if(isNaN(number)) return conn.reply(m.chat, `_*Nomor tidak valid.*_`, m)
  if(number.length > 15) return conn.reply(m.chat, `*_Format Tidak Valid.*_`, m)
  try {
		if(text) {
			var user = number + '@s.whatsapp.net'
		} else if(m.quoted.sender) {
			var user = m.quoted.sender
		} else if(m.mentionedJid) {
  		  var user = number + '@s.whatsapp.net'
			}  
		} catch (e) {
  } finally {
    let users = m.isGroup ? participants.find(v => areJidsSameUser(v.jid == user)) : {}
    if(!users) return conn.reply(m.chat, `*_Target atau Nomor tidak ditemukan, mungkin sudah keluar atau bukan anggota grup ini.*_`, m)
    if(user === m.sender) return conn.reply(m.chat, `_*Tidak bisa berpacaran dengan diri sendiri.*_`, m)
    if(user === conn.user.jid) return conn.reply(m.chat, `_*Tidak bisa berpacaran dengan saya. :')*_`, m)

    if (typeof global.db.data.users[user] == "undefined") return m.reply("_*Orang yang anda tag tidak terdaftar di dalam database.*_")
    var pacar = global.db.data.users[user].pasangan
    var spac = global.db.data.users[m.sender].pasangan
    if(global.db.data.users[m.sender].pasangan != "" && global.db.data.users[global.db.data.users[m.sender].pasangan].pasangan == m.sender && global.db.data.users[m.sender].pasangan != user){
      m.reply(`Kamu sudah berpacaran dengan @${global.db.data.users[m.sender].pasangan.split('@')[0]}\n\nSilahkan putus dulu (ketik .putus untuk memutuskan hubungan) untuk menembak @${user.split('@')[0]}\n\nBtw yang setia dikit banget!`)
    }else if(global.db.data.users[user].pasangan != ""){
      if (pacar == user){
        if (m.sender == pacar && global.db.data.users[m.sender].pasangan == user) return m.reply(`Anda sudah berpacaran dengan ${spac.split('@')[0]}`)
        m.reply(`Maaf, @${user.split('@')[0]} sudah berpacaran dengan @${pacar.split('@')[0]}\nSilahkan cari pasangan lain!`)
      }else{
        global.db.data.users[m.sender].pasangan = user
        m.reply(`Anda baru saja mengajak @${user.split('@')[0]} berpacaran\n\nSilahkan menunggu jawaban darinya!\n\nKetik *${usedPrefix}terima @user* untuk menerima\n*${usedPrefix}tolak @user untuk menolak*`)
      }
    }else if (global.db.data.users[user].pasangan == m.sender){
      global.db.data.users[m.sender].pasangan = user
      m.reply(`Selamat anda resmi berpacaran dengan @${user.split('@')[0]}\n\nSemoga langgeng dan bahagia selalu 🥳🥳🥳`)
    }else {
      global.db.data.users[m.sender].pasangan = user
      m.reply(`Kamu baru saja mengajak @${user.split('@')[0]} berpacaran\n\nSilahkan menunggu jawaban darinya!\n\nKetik *${usedPrefix}terima @user* untuk menerima\n*${usedPrefix}tolak @user untuk menolak*`)
    }
	}	
}
handler.help = ['tembak *@tag*']
handler.tags = ['jadian']
handler.command = /^(tembak)$/i
handler.group = true

export default handler