import React, {Component} from 'react'
import {Input, FormButton} from '../Form/index'
import {Container, Col, Row} from "../Grid";
import {Card, CardBody, CardHeader} from "../card";
import axios from 'axios';

class Home extends Component {
    state = {
        articles: [],
        query: '',
        startDate: '',
        endDate: ''
    };

    handleChange = event => {
        const {name, value} = event.target;
        console.log(`name: ${[name]}, value: ${value}`);
        this.setState({
            [name]: value
        })
    };
    handleFormSubmit = event => {
        event.preventDefault();
        const data = {
            query: this.state.query,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        };
        // console.log(data);
        axios.get('/api/nyt', {
                params: {
                    query: data.query,
                    startDate: data.startDate,
                    endDate: data.endDate
                }
            }
        ).then(response => {
            console.log(response);
            this.setState({
                articles: response.data.docs
            });
            console.log(this.state.articles)
        }).catch(error => {
            console.log(`==============================`);
            console.log(error.response)
        });
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size='sm-3'/>
                    <Col size='sm-6'>
                        <Card>
                            <CardHeader>Search</CardHeader>
                            <CardBody>
                                <form>
                                    <Input
                                        value={this.state.query}
                                        onChange={this.handleChange}
                                        name='query'
                                        placeholder='Query(required)'/>
                                    <Input
                                        value={this.state.startDate}
                                        onChange={this.handleChange}
                                        name='startDate'
                                        placeholder='Start Date - YYYYMMDD (optional)'/>
                                    <Input
                                        value={this.state.endDate}
                                        onChange={this.handleChange}
                                        name='endDate'
                                        placeholder='Start Date - YYYYMMDD (optional)'/>
                                    <FormButton onClick={this.handleFormSubmit}/>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col size='sm-3'/>
                    <Col size='sm-6'>
                        {this.state.articles.length
                            ?
                            <div>
                                {this.state.articles.map(article => (
                                    <Card key={article._id}>
                                        <CardHeader>
                                            <a href={article.web_url}><h2>{article.headline.main}</h2></a>
                                        </CardHeader>
                                        <CardBody>
                                            <p>{article.snippet}</p>
                                            <p>{article.pub_date}</p>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                            : (
                                <Card>
                                    <h1>No Results to display</h1>
                                </Card>
                            )}
                    </Col>
                </Row>

            </Container>
        )
    }

};

export default Home