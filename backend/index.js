import express from 'express';
import axios from 'axios';
import path from 'path';
import cors from 'cors';
import expressFileUpload from 'express-fileupload';
import pdf2image, {convert} from 'pdf-img-convert';
import fs from 'fs';
import {fileURLToPath} from 'url';
import pdf from 'pdf-parse';

const app = express();
const PORT = 4000;

// const storage = multer.memoryStorage();
// const upload = multer({storage});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsFolder = path.join(__dirname, 'assets');

async function convPdftoImg(pdfPath) {
  let pdfArr;
  console.log('pdfpath: ', pdfPath);

  pdfArr = await pdf2image.convert(pdfPath);

  fs.writeFile('output1.png', pdfArr[0], error => {
    if (error) {
      console.log('error converting: ' + error);
    }
  });
}

async function parsePdfs(pdfPath) {
  // const pdfParser = new PdfParser(this, 1);
  // pdfParser.on('pdfParser_dataError', errData => {
  //   console.error(errData);
  // });
  // pdfParser.on('pdfParser_dataReady', pdfData => {
  //   fs.writeFile('X.txt', JSON.stringify(pdfParser.getAllFieldsTypes()), () => {
  //     console.log('done parsing');
  //   });
  // });
  // pdfParser.loadPDF(pdfPath);
  let dataBuffer = fs.readFileSync(pdfPath);
  pdf(dataBuffer).then(function (data) {
    console.log(data.text);
  });
}

app.use(cors());
app.use(expressFileUpload());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
  res.send(`Node Server run @ ${PORT}`);
});

// post
app.post('/upload', (req, res) => {
  //   this gonna store file via req.file.buffer???
  // res.send('Post is successfull');

  const {pdfFile} = req.files;
  //   pdfFile.mv(path.j(assetsFolder, pdfFile.name));
  const xx = path.join(assetsFolder, pdfFile.name);

  pdfFile.mv(xx, function (error) {
    if (error) {
      return res.status(500);
    }
    // res.send('post accepcted');
  });
  res.send('upload successfull');
  //   console.log(req.files);
  //   console.log('post accepted');
});

// post
app.post('/uploadJobDesc', (req, res) => {
  //   this gonna store file via req.file.buffer???
  // res.send('Post is successfull');
  // const {jobDesc} = req.body;
  // //   pdfFile.mv(path.j(assetsFolder, pdfFile.name));
  // const xx = path.join(assetsFolder, pdfFile.name);
  // pdfFile.mv(xx, function (error) {
  //   if (error) {
  //     return res.status(500);
  //   }
  //   // res.send('post accepcted');
  // });
  // res.send('upload successfull');
  //   console.log(req.files);
  //   console.log('post accepted');
});

// get
app.get('/preview', (req, res) => {
  //   <h1>ss</h1>;
  const fileName = 'resume.pdf';
  const filepaths = path.join(assetsFolder, fileName);
  convPdftoImg(filepaths);
  parsePdfs(filepaths);
  // res.sendFile(filepaths);
  console.log('preview sent');
});

app.get('/data', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`Running at localhost: ${PORT}`);
});
