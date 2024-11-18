const PDFMerger = require('pdf-merger-js');
const merger = new PDFMerger();

(async (p1, p2)=>{
    await merger.add('01.pdf');
    await merger.add('02.pdf');

    await merger.save('merged.pdf');
})();