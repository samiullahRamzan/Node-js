const fs = require('fs');
const http = require('http');
const url = require('url'); // change all word if one is change...ctrl+d
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');
// files
// blocking ,synchronous
// const textinput=fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textinput);

// const textoutput=`The text is that: ${textinput} and created on the time of \n ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textoutput);

// non-blocking synchronos
// fs.readFile('./txt/start.txt','utf-8',(err,data1)=>{
//     console.log(data1);
//     fs.readFile('./txt/input.txt','utf-8',(err,data2)=>{
//         console.log(data2);
//         fs.readFile('./txt/append.txt','utf-8',(err,data3)=>{
//             console.log(data3);
//             fs.writeFile('./txt/final.txt',`${data1} \n 'first file is complete' \n  ${data2} \n 'second file is complete' \n ${data3} \n 'third file is complete' \n`,'utf-8',(err)=>{
//                 console.log(err);
//             })
//         })
//     })
// });
// console.log('I am not waiting to complete read the file....\n');

//..............................................................
// server

// read file syncronously because in create server whenever  client request the data is read from file..

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

// slugs..
const slugs = dataObject.map((element) =>
  slugify(element.productName, { lower: true, replacement: '_' })
);
console.log(slugs);

const tempover = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempcard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempprod = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

//console.log('slugify is that..',slugify('Fresh Avacodos',{lower:false,replacement:'_' }));  // ,strict:true.. this will remove the speacial characters

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true); //?id=0  parse the query string into url
  console.log(pathname);
  //overview page
  if (pathname === '/overview') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const cards = dataObject.map((el) => replaceTemplate(tempcard, el));
    const output = tempover.replace('{%PRODUCT_CARDS%}', cards);
    res.end(output);

    // product page
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    const product = dataObject[query.id];
    const output = replaceTemplate(tempprod, product);
    res.end(output);
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(data);
  } else {
    // it is a status code ...
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'sami-ullah',
    });
    res.end('<h1>page not found!</h1>');
  }
});

server.listen(2000, '192.168.10.6', () => {
  console.log('server is listening at the port of 2000');
});
