require("dotenv").config();
const request = require("request")
const PAGE_ACCESS_TOKEN = process.env.PAGE_TOKEN;


function handleSetupProfileAPI() {
    return new Promise(function (resolve, reject) {
            try {
                let url = `https://graph.facebook.com/v7.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`;
                let request_body = {
                    "get_started": {
                        "payload": "GET_STARTED"
                    },
                    "persistent_menu": [
                        {
                            "locale": "default",
                            "composer_input_disabled": false,
                            "call_to_actions": [
                                {
                                    "type": "postback",
                                    "title": "Talk to an agent",
                                    "payload": "TALK_AGENT"
                                },
                                {
                                    "type": "postback",
                                    "title": "Restart this conversation",
                                    "payload": "RESTART_CONVERSATION"
                                },
                                {
                                    "type": "web_url",
                                    "title": "View our Facebook Page",
                                    "url": "https://www.facebook.com/QkResTechnologies",
                                    "webview_height_ratio": "full"
                                },
                                {
                                    "type": "web_url",
                                    "title": "View our Youtube channel",
                                    "url": "https://youtu.be/tuZgM-r5hXI",
                                    "webview_height_ratio": "full"
                                },
                              
                            ]
                        }
                    ],
                    "whitelisted_domains": [
                        "https://qkres.herokuapp.com/"
                    ]
                };
                // Send the HTTP request to the Messenger Platform
                request({
                    "uri": url,
                    "method": "POST",
                    "json": request_body,
                }, (err, res, body) => {
                    if (!err) {
                        console.log(body);
                        resolve("Done!");
                    } else {
                        reject("Unable to send message:" + err);
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
}


module.exports = handleSetupProfileAPI