(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{4546:(e,t,s)=>{Promise.resolve().then(s.bind(s,1640))},1640:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>W});var a=s(5155),n=s(2115),l=s(9904),r=s(399),i=s(7058);let o=(0,l.Wp)({apiKey:"AIzaSyBC5EqqRFFpEPsWz9Vqz2Ir_gPK1AGzDQQ",authDomain:"gradesync.site",projectId:"grade-sync-a17e5",storageBucket:"grade-sync-a17e5.appspot.com",messagingSenderId:"211799778124",appId:"1:211799778124:web:c9af3d1300c88ea9bda5e9",measurementId:"G-FLYWNY1PKG"}),d=(0,r.xI)(o),c=new r.HF,m=(0,i.aU)(o),u=async e=>{let t=d.currentUser;t?await (0,i.BN)((0,i.H9)(m,"users",t.uid),{grades:e}):console.error("No authenticated user found.")},h=async()=>{let e=d.currentUser;if(e){let t=(0,i.H9)(m,"users",e.uid),s=await (0,i.x7)(t);if(s.exists())return s.data().grades}else console.error("No authenticated user found.")},g=[{name:"UofT",gradingRanges:[{letter:"A+",gpa:4,minPercentage:90,maxPercentage:100},{letter:"A",gpa:4,minPercentage:85,maxPercentage:89},{letter:"A-",gpa:3.7,minPercentage:80,maxPercentage:84},{letter:"B+",gpa:3.3,minPercentage:77,maxPercentage:79},{letter:"B",gpa:3,minPercentage:73,maxPercentage:76},{letter:"B-",gpa:2.7,minPercentage:70,maxPercentage:72},{letter:"C+",gpa:2.3,minPercentage:67,maxPercentage:69},{letter:"C",gpa:2,minPercentage:63,maxPercentage:66},{letter:"C-",gpa:1.7,minPercentage:60,maxPercentage:62},{letter:"D+",gpa:1.3,minPercentage:57,maxPercentage:59},{letter:"D",gpa:1,minPercentage:53,maxPercentage:56},{letter:"D-",gpa:.7,minPercentage:50,maxPercentage:52},{letter:"F",gpa:0,minPercentage:0,maxPercentage:49}]}],x=(e,t)=>{let s=g.find(e=>e.name===t),a=Math.round(e);if(!s)return console.error("Grading scheme for ".concat(t," not found.")),null;if(a>100){let e=s.gradingRanges.find(e=>100===e.maxPercentage);if(e)return{letterGrade:e.letter,gpa:e.gpa}}let n=s.gradingRanges.find(e=>a>=e.minPercentage&&a<=e.maxPercentage);return n?{letterGrade:n.letter,gpa:n.gpa}:null},f=e=>{let t=g.find(t=>t.name===e);return t?t.gradingRanges:(console.error("Grading scheme for ".concat(e," not found.")),[])};var p=s(5037);let v=e=>{let{open:t,message:s,onConfirm:n,onCancel:l}=e;return t?(0,a.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:(0,a.jsxs)("div",{className:"bg-skin-back rounded-lg shadow-lg p-6 text-center max-w-sm w-full",children:[(0,a.jsx)("p",{className:"text-lg font-semibold mb-4",children:s}),(0,a.jsxs)("div",{className:"flex justify-center space-x-4",children:[(0,a.jsx)("button",{onClick:n,className:"px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600",children:"Yes"}),(0,a.jsx)("button",{onClick:l,className:"px-4 py-2 bg-skin-highlight text-skin-main rounded-lg hover:bg-skin-fore",children:"Cancel"})]})]})}):null};var w=s(3029),b=s(887),N=s(3084),k=s(8452),j=s(3022),y=s(5334),S=s(2822);let C=e=>{let{options:t,value:s,onChange:l,onCourseClick:r,onCourseAdd:i}=e,[o,d]=(0,n.useState)(!1),c=e=>{r(e),d(!1)};return(0,a.jsxs)("div",{className:"relative inline-block w-full text-skin-main",children:[(0,a.jsxs)("div",{className:"flex border-b-2 justify-between border-skin-main",children:[(0,a.jsx)("input",{className:"max-w-[50%] bg-transparent hover:text-skin-main border-skin-sub hover:border-skin-main ring-0 focus:ring-0 flex-grow",value:s,onChange:e=>{l(e.target.value)}}),(0,a.jsx)("button",{onClick:()=>{d(!o)},className:"px-4 md:hidden  border-skin-sub focus:outline-none ".concat(o?"text-skin-main":"text-skin-sub"," hover:text-skin-main"),"aria-label":"Toggle Dropdown",children:"▼"})]}),o&&(0,a.jsxs)("ul",{className:"absolute z-10 w-full border bg-skin-fore rounded-md shadow-md max-h-[80vh] overflow-y-auto mt-1 md:hidden",children:[(0,a.jsx)("li",{className:"px-4 py-2 cursor-pointer hover:bg-skin-back hover:text-skin-main  text-sm border-b ",onClick:()=>{i(),d(!1)},children:"+ course"}),t.map((e,t)=>(0,a.jsx)("li",{onClick:()=>c(t),className:"px-4 py-2 cursor-pointer hover:bg-skin-back hover:text-skin-main border-b text-sm",children:e},e))]})]})},P=e=>{let{isOpen:t,onClose:s,children:l}=e,[r,i]=(0,n.useState)({x:100,y:100}),[o,d]=(0,n.useState)(!1),[c,m]=(0,n.useState)(1e3),[u,h]=(0,n.useState)({offsetX:0,offsetY:0});return((0,n.useEffect)(()=>{let e=e=>{o&&i({x:e.clientX-u.offsetX,y:e.clientY-u.offsetY})},t=()=>{d(!1),document.body.style.userSelect=""};return o&&(document.addEventListener("mousemove",e),document.addEventListener("mouseup",t),document.body.style.userSelect="none"),()=>{document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",t)}},[o,u]),(0,n.useEffect)(()=>{i({x:100,y:100})},[t]),t)?(0,a.jsxs)("div",{style:{top:r.y,left:r.x,zIndex:c},className:"absolute bg-skin-fore rounded-lg shadow-lg",children:[(0,a.jsxs)("div",{onMouseDown:e=>{e.preventDefault(),d(!0),m(e=>e+1),h({offsetX:e.clientX-r.x,offsetY:e.clientY-r.y})},className:"cursor-move flex justify-between items-center bg-skin-highlight px-4 py-2 rounded-t-lg",children:[(0,a.jsx)("div",{className:"text-sm font-semibold",children:"UofT"}),(0,a.jsx)("button",{onClick:s,className:"text-gray-500 hover:text-gray-700 transition",children:"\xd7"})]}),(0,a.jsx)("div",{className:"p-4",children:l})]}):null},A=e=>{let{schoolName:t}=e,s=g.find(e=>e.name.toLowerCase()===t.toLowerCase());return s?(0,a.jsx)("div",{className:"overflow-auto",children:(0,a.jsxs)("table",{className:"min-w-full bg-skin-back rounded-lg",children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{className:"",children:[(0,a.jsx)("th",{className:"p-1 px-2",children:"Letter Grade"}),(0,a.jsx)("th",{className:"p-1 px-2",children:"GPA"}),(0,a.jsx)("th",{className:"p-1 px-2",children:"Percentage Range"})]})}),(0,a.jsx)("tbody",{children:s.gradingRanges.map((e,t)=>(0,a.jsxs)("tr",{className:"border-t border-skin-sub",children:[(0,a.jsx)("td",{className:" text-center",children:e.letter}),(0,a.jsx)("td",{className:" text-center",children:e.gpa.toFixed(1)}),(0,a.jsxs)("td",{className:" text-center",children:[e.minPercentage,"% - ",e.maxPercentage,"%"]})]},t))})]})}):(0,a.jsxs)("p",{children:["No grading scheme found for ",t,"."]})};var O=s(1714);let G=e=>{let{currentGrades:t,setGrades:s,setAdvanced:l,school:r}=e,[i,o]=(0,n.useState)(t.finalGrade||100),[d,c]=(0,n.useState)(null),[m,u]=(0,n.useState)(t.totalWeight||100),[h,g]=(0,n.useState)(0),[x,p]=(0,n.useState)(0),[v,w]=(0,n.useState)(t.courseName),[b,N]=(0,n.useState)(100),[k,j]=(0,n.useState)(4),[y,S]=(0,n.useState)("A+"),[C,P]=(0,n.useState)(100),A=f(r),G=(e,t,s)=>{N(e),j(Number(t)),S(s)},E=e=>A.find(t=>e>=t.minPercentage&&e<=t.maxPercentage),F=e=>A.filter(t=>t.gpa===e),J=e=>{let t=E(e);t&&G(e,t.gpa,t.letter)},I=e=>{let t=F(e);if(t.length>0){let s=t.map(e=>e.letter).join("/"),a=t[t.length-1].minPercentage,n=t[0].maxPercentage;G("".concat(a,"~").concat(n),e,s)}},T=e=>{let t=A.find(t=>t.letter===e);t&&G(t.minPercentage,t.gpa,e)};(0,n.useEffect)(()=>{((e,t)=>{if(!e||null===t){c(null),g(0);return}let s=e.assessments.reduce((e,t)=>e+(parseFloat(t.weight)||0),0),a=e.assessments.reduce((e,t)=>{let s=parseFloat(t.marks)||0,a=parseFloat(t.outOf)||1,n=parseFloat(t.weight)||0;return e+(t.isBonus?0:s/a*n)},0),n=m-s;if(n<=0){c(null),g(0);return}let l=Math.max(0,Math.min(100,(t/100*m-a)/(n/100)));g(n),c(l)})(t,i)},[t,i,m]),(0,n.useEffect)(()=>{v===t.courseName&&(t.finalGrade!==i||t.totalWeight!==m)?s({...t,finalGrade:null!=i?i:t.finalGrade,totalWeight:null!=m?m:t.totalWeight}):v!==t.courseName&&(w(t.courseName),o(t.finalGrade||100),u(t.totalWeight||100))},[i,m,t,v,s]),(0,n.useEffect)(()=>{((e,t,s)=>{if("string"==typeof e){let[t]=e.split("~").map(Number);e=t}let a=s.assessments.reduce((e,t)=>e+(parseFloat(t.weight)||0),0),n=s.assessments.reduce((e,t)=>{let s=parseFloat(t.marks)||0,a=parseFloat(t.outOf)||1,n=parseFloat(t.weight)||0;return e+(t.isBonus?0:s/a*n)},0),l=t-a;if(l<=0){P(0);return}P(Math.max(0,Math.min(100,(Number(e)/100*t-n)/(l/100))))})(b,m,t)},[b,m,t,v,s]);let W=e=>{o(Number(e.target.value))};return(0,a.jsxs)("div",{className:"mt-5",children:[(0,a.jsxs)("div",{className:"flex justify-between w-full rounded-t-lg",children:[(0,a.jsxs)("div",{className:"flex gap-3 ",children:[(0,a.jsx)("div",{className:"text-md p-2 rounded-t-lg hover:bg-skin-fore"+(0===x?" bg-skin-fore":""),onClick:()=>p(0),children:"Final Exam Grade"}),(0,a.jsx)("div",{className:"text-md p-2 rounded-t-lg hover:bg-skin-fore"+(1===x?" bg-skin-fore":""),onClick:()=>p(1),children:"GPA/Letter Goal"})]}),(0,a.jsx)("div",{className:"p-2  px-3 rounded-t-lg transition-transform duration-200 hover:scale-125 bg-skin-fore",onClick:()=>l(!1),children:"\xd7"})]}),0===x?(0,a.jsxs)("div",{className:" grid grid-cols-2 md:flex gap-3 flex-warp bg-skin-fore rounded-b-lg shadow-lg p-3 pt-2 overflow-y-auto overflow-x-hidden max-w-full",children:[(0,a.jsxs)("div",{className:"md:w-1/4 flex flex-col",children:["Final Grade",(0,a.jsx)("input",{type:"number",value:null!=i?i:"",onChange:e=>W(e),placeholder:"Final grade",className:"mt-1 h-full py-5 text-center bg-skin-back rounded-lg shadow-inner underline"})]},"finalGradeInput"),(0,a.jsxs)("div",{className:"md:w-1/4 flex flex-col",children:["Total Weight",(0,a.jsx)("input",{type:"number",value:null!=m?m:"",onChange:e=>u(Number(e.target.value)),placeholder:"Total weight of course",className:"mt-1 py-5 text-center bg-skin-back h-full rounded-lg shadow-inner underline"})]},"totalWeightInput"),(0,a.jsxs)("div",{className:"md:w-1/4 flex flex-col",children:["Exam Weight",(0,a.jsx)("div",{className:"mt-1 h-full py-5 text-center bg-skin-back rounded-lg shadow-inner ",children:h})]}),(0,a.jsxs)("div",{className:"md:w-1/4 flex flex-col",children:["Exam Grade",(0,a.jsx)("div",{className:"mt-1 py-5 h-full text-center rounded-lg shadow-inner whitespace-nowrap overflow-hidden relative "+(null===d?"bg-red-700":"bg-skin-back"),children:null!==d?String(d):(0,a.jsx)(O.P.div,{className:"absolute whitespace-nowrap",initial:{x:"100%"},animate:{x:"-100%"},transition:{repeat:1/0,duration:10,ease:"linear"},children:null!=d?d:"remove final exam from above"})})]})]}):(0,a.jsxs)("div",{className:" grid grid-cols-2 md:flex gap-3 flex-warp bg-skin-fore rounded-b-lg shadow-lg p-3 pt-2 overflow-y-auto overflow-x-hidden max-w-full",children:[(0,a.jsxs)("div",{className:"md:w-[40%] flex flex-col ",children:["Goal",(0,a.jsxs)("div",{className:"mt-1 h-full py-5 text-center bg-skin-back rounded-lg shadow-inner overflow-x-hidden flex justify-between",children:[(0,a.jsx)("input",{type:"text",value:b,className:"bg-transparent w-1/3 text-right appearance-none",onChange:e=>{let t=e.target.value;/^\d*\.?\d*$/.test(t)&&J(Number(t))},onFocus:()=>N("string"==typeof b?b.split("~")[0]:b)}),(0,a.jsx)("select",{value:k,className:"bg-transparent w-1/4 text-center appearance-none border-x border-skin-main mx-3",onChange:e=>I(Number(e.target.value)),children:[...new Set(A.map(e=>e.gpa))].map(e=>(0,a.jsx)("option",{value:e,children:e},e))}),(0,a.jsxs)("select",{value:y,className:"bg-transparent w-1/4 text-left appearance-none",onChange:e=>T(e.target.value),children:[!A.some(e=>e.letter===y)&&(0,a.jsx)("option",{value:y,hidden:!0,children:y}),A.map(e=>(0,a.jsx)("option",{value:e.letter,children:e.letter},e.letter))]})]})]},""),(0,a.jsxs)("div",{className:"md:w-[20%] flex flex-col whitespace-nowrap",children:["Total Weight",(0,a.jsx)("input",{type:"number",value:null!=m?m:"",onChange:e=>u(Number(e.target.value)),placeholder:"Total weight of course",className:"mt-1 py-5 text-center bg-skin-back h-full rounded-lg shadow-inner underline"})]},"totalWeightInput"),(0,a.jsxs)("div",{className:"md:w-[20%] flex flex-col whitespace-nowrap",children:["Remaining Weight",(0,a.jsx)("div",{className:"mt-1 h-full py-5 text-center bg-skin-back rounded-lg shadow-inner whitespace-nowrap",children:h})]}),(0,a.jsxs)("div",{className:"md:w-[20%] flex flex-col whitespace-nowrap",children:["Required Grade",(0,a.jsx)("div",{className:"mt-1 py-5 h-full text-center rounded-lg shadow-inner whitespace-nowrap overflow-hidden relative "+(null===C?"bg-red-700":"bg-skin-back"),children:null!==C?String(C):(0,a.jsx)(O.P.div,{className:"absolute whitespace-nowrap",initial:{x:"100%"},animate:{x:"-100%"},transition:{repeat:1/0,duration:10,ease:"linear"},children:null!=C?C:"remove final exam from above"})})]})]})]},JSON.stringify(t))};var E=s(5683);let F=e=>{let{open:t,message:s,onLocal:n,onCloud:l,onMerge:r}=e;return t?(0,a.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:(0,a.jsxs)("div",{className:"bg-skin-back rounded-lg shadow-lg p-6 text-center max-w-sm w-full",children:[(0,a.jsx)("p",{className:"text-lg font-semibold mb-4",children:s}),(0,a.jsxs)("div",{className:"flex justify-center space-x-2",children:[(0,a.jsx)("button",{onClick:n,className:"px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600",children:"Local"}),(0,a.jsx)("button",{onClick:l,className:"px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600",children:"Cloud"}),(0,a.jsx)("button",{onClick:r,className:"px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600",children:"Merge"})]})]})}):null},J={courseName:"Course Name",school:"UofT",assessments:[{name:"Assignment 1",marks:"100",outOf:"100",weight:"10",isBonus:!1},{name:"Lab 2",marks:"100",outOf:"100",weight:"10",isBonus:!1},{name:"Final Exam ",marks:"100",outOf:"100",weight:"10",isBonus:!1}],finalGrade:100,totalWeight:100},I=e=>{var t,s,l;let{onThemeToggle:i}=e,[o,m]=(0,n.useState)(!1),[f,I]=(0,n.useState)([J]),[T,W]=(0,n.useState)(f[0]),[B,L]=(0,n.useState)(0),[M,U]=(0,n.useState)(0),[R,z]=(0,n.useState)(null),[D,Y]=(0,n.useState)(0),[_,q]=(0,n.useState)("UofT"),[X,H]=(0,n.useState)(!1),[K,Q]=(0,n.useState)(""),[V,$]=(0,n.useState)(()=>()=>{}),[Z,ee]=(0,n.useState)(!0),[et,es]=(0,n.useState)(!1),[ea,en]=(0,n.useState)(""),[el,er]=(0,n.useState)(""),[ei,eo]=(0,n.useState)({}),[ed,ec]=(0,n.useState)(()=>()=>{});(0,n.useEffect)(()=>{let e=d.onAuthStateChanged(z);return()=>e()},[]),(0,n.useEffect)(()=>{async function e(){if(d.currentUser){let e=await h();e&&(e.forEach(e=>{e.school||(e.school="UofT")}),e.forEach(e=>{e.assessments.forEach(e=>{e.marks=String(e.marks),e.weight=String(e.weight),e.outOf=String(e.outOf)})}),I(e),W(e[0]),localStorage.setItem("allGrades",JSON.stringify(e)))}}let t=localStorage.getItem("allGrades");if(t){let e=JSON.parse(t);I(e),W(e[0])}else e()},[R]),(0,n.useEffect)(()=>{localStorage.setItem("allGrades",JSON.stringify(f))},[f]),(0,n.useEffect)(()=>{eh(T.assessments)},[T]);let em=async()=>{try{await (0,r.CI)(d),localStorage.removeItem("allGrades"),localStorage.removeItem("theme"),I([J]),W(J),(0,p.Ay)("Successfully logged out!")}catch(e){console.error(e)}},eu=async()=>{try{await (0,r.df)(d,c);let e=await h();e?JSON.stringify(f)===JSON.stringify([J])?((0,p.Ay)("Successfully logged in with cloud data!"),W(e[0]),I(e)):((0,p.Ay)("Successfully logged in with merged data!"),en("There is a conflict between local and cloud data. Which one would you like to keep?"),eo({onLocal:()=>{u(f),(0,p.Ay)("Successfully logged in with local copy!")},onCloud:()=>{I(e),W(e[0]),(0,p.Ay)("Successfully logged in with cloud copy!")},onMerge:()=>{let t=[...e,...f.filter(t=>!e.some(e=>JSON.stringify(e)===JSON.stringify(t)))];I(t),W(t[0]),(0,p.Ay)("Successfully logged in with merged data!")}}),es(!0)):(u(f),(0,p.Ay)("Successfully logged in with local data!"))}catch(e){console.error("Error signing in with Google:",e),(0,p.Ay)("An error occurred while signing in. Please try again.")}},eh=e=>{let t=0;if(e.forEach(e=>t+=e.isBonus?0:Number(e.weight)),Y(t),100===t){let t=0;e.forEach(e=>{e.marks&&e.outOf&&(t+=Number(e.marks)/Number(e.outOf)*Number(e.weight))}),U(t)}else{let s=0;e.forEach(e=>{e.marks&&e.outOf&&(s+=Number(e.marks)/Number(e.outOf)*Number(e.weight)*100)}),U(parseFloat((s/t).toFixed(2)))}},eg=(e,t)=>{let s=[...T.assessments];s[e].name=t,W({...T,assessments:s}),eh(s)},ex=(e,t,s)=>{let a=[...T.assessments];"marks"===s||"outOf"===s||"weight"===s?a[e][s]=t:"name"===s?a[e][s]=t:"isBonus"===s&&(a[e][s]="true"===t),W({...T,assessments:a}),eh(a.map(e=>({...e,[s]:"marks"===s||"outOf"===s||"weight"===s?Number(t):t})))},ef=()=>{let e=[...T.assessments];e.push({name:"",marks:"0",outOf:"100",weight:"0",isBonus:!1}),W({...T,assessments:e})},ep=e=>{let t=T.assessments.filter((t,s)=>s!==e);W({...T,assessments:t})},ev=(e,t)=>{let s=[...T.assessments];s[e].isBonus=t,W({...T,assessments:s})},ew=e=>{JSON.stringify(f[B])!==JSON.stringify(T)?(Q("Any changes you have made will not be saved, are you sure you want to proceed?"),$(()=>()=>{W(JSON.parse(JSON.stringify(f[e]))),L(e)}),H(!0)):(W(JSON.parse(JSON.stringify(f[e]))),L(e))},eb=()=>{let e=[J,...f];JSON.stringify(f[B])!==JSON.stringify(T)?(Q("Any changes you have made will not be saved, are you sure you want to proceed?"),$(()=>()=>{I(e),W(J),L(0),(0,p.Ay)("course added")}),H(!0)):(I(e),W(J),L(0),(0,p.Ay)("course added"))},eN=async()=>{let e=[...f];if(1===e.length){(0,p.Ay)("Cannot remove, Only one left!");return}-1!==B&&(e.splice(B,1),I(e),await u(e),localStorage.setItem("allGrades",JSON.stringify(e)),0===B&&e.length>0?(W(JSON.parse(JSON.stringify(e[0]))),L(0)):B>0&&e.length>0?(W(JSON.parse(JSON.stringify(e[B-1]))),L(B-1)):(W(J),L(0))),(0,p.Ay)("course removed")},ek=()=>{let e=[...f],t=T.courseName;for(let s=0;s<e.length;s++)if(e[s].courseName===t&&s!==B){(0,p.Ay)("This course name is not unique");return}e[B]=T,I(e),localStorage.setItem("allGrades",JSON.stringify(e)),u(e),(0,p.Ay)("Grade successfully saved ")};return(0,a.jsxs)("div",{className:"flex",children:[(0,a.jsx)("div",{className:"md:w-1/5 2xl:w-2/5"}),(0,a.jsxs)("div",{className:"flex flex-col max-w-[95vw] md:w-3/5 md:mt-3",children:[(0,a.jsxs)("div",{className:"flex flex-row justify-between text-skin-sub ",children:[(0,a.jsx)("div",{className:"hover:text-skin-main hover:scale-110 transition-transform duration-200 text-xl",children:"GradeSync"}),(0,a.jsxs)("div",{className:"flex gap-2",children:[(0,a.jsx)(w.A,{height:30,width:30,strokeWidth:"1.5",className:"hover:text-skin-main hover:scale-125 transition-transform duration-200 group",onClick:i}),R?(0,a.jsxs)("div",{className:"relative group w-[30px] h-[30px]",children:[(0,a.jsx)("img",{src:null===(t=R.photoURL)||void 0===t?void 0:t.toString(),className:"rounded-full w-full h-full group-hover:hidden",alt:"User Avatar"}),(0,a.jsx)(N.A,{height:30,width:30,strokeWidth:"1.5",className:"absolute top-0 left-0 w-full h-full hidden group-hover:block hover:text-skin-main",onClick:()=>{Q("Are you sure you want to log out?"),$(()=>em),H(!0)}})]}):(0,a.jsx)(b.A,{height:30,width:30,strokeWidth:"1.5",className:"hover:text-skin-main hover:scale-125 transition-transform duration-200",onClick:()=>eu()})]})]}),(0,a.jsxs)("div",{className:"md:grid md:grid-cols-[8fr_1fr] mt-2",children:[(0,a.jsxs)("div",{className:"mt-3 text-xl flex justify-between text-skin-sub  rounded-t-lg px-4 py-2",children:[(0,a.jsx)("div",{className:"max-w-[50%]",children:(0,a.jsx)(C,{options:f.map(e=>e.courseName),value:T.courseName,onChange:e=>{W({...T,courseName:e})},onCourseClick:ew,onCourseAdd:eb})}),(0,a.jsxs)("div",{className:"flex gap-2",children:[(0,a.jsx)("select",{className:"bg-transparent text-sm border-2 border-skin-sub hover:text-skin-main hover:border-skin-main ring-0 focus:ring-0",value:_,onChange:e=>q(e.target.value),children:g.map(e=>(0,a.jsx)("option",{value:e.name,children:e.name},e.name))}),(0,a.jsx)(k.A,{className:"hover:text-skin-main hover:scale-125 transition-transform duration-200 py-auto ".concat(Z?"text-skin-main":"text-skin-sub"),onClick:()=>ee(!Z)}),(0,a.jsx)(j.A,{className:"hover:text-skin-main hover:scale-125 transition-transform duration-200",onClick:()=>ek()}),(0,a.jsx)(y.A,{className:"hover:text-skin-main hover:scale-125 transition-transform duration-200",onClick:()=>{Q("Are you sure you want to remove this course?"),$(()=>()=>eN()),H(!0)}})]})]}),(0,a.jsx)("div",{className:"hidden md:block"}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"bg-skin-fore rounded-lg shadow-lg p-3 pt-2 max-h-[80vh] overflow-y-auto overflow-x-hidden max-w-full",children:[(0,a.jsxs)("div",{className:"flex gap-3",children:[(0,a.jsxs)("div",{className:"w-1/3",children:[(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsx)("div",{children:"Percentage"}),(0,a.jsxs)("div",{className:"relative group",children:[(0,a.jsx)(S.A,{className:"hover:text-skin-main hover:scale-125 transition-transform duration-200 text-skin-sub"}),(0,a.jsx)("div",{className:"z-40 absolute left-0 top-full mb-2 w-64 p-2 text-xs text-skin-main bg-skin-highlight rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none",children:100===D?"The grade is calculated as the weighted average of all assessments. For example, if you scored 85% on an assessment worth 40% and 90% on an assessment worth 60%, the grade would be calculated as: (85 \xd7 0.4) + (90 \xd7 0.6) = 88%. GPA and letter grade are determined based on this final percentage, with 0.5 or above rounded up and lower values rounded down.":"The grade is calculated as the weighted average of all assessments, scaled to 100%. For example, if the total weight of assessments is 80% and you scored 85% on one worth 40% and 90% on another worth 40%, the grade would be calculated as: ((85 \xd7 0.4) + (90 \xd7 0.4)) / 0.8 = 87.5%. GPA and letter grade are determined based on this final percentage, with 0.5 or above rounded up and lower values rounded down."})]})]}),(0,a.jsx)("div",{className:"mt-1 py-5 text-center text-xl bg-skin-back rounded-lg shadow-inner",children:M})]}),(0,a.jsxs)("div",{className:"w-1/3",children:["Letter",(0,a.jsx)("div",{className:"mt-1 py-5 text-center text-xl bg-skin-back rounded-lg shadow-inner",children:null===(s=x(M,_))||void 0===s?void 0:s.letterGrade.toString()})]}),(0,a.jsxs)("div",{className:"w-1/3",children:[(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsx)("div",{children:"GPA"}),(0,a.jsx)("div",{className:"text-sm text-skin-sub hover:text-skin-main md:hidden",onClick:()=>{m(!1),setTimeout(()=>m(!0),1)},children:"Table"}),(0,a.jsx)("div",{className:"text-sm text-skin-sub hover:text-skin-main hidden md:block",onClick:()=>{m(!1),setTimeout(()=>m(!0),1)},children:"View Table"}),"  "]}),(0,a.jsx)("div",{className:"mt-1 py-5 text-center text-xl bg-skin-back rounded-lg shadow-inner",children:null===(l=x(M,_))||void 0===l?void 0:l.gpa.toString()})]})]}),(0,a.jsxs)("table",{className:"",children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{className:"text-md",children:[(0,a.jsx)("th",{className:"p-2 text-left w-1/3 md:w-1/2",children:"Name"}),(0,a.jsx)("th",{className:"p-2 text-left w-1/3 md:w-1/6",children:"Marks"}),(0,a.jsx)("th",{className:"p-2 text-left w-1/8 md:w-1/6",children:"Weight"}),(0,a.jsx)("th",{className:"p-2 text-left w-1/8 md:w-1/12 whitespace-nowrap",children:"Bonus"})]})}),(0,a.jsx)("tbody",{children:(0,a.jsx)(E.N,{children:T.assessments.map((e,t)=>(0,a.jsxs)(O.P.tr,{className:"",initial:{opacity:0,x:-10},animate:{opacity:1,x:0},exit:{opacity:0,x:-10},transition:{duration:.5},children:[(0,a.jsx)("td",{className:"p-0.5 ",children:(0,a.jsx)("input",{className:"w-full bg-skin-back rounded-md shadow-inner p-1 pl-2 hover:drop-shadow-md ",value:e.name,onChange:e=>eg(t,e.target.value)})}),(0,a.jsx)("td",{className:"p-0.5",children:(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("input",{className:"w-full bg-skin-back rounded-md shadow-inner p-1 pl-2 hover:drop-shadow-md",value:e.marks,onChange:e=>ex(t,e.target.value.replace(/[^0-9.]/g,""),"marks")}),"/",(0,a.jsx)("input",{className:"w-full bg-skin-back rounded-md shadow-inner p-1 pl-2 hover:drop-shadow-md",value:e.outOf,onChange:e=>ex(t,e.target.value.replace(/[^0-9.]/g,""),"outOf")})]})}),(0,a.jsx)("td",{className:"p-0.5",children:(0,a.jsx)("input",{className:"w-full bg-skin-back rounded-md shadow-inner p-1 pl-2 hover:drop-shadow-md",value:e.weight,onChange:e=>ex(t,e.target.value.replace(/[^0-9.]/g,""),"weight")})}),(0,a.jsxs)("td",{className:"text-center p-0.5 flex justify-around",children:[(0,a.jsx)("input",{type:"checkbox",className:"appearance-none checkbox-xl peer bg-skin-back rounded-md h-8 w-8 shadow-inner hover:drop-shadow-md cursor-pointer accent-skin-back hover:bg-skin-fore focus:ring-skin-highlight checked:appearance-auto checked:rounded-lg",checked:!!e.isBonus,onChange:e=>ev(t,e.target.checked)}),(0,a.jsx)(y.A,{className:"text-skin-sub hover:text-skin-main mt-1",onClick:()=>ep(t)})]})]},t))})})]}),(0,a.jsx)("div",{className:"bg-skin-back p-1 m-1 rounded-lg text-center drop-shadow-md hover:drop-shadow-none hover:shadow-inner active:bg-skin-highlight",onClick:()=>ef(),children:"+ assessment"})]}),(0,a.jsx)(E.N,{children:Z&&(0,a.jsx)(O.P.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.5},children:(0,a.jsx)(G,{currentGrades:T,setGrades:W,setAdvanced:ee,school:_})})})]}),(0,a.jsx)("div",{className:"hidden md:block ml-3",children:(0,a.jsxs)("ul",{className:"flex flex-col text-md overflow-y-auto h-[80vh",children:[(0,a.jsx)("li",{className:"p-2 hover:bg-skin-highlight  rounded-xl text-sm flex mb-1 text-center whitespace-nowrap hover:shadow-lg cursor-pointer",onClick:()=>eb(),children:"+ course"}),f.map((e,t)=>(0,a.jsx)("li",{onClick:()=>ew(t),className:"p-2 rounded-xl flex items-center justify-between group hover:shadow-lg mb-1 active:shadow-inner cursor-pointer ".concat(t===B?"bg-skin-highlight text-skin-main":"hover:bg-skin-highlight"),children:(0,a.jsx)("span",{className:"text-left truncate max-w-[128px] whitespace-nowrap",children:null==e?void 0:e.courseName})},t))]})})]})]}),(0,a.jsx)("div",{className:"md:w-1/5 2xl:w-2/5   "}),(0,a.jsx)(v,{open:X,message:K,onConfirm:()=>{V(),H(!1)},onCancel:()=>H(!1)}),(0,a.jsx)(F,{open:et,message:ea,onLocal:()=>{ei.onLocal&&ei.onLocal(),es(!1)},onCloud:()=>{ei.onCloud&&ei.onCloud(),es(!1)},onMerge:()=>{ei.onMerge&&ei.onMerge(),es(!1)}}),(0,a.jsx)(P,{isOpen:o,onClose:()=>m(!1),children:(0,a.jsx)(A,{schoolName:_})})]})},T=["theme-default","theme-pink","theme-blue","theme-green","theme-orange","theme-purple","theme-yellow","theme-red","theme-teal","theme-gray"];function W(){let[e,t]=(0,n.useState)("theme-default");return(0,n.useEffect)(()=>{let e=localStorage.getItem("theme")||"theme-default";t(e),document.body.className="".concat(e," font-sometype")},[]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(I,{onThemeToggle:()=>{let s=T.indexOf(e),a=T[(s+1)%T.length];t(a),document.body.className="".concat(a," font-sometype"),localStorage.setItem("theme",a)}}),(0,a.jsx)(p.l$,{})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[882,992,625,441,517,358],()=>t(4546)),_N_E=e.O()}]);