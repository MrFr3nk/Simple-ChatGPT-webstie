const chatlogs = document.querySelector('.chatlogs');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
///config///

const apikey = "enter your api key here";
const orgkey = "your org key here";
const settoken = 2000;
//////////////////////////
sendButton.addEventListener('click', async () => {
  const userInput = chatInput.value;
  chatInput.value = '';

  const message = document.createElement('div');
  message.classList.add('chat');
  message.classList.add('self');
  const text = document.createElement('p');
  text.classList.add('chat-message');
  text.textContent = userInput;
  message.appendChild(text);
  const userPhoto = document.createElement('div');
  message.appendChild(userPhoto);
  chatlogs.appendChild(message);

  const response = await getOpenAIResponse(userInput);
  const aiMessage = document.createElement('div');
  aiMessage.classList.add('chat');
  aiMessage.classList.add('friend');
  const aiText = document.createElement('p');
  aiText.classList.add('chat-message');
  aiText.textContent = response;
  aiMessage.appendChild(userPhoto.cloneNode(true));
  aiMessage.appendChild(aiText);
  chatlogs.appendChild(aiMessage);
});

async function getOpenAIResponse(userInput) {
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apikey
    },
    body: JSON.stringify({
      prompt: userInput,
      max_tokens: settoken,
      n: 1,
      temperature: 0,
      model: 'text-davinci-003',
    })
  });
 debugger; //anti f12
  const data = await response.json();
  const send = data.choices[0].text.trim();
  return send;
}
