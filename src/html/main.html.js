import test from './components/test.html';

export default function (templateParams) {
  const html = 
    `<html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title></title>
          <link rel="stylesheet" href="./app.css">
        </head>
          <body>
              <main>
                ${test}
              </main>
          </body>
    </html>`

  return html;
};