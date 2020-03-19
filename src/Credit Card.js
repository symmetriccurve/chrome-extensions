//Credit Card 
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

// let creditCardType = document.getElementById("creditCardType")
// let creditCardNumber = document.getElementById("creditCardNumber")
// let creditCardExpirationDateMonth = document.getElementById("creditCardExpirationDateMonth")
// let creditCardExpirationDateYear = document.getElementById("creditCardExpirationDateYear")
// let creditCardFirstNameOnCard = document.getElementById("creditCardFirstNameOnCard")
// let creditCardLastNameOnCard = document.getElementById("creditCardLastNameOnCard")

// creditCardType.value = "MasterCard"
// creditCardNumber.value = "5454545454545454"
// creditCardExpirationDateMonth.value = "June"
// creditCardExpirationDateYear.value = "2021"
// creditCardFirstNameOnCard.value = "First Name"
// creditCardLastNameOnCard.value = "Last Name"


// Billing Address
let creditCardStreetAddress = document.getElementById("creditCardStreetAddress")
let creditCardCityTown = document.getElementById("creditCardCityTown")
let creditCardState = document.getElementById("creditCardState")
let creditCardZipCode = document.getElementById("creditCardZipCode")
let creditCardPhoneNumber = document.getElementById("creditCardPhoneNumber")

creditCardStreetAddress.value = "123 Main Street"
creditCardCityTown.value = "Ghost Town"
creditCardState.value = "Alabama"
creditCardZipCode.value = "12345"
creditCardPhoneNumber.value = "1234567890"


//IRN
let internalReferenceNumberListBox = document.getElementById("internalReferenceNumberListBox")
internalReferenceNumberListBox.value = "irn1"

//Email
let contactEmailAddress = document.getElementById("contactEmailAddress")
contactEmailAddress.value = "test@test.com"
