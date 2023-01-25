
# GPU Scrapper

This is a simple GPU Scrapper that gets data from solotodo.com and 
submited to  a mongodb instance.



## Run Locally

Clone the project

```bash
  git clone https://github.com/BrainerVirus/node-espress-ts-gpu-scraper.git
```

Go to the project directory

```bash
  cd node-espress-ts-gpu-scraper
```

Install dependencies

```bash
  npm i
```

Start the server in dev mode

```bash
  npm run nodemon
```

_**Note** : To run dev script you will need to make  a **nodemon.json** file just like
the example below_

```
{
  "ignore": [".git", "node_modules", "dist", "build"],
  "watch": ["./src"],
  "exec": "npm run dev",
  "ext": "ts"
}
```



Start the server

```bash
  npm run start
```

## Features

- Data scrapping
- Save data retrived
- Show all the data retrived
- Manual data insertion


## API Reference

#### GPU model
```
title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  memorySize: {
    type: String,
    required: true,
  },
  coreFrecuency: {
    type: String,
    required: true,
  },
  memoryFrecuency: {
    type: String,
    required: true,
  },
  bus: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});
```

#### Get all items

```http
  GET /scrapper/
```

#### Response

```
{ message: `You have scraped ${totalDataScrapred} GPUs registries` }
```

#### Error Messages

| code | description | 
| :-------- | :------- |
| `1` | `db connection has failed` |
| `2` | `db disconnection has failed` |
| `3` | `Scrapper internal error` |
| `4` | `GPU regestry insertion has failed` |

#### Get all items

```http
  GET /gpu/list/
```

#### Response
```
{
    "GPUs": [
        {
            "_id": string,
            "title": string,
            "price": string,
            "img": string,
            "name": string,
            "memorySize": string,
            "coreFrecuency": string,
            "memoryFrecuency": string,
            "bus": string,
            "date": string",
            "time": string,
        },
    ]
}
```
#### Error Messages

| code | description | 
| :-------- | :------- |
| `1` | `db connection has failed` |
| `2` | `db disconnection has failed` |
| `3` | `Internal error` |
| `4` | `Cannot find any gpus entries in the db` |

#### Create item

```http
  POST /gpu/create/
```
#### Response

```
{ message: "GPU insertion succesfull" }
```

#### Error Messages

| code | description |
| :-------- | :------- |
| `1` | `db connection has failed` |
| `2` | `db disconnection has failed` |
| `3` | `Internal error` |
| `4` | `GPU regestry insertion has failed` |






## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`URL`

`MONGO_URI `


## License

[MIT](https://choosealicense.com/licenses/mit/)

