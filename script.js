const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const controls = document.getElementById('controls');
const widthInput = document.getElementById('width-input');
const heightInput = document.getElementById('height-input');
const downloadBtn = document.getElementById('download-btn');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let originalImage = new Image();

// Trigger file input
dropZone.onclick = () => fileInput.click();

fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        originalImage.src = event.target.result;
        originalImage.onload = () => {
            // Default sizes set karna
            widthInput.value = originalImage.width;
            heightInput.value = originalImage.height;
            controls.style.display = 'grid';
            dropZone.querySelector('p').innerText = "File Selected: " + file.name;
        };
    };
    reader.readAsDataURL(file);
};

downloadBtn.onclick = () => {
    const w = parseInt(widthInput.value);
    const h = parseInt(heightInput.value);

    canvas.width = w;
    canvas.height = h;

    // Draw image to canvas with new size
    ctx.drawImage(originalImage, 0, 0, w, h);

    // Download process
    const link = document.createElement('a');
    link.download = 'resized-image.jpg';
    link.href = canvas.toDataURL('image/jpeg', 0.9);
    link.click();
};
