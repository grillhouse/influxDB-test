import influxdb_client
import os
import time
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

token = os.environ.get("INFLUXDB_TOKEN")
org = "robin.linuxos@gmail.com"
url = "https://europe-west1-1.gcp.cloud2.influxdata.com"

client = influxdb_client.InfluxDBClient(url=url, token=token, org=org)


# this is the bucket setup in influxDB (will be done programatically in future)
bucket = "bbq-temps"


write_api = client.write_api(write_options=SYNCHRONOUS)


def writeData(temp1, temp2, temp3, tempControl, fanSpeed):
    point1 = (
        Point("temp1")
        .tag("tagname_temp1", "tagvalue_temp1")
        .field("field1", temp1)
    )
    write_api.write(bucket=bucket, org="robin.linuxos@gmail.com", record=point1)
    point2 = (
        Point("temp2")
        .tag("tagname_temp2", "tagvalue_temp2")
        .field("field2", temp2)
    )
    write_api.write(bucket=bucket, org="robin.linuxos@gmail.com", record=point2)
    point3 = (
        Point("temp3")
        .tag("tagname_temp3", "tagvalue_temp3")
        .field("field3", temp3)
    )
    write_api.write(bucket=bucket, org="robin.linuxos@gmail.com", record=point3)
    pointC = (
        Point("tempC")
        .tag("tagname_tempC", "tagvalue_tempC")
        .field("fieldC", tempControl)
    )
    write_api.write(bucket=bucket, org="robin.linuxos@gmail.com", record=pointC)
    pointF = (
        Point("fanSpeed")
        .tag("tagname_fanSpeed", "tagvalue_fanSpeed")
        .field("fieldF", fanSpeed)
    )
    write_api.write(bucket=bucket, org="robin.linuxos@gmail.com", record=pointF)

writeData(1,2,3,4,50)
