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
    role: string,
    content: string
}

// funktion för att sätta data som ska postas
function createPostData() : PostRequest {
    let postData: PostRequest = {
        model: "",
        messages: []
    };
    postData.model = "llama-3.2-3b-instruct";
    postData.messages.push(createMessageData("system", "You are drunk but you are trying to hide it, I'm your boss. Rhyme"))
    postData.messages.push(createMessageData("user", "What's the status of the report that I asked for!"))

    return postData;
}

function createMessageData(role: string, content: string) : MessageData {
    return {role, content}
}

// Post request: skicka data till ai och ta ut response
async function postData(data: PostRequest) {
    //console.log(JSON.stringify(data));
    console.log("---------")
    console.log(data.messages[0].role + ": " + data.messages[0].content)

    const response = await fetch("https://curly-sloths-raise.loca.lt/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(data)
    })
    const responseData = await response.json();
    const responseArray = responseData.choices;

    console.log("---------")

    responseArray.forEach((element : any) => {
        console.log(element.message.role + ": " + element.message.content);
    });

}

postData(createPostData());