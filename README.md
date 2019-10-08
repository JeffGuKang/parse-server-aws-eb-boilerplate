
## Using Parse Dashboard

Write your aws server address or domain address in `serverURL`.

config/default.json

	```
	"dashboard-serverURL": "http://localhost:1337/parse"
```

parse-dashboard-config.json

```
{
  "apps": [
    {
      "serverURL": "http://localhost:1337/parse",
      "appId": "YOUR_PARSE_APP_ID",
      "masterKey": "YOUR_MASTER_KEY",
      "appName": "YOUR_APP_NAME"
    }
  ]
}
```
