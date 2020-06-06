'use strict';

function getFileInputs() {
  console.log(window);
  // return Array.from(window.querySelectorAll('input[type="file"]'));
};

chrome.runtime.onInstalled.addListener(function() {
  const inputs = getFileInputs();
  console.log(inputs);

  const observer = new MutationObserver((mutations) => {
    const newInputs = getFileInputs();
    console.log(newInputs);
  });
});
