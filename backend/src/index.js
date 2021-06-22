const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {});
//   handlePreflightRequest: (req, res) => {
//     const headers = {
//       "Access-Control-Allow-Headers": "Content-Type, Authorization",
//       "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
//       "Access-Control-Allow-Credentials": true
//     };
//     res.writeHead(200, headers);
//     res.end();
//   }
// });
// io.set('origins', '*:*');
const cors = require('cors');
const bodyparser = require("body-parser");
const port = process.env.PORT || 3000;
const formidable = require('express-formidable');
const bb = require('express-busboy');

// set the permissions to global
require('./lib/permissions');

const secretKey = 'eS||he-3vN1!6N+)]qVQA3q{Sto?Q<hC';
const jwt = require('express-jwt');

// bb.extend(app);

// app.use(formidable());
// app.use(bodyparser.json({limit: '2048mb'}));
app.use(cors());
app.use((req, res, next) => {
  console.log(req.headers);
  console.log(req.body);
  next();
  if(typeof req.get('content-type') !== 'undefined' && req.get('content-type').indexOf('multipart/form-data') === 0) {
    return formidable(req, res, next);
  }
  bodyparser.json({limit: '2048mb'})
  bodyparser.urlencoded({extended: false, limit: '2048mb'});
})
// app.use(bodyparser.urlencoded({extended: false, limit: '2048mb'}));
// delete app.use(express.bodyParser());
app.use(jwt({secret: secretKey}).unless({path: ['/auth/login']}));

const routes = require('./routes');
routes(app, io);

io.on('connection', client => {
  console.log('client connected');
  // client.on('event', data => { /* … */});
  client.on('disconnect', () => {
    console.log('websockets connection disconnected');
  });
});

app.get("/", (req, res) => {
  res.send(JSON.stringify({
    "GET": [
      "/admin_actions_log/list",
      "/admin_actions_log/get/:id",
      "/company/list",
      "/company/get/:id",
      "/draw_entrant_form/list",
      "/draw_entrant_form/get/:id",
      "/draw_entrants/list",
      "/draw_entrants/get/:id",
      "/draw_entries/list",
      "/draw_entries/get/:id",
      "/draw_form/list",
      "/draw_form/get/:id",
      "/media/list",
      "/media/get/:id",
      "/payment_history/list",
      "/payment_history/get/:id",
      "/permissions/list",
      "/permissions/get/:id",
      "/reconciliation/list",
      "/reconciliation/get/:id",
      "/roles/list",
      "/roles/get/:id",
      "/uploaded_documents/list",
      "/uploaded_documents/get/:id",
      "/users/list",
      "/users/get/:id",
      "/weekly_draw_entries/list",
      "/weekly_draw_entries/get/:id",
      "/weekly_draw/list",
      "/weekly_draw/get/:id",
      "/weekly_draw_media/list",
      "/weekly_draw_media/get/:id",
    ],
    "POST": [
      "/admin_actions_log/create",
      "/admin_actions_log/update/:id",
      "/admin_actions_log/delete/:id",
      "/company/create",
      "/company/update/:id",
      "/company/delete/:id",
      "/draw_entrant_form/create",
      "/draw_entrant_form/update/:id",
      "/draw_entrant_form/delete/:id",
      "/draw_entrants/create",
      "/draw_entrants/update/:id",
      "/draw_entrants/delete/:id",
      "/draw_entries/create",
      "/draw_entries/update/:id",
      "/draw_entries/delete/:id",
      "/draw_form/create",
      "/draw_form/update/:id",
      "/draw_form/delete/:id",
      "/media/create",
      "/media/update/:id",
      "/media/delete/:id",
      "/payment_history/create",
      "/payment_history/update/:id",
      "/payment_history/delete/:id",
      "/permissions/create",
      "/permissions/update/:id",
      "/permissions/delete/:id",
      "/reconciliation/create",
      "/reconciliation/update/:id",
      "/reconciliation/delete/:id",
      "/roles/create",
      "/roles/update/:id",
      "/roles/delete/:id",
      "/uploaded_documents/create",
      "/uploaded_documents/update/:id",
      "/uploaded_documents/delete/:id",
      "/users/create",
      "/users/update/:id",
      "/users/delete/:id",
      "/weekly_draw_entries/create",
      "/weekly_draw_entries/update/:id",
      "/weekly_draw_entries/delete/:id",
      "/weekly_draw/create",
      "/weekly_draw/update/:id",
      "/weekly_draw/delete/:id",
      "/weekly_draw_media/create",
      "/weekly_draw_media/update/:id",
      "/weekly_draw_media/delete/:id",
    ],
    "PATCH": [],
  }));
});

server.listen(port, () => {
  console.log(`running at port ${port}`);
});
