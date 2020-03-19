/* global chrome */
import React, { useState } from 'react';
// you don't have to do your CSS like this, but one of the benefits of Shadow Dom
// is encapsulating your styles from the target webpage (prevent collusion, etc)
import { styles } from './_Extension.css';

function getInitialState() {
    if (process.env.NODE_ENV === "development") {
        return [{
            firstName: "Vijaya",
            lastName: "Awesome",
            pnr: "VXBZOA"
        },
        {
            firstName: "Tesla",
            lastName: "Awesome",
            pnr: "VXBZOB"
        },
        {
            firstName: "bad",
            lastName: "Guy",
            pnr: "VXBZOC"
        },
        {
            firstName: "Vijaya",
            lastName: "Awesome",
            pnr: "VXBZOD"
        },
        {
            firstName: "Tesla",
            lastName: "Awesome",
            pnr: "VXBZOE"
        },
        {
            firstName: "bad",
            lastName: "Guy",
            pnr: "VXBZOF"
        },
        {
            firstName: "Vijaya",
            lastName: "Awesome",
            pnr: "VXBZOX"
        },
        {
            firstName: "Tesla",
            lastName: "Awesome",
            pnr: "VXBZOG"
        },
        {
            firstName: "bad",
            lastName: "Guy",
            pnr: "VXBZOH"
        },
        {
            firstName: "Vijaya",
            lastName: "Awesome",
            pnr: "VXBZOI"
        },
        {
            firstName: "Tesla",
            lastName: "Awesome",
            pnr: "VXBZOJ"
        },
        {
            firstName: "bad",
            lastName: "Guy",
            pnr: "VXBZOK"
        }]
    }

    return []
}
class App extends React.Component {
    state = {
        pnrs: getInitialState()
    }

    // handleMessage = async () => {
    //     // everything is "in view"  
    //     chrome.runtime.sendMessage({message: "click"}, function(response) {
    //         console.log('response: ', response);
    //         this.setState({
    //             pnrs: [...this.state.pnr,response.message]
    //         })
    //         // setMessage(response.message)
    //     });
    // }

    componentDidMount() {
        this.getLocalPNRS()
        fetch("https://api.myjson.com/bins/17rcxy")
            .then(res => res.json())
            .then(resJson => {
                console.log("resJson", resJson)
            })
            .catch(err => {
                console.log("Error", err)
            })
    }

    getLocalPNRS = async () => {
        const that = this
        if (chrome && chrome.storage) {
            chrome.storage.local.get("pnrs", function (pnrsObj) {
                console.log('Retrived successfully: ', pnrsObj.pnrs);
                that.setState({
                    pnrs: pnrsObj.pnrs || []
                })
            })
        }
    }

    isDuplicate = (pnr) => {
        const { pnrs } = this.state
        let isDuplicate = false
        pnrs.forEach(eachPnr => {
            if (eachPnr.pnr === pnr) {
                isDuplicate = true
            }
        })

        return isDuplicate
    }

    grabPNR = async () => {
        if (chrome && chrome.storage) {
            chrome.runtime.sendMessage({ message: "GET_PNR" }, function (response) {
                if (response.message && response.message.pnr && !this.isDuplicate(response.message.pnr)) {
                    const newPnrs = [response.message, ...this.state.pnrs]
                    this.saveToChromeStorage('pnrs', newPnrs)
                    this.setState({
                        pnrs: newPnrs
                    })
                }
            }.bind(this));
        } else {
            var pnr = "PNRPNR" //+ Math.random()
            if (!this.isDuplicate(pnr)) {
                var firstName = "First Name" + Math.random()
                var lastName = "Last Name" + Math.random()
                var pnr = "PNRPNR" //+ Math.random()
                this.setState({
                    pnrs: [{ firstName, lastName, pnr }, ...this.state.pnrs]
                })
            }
        }
    }

    fillManualCC = async () => {
        if (chrome && chrome.storage) {
            chrome.runtime.sendMessage({ message: "MANUAL_CC" }, function (response) {
                // if(response.message && response.message.pnr){
                //     const newPnrs = [response.message,...this.state.pnrs]
                //     this.saveToChromeStorage('pnrs',newPnrs)
                //     this.setState({
                //         pnrs: newPnrs
                //     })
                // }
            }.bind(this));
        } else {
            // var firstName = "First Name" + Math.random()
            // var lastName = "Last Name" + Math.random()
            // var pnr = "PNR" + Math.random()
            // this.setState({
            //     pnrs: [{ firstName, lastName, pnr },...this.state.pnrs]
            // })
        }
    }

    // applyPNR = async (id) => {
    //     // everything is "in view"  
    //     chrome.runtime.sendMessage({message: "GET_PNR"}, function(response) {
    //         console.log('response: ', response);
    //         this.setState({
    //             pnrs: [...this.state.pnrs,response.message]
    //         },()=>{
    //             chrome.storage.local.set({"pnrs": this.state.pnrs}, function(){
    //                console.log("Saved Data Successfully")
    //             });
    //             localStorage.setItem("Settingthe PNR here",JSON.stringify(this.state.pnrs))
    //         })
    //     }.bind(this));
    // }

