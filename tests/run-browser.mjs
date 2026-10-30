import { chromium } from 'playwright';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const check=require('./browser-check.cjs');
const browser=await chromium.launch({headless:true});
try {
 const page=await browser.newPage();
 const baseURL=process.argv[2] || 'http://localhost:8000/';
 const result=await check(page,{baseURL});
 console.log(JSON.stringify(result,null,2));
} finally { await browser.close(); }
