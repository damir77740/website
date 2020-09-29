// подключение express bodyParser
express = require("express");
bodyParser = require("body-parser");
// создаем объект приложения
app = express();

app.set("view engine", "ejs");

// подключаем fs
fs = require('fs');

// конектимся к json
school = require('./school.json');

// сохранение json каждые 2сек
setInterval(async () => {
  fs.writeFileSync('./school.json', JSON.stringify(school, null, "\t"));
}, 2000);

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({ extended: false });


app.get("/createSchool", urlencodedParser, function (request, response) {
  response.render("createSchool", {});
});

app.post("/createSchool", urlencodedParser, function (request, response) {
  if (!request.body) return response.sendStatus(400);

  response.render("createSchool", {});

  if (request.body) {
    //db_peremen
    school.push({
      id_school: school.length + 1,
      name_school: request.body.school_name,
      ball_school: 0,
      photo_school: request.body.school_photo,
    })
  }

  let top = [];

  school.map(x => {
    top.push({ name: x.name_school, ball: x.ball_school, photo: x.photo_school, id: x.id_school });
  });

  top.sort((a, b) => {
    return b.id - a.id;
  });

  let text = ``;
  const find = () => {
    let pos = 1000;
    
    for (let i = 0; i < top.length; i++) {
      if (top[i].id === 1) return pos = i;
    }

    return pos;
  }

  for (let i = 0; i < 10; i++) {
    if (!top[i]) return;
    const user = top[i];

    text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.name}) — 👑${user.id}) | $${user.ball}
    `;
  }

  return  console.log(`${text}`)

});

app.use("/school", function (request, response) {

  user = school.find(t => t.id_school === school.length)


  school.forEach(function (item) {

    console.log(JSON.stringify(item, null, "\t"));

    i = JSON.stringify(item)

  })

  response.render("school", {
    xux: i,
    j: 001,
    name_school: user.name_school,
    ball_school: user.ball_school,
    photo_school: user.photo_school,
  });

});

app.post("/like_school", urlencodedParser, function (request, response) {

  user = school.find(t => t.id_school === school.length)

  user.ball_school += 1;

});

  //for(var i=0; i<emails.length;i++)

  // начинаем прослушивать подключения на 3000 порту
  app.listen(3000);