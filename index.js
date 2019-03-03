const slackbots = require('slackbots');
const axios = require('axios');

const Bot = new slackbots({
  token: 'xoxb-530537882612-530105410881-XgUVMxSUKJFK7e751f7au0Jm',
  name: 'Geek-Bot'
});

Bot.on('start',()=>{
  const params = {
    icon_emoji: ':Geek:'
  };

  Bot.postMessageToChannel(
    'general',
    'To get random facts about numbers just type @Geekbot fact',
    params
  );
});

Bot.on('error',(err)=>{
  console.log(err);
});

Bot.on('message', data => {
  if (data.type != 'message') {
    return;
  }
  messageHandler(data.text);
});

function messageHandler(msg){
  if (msg.includes(' fact')) {
    geekresponse();
  }
}

function geekresponse(){
  const number = Math.floor(Math.random() * 100);

  axios.get('http://numbersapi.com/'+number)
      .then(res =>{
        const fact = res.data;

        const params = {
          icon_emoji: ':Geek:'
        };

        Bot.postMessageToChannel(
          'general',
          `${res.data}`
        );
    });
}
