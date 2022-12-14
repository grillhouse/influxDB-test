const {InfluxDB, Point} = require('@influxdata/influxdb-client')

const url = 'https://europe-west1-1.gcp.cloud2.influxdata.com'

const token = "nW9s_VqKP3hxVJRhfOr7Wnjz7f-7Kr2PCLWmZURmNIHK3AlB9ct-jAzVUBYAPKcdh31uGZcvFPejh8OC4McLLg=="

const client = new InfluxDB({url, token})

// Write data
let org = `robin.linuxos@gmail.com`
let queryClient = client.getQueryApi(org)

function getData(dataName, range){

    let fluxQuery = `from(bucket: "bbq-temps")
    |> range(start: ${range.toString()})
    |> filter(fn: (r) => r._measurement == ${dataName.toString()})`

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

let temp1 = "temp1"
let queryLength = "-10m"

getData(temp1, queryLength)

