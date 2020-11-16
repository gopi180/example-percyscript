const PercyScript = require('@percy/script');
const httpServer = require('http-server');

const PORT = process.env.PORT_NUMBER || 8000;
const TEST_URL = `http://localhost:${PORT}`;

// A script to navigate our app and take snapshots with Percy.
PercyScript.run(async (page, percySnapshot) => {
  let server = httpServer.createServer();
  server.listen(PORT);

  console.log(`Server started at ${TEST_URL}`);

  await page.goto(TEST_URL);
  await percySnapshot('TodoMVC home page');

  // Enter a new to-do.
  await page.type('.new-todo', 'A really important todo');
  await page.keyboard.press('Enter');
  await percySnapshot('TodoMVC with a new todo', { widths: [768, 992, 1200] });

  //Strike off a created todo
  await page.click('.toggle')
  await percySnapshot('TodoMvc check box strike off',{ widths: [768,992,1200]})

  //CLear completed
  await page.click('.clear-completed')
  await percySnapshot('CLear completed',{ widths: [768,992,1200]})
  server.close();
});

