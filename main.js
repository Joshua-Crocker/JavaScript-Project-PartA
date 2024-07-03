"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const $ = selector => document.querySelector(selector);

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

    // Attach event listeners to radio buttons
    radioB.addEventListener("click", () => changeDiv(divB));
    radioD.addEventListener("click", () => changeDiv(divD));
    radioE.addEventListener("click", () => changeDiv(divE));
    radioF.addEventListener("click", () => changeDiv(divF));
    radioG.addEventListener("click", () => changeDiv(divG));
});
