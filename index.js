const readlineSync = require("readline-sync");
const welcome = `
------------------------ Проект 3. Викторина ---------------------------

Программа-викторина, выбирает 5 случайных файлов вопросов и в командной
 строке по очереди задает их пользователю, получая от него варианты 
 ответов. После получения всех ответов, программа выводит итоговое 
 количество правильных ответов.
------------------------------------------------------------------------
`;



function run(path) {
  console.log(welcome);

  const folder = path;
  const fs = require("fs");

  // создаем массив из наименований файлов расположенных в директории
  let allFile = [];
  fs.readdirSync(folder).forEach(file => {
    allFile.push(file);
  });
  // счетчик вопросов
  countQuestions = 0;
  // счетчик правильных ответов
  ansverTrue = 0;
  // цикл программы
  while (countQuestions < 5) {  
    indexQuestion = Math.floor(Math.random() * allFile.length);
    let data = "";
    try {
      data = fs.readFileSync(path + "/" + allFile[indexQuestion]);
    } catch (err) {
      console.error(err);
    }

    data = String(data.toString()).split("\n");
    data.forEach((item, i) => {
      if (i == 0) {
        console.log(`\n${item}`);
      } else if (i != 1) {
        console.log(`${i - 1}) ${item}`);
      }
    });

    let ansver = readlineSync.question("Введите номер ответа: ");
    if (ansver == data[1]) {
        ansverTrue ++;
    }

    allFile.splice(indexQuestion, 1);
    countQuestions++;
  }

  console.log("\nКоличество превильных ответов: ", ansverTrue);
}

run("./questions");
