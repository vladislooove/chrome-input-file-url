'use strict';

function getFileInputs() {
  return Array.from(document.querySelectorAll('input[type="file"]'));
};

function FileListItems (files) {
  const b = new ClipboardEvent("").clipboardData || new DataTransfer()
  for (let i = 0, len = files.length; i<len; i++) b.items.add(files[i])
  return b.files
};

function transformInput(node) {
  const isTransformed = node.getAttribute('data-input-url-transformed');

  if (isTransformed) {
    return;
  }

  node.setAttribute('data-input-url-transformed', true);

  const urlInput = document.createElement('input');
  
  urlInput.addEventListener('input', async (event) => {
    const blob = await fetch(event.target.value).then(r => r.blob());
    node.files = new FileListItems([new File([blob], event.target.value)]);
  });

  node.parentNode.appendChild(urlInput);
}

function transformInputs() {
  const inputs = getFileInputs();
  inputs.forEach(transformInput);
}


transformInputs();