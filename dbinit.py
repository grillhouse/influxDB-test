import influxdb_client, os, time
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

token = os.environ.get("INFLUXDB_TOKEN")
org = "robin.linuxos@gmail.com"
url = "https://europe-west1-1.gcp.cloud2.influxdata.com"

client = influxdb_client.InfluxDBClient(url=url, token=token, org=org)


bucket="bucket"         #this is the bucket setup in influxDB (will be done programatically in future)

write_api = client.write_api(write_options=SYNCHRONOUS)
   
for value in range(5):
  point = (
    Point("measurement1")
    .tag("tagname1", "tagvalue1")
    .field("field1", value)
  )
  write_api.write(bucket=bucket, org="robin.linuxos@gmail.com", record=point)
  time.sleep(1) # separate points by 1 second

query_api = client.query_api()

query = """from(bucket: "bucket")
 |> range(start: -10m)
 |> filter(fn: (r) => r._measurement == "measurement1")"""
tables = query_api.query(query, org="robin.linuxos@gmail.com")

for table in tables:
  for record in table.records:
    print(record)