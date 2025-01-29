/*type ModelData = {
    id: string,
    object: string,
    owned_by: string
}
type ModelResponse = {
    data: ModelData[],
    object: string
}

async function fetchFunction() {
    let response = await fetch("https://small-pens-warn.loca.lt/v1/models");
    let data: ModelResponse = await response.json();
    
    console.log(data.data[0]);
}

fetchFunction();
*/

// sätter typ som ska matcha struktur i vår ai
type PostRequest = {
    model: string,
    messages: MessageData[]
}

type MessageData = {
    role: string, // "system" | ""
    content: string
}

type ResponseObject = {
    id: string,
    object: string,
    created: number,
    model: string,
    choices: ChoicesData[],
    usage: object,
    system_fingerprint: string
}

type ChoicesData = {
    index: number,
    logprobs: null,
    finish_reason: string,
    message: MessageData;
}

let conversationContext: Array<MessageData> = [];

function initContext() {
    conversationContext.push(createMessageData("system", "You are very helpful assistant"))
    conversationContext.push(createMessageData("user", "What's the status of the report that I asked for!"))
}


function getAIanswer(aiObject: ResponseObject) : MessageData {
        console.log(aiObject);
    let answer : MessageData = aiObject.choices[0].message;
    return answer;
}

// funktion för att sätta data som ska postas
function createPostData() : PostRequest {
    const postData: PostRequest = {
        model: "llama-3.2-3b-instruct",
        messages: conversationContext 
    };
    return postData;
}

function createMessageData(role: string, content: string) : MessageData {
    return {role, content}
}

initContext();
// Post request: skicka data till ai och ta ut response
async function postData(data: PostRequest) {
    //console.log(JSON.stringify(data));
    console.log("---------")
    //console.log(data.messages[0].role + ": " + data.messages[0].content)

    const response = await fetch("https://violet-carrots-stare.loca.lt/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(data)
    })
    const responseData = await response.json();
    //const responseArray = responseData.choices;

    console.log("---------")

    let answer : MessageData = getAIanswer(responseData);
    console.log(answer);
    

    /*
    responseArray.forEach((element : any) => {
        const responseRole = element.message.role;
        const responseContent = element.message.content;
        const responseAnswer = responseRole + ": " + responseContent;
        console.log(responseAnswer);
    });
    */

}

postData(createPostData());

function keepConversation(){
    let currentConversation = [];
}

// lagra response --> push in i konversation