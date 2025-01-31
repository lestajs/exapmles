let port
let writer
let reader

const connect = async () => {
	if (port) return
	port = await navigator.serial.requestPort()
	await port.open({ baudRate: 9600 })
	writer = port.writable.getWriter()
	reader = port.readable.getReader()
}

const send = async (command) => {
	// sending a packet
	command.length = 40
	const fullCommand = command.fill(0, 1, 40)
	const packet = new Uint8Array(fullCommand)
	await writer.write(packet)
	console.log(packet)
	// response
	const { value, done } = await reader.read()
	const newValue = value.splice(0, 2)
	return !done? newValue : console.error('|reader| has been canceled.')
}

async function close() {
	writer?.releaseLock()
	reader?.releaseLock()
	if (port) {
		await port.close()
		port = null
	}
}


export default { connect, send, close }