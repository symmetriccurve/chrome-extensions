let _on = false, // extension isn't on
    _react = "asset-manifest.json"; // react manifest
    hostDocument = null;
    passengerName = '';
    pnr= '';
    tabId= null;

let readTextFile = (file, callback) => {
    // file has to be in the root (/public)
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
let disable = (tab) => {
    let code = `document.querySelector('#jk--chrome--extension').remove()`;

	chrome.tabs.executeScript(tab.id, {code: code});
    chrome.browserAction.setBadgeText({text: '', tabId: tab.id});
}


let enable = (tab) => {
    // get the REACT manifest
    // debugger
    // hostDocument = document
    // console.log('document: ', document);
    tabId = tab.id
    readTextFile(_react, function(text) {
        let _data = JSON.parse(text),
            _keys = Object.keys(_data.files),
            _js = [_data.files['main.js'],_data.files[_keys[3]],_data.files[_keys[5]]];
    	
    	// inject all the JS files required
    	_js.forEach(file => {
    	    chrome.tabs.executeScript(tab.id, {
    		    file: file
        	});
        })

        
        // inject styles
    	chrome.tabs.insertCSS(tab.id, {
        	file: _data.files['main.css']
    	});
    	
    	// badge
        chrome.browserAction.setBadgeText({text: 'ON', tabId: tab.id});
        chrome.browserAction.setBadgeBackgroundColor({color: 'crimson'});
	});
}

// function doStuffWithDom(domContent) {
//     console.log('I received the following DOM content:\n' + domContent);
// }

// extension clicked on/off
chrome.browserAction.onClicked.addListener((tab) => {
    (_on) ? disable(tab) : enable(tab);
    _on = !_on;

    let code = `(function () {
        let passengerName = document.getElementsByClassName('reservation-name--person-name')
        let pnr = document.getElementsByClassName('trip-summary-item--confirmation-number')

        if(passengerName && passengerName[0]){
            passengerName = passengerName[0].innerText;
        }else{
            passengerName = "NO NAME"
        }

        if(pnr && pnr[0]){
            pnr = pnr[0].innerText;
        }else{
            pnr = "NOTFOU"  
        }
        return { passengerName, pnr }
      })();`;

    chrome.tabs.executeScript(tab.id, { code }, function (result) {
        if(result[0].passengerName !== "NO NAME" && result[0].pnr !== "NOTFOU"){
            console.log('FOUND PASSENGER AND PNR ON THE HOST PAGE', result);
            passengerName = result[0].passengerName
            pnr = result[0].pnr   
        }else{
            console.log("CHANGE PAGE FOUND. . .AWAITING TO APPLY PNR");
        }
    });

//     chrome.tabs.query({active: true, currentWindow:true},function(tabs) {
//         debugger
//         var activeTab = tabs[0];
//         console.log('activeTab: ', activeTab);
//         chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"},doStuffWithDom);
//    });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.message == "GET_PNR"){

            let firstName= passengerName.split(' ')[0]
            let lastName= passengerName.split(' ')[1]

            sendResponse({ message : {
                firstName,
                lastName,
                pnr
            } });

            //     chrome.tabs.query({active: true, currentWindow:true},function(tabs) {
            //         debugger
            //         var activeTab = tabs[0];
            //         console.log('activeTab: ', activeTab);
            //         chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"},function(domContent){
            //             console.log("domContent",domContent)
            //         });
            // });
        }else if(request.message == "APPLY_PNR"){
            let {firstName,lastName, pnr } = request.pnr
            let code = `(function () {
                console.log("This should be applied to the HOST web","${firstName}","${lastName}")

                var event = new Event('input', {
                    bubbles: true,
                    cancelable: true,
                });

                // Widget page
                if(document.getElementById('LandingAirReservationSearchForm_passengerFirstName_change-cancel')){
                    document.getElementById('LandingAirReservationSearchForm_passengerFirstName_change-cancel').value="${firstName}";
                    document.getElementById('LandingAirReservationSearchForm_passengerLastName_change-cancel').value="${lastName}";
                    document.getElementById('LandingAirReservationSearchForm_confirmationNumber_change-cancel').value="${pnr}";

                    document.getElementById('LandingAirReservationSearchForm_passengerFirstName_change-cancel').dispatchEvent(event);
                    document.getElementById('LandingAirReservationSearchForm_passengerLastName_change-cancel').dispatchEvent(event);
                    document.getElementById('LandingAirReservationSearchForm_confirmationNumber_change-cancel').dispatchEvent(event);

                    return "Success"
                }

                if(document.getElementById('confirmationNumber')){
                    //Change page
                    document.getElementById('confirmationNumber').value="${pnr}";
                    document.getElementById('passengerFirstName').value="${firstName}";
                    document.getElementById('passengerLastName').value="${lastName}";

                    document.getElementById('confirmationNumber').dispatchEvent(event);
                    document.getElementById('passengerFirstName').dispatchEvent(event);
                    document.getElementById('passengerLastName').dispatchEvent(event);
                    return "Success"
                }
                
                return "Failed"
              })();`;

            chrome.tabs.executeScript(tabId, { code }, function (result) {
                console.log('Status of Apply PNR', result);
            });

        }else if(request.message == "MANUAL_CC"){

            let code = `(function () {
                var event = new Event('input', {
                    bubbles: true,
                    cancelable: true,
                });
                
                const inputsFields = [
                    {
                        id: 'creditCardType',
                        value: "MasterCard"
                    },
                    {
                        id: 'creditCardNumber',
                        value: "5454545454545454"
                    },
                    {
                        id: 'creditCardExpirationDateMonth',
                        value: "June"
                    },
                    {
                        id: 'creditCardExpirationDateYear',
                        value: "2021"
                    },
                    {
                        id: 'creditCardFirstNameOnCard',
                        value: "First Name"
                    },
                    {
                        id: 'creditCardLastNameOnCard',
                        value: "Last Name"
                    },
                    {
                        id: 'creditCardStreetAddress',
                        value: "123 Main Street"
                    },
                    {
                        id: 'creditCardCityTown',
                        value: "Ghost Town"
                    },
                    {
                        id: 'creditCardState',
                        value: "Alabama"
                    },
                    {
                        id: 'creditCardZipCode',
                        value: "12345"
                    },
                    {
                        id: 'creditCardPhoneNumber',
                        value: "1234567890"
                    }
                ]
                
                inputsFields.forEach(input=>{
                    let element = document.getElementById(input.id)
                    element.value = input.value
                    element.dispatchEvent(event);
                })
                return "Success"
              })();`;

            chrome.tabs.executeScript(tabId, { code }, function (result) {
                console.log('Status of Apply manual CC', result);
            });

        }else if(request.message === "CTM_LOGIN"){
            let code = `(function () {
                var event = new Event('input', {
                    bubbles: true,
                    cancelable: true,
                });
                
                const inputsFields = [
                    {
                        id: 'TravelManagerLoginForm_companyId',
                        value: "99582114"
                    },
                    {
                        id: 'firstName',
                        value: "John"
                    },
                    {
                        id: 'lastName',
                        value: "Doe"
                    },
                    {
                        id: 'TravelManagerLoginForm_password',
                        value: "Test1234"
                    }
                ]
                
                inputsFields.forEach(input=>{
                    let element = document.getElementById(input.id)
                    element.value = input.value
                    element.dispatchEvent(event);
                })
                document.getElementById("TravelManagerLoginForm_submitButton").click()
                return "Success"
              })();`;

            chrome.tabs.executeScript(tabId, { code }, function (result) {
                console.log('PUT Log in CTM credentials', result);
            });

        }if(request.message === "CLOSE"){
            let code = `document.querySelector('#jk--chrome--extension').remove()`;

            chrome.tabs.executeScript(tabId, {code: code});
            chrome.browserAction.setBadgeText({text: '', tabId});
            chrome.browserAction.setBadgeBackgroundColor({color: 'black'});
        }
        else{
            sendResponse({ message : Math.floor(Math.random() * 10 + 1) });
        }
      
        return true;
    }
);