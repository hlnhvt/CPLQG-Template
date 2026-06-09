const https = require('https');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function main() {
    const urls = {
        'gioi-thieu': 'https://chuyentrangpbgdpl-netlify-app.translate.goog/gioi-thieu?_x_tr_sl=auto&_x_tr_tl=vi&_x_tr_hl=vi',
        'tin-tuc': 'https://chuyentrangpbgdpl-netlify-app.translate.goog/tin-tuc-gioi-thieu-van-ban-moi?_x_tr_sl=auto&_x_tr_tl=vi&_x_tr_hl=vi',
        'hoi-dong': 'https://chuyentrangpbgdpl-netlify-app.translate.goog/hoi-dong-phoi-hop?_x_tr_sl=auto&_x_tr_tl=vi&_x_tr_hl=vi'
    };

    for (const [key, url] of Object.entries(urls)) {
        try {
            console.log(`Fetching ${key}...`);
            const html = await fetchUrl(url);
            // Just extract the main content area (e.g., looking for generic classes)
            const match = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) || html.match(/<div class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
            if (match) {
                console.log(`--- ${key} ---`);
                console.log(match[1].substring(0, 500));
            } else {
                console.log(`--- ${key} ---`);
                console.log("Could not find main content. Sample:", html.substring(0, 500));
            }
        } catch (e) {
            console.error(`Error fetching ${key}:`, e.message);
        }
    }
}

main();
