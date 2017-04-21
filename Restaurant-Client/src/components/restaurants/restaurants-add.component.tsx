import * as React from 'react'
import { RestaurantsAddBehavior } from './restaurants-add.behavior'
import { RestaurantsAddProps } from './restaurants-add.model'

export class RestaurantsAddComponent extends React.Component<RestaurantsAddProps, any> {

    constructor(props) {
        super(props);

        this.state = {
            towns: [],
            townID: undefined
        }
    }
    private behavior: RestaurantsAddBehavior = new RestaurantsAddBehavior()

    componentDidMount() {
        this.behavior.getTowns(function (data) {
            this.setState({ towns: data, townID: data[0].id.toString() });
        }.bind(this));
    }

    onChangeHandler(event) {
        let data = {};
        data[event.target.name] = event.target.value
        this.setState(data);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        // this.behavior.register(this.state.username, this.state.password, this.state.confirmPassword, this.state.email, function(){
        //   this.props.history.push('/');
        // }.bind(this));
    }

    render() {
        return (
            <section>
                <select name='townID' onChange={this.onChangeHandler.bind(this)}>
                    {
                        this.state.towns.map(function (town) {
                            return <option key={town.id} value={town.id}>{town.name}</option>
                        }.bind(this))
                    }
                </select>

            </section>
        )
    }
}