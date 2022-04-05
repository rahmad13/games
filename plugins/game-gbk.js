let handler = async (m, { text }) => {
    let user = global.db.data.users[m.sender]
    m.reply(`${conn.getName(m.sender)} Sedang Memulai Game
  `)
}
handler.help = ['gbk [name]']
handler.tags = ['main']
handler.command = /^gbk$/i

export default handler
//Hmm
