const Jimp = require('jimp');

Jimp.read('public/trong_dong_bg.png')
    .then(img => {
        const w = img.bitmap.width;
        const h = img.bitmap.height;
        
        // CPLQG drum image usually has white/grey lines on transparent or blue bg.
        // We will make all non-transparent pixels bright yellow, keeping their original alpha or brightness.
        
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const hex = img.getPixelColor(x, y);
                const rgb = Jimp.intToRGBA(hex);
                
                // If the image is white lines on transparent, alpha is important
                // If it's a solid image, we need to extract lightness
                
                const lightness = (rgb.r + rgb.g + rgb.b) / 3;
                
                // We want yellow: R:255, G:220, B:0
                // If alpha is > 0, we tint it yellow
                if (rgb.a > 10) {
                    // Let's just make it purely yellow but keep the alpha unchanged
                    // or if it's solid, use lightness as alpha
                    let newAlpha = rgb.a;
                    if (rgb.a === 255 && lightness < 100) {
                        // If it's a solid dark background, make it transparent
                        newAlpha = 0;
                    } else if (rgb.a === 255) {
                        // Light line on solid background -> use lightness as alpha
                        newAlpha = Math.min(255, lightness * 1.5);
                    }
                    
                    img.setPixelColor(Jimp.rgbaToInt(255, 230, 50, newAlpha), x, y);
                }
            }
        }
        
        return img.writeAsync('public/trong_dong_yellow.png');
    })
    .then(() => {
        console.log('Successfully generated public/trong_dong_yellow.png');
    })
    .catch(err => {
        console.error('Error:', err);
    });
