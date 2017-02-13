## Instructions

To run the precompiled code, simply enter the `dist` folder and start a web server (in my example I am using Python).

```
cd dist
python -m SimpleHTTPServer 8000
open http://localhost:8000
```


To build the development environment (requires nodejs and npm)

```
npm i
npm start
open http://localhost:3000
```

I am using webpack with hot-reload. Any changes to the source code will be reflected directly into the browser without having to reload the page.