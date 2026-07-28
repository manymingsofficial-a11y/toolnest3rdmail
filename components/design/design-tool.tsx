'use client';

import * as React from 'react';
import { Copy, Check, Download, Upload} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export type DesignToolConfig = {
  slug: string;
  label: string;
  description: string;
  showColorPicker: boolean;
  showGradientControls: boolean;
  showGlassControls: boolean;
  showNeumorphControls: boolean;
  showButtonControls: boolean;
  showShadowControls: boolean;
  showBorderRadiusControls: boolean;
  showSvgInput: boolean;
  showImageInput: boolean;
  showPlaceholderControls: boolean;
  showPaletteGenerator: boolean;
  actionLabel: string;
};

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}

export function DesignTool({ config }: { config: DesignToolConfig }) {
  const [baseColor, setBaseColor] = React.useState('#3b82f6');
  const [color2, setColor2] = React.useState('#8b5cf6');
  const [angle, setAngle] = React.useState(135);
  const [radius, setRadius] = React.useState(16);
  const [blur, setBlur] = React.useState(20);
  const [opacity, setOpacity] = React.useState(15);
  const [borderWidth, setBorderWidth] = React.useState(1);
  const [shadowX, setShadowX] = React.useState(0);
  const [shadowY, setShadowY] = React.useState(4);
  const [shadowBlur, setShadowBlur] = React.useState(10);
  const [shadowSpread, setShadowSpread] = React.useState(0);
  const [shadowColor, setShadowColor] = React.useState('#000000');
  const [buttonText, setButtonText] = React.useState('Click Me');
  const [buttonBg, setButtonBg] = React.useState('#3b82f6');
  const [buttonText2, setButtonText2] = React.useState('#ffffff');
  const [buttonPadding, setButtonPadding] = React.useState(16);
  const [svgInput, setSvgInput] = React.useState('');
  const [placeholderW, setPlaceholderW] = React.useState(300);
  const [placeholderH, setPlaceholderH] = React.useState(200);
  const [placeholderText, setPlaceholderText] = React.useState('300 × 200');
  const [placeholderBg, setPlaceholderBg] = React.useState('#e2e8f0');
  const [copied, setCopied] = React.useState(false);
  const [palette, setPalette] = React.useState<string[]>([]);
  const [imgFile, setImgFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (config.showPaletteGenerator) generatePalette();
  }, [baseColor]);

  function generatePalette() {
    const [h, s, l] = hexToHsl(baseColor);
    const colors = [
      hslToHex(h, s, Math.max(10, l - 30)),
      hslToHex(h, s, Math.max(20, l - 15)),
      baseColor,
      hslToHex(h, Math.max(20, s - 10), Math.min(90, l + 15)),
      hslToHex(h, Math.max(15, s - 20), Math.min(95, l + 30)),
    ];
    setPalette(colors);
  }

  function getGradientCSS(): string {
    return `linear-gradient(${angle}deg, ${baseColor}, ${color2})`;
  }

  function getGlassCSS(): string {
    return `background: rgba(255, 255, 255, ${opacity / 100});\nbackdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px);\nborder: ${borderWidth}px solid rgba(255, 255, 255, 0.3);\nborder-radius: ${radius}px;`;
  }

  function getNeumorphCSS(): string {
    return `background: #e0e0e0;\nborder-radius: ${radius}px;\nbox-shadow: ${shadowX}px ${shadowY}px ${shadowBlur}px #bebebe, ${-shadowX}px ${-shadowY}px ${shadowBlur}px #ffffff;`;
  }

  function getButtonCSS(): string {
    return `background: ${buttonBg};\ncolor: ${buttonText2};\nborder: none;\npadding: ${buttonPadding}px ${buttonPadding * 2}px;\nborder-radius: ${radius}px;\nfont-size: 16px;\nfont-weight: 600;\ncursor: pointer;\nbox-shadow: ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor};\ntransition: all 0.3s ease;`;
  }

  function getShadowCSS(): string {
    return `box-shadow: ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor};`;
  }

  function getBorderRadiusCSS(): string {
    return `border-radius: ${radius}px;`;
  }

  function getOutput(): string {
    if (config.showGradientControls) return getGradientCSS();
    if (config.showGlassControls) return getGlassCSS();
    if (config.showNeumorphControls) return getNeumorphCSS();
    if (config.showButtonControls) return getButtonCSS();
    if (config.showShadowControls) return getShadowCSS();
    if (config.showBorderRadiusControls) return getBorderRadiusCSS();
    return '';
  }

  function handleCopy() {
    const text = config.showPaletteGenerator ? palette.join('\n') : getOutput();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownload() {
    if (config.slug === 'svg-to-png' && svgInput) {
      const canvas = document.createElement('canvas');
      const img = new Image();
      const blob = new Blob([svgInput], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      img.onload = () => {
        canvas.width = img.width || 300;
        canvas.height = img.height || 150;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((b) => {
          if (b) downloadBlob(b, 'converted.png');
          URL.revokeObjectURL(url);
          toast.success('PNG downloaded!');
        }, 'image/png');
      };
      img.src = url;
      return;
    }
    if (config.slug === 'favicon-generator' && imgFile) {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      const url = URL.createObjectURL(imgFile);
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 64, 64);
        canvas.toBlob((b) => {
          if (b) downloadBlob(b, 'favicon.ico');
          URL.revokeObjectURL(url);
          toast.success('Favicon downloaded!');
        }, 'image/x-icon');
      };
      img.src = url;
      return;
    }
    if (config.slug === 'image-placeholder-generator') {
      const canvas = document.createElement('canvas');
      canvas.width = placeholderW;
      canvas.height = placeholderH;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = placeholderBg;
      ctx.fillRect(0, 0, placeholderW, placeholderH);
      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(placeholderText || `${placeholderW} × ${placeholderH}`, placeholderW / 2, placeholderH / 2);
      canvas.toBlob((b) => {
        if (b) downloadBlob(b, 'placeholder.png');
        toast.success('Placeholder downloaded!');
      }, 'image/png');
      return;
    }
    if (config.slug === 'svg-optimizer' && svgInput) {
      const optimized = svgInput
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
        .replace(/\s+\/>/g, '/>')
        .trim();
      const blob = new Blob([optimized], { type: 'image/svg+xml' });
      downloadBlob(blob, 'optimized.svg');
      toast.success('Optimized SVG downloaded!');
      return;
    }
  }

  function handleImgUpload(file: File | null) {
    if (!file) return;
    setImgFile(file);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl glass-card p-6">
        {/* Color inputs */}
        {config.showColorPicker && (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Base Color</Label>
              <div className="mt-2 flex items-center gap-3">
                <input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="h-10 w-16 cursor-pointer rounded-lg border border-border/60" />
                <Input value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="w-32" />
              </div>
            </div>
            {(config.showGradientControls || config.showButtonControls) && (
              <div>
                <Label className="text-sm font-medium">{config.showButtonControls ? 'Button Background' : 'Second Color'}</Label>
                <div className="mt-2 flex items-center gap-3">
                  <input type="color" value={config.showButtonControls ? buttonBg : color2} onChange={(e) => config.showButtonControls ? setButtonBg(e.target.value) : setColor2(e.target.value)} className="h-10 w-16 cursor-pointer rounded-lg border border-border/60" />
                  <Input value={config.showButtonControls ? buttonBg : color2} onChange={(e) => config.showButtonControls ? setButtonBg(e.target.value) : setColor2(e.target.value)} className="w-32" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Gradient controls */}
        {config.showGradientControls && (
          <div className="mt-4 space-y-2">
            <Label className="text-sm font-medium">Angle: {angle}°</Label>
            <Slider value={[angle]} onValueChange={(v) => setAngle(v[0])} min={0} max={360} step={15} />
          </div>
        )}

        {/* Glass controls */}
        {config.showGlassControls && (
          <div className="mt-4 space-y-4">
            <div className="space-y-2"><Label className="text-sm font-medium">Blur: {blur}px</Label><Slider value={[blur]} onValueChange={(v) => setBlur(v[0])} min={0} max={50} step={1} /></div>
            <div className="space-y-2"><Label className="text-sm font-medium">Opacity: {opacity}%</Label><Slider value={[opacity]} onValueChange={(v) => setOpacity(v[0])} min={0} max={100} step={5} /></div>
            <div className="space-y-2"><Label className="text-sm font-medium">Border Radius: {radius}px</Label><Slider value={[radius]} onValueChange={(v) => setRadius(v[0])} min={0} max={50} step={1} /></div>
            <div className="space-y-2"><Label className="text-sm font-medium">Border Width: {borderWidth}px</Label><Slider value={[borderWidth]} onValueChange={(v) => setBorderWidth(v[0])} min={0} max={5} step={1} /></div>
          </div>
        )}

        {/* Neumorphism controls */}
        {config.showNeumorphControls && (
          <div className="mt-4 space-y-4">
            <div className="space-y-2"><Label className="text-sm font-medium">Radius: {radius}px</Label><Slider value={[radius]} onValueChange={(v) => setRadius(v[0])} min={0} max={50} step={1} /></div>
            <div className="space-y-2"><Label className="text-sm font-medium">Shadow X: {shadowX}px</Label><Slider value={[shadowX]} onValueChange={(v) => setShadowX(v[0])} min={-30} max={30} step={1} /></div>
            <div className="space-y-2"><Label className="text-sm font-medium">Shadow Y: {shadowY}px</Label><Slider value={[shadowY]} onValueChange={(v) => setShadowY(v[0])} min={-30} max={30} step={1} /></div>
            <div className="space-y-2"><Label className="text-sm font-medium">Blur: {shadowBlur}px</Label><Slider value={[shadowBlur]} onValueChange={(v) => setShadowBlur(v[0])} min={0} max={50} step={1} /></div>
          </div>
        )}

        {/* Button controls */}
        {config.showButtonControls && (
          <div className="mt-4 space-y-4">
            <div><Label className="text-sm font-medium">Button Text</Label><Input value={buttonText} onChange={(e) => setButtonText(e.target.value)} className="mt-2" /></div>
            <div className="space-y-2"><Label className="text-sm font-medium">Padding: {buttonPadding}px</Label><Slider value={[buttonPadding]} onValueChange={(v) => setButtonPadding(v[0])} min={4} max={40} step={2} /></div>
            <div className="space-y-2"><Label className="text-sm font-medium">Radius: {radius}px</Label><Slider value={[radius]} onValueChange={(v) => setRadius(v[0])} min={0} max={50} step={1} /></div>
          </div>
        )}

        {/* Shadow controls */}
        {config.showShadowControls && (
          <div className="mt-4 space-y-4">
            <div className="space-y-2"><Label className="text-sm font-medium">X: {shadowX}px</Label><Slider value={[shadowX]} onValueChange={(v) => setShadowX(v[0])} min={-50} max={50} step={1} /></div>
            <div className="space-y-2"><Label className="text-sm font-medium">Y: {shadowY}px</Label><Slider value={[shadowY]} onValueChange={(v) => setShadowY(v[0])} min={-50} max={50} step={1} /></div>
            <div className="space-y-2"><Label className="text-sm font-medium">Blur: {shadowBlur}px</Label><Slider value={[shadowBlur]} onValueChange={(v) => setShadowBlur(v[0])} min={0} max={100} step={1} /></div>
            <div className="space-y-2"><Label className="text-sm font-medium">Spread: {shadowSpread}px</Label><Slider value={[shadowSpread]} onValueChange={(v) => setShadowSpread(v[0])} min={-20} max={20} step={1} /></div>
            <div><Label className="text-sm font-medium">Color</Label><div className="mt-2 flex items-center gap-3"><input type="color" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} className="h-10 w-16 cursor-pointer rounded-lg border border-border/60" /><Input value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} className="w-32" /></div></div>
          </div>
        )}

        {/* Border radius controls */}
        {config.showBorderRadiusControls && (
          <div className="mt-4 space-y-2"><Label className="text-sm font-medium">Radius: {radius}px</Label><Slider value={[radius]} onValueChange={(v) => setRadius(v[0])} min={0} max={100} step={1} /></div>
        )}

        {/* SVG input */}
        {config.showSvgInput && (
          <div className="mt-4 space-y-3">
            <Label className="text-sm font-medium">SVG Code</Label>
            <Textarea value={svgInput} onChange={(e) => setSvgInput(e.target.value)} placeholder="Paste your SVG code here..." className="min-h-[150px] rounded-xl font-mono text-sm" />
          </div>
        )}

        {/* Image input */}
        {config.showImageInput && (
          <div className="mt-4">
            <div onClick={() => inputRef.current?.click()} className="flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/60 transition-all hover:border-brand-purple/50">
              <Upload className="h-8 w-8 text-muted-foreground/50" />
              <p className="mt-2 text-sm">{imgFile ? imgFile.name : 'Click to upload an image'}</p>
              <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImgUpload(e.target.files?.[0] || null)} />
            </div>
          </div>
        )}

        {/* Placeholder controls */}
        {config.showPlaceholderControls && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-sm font-medium">Width</Label><Input type="number" value={placeholderW} onChange={(e) => setPlaceholderW(Number(e.target.value))} className="mt-2" /></div>
              <div><Label className="text-sm font-medium">Height</Label><Input type="number" value={placeholderH} onChange={(e) => setPlaceholderH(Number(e.target.value))} className="mt-2" /></div>
            </div>
            <div><Label className="text-sm font-medium">Text</Label><Input value={placeholderText} onChange={(e) => setPlaceholderText(e.target.value)} className="mt-2" /></div>
            <div><Label className="text-sm font-medium">Background Color</Label><div className="mt-2 flex items-center gap-3"><input type="color" value={placeholderBg} onChange={(e) => setPlaceholderBg(e.target.value)} className="h-10 w-16 cursor-pointer rounded-lg border border-border/60" /><Input value={placeholderBg} onChange={(e) => setPlaceholderBg(e.target.value)} className="w-32" /></div></div>
          </div>
        )}

        {/* Live preview */}
        {(config.showGradientControls || config.showGlassControls || config.showNeumorphControls || config.showButtonControls || config.showShadowControls || config.showBorderRadiusControls) && (
          <div className="mt-6">
            <Label className="text-sm font-medium">Live Preview</Label>
            <div className="mt-2 flex min-h-[120px] items-center justify-center rounded-xl border border-border/60 bg-muted/20 p-6">
              {config.showButtonControls ? (
                <button style={{ background: buttonBg, color: buttonText2, border: 'none', padding: `${buttonPadding}px ${buttonPadding * 2}px`, borderRadius: `${radius}px`, fontSize: '16px', fontWeight: 600, cursor: 'pointer', boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}` }}>{buttonText}</button>
              ) : config.showGradientControls ? (
                <div style={{ background: getGradientCSS(), width: '100%', height: '80px', borderRadius: `${radius}px` }} />
              ) : config.showGlassControls ? (
                <div style={{ background: `rgba(255,255,255,${opacity / 100})`, backdropFilter: `blur(${blur}px)`, border: `${borderWidth}px solid rgba(255,255,255,0.3)`, borderRadius: `${radius}px`, padding: '24px 48px' }}>Glass Effect</div>
              ) : config.showNeumorphControls ? (
                <div style={{ background: '#e0e0e0', borderRadius: `${radius}px`, boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px #bebebe, ${-shadowX}px ${-shadowY}px ${shadowBlur}px #ffffff`, width: '100px', height: '100px' }} />
              ) : config.showShadowControls ? (
                <div style={{ width: '80px', height: '80px', background: '#fff', borderRadius: '12px', boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}` }} />
              ) : config.showBorderRadiusControls ? (
                <div style={{ width: '100px', height: '100px', background: '#3b82f6', borderRadius: `${radius}px` }} />
              ) : null}
            </div>
          </div>
        )}

        {/* Palette display */}
        {config.showPaletteGenerator && palette.length > 0 && (
          <div className="mt-6">
            <Label className="text-sm font-medium">Generated Palette</Label>
            <div className="mt-2 grid grid-cols-5 gap-2">
              {palette.map((c, i) => (
                <div key={i} className="group cursor-pointer" onClick={() => { navigator.clipboard.writeText(c); toast.success(`Copied ${c}`); }}>
                  <div style={{ background: c }} className="h-20 rounded-lg transition-transform group-hover:scale-105" />
                  <p className="mt-1 text-center text-xs font-mono">{c}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SVG preview */}
        {config.showSvgInput && svgInput && (
          <div className="mt-6">
            <Label className="text-sm font-medium">Preview</Label>
            <div className="mt-2 flex min-h-[120px] items-center justify-center rounded-xl border border-border/60 bg-muted/20 p-6" dangerouslySetInnerHTML={{ __html: svgInput }} />
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          {getOutput() && <Button onClick={handleCopy} variant="outline" size="sm" className="rounded-xl">{copied ? <><Check className="mr-1.5 h-4 w-4 text-green-500" />Copied</> : <><Copy className="mr-1.5 h-4 w-4" />Copy CSS</>}</Button>}
          {config.showPaletteGenerator && <Button onClick={handleCopy} variant="outline" size="sm" className="rounded-xl">{copied ? <><Check className="mr-1.5 h-4 w-4 text-green-500" />Copied</> : <><Copy className="mr-1.5 h-4 w-4" />Copy Palette</>}</Button>}
          {(['svg-to-png', 'favicon-generator', 'image-placeholder-generator', 'svg-optimizer'] as string[]).includes(config.slug) && <Button onClick={handleDownload} variant="outline" size="sm" className="rounded-xl"><Download className="mr-1.5 h-4 w-4" />Download</Button>}
        </div>
      </div>
    </div>
  );
}
