import cockpit from './components/cockpit.html';
import content from './components/content.html';

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
                <div class="page-wrapper">
                  ${cockpit}
                  ${content}
                </div>
              </main>
          </body>
    </html>`

  return html;
};