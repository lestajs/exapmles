function bytesToBn(bytes) {
	if (!Array.isArray(bytes) || bytes.length === 0) {
		throw new Error("Входные данные должны быть непустым массивом.");
	}
	if (bytes.some(byte => byte < 0 || byte > 255)) {
		throw new Error("Каждый байт должен быть в диапазоне от 0 до 255.");
	}
	
	let result = 0n; // Начинаем с BigInt, равного нулю
	for (let i = 0; i < bytes.length; i++) {
		result = (result << 8n) | BigInt(bytes[i]);
	}
	return result;
}

function BnToBytes(bigIntNumber, numBytes) {
	if (typeof bigIntNumber !== 'bigint' || numBytes <=0 ) {
		throw new Error("Некорректные входные данные");
	}
	
	let bytes = [];
	for (let i = 0; i < numBytes; i++) {
		bytes.unshift(Number(bigIntNumber & 0xFFn));
		bigIntNumber >>= 8n;
	}
	return bytes;
}
function b64ToBn(b64) {
	const bin = atob(b64)
	const hex = []
	
	bin.split('').forEach(function (ch) {
		let h = ch.charCodeAt(0).toString(16)
		if (h.length % 2) { h = '0' + h; }
		hex.push(h)
	})
	return BigInt('0x' + hex.join(''))
}
function bnToB64(bn) {
	let hex = BigInt(bn).toString(16)
	if (hex.length % 2) { hex = '0' + hex }
	
	const bin = []
	let i = 0
	let d;
	let b
	while (i < hex.length) {
		d = parseInt(hex.slice(i, i + 2), 16)
		b = String.fromCharCode(d)
		bin.push(b)
		i += 2
	}
	
	return btoa(bin.join(''));
}

function bnToBuf(bn) {
	var hex = BigInt(bn).toString(16);
	if (hex.length % 2) { hex = '0' + hex; }
	
	var len = hex.length / 2;
	var u8 = new Uint8Array(len);
	
	var i = 0;
	var j = 0;
	while (i < len) {
		u8[i] = parseInt(hex.slice(j, j+2), 16);
		i += 1;
		j += 2;
	}
	
	return u8;
}

function bufToBn(buf) {
	var hex = [];
	const u8 = Uint8Array.from(buf);
	
	u8.forEach(function (i) {
		var h = i.toString(16);
		if (h.length % 2) { h = '0' + h; }
		hex.push(h);
	});
	
	return BigInt('0x' + hex.join(''));
}

function bytesToBase64(bytes) {
	const uint8Array = new Uint8Array(bytes)
	return btoa(String.fromCharCode.apply(null, uint8Array))
}
function bytesToDateTime(bytes) {
	let num = 0
	for(let i = 0; i < bytes.length; i++) {
		num = (num << 8) + bytes[i]
	}
	return new Date(num * 1000)
}

function bytesToFloat(bytes) {
	return parseInt(bytesToBn(bytes)) / 100
}

export { bytesToBn, BnToBytes, b64ToBn, bnToB64, bufToBn, bytesToBase64, bytesToDateTime, bytesToFloat}

// export default {
// 	toNumber: (bytes) => combineBytes(bytes),
// 	toRecordName: () =>
// 	6: () => randomBitArray(16),// get current temp
// 	7: () => randomBitArray(16), // get current pressure
// 	20: (index) => randomBitArray(32 + 32), // get coordinates
// 	21: (index) => randomBitArray(16), // get depth
// 	22: (index) => randomBitArray(32), // get start time
// 	23: (index) => randomBitArray(32), // get stop time
// 	24: (index) => randomBitArray(16), // get delayed start time
// 	25: (index) => randomBitArray(128), // get name record
// 	26: (index) => randomBitArray(8 + 128), // get record polling method
// 	40: (data) => randomInt(0, 1),
// 	41: (index) => randomBitArray((16 + 16) * 10), // get record polling method
// }