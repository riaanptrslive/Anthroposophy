const input=document.querySelector('#source-search');
if(input){
 const pages=[...document.querySelectorAll('.inventory-page')];
 const count=document.querySelector('#search-count');
 input.addEventListener('input',()=>{
  const query=input.value.trim().toLocaleLowerCase();let visible=0;
  for(const page of pages){page.hidden=!page.textContent.toLocaleLowerCase().includes(query);if(!page.hidden)visible++;}
  for(const chapter of document.querySelectorAll('.map-chapter'))chapter.hidden=![...chapter.querySelectorAll('.inventory-page')].some(p=>!p.hidden);
  count.textContent=`${visible} of ${pages.length} source pages shown`;
 });
}
