const chatlogs = document.querySelector('.chatlogs');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
///config///

const apikey = "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";
const orgkey = "enter your org key here";
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
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apikey,
        'OpenAI-Organization': orgkey
    },
    body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "user",
            "content": userInput
          }
        ]
      })
  });
 // debugger; //anti f12
  const data = await response.json();
  const send = data.choices[0].message.content.trim();
  return send;
}
