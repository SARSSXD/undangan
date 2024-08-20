import { util } from './util.js';

export const progress = (() => {
    let info = null;
    let bar = null;

    let total = 0;
    let loaded = 0;

    const updateProgress = () => {
        loaded += 1;

        bar.style.width = Math.min((loaded / total) * 100, 100).toString() + "%";
        info.innerText = `Loading assets (${loaded}/${total}) [${parseInt((loaded / total) * 100).toFixed(0)}%]`;

        if (loaded === total) {
            util.show(); // Menghilangkan halaman pemuatan
        }
    };

    const init = () => {
        const assets = document.querySelectorAll('img');

        info = document.getElementById('progress-info');
        bar = document.getElementById('progress-bar');

        info.style.display = 'block';
        total = assets.length;

        if (total === 0) {
            // Jika tidak ada gambar, langsung panggil updateProgress
            updateProgress();
            return;
        }

        assets.forEach((asset) => {
            if (asset.complete && asset.naturalWidth !== 0) {
                updateProgress();
            } else {
                asset.addEventListener('load', updateProgress);
            }
        });
    };

    return {
        init
    };
})();
