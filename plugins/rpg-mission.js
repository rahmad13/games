  let confirm = {}

   //Misi json
  var misi = [
    {
      "index": 1,
      "rank": "S++",
      "misii": "Menaklukan Raja Iblis",
      "exp": 97838,
      "crystal": 37
    },
    {
      "index": 2,
      "rank": "F",
      "misii": "Mencari Crystal",
      "exp": 1072,
      "crystal": 3
    },
    {
      "index": 3,
      "rank": "S+",
      "misii": "Taklukan naga Everest",
      "exp": 79938,
      "crystal": 24
    },
    {
      "index": 4,
      "rank": "B+",
      "misii": "Memusnahkan Desa Goblin",
       "exp": 5647,
      "crystal": 9
    },
    {
      "index": 5,
      "rank": "C+",
      "misii": "Menyelesaikan Dungeon Berisi Monster Laba laba",
      "exp": 4837,
      "crystal": 7
    }
  ]

  //var =???
  //Class
  async function handler(m, { conn, args, usedPrefix, command }) => {
  if (m.sender in confirm) throw 'Kamu masih melakukan misi, tunggu sampai selesai!!'

     try {
  let json = misi[Math.floor(Math.random() * misi.length)]//get misi
  const cooldown = 300000 //coldown timer second
  let user = global.db.data.users[m.sender] //Get db user

  if(typeof user.lastmisi != "number") global.db.data.users[m.sender].lastmisi = 0
  if(typeof user.exp != "number") global.db.data.users[m.sender].exp = 0
  if(typeof user.crystal != "number") global.db.data.users[m.sender].crystal = 0

  let timers = (cooldown - (new Date - user.lastmisi))
  if(new Date - user.lastmisi <= cooldown) return m.reply(`wait for *🕐${clockString(timers)}*`)
  if(!user.skill) return m.reply("Anda belum mempunyai skill")

    if (!(m.sender in confirm)) {
     confirm[m.sender] = {
        sender: m.sender,
        timeout: setTimeout(() => (m.reply('timed out'), delete confirm[m.sender]), 60000)
     }
  //Caption
  let caption = `*A MISSION HAS BEEN GIVEN TO THE HUNTER!*
*🥇 RANK:* ${json.rank}
*📰 MISI:* ${json.misii}
*🎁 GIFT:* Exp ${json.exp} & Crystal Mana ${json.crystal}

<!>UNREALESE FEATURE<!>

- Party <Room>
- Solo (solo misi)
- Cancel 
`
  return conn.sendButton(m.chat, caption, author, null, [['Create Party', 'cparty'], ['Solo','solo'], ['Cancel','cancel']], m)//SendMessage
  }
    } catch (e) {
        console.error(e)
        if (m.sender in confirm) {
            let { timeout } = confirm[m.sender]
            clearTimeout(timeout)
            delete confirm[m.sender]
            m.reply('Rejected')
        }
    }
}

handler.before = async m => {
    if (!(m.sender in confirm)) return
    if (m.isBaileys) return

  let json = misi[Math.floor(Math.random() * misi.length)]//get misi
  const cooldown = 300000 //coldown timer second
  let user = global.db.data.users[m.sender] //Get db user
  let { timeout } = confirm[m.sender]
   
  let txt = (m.msg && m.msg.selectedDisplayText ? m.msg.selectedDisplayText : m.text ? m.text : '').toLowerCase()
 
  if(typeof user.lastmisi != "number") global.db.data.users[m.sender].lastmisi = 0
  if(typeof user.exp != "number") global.db.data.users[m.sender].exp = 0
  if(typeof user.crystal != "number") global.db.data.users[m.sender].crystal = 0

  let timers = (cooldown - (new Date - user.lastmisi))
  if(new Date - user.lastmisi <= cooldown) return m.reply(`Wait for *🕐${clockString(timers)}*`)
  if(!user.skill) return m.reply("Anda belum mempunyai skill")

  let randomaku = `${Math.floor(Math.random() * 101)}`.trim()
  let randomkamu = `${Math.floor(Math.random() * 81)}`.trim() //hehe Biar Susah Menang :v
  let Aku = (randomaku * 1)
  let Kamu = (randomkamu * 1)
  let aud = ["Mana Habis", "Stamina Habis", "Diserang Monster", "Dibokong Monster"]
  let aui = aud[Math.floor(Math.random() * aud.length)]
    
  //Gacha systemBeta
try {
        if (/^solo)?$/i.test(txt)) {
    if(Aku > Kamu) {
    var cpt = `Berhasil Menyelesaikan misi ${json.misii}`
    m.reply(cpt)
    user.exp += json.exp
    user.crystal += json.crystal
  } else if(Kamu < Aku) {
    var flr = `Gagal Menyelesaikan Misi ${json.misii} Dikarenakan ${aui} `
     m.reply(flr)
  } else {
    var cpt = `Berhasil Menyelesaikan misi ${json.misii}`
    m.reply(cpt)
    user.exp += json.exp
    user.crystal += json.crystal
  }
            user.lastmisi = new Date * 1

            clearTimeout(timeout)
            delete confirm[m.sender]
            return !0
       
      } else if (/^cancel?$/i.test(txt)) {
            clearTimeout(timeout)
            delete confirm[m.sender]
            m.reply('Rejected')
            return !0
             }

      } catch (e) {
        clearTimeout(timeout)
        delete confirm[m.sender]
        //if (moneyDulu > (user.money * 1)) user.money = moneyDulu * 1
        m.reply('Error saat pengambilan misi (Rejected)')
        return !0
    } finally {
        clearTimeout(timeout)
        delete confirm[m.sender]
        return !0
    }
}

handler.help = ['mission']
handler.tags = ['rpg']
handler.command = /^(m(isi)?(ission)?)$/i

export default handler

/**
 * Detect if thats number
 * @param {Number} x 
 * @returns Boolean
 */
function number(x = 0) {
    x = parseInt(x)
    return !isNaN(x) && typeof x == 'number'
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(":")
}
