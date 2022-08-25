const {InfluxDB, Point} = require('@influxdata/influxdb-client')

const token = process.env.INFLUXDB_TOKEN_NODE
const url = 'https://europe-west1-1.gcp.cloud2.influxdata.com'

const client = "1NQJpwTYvCeUVn0Axuoo21LX3gmq3Ln3lvQNHPDHMo0HOkjL2VIIm_DXRuIlPg9o_B1JPd4SMsVowE-CpjlQIA=="

// Write data

let org = `robin.linuxos@gmail.com`
let bucket = `nodeBucket`

let writeClient = client.getWriteApi(org, bucket, 'ns')


function getData(dataName, range){
    
    let queryClient = client.getQueryApi(org)
    let fluxQuery = `from(bucket: "nodeBucket")
    |> range(start: ${range})
    |> filter(fn: (r) => r._measurement == ${dataName})`

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

}

getData("temp1", "-10m")

