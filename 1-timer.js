import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */let r,n;const d=document.getElementById("datetime-picker"),e=document.querySelector("[data-start]"),l=document.querySelector("[data-days]"),m=document.querySelector("[data-hours]"),h=document.querySelector("[data-minutes]"),f=document.querySelector("[data-seconds]");e.disabled=!0;const C={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){r=t[0],r<=new Date?(iziToast.error({title:"Помилка",message:"Будь ласка, виберіть дату в майбутньому",position:"topRight"}),e.disabled=!0):e.disabled=!1}};flatpickr(d,C);e.addEventListener("click",()=>{n&&clearInterval(n),e.disabled=!0,d.disabled=!0,n=setInterval(()=>{const t=new Date,s=r.getTime()-t.getTime();if(s<=0){clearInterval(n),l.textContent="00",m.textContent="00",h.textContent="00",f.textContent="00",iziToast.success({title:"Успіх",message:"Відлік завершено!",position:"topRight"}),d.disabled=!1,e.disabled=!0;return}const{days:i,hours:c,minutes:u,seconds:a}=b(s);l.textContent=o(i),m.textContent=o(c),h.textContent=o(u),f.textContent=o(a)},1e3)});function b(t){const a=Math.floor(t/864e5),y=Math.floor(t%864e5/36e5),p=Math.floor(t%864e5%36e5/6e4),g=Math.floor(t%864e5%36e5%6e4/1e3);return{days:a,hours:y,minutes:p,seconds:g}}function o(t){return String(t).padStart(2,"0")}
//# sourceMappingURL=1-timer.js.map
