const {InfluxDB, Point} = require('@influxdata/influxdb-client')

const token = process.env.INFLUXDB_TOKEN_NODE
const url = 'https://europe-west1-1.gcp.cloud2.influxdata.com'

const client = "nW9s_VqKP3hxVJRhfOr7Wnjz7f-7Kr2PCLWmZURmNIHK3AlB9ct-jAzVUBYAPKcdh31uGZcvFPejh8OC4McLLg=="

// Write data


function getData(dataName, range){
    
    let queryClient = client.getQueryApi(org)
    let fluxQuery = `from(bucket: "bbq-temps")
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

