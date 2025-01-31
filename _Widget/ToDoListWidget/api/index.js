import commands from '../../fake_divace'
import connector from './connector'
import { bytesToBn, bufToBn, bnToB64, bytesToBase64, bytesToDateTime, bytesToFloat } from './converter'

export default {
	async connect(checked) {
		if (checked) await connector.connect()
		// await connector.send([0])
		const versionBytes = commands[3]()
		const recordsCount = bytesToBn(commands[5]())
		const data = {
			series_number: bytesToBn(commands[2]()),
			version:`${versionBytes.splice(0,1)}.${versionBytes.splice(0,1)}`,
			uts: 4,
			memory: 50,
			battery: bytesToBn(commands[4]()),
			total: recordsCount,
			records: this.getRecords(recordsCount)
		}
		return data
	},
	async disconnect() {
		await connector.close()
	},
	clearRecords() {
		console.log('clearRecords')
	},
	getRecords(recordsCount) {
		const records = []
		for (let index = 0; index < recordsCount; index++) {
			const readingsCount = bytesToBn(commands[29](index))
			const readingsBytes = commands[41](index)
			const depth = bytesToBn(commands[21](index))
			const coordinatesBytes = commands[29](index)
			const N = bytesToBn(coordinatesBytes.splice(0,2))
			const E = bytesToBn(coordinatesBytes.splice(0,2))
			const start_datetime = bytesToDateTime(commands[22]())
			const end_datetime = bytesToDateTime(commands[23]())
			const survey = commands[26](index)
			const survey_method = survey.splice(0,1)
			const intervals = bytesToBn(survey)
			const record = {
				name: btoa(String.fromCharCode(...new Uint8Array(commands[25]()))),
				total: readingsCount,
				depth,
				start_datetime,
				end_datetime,
				survey_method,
				intervals,
				N,
				E,
				readings: this.readingsRecord(readingsBytes)
			}
			this.readingsRecord(readingsBytes)
			records.push(record)
		}
		return records
	},
	readingsRecord(readingsBytes) {
		const readings = readingsBytes.reduce((acc, _, i) => {
			if (i % 4 === 0) {
				acc.push({
					temp: bytesToFloat([readingsBytes[i], readingsBytes[i + 1]]),
					pressure: bytesToFloat([readingsBytes[i + 2], readingsBytes[i + 3]]),
					datetime: bytesToDateTime(commands[22]())
				})
			}
			return acc
		}, [])
		return readings
	},
	async readingsRealtime(checked) { //
		const temp = bytesToFloat(checked ? await connector.send([6]) : commands[6]())
		const pressure = bytesToFloat(checked ? await connector.send([7]) : commands[7]())
		return { temp, pressure }
	},
	stop() {
	
	}
}