    applyPNR = async (index) => {
        console.log('Applying PNR', this.state.pnrs[index]);
        chrome.runtime.sendMessage({ message: "APPLY_PNR", pnr: this.state.pnrs[index] }, function (response) {
            // console.log('response: ', response);
            // this.setState({
            //     pnrs: [...this.state.pnrs,response.message]
            // },()=>{
            //     chrome.storage.local.set({"pnrs": this.state.pnrs}, function(){
            //        console.log("Saved Data Successfully")
            //     });
            //     localStorage.setItem("Settingthe PNR here",JSON.stringify(this.state.pnrs))
            // })
        }.bind(this));
    }

    ctmLogin = async () => {
        chrome.runtime.sendMessage({ message: "CTM_LOGIN" }, function (response) {
            console.log("CTM LOGIN",response)
        }.bind(this));
    }

    close = async () => {
        chrome.runtime.sendMessage({ message: "CLOSE" }, function (response) {
        }.bind(this));
    }

    saveToChromeStorage = async (key, value) => {
        if (chrome && chrome.storage) {
            chrome.storage.local.set({ [key]: value }, function () {
                console.log("Saved Data Successfully")
            });
        }
    }

    deletePnr = async (pnr) => {
        const pnrs = this.state.pnrs
        let newPnrs = []
        pnrs.forEach(eachPnr => {
            if (eachPnr.pnr !== pnr) {
                newPnrs.push(eachPnr)
            }
        })
        this.saveToChromeStorage('pnrs', newPnrs)
        this.setState({
            pnrs: newPnrs
        })
    }

    exportPNRs = () => {
        const {pnrs} = this.state
        const pnrsAsCSV = [["First Name", "Last Name", "PNR"]]
        pnrs.map(eachPnr=>{
            pnrsAsCSV.push([eachPnr.firstName,eachPnr.lastName,eachPnr.pnr])
        })

        let csvContent = "data:text/csv;charset=utf-8,"
            + pnrsAsCSV.map(e => e.join(",")).join("\n");

        var encodedUri = encodeURI(csvContent);
        window.open(encodedUri);

    }

    render() {
        return (
            <>
                <style>{styles}</style>
                <div id="ext--dialogue">
                    <div className="container">
                        {/* <h1>Extension Shell</h1> */}
                        {/* { message && <p>Random { message }</p>} */}
                        {/* <button onClick={handleMessage}>Change BackGround Color</button> */}
                        <div style={{ display: 'flex' }}>
                            <div style={{ marginBottom: '20px' }} ><span className='cell btn' onClick={() => this.grabPNR()}>Scrap PNR</span></div>
                            <div style={{ marginBottom: '20px' }} ><span className='cell btn' onClick={() => this.ctmLogin()}>99582114</span></div>
                            <div style={{ marginBottom: '20px' }} ><span className='cell btn' onClick={() => this.fillManualCC()}>MCC</span></div>
                            <div style={{ marginBottom: '20px' }} ><span className='cell btn' onClick={() => this.exportPNRs()}>Export</span></div>
                            <div style={{ marginBottom: '20px' }} ><span className='cell btn' onClick={() => this.close()}>Close</span></div>
                        </div>
                        {
                            this.state.pnrs.map((eachPnr, index) => {
                                const { firstName = "", lastName = "", pnr = "" } = eachPnr
                                return (
                                    <div className='table'>
                                        <span className='table' onClick={() => this.applyPNR(index)}>
                                            {/* <span className='btn apply' onClick={() => this.applyPNR(index)}>Apply ▶</span> */}
                                            <span className='cell'>{firstName.slice(0, 10)}</span>
                                            <span className='cell'>{lastName.slice(0, 10)}</span>
                                            <span className='cell pnr'>{pnr.toUpperCase().slice(0, 10)}</span>
                                        </span>
                                        <span className='btn delete' onClick={() => this.deletePnr(pnr)}>X</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }

}

// function App() {
//     const [ message, setMessage ] = useState(false);

//     let handleMessage = async () => {
//         // everything is "in view"  
//         chrome.runtime.sendMessage({message: "click"}, function(response) {
//             console.log('response: ', response);
//             setMessage(response.message)
//         });
//     }

//     let grabPNR = async () => {
//         // everything is "in view"  
//         chrome.runtime.sendMessage({message: "GET_PNR"}, function(response) {
//             console.log('GOT PNR: ', response);
//             // setMessage(response.message)
//         });
//     }




//     return (
//         <>
//             <style>{styles}</style>
//             <div id="ext--dialogue">
//                 <div>
//                     <h1>Extension Shell</h1>
//                     { message && <p>Random { message }</p>}
//                     <button onClick={handleMessage}>Change BackGround Color</button>
//                     <button onClick={grabPNR}>GET PNR</button>
//                 </div>
//             </div>  
//         </>
//     )
// }

export default App;