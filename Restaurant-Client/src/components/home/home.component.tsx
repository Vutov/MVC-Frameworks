import * as React from 'react'
import observer from '../../services/observer'
import { Link } from "react-router-dom";
import { Panel, Carousel } from 'react-bootstrap'

export class HomeComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { user: sessionStorage.getItem('username') };
    }

    renderCarousel() {
        let dummyImage = 'https://dummyimage.com/900x500/888991/edeef0.jpg';
        return (
            <Carousel>
                <Carousel.Item>
                    <img className="margin-reset" width={900} height={500} alt="900x500" src={dummyImage} />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="margin-reset" width={900} height={500} alt="900x500" src={dummyImage} />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="margin-reset" width={900} height={500} alt="900x500" src={dummyImage} />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }

    render() {

        let title = <h1>Welcome {observer.isLogged() ? ", " + this.state.user + "!" : null}</h1>;
        return (
            <section className='container'>
                <Panel header={title}>
                    ... to our shopping system.
                </Panel>
                {this.renderCarousel()}
            </section>
        );
    }
}