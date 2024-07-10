"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const $ = selector => document.querySelector(selector);

    // Array to hold all box cars
    const boxCarArray = [];
    const boxCarCargoManifestArray = [];
    const warehouseCargoManifestArray = [];

    // Get all the divs required
    const divA = $("#divA");
    const divB = $("#divB");
    const divC = $("#divC");
    const divD = $("#divD");
    const divE = $("#divE");
    const divF = $("#divF");
    const divG = $("#divG");

    // Get all the radio buttons required
    const radioB = $("#divBRadio");
    const radioD = $("#divDRadio");
    const radioE = $("#divERadio");
    const radioF = $("#divFRadio");
    const radioG = $("#divGRadio");

    // Get all the inputs for div B (Create box car)
    const boxCarIDInput = $("#boxcarID");
    const tareWeightInput = $("#tareWeight");
    const maxGrossWeightInput = $("#maxGrossWeight");
    const cargoWeightInput = $("#cargoWeight");
    const grossWeightInput = $("#grossWeight");

    // Get all the buttons required for div B (Create box car)
    const processBoxCarBtn = $("#processBoxCar");
    const divBResetFormBtn = $("#divBResetForm");
    const divBReturnToMainPageBtn = $("#divBReturnMainPage");

    // Get all the spans required for div B (Create box car)
    const tareWeightSpan = $("#tareWeightSpan");
    const maxGrossWeightSpan = $("#maxGrossWeightSpan");

    // Get the table for div C (Display All Box Cars)
    const configuredBoxCarTable = $("#configuredBoxCarTable");
    const totalCargoWeightIntValue = $("#totalCargoWeightIntValue");

    // Get all the buttons required for div C (Display All Box Cars)
    // NOT COMPLETED 
    const returnToCreateBoxCar = $("#returnToCreateBoxCar");
    const divCReturnToMainPageBtn = $("#divCReturnMainPage");

    // Get all the inputs required for div D (Create Freight Entry)
    const divDSelectBoxCar = $("#divDSelectBoxCar");
    const divDBoxCarSelected = $("#divDBoxCarSelected");
    const divDTransportID = $("#divDTransportID");
    const divDDescription = $("#divDDescription");
    const divDCargoWeight = $("#divDCargoWeight");

    // Get all the buttons required for div D (Create Freight Entry)
    const processCargoBtn = $("#processCargo");
    const divDResetFormBtn = $("#divDResetForm");
    const divDReturnToMainPageBtn = $("#divDReturnMainPage");

    // get all the spans required for div D (Create Freight Entry)
    const divDTransportIDSpan = $("#divDTransportIdSpan");
    const divDDescriptionSpan = $("#divDDescriptionSpan");
    const divDCargoWeightSpan = $("#divDCargoWeightSpan");

    // Get the table for div E (Boxcar Manifest)
    const boxcarManifestTable = $("#boxCarManifest");

    // Get all the buttons for div E (Boxcar Manifest)
    const divEReturnToMainPageBtn = $("#divEReturnMainPage");


    // Get the table for div F (Warehouse Manifest)
    const warehouseManifestTable = $("#warehouseManifest");

    // Get all the buttons for div F (Warehouse Manifest)
    const divFReturnToMainPageBtn = $("#divFReturnMainPage");

    // Get the table for div G (Complete Freight Status)
    const completeFreightStatusTable = $("#completeFreightStatus");

    // Get all the buttons for div G (Complete Freight Status)
    const divGReturnToMainPageBtn = $("#divGReturnMainPage");

    /* 
        Function that takes in a div, and hides all other divs except for the ones required.

        ****SPECIAL CASE****
        If div B is displayed, div C is ALWAYS displayed with it.
    */
    const changeDiv = (div) => {
        divA.hidden = true;
        divB.hidden = true;
        divC.hidden = true;
        divD.hidden = true;
        divE.hidden = true;
        divF.hidden = true;
        divG.hidden = true;

        div.hidden = false;

        if (div === divB) {
            divC.hidden = false;
        }
    };

    /*
        Function which passes in the Box Car Array.
        Checks if certain conditions are met, if they are, it will append the info to an array, and then to the master array.
        It will then display this information on the Configured Boxcar table.
    */
    const processBoxCar = (boxCarArray) => {
        // Get the value of the Div B, create box car inputs.
        let boxCarIDVal = boxCarIDInput.value;
        let tareWeightVal = parseInt(tareWeightInput.value);
        let maxGrossWeightVal = parseInt(maxGrossWeightInput.value);
        let cargoWeightVal = parseInt(cargoWeightInput.value);
        let grossWeightVal = parseInt(grossWeightInput.value);

        // Set the value of grossWeight.
        grossWeightVal = tareWeightVal + cargoWeightVal;

        // If statements to display errors.
        if (tareWeightVal < 0 || tareWeightVal > 20000) {
            tareWeightSpan.textContent = "TARE Weight must be in the range of 0 to 20000";
        } else if (maxGrossWeightVal < tareWeightVal || maxGrossWeightVal > 200000) {
            maxGrossWeightSpan.textContent = "Must be greater than TARE and must be in range of 0 to 200000";
        // Else statement to proceed with the function.
        } else {
            const currentBoxCar = {
                boxCarID: boxCarIDVal,
                tareWeight: tareWeightVal,
                maxGrossWeight: maxGrossWeightVal,
                cargoWeight: cargoWeightVal,
                grossWeight: grossWeightVal
            };
            boxCarArray.push(currentBoxCar);
            displayConfiguredBoxCars(boxCarArray);
        }
    };

    /*
        Function which takes in boxCarArray.
        Checks to see if a body exists in the table, and if so, deletes it.
        loops through the boxCarArray, gets each object, and then displays the info in the table.

    */
    const displayConfiguredBoxCars = (boxCarArray) => {
        // Check if tbody exists and remove it
        let oldTbody = configuredBoxCarTable.querySelector('tbody');
        if (oldTbody) {
            configuredBoxCarTable.removeChild(oldTbody);
            totalCargoWeightIntValue.textContent = "0";
        }
    
        let tableBody = document.createElement('tbody');
        let totalCargoWeight = 0;
    
        boxCarArray.forEach(boxCar => {
            let tableRow = document.createElement('tr');
            for (let key in boxCar) {
                let tableCell = document.createElement('td');
                tableCell.textContent = boxCar[key];
                tableRow.append(tableCell);
    
                // Check if the key is 'cargoWeight' and add to totalCargoWeight
                if (key === 'cargoWeight') {
                    totalCargoWeight += parseFloat(boxCar[key]);
                }
            }
            tableBody.append(tableRow);
        });
    
        configuredBoxCarTable.append(tableBody);
        totalCargoWeightIntValue.textContent = totalCargoWeight;
    };

    const divDOnStart = (boxCarArray) => {
        divDSelectBoxCar.removeAttribute("disabled");
        boxCarArray.forEach(boxCar => {
            let selectOption = document.createElement('option');
            for (let key in boxCar) {
                if (key === 'boxCarID') {
                    selectOption.value = boxCar[key];
                    selectOption.textContent = boxCar[key];
                }
            }
            divDSelectBoxCar.appendChild(selectOption);
        });
    };

    const divDSelectChange = (boxCarArray) => {
        if (divDTransportID.hasAttribute('disabled') || divDDescription.hasAttribute('disabled') || divDCargoWeight.hasAttribute('disabled')) {
            divDTransportID.removeAttribute('disabled');
            divDDescription.removeAttribute('disabled');
            divDCargoWeight.removeAttribute('disabled');
        }
        divDSelectBoxCar.setAttribute('disabled', 'true');
        let selectedOption = divDSelectBoxCar.value;

        boxCarArray.forEach(boxCar => {
            for (let key in boxCar) {
                if (key === 'boxCarID') {
                    if (boxCar[key] == selectedOption) {
                        console.log(selectedOption);
                        divDBoxCarSelected.textContent = selectedOption;
                        divDBoxCarSelected.value = selectedOption;
                    }
                }
            }
        });
    };

    /*
        Function
    */

    const processCargo = (boxCarCargoManifestArray, boxCarArray, warehouseCargoManifestArray) => {
        // Validate input fields
        if (divDTransportID.value === "") {
            divDTransportIDSpan.textContent = "Must enter a transport ID";
        } else if (divDDescription.value === "") {
            divDDescriptionSpan.textContent = "Must enter a Description";
        } else if (isNaN(divDCargoWeight.value) || parseInt(divDCargoWeight.value) <= 0) {
            divDCargoWeightSpan.textContent = "Cargo weight must be a number and > 0";
        } else {
            const freightEntry = {
                boxCarID: divDBoxCarSelected.value,
                transportID: divDTransportID.value,
                description: divDDescription.value,
                cargoWeight: parseInt(divDCargoWeight.value)
            };
        
            // Find the box car corresponding to the selected boxCarID
            const selectedBoxCar = boxCarArray.find(boxCar => boxCar.boxCarID === divDBoxCarSelected.value);
        
            if (!selectedBoxCar) {
                console.error("Selected box car not found.");
                return;
            }
        
            // Calculate new gross weight if this cargo were added
            const newGrossWeight = selectedBoxCar.tareWeight + selectedBoxCar.cargoWeight + freightEntry.cargoWeight;
        
            if (newGrossWeight <= selectedBoxCar.maxGrossWeight) {
                // Add cargo weight to the selected box car
                selectedBoxCar.cargoWeight += freightEntry.cargoWeight;
                selectedBoxCar.grossWeight = newGrossWeight;
                boxCarCargoManifestArray.push(freightEntry);
                divF.hidden = true;
                divE.hidden = false;
                displayBoxCarManifest(boxCarCargoManifestArray);
            } else {
                // If exceeds max gross weight, add to warehouseCargoManifestArray
                warehouseCargoManifestArray.push(freightEntry);
                console.log(warehouseCargoManifestArray);
                divF.hidden = false;
                divE.hidden = true;
                displayWarehouseManifest(warehouseCargoManifestArray);
            }
            // Update display
            displayConfiguredBoxCars(boxCarArray);
        }
    };

    const displayBoxCarManifest = (boxCarCargoManifestArray) => {
        // Check if tbody exists and remove it
        let oldTbody = boxcarManifestTable.querySelector('tbody');
        if (oldTbody) {
            boxcarManifestTable.removeChild(oldTbody);
            $("#divETotalCargoWeightIntValue").textContent = "0";
        }
    
        let tableBody = document.createElement('tbody');
        let totalCargoWeight = 0;
    
        boxCarCargoManifestArray.forEach(freightEntry => {
            let tableRow = document.createElement('tr');
            for (let key in freightEntry) {
                if (key === 'boxCarID') {
                    continue;
                }
                let tableCell = document.createElement('td');
                tableCell.textContent = freightEntry[key];
                tableRow.append(tableCell);
    
                // Check if the key is 'cargoWeight' and add to totalCargoWeight
                if (key === 'cargoWeight') {
                    totalCargoWeight += parseFloat(freightEntry[key]);
                }
            }
            tableBody.append(tableRow);
        });
    
        boxcarManifestTable.append(tableBody);
        $("#divETotalCargoWeightIntValue").textContent = totalCargoWeight;
    }

    const displayWarehouseManifest = (warehouseCargoManifestArray) => {
        // Check if tbody exists and remove it
        let oldTbody = warehouseManifestTable.querySelector('tbody');
        if (oldTbody) {
            warehouseManifestTable.removeChild(oldTbody);
            $("#divFTotalCargoWeightIntValue").textContent = "0";
        }
    
        let tableBody = document.createElement('tbody');
        let totalCargoWeight = 0;
    
        warehouseCargoManifestArray.forEach(freightEntry => {
            let tableRow = document.createElement('tr');
            for (let key in freightEntry) {
                if (key === 'boxCarID') {
                    continue;
                }
                let tableCell = document.createElement('td');
                tableCell.textContent = freightEntry[key];
                tableRow.append(tableCell);
    
                // Check if the key is 'cargoWeight' and add to totalCargoWeight
                if (key === 'cargoWeight') {
                    totalCargoWeight += parseFloat(freightEntry[key]);
                }
            }
            tableBody.append(tableRow);
        });
    
        warehouseManifestTable.append(tableBody);
        $("#divFTotalCargoWeightIntValue").textContent = totalCargoWeight;
    };

    const displayCompleteFreightStatus = (boxCarCargoManifestArray, warehouseCargoManifestArray) => {
        // Check if tbody exists and remove ot
        let oldTbody = completeFreightStatusTable.querySelector('tbody');
        if (oldTbody) {
            completeFreightStatusTable.removeChild('tbody');
        }

        let tableBody = document.createElement('tbody');

        boxCarCargoManifestArray.forEach(boxCar => {
            let boxCarID = "";
            let tableRow = document.createElement('tr');
            for (let key in boxCar) {
                if (key === 'boxCarID') {
                    boxCarID = boxCar[key];
                    continue;
                }
                let tableCell = document.createElement('td');
                tableCell.textContent = boxCar[key];
                tableRow.append(tableCell);
            }
            let tableCellStatus = document.createElement('td');
            tableCellStatus.textContent = boxCarID;
            tableRow.append(tableCellStatus);
            tableBody.append(tableRow);
        });

        warehouseCargoManifestArray.forEach(freightEntry => {
            let tableRow = document.createElement('tr');
            for (let key in freightEntry) {
                if (key === 'boxCarID') {
                    continue;
                }
                let tableCell = document.createElement('td');
                tableCell.textContent = freightEntry[key];
                tableRow.append(tableCell);
            }
            let tableCellStatus = document.createElement('td');
            tableCellStatus.textContent = 'Warehouse';
            tableRow.append(tableCellStatus);
            tableBody.append(tableRow);
        });

        completeFreightStatusTable.append(tableBody);
    }
    
    /*
        Function which passes in "inputsToReset" and "inputDefaultValue"
        This is a master function to reset forms.
        {inputsToReset} is a list of inputs which need to be reset.
        {inputDefaultValue} is a list of the default values for the inputs that are being reset.
    */
    const resetForm = (inputsToReset, inputDefaultValue) => {
        inputsToReset.forEach(input => {
            inputDefaultValue.forEach(value => {
                input.value = value;
            })
        });
    };

    // Attach event listeners to radio buttons
    radioB.addEventListener("click", () => changeDiv(divB));
    radioD.addEventListener("click", () => changeDiv(divD));
    radioD.addEventListener("click", () => divDOnStart(boxCarArray));
    radioE.addEventListener("click", () => changeDiv(divE));
    radioF.addEventListener("click", () => changeDiv(divF));
    radioG.addEventListener("click", () => changeDiv(divG));
    radioG.addEventListener("click", () => displayCompleteFreightStatus(boxCarCargoManifestArray, warehouseCargoManifestArray));

    // Attach event listeners to buttons
    processBoxCarBtn.addEventListener("click", () => processBoxCar(boxCarArray));
    divBResetFormBtn.addEventListener("click", () => resetForm([boxCarIDInput, tareWeightInput, maxGrossWeightInput], [" ", 0, 0]));
    divBReturnToMainPageBtn.addEventListener("click", () => changeDiv(divA));
    divCReturnToMainPageBtn.addEventListener("click", () => changeDiv(divA));
    divDReturnToMainPageBtn.addEventListener("click", () => changeDiv(divA));
    divEReturnToMainPageBtn.addEventListener("click", () => changeDiv(divA));
    divFReturnToMainPageBtn.addEventListener("click", () => changeDiv(divA));
    divGReturnToMainPageBtn.addEventListener("click", () => changeDiv(divA));
    processCargoBtn.addEventListener("click", () => processCargo(boxCarCargoManifestArray, boxCarArray, warehouseCargoManifestArray));

    // Attach event listeners to select elements
    divDSelectBoxCar.addEventListener("change", () => divDSelectChange(boxCarArray));
});
