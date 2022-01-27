import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { async } from 'regenerator-runtime';
import { Container, Row,Col,Card,ListGroup, ListGroupItem, Button, Table} from 'react-bootstrap';


const SendTokens = props => {

    const [recipients, setRcipients]=useState([]); 
    const [valuesSent,setValues]=useState([]);
    const [balance, changeBalance]=useState(0);

    let ValueInput=React.createRef();
    let Recipient=React.createRef();

    const sendGift=async()=>{
        let getState=await window.account.state();
        let getAmount = await window.utils.format.formatNearAmount(getState.amount)
        let enteredValue = ValueInput.current.valuesSent

        if(Number(getAmount)<Number(enteredValue)){
            await window.account.sendMoney(Recipient.current.value, window.utils.format.parseNearAmount(enteredValue))
            .then(
                await window.contract.addFunds({recipient:Recipient.current.value, amount:Number(enteredValue)})
            )
            .then(
                setRcipients(
                    await window.contract.getNames({User:window.accountId})
                )
            )
            .then(
                setValues(
                    await window.contract.getValues({User:window.accountId})
                )
            )
        }else{
            alert("Not Enough Founds")
           
            
        }
    }
    //Load Amount
    useEffect(()=>{
        async function getData(){
            let Data = await window.account.state()
            changeBalance(Data.amount)
        }
    },[balance])

    //Load
    useEffect(()=>{
        async function getTransactions(){
            setRcipients(
                await window.contract.getNames({User:window.accountId})
            )
            setValues(
                await window.contract.getValues({User:window.accountId})
            )
        }

        getTransactions();

    },[])


    //Change Format, from arrays to single caracters
    const formatOutput=(text)=>{
        text = String(text);

        if( text.includes('.')){
            let arr=text.split('.')
            arr[1]=arr[1].split('').splice(0,2).join('')
            return arr.join('.')
        } else{
            return text
        }
    }

    return (
        <Container>
            <Row className="d-flex justify-content-center">
                <Card>
                    <Card.Header>Near Token Balance</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>{formatOutput(window.utils.format.formatNearAmount(String(balance)))} Near</ListGroup.Item>
                    </ListGroup>
                </Card>
            </Row>
            <Row className="d-flex justify-content-center">
                <Card>
                    <Card.Header className="d-flex justify-content-center">Send Money to Friend</Card.Header>
                    <Card.Body className="d-flex justify-content-center">
                        <Container >
                            <Row>
                                <Col >
                                <input type="text" placeholder="Enter Recipient's Name" ref={Recipient}/>
                                <input type="text" placeholder="Enter Value to send" ref={ValueInput}/>
                                </Col>
                                <Col>
                                <Button onClick={sendGift}>
                                        Submit
                                </Button>
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-center">
                                <Table style={{marginTop:"10px"}} striped bordered hover variant="primary">

                                    <thead>
                                        <tr>
                                            <th colSpan="2">Transaction History</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {
                                           recipients.map((x, index)=>{
                                               return(
                                                   <tr key={x}>
                                                       <td>{x}</td>
                                                       <td>{`${valuesSent[index]} Near`}</td>
                                                   </tr>
                                               )
                                           })
                                       }
                                    </tbody>

                                </Table>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>
                <Card>
                    
                </Card>
            </Row>
        </Container>
    );
};

SendTokens.propTypes = {
    
};

export default SendTokens;