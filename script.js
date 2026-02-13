// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const pdfUpload = document.getElementById('pdf-upload');
const classifyButton = document.getElementById('classify-button');
const resultDiv = document.getElementById('result');

classifyButton.addEventListener('click', async () => {
    const file = pdfUpload.files[0];
    if (!file) {
        alert('Pilih file PDF terlebih dahulu!');
        return;
    }

    try {
        const text = await extractTextFromPDF(file);
        const classified = classifyRHK(text);
        displayResults(classified);
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
});

async function extractTextFromPDF(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = async (e) => {
            try {
                const pdf = await pdfjsLib.getDocument(e.target.result).promise;
                let fullText = '';

                for (let i = 0; i < pdf.numPages; i++) {
                    const page = await pdf.getPage(i + 1);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map(item => item.str).join(' ');
                    fullText += pageText + ' ';
                }

                resolve(fullText);
            } catch (error) {
                reject(new Error('Gagal membaca PDF: ' + error.message));
            }
        };
        reader.readAsArrayBuffer(file);
    });
}

function classifyRHK(text) {
    const rhkPattern = /RHK\s+(\d+)/gi;
    const matches = text.matchAll(rhkPattern);

    const classified = {
        rhk1: [],
        rhk2: [],
        rhk3: [],
        rhk4: []
    };

    let currentRHK = null;
    const lines = text.split(/[\n.!?]/);

    for (const line of lines) {
        const match = line.match(/RHK\s+(\d+)/i);
        if (match) {
            currentRHK = 'rhk' + match[1];
        } else if (currentRHK && line.trim()) {
            if (classified[currentRHK]) {
                classified[currentRHK].push(line.trim());
            }
        }
    }

    return classified;
}

function displayResults(classified) {
    let html = '<h3>Hasil Pengelompokan RHK:</h3>';
    let totalCount = 0;

    for (const [key, items] of Object.entries(classified)) {
        const rhkNum = key.replace('rhk', '');
        const count = items.length;
        totalCount += count;
        
        html += `<div class="rhk-result">
            <h4>RHK ${rhkNum} (${count} item)</h4>
            <ul>`;
        
        items.forEach(item => {
            if (item.length > 0) {
                html += `<li>${item.substring(0, 100)}${item.length > 100 ? '...' : ''}</li>`;
            }
        });
        
        html += `</ul></div>`;
    }

    html += `<p><strong>Total Item: ${totalCount}</strong></p>`;
    html += `<button onclick="exportJSON('${JSON.stringify(classified).replace(/'/g, "\\'")}'')">Export JSON</button>`;
    
    resultDiv.innerHTML = html;
}

function exportJSON(data) {
    const parsed = JSON.parse(data.replace(/\\'/g, "'"));
    const jsonString = JSON.stringify(parsed, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rhk_result.json';
    a.click();
    URL.revokeObjectURL(url);
}