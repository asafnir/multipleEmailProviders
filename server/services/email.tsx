import axios from "axios";
import PostMark from '../vendor/postmark';
import SendGrid from '../vendor/sendgrid';

class EmailService {
    providerName: string;
    providerClass: {
        url: string,
        data: {},
        headers: {}
    };
    tryout: number;
    

    constructor(provider = 'pastMark') {
        this.providerName = provider;
        this.tryout = 0;
    }

    switchProvider = (email) => {
        this.providerName = this.providerName === "pastMark" ?  "sendGrid" : "pastMark";
        switch(this.providerName) {
            case "pastMark":
                this.providerClass = new PostMark(email);
                break;
            case "sendGrid":
                this.providerClass = new SendGrid(email);
                break;
            default:
                return new SendGrid(email);
          }
    };

    sendEmail = async (email) => {
        if (this.tryout >= 2) {
            return;
        }
        this.switchProvider(email);
        await axios({
            url: this.providerClass.url,
            data: JSON.stringify(this.providerClass.data),
            headers: this.providerClass.headers,
            method: 'post'    
        }).catch(error => {
            console.log(error.data)
            this.tryout++;
            this.sendEmail(email)
        })
        return {success: true, provider: this.providerName};
    }

    saveEmailRecord = (emai) => {
        // TODO: Keep a record of emails passing through your service in some queryable form of data storage.
    }
}

export default EmailService;