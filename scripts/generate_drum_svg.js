import fs from 'fs';

function generateDongSonSVG() {
  const size = 1200;
  const cx = size / 2;
  const cy = size / 2;
  const strokeColor = '#b45309'; // Warm golden-amber bronze
  
  let elements = [];
  
  // Outer rings
  elements.push(`<circle cx="${cx}" cy="${cy}" r="585" stroke="${strokeColor}" stroke-width="4.5" fill="none" />`);
  elements.push(`<circle cx="${cx}" cy="${cy}" r="570" stroke="${strokeColor}" stroke-width="2" fill="none" />`);
  elements.push(`<circle cx="${cx}" cy="${cy}" r="552" stroke="${strokeColor}" stroke-width="1.8" fill="none" />`);

  // Sawtooth outer ring (between 570 and 552)
  const numOuterTeeth = 180;
  for (let i = 0; i < numOuterTeeth; i++) {
    const a1 = (i / numOuterTeeth) * Math.PI * 2;
    const a2 = ((i + 0.5) / numOuterTeeth) * Math.PI * 2;
    const a3 = ((i + 1) / numOuterTeeth) * Math.PI * 2;
    const p1 = `${(cx + 570 * Math.cos(a1)).toFixed(1)},${(cy + 570 * Math.sin(a1)).toFixed(1)}`;
    const p2 = `${(cx + 552 * Math.cos(a2)).toFixed(1)},${(cy + 552 * Math.sin(a2)).toFixed(1)}`;
    const p3 = `${(cx + 570 * Math.cos(a3)).toFixed(1)},${(cy + 570 * Math.sin(a3)).toFixed(1)}`;
    elements.push(`<polyline points="${p1} ${p2} ${p3}" stroke="${strokeColor}" stroke-width="1.2" fill="none" />`);
  }

  // Ring: Tangent dots (Circles with tangent lines)
  elements.push(`<circle cx="${cx}" cy="${cy}" r="535" stroke="${strokeColor}" stroke-width="2" fill="none" />`);
  elements.push(`<circle cx="${cx}" cy="${cy}" r="505" stroke="${strokeColor}" stroke-width="2" fill="none" />`);
  const numDots1 = 64;
  for (let i = 0; i < numDots1; i++) {
    const a = (i / numDots1) * Math.PI * 2;
    const r = 520;
    elements.push(`<circle cx="${(cx + r * Math.cos(a)).toFixed(1)}" cy="${(cy + r * Math.sin(a)).toFixed(1)}" r="4.5" stroke="${strokeColor}" stroke-width="1.5" fill="none" />`);
    elements.push(`<circle cx="${(cx + r * Math.cos(a)).toFixed(1)}" cy="${(cy + r * Math.sin(a)).toFixed(1)}" r="2" fill="${strokeColor}" />`);
  }

  // Ring: Flying Lac Cranes (Chim Lạc bay ngược chiều kim đồng hồ) - Radius 430 to 495
  elements.push(`<circle cx="${cx}" cy="${cy}" r="495" stroke="${strokeColor}" stroke-width="2" fill="none" />`);
  elements.push(`<circle cx="${cx}" cy="${cy}" r="425" stroke="${strokeColor}" stroke-width="2" fill="none" />`);
  const numBirds = 16;
  for (let i = 0; i < numBirds; i++) {
    const angle = ((i / numBirds) * 360).toFixed(1);
    elements.push(`
      <g transform="translate(${cx},${cy}) rotate(${angle}) translate(460, 0)">
        <path d="M-30,-2 Q-15,-20 12,-14 Q32,-8 50,-2 Q28,-1 16,3 Q-6,8 -22,12 Q-16,5 -30,-2 Z" stroke="${strokeColor}" stroke-width="2.2" fill="none" />
        <path d="M-30,-2 Q-48,-14 -60,-10 Q-44,-5 -34,-1" stroke="${strokeColor}" stroke-width="1.8" fill="none" />
        <path d="M-30,-2 Q-52,6 -62,12 Q-46,6 -32,2" stroke="${strokeColor}" stroke-width="1.8" fill="none" />
        <circle cx="28" cy="-3" r="2" fill="${strokeColor}" />
      </g>`);
  }

  // Ring: Sawtooth border
  elements.push(`<circle cx="${cx}" cy="${cy}" r="415" stroke="${strokeColor}" stroke-width="2" fill="none" />`);
  elements.push(`<circle cx="${cx}" cy="${cy}" r="388" stroke="${strokeColor}" stroke-width="2" fill="none" />`);
  const numTeeth2 = 120;
  for (let i = 0; i < numTeeth2; i++) {
    const a1 = (i / numTeeth2) * Math.PI * 2;
    const a2 = ((i + 0.5) / numTeeth2) * Math.PI * 2;
    const a3 = ((i + 1) / numTeeth2) * Math.PI * 2;
    const p1 = `${(cx + 415 * Math.cos(a1)).toFixed(1)},${(cy + 415 * Math.sin(a1)).toFixed(1)}`;
    const p2 = `${(cx + 388 * Math.cos(a2)).toFixed(1)},${(cy + 388 * Math.sin(a2)).toFixed(1)}`;
    const p3 = `${(cx + 415 * Math.cos(a3)).toFixed(1)},${(cy + 415 * Math.sin(a3)).toFixed(1)}`;
    elements.push(`<polyline points="${p1} ${p2} ${p3}" stroke="${strokeColor}" stroke-width="1.2" fill="none" />`);
  }

  // Ring: Meander / Concentric square patterns
  elements.push(`<circle cx="${cx}" cy="${cy}" r="378" stroke="${strokeColor}" stroke-width="2" fill="none" />`);
  elements.push(`<circle cx="${cx}" cy="${cy}" r="328" stroke="${strokeColor}" stroke-width="2" fill="none" />`);
  const numMeander = 40;
  for (let i = 0; i < numMeander; i++) {
    const a = ((i / numMeander) * 360).toFixed(1);
    elements.push(`
      <g transform="translate(${cx},${cy}) rotate(${a}) translate(353, 0)">
        <rect x="-14" y="-9" width="28" height="18" rx="2" stroke="${strokeColor}" stroke-width="1.8" fill="none" />
        <circle cx="0" cy="0" r="3.5" fill="${strokeColor}" />
      </g>`);
  }

  // Inner ring: 10 Flying Cranes
  elements.push(`<circle cx="${cx}" cy="${cy}" r="318" stroke="${strokeColor}" stroke-width="2" fill="none" />`);
  elements.push(`<circle cx="${cx}" cy="${cy}" r="258" stroke="${strokeColor}" stroke-width="2" fill="none" />`);
  const numInnerBirds = 10;
  for (let i = 0; i < numInnerBirds; i++) {
    const angle = ((i / numInnerBirds) * 360).toFixed(1);
    elements.push(`
      <g transform="translate(${cx},${cy}) rotate(${angle}) translate(288, 0) scale(0.78)">
        <path d="M-30,-2 Q-15,-20 12,-14 Q32,-8 50,-2 Q28,-1 16,3 Q-6,8 -22,12 Q-16,5 -30,-2 Z" stroke="${strokeColor}" stroke-width="2.2" fill="none" />
        <path d="M-30,-2 Q-48,-14 -60,-10 Q-44,-5 -34,-1" stroke="${strokeColor}" stroke-width="1.8" fill="none" />
        <circle cx="28" cy="-3" r="2" fill="${strokeColor}" />
      </g>`);
  }

  // Center star border
  elements.push(`<circle cx="${cx}" cy="${cy}" r="248" stroke="${strokeColor}" stroke-width="2" fill="none" />`);
  elements.push(`<circle cx="${cx}" cy="${cy}" r="215" stroke="${strokeColor}" stroke-width="1.8" fill="none" />`);
  const numTeethCenter = 60;
  for (let i = 0; i < numTeethCenter; i++) {
    const a1 = (i / numTeethCenter) * Math.PI * 2;
    const a2 = ((i + 0.5) / numTeethCenter) * Math.PI * 2;
    const a3 = ((i + 1) / numTeethCenter) * Math.PI * 2;
    const p1 = `${(cx + 248 * Math.cos(a1)).toFixed(1)},${(cy + 248 * Math.sin(a1)).toFixed(1)}`;
    const p2 = `${(cx + 215 * Math.cos(a2)).toFixed(1)},${(cy + 215 * Math.sin(a2)).toFixed(1)}`;
    const p3 = `${(cx + 248 * Math.cos(a3)).toFixed(1)},${(cy + 248 * Math.sin(a3)).toFixed(1)}`;
    elements.push(`<polyline points="${p1} ${p2} ${p3}" stroke="${strokeColor}" stroke-width="1.2" fill="none" />`);
  }

  // 14-Point Sun Star (Ngôi sao 14 cánh)
  const numPoints = 14;
  const outerR = 205;
  const innerR = 55;
  let starPoints = [];
  for (let i = 0; i < numPoints * 2; i++) {
    const r = (i % 2 === 0) ? outerR : innerR;
    const a = (i / (numPoints * 2)) * Math.PI * 2 - Math.PI / 2;
    starPoints.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  elements.push(`<polygon points="${starPoints.join(' ')}" stroke="${strokeColor}" stroke-width="3" fill="none" />`);

  // Triangular rays between points
  for (let i = 0; i < numPoints; i++) {
    const a = (i / numPoints) * Math.PI * 2 - Math.PI / 2 + (Math.PI / numPoints);
    const rTip = 198;
    const aBase1 = a - (Math.PI / (numPoints * 1.5));
    const aBase2 = a + (Math.PI / (numPoints * 1.5));
    const p1 = `${(cx + innerR * Math.cos(aBase1)).toFixed(1)},${(cy + innerR * Math.sin(aBase1)).toFixed(1)}`;
    const p2 = `${(cx + rTip * Math.cos(a)).toFixed(1)},${(cy + rTip * Math.sin(a)).toFixed(1)}`;
    const p3 = `${(cx + innerR * Math.cos(aBase2)).toFixed(1)},${(cy + innerR * Math.sin(aBase2)).toFixed(1)}`;
    elements.push(`<polyline points="${p1} ${p2} ${p3}" stroke="${strokeColor}" stroke-width="1.5" fill="none" />`);
  }

  // Core circle
  elements.push(`<circle cx="${cx}" cy="${cy}" r="45" stroke="${strokeColor}" stroke-width="2.5" fill="none" />`);
  elements.push(`<circle cx="${cx}" cy="${cy}" r="22" stroke="${strokeColor}" stroke-width="2" fill="none" />`);
  elements.push(`<circle cx="${cx}" cy="${cy}" r="6" fill="${strokeColor}" />`);

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="100%" height="100%">
  ${elements.join('\n  ')}
</svg>`;

  fs.writeFileSync('public/dong_son_drum.svg', svgContent);
  console.log('Successfully written public/dong_son_drum.svg');
}

generateDongSonSVG();
