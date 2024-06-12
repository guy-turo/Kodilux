import React from 'react'
import App from './App'
import { Provider } from 'react-redux'
import {store} from "./redux_tool.js/services/store"

export default class Main extends React.PureComponent{
    state= {online:window.navigator.onLine}

    componentDidMount(){
        window.addEventListener("offline",this.handleNetworkChange)
        window.addEventListener("online", this.handleNetworkChange, false)
    }
    componentWillUnmount(){
        window.removeEventListener("offline",this.handleNetworkChange)
        window.removeEventListener("online",this.handleNetworkChange)
    }
    handleNetworkChange(){
        this.setState({
            online:window.navigator.onLine
        })
    }
    render(){
    return (
        <Provider store={store}>
             <div > 
                {this.state.online ?(<App/> ) :(<div className = "flex  justify-center bg-gray-100 h-fit">
                    <div className = ' flex h-lvh items-center' >
                    <p className = 'self-center text-red-600 font-semibold' >
                    You are no longer connected,
                    please check your internet connection </p> </div>
                    </div>)
                }
            </div>
        </Provider>
    )
    }
}