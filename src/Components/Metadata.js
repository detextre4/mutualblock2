import React,{useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';

//This file

const Metadata = props => {

const [metadata, changeMetaData]=useState({})

useEffect(()=>{
    async function getData(){
        let Data= await window.account.state()
        console.log(Data)
        changeMetaData(
            Data
        )
    } 
    getData();
}, [])


return (
        <div style={{marginTop:'5%'}}>
            <Table striped bordered hover variant="primary">
                <thead>
                    <tr>
                        <th>Data Title</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Amount</td>
                        <td>{metadata.amount}</td>
                    </tr>
                    <tr>
                        <td>Locked</td>
                        <td>{metadata.locked}</td>
                    </tr>
                    <tr>
                        <td>Code Hash</td>
                        <td>{metadata.code_hash}</td>
                    </tr>
                    <tr>
                        <td>Storage Usage</td>
                        <td>{metadata.storage_usage}</td>
                    </tr>
                    <tr>
                        <td>Paid At</td>
                        <td>{metadata.storage_paid_at}</td>
                    </tr>
                    <tr>
                        <td>Block Height</td>
                        <td>{metadata.block_height}</td>
                    </tr>
                    <tr>
                        <td>Block Hash</td>
                        <td>{metadata.block_hash}</td>
                    </tr>
                    
                </tbody>

            </Table>
        </div>
    );
};

export default Metadata;