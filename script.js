function compilerHTML(field) {
    document.getElementById('mainoutput').innerHTML = field.value;
}
function compilerCSS(field) {
    const styleTag = document.getElementById('styling');
    let cssCode=field.value;
    cssCode = cssCode.replace(/\*/g, '#mainoutput');
    cssCode = cssCode.replace(/body/g, '#mainoutput');
    styleTag.innerHTML = cssCode; 
}
function compilerSCRIPT(field) {
    const scriptTag = document.getElementById('s');
    scriptTag.innerHTML = field.value;
    try {
        eval(scriptTag.innerHTML);
    } catch (error) {
        document.getElementById('mainoutput').innerHTML = `<pre style="color: red;">${error}</pre>`;
    }
}
function compilerjsSCRIPT(field) {
    document.getElementById('mainoutput').innerHTML='';
    const scriptTag = document.getElementById('s');
    scriptTag.innerHTML = field.value;
    console.oldLog = console.log;    
    console.log = function(message) {
        document.getElementById('mainoutput').innerHTML += `<pre>${message}</pre>`;
        console.oldLog.apply(console, arguments);
    };
    window.displayOutput = function(message) {
        document.getElementById('mainoutput').innerHTML += `<pre>${message}</pre>`;
    };
    try {
        eval(scriptTag.innerHTML);
    } catch (error) {
        document.getElementById('mainoutput').innerHTML = `<pre style="color: red;">${error}</pre>`;
    }
}
function clearAll() {
    document.querySelectorAll('textarea').forEach(textarea => textarea.value = '');
    document.getElementById('mainoutput').innerHTML = '';
    document.getElementById('styling').innerHTML = '';
    document.getElementById('s').innerHTML = '';
}
function saveCode() {
    let filename=prompt("Enter file name","code");
    const html = document.querySelector('textarea[placeholder="Html"]').value;
    const css = document.querySelector('textarea[placeholder="css"]').value;
    const js = document.querySelector('textarea[placeholder="js"]').value;
    const blob = new Blob([html, `<style>${css}</style>`, `<script>${js}<\/script>`], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename+'.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
function saveJavascriptCode() {
    let filename = prompt("Enter file name", "code");
    let publisher = prompt("Enter publisher name", "Unknown");
    const js = document.querySelector('textarea[placeholder="js"]').value;
    const metadataComment = `// Author: ${publisher}\n\n`;
    const content = metadataComment + js;
    const blob = new Blob([content], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename + '.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
