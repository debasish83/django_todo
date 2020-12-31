import logo from './logo.svg';
import './App.css';

import React, {Component} from 'react';

// result from API saved as const for now
const list = [
    {
        'id': 1,
        'title': '1st Item',
        'description': 'Description here.'
    },
    {
        'id': 2,
        'title': '2nd Item',
        'description': 'Another description here.'
    },
    {
        'id': 3,
        'title': '3rd Item',
        'description': 'Third description here.'
    }
];

class App extends Component {
    constructor(props) {
        super(props);
        // initialize todos with empty array
        this.state = {
            todos: []
        };
    }

    // do an DRF API call whenever the component mounts and
    // fetch the latest todos from API
    // use react fetch or axios can be used as well
    async componentDidMount() {
        try {
            // await is a blocking call on a API, it's not a good idea
            // use axios
            const res = await fetch('http://127.0.0.1:8000/api');
            const todos = await res.json();
            console.log('fetching the api response')
            console.log(todos)
            this.setState({todos});
        } catch (e) {
            console.log(e);
        }
    }

    // For each div use a className to decorate css and also associate an unique
    // key with it
    render() {
        return (
            <div>
                {this.state.todos.map(item => (
                    <div className={"item"} key={item.id}>
                        <h1>{item.title}</h1>
                        <span>{item.description}</span>
                    </div>
                    ))}
            </div>
        );
    }
}

export default App;
