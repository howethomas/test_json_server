const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const port = 5000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.post('/webhook', function(request, response){
  console.log(request.body);      // your JSON

  if (request.body.msg.direction == 'egress') {
    console.log("We aren't reacting to outbound messages")
    response.send({});    // echo the result back
    return;
  }

  if (request.body.msg.txt.trim() == "end") {
    r = {
      commands: {
        end_session: true
      }
    }
    response.send(r);    // echo the result back
    return;
  }

  if (request.body.msg.txt.trim() == "transfer") {
    r = {
      commands: {
        transfer: "support"
      }
    }
    response.send(r);    // echo the result back
    return;
  }


  if (request.body.msg.txt.trim() == "notify") {
    r = {
      commands: {
        notify: "notify called"
      }
    }
    response.send(r);    // echo the result back
    return;
  }



  r =  {
    messages: [
      {
        txt: "This is a message. Wooo."
      },
      {
        txt: "This is another message. Whoa."
      }
    ],
    whispers: [
      {
        txt: "Hey we are whispering http://www.cnn.com/"
      },
      {
        txt: "Hey we are whispering http://www.foxnews.com/"
      }
    ],
    customerTags: [
      "notReal:VeryNotReal",
      "notRealer:VeryNotRealer"
    ],
    agentTags: [
      "notAtAllReal:VeryNotAtAllReal",
      "imaginary:friend"
    ],
    metaData: {
      hasInterest: true,
      sentimentScore: 7,
      locationCode: "02668",
    }
  }
  response.send(r);    // echo the result back
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

