fix: replace Google Fonts with system fonts to fix Vercel build timeout  
  
- Remove next/font/google imports (Inter, Space_Grotesk)  
- Remove Google Fonts preconnect/dns-prefetch links  
- Replace font variables with system-ui font stack in globals.css  
- Update body className to use font-sans (system-ui)  
- Fixes Vercel build timeout: ETIMEDOUT fetching Google Fonts  
