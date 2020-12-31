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
            todos: [],
            leads: [],
            loaded: false,
            placeholder: "Loading"
        };
    }

    // do an DRF API call whenever the component mounts and
    // fetch the latest todos from API
    // use react fetch or axios can be used as well
    componentDidMount() {
        fetch("http://127.0.0.1:8000/api/leads")
            .then(response => {
                if (response.status > 400) {
                    return this.setState({placeholder: "Something went wrong"});
                }
                return response.json()
            })
            .then(data => {
                this.setState(() => {
                    return {
                        leads: data,
                        loaded: true
                    };
                });
            })
        fetch("http://127.0.0.1:8000/api/todos")
            .then(response => {
                if (response.status > 400) {
                    return this.setState({placeholder: "Something went wrong"});
                }
                return response.json()
            })
            .then(data => {
                this.setState(() => {
                    return {
                        todos: data,
                        loaded: true
                    };
                });
            })
        /* await is a blocking call on a API, it's not a good idea
           use axios or fetch with callbacks
        try {
            // use axios
            const res = await fetch('http://127.0.0.1:8000/api');
            const todos = await res.json();
            console.log('fetching the api response')
            console.log(todos)
            this.setState({todos});
        } catch (e) {
            console.log(e);
        }*/
    }

    // For each div use a className to decorate css and also associate an unique
    // key with it
    render() {
        return (
            <div>
                {this.state.todos.map(todo => (
                    <div className={"todo"} key={todo.id}>
                        <h1>{todo.title}</h1>
                        <span>{todo.description}</span>
                    </div>
                    ))}
                    <ul>
                        {this.state.leads.map(contact => (
                            <li key={contact.id}>{contact.name} - {contact.email}</li>
                        ))}
                    </ul>
            </div>
        );
    }
}

export default App;
