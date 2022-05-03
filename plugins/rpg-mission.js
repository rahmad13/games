let handler = async (m, { conn, args, usedPrefix, command }) => {

// Misi Functiion/class
var misi = [
{
"index": 1
"rank": "S++",
"misii": "Menaklukan Raja Iblis",
"exp": "97838",
"crystal": "37"
},
{
"index": 2
"rank": "F",
"misi": "Mencari Crystal",
"exp": "1072",
"crystal": "3"
},
{
"index": 3,
"rank": "S+",
"misii": "Taklukan naga Everest"
"exp": "79938",
"crystal": "24"
},
{ 
"index": 4,
"rank": "B+",
"misii": "Memusnahkan Desa Goblin",
"exp": "5647",
"crystal": "9"
}, 
{
"index": 5,
"rank": "C+",
"misii": "Menyelesaikan Dungeon Berisi Monster Laba laba",
"exp": "4837",
"crystal": "7"
}
}
]

//var =???
//Class
let json = misi[Math.floor(Math.random() * misi.length)]//get misi
const cooldown = 300000 //coldown timer second
let user = global.db.data.users[m.sender] //Get db user
let timers = (cooldown - (new Date - user.lastmisi))
if ( new Date - user.lastmisi <= cooldown) throw `*🕐${timers.toTimeString()}`
if (user.skill == "") throw `Anda belum mempunyai skill`

//Caption
let caption = `*A MISSION HAS BEEN GIVEN TO THE HUNTER!*
*🥇 RANK:* ${json.rank}
*📰 MISI:* ${json.misii}
*🎁 GIFT:* Exp${json.exp} Crystal Mana ${json.crystal}

<!>UNREALESE FEATURE<!>
`
    m.reply(caption)//SendMessage
    
    
    //Random
    let randomaku = `${Math.floor(Math.random() * 101)}`.trim()
    let randomkamu = `${Math.floor(Math.random() * 81)}`.trim() //hehe Biar Susah Menang :v
    let Aku = (randomaku * 1)
    let Kamu = (randomkamu * 1)
     let aud = ["Mana Habis", "Stamina Habis", "Diserang Monster", "Dibokong Monster"]
     
     let aui = aud[Math.floor(Math.random() * aud.length)]


//Gacha system
if (Aku > Kamu) {
  var cpt = `Berhasil Menyelesaikan misi ${json.misii}`
m.reply(cpt)
user.exp += json.exp
user.crystal += json.crystal
   } else if (Kamu > Aku) {
  var flr = `Gagal Menyelesaikan Misi ${json.misii} Dikarenakan ${aui} `
 m.reply(flr)
   } else {
var cpt = `Berhasil Menyelesaikan misi ${json.misii}`
 m.reply(cpt)
user.exp += json.exp
user.crystal += json.crystal
   }
  user.lastmisi = new Date * 1
}

handler.help = ['mission']
handler.tags = ['rpg']
handler.command = /^(m(isi)?(ission)?)$/i
export defaulr handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}