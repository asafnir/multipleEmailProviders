const API_KEY = process.env.SENDGRID_API_KEY

class SendGrid {
    apiKey: string;
    headers: {};
    data: {};
    url: string
    
    constructor(email: Object | any) {
        this.apiKey = API_KEY;
        this.headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        }
        this.data = {
            personalizations: [{ 
                to: [{email: email.to, name: email.to_name}],
            }],
            from: {email: email.from, name: email.from_name},
            subject: email.subject,
            content: [ {type: "text/plain", "value": email.textBody}, {type: "text/html", "value": email.body}]
        }
        this.url = "https://api.sendgrid.com/v3/mail/send"
    }

}

export default SendGrid;