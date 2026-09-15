export const p=(en,pt)=>({en,pt});
export function inLanguage(value,lang){
 if(Array.isArray(value))return value.map(v=>inLanguage(v,lang));
 if(value&&typeof value==='object'){
  if('en' in value&&'pt' in value)return value[lang];
  return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,inLanguage(v,lang)]));
 }
 return value;
}
