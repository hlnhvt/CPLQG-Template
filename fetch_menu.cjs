const https = require('https');

https.get('https://chuyentrangpbgdpl.netlify.app/', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        // Find the main nav menu
        const navRegex = /<ul class="main-nav-menu">([\s\S]*?)<\/ul>/;
        const match = data.match(navRegex);
        if (match) {
            const navHtml = match[1];
            // Extract items and sub-items
            const items = [];
            const itemRegex = /<li class="main-nav-item[^>]*>([\s\S]*?)<\/li>(?=\s*<li|\s*$)/g;
            let itemMatch;
            while ((itemMatch = itemRegex.exec(navHtml)) !== null) {
                const itemHtml = itemMatch[1];
                const labelMatch = itemHtml.match(/<a[^>]*class="main-nav-link"[^>]*>([\s\S]*?)<\/a>/);
                if (labelMatch) {
                    const label = labelMatch[1].replace(/<[^>]+>/g, '').trim();
                    
                    const subItems = [];
                    const subMenuRegex = /<ul class="mega-dropdown-grid">([\s\S]*?)<\/ul>/;
                    const subMenuMatch = itemHtml.match(subMenuRegex);
                    
                    if (subMenuMatch) {
                        const subItemRegex = /<a[^>]*class="mega-dropdown-item"[^>]*>([\s\S]*?)<\/a>/g;
                        let subMatch;
                        while ((subMatch = subItemRegex.exec(subMenuMatch[1])) !== null) {
                            subItems.push(subMatch[1].replace(/<[^>]+>/g, '').trim());
                        }
                    } else {
                        // Check for regular dropdown
                        const regularDropdownRegex = /<ul class="dropdown-menu">([\s\S]*?)<\/ul>/;
                        const regularMatch = itemHtml.match(regularDropdownRegex);
                        if (regularMatch) {
                            const subItemRegex = /<a[^>]*class="dropdown-item"[^>]*>([\s\S]*?)<\/a>/g;
                            let subMatch;
                            while ((subMatch = subItemRegex.exec(regularMatch[1])) !== null) {
                                subItems.push(subMatch[1].replace(/<[^>]+>/g, '').trim());
                            }
                        }
                    }
                    
                    items.push({ label, subItems });
                }
            }
            console.log(JSON.stringify(items, null, 2));
        } else {
            console.log("No menu found");
        }
    });
}).on('error', err => {
    console.error(err);
});
