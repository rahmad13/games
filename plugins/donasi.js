let handler = async (m, { conn, command, usedPrefix }) => {
conn.sendHydrated(m.chat, `
╭─「 Donasi • Pulsa 」
│ • Telkomsel [082328303332]
╰────

╭─「 Donasi • Non Pulsa 」
│ • Ovo [082328303332]
│ • Paypal [rizkynursanto48@gmail.com]
│ • Dana [082328303332]
│ • Saweria []
╰────

Seiklasnya aja:>
`, author, null, `https://rizxyu.github.io/Template-Aboutme/`, `Website`, null, null, [[null, null]], m)
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

export default handler
