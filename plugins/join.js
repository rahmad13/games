let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i

let handler = async (m, { conn, text, isOwner }) => {
    let [_, code, expired] = text.match(linkRegex) || []
    if (!code) throw 'Link invalid'
    let res = await conn.groupAcceptInvite(code)
    expired = Math.floor(Math.min(999, Math.max(1, isOwner ? isNumber(expired) ? parseInt(expired) : 0 : 3)))
    m.reply(`Berhasil join grup ${res}${expired ? ` selama ${expired} hari` : ''}`)
    let chats = global.db.data.chats[res]
    if (!chats) chats = global.db.data.chats[res] = {}
    if (expired) chats.expired = +new Date() + expired * 1000 * 60 * 60 * 24

    let caption = `*${conn.getName(conn.user.jid)}* adalah bot whatsapp yang dibangun dengan Nodejs, *${conn.user.name}* diundang oleh @${m.sender.split`@`[0]}
    
ketik *${usedPrefix}menu* untuk melihat daftar perintah`

    conn.sendHydrated(res, caption, author, "https://images6.alphacoders.com/106/1061828.png", "https://chat.whatsapp.com/KamZimB6d8R3c2C4PepN6Q", "GC Whatsapp", null, null, [["Menu", `/menu`],
["Owner", `/owner`]], m, { mentions: conn.parseMention(caption)})
}
handler.help = ['join <chat.whatsapp.com>']
handler.tags = ['premium']

handler.command = /^join$/i

export default handler

const isNumber = (x) => (x = parseInt(x), typeof x === 'number' && !isNaN(x))
