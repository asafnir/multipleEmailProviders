import * as React from 'react';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
const { TextArea } = Input;

interface IProps {

}

interface IState {
}

type emailOptions = {
    [key: string]: string
}

export default class TransactionsForm extends React.Component<IProps, IState> {
    public state = {
        email: {
            to: '',
            to_name: '',
            from: '',
            from_name: '',
            subject: '',
            body: '',
        },
        responseToPost: [],
        successMsg: ''
    }
    
    onSubmit = async (e: any) => {
        e.preventDefault();
        const response = await fetch("/api/email", {
            body: JSON.stringify({ email: this.state.email }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        });
        const body = await response.json();
        if (body.errors) {
            this.setState({ responseToPost: body.errors})
        } else {
            this.setState({successMsg: body.msg, responseToPost: []})
        }        
    }

    private onChange = (e: any) => {
        const tmpEmail: emailOptions = { ...this.state.email};
        tmpEmail[e.target.name] = e.target.value;
        this.setState({email: tmpEmail});
    }

    public render() {
        const { email, responseToPost, successMsg } = this.state;
        return (
        <Col span={12} offset = {6} >
            <p>{successMsg}</p>
            <div>
            { Boolean(responseToPost.length) && responseToPost.map((res: any, index: number) =>
                <p key={index}>{res.param.replace('email.', ' ') + ' ' + res.msg}</p>
            )}
            </div>
            <Form onSubmit={this.onSubmit}>
                <Form.Item>
                    <Input name="to" placeholder="To (Enter email)" value={email.to} onChange={this.onChange}/>
                </Form.Item>
                <Form.Item>
                    <Input name="to_name" placeholder="To Name" value={email.to_name} onChange={this.onChange}/>
                </Form.Item>
                <Form.Item>
                    <Input name="from" placeholder="From (Enter Email)" value={email.from} onChange={this.onChange}/>
                </Form.Item>
                <Form.Item>
                    <Input name="from_name" placeholder="From Name" value={email.from_name} onChange={this.onChange}/>
                </Form.Item>
                <Form.Item>
                    <Input name="subject" placeholder="Subject" value={email.subject} onChange={this.onChange}/>
                </Form.Item>
                <Form.Item>
                    <TextArea name="body" autosize={{ minRows: 6 }} placeholder="Email Body" value={email.body} onChange={this.onChange}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Send
                    </Button>
                </Form.Item>
            </Form>
        </Col>
        );
    }
}