import {Fragment ,useState,useEffect} from "react"
import axios from "axios"
import {Row, Col, Table, Button, Container} from 'reactstrap'

const Preview = () => {

    const [data,setData] = useState();

    const subTitle = {
        fontSize : 18,
        color : "#000",
        fontStyle  : "bold",
        marginBottom : 3
    }
    const span = {
        fontSize : 16
    }

    useEffect(async ()=>{
        const {data : info} = await axios.get('Data/data.json');
        setData(info);
    },[])

    const handlePrint =()=>{
        let printContents = document.getElementById("ContentToPrint").innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }

    return ( 
        <Fragment>
            <Container 
                fluid  
                className="d-flex flex-column" 
                id="ContentToPrint"
            >
                <Row className="mb-5">
                    <Col xs={3}>
                        
                            Logo
                        
                    </Col>
                    <Col xs={6}/>
                    <Col xs={3}>
                            <h4 style={subTitle}>
                                Invoice : {data && data.header.invoice}
                            </h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <span style={span}>
                                {data && data.header.title}
                        </span>
                    </Col>
                    <Col xs={6}/>
                    <Col xs={3}>
                            <span style={span}>
                                Date Issued : {data && data.header.dateIssued}
                            </span >
                            <br/>
                            <span style={span}>
                                Due Date : {data && data.header.dueDate}
                            </span>
                            
                    </Col>
                </Row>
                <div  className="my-1"><hr/></div>    {/** divider */}
                <Row xs={12}> 
                    <Col xs={3}>
                        <h4 style={subTitle} >
                            Invoice To:
                        </h4><br/>
                        <span style={subTitle}>
                            Full Name:{data && data.content.fullName}
                        </span><br/>
                        <span style={span}>
                            Info : {data && data.content.info}
                        </span>
                    </Col>
                    <Col xs={6}/>
                    <Col xs={3}>
                        <h4 style={span}>
                            Payment Details:
                        </h4><br/>
                        <span style={span}>
                            Total Due: {data && data.content.totalDue}
                        </span><br/>
                        <span style={span}>
                            Bank name: {data && data.content.bankName}
                        </span><br/>
                        <span  style={span}>
                            Country: {data && data.content.country}
                        </span><br/>
                        <span style={span}>
                            IBAN: {data && data.content.iBAN}
                        </span><br/>
                        <span style={span}>
                            SWIFT code: {data && data.content.swiftCode}
                        </span>  
                    </Col>
                </Row>
                <div  className="mt-1"><hr/></div>    {/** divider */}
                <Row xs={12}>
                    <Table hover>
                        <thead style={{backgroundColor : "gray"}}>
                            <tr>
                                {data && data.tableHeaders.map(item => {
                                        return <th key={Math.random()}>{item}</th>
                                    })} 
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.tasks.map(task=>{
                                return <tr key={task.title}>
                                            <td>
                                                <h6>{task.title}</h6>
                                                <p>{task.description}</p>
                                            </td>
                                            <td>{task.rate}</td>
                                            <td>{task.total}</td>                
                                        </tr>
                                })}
                        </tbody>
                    </Table>
                </Row>
                <Row xs={12} className="mt-4">
                    <Col xs={6}>
                        <span style={subTitle}>
                            Salesperson : {data && data.salesperson}
                        </span>
                    </Col>
                    <Col xs={3}/>
                    <Col xs={3}>
                        <span style={span}>
                            Subtotal:
                        </span><br/>
                        <span style={span}>
                            Discount:
                        </span><br/>
                        <span style={span}>
                            Tax:
                        </span><br/>
                        <hr/>
                        <span style={span}>
                            Total:
                        </span>  
                    </Col>
                </Row>
            </Container>
            <Row xs={4}>
                <Button
                    color="primary" 
                    outline
                    onClick={handlePrint}>
                        Print Order
                </Button> 
            </Row>
        </Fragment>
     );
}
 
export default Preview;