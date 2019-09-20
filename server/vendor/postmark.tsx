const API_KEY = process.env.POSTMARK_API_TOKEN

class PostMark {
    apiKey: string;
    headers: {};
    data: {};
    url: string
    

    constructor(email: Object | any) {
        this.apiKey = API_KEY;
        this.headers = {
            "Content-Type": "application/json",
            "X-Postmark-Server-Token": `${API_KEY}`
        }

        this.data = {
            From: email.from,
            To: email.to,
            Subject: email.subject,
            HtmlBody: email.body,
            TextBody: email.textBody,
        }
        this.url = "https://api.postmarkapp.com/email"
    }

}

export default PostMark;