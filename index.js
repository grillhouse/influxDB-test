//repl.repl.ignoreUndefined=true

const {InfluxDB, Point} = require('@influxdata/influxdb-client')

const token = "1NQJpwTYvCeUVn0Axuoo21LX3gmq3Ln3lvQNHPDHMo0HOkjL2VIIm_DXRuIlPg9o_B1JPd4SMsVowE-CpjlQIA==" 
const url = 'https://europe-west1-1.gcp.cloud2.influxdata.com'

const client = new InfluxDB({url, token})

// Write data

let org = `robin.linuxos@gmail.com`
let bucket = `bbq-temps`

let writeClient = client.getWriteApi(org, bucket, 'ns')

for (let i = 0; i < 5; i++) {
  let point = new Point('measurement1')
    .tag('tagname1', 'tagvalue1')
    .intField('field1', i)

  void setTimeout(() => {
    writeClient.writePoint(point)
  }, i * 1000) // separate points by 1 second

  void setTimeout(() => {
    writeClient.flush()
  }, 5000)
}

// Simple query
let queryClient = client.getQueryApi(org)

let fluxQuery = `from(bucket: "bbq-temps")
 |> range(start: -10m)
 |> filter(fn: (r) => r._measurement == "measurement1")`

queryClient.queryRows(fluxQuery, {
  next: (row, tableMeta) => {
    const tableObject = tableMeta.toObject(row)
    console.log(tableObject)
  },
  error: (error) => {
    console.error('\nError', error)
  },
  complete: () => {
    console.log('\nSuccess')
  },
})

// aggregate querry 

queryClient = client.getQueryApi(org)
fluxQuery = `from(bucket: "bbq-temps")
 |> range(start: -10m)
 |> filter(fn: (r) => r._measurement == "measurement1")
 |> mean()`

queryClient.queryRows(fluxQuery, {
  next: (row, tableMeta) => {
    const tableObject = tableMeta.toObject(row)
    console.log(tableObject)
  },
  error: (error) => {
    console.error('\nError', error)
  },
  complete: () => {
    console.log('\nSuccess')
  },
})