import{j as Qe,c as Xl}from"./clock.CCw9H-0t.js";import{r as Yt}from"./index.CVf8TyFT.js";class ql{ctx=null;initCtx(){if(!this.ctx&&typeof window<"u"){const e=window.AudioContext||window.webkitAudioContext;e&&(this.ctx=new e)}this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}playPop(){try{if(this.initCtx(),!this.ctx)return;const e=this.ctx.createOscillator(),t=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(400,this.ctx.currentTime),e.frequency.exponentialRampToValueAtTime(800,this.ctx.currentTime+.08),t.gain.setValueAtTime(.3,this.ctx.currentTime),t.gain.exponentialRampToValueAtTime(.01,this.ctx.currentTime+.08),e.connect(t),t.connect(this.ctx.destination),e.start(),e.stop(this.ctx.currentTime+.08)}catch{}}playCorrect(){try{if(this.initCtx(),!this.ctx)return;const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(523.25,e),t.frequency.setValueAtTime(659.25,e+.1),t.frequency.setValueAtTime(783.99,e+.2),t.frequency.setValueAtTime(1046.5,e+.3),n.gain.setValueAtTime(.3,e),n.gain.exponentialRampToValueAtTime(.01,e+.5),t.connect(n),n.connect(this.ctx.destination),t.start(),t.stop(e+.5)}catch{}}playIncorrect(){try{if(this.initCtx(),!this.ctx)return;const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(220,e),t.frequency.setValueAtTime(196,e+.15),n.gain.setValueAtTime(.25,e),n.gain.exponentialRampToValueAtTime(.01,e+.4),t.connect(n),n.connect(this.ctx.destination),t.start(),t.stop(e+.4)}catch{}}playCountdownTick(){try{if(this.initCtx(),!this.ctx)return;const e=this.ctx.createOscillator(),t=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(600,this.ctx.currentTime),t.gain.setValueAtTime(.2,this.ctx.currentTime),t.gain.exponentialRampToValueAtTime(.01,this.ctx.currentTime+.05),e.connect(t),t.connect(this.ctx.destination),e.start(),e.stop(this.ctx.currentTime+.05)}catch{}}}const hm=new ql;var ya={};(function i(e,t,n,r){var s=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),a=typeof Path2D=="function"&&typeof DOMMatrix=="function",o=function(){if(!e.OffscreenCanvas)return!1;try{var R=new OffscreenCanvas(1,1),M=R.getContext("2d");M.fillRect(0,0,1,1);var ee=R.transferToImageBitmap();M.createPattern(ee,"no-repeat")}catch{return!1}return!0}();function c(){}function l(R){var M=t.exports.Promise,ee=M!==void 0?M:e.Promise;return typeof ee=="function"?new ee(R):(R(c,c),null)}var f=function(R,M){return{transform:function(ee){if(R)return ee;if(M.has(ee))return M.get(ee);var de=new OffscreenCanvas(ee.width,ee.height),G=de.getContext("2d");return G.drawImage(ee,0,0),M.set(ee,de),de},clear:function(){M.clear()}}}(o,new Map),g=function(){var R=Math.floor(16.666666666666668),M,ee,de={},G=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(M=function(re){var ae=Math.random();return de[ae]=requestAnimationFrame(function ue(ne){G===ne||G+R-1<ne?(G=ne,delete de[ae],re()):de[ae]=requestAnimationFrame(ue)}),ae},ee=function(re){de[re]&&cancelAnimationFrame(de[re])}):(M=function(re){return setTimeout(re,R)},ee=function(re){return clearTimeout(re)}),{frame:M,cancel:ee}}(),d=function(){var R,M,ee={};function de(G){function re(ae,ue){G.postMessage({options:ae||{},callback:ue})}G.init=function(ue){var ne=ue.transferControlToOffscreen();G.postMessage({canvas:ne},[ne])},G.fire=function(ue,ne,Ae){if(M)return re(ue,null),M;var Ie=Math.random().toString(36).slice(2);return M=l(function(Me){function Ne(Oe){Oe.data.callback===Ie&&(delete ee[Ie],G.removeEventListener("message",Ne),M=null,f.clear(),Ae(),Me())}G.addEventListener("message",Ne),re(ue,Ie),ee[Ie]=Ne.bind(null,{data:{callback:Ie}})}),M},G.reset=function(){G.postMessage({reset:!0});for(var ue in ee)ee[ue](),delete ee[ue]}}return function(){if(R)return R;if(!n&&s){var G=["var CONFETTI, SIZE = {}, module = {};","("+i.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{R=new Worker(URL.createObjectURL(new Blob([G])))}catch(re){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",re),null}de(R)}return R}}(),p={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function x(R,M){return M?M(R):R}function S(R){return R!=null}function h(R,M,ee){return x(R&&S(R[M])?R[M]:p[M],ee)}function u(R){return R<0?0:Math.floor(R)}function E(R,M){return Math.floor(Math.random()*(M-R))+R}function C(R){return parseInt(R,16)}function T(R){return R.map(P)}function P(R){var M=String(R).replace(/[^0-9a-f]/gi,"");return M.length<6&&(M=M[0]+M[0]+M[1]+M[1]+M[2]+M[2]),{r:C(M.substring(0,2)),g:C(M.substring(2,4)),b:C(M.substring(4,6))}}function w(R){var M=h(R,"origin",Object);return M.x=h(M,"x",Number),M.y=h(M,"y",Number),M}function m(R){R.width=document.documentElement.clientWidth,R.height=document.documentElement.clientHeight}function y(R){var M=R.getBoundingClientRect();R.width=M.width,R.height=M.height}function z(R){var M=document.createElement("canvas");return M.style.position="fixed",M.style.top="0px",M.style.left="0px",M.style.pointerEvents="none",M.style.zIndex=R,M}function D(R,M,ee,de,G,re,ae,ue,ne){R.save(),R.translate(M,ee),R.rotate(re),R.scale(de,G),R.arc(0,0,1,ae,ue,ne),R.restore()}function B(R){var M=R.angle*(Math.PI/180),ee=R.spread*(Math.PI/180);return{x:R.x,y:R.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:R.startVelocity*.5+Math.random()*R.startVelocity,angle2D:-M+(.5*ee-Math.random()*ee),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:R.color,shape:R.shape,tick:0,totalTicks:R.ticks,decay:R.decay,drift:R.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:R.gravity*3,ovalScalar:.6,scalar:R.scalar,flat:R.flat}}function H(R,M){M.x+=Math.cos(M.angle2D)*M.velocity+M.drift,M.y+=Math.sin(M.angle2D)*M.velocity+M.gravity,M.velocity*=M.decay,M.flat?(M.wobble=0,M.wobbleX=M.x+10*M.scalar,M.wobbleY=M.y+10*M.scalar,M.tiltSin=0,M.tiltCos=0,M.random=1):(M.wobble+=M.wobbleSpeed,M.wobbleX=M.x+10*M.scalar*Math.cos(M.wobble),M.wobbleY=M.y+10*M.scalar*Math.sin(M.wobble),M.tiltAngle+=.1,M.tiltSin=Math.sin(M.tiltAngle),M.tiltCos=Math.cos(M.tiltAngle),M.random=Math.random()+2);var ee=M.tick++/M.totalTicks,de=M.x+M.random*M.tiltCos,G=M.y+M.random*M.tiltSin,re=M.wobbleX+M.random*M.tiltCos,ae=M.wobbleY+M.random*M.tiltSin;if(R.fillStyle="rgba("+M.color.r+", "+M.color.g+", "+M.color.b+", "+(1-ee)+")",R.beginPath(),a&&M.shape.type==="path"&&typeof M.shape.path=="string"&&Array.isArray(M.shape.matrix))R.fill(J(M.shape.path,M.shape.matrix,M.x,M.y,Math.abs(re-de)*.1,Math.abs(ae-G)*.1,Math.PI/10*M.wobble));else if(M.shape.type==="bitmap"){var ue=Math.PI/10*M.wobble,ne=Math.abs(re-de)*.1,Ae=Math.abs(ae-G)*.1,Ie=M.shape.bitmap.width*M.scalar,Me=M.shape.bitmap.height*M.scalar,Ne=new DOMMatrix([Math.cos(ue)*ne,Math.sin(ue)*ne,-Math.sin(ue)*Ae,Math.cos(ue)*Ae,M.x,M.y]);Ne.multiplySelf(new DOMMatrix(M.shape.matrix));var Oe=R.createPattern(f.transform(M.shape.bitmap),"no-repeat");Oe.setTransform(Ne),R.globalAlpha=1-ee,R.fillStyle=Oe,R.fillRect(M.x-Ie/2,M.y-Me/2,Ie,Me),R.globalAlpha=1}else if(M.shape==="circle")R.ellipse?R.ellipse(M.x,M.y,Math.abs(re-de)*M.ovalScalar,Math.abs(ae-G)*M.ovalScalar,Math.PI/10*M.wobble,0,2*Math.PI):D(R,M.x,M.y,Math.abs(re-de)*M.ovalScalar,Math.abs(ae-G)*M.ovalScalar,Math.PI/10*M.wobble,0,2*Math.PI);else if(M.shape==="star")for(var Se=Math.PI/2*3,ke=4*M.scalar,Je=8*M.scalar,Ze=M.x,Ke=M.y,gt=5,qe=Math.PI/gt;gt--;)Ze=M.x+Math.cos(Se)*Je,Ke=M.y+Math.sin(Se)*Je,R.lineTo(Ze,Ke),Se+=qe,Ze=M.x+Math.cos(Se)*ke,Ke=M.y+Math.sin(Se)*ke,R.lineTo(Ze,Ke),Se+=qe;else R.moveTo(Math.floor(M.x),Math.floor(M.y)),R.lineTo(Math.floor(M.wobbleX),Math.floor(G)),R.lineTo(Math.floor(re),Math.floor(ae)),R.lineTo(Math.floor(de),Math.floor(M.wobbleY));return R.closePath(),R.fill(),M.tick<M.totalTicks}function j(R,M,ee,de,G){var re=M.slice(),ae=R.getContext("2d"),ue,ne,Ae=l(function(Ie){function Me(){ue=ne=null,ae.clearRect(0,0,de.width,de.height),f.clear(),G(),Ie()}function Ne(){n&&!(de.width===r.width&&de.height===r.height)&&(de.width=R.width=r.width,de.height=R.height=r.height),!de.width&&!de.height&&(ee(R),de.width=R.width,de.height=R.height),ae.clearRect(0,0,de.width,de.height),re=re.filter(function(Oe){return H(ae,Oe)}),re.length?ue=g.frame(Ne):Me()}ue=g.frame(Ne),ne=Me});return{addFettis:function(Ie){return re=re.concat(Ie),Ae},canvas:R,promise:Ae,reset:function(){ue&&g.cancel(ue),ne&&ne()}}}function L(R,M){var ee=!R,de=!!h(M||{},"resize"),G=!1,re=h(M,"disableForReducedMotion",Boolean),ae=s&&!!h(M||{},"useWorker"),ue=ae?d():null,ne=ee?m:y,Ae=R&&ue?!!R.__confetti_initialized:!1,Ie=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,Me;function Ne(Se,ke,Je){for(var Ze=h(Se,"particleCount",u),Ke=h(Se,"angle",Number),gt=h(Se,"spread",Number),qe=h(Se,"startVelocity",Number),ot=h(Se,"decay",Number),Lt=h(Se,"gravity",Number),_t=h(Se,"drift",Number),N=h(Se,"colors",T),bt=h(Se,"ticks",Number),at=h(Se,"shapes"),lt=h(Se,"scalar"),_e=!!h(Se,"flat"),dt=w(Se),De=Ze,Fe=[],b=R.width*dt.x,_=R.height*dt.y;De--;)Fe.push(B({x:b,y:_,angle:Ke,spread:gt,startVelocity:qe,color:N[De%N.length],shape:at[E(0,at.length)],ticks:bt,decay:ot,gravity:Lt,drift:_t,scalar:lt,flat:_e}));return Me?Me.addFettis(Fe):(Me=j(R,Fe,ne,ke,Je),Me.promise)}function Oe(Se){var ke=re||h(Se,"disableForReducedMotion",Boolean),Je=h(Se,"zIndex",Number);if(ke&&Ie)return l(function(qe){qe()});ee&&Me?R=Me.canvas:ee&&!R&&(R=z(Je),document.body.appendChild(R)),de&&!Ae&&ne(R);var Ze={width:R.width,height:R.height};ue&&!Ae&&ue.init(R),Ae=!0,ue&&(R.__confetti_initialized=!0);function Ke(){if(ue){var qe={getBoundingClientRect:function(){if(!ee)return R.getBoundingClientRect()}};ne(qe),ue.postMessage({resize:{width:qe.width,height:qe.height}});return}Ze.width=Ze.height=null}function gt(){Me=null,de&&(G=!1,e.removeEventListener("resize",Ke)),ee&&R&&(document.body.contains(R)&&document.body.removeChild(R),R=null,Ae=!1)}return de&&!G&&(G=!0,e.addEventListener("resize",Ke,!1)),ue?ue.fire(Se,Ze,gt):Ne(Se,Ze,gt)}return Oe.reset=function(){ue&&ue.reset(),Me&&Me.reset()},Oe}var $;function te(){return $||($=L(null,{useWorker:!0,resize:!0})),$}function J(R,M,ee,de,G,re,ae){var ue=new Path2D(R),ne=new Path2D;ne.addPath(ue,new DOMMatrix(M));var Ae=new Path2D;return Ae.addPath(ne,new DOMMatrix([Math.cos(ae)*G,Math.sin(ae)*G,-Math.sin(ae)*re,Math.cos(ae)*re,ee,de])),Ae}function ie(R){if(!a)throw new Error("path confetti are not supported in this browser");var M,ee;typeof R=="string"?M=R:(M=R.path,ee=R.matrix);var de=new Path2D(M),G=document.createElement("canvas"),re=G.getContext("2d");if(!ee){for(var ae=1e3,ue=ae,ne=ae,Ae=0,Ie=0,Me,Ne,Oe=0;Oe<ae;Oe+=2)for(var Se=0;Se<ae;Se+=2)re.isPointInPath(de,Oe,Se,"nonzero")&&(ue=Math.min(ue,Oe),ne=Math.min(ne,Se),Ae=Math.max(Ae,Oe),Ie=Math.max(Ie,Se));Me=Ae-ue,Ne=Ie-ne;var ke=10,Je=Math.min(ke/Me,ke/Ne);ee=[Je,0,0,Je,-Math.round(Me/2+ue)*Je,-Math.round(Ne/2+ne)*Je]}return{type:"path",path:M,matrix:ee}}function q(R){var M,ee=1,de="#000000",G='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof R=="string"?M=R:(M=R.text,ee="scalar"in R?R.scalar:ee,G="fontFamily"in R?R.fontFamily:G,de="color"in R?R.color:de);var re=10*ee,ae=""+re+"px "+G,ue=new OffscreenCanvas(re,re),ne=ue.getContext("2d");ne.font=ae;var Ae=ne.measureText(M),Ie=Math.ceil(Ae.actualBoundingBoxRight+Ae.actualBoundingBoxLeft),Me=Math.ceil(Ae.actualBoundingBoxAscent+Ae.actualBoundingBoxDescent),Ne=2,Oe=Ae.actualBoundingBoxLeft+Ne,Se=Ae.actualBoundingBoxAscent+Ne;Ie+=Ne+Ne,Me+=Ne+Ne,ue=new OffscreenCanvas(Ie,Me),ne=ue.getContext("2d"),ne.font=ae,ne.fillStyle=de,ne.fillText(M,Oe,Se);var ke=1/ee;return{type:"bitmap",bitmap:ue.transferToImageBitmap(),matrix:[ke,0,0,ke,-Ie*ke/2,-Me*ke/2]}}t.exports=function(){return te().apply(this,arguments)},t.exports.reset=function(){te().reset()},t.exports.create=L,t.exports.shapeFromPath=ie,t.exports.shapeFromText=q})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),ya,!1);const dm=ya.exports;ya.exports.create;/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ba="187",Yl=0,Ga=1,Zl=2,Ur=1,Xo=2,qi=3,si=0,$t=1,xn=2,Ri=0,Zi=1,Ha=2,ka=3,Va=4,Kl=5,wi=100,$l=101,Jl=102,Ql=103,jl=104,ec=200,tc=201,nc=202,ic=203,qo=204,Yo=205,rc=206,sc=207,ac=208,oc=209,lc=210,cc=211,uc=212,hc=213,dc=214,Ns=0,Us=1,Fs=2,Ji=3,Os=4,Bs=5,zs=6,Gs=7,Zo=0,fc=1,pc=2,Dn=0,Ko=1,$o=2,Jo=3,Qo=4,jo=5,el=6,tl=7,nl=300,Pi=301,Qi=302,ns=303,is=304,Hs=1e3,Ln=1001,ks=1002,Ft=1003,mc=1004,lr=1005,Kt=1006,rs=1007,Vn=1008,nn=1009,il=1010,rl=1011,ji=1012,Ta=1013,En=1014,vn=1015,yn=1016,Aa=1017,wa=1018,Li=1020,sl=35902,al=35899,ol=1021,ll=1022,Mn=1023,Yn=1026,Wn=1027,cl=1028,Ra=1029,ai=1030,Ca=1031,Pa=1033,Fr=33776,Or=33777,Br=33778,zr=33779,Vs=35840,Ws=35841,Xs=35842,qs=35843,Ys=36196,Zs=37492,Ks=37496,$s=37488,Js=37489,kr=37490,Qs=37491,js=37808,ea=37809,ta=37810,na=37811,ia=37812,ra=37813,sa=37814,aa=37815,oa=37816,la=37817,ca=37818,ua=37819,ha=37820,da=37821,fa=36492,pa=36494,ma=36495,ga=36283,_a=36284,Vr=36285,xa=36286,gc=3200,va=0,_c=1,kn="",on="srgb",Wr="srgb-linear",Xr="linear",ct="srgb",ss=7680,xc=519,vc=512,Mc=513,Sc=514,ul=515,Ec=516,yc=517,hl=518,dl=519,fl=35044,Wa="300 es",pn=2e3,er=2001;function bc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function qr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Tc(){const i=qr("canvas");return i.style.display="block",i}const Xa={};function Yr(...i){const e="THREE."+i.shift();console.log(e,...i)}function pl(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Be(...i){i=pl(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function rt(...i){i=pl(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Gr(...i){const e=i.join(" ");e in Xa||(Xa[e]=!0,Be(...i))}function Ac(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const wc={[Ns]:Ns,[Fs]:zs,[Os]:Os,[Ji]:Bs,[Us]:Us,[zs]:Fs,[Gs]:Gs,[Bs]:Ji};class li{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],as=Math.PI/180,Ma=180/Math.PI;function ci(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[t&63|128]+Gt[t>>8&255]+"-"+Gt[t>>16&255]+Gt[t>>24&255]+Gt[n&255]+Gt[n>>8&255]+Gt[n>>16&255]+Gt[n>>24&255]).toLowerCase()}function nt(i,e,t){return Math.max(e,Math.min(t,i))}function Rc(i,e){return(i%e+e)%e}function os(i,e,t){return(1-t)*i+t*e}function Cc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Qr(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function ml(i,e){if(e.constructor===Float32Array)return i;const t=Qr(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function gl(i,e){if(e.constructor===Float32Array)return i;const t=Qr(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}class Xe{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ni{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let c=n[r+0],l=n[r+1],f=n[r+2],g=n[r+3],d=s[a+0],p=s[a+1],x=s[a+2],S=s[a+3];if(g!==S||c!==d||l!==p||f!==x){let h=c*d+l*p+f*x+g*S;h<0&&(d=-d,p=-p,x=-x,S=-S,h=-h);let u=1-o;if(h<.9995){const E=Math.acos(h),C=Math.sin(E);u=Math.sin(u*E)/C,o=Math.sin(o*E)/C,c=c*u+d*o,l=l*u+p*o,f=f*u+x*o,g=g*u+S*o}else{c=c*u+d*o,l=l*u+p*o,f=f*u+x*o,g=g*u+S*o;const E=1/Math.sqrt(c*c+l*l+f*f+g*g);c*=E,l*=E,f*=E,g*=E}}e[t]=c,e[t+1]=l,e[t+2]=f,e[t+3]=g}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],c=n[r+1],l=n[r+2],f=n[r+3],g=s[a],d=s[a+1],p=s[a+2],x=s[a+3];return e[t]=o*x+f*g+c*p-l*d,e[t+1]=c*x+f*d+l*g-o*p,e[t+2]=l*x+f*p+o*d-c*g,e[t+3]=f*x-o*g-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),f=o(r/2),g=o(s/2),d=c(n/2),p=c(r/2),x=c(s/2);switch(a){case"XYZ":this._x=d*f*g+l*p*x,this._y=l*p*g-d*f*x,this._z=l*f*x+d*p*g,this._w=l*f*g-d*p*x;break;case"YXZ":this._x=d*f*g+l*p*x,this._y=l*p*g-d*f*x,this._z=l*f*x-d*p*g,this._w=l*f*g+d*p*x;break;case"ZXY":this._x=d*f*g-l*p*x,this._y=l*p*g+d*f*x,this._z=l*f*x+d*p*g,this._w=l*f*g-d*p*x;break;case"ZYX":this._x=d*f*g-l*p*x,this._y=l*p*g+d*f*x,this._z=l*f*x-d*p*g,this._w=l*f*g+d*p*x;break;case"YZX":this._x=d*f*g+l*p*x,this._y=l*p*g+d*f*x,this._z=l*f*x-d*p*g,this._w=l*f*g-d*p*x;break;case"XZY":this._x=d*f*g-l*p*x,this._y=l*p*g-d*f*x,this._z=l*f*x+d*p*g,this._w=l*f*g+d*p*x;break;default:Be("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],f=t[6],g=t[10],d=n+o+g;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(f-c)*p,this._y=(s-l)*p,this._z=(a-r)*p}else if(n>o&&n>g){const p=2*Math.sqrt(1+n-o-g);this._w=(f-c)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+l)/p}else if(o>g){const p=2*Math.sqrt(1+o-n-g);this._w=(s-l)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(c+f)/p}else{const p=2*Math.sqrt(1+g-n-o);this._w=(a-r)/p,this._x=(s+l)/p,this._y=(c+f)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,f=t._w;return this._x=n*f+a*o+r*l-s*c,this._y=r*f+a*c+s*o-n*l,this._z=s*f+a*l+n*c-r*o,this._w=a*f-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),f=Math.sin(l);c=Math.sin(c*l)/f,t=Math.sin(t*l)/f,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(qa.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(qa.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*n),f=2*(o*t-s*r),g=2*(s*n-a*t);return this.x=t+c*l+a*g-o*f,this.y=n+c*f+o*l-s*g,this.z=r+c*g+s*f-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ls.copy(this).projectOnVector(e),this.sub(ls)}reflect(e){return this.sub(ls.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ls=new V,qa=new Ni;class Ve{static{this.prototype.isMatrix3=!0}constructor(e,t,n,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l)}set(e,t,n,r,s,a,o,c,l){const f=this.elements;return f[0]=e,f[1]=r,f[2]=o,f[3]=t,f[4]=s,f[5]=c,f[6]=n,f[7]=a,f[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],f=n[4],g=n[7],d=n[2],p=n[5],x=n[8],S=r[0],h=r[3],u=r[6],E=r[1],C=r[4],T=r[7],P=r[2],w=r[5],m=r[8];return s[0]=a*S+o*E+c*P,s[3]=a*h+o*C+c*w,s[6]=a*u+o*T+c*m,s[1]=l*S+f*E+g*P,s[4]=l*h+f*C+g*w,s[7]=l*u+f*T+g*m,s[2]=d*S+p*E+x*P,s[5]=d*h+p*C+x*w,s[8]=d*u+p*T+x*m,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],f=e[8];return t*a*f-t*o*l-n*s*f+n*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],f=e[8],g=f*a-o*l,d=o*c-f*s,p=l*s-a*c,x=t*g+n*d+r*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/x;return e[0]=g*S,e[1]=(r*l-f*n)*S,e[2]=(o*n-r*a)*S,e[3]=d*S,e[4]=(f*t-r*c)*S,e[5]=(r*s-o*t)*S,e[6]=p*S,e[7]=(n*c-l*t)*S,e[8]=(a*t-n*s)*S,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Gr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(cs.makeScale(e,t)),this}rotate(e){return Gr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(cs.makeRotation(-e)),this}translate(e,t){return Gr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(cs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const cs=new Ve,Ya=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Za=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Pc(){const i={enabled:!0,workingColorSpace:Wr,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ct&&(r.r=In(r.r),r.g=In(r.g),r.b=In(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ct&&(r.r=Ci(r.r),r.g=Ci(r.g),r.b=Ci(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===kn?Xr:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[a].fromXYZ).multiply(this.spaces[s].toXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Wr]:{primaries:e,whitePoint:n,transfer:Xr,toXYZ:Ya,fromXYZ:Za,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:on},outputColorSpaceConfig:{drawingBufferColorSpace:on}},[on]:{primaries:e,whitePoint:n,transfer:ct,toXYZ:Ya,fromXYZ:Za,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:on}}}),i}const tt=Pc();function In(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ci(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let hi;class Lc{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{hi===void 0&&(hi=qr("canvas")),hi.width=e.width,hi.height=e.height;const r=hi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=hi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=qr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=In(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(In(t[n]/255)*255):t[n]=In(t[n]);return{data:t,width:e.width,height:e.height}}else return Be("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Dc=0;class La{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Dc++}),this.uuid=ci(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(us(r[a].image)):s.push(us(r[a]))}else s=us(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function us(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Lc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Be("Texture: Unable to serialize Texture."),{})}let Ic=0;const hs=new V;class kt extends li{constructor(e=kt.DEFAULT_IMAGE,t=kt.DEFAULT_MAPPING,n=Ln,r=Ln,s=Kt,a=Vn,o=Mn,c=nn,l=kt.DEFAULT_ANISOTROPY,f=kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ic++}),this.uuid=ci(),this.name="",this.source=new La(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Xe(0,0),this.repeat=new Xe(1,1),this.center=new Xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(hs).x}get height(){return this.source.getSize(hs).y}get depth(){return this.source.getSize(hs).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Be(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Be(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==nl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Hs:e.x=e.x-Math.floor(e.x);break;case Ln:e.x=e.x<0?0:1;break;case ks:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Hs:e.y=e.y-Math.floor(e.y);break;case Ln:e.y=e.y<0?0:1;break;case ks:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}kt.DEFAULT_IMAGE=null;kt.DEFAULT_MAPPING=nl;kt.DEFAULT_ANISOTROPY=1;class yt{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,l=c[0],f=c[4],g=c[8],d=c[1],p=c[5],x=c[9],S=c[2],h=c[6],u=c[10];if(Math.abs(f-d)<.01&&Math.abs(g-S)<.01&&Math.abs(x-h)<.01){if(Math.abs(f+d)<.1&&Math.abs(g+S)<.1&&Math.abs(x+h)<.1&&Math.abs(l+p+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const C=(l+1)/2,T=(p+1)/2,P=(u+1)/2,w=(f+d)/4,m=(g+S)/4,y=(x+h)/4;return C>T&&C>P?C<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(C),r=w/n,s=m/n):T>P?T<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),n=w/r,s=y/r):P<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),n=m/s,r=y/s),this.set(n,r,s,t),this}let E=Math.sqrt((h-x)*(h-x)+(g-S)*(g-S)+(d-f)*(d-f));return Math.abs(E)<.001&&(E=1),this.x=(h-x)/E,this.y=(g-S)/E,this.z=(d-f)/E,this.w=Math.acos((l+p+u-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this.w=nt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this.w=nt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Nc extends li{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t),this.textures=[];const r=n.count;for(let s=0;s<r;s++)this.textures[s]=new kt({width:e,height:t,depth:n.depth}),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Kt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new La(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Sn extends Nc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class _l extends kt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Uc extends kt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class pt{static{this.prototype.isMatrix4=!0}constructor(e,t,n,r,s,a,o,c,l,f,g,d,p,x,S,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l,f,g,d,p,x,S,h)}set(e,t,n,r,s,a,o,c,l,f,g,d,p,x,S,h){const u=this.elements;return u[0]=e,u[4]=t,u[8]=n,u[12]=r,u[1]=s,u[5]=a,u[9]=o,u[13]=c,u[2]=l,u[6]=f,u[10]=g,u[14]=d,u[3]=p,u[7]=x,u[11]=S,u[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,r=1/di.setFromMatrixColumn(e,0).length(),s=1/di.setFromMatrixColumn(e,1).length(),a=1/di.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),f=Math.cos(s),g=Math.sin(s);if(e.order==="XYZ"){const d=a*f,p=a*g,x=o*f,S=o*g;t[0]=c*f,t[4]=-c*g,t[8]=l,t[1]=p+x*l,t[5]=d-S*l,t[9]=-o*c,t[2]=S-d*l,t[6]=x+p*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*f,p=c*g,x=l*f,S=l*g;t[0]=d+S*o,t[4]=x*o-p,t[8]=a*l,t[1]=a*g,t[5]=a*f,t[9]=-o,t[2]=p*o-x,t[6]=S+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*f,p=c*g,x=l*f,S=l*g;t[0]=d-S*o,t[4]=-a*g,t[8]=x+p*o,t[1]=p+x*o,t[5]=a*f,t[9]=S-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*f,p=a*g,x=o*f,S=o*g;t[0]=c*f,t[4]=x*l-p,t[8]=d*l+S,t[1]=c*g,t[5]=S*l+d,t[9]=p*l-x,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,p=a*l,x=o*c,S=o*l;t[0]=c*f,t[4]=S-d*g,t[8]=x*g+p,t[1]=g,t[5]=a*f,t[9]=-o*f,t[2]=-l*f,t[6]=p*g+x,t[10]=d-S*g}else if(e.order==="XZY"){const d=a*c,p=a*l,x=o*c,S=o*l;t[0]=c*f,t[4]=-g,t[8]=l*f,t[1]=d*g+S,t[5]=a*f,t[9]=p*g-x,t[2]=x*g-p,t[6]=o*f,t[10]=S*g+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Fc,e,Oc)}lookAt(e,t,n){const r=this.elements;return en.subVectors(e,t),en.lengthSq()===0&&(en.z=1),en.normalize(),Fn.crossVectors(n,en),Fn.lengthSq()===0&&(Math.abs(n.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),Fn.crossVectors(n,en)),Fn.normalize(),cr.crossVectors(en,Fn),r[0]=Fn.x,r[4]=cr.x,r[8]=en.x,r[1]=Fn.y,r[5]=cr.y,r[9]=en.y,r[2]=Fn.z,r[6]=cr.z,r[10]=en.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],f=n[1],g=n[5],d=n[9],p=n[13],x=n[2],S=n[6],h=n[10],u=n[14],E=n[3],C=n[7],T=n[11],P=n[15],w=r[0],m=r[4],y=r[8],z=r[12],D=r[1],B=r[5],H=r[9],j=r[13],L=r[2],$=r[6],te=r[10],J=r[14],ie=r[3],q=r[7],R=r[11],M=r[15];return s[0]=a*w+o*D+c*L+l*ie,s[4]=a*m+o*B+c*$+l*q,s[8]=a*y+o*H+c*te+l*R,s[12]=a*z+o*j+c*J+l*M,s[1]=f*w+g*D+d*L+p*ie,s[5]=f*m+g*B+d*$+p*q,s[9]=f*y+g*H+d*te+p*R,s[13]=f*z+g*j+d*J+p*M,s[2]=x*w+S*D+h*L+u*ie,s[6]=x*m+S*B+h*$+u*q,s[10]=x*y+S*H+h*te+u*R,s[14]=x*z+S*j+h*J+u*M,s[3]=E*w+C*D+T*L+P*ie,s[7]=E*m+C*B+T*$+P*q,s[11]=E*y+C*H+T*te+P*R,s[15]=E*z+C*j+T*J+P*M,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],f=e[2],g=e[6],d=e[10],p=e[14],x=e[3],S=e[7],h=e[11],u=e[15],E=c*p-l*d,C=o*p-l*g,T=o*d-c*g,P=a*p-l*f,w=a*d-c*f,m=a*g-o*f;return t*(S*E-h*C+u*T)-n*(x*E-h*P+u*w)+r*(x*C-S*P+u*m)-s*(x*T-S*w+h*m)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],f=e[10];return t*(a*f-o*l)-n*(s*f-o*c)+r*(s*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],f=e[8],g=e[9],d=e[10],p=e[11],x=e[12],S=e[13],h=e[14],u=e[15],E=t*o-n*a,C=t*c-r*a,T=t*l-s*a,P=n*c-r*o,w=n*l-s*o,m=r*l-s*c,y=f*S-g*x,z=f*h-d*x,D=f*u-p*x,B=g*h-d*S,H=g*u-p*S,j=d*u-p*h,L=E*j-C*H+T*B+P*D-w*z+m*y;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const $=1/L;return e[0]=(o*j-c*H+l*B)*$,e[1]=(r*H-n*j-s*B)*$,e[2]=(S*m-h*w+u*P)*$,e[3]=(d*w-g*m-p*P)*$,e[4]=(c*D-a*j-l*z)*$,e[5]=(t*j-r*D+s*z)*$,e[6]=(h*T-x*m-u*C)*$,e[7]=(f*m-d*T+p*C)*$,e[8]=(a*H-o*D+l*y)*$,e[9]=(n*D-t*H-s*y)*$,e[10]=(x*w-S*T+u*E)*$,e[11]=(g*T-f*w-p*E)*$,e[12]=(o*z-a*B-c*y)*$,e[13]=(t*B-n*z+r*y)*$,e[14]=(S*C-x*P-h*E)*$,e[15]=(f*P-g*C+d*E)*$,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,f=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,f*o+n,f*c-r*a,0,l*c-r*o,f*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,f=a+a,g=o+o,d=s*l,p=s*f,x=s*g,S=a*f,h=a*g,u=o*g,E=c*l,C=c*f,T=c*g,P=n.x,w=n.y,m=n.z;return r[0]=(1-(S+u))*P,r[1]=(p+T)*P,r[2]=(x-C)*P,r[3]=0,r[4]=(p-T)*w,r[5]=(1-(d+u))*w,r[6]=(h+E)*w,r[7]=0,r[8]=(x+C)*m,r[9]=(h-E)*m,r[10]=(1-(d+S))*m,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=di.set(r[0],r[1],r[2]).length();const o=di.set(r[4],r[5],r[6]).length(),c=di.set(r[8],r[9],r[10]).length();s<0&&(a=-a),hn.copy(this);const l=1/a,f=1/o,g=1/c;return hn.elements[0]*=l,hn.elements[1]*=l,hn.elements[2]*=l,hn.elements[4]*=f,hn.elements[5]*=f,hn.elements[6]*=f,hn.elements[8]*=g,hn.elements[9]*=g,hn.elements[10]*=g,t.setFromRotationMatrix(hn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,r,s,a,o=pn,c=!1){const l=this.elements,f=2*s/(t-e),g=2*s/(n-r),d=(t+e)/(t-e),p=(n+r)/(n-r);let x,S;if(c)x=s/(a-s),S=a*s/(a-s);else if(o===pn)x=-(a+s)/(a-s),S=-2*a*s/(a-s);else if(o===er)x=-a/(a-s),S=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=f,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=g,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=S,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=pn,c=!1){const l=this.elements,f=2/(t-e),g=2/(n-r),d=-(t+e)/(t-e),p=-(n+r)/(n-r);let x,S;if(c)x=1/(a-s),S=a/(a-s);else if(o===pn)x=-2/(a-s),S=-(a+s)/(a-s);else if(o===er)x=-1/(a-s),S=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=f,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=g,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=x,l[14]=S,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const di=new V,hn=new pt,Fc=new V(0,0,0),Oc=new V(1,1,1),Fn=new V,cr=new V,en=new V,Ka=new pt,$a=new Ni;class Zn{constructor(e=0,t=0,n=0,r=Zn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],f=r[9],g=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-nt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-g,s),this._z=0);break;case"ZXY":this._x=Math.asin(nt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-g,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-nt(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(nt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,l),this._y=Math.atan2(-g,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,p),this._y=0);break;default:Be("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ka.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ka,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return $a.setFromEuler(this),this.setFromQuaternion($a,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Zn.DEFAULT_ORDER="XYZ";class xl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Bc=0;const Ja=new V,fi=new Ni,Tn=new pt,ur=new V,Fi=new V,zc=new V,Gc=new Ni,Qa=new V(1,0,0),ja=new V(0,1,0),eo=new V(0,0,1),to={type:"added"},Hc={type:"removed"},pi={type:"childadded",child:null},ds={type:"childremoved",child:null};class Nt extends li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bc++}),this.uuid=ci(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Nt.DEFAULT_UP.clone();const e=new V,t=new Zn,n=new Ni,r=new V(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new pt},normalMatrix:{value:new Ve}}),this.matrix=new pt,this.matrixWorld=new pt,this.matrixAutoUpdate=Nt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fi.setFromAxisAngle(e,t),this.quaternion.multiply(fi),this}rotateOnWorldAxis(e,t){return fi.setFromAxisAngle(e,t),this.quaternion.premultiply(fi),this}rotateX(e){return this.rotateOnAxis(Qa,e)}rotateY(e){return this.rotateOnAxis(ja,e)}rotateZ(e){return this.rotateOnAxis(eo,e)}translateOnAxis(e,t){return Ja.copy(e).applyQuaternion(this.quaternion),this.position.add(Ja.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Qa,e)}translateY(e){return this.translateOnAxis(ja,e)}translateZ(e){return this.translateOnAxis(eo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Tn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ur.copy(e):ur.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Fi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Tn.lookAt(Fi,ur,this.up):Tn.lookAt(ur,Fi,this.up),this.quaternion.setFromRotationMatrix(Tn),r&&(Tn.extractRotation(r.matrixWorld),fi.setFromRotationMatrix(Tn),this.quaternion.premultiply(fi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(rt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(to),pi.child=e,this.dispatchEvent(pi),pi.child=null):rt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Hc),ds.child=e,this.dispatchEvent(ds),ds.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Tn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Tn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Tn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(to),pi.child=e,this.dispatchEvent(pi),pi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fi,e,zc),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fi,Gc,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,f=c.length;l<f;l++){const g=c[l];s(e.shapes,g)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),f=a(e.images),g=a(e.shapes),d=a(e.skeletons),p=a(e.animations),x=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),f.length>0&&(n.images=f),g.length>0&&(n.shapes=g),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),x.length>0&&(n.nodes=x)}return n.object=r,n;function a(o){const c=[];for(const l in o){const f=o[l];delete f.metadata,c.push(f)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Nt.DEFAULT_UP=new V(0,1,0);Nt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ri extends Nt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const kc={type:"move"};class fs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ri,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ri,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ri,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const S of e.hand.values()){const h=t.getJointPose(S,n),u=this._getHandJoint(l,S);h!==null&&(u.matrix.fromArray(h.transform.matrix),u.matrix.decompose(u.position,u.quaternion,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=h.radius),u.visible=h!==null}const f=l.joints["index-finger-tip"],g=l.joints["thumb-tip"],d=f.position.distanceTo(g.position),p=.02,x=.005;l.inputState.pinching&&d>p+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(kc)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ri;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const vl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},hr={h:0,s:0,l:0};function ps(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class We{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=on){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,tt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=tt.workingColorSpace){if(e=Rc(e,1),t=nt(t,0,1),n=nt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=ps(a,s,e+1/3),this.g=ps(a,s,e),this.b=ps(a,s,e-1/3)}return tt.colorSpaceToWorking(this,r),this}setStyle(e,t=on){function n(s){s!==void 0&&parseFloat(s)<1&&Be("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseFloat(s[1]))/100,Math.min(100,parseFloat(s[2]))/100,Math.min(100,parseFloat(s[3]))/100,t);break;case"hsl":case"hsla":if(s=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Be("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Be("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=on){const n=vl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Be("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=In(e.r),this.g=In(e.g),this.b=In(e.b),this}copyLinearToSRGB(e){return this.r=Ci(e.r),this.g=Ci(e.g),this.b=Ci(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=on){return tt.workingToColorSpace(Ht.copy(this),e),Math.round(nt(Ht.r*255,0,255))*65536+Math.round(nt(Ht.g*255,0,255))*256+Math.round(nt(Ht.b*255,0,255))}getHexString(e=on){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.workingToColorSpace(Ht.copy(this),t);const n=Ht.r,r=Ht.g,s=Ht.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let c,l;const f=(o+a)/2;if(o===a)c=0,l=0;else{const g=a-o;switch(l=f<=.5?g/(a+o):g/(2-a-o),a){case n:c=(r-s)/g+(r<s?6:0);break;case r:c=(s-n)/g+2;break;case s:c=(n-r)/g+4;break}c/=6}return e.h=c,e.s=l,e.l=f,e}getRGB(e,t=tt.workingColorSpace){return tt.workingToColorSpace(Ht.copy(this),t),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=on){tt.workingToColorSpace(Ht.copy(this),e);const t=Ht.r,n=Ht.g,r=Ht.b;return e!==on?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(On),this.setHSL(On.h+e,On.s+t,On.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(On),e.getHSL(hr);const n=os(On.h,hr.h,t),r=os(On.s,hr.s,t),s=os(On.l,hr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ht=new We;We.NAMES=vl;class Ki{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new We(e),this.density=t}clone(){return new Ki(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Vc extends Nt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Zn,this.environmentIntensity=1,this.environmentRotation=new Zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const dn=new V,An=new V,ms=new V,wn=new V,mi=new V,gi=new V,no=new V,gs=new V,_s=new V,xs=new V,vs=new yt,Ms=new yt,Ss=new yt;class cn{constructor(e=new V,t=new V,n=new V){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),dn.subVectors(e,t),r.cross(dn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){dn.subVectors(r,t),An.subVectors(n,t),ms.subVectors(e,t);const a=dn.dot(dn),o=dn.dot(An),c=dn.dot(ms),l=An.dot(An),f=An.dot(ms),g=a*l-o*o;if(g===0)return s.set(0,0,0),null;const d=1/g,p=(l*c-o*f)*d,x=(a*f-o*c)*d;return s.set(1-p-x,x,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,wn)===null?!1:wn.x>=0&&wn.y>=0&&wn.x+wn.y<=1}static getInterpolation(e,t,n,r,s,a,o,c){return this.getBarycoord(e,t,n,r,wn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,wn.x),c.addScaledVector(a,wn.y),c.addScaledVector(o,wn.z),c)}static getInterpolatedAttribute(e,t,n,r,s,a){return vs.setScalar(0),Ms.setScalar(0),Ss.setScalar(0),vs.fromBufferAttribute(e,t),Ms.fromBufferAttribute(e,n),Ss.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(vs,s.x),a.addScaledVector(Ms,s.y),a.addScaledVector(Ss,s.z),a}static isFrontFacing(e,t,n,r){return dn.subVectors(n,t),An.subVectors(e,t),dn.cross(An).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return dn.subVectors(this.c,this.b),An.subVectors(this.a,this.b),dn.cross(An).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return cn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return cn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return cn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return cn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return cn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;mi.subVectors(r,n),gi.subVectors(s,n),gs.subVectors(e,n);const c=mi.dot(gs),l=gi.dot(gs);if(c<=0&&l<=0)return t.copy(n);_s.subVectors(e,r);const f=mi.dot(_s),g=gi.dot(_s);if(f>=0&&g<=f)return t.copy(r);const d=c*g-f*l;if(d<=0&&c>=0&&f<=0&&c-f>0)return a=c/(c-f),t.copy(n).addScaledVector(mi,a);xs.subVectors(e,s);const p=mi.dot(xs),x=gi.dot(xs);if(x>=0&&p<=x)return t.copy(s);const S=p*l-c*x;if(S<=0&&l>=0&&x<=0)return o=l/(l-x),t.copy(n).addScaledVector(gi,o);const h=f*x-p*g;if(h<=0&&g-f>=0&&p-x>=0)return no.subVectors(s,r),o=(g-f)/(g-f+(p-x)),t.copy(r).addScaledVector(no,o);const u=1/(h+S+d);return a=S*u,o=d*u,t.copy(n).addScaledVector(mi,a).addScaledVector(gi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class nr{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(fn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(fn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=fn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,fn):fn.fromBufferAttribute(s,a),fn.applyMatrix4(e.matrixWorld),this.expandByPoint(fn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),dr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),dr.copy(n.boundingBox)),dr.applyMatrix4(e.matrixWorld),this.union(dr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,fn),fn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Oi),fr.subVectors(this.max,Oi),_i.subVectors(e.a,Oi),xi.subVectors(e.b,Oi),vi.subVectors(e.c,Oi),Bn.subVectors(xi,_i),zn.subVectors(vi,xi),jn.subVectors(_i,vi);let t=[0,-Bn.z,Bn.y,0,-zn.z,zn.y,0,-jn.z,jn.y,Bn.z,0,-Bn.x,zn.z,0,-zn.x,jn.z,0,-jn.x,-Bn.y,Bn.x,0,-zn.y,zn.x,0,-jn.y,jn.x,0];return!Es(t,_i,xi,vi,fr)||(t=[1,0,0,0,1,0,0,0,1],!Es(t,_i,xi,vi,fr))?!1:(pr.crossVectors(Bn,zn),t=[pr.x,pr.y,pr.z],Es(t,_i,xi,vi,fr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(fn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Rn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Rn=[new V,new V,new V,new V,new V,new V,new V,new V],fn=new V,dr=new nr,_i=new V,xi=new V,vi=new V,Bn=new V,zn=new V,jn=new V,Oi=new V,fr=new V,pr=new V,ei=new V;function Es(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){ei.fromArray(i,s);const o=r.x*Math.abs(ei.x)+r.y*Math.abs(ei.y)+r.z*Math.abs(ei.z),c=e.dot(ei),l=t.dot(ei),f=n.dot(ei);if(Math.max(-Math.max(c,l,f),Math.min(c,l,f))>o)return!1}return!0}const At=new V,mr=new Xe;let Wc=0;class qn extends li{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Wc++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=fl,this.updateRanges=[],this.gpuType=vn,this.version=0,this._normalizationScale=e!==void 0?Qr(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)mr.fromBufferAttribute(this,t),mr.applyMatrix3(e),this.setXY(t,mr.x,mr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):ml(e,this.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):gl(e,this.array)}}class Ml extends qn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Sl extends qn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class mt extends qn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Xc=new nr,Bi=new V,ys=new V;class jr{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Xc.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Bi.subVectors(e,this.center);const t=Bi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Bi,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ys.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Bi.copy(e.center).add(ys)),this.expandByPoint(Bi.copy(e.center).sub(ys))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let qc=0;const an=new pt,bs=new Nt,Mi=new V,tn=new nr,zi=new nr,It=new V;class Jt extends li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qc++}),this.uuid=ci(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(bc(e)?Sl:Ml)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ve().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return an.makeRotationFromQuaternion(e),this.applyMatrix4(an),this}rotateX(e){return an.makeRotationX(e),this.applyMatrix4(an),this}rotateY(e){return an.makeRotationY(e),this.applyMatrix4(an),this}rotateZ(e){return an.makeRotationZ(e),this.applyMatrix4(an),this}translate(e,t,n){return an.makeTranslation(e,t,n),this.applyMatrix4(an),this}scale(e,t,n){return an.makeScale(e,t,n),this.applyMatrix4(an),this}lookAt(e){return bs.lookAt(e),bs.updateMatrix(),this.applyMatrix4(bs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mi).negate(),this.translate(Mi.x,Mi.y,Mi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new mt(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Be("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new nr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];tn.setFromBufferAttribute(s),this.morphTargetsRelative?(It.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(It),It.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(It)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&rt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const n=this.boundingSphere.center;if(tn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];zi.setFromBufferAttribute(o),this.morphTargetsRelative?(It.addVectors(tn.min,zi.min),tn.expandByPoint(It),It.addVectors(tn.max,zi.max),tn.expandByPoint(It)):(tn.expandByPoint(zi.min),tn.expandByPoint(zi.max))}tn.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)It.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(It));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,f=o.count;l<f;l++)It.fromBufferAttribute(o,l),c&&(Mi.fromBufferAttribute(e,l),It.add(Mi)),r=Math.max(r,n.distanceToSquared(It))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&rt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){rt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new qn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[],l=new Uint8Array(n.count);for(let z=0;z<n.count;z++)o[z]=new V,c[z]=new V;const f=new V,g=new V,d=new V,p=new Xe,x=new Xe,S=new Xe,h=new V,u=new V;function E(z,D,B){l[z]=l[D]=l[B]=1,f.fromBufferAttribute(n,z),g.fromBufferAttribute(n,D),d.fromBufferAttribute(n,B),p.fromBufferAttribute(s,z),x.fromBufferAttribute(s,D),S.fromBufferAttribute(s,B),g.sub(f),d.sub(f),x.sub(p),S.sub(p);const H=1/(x.x*S.y-S.x*x.y);isFinite(H)&&(h.copy(g).multiplyScalar(S.y).addScaledVector(d,-x.y).multiplyScalar(H),u.copy(d).multiplyScalar(x.x).addScaledVector(g,-S.x).multiplyScalar(H),o[z].add(h),o[D].add(h),o[B].add(h),c[z].add(u),c[D].add(u),c[B].add(u))}let C=this.groups;C.length===0&&(C=[{start:0,count:e.count}]);for(let z=0,D=C.length;z<D;++z){const B=C[z],H=B.start,j=B.count;for(let L=H,$=H+j;L<$;L+=3)E(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const T=new V,P=new V,w=new V,m=new V;function y(z){w.fromBufferAttribute(r,z),m.copy(w);const D=o[z];T.copy(D),T.sub(w.multiplyScalar(w.dot(D))).normalize(),P.crossVectors(m,D);const H=P.dot(c[z])<0?-1:1;a.setXYZW(z,T.x,T.y,T.z,H)}for(let z=0,D=n.count;z<D;++z)l[z]&&y(z);this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new qn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const r=new V,s=new V,a=new V,o=new V,c=new V,l=new V,f=new V,g=new V;if(e)for(let d=0,p=e.count;d<p;d+=3){const x=e.getX(d+0),S=e.getX(d+1),h=e.getX(d+2);r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,S),a.fromBufferAttribute(t,h),f.subVectors(a,s),g.subVectors(r,s),f.cross(g),o.fromBufferAttribute(n,x),c.fromBufferAttribute(n,S),l.fromBufferAttribute(n,h),o.add(f),c.add(f),l.add(f),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(S,c.x,c.y,c.z),n.setXYZ(h,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),f.subVectors(a,s),g.subVectors(r,s),f.cross(g),n.setXYZ(d+0,f.x,f.y,f.z),n.setXYZ(d+1,f.x,f.y,f.z),n.setXYZ(d+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)It.fromBufferAttribute(e,t),It.normalize(),e.setXYZ(t,It.x,It.y,It.z)}toNonIndexed(){function e(o,c){const l=o.array,f=o.itemSize,g=o.normalized,d=new l.constructor(c.length*f);let p=0,x=0;for(let S=0,h=c.length;S<h;S++){o.isInterleavedBufferAttribute?p=c[S]*o.data.stride+o.offset:p=c[S]*f;for(let u=0;u<f;u++)d[x++]=l[p++]}return new qn(d,f,g)}if(this.index===null)return Be("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Jt,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,n);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let f=0,g=l.length;f<g;f++){const d=l[f],p=e(d,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],f=[];for(let g=0,d=l.length;g<d;g++){const p=l[g];f.push(p.toJSON(e.data))}f.length>0&&(r[c]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const l in r){const f=r[l];this.setAttribute(l,f.clone(t))}const s=e.morphAttributes;for(const l in s){const f=[],g=s[l];for(let d=0,p=g.length;d<p;d++)f.push(g[d].clone(t));this.morphAttributes[l]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,f=a.length;l<f;l++){const g=a[l];this.addGroup(g.start,g.count,g.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yc{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=fl,this.updateRanges=[],this.version=0,this.uuid=ci()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});const t=io(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);const n=new this.array.constructor(e.arrayBuffers[t]),r=new this.constructor(n,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});const t=io(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));const n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}}function io(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=ci()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}const Wt=new V;class Zr{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r,this._normalizationScale=e!==void 0?Qr(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix4(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyNormalMatrix(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.transformDirection(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Yr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new qn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Zr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Yr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):ml(e,this.data.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):gl(e,this.data.array)}}const Ts=new V,Zc=new V,Kc=new Ve;class Hn{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Ts.subVectors(n,t).cross(Zc.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(Ts),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Kc.getNormalMatrix(e),r=this.coplanarPoint(Ts).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let $c=0;class ui extends li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$c++}),this.uuid=ci(),this.name="",this.type="Material",this.blending=Zi,this.side=si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qo,this.blendDst=Yo,this.blendEquation=wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=Ji,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ss,this.stencilZFail=ss,this.stencilZPass=ss,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Be(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Be(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new We().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Hn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Xe().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Xe().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class El extends ui{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new We(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Si;const Gi=new V,Ei=new V,yi=new V,bi=new Xe,Hi=new Xe,yl=new pt,gr=new V,ki=new V,_r=new V,ro=new Xe,As=new Xe,so=new Xe;class Jc extends Nt{constructor(e=new El){if(super(),this.isSprite=!0,this.type="Sprite",Si===void 0){Si=new Jt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Yc(t,5);Si.setIndex([0,1,2,0,2,3]),Si.setAttribute("position",new Zr(n,3,0,!1)),Si.setAttribute("uv",new Zr(n,2,3,!1))}this.geometry=Si,this.material=e,this.center=new Xe(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&rt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ei.setFromMatrixScale(this.matrixWorld),yl.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),yi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ei.multiplyScalar(-yi.z);const n=this.material.rotation;let r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));const a=this.center;xr(gr.set(-.5,-.5,0),yi,a,Ei,r,s),xr(ki.set(.5,-.5,0),yi,a,Ei,r,s),xr(_r.set(.5,.5,0),yi,a,Ei,r,s),ro.set(0,0),As.set(1,0),so.set(1,1);let o=e.ray.intersectTriangle(gr,ki,_r,!1,Gi);if(o===null&&(xr(ki.set(-.5,.5,0),yi,a,Ei,r,s),As.set(0,1),o=e.ray.intersectTriangle(gr,_r,ki,!1,Gi),o===null))return;const c=e.ray.origin.distanceTo(Gi);c<e.near||c>e.far||t.push({distance:c,point:Gi.clone(),uv:cn.getInterpolation(Gi,gr,ki,_r,ro,As,so,new Xe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){const t=super.toJSON(e);return t.object.center=this.center.toArray(),t}}function xr(i,e,t,n,r,s){bi.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(Hi.x=s*bi.x-r*bi.y,Hi.y=r*bi.x+s*bi.y):Hi.copy(bi),i.copy(e),i.x+=Hi.x,i.y+=Hi.y,i.applyMatrix4(yl)}const Cn=new V,ws=new V,vr=new V,Mr=new V;class bl{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Cn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Cn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Cn.copy(this.origin).addScaledVector(this.direction,t),Cn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ws.copy(e).add(t).multiplyScalar(.5),vr.copy(t).sub(e).normalize(),Mr.copy(this.origin).sub(ws);const s=e.distanceTo(t)*.5,a=-this.direction.dot(vr),o=Mr.dot(this.direction),c=-Mr.dot(vr),l=Mr.lengthSq(),f=Math.abs(1-a*a);let g,d,p,x;if(f>0)if(g=a*c-o,d=a*o-c,x=s*f,g>=0)if(d>=-x)if(d<=x){const S=1/f;g*=S,d*=S,p=g*(g+a*d+2*o)+d*(a*g+d+2*c)+l}else d=s,g=Math.max(0,-(a*d+o)),p=-g*g+d*(d+2*c)+l;else d=-s,g=Math.max(0,-(a*d+o)),p=-g*g+d*(d+2*c)+l;else d<=-x?(g=Math.max(0,-(-a*s+o)),d=g>0?-s:Math.min(Math.max(-s,-c),s),p=-g*g+d*(d+2*c)+l):d<=x?(g=0,d=Math.min(Math.max(-s,-c),s),p=d*(d+2*c)+l):(g=Math.max(0,-(a*s+o)),d=g>0?s:Math.min(Math.max(-s,-c),s),p=-g*g+d*(d+2*c)+l);else d=a>0?-s:s,g=Math.max(0,-(a*d+o)),p=-g*g+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,g),r&&r.copy(ws).addScaledVector(vr,d),p}intersectSphere(e,t){if(e.radius<0)return null;Cn.subVectors(e.center,this.origin);const n=Cn.dot(this.direction),r=Cn.dot(Cn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,c;const l=1/this.direction.x,f=1/this.direction.y,g=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),f>=0?(s=(e.min.y-d.y)*f,a=(e.max.y-d.y)*f):(s=(e.max.y-d.y)*f,a=(e.min.y-d.y)*f),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),g>=0?(o=(e.min.z-d.z)*g,c=(e.max.z-d.z)*g):(o=(e.max.z-d.z)*g,c=(e.min.z-d.z)*g),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Cn)!==null}intersectTriangle(e,t,n,r,s){const a=this.origin,o=this.direction,c=o.x,l=o.y,f=o.z,g=e.x-a.x,d=e.y-a.y,p=e.z-a.z,x=t.x-a.x,S=t.y-a.y,h=t.z-a.z,u=n.x-a.x,E=n.y-a.y,C=n.z-a.z,T=Math.abs(c),P=Math.abs(l),w=Math.abs(f);let m,y,z,D,B,H,j,L,$,te,J,ie;if(T>=P&&T>=w?(z=c,H=g,$=x,ie=u,c>=0?(m=l,y=f,D=d,B=p,j=S,L=h,te=E,J=C):(m=f,y=l,D=p,B=d,j=h,L=S,te=C,J=E)):P>=w?(z=l,H=d,$=S,ie=E,l>=0?(m=f,y=c,D=p,B=g,j=h,L=x,te=C,J=u):(m=c,y=f,D=g,B=p,j=x,L=h,te=u,J=C)):(z=f,H=p,$=h,ie=C,f>=0?(m=c,y=l,D=g,B=d,j=x,L=S,te=u,J=E):(m=l,y=c,D=d,B=g,j=S,L=x,te=E,J=u)),z===0)return null;const q=m/z,R=y/z,M=1/z,ee=D-q*H,de=B-R*H,G=j-q*$,re=L-R*$,ae=te-q*ie,ue=J-R*ie,ne=ae*re-ue*G,Ae=ee*ue-de*ae,Ie=G*de-re*ee;if(r){if(ne<0||Ae<0||Ie<0)return null}else if((ne<0||Ae<0||Ie<0)&&(ne>0||Ae>0||Ie>0))return null;const Me=ne+Ae+Ie;if(Me===0)return null;const Ne=M*(ne*H+Ae*$+Ie*ie);return(Me>0?Ne<0:Ne>0)?null:this.at(Ne/Me,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Zt extends ui{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zn,this.combine=Zo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ao=new pt,ti=new bl,Sr=new jr,oo=new V,Er=new V,yr=new V,br=new V,Rs=new V,Tr=new V,lo=new V,Ar=new V;class He extends Nt{constructor(e=new Jt,t=new Zt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Tr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const f=o[c],g=s[c];f!==0&&(Rs.fromBufferAttribute(g,e),a?Tr.addScaledVector(Rs,f):Tr.addScaledVector(Rs.sub(t),f))}t.add(Tr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Sr.copy(n.boundingSphere),Sr.applyMatrix4(s),ti.copy(e.ray).recast(e.near),!(Sr.containsPoint(ti.origin)===!1&&(ti.intersectSphere(Sr,oo)===null||ti.origin.distanceToSquared(oo)>(e.far-e.near)**2))&&(ao.copy(s).invert(),ti.copy(e.ray).applyMatrix4(ao),!(n.boundingBox!==null&&ti.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ti)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,f=s.attributes.uv1,g=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,S=d.length;x<S;x++){const h=d[x],u=a[h.materialIndex],E=Math.max(h.start,p.start),C=Math.min(o.count,Math.min(h.start+h.count,p.start+p.count));for(let T=E,P=C;T<P;T+=3){const w=o.getX(T),m=o.getX(T+1),y=o.getX(T+2);r=wr(this,u,e,n,l,f,g,w,m,y),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=h.materialIndex,t.push(r))}}else{const x=Math.max(0,p.start),S=Math.min(o.count,p.start+p.count);for(let h=x,u=S;h<u;h+=3){const E=o.getX(h),C=o.getX(h+1),T=o.getX(h+2);r=wr(this,a,e,n,l,f,g,E,C,T),r&&(r.faceIndex=Math.floor(h/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,S=d.length;x<S;x++){const h=d[x],u=a[h.materialIndex],E=Math.max(h.start,p.start),C=Math.min(c.count,Math.min(h.start+h.count,p.start+p.count));for(let T=E,P=C;T<P;T+=3){const w=T,m=T+1,y=T+2;r=wr(this,u,e,n,l,f,g,w,m,y),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=h.materialIndex,t.push(r))}}else{const x=Math.max(0,p.start),S=Math.min(c.count,p.start+p.count);for(let h=x,u=S;h<u;h+=3){const E=h,C=h+1,T=h+2;r=wr(this,a,e,n,l,f,g,E,C,T),r&&(r.faceIndex=Math.floor(h/3),t.push(r))}}}}function Qc(i,e,t,n,r,s,a,o){let c;if(e.side===$t?c=n.intersectTriangle(a,s,r,!0,o):c=n.intersectTriangle(r,s,a,e.side===si,o),c===null)return null;Ar.copy(o),Ar.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ar);return l<t.near||l>t.far?null:{distance:l,point:Ar.clone(),object:i}}function wr(i,e,t,n,r,s,a,o,c,l){i.getVertexPosition(o,Er),i.getVertexPosition(c,yr),i.getVertexPosition(l,br);const f=Qc(i,e,t,n,Er,yr,br,lo);if(f){const g=new V;cn.getBarycoord(lo,Er,yr,br,g),r&&(f.uv=cn.getInterpolatedAttribute(r,o,c,l,g,new Xe)),s&&(f.uv1=cn.getInterpolatedAttribute(s,o,c,l,g,new Xe)),a&&(f.normal=cn.getInterpolatedAttribute(a,o,c,l,g,new V),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new V,materialIndex:0};cn.getNormal(Er,yr,br,d.normal),f.face=d,f.barycoord=g}return f}class jc extends kt{constructor(e=null,t=1,n=1,r,s,a,o,c,l=Ft,f=Ft,g,d){super(null,a,o,c,l,f,r,s,g,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ni=new jr,eu=new Xe(.5,.5),Rr=new V;class tr{constructor(e=new Hn,t=new Hn,n=new Hn,r=new Hn,s=new Hn,a=new Hn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=pn,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],f=s[4],g=s[5],d=s[6],p=s[7],x=s[8],S=s[9],h=s[10],u=s[11],E=s[12],C=s[13],T=s[14],P=s[15];if(r[0].setComponents(l-a,p-f,u-x,P-E).normalize(),r[1].setComponents(l+a,p+f,u+x,P+E).normalize(),r[2].setComponents(l+o,p+g,u+S,P+C).normalize(),r[3].setComponents(l-o,p-g,u-S,P-C).normalize(),n)r[4].setComponents(c,d,h,T).normalize(),r[5].setComponents(l-c,p-d,u-h,P-T).normalize();else if(r[4].setComponents(l-c,p-d,u-h,P-T).normalize(),t===pn)r[5].setComponents(l+c,p+d,u+h,P+T).normalize();else if(t===er)r[5].setComponents(c,d,h,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ni.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ni.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ni)}intersectsSprite(e){ni.center.set(0,0,0);const t=eu.distanceTo(e.center);return ni.radius=.7071067811865476+t,ni.applyMatrix4(e.matrixWorld),this.intersectsSphere(ni)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Rr.x=r.normal.x>0?e.max.x:e.min.x,Rr.y=r.normal.y>0?e.max.y:e.min.y,Rr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Rr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const co=new pt;class Da{constructor(){this.coordinateSystem=pn,this._frustums=[],this._count=0}setFromArrayCamera(e){const t=e.cameras,n=this._frustums;for(let r=0;r<t.length;r++){const s=t[r];co.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),n[r]===void 0&&(n[r]=new tr),n[r].setFromProjectionMatrix(co,s.coordinateSystem,s.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new tr),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new Da().copy(this)}}class Tl extends ui{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new We(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Kr=new V,$r=new V,uo=new pt,Vi=new bl,Cr=new jr,Cs=new V,ho=new V;class tu extends Nt{constructor(e=new Jt,t=new Tl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Kr.fromBufferAttribute(t,r-1),$r.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Kr.distanceTo($r);e.setAttribute("lineDistance",new mt(n,1))}else Be("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Cr.copy(n.boundingSphere),Cr.applyMatrix4(r),Cr.radius+=s,e.ray.intersectsSphere(Cr)===!1)return;uo.copy(r).invert(),Vi.copy(e.ray).applyMatrix4(uo);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,f=n.index,d=n.attributes.position;if(f!==null){const p=Math.max(0,a.start),x=Math.min(f.count,a.start+a.count);for(let S=p,h=x-1;S<h;S+=l){const u=f.getX(S),E=f.getX(S+1),C=Pr(this,e,Vi,c,u,E,S);C&&t.push(C)}if(this.isLineLoop){const S=f.getX(x-1),h=f.getX(p),u=Pr(this,e,Vi,c,S,h,x-1);u&&t.push(u)}}else{const p=Math.max(0,a.start),x=Math.min(d.count,a.start+a.count);for(let S=p,h=x-1;S<h;S+=l){const u=Pr(this,e,Vi,c,S,S+1,S);u&&t.push(u)}if(this.isLineLoop){const S=Pr(this,e,Vi,c,x-1,p,x-1);S&&t.push(S)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Pr(i,e,t,n,r,s,a){const o=i.geometry.attributes.position;if(Kr.fromBufferAttribute(o,r),$r.fromBufferAttribute(o,s),t.distanceSqToSegment(Kr,$r,Cs,ho)>n)return;Cs.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Cs);if(!(l<e.near||l>e.far))return{distance:l,point:ho.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const fo=new V,po=new V;class nu extends tu{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)fo.fromBufferAttribute(t,r),po.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+fo.distanceTo(po);e.setAttribute("lineDistance",new mt(n,1))}else Be("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Al extends kt{constructor(e=[],t=Pi,n,r,s,a,o,c,l,f){super(e,t,n,r,s,a,o,c,l,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Wi extends kt{constructor(e,t,n,r,s,a,o,c,l){super(e,t,n,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Di extends kt{constructor(e,t,n=En,r,s,a,o=Ft,c=Ft,l,f=Yn,g=1){if(f!==Yn&&f!==Wn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:g};super(d,r,s,a,o,c,f,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new La(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class wl extends Di{constructor(e,t=En,n=Pi,r,s,a=Ft,o=Ft,c,l=Yn){const f={width:e,height:e,depth:1},g=[f,f,f,f,f,f];super(e,e,t,n,r,s,a,o,c,l),this.image=g,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Rl extends kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Mt extends Jt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],f=[],g=[];let d=0,p=0;x("z","y","x",-1,-1,n,t,e,a,s,0),x("z","y","x",1,-1,n,t,-e,a,s,1),x("x","z","y",1,1,e,n,t,r,a,2),x("x","z","y",1,-1,e,n,-t,r,a,3),x("x","y","z",1,-1,e,t,n,r,s,4),x("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new mt(l,3)),this.setAttribute("normal",new mt(f,3)),this.setAttribute("uv",new mt(g,2));function x(S,h,u,E,C,T,P,w,m,y,z){const D=T/m,B=P/y,H=T/2,j=P/2,L=w/2,$=m+1,te=y+1;let J=0,ie=0;const q=new V;for(let R=0;R<te;R++){const M=R*B-j;for(let ee=0;ee<$;ee++){const de=ee*D-H;q[S]=de*E,q[h]=M*C,q[u]=L,l.push(q.x,q.y,q.z),q[S]=0,q[h]=0,q[u]=w>0?1:-1,f.push(q.x,q.y,q.z),g.push(ee/m),g.push(1-R/y),J+=1}}for(let R=0;R<y;R++)for(let M=0;M<m;M++){const ee=d+M+$*R,de=d+M+$*(R+1),G=d+(M+1)+$*(R+1),re=d+(M+1)+$*R;c.push(ee,de,re),c.push(de,G,re),ie+=6}o.addGroup(p,ie,z),p+=ie,d+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ii extends Jt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const f=[],g=[],d=[],p=[];let x=0;const S=[],h=n/2;let u=0;E(),a===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(f),this.setAttribute("position",new mt(g,3)),this.setAttribute("normal",new mt(d,3)),this.setAttribute("uv",new mt(p,2));function E(){const T=new V,P=new V;let w=0;const m=(t-e)/n;for(let y=0;y<=s;y++){const z=[],D=y/s,B=D*(t-e)+e;for(let H=0;H<=r;H++){const j=H/r,L=j*c+o,$=Math.sin(L),te=Math.cos(L);P.x=B*$,P.y=-D*n+h,P.z=B*te,g.push(P.x,P.y,P.z),T.set($,m,te).normalize(),d.push(T.x,T.y,T.z),p.push(j,1-D),z.push(x++)}S.push(z)}for(let y=0;y<r;y++)for(let z=0;z<s;z++){const D=S[z][y],B=S[z+1][y],H=S[z+1][y+1],j=S[z][y+1];(e>0||z!==0)&&(f.push(D,B,j),w+=3),(t>0||z!==s-1)&&(f.push(B,H,j),w+=3)}l.addGroup(u,w,0),u+=w}function C(T){const P=x,w=new Xe,m=new V;let y=0;const z=T===!0?e:t,D=T===!0?1:-1;for(let H=1;H<=r;H++)g.push(0,h*D,0),d.push(0,D,0),p.push(.5,.5),x++;const B=x;for(let H=0;H<=r;H++){const L=H/r*c+o,$=Math.cos(L),te=Math.sin(L);m.x=z*te,m.y=h*D,m.z=z*$,g.push(m.x,m.y,m.z),d.push(0,D,0),w.x=$*.5+.5,w.y=te*.5*D+.5,p.push(w.x,w.y),x++}for(let H=0;H<r;H++){const j=P+H,L=B+H;T===!0?f.push(L,L+1,j):f.push(L+1,L,j),y+=3}l.addGroup(u,y,T===!0?1:2),u+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ii(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Xn extends Jt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,f=c+1,g=e/o,d=t/c,p=[],x=[],S=[],h=[];for(let u=0;u<f;u++){const E=u*d-a;for(let C=0;C<l;C++){const T=C*g-s;x.push(T,-E,0),S.push(0,0,1),h.push(C/o),h.push(1-u/c)}}for(let u=0;u<c;u++)for(let E=0;E<o;E++){const C=E+l*u,T=E+l*(u+1),P=E+1+l*(u+1),w=E+1+l*u;p.push(C,T,w),p.push(T,P,w)}this.setIndex(p),this.setAttribute("position",new mt(x,3)),this.setAttribute("normal",new mt(S,3)),this.setAttribute("uv",new mt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xn(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ia extends Jt{constructor(e=.5,t=1,n=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);const o=[],c=[],l=[],f=[];let g=e;const d=(t-e)/r,p=new V,x=new Xe;for(let S=0;S<=r;S++){for(let h=0;h<=n;h++){const u=s+h/n*a;p.x=g*Math.cos(u),p.y=g*Math.sin(u),c.push(p.x,p.y,p.z),l.push(0,0,1),x.x=(p.x/t+1)/2,x.y=(p.y/t+1)/2,f.push(x.x,x.y)}g+=d}for(let S=0;S<r;S++){const h=S*(n+1);for(let u=0;u<n;u++){const E=u+h,C=E,T=E+n+1,P=E+n+2,w=E+1;o.push(C,T,w),o.push(T,P,w)}}this.setIndex(o),this.setAttribute("position",new mt(c,3)),this.setAttribute("normal",new mt(l,3)),this.setAttribute("uv",new mt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ia(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class $i extends Jt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const f=[],g=new V,d=new V,p=[],x=[],S=[],h=[];for(let u=0;u<=n;u++){const E=[],C=u/n,T=a+C*o,P=e*Math.cos(T),w=Math.sqrt(e*e-P*P);let m=0;u===0&&a===0?m=.5/t:u===n&&c===Math.PI&&(m=-.5/t);for(let y=0;y<=t;y++){const z=y/t,D=r+z*s;g.x=-w*Math.cos(D),g.y=P,g.z=w*Math.sin(D),x.push(g.x,g.y,g.z),d.copy(g).normalize(),S.push(d.x,d.y,d.z),h.push(z+m,1-C),E.push(l++)}f.push(E)}for(let u=0;u<n;u++)for(let E=0;E<t;E++){const C=f[u][E+1],T=f[u][E],P=f[u+1][E],w=f[u+1][E+1];(u!==0||a>0)&&p.push(C,T,w),(u!==n-1||c<Math.PI)&&p.push(T,P,w)}this.setIndex(p),this.setAttribute("position",new mt(x,3)),this.setAttribute("normal",new mt(S,3)),this.setAttribute("uv",new mt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Na extends Jt{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);const c=[],l=[],f=[],g=[],d=new V,p=new V,x=new V;for(let S=0;S<=n;S++){const h=a+S/n*o;for(let u=0;u<=r;u++){const E=u/r*s;p.x=(e+t*Math.cos(h))*Math.cos(E),p.y=(e+t*Math.cos(h))*Math.sin(E),p.z=t*Math.sin(h),l.push(p.x,p.y,p.z),d.x=e*Math.cos(E),d.y=e*Math.sin(E),x.subVectors(p,d).normalize(),f.push(x.x,x.y,x.z),g.push(u/r),g.push(S/n)}}for(let S=1;S<=n;S++)for(let h=1;h<=r;h++){const u=(r+1)*S+h-1,E=(r+1)*(S-1)+h-1,C=(r+1)*(S-1)+h,T=(r+1)*S+h;c.push(u,E,T),c.push(E,C,T)}this.setIndex(c),this.setAttribute("position",new mt(l,3)),this.setAttribute("normal",new mt(f,3)),this.setAttribute("uv",new mt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Na(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}function Ii(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(mo(r))r.isRenderTargetTexture?(Be("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(mo(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function Xt(i){const e={};for(let t=0;t<i.length;t++){const n=Ii(i[t]);for(const r in n)e[r]=n[r]}return e}function mo(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function iu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Cl(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const ru={clone:Ii,merge:Xt};var su=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,au=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class oi extends ui{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=su,this.fragmentShader=au,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ii(e.uniforms),this.uniformsGroups=iu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new We().setHex(r.value);break;case"v2":this.uniforms[n].value=new Xe().fromArray(r.value);break;case"v3":this.uniforms[n].value=new V().fromArray(r.value);break;case"v4":this.uniforms[n].value=new yt().fromArray(r.value);break;case"m3":this.uniforms[n].value=new Ve().fromArray(r.value);break;case"m4":this.uniforms[n].value=new pt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class ou extends oi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class wt extends ui{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new We(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=va,this.normalScale=new Xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class lu extends ui{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class cu extends ui{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Ua extends Nt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Ps=new pt,go=new V,_o=new V;class Pl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xe(512,512),this.mapType=nn,this.map=null,this.mapPass=null,this.matrix=new pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new tr,this._frameExtents=new Xe(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;go.setFromMatrixPosition(e.matrixWorld),t.position.copy(go),_o.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(_o),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Ps.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Ps,e.coordinateSystem,e.reversedDepth);const s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,c=r?r.x/s.x:0,l=r?r.y/s.y:0;e.coordinateSystem===er||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(Ps)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Lr=new V,Dr=new Ni,mn=new V;class Ll extends Nt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pt,this.projectionMatrix=new pt,this.projectionMatrixInverse=new pt,this.coordinateSystem=pn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Lr,Dr,mn),mn.x===1&&mn.y===1&&mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lr,Dr,mn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Lr,Dr,mn),mn.x===1&&mn.y===1&&mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lr,Dr,mn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Gn=new V,xo=new Xe,vo=new Xe;class ln extends Ll{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ma*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(as*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ma*2*Math.atan(Math.tan(as*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Gn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Gn.x,Gn.y).multiplyScalar(-e/Gn.z),Gn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Gn.x,Gn.y).multiplyScalar(-e/Gn.z)}getViewSize(e,t){return this.getViewBounds(e,xo,vo),t.subVectors(vo,xo)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(as*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class uu extends Pl{constructor(){super(new ln(90,1,.5,500)),this.isPointLightShadow=!0}}class Ls extends Ua{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new uu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Fa extends Ll{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=f*this.view.offsetY,c=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class hu extends Pl{constructor(){super(new Fa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Mo extends Ua{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.target=new Nt,this.shadow=new hu}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class du extends Ua{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Ti=-90,Ai=1;class Sa extends Nt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new ln(Ti,Ai,e,t);r.layers=this.layers,this.add(r);const s=new ln(Ti,Ai,e,t);s.layers=this.layers,this.add(s);const a=new ln(Ti,Ai,e,t);a.layers=this.layers,this.add(a);const o=new ln(Ti,Ai,e,t);o.layers=this.layers,this.add(o);const c=new ln(Ti,Ai,e,t);c.layers=this.layers,this.add(c);const l=new ln(Ti,Ai,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===pn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===er)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,f]=this.children,g=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const S=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;e.isWebGLRenderer===!0?h=e.state.buffers.depth.getReversed():h=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.mipmapsAutoUpdate=S,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,f),e.setRenderTarget(g,d,p),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class fu extends ln{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}class So extends nu{constructor(e=10,t=10,n=4473924,r=8947848){n=new We(n),r=new We(r);const s=t/2,a=e/t,o=e/2,c=[],l=[];for(let d=0,p=0,x=-o;d<=t;d++,x+=a){c.push(-o,0,x,o,0,x),c.push(x,0,-o,x,0,o);const S=d===s?n:r;S.toArray(l,p),p+=3,S.toArray(l,p),p+=3,S.toArray(l,p),p+=3,S.toArray(l,p),p+=3}const f=new Jt;f.setAttribute("position",new mt(c,3)),f.setAttribute("color",new mt(l,3));const g=new Tl({vertexColors:!0,toneMapped:!1});super(f,g),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}function Eo(i,e,t,n){const r=pu(n);switch(t){case ol:return i*e;case cl:return i*e/r.components*r.byteLength;case Ra:return i*e/r.components*r.byteLength;case ai:return i*e*2/r.components*r.byteLength;case Ca:return i*e*2/r.components*r.byteLength;case ll:return i*e*3/r.components*r.byteLength;case Mn:return i*e*4/r.components*r.byteLength;case Pa:return i*e*4/r.components*r.byteLength;case Fr:case Or:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Br:case zr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ws:case qs:return Math.max(i,16)*Math.max(e,8)/4;case Vs:case Xs:return Math.max(i,8)*Math.max(e,8)/2;case Ys:case Zs:case $s:case Js:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ks:case kr:case Qs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case js:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ea:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ta:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case na:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ia:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ra:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case sa:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case aa:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case oa:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case la:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ca:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ua:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ha:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case da:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case fa:case pa:case ma:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ga:case _a:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Vr:case xa:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function pu(i){switch(i){case nn:case il:return{byteLength:1,components:1};case ji:case rl:case yn:return{byteLength:2,components:1};case Aa:case wa:return{byteLength:2,components:4};case En:case Ta:case vn:return{byteLength:4,components:1};case sl:case al:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ba}}));typeof window<"u"&&(window.__THREE__?Be("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ba);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Dl(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function mu(i){const e=new WeakMap;function t(o,c){const l=o.array,f=o.usage,g=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,f),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:g}}function n(o,c,l){const f=c.array,g=c.updateRanges;if(i.bindBuffer(l,o),g.length===0)i.bufferSubData(l,0,f);else{g.sort((p,x)=>p.start-x.start);let d=0;for(let p=1;p<g.length;p++){const x=g[d],S=g[p];S.start<=x.start+x.count+1?x.count=Math.max(x.count,S.start+S.count-x.start):(++d,g[d]=S)}g.length=d+1;for(let p=0,x=g.length;p<x;p++){const S=g[p];i.bufferSubData(l,S.start*f.BYTES_PER_ELEMENT,f,S.start,S.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var gu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_u=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,xu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,vu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Su=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Eu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,yu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Tu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Au=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ru=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Cu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Pu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Lu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Du=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Iu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Nu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Uu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Fu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ou=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Bu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,zu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Gu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Hu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ku=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Vu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xu="gl_FragColor = linearToOutputTexel( gl_FragColor );",qu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Yu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Zu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Ku=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,$u=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ju=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Qu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ju=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,eh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,th=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,nh=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ih=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sh=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ah=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,oh=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,lh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ch=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,uh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hh=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dh=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,fh=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ph=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,mh=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,gh=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_h=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,xh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Eh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Th=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ah=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wh=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rh=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ch=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ph=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lh=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Dh=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ih=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Nh=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Uh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Oh=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Bh=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,zh=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Gh=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hh=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,kh=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Vh=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Wh=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Xh=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qh=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Yh=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Zh=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Kh=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$h=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Jh=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Qh=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,jh=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ed=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,td=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,id=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,sd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ad=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,od=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ld=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,cd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ud=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,hd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,fd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,pd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const md=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gd=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_d=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xd=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Md=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ed=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,yd=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,bd=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Td=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ad=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wd=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Rd=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Cd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Pd=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ld=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dd=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Id=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Nd=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ud=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Fd=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Od=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bd=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zd=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Gd=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hd=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kd=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vd=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Wd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xd=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qd=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Yd=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Zd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ye={alphahash_fragment:gu,alphahash_pars_fragment:_u,alphamap_fragment:xu,alphamap_pars_fragment:vu,alphatest_fragment:Mu,alphatest_pars_fragment:Su,aomap_fragment:Eu,aomap_pars_fragment:yu,batching_pars_vertex:bu,batching_vertex:Tu,begin_vertex:Au,beginnormal_vertex:wu,bsdfs:Ru,iridescence_fragment:Cu,bumpmap_pars_fragment:Pu,clipping_planes_fragment:Lu,clipping_planes_pars_fragment:Du,clipping_planes_pars_vertex:Iu,clipping_planes_vertex:Nu,color_fragment:Uu,color_pars_fragment:Fu,color_pars_vertex:Ou,color_vertex:Bu,common:zu,defaultnormal_vertex:Gu,displacementmap_pars_vertex:Hu,displacementmap_vertex:ku,emissivemap_fragment:Vu,emissivemap_pars_fragment:Wu,colorspace_fragment:Xu,colorspace_pars_fragment:qu,envmap_fragment:Yu,envmap_common_pars_fragment:Zu,envmap_pars_fragment:Ku,envmap_pars_vertex:$u,envmap_physical_pars_fragment:oh,envmap_vertex:Ju,fog_vertex:Qu,fog_pars_vertex:ju,fog_fragment:eh,fog_pars_fragment:th,gradientmap_pars_fragment:nh,lightmap_pars_fragment:ih,lights_lambert_fragment:rh,lights_lambert_pars_fragment:sh,lights_pars_begin:ah,lights_toon_fragment:lh,lights_toon_pars_fragment:ch,lights_phong_fragment:uh,lights_phong_pars_fragment:hh,lights_physical_fragment:dh,lights_physical_pars_fragment:fh,lights_fragment_begin:ph,lights_fragment_maps:mh,lights_fragment_end:gh,lightprobes_pars_fragment:_h,logdepthbuf_fragment:xh,logdepthbuf_pars_fragment:vh,logdepthbuf_pars_vertex:Mh,logdepthbuf_vertex:Sh,map_fragment:Eh,map_pars_fragment:yh,map_particle_fragment:bh,map_particle_pars_fragment:Th,metalnessmap_fragment:Ah,metalnessmap_pars_fragment:wh,morphinstance_vertex:Rh,morphcolor_vertex:Ch,morphnormal_vertex:Ph,morphtarget_pars_vertex:Lh,morphtarget_vertex:Dh,normal_fragment_begin:Ih,normal_fragment_maps:Nh,normal_pars_fragment:Uh,normal_pars_vertex:Fh,normal_vertex:Oh,normalmap_pars_fragment:Bh,clearcoat_normal_fragment_begin:zh,clearcoat_normal_fragment_maps:Gh,clearcoat_pars_fragment:Hh,iridescence_pars_fragment:kh,opaque_fragment:Vh,packing:Wh,premultiplied_alpha_fragment:Xh,project_vertex:qh,dithering_fragment:Yh,dithering_pars_fragment:Zh,roughnessmap_fragment:Kh,roughnessmap_pars_fragment:$h,shadowmap_pars_fragment:Jh,shadowmap_pars_vertex:Qh,shadowmap_vertex:jh,shadowmask_pars_fragment:ed,skinbase_vertex:td,skinning_pars_vertex:nd,skinning_vertex:id,skinnormal_vertex:rd,specularmap_fragment:sd,specularmap_pars_fragment:ad,tonemapping_fragment:od,tonemapping_pars_fragment:ld,transmission_fragment:cd,transmission_pars_fragment:ud,uv_pars_fragment:hd,uv_pars_vertex:dd,uv_vertex:fd,worldpos_vertex:pd,background_vert:md,background_frag:gd,backgroundCube_vert:_d,backgroundCube_frag:xd,cube_vert:vd,cube_frag:Md,depth_vert:Sd,depth_frag:Ed,distance_vert:yd,distance_frag:bd,equirect_vert:Td,equirect_frag:Ad,linedashed_vert:wd,linedashed_frag:Rd,meshbasic_vert:Cd,meshbasic_frag:Pd,meshlambert_vert:Ld,meshlambert_frag:Dd,meshmatcap_vert:Id,meshmatcap_frag:Nd,meshnormal_vert:Ud,meshnormal_frag:Fd,meshphong_vert:Od,meshphong_frag:Bd,meshphysical_vert:zd,meshphysical_frag:Gd,meshtoon_vert:Hd,meshtoon_frag:kd,points_vert:Vd,points_frag:Wd,shadow_vert:Xd,shadow_frag:qd,sprite_vert:Yd,sprite_frag:Zd},ye={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new Xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},_n={basic:{uniforms:Xt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:Ye.meshbasic_vert,fragmentShader:Ye.meshbasic_frag},lambert:{uniforms:Xt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new We(0)},envMapIntensity:{value:1}}]),vertexShader:Ye.meshlambert_vert,fragmentShader:Ye.meshlambert_frag},phong:{uniforms:Xt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ye.meshphong_vert,fragmentShader:Ye.meshphong_frag},standard:{uniforms:Xt([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag},toon:{uniforms:Xt([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new We(0)}}]),vertexShader:Ye.meshtoon_vert,fragmentShader:Ye.meshtoon_frag},matcap:{uniforms:Xt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:Ye.meshmatcap_vert,fragmentShader:Ye.meshmatcap_frag},points:{uniforms:Xt([ye.points,ye.fog]),vertexShader:Ye.points_vert,fragmentShader:Ye.points_frag},dashed:{uniforms:Xt([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ye.linedashed_vert,fragmentShader:Ye.linedashed_frag},depth:{uniforms:Xt([ye.common,ye.displacementmap]),vertexShader:Ye.depth_vert,fragmentShader:Ye.depth_frag},normal:{uniforms:Xt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:Ye.meshnormal_vert,fragmentShader:Ye.meshnormal_frag},sprite:{uniforms:Xt([ye.sprite,ye.fog]),vertexShader:Ye.sprite_vert,fragmentShader:Ye.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ye.background_vert,fragmentShader:Ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:Ye.backgroundCube_vert,fragmentShader:Ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ye.cube_vert,fragmentShader:Ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ye.equirect_vert,fragmentShader:Ye.equirect_frag},distance:{uniforms:Xt([ye.common,ye.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ye.distance_vert,fragmentShader:Ye.distance_frag},shadow:{uniforms:Xt([ye.lights,ye.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:Ye.shadow_vert,fragmentShader:Ye.shadow_frag}};_n.physical={uniforms:Xt([_n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ve},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag};const Ir={r:0,b:0,g:0},Kd=new pt,Il=new Ve;Il.set(-1,0,0,0,1,0,0,0,1);function $d(i,e,t,n,r,s){const a=new We(0);let o=r===!0?0:1,c,l,f=null,g=0,d=null;function p(E){let C=E.isScene===!0?E.background:null;if(C&&C.isTexture){const T=E.backgroundBlurriness>0;C=e.get(C,T)}return C}function x(E){let C=!1;const T=p(E);T===null?h(a,o):T&&T.isColor&&(h(T,1),C=!0);const P=i.xr.getEnvironmentBlendMode();P==="additive"?t.buffers.color.setClear(0,0,0,1,s):P==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function S(E,C){const T=p(C);T&&T.isCubeTexture?(l===void 0&&(l=new He(new Mt(1,1,1),new oi({name:"BackgroundCubeMaterial",uniforms:Ii(_n.backgroundCube.uniforms),vertexShader:_n.backgroundCube.vertexShader,fragmentShader:_n.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(P,w,m){this.matrixWorld.copyPosition(m.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=T,l.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Kd.makeRotationFromEuler(C.backgroundRotation)).transpose(),T.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Il),l.material.toneMapped=tt.getTransfer(T.colorSpace)!==ct,(f!==T||g!==T.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,f=T,g=T.version,d=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new He(new Xn(2,2),new oi({name:"BackgroundMaterial",uniforms:Ii(_n.background.uniforms),vertexShader:_n.background.vertexShader,fragmentShader:_n.background.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.toneMapped=tt.getTransfer(T.colorSpace)!==ct,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(f!==T||g!==T.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,f=T,g=T.version,d=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function h(E,C){E.getRGB(Ir,Cl(i)),t.buffers.color.setClear(Ir.r,Ir.g,Ir.b,C,s)}function u(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,C=1){a.set(E),o=C,h(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(E){o=E,h(a,o)},render:x,addToRenderList:S,dispose:u}}function Jd(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=d(null);let s=r,a=!1;function o(B,H,j,L,$){let te=!1;const J=g(B,L,j,H);s!==J&&(s=J,l(s.object)),te=p(B,L,j,$),te&&x(B,L,j,$),$!==null&&e.update($,i.ELEMENT_ARRAY_BUFFER),(te||a)&&(a=!1,T(B,H,j,L),$!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function c(){return i.createVertexArray()}function l(B){return i.bindVertexArray(B)}function f(B){return i.deleteVertexArray(B)}function g(B,H,j,L){const $=L.wireframe===!0;let te=n[H.id];te===void 0&&(te={},n[H.id]=te);const J=B.isInstancedMesh===!0?B.id:0;let ie=te[J];ie===void 0&&(ie={},te[J]=ie);let q=ie[j.id];q===void 0&&(q={},ie[j.id]=q);let R=q[$];return R===void 0&&(R=d(c()),q[$]=R),R}function d(B){const H=[],j=[],L=[];for(let $=0;$<t;$++)H[$]=0,j[$]=0,L[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:j,attributeDivisors:L,object:B,attributes:{},index:null}}function p(B,H,j,L){const $=s.attributes,te=H.attributes;let J=0;const ie=j.getAttributes();for(const q in ie)if(ie[q].location>=0){const M=$[q];let ee=te[q];if(ee===void 0&&(q==="instanceMatrix"&&B.instanceMatrix&&(ee=B.instanceMatrix),q==="instanceColor"&&B.instanceColor&&(ee=B.instanceColor)),M===void 0||M.attribute!==ee||ee&&M.data!==ee.data)return!0;J++}return s.attributesNum!==J||s.index!==L}function x(B,H,j,L){const $={},te=H.attributes;let J=0;const ie=j.getAttributes();for(const q in ie)if(ie[q].location>=0){let M=te[q];M===void 0&&(q==="instanceMatrix"&&B.instanceMatrix&&(M=B.instanceMatrix),q==="instanceColor"&&B.instanceColor&&(M=B.instanceColor));const ee={};ee.attribute=M,M&&M.data&&(ee.data=M.data),$[q]=ee,J++}s.attributes=$,s.attributesNum=J,s.index=L}function S(){const B=s.newAttributes;for(let H=0,j=B.length;H<j;H++)B[H]=0}function h(B){u(B,0)}function u(B,H){const j=s.newAttributes,L=s.enabledAttributes,$=s.attributeDivisors;j[B]=1,L[B]===0&&(i.enableVertexAttribArray(B),L[B]=1),$[B]!==H&&(i.vertexAttribDivisor(B,H),$[B]=H)}function E(){const B=s.newAttributes,H=s.enabledAttributes;for(let j=0,L=H.length;j<L;j++)H[j]!==B[j]&&(i.disableVertexAttribArray(j),H[j]=0)}function C(B,H,j,L,$,te,J){J===!0?i.vertexAttribIPointer(B,H,j,$,te):i.vertexAttribPointer(B,H,j,L,$,te)}function T(B,H,j,L){S();const $=L.attributes,te=j.getAttributes(),J=H.defaultAttributeValues;for(const ie in te){const q=te[ie];if(q.location>=0){let R=$[ie];if(R===void 0&&(ie==="instanceMatrix"&&B.instanceMatrix&&(R=B.instanceMatrix),ie==="instanceColor"&&B.instanceColor&&(R=B.instanceColor)),R!==void 0){const M=R.normalized,ee=R.itemSize,de=e.get(R);if(de===void 0)continue;const G=de.buffer,re=de.type,ae=de.bytesPerElement,ue=re===i.INT||re===i.UNSIGNED_INT||R.gpuType===Ta;if(R.isInterleavedBufferAttribute){const ne=R.data,Ae=ne.isInterleavedBuffer===!0?ne.stride:ne.itemSize,Ie=R.offset;if(ne.isInstancedInterleavedBuffer||ne.isInstancedBufferAttribute){for(let Me=0;Me<q.locationSize;Me++)u(q.location+Me,ne.meshPerAttribute);B.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Me=0;Me<q.locationSize;Me++)h(q.location+Me);i.bindBuffer(i.ARRAY_BUFFER,G);for(let Me=0;Me<q.locationSize;Me++)C(q.location+Me,ee/q.locationSize,re,M,Ae*ae,(Ie+ee/q.locationSize*Me)*ae,ue)}else{if(R.isInstancedBufferAttribute){for(let ne=0;ne<q.locationSize;ne++)u(q.location+ne,R.meshPerAttribute);B.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=R.meshPerAttribute*R.count)}else for(let ne=0;ne<q.locationSize;ne++)h(q.location+ne);i.bindBuffer(i.ARRAY_BUFFER,G);for(let ne=0;ne<q.locationSize;ne++)C(q.location+ne,ee/q.locationSize,re,M,ee*ae,ee/q.locationSize*ne*ae,ue)}}else if(J!==void 0){const M=J[ie];if(M!==void 0)switch(M.length){case 2:i.vertexAttrib2fv(q.location,M);break;case 3:i.vertexAttrib3fv(q.location,M);break;case 4:i.vertexAttrib4fv(q.location,M);break;default:i.vertexAttrib1fv(q.location,M)}}}}E()}function P(){z();for(const B in n){const H=n[B];for(const j in H){const L=H[j];for(const $ in L){const te=L[$];for(const J in te)f(te[J].object),delete te[J];delete L[$]}}delete n[B]}}function w(B){if(n[B.id]===void 0)return;const H=n[B.id];for(const j in H){const L=H[j];for(const $ in L){const te=L[$];for(const J in te)f(te[J].object),delete te[J];delete L[$]}}delete n[B.id]}function m(B){for(const H in n){const j=n[H];for(const L in j){const $=j[L];if($[B.id]===void 0)continue;const te=$[B.id];for(const J in te)f(te[J].object),delete te[J];delete $[B.id]}}}function y(B){for(const H in n){const j=n[H],L=B.isInstancedMesh===!0?B.id:0,$=j[L];if($!==void 0){for(const te in $){const J=$[te];for(const ie in J)f(J[ie].object),delete J[ie];delete $[te]}delete j[L],Object.keys(j).length===0&&delete n[H]}}}function z(){D(),a=!0,s!==r&&(s=r,l(s.object))}function D(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:z,resetDefaultState:D,dispose:P,releaseStatesOfGeometry:w,releaseStatesOfObject:y,releaseStatesOfProgram:m,initAttributes:S,enableAttribute:h,disableUnusedAttributes:E}}function Qd(i,e,t){let n;function r(c){n=c}function s(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,f){f!==0&&(i.drawArraysInstanced(n,c,l,f),t.update(l,n,f))}function o(c,l,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,f);let d=0;for(let p=0;p<f;p++)d+=l[p];t.update(d,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function jd(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const m=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(m.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(m){return!(m!==Mn&&n.convert(m)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(m){const y=m===yn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(m!==nn&&m!==vn&&!y&&n.convert(m)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(m){if(m==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";m="mediump"}return m==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const f=c(l);f!==l&&(Be("WebGLRenderer:",l,"not supported, using",f,"instead."),l=f);const g=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=t.logarithmicDepthBuffer===!0&&g===!1;t.reversedDepthBuffer===!0&&g===!1&&Be("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&g===!0&&Be("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=i.getParameter(i.MAX_TEXTURE_SIZE),h=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),u=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),C=i.getParameter(i.MAX_VARYING_VECTORS),T=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:g,maxTextures:p,maxVertexTextures:x,maxTextureSize:S,maxCubemapSize:h,maxAttributes:u,maxVertexUniforms:E,maxVaryings:C,maxFragmentUniforms:T,maxSamples:P,samples:w}}function ef(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new Hn,o=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(g,d){const p=g.length!==0||d||n!==0||r;return r=d,n=g.length,p},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(g,d){t=f(g,d,0)},this.setState=function(g,d,p){const x=g.clippingPlanes,S=g.clipIntersection,h=g.clipShadows,u=i.get(g);if(!r||x===null||x.length===0||s&&!h)s?f(null):l();else{const E=s?0:n,C=E*4;let T=u.clippingState||null;c.value=T,T=f(x,d,C,p);for(let P=0;P!==C;++P)T[P]=t[P];u.clippingState=T,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function f(g,d,p,x){const S=g!==null?g.length:0;let h=null;if(S!==0){if(h=c.value,x!==!0||h===null){const u=p+S*4,E=d.matrixWorldInverse;o.getNormalMatrix(E),(h===null||h.length<u)&&(h=new Float32Array(u));for(let C=0,T=p;C!==S;++C,T+=4)a.copy(g[C]).applyMatrix4(E,o),a.normal.toArray(h,T),h[T+3]=a.constant}c.value=h,c.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,h}}class Oa extends Sn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Al(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Mt(5,5,5),s=new oi({name:"CubemapFromEquirect",uniforms:Ii(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$t,blending:Ri});s.uniforms.tEquirect.value=t;const a=new He(r,s),o=t.minFilter;return t.minFilter===Vn&&(t.minFilter=Kt),new Sa(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}const yo=256,tf=3,nf=20,Nl=256,Ul=16,rf=3,sf=new V,af=new We;class Jr{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Sa(1,10,null),this._boxMesh=new He(new Mt(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=sf}=s,c=this._renderer;this._setSize(a);const l=this._allocateTarget(),f=this._getSourceTarget(!0);t>0&&(f.texture.mipmapsAutoUpdate=!1);const g=c.autoClear,d=c.autoClearColor,p=c.autoClearDepth,x=c.autoClearStencil,S=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,S===null&&(e.background=c.getClearColor(af));const h=new Sa(n,r,f);return h.position.copy(o),h.update(c,e),c.autoClear=g,c.autoClearColor=d,c.autoClearDepth=p,c.autoClearStencil=x,e.background=S,t>0&&(f.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ao(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=To(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(yo,Cc(e))}_fromTexture(e,t){e.mapping===Pi||e.mapping===Qi?this._setSize(e.image.length===0?yo:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){const e=this._cubeSize,t=bo(e,!1,!1),n=Math.log2(e)-tf;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){const t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=bo(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){const r=this._boxMesh,s=this._cubeCamera;r.material=n,s.renderTarget=e,s.activeMipmapLevel=t;const a=e.width>>t;e.viewport.set(0,0,a,a),s.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Pi||e.mapping===Qi?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ao()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=To()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=of(),this._integrationMaterial=lf());const t=this._cubeSize,n=e.texture.mipmaps.length-1,r=this._ggxMaterial.uniforms;r.envMap.value=this._sourceTarget.texture;const s=this._integrationMaterial.uniforms;s.envMap.value=this._sourceTarget.texture,s.sourceLod.value=Math.log2(t/Ul);for(let a=0;a<=n;a++){const o=Jr.lodToRoughness(a,n);if(a>n-rf)s.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{const c=o>0?Math.log2(t)+.5*Math.log2(6/(Nl*Math.pow(o,4)))+.5:0;r.roughness.value=o,r.lodBias.value=c,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=cf());const n=this._blurMaterial,r=n.uniforms,s=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=s.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(s,0,n)}}function bo(i,e,t){return new Oa(i,{minFilter:Vn,generateMipmaps:e,type:yn,colorSpace:Wr,depthBuffer:t})}function ir(i,e,t){return new oi({name:i,uniforms:e,vertexShader:Ye.cube_vert,fragmentShader:t,side:$t,blending:Ri,depthTest:!1,depthWrite:!1})}function of(){return ir("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Nl}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function lf(){return ir("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Ul}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function cf(){return ir("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${nf}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function To(){return ir("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Ao(){return ir("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function uf(i){let e=new WeakMap,t=new WeakMap,n=null;function r(d,p=!1){return d==null?null:p?a(d):s(d)}function s(d){if(d&&d.isTexture){const p=d.mapping;if(p===ns||p===is)if(e.has(d)){const x=e.get(d).texture;return o(x,d.mapping)}else{const x=d.image;if(x&&x.height>0){const S=new Oa(x.height);return S.fromEquirectangularTexture(i,d),e.set(d,S),d.addEventListener("dispose",l),o(S.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){const p=d.mapping,x=p===ns||p===is,S=p===Pi||p===Qi;if(x||S){let h=t.get(d);const u=h!==void 0?h.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==u)return n===null&&(n=new Jr(i)),h=x?n.fromEquirectangular(d,h):n.fromCubemap(d,h),h.texture.pmremVersion=d.pmremVersion,t.set(d,h),h.texture;if(h!==void 0)return h.texture;{const E=d.image;return x&&E&&E.height>0||S&&E&&c(E)?(n===null&&(n=new Jr(i)),h=x?n.fromEquirectangular(d):n.fromCubemap(d),h.texture.pmremVersion=d.pmremVersion,t.set(d,h),d.addEventListener("dispose",f),h.texture):null}}}return d}function o(d,p){return p===ns?d.mapping=Pi:p===is&&(d.mapping=Qi),d}function c(d){let p=0;const x=6;for(let S=0;S<x;S++)d[S]!==void 0&&p++;return p===x}function l(d){const p=d.target;p.removeEventListener("dispose",l);const x=e.get(p);x!==void 0&&(e.delete(p),x.dispose())}function f(d){const p=d.target;p.removeEventListener("dispose",f);const x=t.get(p);x!==void 0&&(t.delete(p),x.dispose())}function g(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:g}}function hf(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Gr("WebGLRenderer: "+n+" extension not supported."),r}}}function df(i,e,t,n){const r={},s=new WeakMap,a=new FinalizationRegistry(x=>delete r[x]);function o(x){c(x.target)}function c(x){x.index!==null&&e.remove(x.index);for(const h in x.attributes)e.remove(x.attributes[h]);x.removeEventListener("dispose",o),delete r[x.id],a.unregister(x);const S=s.get(x);S&&(e.remove(S),s.delete(x)),n.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,t.memory.geometries--}function l(x,S){return r[S.id]!==void 0||(S.addEventListener("dispose",o),r[S.id]=new WeakRef(S),a.register(S,S.id,S),t.memory.geometries++),S}function f(x){const S=x.attributes;for(const h in S)e.update(S[h],i.ARRAY_BUFFER)}function g(x){const S=x.index,h=x.attributes.position;let u=0;if(h===void 0)return;const E=S!==null?S.array.length:h.array.length/3-1,C=h.count>=65535?Sl:Ml,T=new C(Math.ceil(E/3)*6,1),P=T.array;if(S!==null){const m=S.array;u=S.version;for(let y=0,z=0;y<E;y+=3){const D=m[y+0],B=m[y+1],H=m[y+2];P[z++]=D,P[z++]=B,P[z++]=B,P[z++]=H,P[z++]=H,P[z++]=D}}else{u=h.version;for(let m=0,y=0;m<E;m+=3){const z=m+0,D=m+1,B=m+2;P[y++]=z,P[y++]=D,P[y++]=D,P[y++]=B,P[y++]=B,P[y++]=z}}T.version=u;const w=s.get(x);w&&e.remove(w),s.set(x,T)}function d(x){const S=s.get(x);if(S){const h=x.index;h!==null&&S.version<h.version&&g(x)}else g(x);return s.get(x)}function p(){for(const x in r){const S=r[x].deref();S!==void 0&&c(S)}}return{get:l,update:f,getWireframeAttribute:d,dispose:p}}function ff(i,e,t){let n;function r(g){n=g}let s,a;function o(g){s=g.type,a=g.bytesPerElement}function c(g,d){i.drawElements(n,d,s,g*a),t.update(d,n,1)}function l(g,d,p){p!==0&&(i.drawElementsInstanced(n,d,s,g*a,p),t.update(d,n,p))}function f(g,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,g,0,p);let S=0;for(let h=0;h<p;h++)S+=d[h];t.update(S,n,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=f}function pf(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:rt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function mf(i,e,t){const n=new WeakMap,r=new yt;function s(a,o,c){const l=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,g=f!==void 0?f.length:0;let d=n.get(o);if(d===void 0||d.count!==g){let z=function(){m.dispose(),n.delete(o),o.removeEventListener("dispose",z)};d!==void 0&&d.texture.dispose();const p=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,S=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],u=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let C=0;p===!0&&(C=1),x===!0&&(C=2),S===!0&&(C=3);let T=o.attributes.position.count*C,P=1;T>e.maxTextureSize&&(P=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const w=new Float32Array(T*P*4*g),m=new _l(w,T,P,g);m.type=vn,m.needsUpdate=!0;const y=C*4;for(let D=0;D<g;D++){const B=h[D],H=u[D],j=E[D],L=T*P*4*D;for(let $=0;$<B.count;$++){const te=$*y;p===!0&&(r.fromBufferAttribute(B,$),w[L+te+0]=r.x,w[L+te+1]=r.y,w[L+te+2]=r.z,w[L+te+3]=0),x===!0&&(r.fromBufferAttribute(H,$),w[L+te+4]=r.x,w[L+te+5]=r.y,w[L+te+6]=r.z,w[L+te+7]=0),S===!0&&(r.fromBufferAttribute(j,$),w[L+te+8]=r.x,w[L+te+9]=r.y,w[L+te+10]=r.z,w[L+te+11]=j.itemSize===4?r.w:1)}}d={count:g,texture:m,size:new Xe(T,P)},n.set(o,d),o.addEventListener("dispose",z)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let S=0;S<l.length;S++)p+=l[S];const x=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:s}}function gf(i,e,t,n,r){let s=new WeakMap;function a(l){const f=r.render.frame,g=l.geometry,d=e.get(l,g);if(s.get(d)!==f&&(e.update(d),s.set(d,f)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==f&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,f))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==f&&(p.update(),s.set(p,f))}return d}function o(){s=new WeakMap}function c(l){const f=l.target;f.removeEventListener("dispose",c),n.releaseStatesOfObject(f),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:a,dispose:o}}const _f={[Ko]:"LINEAR_TONE_MAPPING",[$o]:"REINHARD_TONE_MAPPING",[Jo]:"CINEON_TONE_MAPPING",[Qo]:"ACES_FILMIC_TONE_MAPPING",[el]:"AGX_TONE_MAPPING",[tl]:"NEUTRAL_TONE_MAPPING",[jo]:"CUSTOM_TONE_MAPPING"};function xf(i,e,t,n,r,s){const a=new Sn(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null,l=null;const f=new Jt;f.setAttribute("position",new mt([-1,3,0,-1,-1,0,3,-1,0],3)),f.setAttribute("uv",new mt([0,2,0,0,2,0],2));const g=new ou({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new He(f,g),p=new Fa(-1,1,1,-1,0,1);let x=null,S=null,h=!1,u,E=null,C=[],T=!1;this.setSize=function(P,w){a.setSize(P,w),o!==null&&o.setSize(P,w),c!==null&&c.setSize(P,w);for(let m=0;m<C.length;m++){const y=C[m];y.setSize&&y.setSize(P,w)}},this.setEffects=function(P){C=P,T=C.length>0&&C[0].isRenderPass===!0;const w=a.width,m=a.height;C.length>0&&o===null&&(o=new Sn(w,m,{type:yn,depthBuffer:!1,stencilBuffer:!1}),c=new Sn(w,m,{type:yn,depthBuffer:!1,stencilBuffer:!1}));const y=r===!0&&C.some(z=>z.needsDepthTexture===!0);y!==(a.depthTexture!==null)&&(y===!0&&l===null&&(l=new Di(w,m),s===!0&&(l.format=Wn,l.type=Li)),a.dispose(),a.depthTexture=y?l:null,a.resolveDepthBuffer=y,a.storeMultisampledDepthBuffer=y);for(let z=0;z<C.length;z++){const D=C[z];D.setSize&&D.setSize(w,m),y&&D.needsDepthTexture===!0&&D.setDepthTexture&&D.setDepthTexture(l)}},this.begin=function(P,w){if(h||P.toneMapping===Dn&&C.length===0)return!1;if(E=w,w!==null){const m=w.width,y=w.height;(a.width!==m||a.height!==y)&&this.setSize(m,y)}return T===!1&&P.setRenderTarget(a),u=P.toneMapping,P.toneMapping=Dn,!0},this.hasRenderPass=function(){return T},this.end=function(P,w){P.toneMapping=u,h=!0;let m=a,y=o;for(let z=0;z<C.length;z++){const D=C[z];D.enabled!==!1&&(D.render(P,y,m,w),D.needsSwap!==!1&&(m=y,y=y===o?c:o))}if(x!==P.outputColorSpace||S!==P.toneMapping){x=P.outputColorSpace,S=P.toneMapping,g.defines={},tt.getTransfer(x)===ct&&(g.defines.SRGB_TRANSFER="");const z=_f[S];z&&(g.defines[z]=""),g.needsUpdate=!0}g.uniforms.tDiffuse.value=m.texture,P.setRenderTarget(E),P.render(d,p),E=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),f.dispose(),g.dispose()}}const Fl=new kt,Ol=new Di(1,1),Bl=new wl(1),zl=new _l,Gl=new Uc,Hl=new Al,wo=[],Ro=[],Co=new Float32Array(16),Po=new Float32Array(9),Lo=new Float32Array(4);function Ui(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=wo[r];if(s===void 0&&(s=new Float32Array(r),wo[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Ct(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Pt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function es(i,e){let t=Ro[e];t===void 0&&(t=new Int32Array(e),Ro[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function vf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Mf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;i.uniform2fv(this.addr,e),Pt(t,e)}}function Sf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ct(t,e))return;i.uniform3fv(this.addr,e),Pt(t,e)}}function Ef(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;i.uniform4fv(this.addr,e),Pt(t,e)}}function yf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,n))return;Lo.set(n),i.uniformMatrix2fv(this.addr,!1,Lo),Pt(t,n)}}function bf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,n))return;Po.set(n),i.uniformMatrix3fv(this.addr,!1,Po),Pt(t,n)}}function Tf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,n))return;Co.set(n),i.uniformMatrix4fv(this.addr,!1,Co),Pt(t,n)}}function Af(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function wf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;i.uniform2iv(this.addr,e),Pt(t,e)}}function Rf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;i.uniform3iv(this.addr,e),Pt(t,e)}}function Cf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;i.uniform4iv(this.addr,e),Pt(t,e)}}function Pf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Lf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;i.uniform2uiv(this.addr,e),Pt(t,e)}}function Df(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;i.uniform3uiv(this.addr,e),Pt(t,e)}}function If(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;i.uniform4uiv(this.addr,e),Pt(t,e)}}function ts(i){return i.version===0&&(i.compareFunction=dl,i.needsUpdate=!0),i}function Nf(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?s=ts(Ol):s=Fl,t.setTexture2D(e||s,r)}function Uf(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Gl,r)}function Ff(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_CUBE_SHADOW?s=ts(Bl):s=Hl,t.setTextureCube(e||s,r)}function Of(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||zl,r)}function Bf(i){switch(i){case 5126:return vf;case 35664:return Mf;case 35665:return Sf;case 35666:return Ef;case 35674:return yf;case 35675:return bf;case 35676:return Tf;case 5124:case 35670:return Af;case 35667:case 35671:return wf;case 35668:case 35672:return Rf;case 35669:case 35673:return Cf;case 5125:return Pf;case 36294:return Lf;case 36295:return Df;case 36296:return If;case 35678:case 36198:case 36298:case 36306:case 35682:return Nf;case 35679:case 36299:case 36307:return Uf;case 35680:case 36300:case 36308:case 36293:return Ff;case 36289:case 36303:case 36311:case 36292:return Of}}function zf(i,e){i.uniform1fv(this.addr,e)}function Gf(i,e){const t=Ui(e,this.size,2);i.uniform2fv(this.addr,t)}function Hf(i,e){const t=Ui(e,this.size,3);i.uniform3fv(this.addr,t)}function kf(i,e){const t=Ui(e,this.size,4);i.uniform4fv(this.addr,t)}function Vf(i,e){const t=Ui(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Wf(i,e){const t=Ui(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Xf(i,e){const t=Ui(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function qf(i,e){i.uniform1iv(this.addr,e)}function Yf(i,e){i.uniform2iv(this.addr,e)}function Zf(i,e){i.uniform3iv(this.addr,e)}function Kf(i,e){i.uniform4iv(this.addr,e)}function $f(i,e){i.uniform1uiv(this.addr,e)}function Jf(i,e){i.uniform2uiv(this.addr,e)}function Qf(i,e){i.uniform3uiv(this.addr,e)}function jf(i,e){i.uniform4uiv(this.addr,e)}function ep(i,e,t){const n=this.cache,r=e.length,s=es(t,r);Ct(n,s)||(i.uniform1iv(this.addr,s),Pt(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=ts(Ol):a=Fl;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function tp(i,e,t){const n=this.cache,r=e.length,s=es(t,r);Ct(n,s)||(i.uniform1iv(this.addr,s),Pt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Gl,s[a])}function np(i,e,t){const n=this.cache,r=e.length,s=es(t,r);Ct(n,s)||(i.uniform1iv(this.addr,s),Pt(n,s));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=ts(Bl):a=Hl;for(let o=0;o!==r;++o)t.setTextureCube(e[o]||a,s[o])}function ip(i,e,t){const n=this.cache,r=e.length,s=es(t,r);Ct(n,s)||(i.uniform1iv(this.addr,s),Pt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||zl,s[a])}function rp(i){switch(i){case 5126:return zf;case 35664:return Gf;case 35665:return Hf;case 35666:return kf;case 35674:return Vf;case 35675:return Wf;case 35676:return Xf;case 5124:case 35670:return qf;case 35667:case 35671:return Yf;case 35668:case 35672:return Zf;case 35669:case 35673:return Kf;case 5125:return $f;case 36294:return Jf;case 36295:return Qf;case 36296:return jf;case 35678:case 36198:case 36298:case 36306:case 35682:return ep;case 35679:case 36299:case 36307:return tp;case 35680:case 36300:case 36308:case 36293:return np;case 36289:case 36303:case 36311:case 36292:return ip}}class sp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Bf(t.type)}}class ap{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=rp(t.type)}}class op{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const Ds=/(\w+)(\])?(\[|\.)?/g;function Do(i,e){i.seq.push(e),i.map[e.id]=e}function lp(i,e,t){const n=i.name,r=n.length;for(Ds.lastIndex=0;;){const s=Ds.exec(n),a=Ds.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Do(t,l===void 0?new sp(o,i,e):new ap(o,i,e));break}else{let g=t.map[o];g===void 0&&(g=new op(o),Do(t,g)),t=g}}}class Hr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);lp(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Io(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const cp=37297;let up=0;function hp(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const No=new Ve;function dp(i){tt._getMatrix(No,tt.workingColorSpace,i);const e=`mat3( ${No.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(i)){case Xr:return[e,"LinearTransferOETF"];case ct:return[e,"sRGBTransferOETF"];default:return Be("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Uo(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+hp(i.getShaderSource(e),o)}else return s}function fp(i,e){const t=dp(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const pp={[Ko]:"Linear",[$o]:"Reinhard",[Jo]:"Cineon",[Qo]:"ACESFilmic",[el]:"AgX",[tl]:"Neutral",[jo]:"Custom"};function mp(i,e){const t=pp[e];return t===void 0?(Be("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Nr=new V;function gp(){tt.getLuminanceCoefficients(Nr);const i=Nr.x.toFixed(4),e=Nr.y.toFixed(4),t=Nr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function _p(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Yi).join(`
`)}function xp(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function vp(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Yi(i){return i!==""}function Fo(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Oo(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Mp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ea(i){return i.replace(Mp,Sp)}function Sp(i,e){const t=Ye[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Ea(t)}const Ep=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bo(i){return i.replace(Ep,yp)}function yp(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function zo(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const bp={[Ur]:"SHADOWMAP_TYPE_PCF",[qi]:"SHADOWMAP_TYPE_VSM"};function Tp(i){return bp[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Ap={[Qi]:"ENVMAP_MODE_REFRACTION"};function wp(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Ap[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Rp={[Zo]:"ENVMAP_BLENDING_MULTIPLY",[fc]:"ENVMAP_BLENDING_MIX",[pc]:"ENVMAP_BLENDING_ADD"};function Cp(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Rp[i.combine]||"ENVMAP_BLENDING_NONE"}function Pp(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Tp(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",f=wp(t),g=Cp(t),d=_p(t),p=xp(s),x=r.createProgram();let S,h,u=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(S=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Yi).join(`
`),S.length>0&&(S+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Yi).join(`
`),h.length>0&&(h+=`
`)):(S=[zo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yi).join(`
`),h=[zo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+f:"",t.envMap?"#define "+g:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Dn?"#define TONE_MAPPING":"",t.toneMapping!==Dn?Ye.tonemapping_pars_fragment:"",t.toneMapping!==Dn?mp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ye.colorspace_pars_fragment,fp("linearToOutputTexel",t.outputColorSpace),gp(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Yi).join(`
`)),a=Ea(a),a=Fo(a,t),a=Oo(a,t),o=Ea(o),o=Fo(o,t),o=Oo(o,t),a=Bo(a),o=Bo(o),t.isRawShaderMaterial!==!0&&(u=`#version 300 es
`,S=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,h=["#define varying in",t.glslVersion===Wa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Wa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const E=u+S+a,C=u+h+o,T=Io(r,r.VERTEX_SHADER,E),P=Io(r,r.FRAGMENT_SHADER,C);r.attachShader(x,T),r.attachShader(x,P),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function w(D){if(i.debug.checkShaderErrors){const B=r.getProgramInfoLog(x)||"",H=r.getShaderInfoLog(T)||"",j=r.getShaderInfoLog(P)||"",L=B.trim(),$=H.trim(),te=j.trim();let J=!0,ie=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,x,T,P);else{const q=Uo(r,T,"vertex"),R=Uo(r,P,"fragment");rt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+L+`
`+q+`
`+R)}else L!==""?Be("WebGLProgram: Program Info Log:",L):($===""||te==="")&&(ie=!1);ie&&(D.diagnostics={runnable:J,programLog:L,vertexShader:{log:$,prefix:S},fragmentShader:{log:te,prefix:h}})}r.deleteShader(T),r.deleteShader(P),m=new Hr(r,x),y=vp(r,x)}let m;this.getUniforms=function(){return m===void 0&&w(this),m};let y;this.getAttributes=function(){return y===void 0&&w(this),y};let z=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=r.getProgramParameter(x,cp)),z},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=up++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=P,this}let Lp=0;class Dp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Ip(e),t.set(e,n)),n}}class Ip{constructor(e){this.id=Lp++,this.code=e,this.usedTimes=0}}function Np(i){return i===ai||i===kr||i===Vr}function Up(i,e,t,n,r,s){const a=new xl,o=new Dp,c=new Set,l=[],f=new Map,g=n.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(m){return c.add(m),m===0?"uv":`uv${m}`}function x(m,y,z,D,B,H){const j=D.fog,L=B.geometry,$=m.isMeshStandardMaterial||m.isMeshLambertMaterial||m.isMeshPhongMaterial?D.environment:null,te=m.isMeshStandardMaterial||m.isMeshLambertMaterial&&!m.envMap||m.isMeshPhongMaterial&&!m.envMap,J=e.get(m.envMap||$,te),ie=d[m.type];let q=n.precision;m.precision!==null&&(q=n.getMaxPrecision(m.precision),q!==m.precision&&Be("WebGLProgram.getParameters:",m.precision,"not supported, using",q,"instead."));const R=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,M=R!==void 0?R.length:0;let ee=0;L.morphAttributes.position!==void 0&&(ee=1),L.morphAttributes.normal!==void 0&&(ee=2),L.morphAttributes.color!==void 0&&(ee=3);let de,G,re,ae;if(ie){const se=_n[ie];de=se.vertexShader,G=se.fragmentShader}else{de=m.vertexShader,G=m.fragmentShader;const se=o.getVertexShaderStage(m),Pe=o.getFragmentShaderStage(m);o.update(m,se,Pe),re=se.id,ae=Pe.id}const ue=i.getRenderTarget(),ne=i.state.buffers.depth.getReversed(),Ae=B.isInstancedMesh===!0,Ie=B.isBatchedMesh===!0,Me=!!m.map,Ne=!!m.matcap,Oe=!!J,Se=Oe&&J.isPMREMTexture===!0,ke=!!m.aoMap,Je=!!m.lightMap,Ze=!!m.bumpMap&&m.wireframe===!1,Ke=!!m.normalMap,gt=!!m.displacementMap,qe=!!m.emissiveMap,ot=!!m.metalnessMap,Lt=!!m.roughnessMap,_t=m.anisotropy>0,N=m.clearcoat>0,bt=m.diffuseRoughness>0,at=m.dispersion>0,lt=m.retroreflectivity>0,_e=m.iridescence>0,dt=m.sheen>0,De=m.transmission>0,Fe=_t&&!!m.anisotropyMap,b=N&&!!m.clearcoatMap,_=N&&!!m.clearcoatNormalMap,O=N&&!!m.clearcoatRoughnessMap,Q=bt&&!!m.diffuseRoughnessMap,Z=_e&&!!m.iridescenceMap,oe=_e&&!!m.iridescenceThicknessMap,fe=dt&&!!m.sheenColorMap,X=dt&&!!m.sheenRoughnessMap,F=!!m.specularMap,ce=!!m.specularColorMap,A=!!m.specularIntensityMap,U=De&&!!m.transmissionMap,Y=De&&!!m.thicknessMap,me=!!m.gradientMap,pe=!!m.alphaMap,ge=m.alphaTest>0,be=!!m.alphaHash,Ue=!!m.extensions;let he=Dn;m.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(he=i.toneMapping);const le=Se?J.isCompressedCubeTexture?J.image[0].mipmaps:J.mipmaps:null,Ee={shaderID:ie,shaderType:m.type,shaderName:m.name,vertexShader:de,fragmentShader:G,defines:m.defines,customVertexShaderID:re,customFragmentShaderID:ae,isRawShaderMaterial:m.isRawShaderMaterial===!0,glslVersion:m.glslVersion,precision:q,batching:Ie,batchingColor:Ie&&B._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&B.instanceColor!==null,instancingMorph:Ae&&B.morphTexture!==null,outputColorSpace:ue===null?i.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:tt.workingColorSpace,alphaToCoverage:!!m.alphaToCoverage,map:Me,matcap:Ne,envMap:Oe,envMapMode:Oe&&J.mapping,envMapPMREM:Se,envMapMaxLod:Se?le.length-1:null,envMapSize:Se?le[0].width:null,aoMap:ke,lightMap:Je,bumpMap:Ze,normalMap:Ke,displacementMap:gt,emissiveMap:qe,normalMapObjectSpace:Ke&&m.normalMapType===_c,normalMapTangentSpace:Ke&&m.normalMapType===va,packedNormalMap:Ke&&m.normalMapType===va&&Np(m.normalMap.format),metalnessMap:ot,roughnessMap:Lt,anisotropy:_t,anisotropyMap:Fe,clearcoat:N,clearcoatMap:b,clearcoatNormalMap:_,clearcoatRoughnessMap:O,diffuseRoughness:bt,diffuseRoughnessMap:Q,dispersion:at,retroreflection:lt,iridescence:_e,iridescenceMap:Z,iridescenceThicknessMap:oe,sheen:dt,sheenColorMap:fe,sheenRoughnessMap:X,specularMap:F,specularColorMap:ce,specularIntensityMap:A,transmission:De,transmissionMap:U,thicknessMap:Y,gradientMap:me,opaque:m.transparent===!1&&m.blending===Zi&&m.alphaToCoverage===!1,alphaMap:pe,alphaTest:ge,alphaHash:be,combine:m.combine,mapUv:Me&&p(m.map.channel),aoMapUv:ke&&p(m.aoMap.channel),lightMapUv:Je&&p(m.lightMap.channel),bumpMapUv:Ze&&p(m.bumpMap.channel),normalMapUv:Ke&&p(m.normalMap.channel),displacementMapUv:gt&&p(m.displacementMap.channel),emissiveMapUv:qe&&p(m.emissiveMap.channel),metalnessMapUv:ot&&p(m.metalnessMap.channel),roughnessMapUv:Lt&&p(m.roughnessMap.channel),anisotropyMapUv:Fe&&p(m.anisotropyMap.channel),clearcoatMapUv:b&&p(m.clearcoatMap.channel),clearcoatNormalMapUv:_&&p(m.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:O&&p(m.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:Q&&p(m.diffuseRoughnessMap.channel),iridescenceMapUv:Z&&p(m.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&p(m.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&p(m.sheenColorMap.channel),sheenRoughnessMapUv:X&&p(m.sheenRoughnessMap.channel),specularMapUv:F&&p(m.specularMap.channel),specularColorMapUv:ce&&p(m.specularColorMap.channel),specularIntensityMapUv:A&&p(m.specularIntensityMap.channel),transmissionMapUv:U&&p(m.transmissionMap.channel),thicknessMapUv:Y&&p(m.thicknessMap.channel),alphaMapUv:pe&&p(m.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(Ke||_t),vertexNormals:!!L.attributes.normal,vertexColors:m.vertexColors,vertexAlphas:m.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!L.attributes.uv&&(Me||pe),fog:!!j,useFog:m.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:m.wireframe===!1&&(m.flatShading===!0||L.attributes.normal===void 0&&Ke===!1&&(m.isMeshLambertMaterial||m.isMeshPhongMaterial||m.isMeshStandardMaterial||m.isMeshPhysicalMaterial)),sizeAttenuation:m.sizeAttenuation===!0,logarithmicDepthBuffer:g,reversedDepthBuffer:ne,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:L.attributes.position!==void 0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:M,morphTextureStride:ee,numSunLights:y.sun.length,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numSunLightShadows:y.sunShadowMap.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numLightProbeGrids:H.filter(se=>se.texture!==null).length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:m.dithering,shadowMapEnabled:i.shadowMap.enabled&&z.length>0,shadowMapType:i.shadowMap.type,toneMapping:he,decodeVideoTexture:Me&&m.map.isVideoTexture===!0&&tt.getTransfer(m.map.colorSpace)===ct,decodeVideoTextureEmissive:qe&&m.emissiveMap.isVideoTexture===!0&&tt.getTransfer(m.emissiveMap.colorSpace)===ct,premultipliedAlpha:m.premultipliedAlpha,doubleSided:m.side===xn,flipSided:m.side===$t,useDepthPacking:m.depthPacking>=0,depthPacking:m.depthPacking||0,index0AttributeName:m.index0AttributeName,extensionClipCullDistance:Ue&&m.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ue&&m.extensions.multiDraw===!0||Ie)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:m.customProgramCacheKey()};return Ee.vertexUv1s=c.has(1),Ee.vertexUv2s=c.has(2),Ee.vertexUv3s=c.has(3),c.clear(),Ee}function S(m){const y=[];if(m.shaderID?y.push(m.shaderID):(y.push(m.customVertexShaderID),y.push(m.customFragmentShaderID)),m.defines!==void 0)for(const z in m.defines)y.push(z),y.push(m.defines[z]);return m.isRawShaderMaterial===!1&&(h(y,m),u(y,m),y.push(i.outputColorSpace)),y.push(m.customProgramCacheKey),y.join()}function h(m,y){m.push(y.precision),m.push(y.outputColorSpace),m.push(y.envMapMode),m.push(y.envMapPMREM),m.push(y.envMapMaxLod),m.push(y.envMapSize),m.push(y.mapUv),m.push(y.alphaMapUv),m.push(y.lightMapUv),m.push(y.aoMapUv),m.push(y.bumpMapUv),m.push(y.normalMapUv),m.push(y.displacementMapUv),m.push(y.emissiveMapUv),m.push(y.metalnessMapUv),m.push(y.roughnessMapUv),m.push(y.anisotropyMapUv),m.push(y.clearcoatMapUv),m.push(y.clearcoatNormalMapUv),m.push(y.clearcoatRoughnessMapUv),m.push(y.diffuseRoughnessMapUv),m.push(y.iridescenceMapUv),m.push(y.iridescenceThicknessMapUv),m.push(y.sheenColorMapUv),m.push(y.sheenRoughnessMapUv),m.push(y.specularMapUv),m.push(y.specularColorMapUv),m.push(y.specularIntensityMapUv),m.push(y.transmissionMapUv),m.push(y.thicknessMapUv),m.push(y.combine),m.push(y.fogExp2),m.push(y.sizeAttenuation),m.push(y.morphTargetsCount),m.push(y.numSunLights),m.push(y.numDirLights),m.push(y.numPointLights),m.push(y.numSpotLights),m.push(y.numSpotLightMaps),m.push(y.numHemiLights),m.push(y.numRectAreaLights),m.push(y.numSunLightShadows),m.push(y.numDirLightShadows),m.push(y.numPointLightShadows),m.push(y.numSpotLightShadows),m.push(y.numSpotLightShadowsWithMaps),m.push(y.numLightProbes),m.push(y.numLightProbeGrids),m.push(y.shadowMapType),m.push(y.toneMapping),m.push(y.numClippingPlanes),m.push(y.numClipIntersection),m.push(y.depthPacking)}function u(m,y){a.disableAll(),y.instancing&&a.enable(0),y.instancingColor&&a.enable(1),y.instancingMorph&&a.enable(2),y.matcap&&a.enable(3),y.envMap&&a.enable(4),y.normalMapObjectSpace&&a.enable(5),y.normalMapTangentSpace&&a.enable(6),y.clearcoat&&a.enable(7),y.iridescence&&a.enable(8),y.alphaTest&&a.enable(9),y.vertexColors&&a.enable(10),y.vertexAlphas&&a.enable(11),y.vertexUv1s&&a.enable(12),y.vertexUv2s&&a.enable(13),y.vertexUv3s&&a.enable(14),y.vertexTangents&&a.enable(15),y.anisotropy&&a.enable(16),y.alphaHash&&a.enable(17),y.batching&&a.enable(18),y.dispersion&&a.enable(19),y.retroreflection&&a.enable(24),y.diffuseRoughness&&a.enable(25),y.batchingColor&&a.enable(20),y.gradientMap&&a.enable(21),y.packedNormalMap&&a.enable(22),y.vertexNormals&&a.enable(23),m.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),y.numLightProbeGrids>0&&a.enable(22),y.hasPositionAttribute&&a.enable(23),m.push(a.mask)}function E(m){const y=d[m.type];let z;if(y){const D=_n[y];z=ru.clone(D.uniforms)}else z=m.uniforms;return z}function C(m,y){let z=f.get(y);return z!==void 0?++z.usedTimes:(z=new Pp(i,y,m,r),l.push(z),f.set(y,z)),z}function T(m){if(--m.usedTimes===0){const y=l.indexOf(m);l[y]=l[l.length-1],l.pop(),f.delete(m.cacheKey),m.destroy()}}function P(m){o.remove(m)}function w(){o.dispose()}return{getParameters:x,getProgramCacheKey:S,getUniforms:E,acquireProgram:C,releaseProgram:T,releaseShaderCache:P,programs:l,dispose:w}}function Fp(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,c){i.get(a)[o]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function Op(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Go(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Ho(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function o(d,p,x,S,h,u){let E=i[e];return E===void 0?(E={id:d.id,object:d,geometry:p,material:x,materialVariant:a(d),groupOrder:S,renderOrder:d.renderOrder,z:h,group:u},i[e]=E):(E.id=d.id,E.object=d,E.geometry=p,E.material=x,E.materialVariant=a(d),E.groupOrder=S,E.renderOrder=d.renderOrder,E.z=h,E.group=u),e++,E}function c(d,p,x,S,h,u,E){E.reversedDepth===!0&&(h=-h);const C=o(d,p,x,S,h,u);x.transmission>0?n.push(C):x.transparent===!0?r.push(C):t.push(C)}function l(d,p,x,S,h,u){const E=o(d,p,x,S,h,u);x.transmission>0?n.unshift(E):x.transparent===!0?r.unshift(E):t.unshift(E)}function f(d,p){t.length>1&&t.sort(d||Op),n.length>1&&n.sort(p||Go),r.length>1&&r.sort(p||Go)}function g(){for(let d=e,p=i.length;d<p;d++){const x=i[d];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:c,unshift:l,finish:g,sort:f}}function Bp(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new Ho,i.set(n,[a])):r>=s.length?(a=new Ho,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function zp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new V,color:new We};break;case"SpotLight":t={position:new V,direction:new V,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new V,halfWidth:new V,halfHeight:new V};break}return i[e.id]=t,t}}}function Gp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Hp=0;function kp(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Vp(i){const e=new zp,t=Gp(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new V);const r=new V,s=new pt,a=new pt;function o(l){let f=0,g=0,d=0;for(let H=0;H<9;H++)n.probe[H].set(0,0,0);let p=0,x=0,S=0,h=0,u=0,E=0,C=0,T=0,P=0,w=0,m=0,y=0,z=0,D=0;l.sort(kp);for(let H=0,j=l.length;H<j;H++){const L=l[H],$=L.color,te=L.intensity,J=L.distance;let ie=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===ai?ie=L.shadow.map.texture:ie=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)f+=$.r*te,g+=$.g*te,d+=$.b*te;else if(L.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(L.sh.coefficients[q],te);D++}else if(L.isSunLight){const q=e.get(L);if(q.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const R=L.shadow,M=t.get(L);M.shadowIntensity=R.intensity,M.shadowBias=R.bias,M.shadowNormalBias=R.normalBias,M.shadowRadius=R.radius,M.shadowMapSize.copy(R.mapSize).multiply(R.getFrameExtents()),n.sunShadow[x]=M,n.sunShadowMap[x]=ie;const ee=R.getViewportCount();for(let de=0;de<ee;de++)n.sunShadowMatrix[S+de]=R.getMatrix(de),n.sunShadowCascade[S+de]=R._cascadeData[de];S+=ee,x++}n.sun[p]=q,p++}else if(L.isDirectionalLight){const q=e.get(L);if(q.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const R=L.shadow,M=t.get(L);M.shadowIntensity=R.intensity,M.shadowBias=R.bias,M.shadowNormalBias=R.normalBias,M.shadowRadius=R.radius,M.shadowMapSize=R.mapSize,n.directionalShadow[h]=M,n.directionalShadowMap[h]=ie,n.directionalShadowMatrix[h]=L.shadow.matrix,P++}n.directional[h]=q,h++}else if(L.isSpotLight){const q=e.get(L);q.position.setFromMatrixPosition(L.matrixWorld),q.color.copy($).multiplyScalar(te),q.distance=J,q.coneCos=Math.cos(L.angle),q.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),q.decay=L.decay,n.spot[E]=q;const R=L.shadow;if(L.map&&(n.spotLightMap[y]=L.map,y++,R.updateMatrices(L),L.castShadow&&z++),n.spotLightMatrix[E]=R.matrix,L.castShadow){const M=t.get(L);M.shadowIntensity=R.intensity,M.shadowBias=R.bias,M.shadowNormalBias=R.normalBias,M.shadowRadius=R.radius,M.shadowMapSize=R.mapSize,n.spotShadow[E]=M,n.spotShadowMap[E]=ie,m++}E++}else if(L.isRectAreaLight){const q=e.get(L);q.color.copy($).multiplyScalar(te),q.halfWidth.set(L.width*.5,0,0),q.halfHeight.set(0,L.height*.5,0),n.rectArea[C]=q,C++}else if(L.isPointLight){const q=e.get(L);if(q.color.copy(L.color).multiplyScalar(L.intensity),q.distance=L.distance,q.decay=L.decay,L.castShadow){const R=L.shadow,M=t.get(L);M.shadowIntensity=R.intensity,M.shadowBias=R.bias,M.shadowNormalBias=R.normalBias,M.shadowRadius=R.radius,M.shadowMapSize=R.mapSize,M.shadowCameraNear=R.camera.near,M.shadowCameraFar=R.camera.far,n.pointShadow[u]=M,n.pointShadowMap[u]=ie,n.pointShadowMatrix[u]=L.shadow.matrix,w++}n.point[u]=q,u++}else if(L.isHemisphereLight){const q=e.get(L);q.skyColor.copy(L.color).multiplyScalar(te),q.groundColor.copy(L.groundColor).multiplyScalar(te),n.hemi[T]=q,T++}}C>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ye.LTC_FLOAT_1,n.rectAreaLTC2=ye.LTC_FLOAT_2):(n.rectAreaLTC1=ye.LTC_HALF_1,n.rectAreaLTC2=ye.LTC_HALF_2)),n.ambient[0]=f,n.ambient[1]=g,n.ambient[2]=d;const B=n.hash;(B.sunLength!==p||B.directionalLength!==h||B.pointLength!==u||B.spotLength!==E||B.rectAreaLength!==C||B.hemiLength!==T||B.numSunShadows!==x||B.numDirectionalShadows!==P||B.numPointShadows!==w||B.numSpotShadows!==m||B.numSpotMaps!==y||B.numLightProbes!==D)&&(n.sun.length=p,n.directional.length=h,n.spot.length=E,n.rectArea.length=C,n.point.length=u,n.hemi.length=T,n.sunShadow.length=x,n.sunShadowMap.length=x,n.sunShadowMatrix.length=S,n.sunShadowCascade.length=S,n.directionalShadow.length=P,n.directionalShadowMap.length=P,n.directionalShadowMatrix.length=P,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=m,n.spotShadowMap.length=m,n.spotLightMatrix.length=m+y-z,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=z,n.numLightProbes=D,B.sunLength=p,B.directionalLength=h,B.pointLength=u,B.spotLength=E,B.rectAreaLength=C,B.hemiLength=T,B.numSunShadows=x,B.numDirectionalShadows=P,B.numPointShadows=w,B.numSpotShadows=m,B.numSpotMaps=y,B.numLightProbes=D,n.version=Hp++)}function c(l,f){let g=0,d=0,p=0,x=0,S=0,h=0;const u=f.matrixWorldInverse;for(let E=0,C=l.length;E<C;E++){const T=l[E];if(T.isSunLight){const P=n.sun[g];P.direction.setFromMatrixPosition(T.matrixWorld),P.direction.transformDirection(u),g++}else if(T.isDirectionalLight){const P=n.directional[d];P.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(u),d++}else if(T.isSpotLight){const P=n.spot[x];P.position.setFromMatrixPosition(T.matrixWorld),P.position.applyMatrix4(u),P.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(u),x++}else if(T.isRectAreaLight){const P=n.rectArea[S];P.position.setFromMatrixPosition(T.matrixWorld),P.position.applyMatrix4(u),a.identity(),s.copy(T.matrixWorld),s.premultiply(u),a.extractRotation(s),P.halfWidth.set(T.width*.5,0,0),P.halfHeight.set(0,T.height*.5,0),P.halfWidth.applyMatrix4(a),P.halfHeight.applyMatrix4(a),S++}else if(T.isPointLight){const P=n.point[p];P.position.setFromMatrixPosition(T.matrixWorld),P.position.applyMatrix4(u),p++}else if(T.isHemisphereLight){const P=n.hemi[h];P.direction.setFromMatrixPosition(T.matrixWorld),P.direction.transformDirection(u),h++}}}return{setup:o,setupView:c,state:n}}function ko(i){const e=new Vp(i),t=[],n=[],r=[];function s(g){f.camera=g,t.length=0,n.length=0,r.length=0}function a(g){g.isLightProbeGrid?r.push(g):t.push(g)}function o(g){n.push(g)}function c(){e.setup(t),r.sort((g,d)=>g.priority-d.priority||g.id-d.id)}function l(g){e.setupView(t,g)}const f={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function Wp(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new ko(i),e.set(r,[o])):s>=a.length?(o=new ko(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Xp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qp=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Yp=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],Zp=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],Vo=new pt,Xi=new V,Is=new V;function Kp(i,e,t){let n=new tr;const r=new Xe,s=new Xe,a=new yt,o=new lu,c=new cu,l={},f=t.maxTextureSize,g={[si]:$t,[$t]:si,[xn]:xn},d=new oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xe},radius:{value:4}},vertexShader:Xp,fragmentShader:qp}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const x=new Jt;x.setAttribute("position",new qn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new He(x,d),h=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ur;let u=this.type;this.render=function(w,m,y){if(h.enabled===!1||h.autoUpdate===!1&&h.needsUpdate===!1||w.length===0)return;this.type===Xo&&(Be("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ur);const z=i.getRenderTarget(),D=i.getActiveCubeFace(),B=i.getActiveMipmapLevel(),H=i.state;H.setBlending(Ri),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const j=u!==this.type;j&&m.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach($=>$.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,$=w.length;L<$;L++){const te=w[L],J=te.shadow;if(J===void 0){Be("WebGLShadowMap:",te,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;r.copy(J.mapSize);const ie=J.getFrameExtents();r.multiply(ie),s.copy(J.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/ie.x),r.x=s.x*ie.x,J.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/ie.y),r.y=s.y*ie.y,J.mapSize.y=s.y));const q=i.state.buffers.depth.getReversed();if(J.camera._reversedDepth=q,J.map===null||j===!0){if(J.map!==null&&(J.map.depthTexture!==null&&(J.map.depthTexture.dispose(),J.map.depthTexture=null),J.map.dispose()),this.type===qi){if(te.isPointLight){Be("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}J.map=new Sn(r.x,r.y,{format:ai,type:yn,minFilter:Kt,magFilter:Kt,generateMipmaps:!1}),J.map.texture.name=te.name+".shadowMap",J.map.depthTexture=new Di(r.x,r.y,vn),J.map.depthTexture.name=te.name+".shadowMapDepth",J.map.depthTexture.format=Yn,J.map.depthTexture.compareFunction=null,J.map.depthTexture.minFilter=Ft,J.map.depthTexture.magFilter=Ft}else te.isPointLight?(J.map=new Oa(r.x),J.map.depthTexture=new wl(r.x,En)):(J.map=new Sn(r.x,r.y),J.map.depthTexture=new Di(r.x,r.y,En)),J.map.depthTexture.name=te.name+".shadowMap",J.map.depthTexture.format=Yn,this.type===Ur?(J.map.depthTexture.compareFunction=q?hl:ul,J.map.depthTexture.minFilter=Kt,J.map.depthTexture.magFilter=Kt):(J.map.depthTexture.compareFunction=null,J.map.depthTexture.minFilter=Ft,J.map.depthTexture.magFilter=Ft);J.camera.updateProjectionMatrix()}J.map.isWebGLCubeRenderTarget!==!0&&(J.map.width!==r.x||J.map.height!==r.y)&&J.map.setSize(r.x,r.y);const R=J.map.isWebGLCubeRenderTarget?6:J.getViewportCount();te.isPointLight!==!0&&J.updateMatrices(te,y);const M=J.camera.layers.mask&4294967294?J.camera.layers:y.layers;for(let ee=0;ee<R;ee++){const de=J.getCamera(ee);if(te.isPointLight){const G=J.camera,re=J.matrix,ae=te.distance||G.far;ae!==G.far&&(G.far=ae,G.updateProjectionMatrix()),Xi.setFromMatrixPosition(te.matrixWorld),G.position.copy(Xi),Is.copy(G.position),Is.add(Yp[ee]),G.up.copy(Zp[ee]),G.lookAt(Is),G.updateMatrixWorld(),re.makeTranslation(-Xi.x,-Xi.y,-Xi.z),Vo.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),J._frustum.setFromProjectionMatrix(Vo,G.coordinateSystem,G.reversedDepth)}if(J.map.isWebGLCubeRenderTarget)i.setRenderTarget(J.map,ee),i.clear();else{ee===0&&(i.setRenderTarget(J.map),i.clear());const G=J.getViewport(ee);a.set(s.x*G.x,s.y*G.y,s.x*G.z,s.y*G.w),H.viewport(a)}n=J.getFrustum(ee),T(m,y,de,te,M,this.type)}J.isPointLightShadow!==!0&&this.type===qi&&E(J,y),J.needsUpdate=!1}u=this.type,h.needsUpdate=!1,i.setRenderTarget(z,D,B)};function E(w,m){const y=e.update(S);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null?w.mapPass=new Sn(r.x,r.y,{format:ai,type:yn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value.set(w.map.width,w.map.height),d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(m,null,y,d,S,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value.set(w.map.width,w.map.height),p.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(m,null,y,p,S,null)}function C(w,m,y,z){let D=null;const B=y.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(B!==void 0)D=B;else if(D=y.isPointLight===!0?c:o,i.localClippingEnabled&&m.clipShadows===!0&&Array.isArray(m.clippingPlanes)&&m.clippingPlanes.length!==0||m.displacementMap&&m.displacementScale!==0||m.alphaMap&&m.alphaTest>0||m.map&&m.alphaTest>0||m.alphaToCoverage===!0){const H=D.uuid,j=m.uuid;let L=l[H];L===void 0&&(L={},l[H]=L);let $=L[j];$===void 0&&($=D.clone(),L[j]=$,m.addEventListener("dispose",P)),D=$}if(D.visible=m.visible,D.wireframe=m.wireframe,z===qi?D.side=m.shadowSide!==null?m.shadowSide:m.side:D.side=m.shadowSide!==null?m.shadowSide:g[m.side],D.alphaMap=m.alphaMap,D.alphaTest=m.alphaToCoverage===!0?.5:m.alphaTest,D.map=m.map,D.clipShadows=m.clipShadows,D.clippingPlanes=m.clippingPlanes,D.clipIntersection=m.clipIntersection,D.displacementMap=m.displacementMap,D.displacementScale=m.displacementScale,D.displacementBias=m.displacementBias,D.wireframeLinewidth=m.wireframeLinewidth,D.linewidth=m.linewidth,y.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const H=i.properties.get(D);H.light=y}return D}function T(w,m,y,z,D,B){if(w.visible===!1)return;if(w.layers.test(D)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&B===qi)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,w.matrixWorld);const L=e.update(w),$=w.material;if(Array.isArray($)){const te=L.groups;for(let J=0,ie=te.length;J<ie;J++){const q=te[J],R=$[q.materialIndex];if(R&&R.visible){const M=C(w,R,z,B);w.onBeforeShadow(i,w,m,y,L,M,q),i.renderBufferDirect(y,null,L,M,w,q),w.onAfterShadow(i,w,m,y,L,M,q)}}}else if($.visible){const te=C(w,$,z,B);w.onBeforeShadow(i,w,m,y,L,te,null),i.renderBufferDirect(y,null,L,te,w,null),w.onAfterShadow(i,w,m,y,L,te,null)}}const j=w.children;for(let L=0,$=j.length;L<$;L++)T(j[L],m,y,z,D,B)}function P(w){w.target.removeEventListener("dispose",P);for(const y in l){const z=l[y],D=w.target.uuid;D in z&&(z[D].dispose(),delete z[D])}}}function $p(i,e){function t(){let A=!1;const U=new yt;let Y=null;const me=new yt(0,0,0,0);return{setMask:function(pe){Y!==pe&&!A&&(i.colorMask(pe,pe,pe,pe),Y=pe)},setLocked:function(pe){A=pe},setClear:function(pe,ge,be,Ue,he){he===!0&&(pe*=Ue,ge*=Ue,be*=Ue),U.set(pe,ge,be,Ue),me.equals(U)===!1&&(i.clearColor(pe,ge,be,Ue),me.copy(U))},reset:function(){A=!1,Y=null,me.set(-1,0,0,0)}}}function n(){let A=!1,U=!1,Y=null,me=null,pe=null;return{setReversed:function(ge){if(U!==ge){const be=e.get("EXT_clip_control");ge?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),U=ge;const Ue=pe;pe=null,this.setClear(Ue)}},getReversed:function(){return U},setTest:function(ge){ge?ne(i.DEPTH_TEST):Ae(i.DEPTH_TEST)},setMask:function(ge){Y!==ge&&!A&&(i.depthMask(ge),Y=ge)},setFunc:function(ge){if(U&&(ge=wc[ge]),me!==ge){switch(ge){case Ns:i.depthFunc(i.NEVER);break;case Us:i.depthFunc(i.ALWAYS);break;case Fs:i.depthFunc(i.LESS);break;case Ji:i.depthFunc(i.LEQUAL);break;case Os:i.depthFunc(i.EQUAL);break;case Bs:i.depthFunc(i.GEQUAL);break;case zs:i.depthFunc(i.GREATER);break;case Gs:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}me=ge}},setLocked:function(ge){A=ge},setClear:function(ge){pe!==ge&&(pe=ge,U&&(ge=1-ge),i.clearDepth(ge))},reset:function(){A=!1,Y=null,me=null,pe=null,U=!1}}}function r(){let A=!1,U=null,Y=null,me=null,pe=null,ge=null,be=null,Ue=null,he=null;return{setTest:function(le){A||(le?ne(i.STENCIL_TEST):Ae(i.STENCIL_TEST))},setMask:function(le){U!==le&&!A&&(i.stencilMask(le),U=le)},setFunc:function(le,Ee,se){(Y!==le||me!==Ee||pe!==se)&&(i.stencilFunc(le,Ee,se),Y=le,me=Ee,pe=se)},setOp:function(le,Ee,se){(ge!==le||be!==Ee||Ue!==se)&&(i.stencilOp(le,Ee,se),ge=le,be=Ee,Ue=se)},setLocked:function(le){A=le},setClear:function(le){he!==le&&(i.clearStencil(le),he=le)},reset:function(){A=!1,U=null,Y=null,me=null,pe=null,ge=null,be=null,Ue=null,he=null}}}const s=new t,a=new n,o=new r;let c={};const l=new WeakMap;let f={},g={},d={},p=new WeakMap,x=[],S=null,h=!1,u=null,E=null,C=null,T=null,P=null,w=null,m=null,y=new We(0,0,0),z=0,D=!1,B=null,H=null,j=null,L=null,$=null;const te=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let J=!1,ie=0;const q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(q)[1]),J=ie>=1):q.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),J=ie>=2);let R=null,M={};const ee=i.getParameter(i.SCISSOR_BOX),de=i.getParameter(i.VIEWPORT),G=new yt().fromArray(ee),re=new yt().fromArray(de);function ae(A,U,Y,me){const pe=new Uint8Array(4),ge=i.createTexture();i.bindTexture(A,ge),i.texParameteri(A,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(A,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let be=0;be<Y;be++)A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY?i.texImage3D(U,0,i.RGBA,1,1,me,0,i.RGBA,i.UNSIGNED_BYTE,pe):i.texImage2D(U+be,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,pe);return ge}const ue={};ue[i.TEXTURE_2D]=ae(i.TEXTURE_2D,i.TEXTURE_2D,1),ue[i.TEXTURE_CUBE_MAP]=ae(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[i.TEXTURE_2D_ARRAY]=ae(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ue[i.TEXTURE_3D]=ae(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(i.DEPTH_TEST),a.setFunc(Ji),Ze(!1),Ke(Ga),ne(i.CULL_FACE),ke(Ri);function ne(A){f[A]!==!0&&(i.enable(A),f[A]=!0)}function Ae(A){f[A]!==!1&&(i.disable(A),f[A]=!1)}function Ie(A,U){return d[A]!==U?(i.bindFramebuffer(A,U),d[A]=U,A===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=U),A===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=U),!0):!1}function Me(A,U){let Y=x,me=!1;if(A){Y=p.get(U),Y===void 0&&(Y=[],p.set(U,Y));const pe=A.textures;if(Y.length!==pe.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let ge=0,be=pe.length;ge<be;ge++)Y[ge]=i.COLOR_ATTACHMENT0+ge;Y.length=pe.length,me=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,me=!0);me&&i.drawBuffers(Y)}function Ne(A){return S!==A?(i.useProgram(A),S=A,!0):!1}const Oe={[wi]:i.FUNC_ADD,[$l]:i.FUNC_SUBTRACT,[Jl]:i.FUNC_REVERSE_SUBTRACT};Oe[Ql]=i.MIN,Oe[jl]=i.MAX;const Se={[ec]:i.ZERO,[tc]:i.ONE,[nc]:i.SRC_COLOR,[qo]:i.SRC_ALPHA,[lc]:i.SRC_ALPHA_SATURATE,[ac]:i.DST_COLOR,[rc]:i.DST_ALPHA,[ic]:i.ONE_MINUS_SRC_COLOR,[Yo]:i.ONE_MINUS_SRC_ALPHA,[oc]:i.ONE_MINUS_DST_COLOR,[sc]:i.ONE_MINUS_DST_ALPHA,[cc]:i.CONSTANT_COLOR,[uc]:i.ONE_MINUS_CONSTANT_COLOR,[hc]:i.CONSTANT_ALPHA,[dc]:i.ONE_MINUS_CONSTANT_ALPHA};function ke(A,U,Y,me,pe,ge,be,Ue,he,le){if(A===Ri){h===!0&&(Ae(i.BLEND),h=!1);return}if(h===!1&&(ne(i.BLEND),h=!0),A!==Kl){if(A!==u||le!==D){if((E!==wi||P!==wi)&&(i.blendEquation(i.FUNC_ADD),E=wi,P=wi),le)switch(A){case Zi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ha:i.blendFunc(i.ONE,i.ONE);break;case ka:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Va:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:rt("WebGLState: Invalid blending: ",A);break}else switch(A){case Zi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ha:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ka:rt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Va:rt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:rt("WebGLState: Invalid blending: ",A);break}C=null,T=null,w=null,m=null,y.set(0,0,0),z=0,u=A,D=le}return}pe=pe||U,ge=ge||Y,be=be||me,(U!==E||pe!==P)&&(i.blendEquationSeparate(Oe[U],Oe[pe]),E=U,P=pe),(Y!==C||me!==T||ge!==w||be!==m)&&(i.blendFuncSeparate(Se[Y],Se[me],Se[ge],Se[be]),C=Y,T=me,w=ge,m=be),(Ue.equals(y)===!1||he!==z)&&(i.blendColor(Ue.r,Ue.g,Ue.b,he),y.copy(Ue),z=he),u=A,D=!1}function Je(A,U){A.side===xn?Ae(i.CULL_FACE):ne(i.CULL_FACE);let Y=A.side===$t;U&&(Y=!Y),Ze(Y),A.blending===Zi&&A.transparent===!1?ke(Ri):ke(A.blending,A.blendEquation,A.blendSrc,A.blendDst,A.blendEquationAlpha,A.blendSrcAlpha,A.blendDstAlpha,A.blendColor,A.blendAlpha,A.premultipliedAlpha),a.setFunc(A.depthFunc),a.setTest(A.depthTest),a.setMask(A.depthWrite),s.setMask(A.colorWrite);const me=A.stencilWrite;o.setTest(me),me&&(o.setMask(A.stencilWriteMask),o.setFunc(A.stencilFunc,A.stencilRef,A.stencilFuncMask),o.setOp(A.stencilFail,A.stencilZFail,A.stencilZPass)),qe(A.polygonOffset,A.polygonOffsetFactor,A.polygonOffsetUnits),A.alphaToCoverage===!0?ne(i.SAMPLE_ALPHA_TO_COVERAGE):Ae(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ze(A){B!==A&&(A?i.frontFace(i.CW):i.frontFace(i.CCW),B=A)}function Ke(A){A!==Yl?(ne(i.CULL_FACE),A!==H&&(A===Ga?i.cullFace(i.BACK):A===Zl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ae(i.CULL_FACE),H=A}function gt(A){A!==j&&(J&&i.lineWidth(A),j=A)}function qe(A,U,Y){A?(ne(i.POLYGON_OFFSET_FILL),(L!==U||$!==Y)&&(L=U,$=Y,a.getReversed()&&(U=-U,Y=-Y),i.polygonOffset(U,Y))):Ae(i.POLYGON_OFFSET_FILL)}function ot(A){A?ne(i.SCISSOR_TEST):Ae(i.SCISSOR_TEST)}function Lt(A){A===void 0&&(A=i.TEXTURE0+te-1),R!==A&&(i.activeTexture(A),R=A)}function _t(A,U,Y){Y===void 0&&(R===null?Y=i.TEXTURE0+te-1:Y=R);let me=M[Y];me===void 0&&(me={type:void 0,texture:void 0},M[Y]=me),(me.type!==A||me.texture!==U)&&(R!==Y&&(i.activeTexture(Y),R=Y),i.bindTexture(A,U||ue[A]),me.type=A,me.texture=U)}function N(){const A=M[R];A!==void 0&&A.type!==void 0&&(i.bindTexture(A.type,null),A.type=void 0,A.texture=void 0)}function bt(){try{i.compressedTexImage2D(...arguments)}catch(A){rt("WebGLState:",A)}}function at(){try{i.compressedTexImage3D(...arguments)}catch(A){rt("WebGLState:",A)}}function lt(){try{i.texSubImage2D(...arguments)}catch(A){rt("WebGLState:",A)}}function _e(){try{i.texSubImage3D(...arguments)}catch(A){rt("WebGLState:",A)}}function dt(){try{i.compressedTexSubImage2D(...arguments)}catch(A){rt("WebGLState:",A)}}function De(){try{i.compressedTexSubImage3D(...arguments)}catch(A){rt("WebGLState:",A)}}function Fe(){try{i.texStorage2D(...arguments)}catch(A){rt("WebGLState:",A)}}function b(){try{i.texStorage3D(...arguments)}catch(A){rt("WebGLState:",A)}}function _(){try{i.texImage2D(...arguments)}catch(A){rt("WebGLState:",A)}}function O(){try{i.texImage3D(...arguments)}catch(A){rt("WebGLState:",A)}}function Q(A){return g[A]!==void 0?g[A]:i.getParameter(A)}function Z(A,U){g[A]!==U&&(i.pixelStorei(A,U),g[A]=U)}function oe(A){G.equals(A)===!1&&(i.scissor(A.x,A.y,A.z,A.w),G.copy(A))}function fe(A){re.equals(A)===!1&&(i.viewport(A.x,A.y,A.z,A.w),re.copy(A))}function X(A,U){let Y=l.get(U);Y===void 0&&(Y=new WeakMap,l.set(U,Y));let me=Y.get(A);me===void 0&&(me=i.getUniformBlockIndex(U,A.name),i.uniformBlockBinding(U,me,me),Y.set(A,me))}function F(A,U,Y){const pe=l.get(U).get(A);c[pe]!==Y&&(i.bindBufferBase(i.UNIFORM_BUFFER,pe,Y),c[pe]=Y)}function ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),f={},g={},R=null,M={},d={},c={},p=new WeakMap,x=[],S=null,h=!1,u=null,E=null,C=null,T=null,P=null,w=null,m=null,y=new We(0,0,0),z=0,D=!1,B=null,H=null,j=null,L=null,$=null,G.set(0,0,i.canvas.width,i.canvas.height),re.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ne,disable:Ae,bindFramebuffer:Ie,drawBuffers:Me,useProgram:Ne,setBlending:ke,setMaterial:Je,setFlipSided:Ze,setCullFace:Ke,setLineWidth:gt,setPolygonOffset:qe,setScissorTest:ot,activeTexture:Lt,bindTexture:_t,unbindTexture:N,compressedTexImage2D:bt,compressedTexImage3D:at,texImage2D:_,texImage3D:O,pixelStorei:Z,getParameter:Q,updateUBOMapping:X,uniformBlockBinding:F,texStorage2D:Fe,texStorage3D:b,texSubImage2D:lt,texSubImage3D:_e,compressedTexSubImage2D:dt,compressedTexSubImage3D:De,scissor:oe,viewport:fe,reset:ce}}function Jp(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Xe,f=new WeakMap,g=new Set;let d;const p=new WeakMap,x=new Set,S=new FinalizationRegistry(b=>x.delete(b));let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function u(b,_){return h?new OffscreenCanvas(b,_):qr("canvas")}function E(b,_,O){let Q=1;const Z=Fe(b);if((Z.width>O||Z.height>O)&&(Q=O/Math.max(Z.width,Z.height)),Q<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const oe=Math.floor(Q*Z.width),fe=Math.floor(Q*Z.height);d===void 0&&(d=u(oe,fe));const X=_?u(oe,fe):d;return X.width=oe,X.height=fe,X.getContext("2d").drawImage(b,0,0,oe,fe),Be("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+oe+"x"+fe+")."),X}else return"data"in b&&Be("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),b;return b}function C(b){return b.generateMipmaps}function T(b){i.generateMipmap(b)}function P(b){return b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?i.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function w(b,_,O,Q,Z,oe=!1){if(b!==null){if(i[b]!==void 0)return i[b];Be("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let fe;Q&&(fe=e.get("EXT_texture_norm16"),fe||Be("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let X=_;if(_===i.RED&&(O===i.FLOAT&&(X=i.R32F),O===i.HALF_FLOAT&&(X=i.R16F),O===i.UNSIGNED_BYTE&&(X=i.R8),O===i.UNSIGNED_SHORT&&fe&&(X=fe.R16_EXT),O===i.SHORT&&fe&&(X=fe.R16_SNORM_EXT)),_===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.R8UI),O===i.UNSIGNED_SHORT&&(X=i.R16UI),O===i.UNSIGNED_INT&&(X=i.R32UI),O===i.BYTE&&(X=i.R8I),O===i.SHORT&&(X=i.R16I),O===i.INT&&(X=i.R32I)),_===i.RG&&(O===i.FLOAT&&(X=i.RG32F),O===i.HALF_FLOAT&&(X=i.RG16F),O===i.UNSIGNED_BYTE&&(X=i.RG8),O===i.UNSIGNED_SHORT&&fe&&(X=fe.RG16_EXT),O===i.SHORT&&fe&&(X=fe.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.RG8UI),O===i.UNSIGNED_SHORT&&(X=i.RG16UI),O===i.UNSIGNED_INT&&(X=i.RG32UI),O===i.BYTE&&(X=i.RG8I),O===i.SHORT&&(X=i.RG16I),O===i.INT&&(X=i.RG32I)),_===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.RGB8UI),O===i.UNSIGNED_SHORT&&(X=i.RGB16UI),O===i.UNSIGNED_INT&&(X=i.RGB32UI),O===i.BYTE&&(X=i.RGB8I),O===i.SHORT&&(X=i.RGB16I),O===i.INT&&(X=i.RGB32I)),_===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),O===i.UNSIGNED_INT&&(X=i.RGBA32UI),O===i.BYTE&&(X=i.RGBA8I),O===i.SHORT&&(X=i.RGBA16I),O===i.INT&&(X=i.RGBA32I)),_===i.RGB&&(O===i.UNSIGNED_SHORT&&fe&&(X=fe.RGB16_EXT),O===i.SHORT&&fe&&(X=fe.RGB16_SNORM_EXT),O===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),_===i.RGBA){const F=oe?Xr:tt.getTransfer(Z);O===i.FLOAT&&(X=i.RGBA32F),O===i.HALF_FLOAT&&(X=i.RGBA16F),O===i.UNSIGNED_BYTE&&(X=F===ct?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT&&fe&&(X=fe.RGBA16_EXT),O===i.SHORT&&fe&&(X=fe.RGBA16_SNORM_EXT),O===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function m(b,_){let O;return b?_===null||_===En||_===Li?O=i.DEPTH24_STENCIL8:_===vn?O=i.DEPTH32F_STENCIL8:_===ji&&(O=i.DEPTH24_STENCIL8,Be("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===En||_===Li?O=i.DEPTH_COMPONENT24:_===vn?O=i.DEPTH_COMPONENT32F:_===ji&&(O=i.DEPTH_COMPONENT16),O}function y(b,_){return C(b)===!0||b.isFramebufferTexture&&b.minFilter!==Ft&&b.minFilter!==Kt?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function z(b){const _=new WeakRef(b);n.get(b).__ref=_,x.add(_),S.register(b,_,_)}function D(b){const _=n.get(b).__ref;_!==void 0&&(x.delete(_),S.unregister(_))}function B(b){j(b.target)}function H(b){L(b.target)}function j(b){b.removeEventListener("dispose",B),D(b),te(b),b.isVideoTexture&&f.delete(b),b.isHTMLTexture&&g.delete(b)}function L(b){b.removeEventListener("dispose",H),D(b),ie(b)}function $(){for(const b of x){const _=b.deref();_!==void 0&&(_.isRenderTarget===!0?L(_):j(_))}x.clear(),g.clear()}function te(b){const _=n.get(b);if(_.__webglInit===void 0)return;const O=b.source,Q=p.get(O);if(Q){const Z=Q[_.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&J(b),Object.keys(Q).length===0&&p.delete(O)}n.remove(b)}function J(b){const _=n.get(b);i.deleteTexture(_.__webglTexture);const O=b.source,Q=p.get(O);delete Q[_.__cacheKey],a.memory.textures--}function ie(b){const _=n.get(b);_.__depthDisposeCallback&&_.__depthDisposeCallback();const O=b.depthTexture;if(O&&O.renderTarget===b&&j(O),b.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(_.__webglFramebuffer[Z]))for(let oe=0;oe<_.__webglFramebuffer[Z].length;oe++)i.deleteFramebuffer(_.__webglFramebuffer[Z][oe]);else i.deleteFramebuffer(_.__webglFramebuffer[Z]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Z])}else{if(Array.isArray(_.__webglFramebuffer))for(let Z=0;Z<_.__webglFramebuffer.length;Z++)i.deleteFramebuffer(_.__webglFramebuffer[Z]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Z=0;Z<_.__webglColorRenderbuffer.length;Z++)_.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Z]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const Q=b.textures;for(let Z=0,oe=Q.length;Z<oe;Z++){const fe=n.get(Q[Z]);fe.__webglTexture&&(i.deleteTexture(fe.__webglTexture),a.memory.textures--),n.remove(Q[Z])}n.remove(b)}let q=0;function R(){q=0}function M(){return q}function ee(b){q=b}function de(){const b=q;return b>=r.maxTextures&&Be("WebGLTextures: Trying to use "+(b+1)+" texture units while this GPU supports only "+r.maxTextures),q+=1,b}function G(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.mipmapsAutoUpdate),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function re(b,_){const O=n.get(b);if(b.isVideoTexture&&dt(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&O.__version!==b.version){const Q=b.image;if(Q===null)Be("WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)Be("WebGLRenderer: Texture marked for update but image is incomplete");else{Je(O,b,_);return}}else b.isExternalTexture&&(O.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+_)}function ae(b,_){const O=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&O.__version!==b.version){Je(O,b,_);return}else b.isExternalTexture&&(O.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+_)}function ue(b,_){const O=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&O.__version!==b.version){Je(O,b,_);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+_)}function ne(b,_){const O=n.get(b);if(b.version>0&&O.__version!==b.version){Ze(O,b,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+_)}const Ae={[Hs]:i.REPEAT,[Ln]:i.CLAMP_TO_EDGE,[ks]:i.MIRRORED_REPEAT},Ie={[Ft]:i.NEAREST,[mc]:i.NEAREST_MIPMAP_NEAREST,[lr]:i.NEAREST_MIPMAP_LINEAR,[Kt]:i.LINEAR,[rs]:i.LINEAR_MIPMAP_NEAREST,[Vn]:i.LINEAR_MIPMAP_LINEAR},Me={[vc]:i.NEVER,[dl]:i.ALWAYS,[Mc]:i.LESS,[ul]:i.LEQUAL,[Sc]:i.EQUAL,[hl]:i.GEQUAL,[Ec]:i.GREATER,[yc]:i.NOTEQUAL};function Ne(b,_){if(_.type===vn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Kt||_.magFilter===rs||_.magFilter===lr||_.magFilter===Vn||_.minFilter===Kt||_.minFilter===rs||_.minFilter===lr||_.minFilter===Vn)&&Be("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,Ae[_.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,Ae[_.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,Ae[_.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,Ie[_.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,Ie[_.minFilter]),_.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,Me[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ft||_.minFilter!==lr&&_.minFilter!==Vn||_.type===vn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");i.texParameterf(b,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Oe(b,_){let O=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",B),z(_));const Q=_.source;let Z=p.get(Q);Z===void 0&&(Z={},p.set(Q,Z));const oe=G(_);if(oe!==b.__cacheKey){Z[oe]===void 0&&(Z[oe]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),Z[oe].usedTimes++;const fe=Z[b.__cacheKey];fe!==void 0&&(Z[b.__cacheKey].usedTimes--,fe.usedTimes===0&&J(_)),b.__cacheKey=oe,b.__webglTexture=Z[oe].texture}return O}function Se(b,_,O){return Math.floor(Math.floor(b/O)/_)}function ke(b,_,O,Q){const oe=b.updateRanges;if(oe.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,O,Q,_.data);else{oe.sort((A,U)=>A.start-U.start);let fe=0;for(let A=1;A<oe.length;A++){const U=oe[fe],Y=oe[A],me=U.start+U.count,pe=Se(Y.start,_.width,4),ge=Se(U.start,_.width,4);Y.start<=me+1&&pe===ge&&Se(Y.start+Y.count-1,_.width,4)===pe?U.count=Math.max(U.count,Y.start+Y.count-U.start):(++fe,oe[fe]=Y)}oe.length=fe+1;const X=t.getParameter(i.UNPACK_ROW_LENGTH),F=t.getParameter(i.UNPACK_SKIP_PIXELS),ce=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let A=0,U=oe.length;A<U;A++){const Y=oe[A],me=Math.floor(Y.start/4),pe=Math.ceil(Y.count/4),ge=me%_.width,be=Math.floor(me/_.width),Ue=pe,he=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,ge),t.pixelStorei(i.UNPACK_SKIP_ROWS,be),t.texSubImage2D(i.TEXTURE_2D,0,ge,be,Ue,he,O,Q,_.data)}b.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,X),t.pixelStorei(i.UNPACK_SKIP_PIXELS,F),t.pixelStorei(i.UNPACK_SKIP_ROWS,ce)}}function Je(b,_,O){let Q=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Q=i.TEXTURE_3D);const Z=Oe(b,_),oe=_.source;t.bindTexture(Q,b.__webglTexture,i.TEXTURE0+O);const fe=n.get(oe);if(oe.version!==fe.__version||Z===!0){if(t.activeTexture(i.TEXTURE0+O),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const he=tt.getPrimaries(tt.workingColorSpace),le=_.colorSpace===kn?null:tt.getPrimaries(_.colorSpace),Ee=_.colorSpace===kn||he===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let F=E(_.image,!1,r.maxTextureSize);F=De(_,F);const ce=s.convert(_.format,_.colorSpace),A=s.convert(_.type);let U=w(_.internalFormat,ce,A,_.normalized,_.colorSpace,_.isVideoTexture);Ne(Q,_);let Y;const me=_.mipmaps,pe=_.isVideoTexture!==!0,ge=fe.__version===void 0||Z===!0,be=oe.dataReady,Ue=y(_,F);if(_.isDepthTexture)U=m(_.format===Wn,_.type),ge&&(pe?t.texStorage2D(i.TEXTURE_2D,1,U,F.width,F.height):t.texImage2D(i.TEXTURE_2D,0,U,F.width,F.height,0,ce,A,null));else if(_.isDataTexture)if(me.length>0){pe&&ge&&t.texStorage2D(i.TEXTURE_2D,Ue,U,me[0].width,me[0].height);for(let he=0,le=me.length;he<le;he++)Y=me[he],pe?be&&t.texSubImage2D(i.TEXTURE_2D,he,0,0,Y.width,Y.height,ce,A,Y.data):t.texImage2D(i.TEXTURE_2D,he,U,Y.width,Y.height,0,ce,A,Y.data);_.generateMipmaps=!1}else pe?(ge&&t.texStorage2D(i.TEXTURE_2D,Ue,U,F.width,F.height),be&&ke(_,F,ce,A)):t.texImage2D(i.TEXTURE_2D,0,U,F.width,F.height,0,ce,A,F.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){pe&&ge&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ue,U,me[0].width,me[0].height,F.depth);for(let he=0,le=me.length;he<le;he++)if(Y=me[he],_.format!==Mn)if(ce!==null)if(pe){if(be)if(_.layerUpdates.size>0){const Ee=Eo(Y.width,Y.height,_.format,_.type);for(const se of _.layerUpdates){const Pe=Y.data.subarray(se*Ee/Y.data.BYTES_PER_ELEMENT,(se+1)*Ee/Y.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,se,Y.width,Y.height,1,ce,Pe)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,0,Y.width,Y.height,F.depth,ce,Y.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,he,U,Y.width,Y.height,F.depth,0,Y.data,0,0);else Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else pe?be&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,0,Y.width,Y.height,F.depth,ce,A,Y.data):t.texImage3D(i.TEXTURE_2D_ARRAY,he,U,Y.width,Y.height,F.depth,0,ce,A,Y.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{pe&&ge&&t.texStorage2D(i.TEXTURE_2D,Ue,U,me[0].width,me[0].height);for(let he=0,le=me.length;he<le;he++)Y=me[he],_.format!==Mn?ce!==null?pe?be&&t.compressedTexSubImage2D(i.TEXTURE_2D,he,0,0,Y.width,Y.height,ce,Y.data):t.compressedTexImage2D(i.TEXTURE_2D,he,U,Y.width,Y.height,0,Y.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):pe?be&&t.texSubImage2D(i.TEXTURE_2D,he,0,0,Y.width,Y.height,ce,A,Y.data):t.texImage2D(i.TEXTURE_2D,he,U,Y.width,Y.height,0,ce,A,Y.data)}else if(_.isDataArrayTexture)if(pe){if(ge&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ue,U,F.width,F.height,F.depth),be)if(_.layerUpdates.size>0){const he=Eo(F.width,F.height,_.format,_.type);for(const le of _.layerUpdates){const Ee=F.data.subarray(le*he/F.data.BYTES_PER_ELEMENT,(le+1)*he/F.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,le,F.width,F.height,1,ce,A,Ee)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,F.width,F.height,F.depth,ce,A,F.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,U,F.width,F.height,F.depth,0,ce,A,F.data);else if(_.isData3DTexture)pe?(ge&&t.texStorage3D(i.TEXTURE_3D,Ue,U,F.width,F.height,F.depth),be&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,F.width,F.height,F.depth,ce,A,F.data)):t.texImage3D(i.TEXTURE_3D,0,U,F.width,F.height,F.depth,0,ce,A,F.data);else if(_.isFramebufferTexture){if(ge)if(pe)t.texStorage2D(i.TEXTURE_2D,Ue,U,F.width,F.height);else{let he=F.width,le=F.height;for(let Ee=0;Ee<Ue;Ee++)t.texImage2D(i.TEXTURE_2D,Ee,U,he,le,0,ce,A,null),he>>=1,le>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){const he=i.canvas;if(he.hasAttribute("layoutsubtree")||he.setAttribute("layoutsubtree","true"),F.parentNode!==he){he.appendChild(F),g.add(_),he.onpaint=le=>{const Ee=le.changedElements;for(const se of g)Ee.includes(se.image)&&(se.needsUpdate=!0)},he.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,F);else{const Ee=i.RGBA,se=i.RGBA,Pe=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ee,se,Pe,F)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(me.length>0){if(pe&&ge){const he=Fe(me[0]);t.texStorage2D(i.TEXTURE_2D,Ue,U,he.width,he.height)}for(let he=0,le=me.length;he<le;he++)Y=me[he],pe?be&&t.texSubImage2D(i.TEXTURE_2D,he,0,0,ce,A,Y):t.texImage2D(i.TEXTURE_2D,he,U,ce,A,Y);_.generateMipmaps=!1}else if(pe){if(ge){const he=Fe(F);t.texStorage2D(i.TEXTURE_2D,Ue,U,he.width,he.height)}be&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ce,A,F)}else t.texImage2D(i.TEXTURE_2D,0,U,ce,A,F);C(_)&&_.mipmapsAutoUpdate===!0&&T(Q),fe.__version=oe.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function Ze(b,_,O){if(_.image.length!==6)return;const Q=Oe(b,_),Z=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+O);const oe=n.get(Z);if(Z.version!==oe.__version||Q===!0){t.activeTexture(i.TEXTURE0+O);const fe=tt.getPrimaries(tt.workingColorSpace),X=_.colorSpace===kn?null:tt.getPrimaries(_.colorSpace),F=_.colorSpace===kn||fe===X?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,F);const ce=_.isCompressedTexture||_.image[0].isCompressedTexture,A=_.image[0]&&_.image[0].isDataTexture,U=[];for(let se=0;se<6;se++)!ce&&!A?U[se]=E(_.image[se],!0,r.maxCubemapSize):U[se]=A?_.image[se].image:_.image[se],U[se]=De(_,U[se]);const Y=U[0],me=s.convert(_.format,_.colorSpace),pe=s.convert(_.type);let ge=w(_.internalFormat,me,pe,_.normalized,_.colorSpace);const be=_.isVideoTexture!==!0,Ue=oe.__version===void 0||Q===!0,he=Z.dataReady;let le=y(_,Y);Ne(i.TEXTURE_CUBE_MAP,_);let Ee;if(_.isDepthTexture){if(ge=m(_.format===Wn,_.type),Ue)if(be)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,ge,Y.width,Y.height);else for(let se=0;se<6;se++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,ge,Y.width,Y.height,0,me,pe,null)}else if(ce){be&&Ue&&t.texStorage2D(i.TEXTURE_CUBE_MAP,le,ge,Y.width,Y.height);for(let se=0;se<6;se++){Ee=U[se].mipmaps;for(let Pe=0;Pe<Ee.length;Pe++){const ze=Ee[Pe];_.format!==Mn?me!==null?be?he&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Pe,0,0,ze.width,ze.height,me,ze.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Pe,ge,ze.width,ze.height,0,ze.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):be?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Pe,0,0,ze.width,ze.height,me,pe,ze.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Pe,ge,ze.width,ze.height,0,me,pe,ze.data)}}}else{if(Ee=_.mipmaps,be&&Ue){Ee.length>0&&le++;const se=Fe(U[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,le,ge,se.width,se.height)}for(let se=0;se<6;se++)if(A){be?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,U[se].width,U[se].height,me,pe,U[se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,ge,U[se].width,U[se].height,0,me,pe,U[se].data);for(let Pe=0;Pe<Ee.length;Pe++){const $e=Ee[Pe].image[se].image;be?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Pe+1,0,0,$e.width,$e.height,me,pe,$e.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Pe+1,ge,$e.width,$e.height,0,me,pe,$e.data)}}else{be?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,me,pe,U[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,ge,me,pe,U[se]);for(let Pe=0;Pe<Ee.length;Pe++){const ze=Ee[Pe];be?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Pe+1,0,0,me,pe,ze.image[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Pe+1,ge,me,pe,ze.image[se])}}}C(_)&&_.mipmapsAutoUpdate===!0&&T(i.TEXTURE_CUBE_MAP),oe.__version=Z.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function Ke(b,_,O,Q,Z,oe){const fe=s.convert(O.format,O.colorSpace),X=s.convert(O.type),F=w(O.internalFormat,fe,X,O.normalized,O.colorSpace),ce=n.get(_),A=n.get(O);if(A.__renderTarget=_,!ce.__hasExternalTextures){const U=Math.max(1,_.width>>oe),Y=Math.max(1,_.height>>oe);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,oe,F,U,Y,_.depth,0,fe,X,null):t.texImage2D(Z,oe,F,U,Y,0,fe,X,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),_e(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,Z,A.__webglTexture,0,lt(_)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,Z,A.__webglTexture,oe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function gt(b,_,O){if(i.bindRenderbuffer(i.RENDERBUFFER,b),_.depthBuffer){const Q=_.depthTexture,Z=Q&&Q.isDepthTexture?Q.type:null,oe=m(_.stencilBuffer,Z),fe=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;_e(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt(_),oe,_.width,_.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt(_),oe,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,oe,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,fe,i.RENDERBUFFER,b)}else{const Q=_.textures;for(let Z=0;Z<Q.length;Z++){const oe=Q[Z],fe=s.convert(oe.format,oe.colorSpace),X=s.convert(oe.type),F=w(oe.internalFormat,fe,X,oe.normalized,oe.colorSpace);_e(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt(_),F,_.width,_.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt(_),F,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,F,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function qe(b,_,O){const Q=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=n.get(_.depthTexture);Z.__renderTarget=_;const oe=Q?_.depthTexture.image[0]:_.depthTexture.image;(!Z.__webglTexture||oe.width!==_.width||oe.height!==_.height)&&(oe.width=_.width,oe.height=_.height,_.depthTexture.needsUpdate=!0),Q?ne(_.depthTexture,0):re(_.depthTexture,0);const fe=Z.__webglTexture,X=lt(_),F=Q?i.TEXTURE_CUBE_MAP_POSITIVE_X+O:i.TEXTURE_2D,ce=_.depthTexture.format===Wn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===Yn)_e(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ce,F,fe,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,ce,F,fe,0);else if(_.depthTexture.format===Wn)_e(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ce,F,fe,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,ce,F,fe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ot(b){const _=n.get(b),O=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){const Q=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Q){const Z=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Q.removeEventListener("dispose",Z)};Q.addEventListener("dispose",Z),_.__depthDisposeCallback=Z}_.__boundDepthTexture=Q}if(b.depthTexture&&!_.__autoAllocateDepthBuffer)if(O)for(let Q=0;Q<6;Q++)qe(_.__webglFramebuffer[Q],b,Q);else b.texture.mipmaps.length>0?qe(_.__webglFramebuffer[0],b,0):qe(_.__webglFramebuffer,b,0);else if(O){_.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[Q]),_.__webglDepthbuffer[Q]===void 0)_.__webglDepthbuffer[Q]=i.createRenderbuffer(),gt(_.__webglDepthbuffer[Q],b,!1);else{const Z=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=_.__webglDepthbuffer[Q];i.bindRenderbuffer(i.RENDERBUFFER,oe),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,oe)}}else if(b.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),gt(_.__webglDepthbuffer,b,!1);else{const Z=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,oe),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,oe)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Lt(b,_,O){const Q=n.get(b);_!==void 0&&Ke(Q.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&ot(b)}function _t(b){const _=b.texture,O=n.get(b),Q=n.get(_);b.addEventListener("dispose",H),z(b);const Z=b.textures,oe=b.isWebGLCubeRenderTarget===!0,fe=Z.length>1;if(fe||(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=_.version,a.memory.textures++),oe){O.__webglFramebuffer=[];for(let X=0;X<6;X++)if(_.mipmaps.length>0){O.__webglFramebuffer[X]=[];for(let F=0;F<_.mipmaps.length;F++)O.__webglFramebuffer[X][F]=i.createFramebuffer()}else O.__webglFramebuffer[X]=i.createFramebuffer()}else{if(_.mipmaps.length>0){O.__webglFramebuffer=[];for(let X=0;X<_.mipmaps.length;X++)O.__webglFramebuffer[X]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(fe)for(let X=0,F=Z.length;X<F;X++){const ce=n.get(Z[X]);ce.__webglTexture===void 0&&(ce.__webglTexture=i.createTexture(),a.memory.textures++)}if(b.samples>0&&_e(b)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let X=0;X<Z.length;X++){const F=Z[X];O.__webglColorRenderbuffer[X]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[X]);const ce=s.convert(F.format,F.colorSpace),A=s.convert(F.type),U=w(F.internalFormat,ce,A,F.normalized,F.colorSpace,b.isXRRenderTarget===!0),Y=lt(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,Y,U,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+X,i.RENDERBUFFER,O.__webglColorRenderbuffer[X])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),gt(O.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(oe){t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),Ne(i.TEXTURE_CUBE_MAP,_);for(let X=0;X<6;X++)if(_.mipmaps.length>0)for(let F=0;F<_.mipmaps.length;F++)Ke(O.__webglFramebuffer[X][F],b,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+X,F);else Ke(O.__webglFramebuffer[X],b,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0);C(_)?T(i.TEXTURE_CUBE_MAP):_.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,_.mipmaps.length-1),t.unbindTexture()}else if(fe){for(let X=0,F=Z.length;X<F;X++){const ce=Z[X],A=n.get(ce);let U=i.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(U=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(U,A.__webglTexture),Ne(U,ce),Ke(O.__webglFramebuffer,b,ce,i.COLOR_ATTACHMENT0+X,U,0),C(ce)&&T(U)}t.unbindTexture()}else{let X=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(X=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(X,Q.__webglTexture),Ne(X,_),_.mipmaps.length>0)for(let F=0;F<_.mipmaps.length;F++)Ke(O.__webglFramebuffer[F],b,_,i.COLOR_ATTACHMENT0,X,F);else Ke(O.__webglFramebuffer,b,_,i.COLOR_ATTACHMENT0,X,0);C(_)?T(X):_.mipmaps.length>0&&i.texParameteri(X,i.TEXTURE_MAX_LEVEL,_.mipmaps.length-1),t.unbindTexture()}b.depthBuffer&&ot(b)}function N(b){const _=b.textures;for(let O=0,Q=_.length;O<Q;O++){const Z=_[O];if(C(Z)&&Z.mipmapsAutoUpdate===!0){const oe=P(b),fe=n.get(Z).__webglTexture;t.bindTexture(oe,fe),T(oe),t.unbindTexture()}}}const bt=[];function at(b){if(b.samples>0){if(_e(b)===!1){const _=b.textures,O=b.width,Q=b.height;let Z=i.COLOR_BUFFER_BIT;const oe=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=n.get(b),X=_.length>1;if(X)for(let ce=0;ce<_.length;ce++)t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer),b.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,fe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let ce=0;ce<_.length;ce++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),X){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,fe.__webglColorRenderbuffer[ce]);const A=n.get(_[ce]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,A,0)}i.blitFramebuffer(0,0,O,Q,0,0,O,Q,Z,i.NEAREST),c===!0&&(bt.length=0,bt.push(i.COLOR_ATTACHMENT0+ce),b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&bt.push(oe),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,bt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),X)for(let ce=0;ce<_.length;ce++){t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.RENDERBUFFER,fe.__webglColorRenderbuffer[ce]);const A=n.get(_[ce]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.TEXTURE_2D,A,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&c){const _=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function lt(b){return Math.min(r.maxSamples,b.samples)}function _e(b){const _=n.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function dt(b){const _=a.render.frame;f.get(b)!==_&&(f.set(b,_),b.update())}function De(b,_){const O=b.colorSpace,Q=b.format,Z=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||O!==Wr&&O!==kn&&(tt.getTransfer(O)===ct?(Q!==Mn||Z!==nn)&&Be("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):rt("WebGLTextures: Unsupported texture color space:",O)),_}function Fe(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=de,this.resetTextureUnits=R,this.getTextureUnits=M,this.setTextureUnits=ee,this.setTexture2D=re,this.setTexture2DArray=ae,this.setTexture3D=ue,this.setTextureCube=ne,this.rebindTextures=Lt,this.setupRenderTarget=_t,this.updateRenderTargetMipmap=N,this.updateMultisampleRenderTarget=at,this.setupDepthRenderbuffer=ot,this.setupFrameBufferTexture=Ke,this.useMultisampledRTT=_e,this.dispose=$}function Qp(i,e){function t(n,r=kn){let s;const a=tt.getTransfer(r);if(n===nn)return i.UNSIGNED_BYTE;if(n===Aa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===wa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===sl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===al)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===il)return i.BYTE;if(n===rl)return i.SHORT;if(n===ji)return i.UNSIGNED_SHORT;if(n===Ta)return i.INT;if(n===En)return i.UNSIGNED_INT;if(n===vn)return i.FLOAT;if(n===yn)return i.HALF_FLOAT;if(n===ol)return i.ALPHA;if(n===ll)return i.RGB;if(n===Mn)return i.RGBA;if(n===Yn)return i.DEPTH_COMPONENT;if(n===Wn)return i.DEPTH_STENCIL;if(n===cl)return i.RED;if(n===Ra)return i.RED_INTEGER;if(n===ai)return i.RG;if(n===Ca)return i.RG_INTEGER;if(n===Pa)return i.RGBA_INTEGER;if(n===Fr||n===Or||n===Br||n===zr)if(a===ct)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Fr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Or)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Br)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===zr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Fr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Or)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Br)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===zr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Vs||n===Ws||n===Xs||n===qs)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Vs)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ws)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Xs)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===qs)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ys||n===Zs||n===Ks||n===$s||n===Js||n===kr||n===Qs)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Ys||n===Zs)return a===ct?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ks)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===$s)return s.COMPRESSED_R11_EAC;if(n===Js)return s.COMPRESSED_SIGNED_R11_EAC;if(n===kr)return s.COMPRESSED_RG11_EAC;if(n===Qs)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===js||n===ea||n===ta||n===na||n===ia||n===ra||n===sa||n===aa||n===oa||n===la||n===ca||n===ua||n===ha||n===da)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===js)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ea)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ta)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===na)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ia)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ra)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===sa)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===aa)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===oa)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===la)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ca)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ua)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ha)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===da)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===fa||n===pa||n===ma)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===fa)return a===ct?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===pa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ma)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ga||n===_a||n===Vr||n===xa)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===ga)return s.COMPRESSED_RED_RGTC1_EXT;if(n===_a)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Vr)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===xa)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Li?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const jp=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,em=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class tm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Rl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new oi({vertexShader:jp,fragmentShader:em,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new He(new Xn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class nm extends li{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,f=null,g=null,d=null,p=null,x=null;const S=typeof XRWebGLBinding<"u",h=new tm,u={},E=t.getContextAttributes();let C=null,T=null;const P=[],w=[],m=new Xe;let y=null,z=null;const D=new ln;D.viewport=new yt;const B=new ln;B.viewport=new yt;const H=[D,B],j=new fu;let L=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let re=P[G];return re===void 0&&(re=new fs,P[G]=re),re.getTargetRaySpace()},this.getControllerGrip=function(G){let re=P[G];return re===void 0&&(re=new fs,P[G]=re),re.getGripSpace()},this.getHand=function(G){let re=P[G];return re===void 0&&(re=new fs,P[G]=re),re.getHandSpace()};function te(G){const re=w.indexOf(G.inputSource);if(re===-1)return;const ae=P[re];ae!==void 0&&(ae.update(G.inputSource,G.frame,l||a),ae.dispatchEvent({type:G.type,data:G.inputSource}))}function J(){r.removeEventListener("select",te),r.removeEventListener("selectstart",te),r.removeEventListener("selectend",te),r.removeEventListener("squeeze",te),r.removeEventListener("squeezestart",te),r.removeEventListener("squeezeend",te),r.removeEventListener("end",J),r.removeEventListener("inputsourceschange",ie);for(let G=0;G<P.length;G++){const re=w[G];re!==null&&(w[G]=null,P[G].disconnect(re))}L=null,$=null,h.reset();for(const G in u)delete u[G];if(e.setRenderTarget(C),p=null,d=null,g=null,r=null,T=null,de.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(m.width,m.height,!1),z!==null){const G=z.camera;G.fov=z.fov,G.zoom=z.zoom,G.updateProjectionMatrix(),z=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){s=G,n.isPresenting===!0&&Be("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,n.isPresenting===!0&&Be("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(G){l=G},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return g===null&&S&&(g=new XRWebGLBinding(r,t)),g},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(G){if(r=G,r!==null){if(C=e.getRenderTarget(),r.addEventListener("select",te),r.addEventListener("selectstart",te),r.addEventListener("selectend",te),r.addEventListener("squeeze",te),r.addEventListener("squeezestart",te),r.addEventListener("squeezeend",te),r.addEventListener("end",J),r.addEventListener("inputsourceschange",ie),E.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(m),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,ue=null,ne=null;E.depth&&(ne=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=E.stencil?Wn:Yn,ue=E.stencil?Li:En);const Ae={colorFormat:t.RGBA8,depthFormat:ne,scaleFactor:s};g=this.getBinding(),d=g.createProjectionLayer(Ae),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),T=new Sn(d.textureWidth,d.textureHeight,{format:Mn,type:nn,depthTexture:new Di(d.textureWidth,d.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const ae={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,ae),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),T=new Sn(p.framebufferWidth,p.framebufferHeight,{format:Mn,type:nn,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),de.setContext(r),de.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function ie(G){for(let re=0;re<G.removed.length;re++){const ae=G.removed[re],ue=w.indexOf(ae);ue>=0&&(w[ue]=null,P[ue].disconnect(ae))}for(let re=0;re<G.added.length;re++){const ae=G.added[re];let ue=w.indexOf(ae);if(ue===-1){for(let Ae=0;Ae<P.length;Ae++)if(Ae>=w.length){w.push(ae),ue=Ae;break}else if(w[Ae]===null){w[Ae]=ae,ue=Ae;break}if(ue===-1)break}const ne=P[ue];ne&&ne.connect(ae)}}function q(G,re){re===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(re.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(r===null)return;let re=G.near,ae=G.far;h.texture!==null&&(h.depthNear>0&&(re=h.depthNear),h.depthFar>0&&(ae=h.depthFar)),j.near=B.near=D.near=re,j.far=B.far=D.far=ae,(L!==j.near||$!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),L=j.near,$=j.far),j.layers.mask=G.layers.mask|6,D.layers.mask=j.layers.mask&-5,B.layers.mask=j.layers.mask&-3;const ue=G.parent,ne=j.cameras;q(j,ue);for(let Ae=0;Ae<ne.length;Ae++)q(ne[Ae],ue);j.projectionMatrix.copy(D.projectionMatrix),j.projectionMatrixInverse.copy(D.projectionMatrixInverse),z===null&&G.isPerspectiveCamera&&(z={camera:G,fov:G.fov,zoom:G.zoom}),R(G,j,ue)};function R(G,re,ae){ae===null?G.matrix.copy(re.matrixWorld):(G.matrix.copy(ae.matrixWorld),G.matrix.invert(),G.matrix.multiply(re.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(re.projectionMatrix),G.projectionMatrixInverse.copy(re.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=Ma*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(G){c=G,d!==null&&(d.fixedFoveation=G),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=G)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(j)},this.getCameraTexture=function(G){return u[G]};let M=null;function ee(G,re){if(f=re.getViewerPose(l||a),x=re,f!==null){const ae=f.views;p!==null&&(e.setRenderTargetFramebuffer(T,p.framebuffer),e.setRenderTarget(T));let ue=!1;ae.length!==j.cameras.length&&(j.cameras.length=0,ue=!0);for(let Me=0;Me<ae.length;Me++){const Ne=ae[Me];let Oe=null;if(p!==null)Oe=p.getViewport(Ne);else{const ke=g.getViewSubImage(d,Ne);Oe=ke.viewport,Me===0&&(e.setRenderTargetTextures(T,ke.colorTexture,ke.depthStencilTexture),e.setRenderTarget(T))}let Se=H[Me];Se===void 0&&(Se=new ln,Se.layers.enable(Me),Se.viewport=new yt,H[Me]=Se),Se.matrix.fromArray(Ne.transform.matrix),Se.matrix.decompose(Se.position,Se.quaternion,Se.scale),Se.projectionMatrix.fromArray(Ne.projectionMatrix),Se.projectionMatrixInverse.copy(Se.projectionMatrix).invert(),Se.viewport.set(Oe.x,Oe.y,Oe.width,Oe.height),Me===0&&(j.matrix.copy(Se.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),ue===!0&&j.cameras.push(Se)}const ne=r.enabledFeatures;if(ne&&ne.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&S){g=n.getBinding();const Me=g.getDepthInformation(ae[0]);Me&&Me.isValid&&Me.texture&&h.init(Me,r.renderState)}if(ne&&ne.includes("camera-access")&&S){e.state.unbindTexture(),g=n.getBinding();for(let Me=0;Me<ae.length;Me++){const Ne=ae[Me].camera;if(Ne){let Oe=u[Ne];Oe||(Oe=new Rl,u[Ne]=Oe);const Se=g.getCameraImage(Ne);Oe.sourceTexture=Se}}}}for(let ae=0;ae<P.length;ae++){const ue=w[ae],ne=P[ae];ue!==null&&ne!==void 0&&ne.update(ue,re,l||a)}M&&M(G,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),x=null}const de=new Dl;de.setAnimationLoop(ee),this.setAnimationLoop=function(G){M=G},this.dispose=function(){}}}const im=new pt,kl=new Ve;kl.set(-1,0,0,0,1,0,0,0,1);function rm(i,e){function t(h,u){h.matrixAutoUpdate===!0&&h.updateMatrix(),u.value.copy(h.matrix)}function n(h,u){u.color.getRGB(h.fogColor.value,Cl(i)),u.isFog?(h.fogNear.value=u.near,h.fogFar.value=u.far):u.isFogExp2&&(h.fogDensity.value=u.density)}function r(h,u,E,C,T){u.isNodeMaterial?u.uniformsNeedUpdate=!1:u.isMeshBasicMaterial?s(h,u):u.isMeshLambertMaterial?(s(h,u),u.envMap&&(h.envMapIntensity.value=u.envMapIntensity)):u.isMeshToonMaterial?(s(h,u),g(h,u)):u.isMeshPhongMaterial?(s(h,u),f(h,u),u.envMap&&(h.envMapIntensity.value=u.envMapIntensity)):u.isMeshStandardMaterial?(s(h,u),d(h,u),u.isMeshPhysicalMaterial&&p(h,u,T)):u.isMeshMatcapMaterial?(s(h,u),x(h,u)):u.isMeshDepthMaterial?s(h,u):u.isMeshDistanceMaterial?(s(h,u),S(h,u)):u.isMeshNormalMaterial?s(h,u):u.isLineBasicMaterial?(a(h,u),u.isLineDashedMaterial&&o(h,u)):u.isPointsMaterial?c(h,u,E,C):u.isSpriteMaterial?l(h,u):u.isShadowMaterial?(h.color.value.copy(u.color),h.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(h,u){h.opacity.value=u.opacity,u.color&&h.diffuse.value.copy(u.color),u.emissive&&h.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(h.map.value=u.map,t(u.map,h.mapTransform)),u.alphaMap&&(h.alphaMap.value=u.alphaMap,t(u.alphaMap,h.alphaMapTransform)),u.bumpMap&&(h.bumpMap.value=u.bumpMap,t(u.bumpMap,h.bumpMapTransform),h.bumpScale.value=u.bumpScale,u.side===$t&&(h.bumpScale.value*=-1)),u.normalMap&&(h.normalMap.value=u.normalMap,t(u.normalMap,h.normalMapTransform),h.normalScale.value.copy(u.normalScale),u.side===$t&&h.normalScale.value.negate()),u.displacementMap&&(h.displacementMap.value=u.displacementMap,t(u.displacementMap,h.displacementMapTransform),h.displacementScale.value=u.displacementScale,h.displacementBias.value=u.displacementBias),u.emissiveMap&&(h.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,h.emissiveMapTransform)),u.specularMap&&(h.specularMap.value=u.specularMap,t(u.specularMap,h.specularMapTransform)),u.alphaTest>0&&(h.alphaTest.value=u.alphaTest);const E=e.get(u),C=E.envMap,T=E.envMapRotation;C&&(h.envMap.value=C,h.envMapRotation.value.setFromMatrix4(im.makeRotationFromEuler(T)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&h.envMapRotation.value.premultiply(kl),h.reflectivity.value=u.reflectivity,h.ior.value=u.ior,h.refractionRatio.value=u.refractionRatio),u.lightMap&&(h.lightMap.value=u.lightMap,h.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,h.lightMapTransform)),u.aoMap&&(h.aoMap.value=u.aoMap,h.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,h.aoMapTransform))}function a(h,u){h.diffuse.value.copy(u.color),h.opacity.value=u.opacity,u.map&&(h.map.value=u.map,t(u.map,h.mapTransform))}function o(h,u){h.dashSize.value=u.dashSize,h.totalSize.value=u.dashSize+u.gapSize,h.scale.value=u.scale}function c(h,u,E,C){h.diffuse.value.copy(u.color),h.opacity.value=u.opacity,h.size.value=u.size*E,h.scale.value=C*.5,u.map&&(h.map.value=u.map,t(u.map,h.uvTransform)),u.alphaMap&&(h.alphaMap.value=u.alphaMap,t(u.alphaMap,h.alphaMapTransform)),u.alphaTest>0&&(h.alphaTest.value=u.alphaTest)}function l(h,u){h.diffuse.value.copy(u.color),h.opacity.value=u.opacity,h.rotation.value=u.rotation,u.map&&(h.map.value=u.map,t(u.map,h.mapTransform)),u.alphaMap&&(h.alphaMap.value=u.alphaMap,t(u.alphaMap,h.alphaMapTransform)),u.alphaTest>0&&(h.alphaTest.value=u.alphaTest)}function f(h,u){h.specular.value.copy(u.specular),h.shininess.value=Math.max(u.shininess,1e-4)}function g(h,u){u.gradientMap&&(h.gradientMap.value=u.gradientMap)}function d(h,u){h.metalness.value=u.metalness,u.metalnessMap&&(h.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,h.metalnessMapTransform)),h.roughness.value=u.roughness,u.roughnessMap&&(h.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,h.roughnessMapTransform)),u.envMap&&(h.envMapIntensity.value=u.envMapIntensity)}function p(h,u,E){h.ior.value=u.ior,u.diffuseRoughness>0&&(h.diffuseRoughness.value=u.diffuseRoughness,u.diffuseRoughnessMap&&(h.diffuseRoughnessMap.value=u.diffuseRoughnessMap,t(u.diffuseRoughnessMap,h.diffuseRoughnessMapTransform))),u.sheen>0&&(h.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),h.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(h.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,h.sheenColorMapTransform)),u.sheenRoughnessMap&&(h.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,h.sheenRoughnessMapTransform))),u.clearcoat>0&&(h.clearcoat.value=u.clearcoat,h.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(h.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,h.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(h.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,h.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(h.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,h.clearcoatNormalMapTransform),h.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===$t&&h.clearcoatNormalScale.value.negate())),u.dispersion>0&&(h.dispersion.value=u.dispersion),u.retroreflectivity>0&&(h.retroreflectivity.value=u.retroreflectivity),u.iridescence>0&&(h.iridescence.value=u.iridescence,h.iridescenceIOR.value=u.iridescenceIOR,h.iridescenceThicknessMinimum.value=u.iridescenceThicknessMinimum,h.iridescenceThicknessMaximum.value=u.iridescenceThicknessMaximum,u.iridescenceMap&&(h.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,h.iridescenceMapTransform)),u.iridescenceThicknessMap&&(h.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,h.iridescenceThicknessMapTransform))),u.transmission>0&&(h.transmission.value=u.transmission,h.transmissionSamplerMap.value=E.texture,h.transmissionSamplerSize.value.set(E.width,E.height),u.transmissionMap&&(h.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,h.transmissionMapTransform)),h.thickness.value=u.thickness,u.thicknessMap&&(h.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,h.thicknessMapTransform)),h.attenuationDistance.value=u.attenuationDistance,h.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(h.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(h.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,h.anisotropyMapTransform))),h.specularIntensity.value=u.specularIntensity,h.specularColor.value.copy(u.specularColor),u.specularColorMap&&(h.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,h.specularColorMapTransform)),u.specularIntensityMap&&(h.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,h.specularIntensityMapTransform))}function x(h,u){u.matcap&&(h.matcap.value=u.matcap)}function S(h,u){const E=e.get(u).light;h.referencePosition.value.setFromMatrixPosition(E.matrixWorld),h.nearDistance.value=E.shadow.camera.near,h.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function sm(i,e,t,n){let r={},s={};function a(E,C){const T=C.program;n.uniformBlockBinding(E,T,r[E.id])}function o(E,C){let T=r[E.id];T===void 0&&(x(E),T=c(E),r[E.id]=T,E.addEventListener("dispose",h));const P=C.program;n.updateUBOMapping(E,P);const w=e.render.frame;s[E.id]!==w&&(l(E),s[E.id]=w)}function c(E){const C=i.createBuffer(),T=E.__size,P=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,C),i.bufferData(i.UNIFORM_BUFFER,T,P),i.bindBuffer(i.UNIFORM_BUFFER,null),C}function l(E){const C=r[E.id],T=E.uniforms,P=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,C);for(let w=0,m=T.length;w<m;w++){const y=T[w];if(Array.isArray(y))for(let z=0,D=y.length;z<D;z++)f(y[z],w,z,P);else f(y,w,0,P)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(E,C,T,P){if(d(E,C,T,P)===!0){const w=E.__offset,m=E.value;if(Array.isArray(m)){let y=0;for(let z=0;z<m.length;z++){const D=m[z],B=S(D,!0);g(D,E.__data,y),y+=B.storage/Float32Array.BYTES_PER_ELEMENT}}else g(m,E.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,w,E.__data)}}function g(E,C,T){typeof E=="number"||typeof E=="boolean"?C[T]=E:E.isMatrix3?(C[T]=E.elements[0],C[T+1]=E.elements[1],C[T+2]=E.elements[2],C[T+3]=0,C[T+4]=E.elements[3],C[T+5]=E.elements[4],C[T+6]=E.elements[5],C[T+7]=0,C[T+8]=E.elements[6],C[T+9]=E.elements[7],C[T+10]=E.elements[8],C[T+11]=0):ArrayBuffer.isView(E)?C.set(E.subarray(0,C.length-T),T):E.toArray(C,T)}function d(E,C,T,P){const w=E.value,m=C+"_"+T;if(Array.isArray(w)){P[m]===void 0&&(P[m]=[]);const y=P[m];let z=!1;for(let D=0;D<w.length;D++)p(w[D],y,D)===!0&&(z=!0);return z}return p(w,P,m)}function p(E,C,T){if(C[T]===void 0)return typeof E=="number"||typeof E=="boolean"?C[T]=E:ArrayBuffer.isView(E)?C[T]=E.slice():C[T]=E.clone(),!0;{const P=C[T];if(typeof E=="number"||typeof E=="boolean"){if(P!==E)return C[T]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(P.equals(E)===!1)return P.copy(E),!0}}return!1}function x(E){const C=E.uniforms;let T=0;const P=16;for(let m=0,y=C.length;m<y;m++){const z=Array.isArray(C[m])?C[m]:[C[m]];for(let D=0,B=z.length;D<B;D++){const H=z[D],j=Array.isArray(H.value)?H.value:[H.value],L=Array.isArray(C[m])||Array.isArray(H.value);let $=T;for(let J=0,ie=j.length;J<ie;J++){const q=j[J],R=S(q,L),M=T%P,ee=M%R.boundary,de=M+ee;T+=ee,de!==0&&P-de<R.storage&&(T+=P-de),J===0&&($=T),T+=R.storage}const te=H.type==="int"?Int32Array:H.type==="uint"?Uint32Array:Float32Array;H.__data=new te((T-$)/Float32Array.BYTES_PER_ELEMENT),H.__offset=$}}const w=T%P;return w>0&&(T+=P-w),E.__size=T,E.__cache={},this}function S(E,C){const T={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(T.boundary=4,T.storage=4):E.isVector2?(T.boundary=8,T.storage=8):E.isVector3||E.isColor?(T.boundary=16,T.storage=12):E.isVector4?(T.boundary=16,T.storage=16):E.isMatrix3?(T.boundary=16,T.storage=48):E.isMatrix4?(T.boundary=16,T.storage=64):E.isTexture?Be("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(E)?(T.boundary=16,T.storage=E.byteLength):Be("WebGLRenderer: Unsupported uniform value type.",E),C===!0&&(T.boundary=16,T.storage=Math.ceil(T.storage/16)*16),T}function h(E){const C=E.target;C.removeEventListener("dispose",h),i.deleteBuffer(r[C.id]),delete r[C.id],delete s[C.id]}function u(){for(const E in r)i.deleteBuffer(r[E]);r={},s={}}return{bind:a,update:o,dispose:u}}const am=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let gn=null;function om(){return gn===null&&(gn=new jc(am,16,16,ai,yn),gn.name="DFG_LUT",gn.minFilter=Kt,gn.magFilter=Kt,gn.wrapS=Ln,gn.wrapT=Ln,gn.generateMipmaps=!1,gn.needsUpdate=!0),gn}class lm{constructor(e={}){const{canvas:t=Tc(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:g=!1,reversedDepthBuffer:d=!1,outputBufferType:p=nn}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=a;const S=p,h=new Set([Pa,Ca,Ra]),u=new Set([nn,En,ji,Li,Aa,wa]),E=new Uint32Array(4),C=new Int32Array(4),T={textures:[],min:[],max:[],resolution:[]};let P=null,w=null;const m=[],y=[];let z=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Dn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let B=!1,H=null,j=null,L=null,$=null;this._outputColorSpace=on;let te=0,J=0,ie=null,q=-1,R=null;const M=new yt,ee=new yt;let de=null;const G=new We(0);let re=0,ae=t.width,ue=t.height,ne=1,Ae=null,Ie=null;const Me=new yt(0,0,ae,ue),Ne=new yt(0,0,ae,ue);let Oe=!1;const Se=new tr,ke=new Da;let Je=!1,Ze=!1;const Ke=new pt,gt=new V,qe=new yt,ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Lt=!1;function _t(){return ie===null?ne:1}let N=n;function bt(v,I){return t.getContext(v,I)}let at,lt,_e,dt,De,Fe,b,_,O,Q,Z,oe,fe,X,F,ce,A,U,Y,me,pe,ge,be;try{const v={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:f,failIfMajorPerformanceCaveat:g};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ba}`),t.addEventListener("webglcontextlost",le,!1),t.addEventListener("webglcontextrestored",Ee,!1),t.addEventListener("webglcontextcreationerror",se,!1),N===null){const I="webgl2";if(N=bt(I,v),N===null)throw bt(I)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ue()}catch(v){throw t.removeEventListener("webglcontextlost",le,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",se,!1),rt("WebGLRenderer: "+v.message),v}function Ue(){at=new hf(N),at.init(),pe=new Qp(N,at),lt=new jd(N,at,e,pe),_e=new $p(N,at),lt.reversedDepthBuffer&&d&&_e.buffers.depth.setReversed(!0),j=N.createFramebuffer(),L=N.createFramebuffer(),$=N.createFramebuffer(),dt=new pf(N),De=new Fp,Fe=new Jp(N,at,_e,De,lt,pe,dt),b=new uf(D),_=new mu(N),ge=new Jd(N,_),O=new df(N,_,dt,ge),Q=new gf(N,O,_,ge,dt),U=new mf(N,lt,Fe),F=new ef(De),Z=new Up(D,b,at,lt,ge,F),oe=new rm(D,De),fe=new Bp,X=new Wp(at),A=new $d(D,b,_e,Q,x,c),ce=new Kp(D,Q,lt),be=new sm(N,dt,lt,_e),Y=new Qd(N,at,dt),me=new ff(N,at,dt),dt.programs=Z.programs,D.capabilities=lt,D.extensions=at,D.properties=De,D.renderLists=fe,D.shadowMap=ce,D.state=_e,D.info=dt}S!==nn&&(z=new xf(S,t.width,t.height,o,r,s));const he=new nm(D,N);this.xr=he,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const v=at.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=at.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(v){v!==void 0&&(ne=v,this.setSize(ae,ue,!1))},this.getSize=function(v){return v.set(ae,ue)},this.setSize=function(v,I,K=!0){if(he.isPresenting){Be("WebGLRenderer: Can't change size while VR device is presenting.");return}ae=v,ue=I,t.width=Math.floor(v*ne),t.height=Math.floor(I*ne),K===!0&&(t.style.width=v+"px",t.style.height=I+"px"),z!==null&&z.setSize(t.width,t.height),this.setViewport(0,0,v,I)},this.getDrawingBufferSize=function(v){return v.set(ae*ne,ue*ne).floor()},this.setDrawingBufferSize=function(v,I,K){ae=v,ue=I,ne=K,t.width=Math.floor(v*K),t.height=Math.floor(I*K),this.setViewport(0,0,v,I)},this.setEffects=function(v){if(S===nn){rt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let I=0;I<v.length;I++)if(v[I].isOutputPass===!0){Be("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}z.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(M)},this.getViewport=function(v){return v.copy(Me)},this.setViewport=function(v,I,K,k){v.isVector4?Me.set(v.x,v.y,v.z,v.w):Me.set(v,I,K,k),_e.viewport(M.copy(Me).multiplyScalar(_t()).round())},this.getScissor=function(v){return v.copy(Ne)},this.setScissor=function(v,I,K,k){v.isVector4?Ne.set(v.x,v.y,v.z,v.w):Ne.set(v,I,K,k),_e.scissor(ee.copy(Ne).multiplyScalar(_t()).round())},this.getScissorTest=function(){return Oe},this.setScissorTest=function(v){_e.setScissorTest(Oe=v)},this.setOpaqueSort=function(v){Ae=v},this.setTransparentSort=function(v){Ie=v},this.getClearColor=function(v){return v.copy(A.getClearColor())},this.setClearColor=function(){A.setClearColor(...arguments)},this.getClearAlpha=function(){return A.getClearAlpha()},this.setClearAlpha=function(){A.setClearAlpha(...arguments)},this.clear=function(v=!0,I=!0,K=!0){let k=0;if(v){let W=!1;if(ie!==null){const ve=ie.texture.format;W=h.has(ve)}if(W){const ve=ie.texture.type,we=u.has(ve),xe=A.getClearColor(),Te=A.getClearAlpha(),Le=xe.r,Ge=xe.g,je=xe.b;we?(E[0]=Le,E[1]=Ge,E[2]=je,E[3]=Te,N.clearBufferuiv(N.COLOR,0,E)):(C[0]=Le,C[1]=Ge,C[2]=je,C[3]=Te,N.clearBufferiv(N.COLOR,0,C))}else k|=N.COLOR_BUFFER_BIT}I&&(k|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(k|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&N.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),H=v},this.dispose=function(){t.removeEventListener("webglcontextlost",le,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",se,!1),A.dispose(),fe.dispose(),X.dispose(),Fe.dispose(),De.dispose(),b.dispose(),Q.dispose(),O.dispose(),ge.dispose(),be.dispose(),Z.dispose(),he.dispose(),he.removeEventListener("sessionstart",Qt),he.removeEventListener("sessionend",Ot),St.stop()};function le(v){v.preventDefault(),Yr("WebGLRenderer: Context Lost."),B=!0}function Ee(){Yr("WebGLRenderer: Context Restored."),B=!1;const v=dt.autoReset,I=ce.enabled,K=ce.autoUpdate,k=ce.needsUpdate,W=ce.type;Ue(),dt.autoReset=v,ce.enabled=I,ce.autoUpdate=K,ce.needsUpdate=k,ce.type=W}function se(v){rt("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Pe(v){const I=v.target;I.removeEventListener("dispose",Pe),ze(I)}function ze(v){$e(v),De.remove(v)}function $e(v){const I=De.get(v).programs;I!==void 0&&(I.forEach(function(K){Z.releaseProgram(K)}),v.isShaderMaterial&&Z.releaseShaderCache(v))}this.renderBufferDirect=function(v,I,K,k,W,ve){I===null&&(I=ot);const we=W.isMesh&&W.matrixWorld.determinantAffine()<0,xe=ar(v,I,K,k,W);_e.setMaterial(k,we);let Te=K.index,Le=1;if(k.wireframe===!0){if(Te=O.getWireframeAttribute(K),Te===void 0)return;Le=2}const Ge=K.drawRange,je=K.attributes.position;let Re=Ge.start*Le,et=(Ge.start+Ge.count)*Le;ve!==null&&(Re=Math.max(Re,ve.start*Le),et=Math.min(et,(ve.start+ve.count)*Le)),Te!==null?(Re=Math.max(Re,0),et=Math.min(et,Te.count)):je!=null&&(Re=Math.max(Re,0),et=Math.min(et,je.count));const Tt=et-Re;if(Tt<0||Tt===1/0)return;ge.setup(W,k,xe,K,Te);let ht,ut=Y;if(Te!==null&&(ht=_.get(Te),ut=me,ut.setIndex(ht)),W.isMesh)k.wireframe===!0?(_e.setLineWidth(k.wireframeLinewidth*_t()),ut.setMode(N.LINES)):ut.setMode(N.TRIANGLES);else if(W.isLine){let Bt=k.linewidth;Bt===void 0&&(Bt=1),_e.setLineWidth(Bt*_t()),W.isLineSegments?ut.setMode(N.LINES):W.isLineLoop?ut.setMode(N.LINE_LOOP):ut.setMode(N.LINE_STRIP)}else W.isPoints?ut.setMode(N.POINTS):W.isSprite&&ut.setMode(N.TRIANGLES);if(W.isBatchedMesh)if(at.get("WEBGL_multi_draw"))ut.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Bt=W._multiDrawStarts,Ce=W._multiDrawCounts,Vt=W._multiDrawCount,st=Te?_.get(Te).bytesPerElement:1,Jn=De.get(k).currentProgram.getUniforms();for(let zt=0;zt<Vt;zt++)Jn.setValue(N,"_gl_DrawID",zt),ut.render(Bt[zt]/st,Ce[zt])}else if(W.isInstancedMesh)ut.renderInstances(Re,Tt,W.count);else if(K.isInstancedBufferGeometry){const Bt=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Ce=Math.min(K.instanceCount,Bt);ut.renderInstances(Re,Tt,Ce)}else ut.render(Re,Tt)};function xt(v,I,K,k){H!==null&&v.isNodeMaterial&&H.setObject(k,v),Je===!0&&F.setState(v,K,!1),v.transparent===!0&&v.side===xn&&v.forceSinglePass===!1?(v.side=$t,v.needsUpdate=!0,$n(v,I,k),v.side=si,v.needsUpdate=!0,$n(v,I,k),v.side=xn):$n(v,I,k)}this.compile=function(v,I,K=null){K===null&&(K=v),H!==null&&H.renderStart(v,I,K),w=X.get(K),w.init(I),y.push(w),K.traverseVisible(function(W){W.isLight&&W.layers.test(I.layers)&&(w.pushLight(W),W.castShadow&&w.pushShadow(W))}),v!==K&&v.traverseVisible(function(W){W.isLight&&W.layers.test(I.layers)&&(w.pushLight(W),W.castShadow&&w.pushShadow(W))}),w.setupLights(),H!==null&&H.updateLights(w.state.lightsArray),Ze=this.localClippingEnabled,Je=F.init(this.clippingPlanes,Ze),Je===!0&&F.setGlobalState(this.clippingPlanes,I),H!==null&&ce.render(w.state.shadowsArray,K,I);const k=new Set;return v.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const ve=W.material;if(ve)if(Array.isArray(ve))for(let we=0;we<ve.length;we++){const xe=ve[we];xt(xe,K,I,W),k.add(xe)}else xt(ve,K,I,W),k.add(ve)}),w=y.pop(),H!==null&&H.renderEnd(),k},this.compileAsync=function(v,I,K=null){const k=this.compile(v,I,K);return new Promise(W=>{function ve(){if(k.forEach(function(we){const Te=De.get(we).currentProgram;(Te===void 0||Te.isReady())&&k.delete(we)}),k.size===0){W(v);return}setTimeout(ve,10)}at.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let rn=null;function ft(v){rn&&rn(v)}function Qt(){St.stop()}function Ot(){St.start()}const St=new Dl;St.setAnimationLoop(ft),typeof self<"u"&&St.setContext(self),this.setAnimationLoop=function(v){rn=v,he.setAnimationLoop(v),v===null?St.stop():St.start()},he.addEventListener("sessionstart",Qt),he.addEventListener("sessionend",Ot),this.render=function(v,I){if(I!==void 0&&I.isCamera!==!0){rt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;H!==null&&H.renderStart(v,I);const K=he.enabled===!0&&he.isPresenting===!0,k=z!==null&&(ie===null||K)&&z.begin(D,ie);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),he.enabled===!0&&he.isPresenting===!0&&(z===null||z.isCompositing()===!1)&&(he.cameraAutoUpdate===!0&&he.updateCamera(I),I=he.getCamera()),v.isScene===!0&&v.onBeforeRender(D,v,I,ie),w=X.get(v,y.length),w.init(I),w.state.textureUnits=Fe.getTextureUnits(),y.push(w),Ke.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),I.isArrayCamera?ke.setFromArrayCamera(I):Se.setFromProjectionMatrix(Ke,pn,I.reversedDepth),Ze=this.localClippingEnabled,Je=F.init(this.clippingPlanes,Ze),P=fe.get(v,m.length),P.init(),m.push(P),this.info.render.frame++,he.enabled===!0&&he.isPresenting===!0){const we=D.xr.getDepthSensingMesh();we!==null&&Et(we,I,-1/0,D.sortObjects)}Et(v,I,0,D.sortObjects),P.finish(),H!==null&&H.updateLights(w.state.lightsArray),D.sortObjects===!0&&P.sort(Ae,Ie),Lt=he.enabled===!1||he.isPresenting===!1||he.hasDepthSensing()===!1,Lt&&A.addToRenderList(P,v),this.info.autoReset===!0&&this.info.reset(),Je===!0&&F.beginShadows();const W=w.state.shadowsArray;if(ce.render(W,v,I),Je===!0&&F.endShadows(),(k&&z.hasRenderPass())===!1){const we=P.opaque,xe=P.transmissive;if(w.setupLights(),I.isArrayCamera){const Te=I.cameras;if(xe.length>0)for(let Le=0,Ge=Te.length;Le<Ge;Le++){const je=Te[Le];jt(we,xe,v,je)}Lt&&A.render(v);for(let Le=0,Ge=Te.length;Le<Ge;Le++){const je=Te[Le];Rt(P,v,je,je.viewport)}}else xe.length>0&&jt(we,xe,v,I),Lt&&A.render(v),Rt(P,v,I)}ie!==null&&J===0&&(Fe.updateMultisampleRenderTarget(ie),Fe.updateRenderTargetMipmap(ie)),k&&z.end(D),v.isScene===!0&&v.onAfterRender(D,v,I),ge.resetDefaultState(),q=-1,R=null,y.pop(),y.length>0?(w=y[y.length-1],Fe.setTextureUnits(w.state.textureUnits),Je===!0&&F.setGlobalState(D.clippingPlanes,w.state.camera)):w=null,m.pop(),m.length>0?P=m[m.length-1]:P=null,H!==null&&H.renderEnd()};function Et(v,I,K,k){if(v.visible===!1)return;if(v.layers.test(I.layers)){if(v.isGroup)K=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(I);else if(v.isLight)w.pushLight(v),v.castShadow&&w.pushShadow(v);else if(v.isSprite){const we=I.isArrayCamera?ke:Se;if(!v.frustumCulled||v.intersectsFrustum(we)){k&&qe.setFromMatrixPosition(v.matrixWorld).applyMatrix4(Ke);const xe=Q.update(v),Te=v.material;Te.visible&&P.push(v,xe,Te,K,qe.z,null,I)}}else if(v.isMesh||v.isLine||v.isPoints){const we=I.isArrayCamera?ke:Se;if(!v.frustumCulled||v.intersectsFrustum(we)){const xe=Q.update(v),Te=v.material;if(k&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),qe.copy(v.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),qe.copy(xe.boundingSphere.center)),qe.applyMatrix4(v.matrixWorld).applyMatrix4(Ke)),Array.isArray(Te)){const Le=xe.groups;for(let Ge=0,je=Le.length;Ge<je;Ge++){const Re=Le[Ge],et=Te[Re.materialIndex];et&&et.visible&&P.push(v,xe,et,K,qe.z,Re,I)}}else Te.visible&&P.push(v,xe,Te,K,qe.z,null,I)}}}const ve=v.children;for(let we=0,xe=ve.length;we<xe;we++)Et(ve[we],I,K,k)}function Rt(v,I,K,k){const{opaque:W,transmissive:ve,transparent:we}=v;w.setupLightsView(K),Je===!0&&F.setGlobalState(D.clippingPlanes,K),k&&_e.viewport(M.copy(k)),W.length>0&&sn(W,I,K),ve.length>0&&sn(ve,I,K),we.length>0&&sn(we,I,K),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function jt(v,I,K,k){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[k.id]===void 0){const Re=at.has("EXT_color_buffer_half_float")||at.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[k.id]=new Sn(1,1,{generateMipmaps:!0,type:Re?yn:nn,minFilter:Vn,samples:Math.max(4,lt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:tt.workingColorSpace})}const ve=w.state.transmissionRenderTarget[k.id],we=k.viewport||M;ve.setSize(we.z*D.transmissionResolutionScale,we.w*D.transmissionResolutionScale);const xe=D.getRenderTarget(),Te=D.getActiveCubeFace(),Le=D.getActiveMipmapLevel();D.setRenderTarget(ve),D.getClearColor(G),re=D.getClearAlpha(),re<1&&D.setClearColor(16777215,.5),D.clear(),Lt&&A.render(K);const Ge=D.toneMapping;D.toneMapping=Dn;const je=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),w.setupLightsView(k),Je===!0&&F.setGlobalState(D.clippingPlanes,k),sn(v,K,k),Fe.updateMultisampleRenderTarget(ve),Fe.updateRenderTargetMipmap(ve),at.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let et=0,Tt=I.length;et<Tt;et++){const ht=I[et],{object:ut,geometry:Bt,material:Ce,group:Vt}=ht;if(Ce.side===xn&&ut.layers.test(k.layers)){const st=Ce.side;Ce.side=$t,Ce.needsUpdate=!0,qt(ut,K,k,Bt,Ce,Vt),Ce.side=st,Ce.needsUpdate=!0,Re=!0}}Re===!0&&(Fe.updateMultisampleRenderTarget(ve),Fe.updateRenderTargetMipmap(ve))}D.setRenderTarget(xe,Te,Le),D.setClearColor(G,re),je!==void 0&&(k.viewport=je),D.toneMapping=Ge}function sn(v,I,K){const k=I.isScene===!0?I.overrideMaterial:null;for(let W=0,ve=v.length;W<ve;W++){const we=v[W],{object:xe,geometry:Te,group:Le}=we;let Ge=we.material;Ge.allowOverride===!0&&k!==null&&(Ge=k),xe.layers.test(K.layers)&&qt(xe,I,K,Te,Ge,Le)}}function qt(v,I,K,k,W,ve){H!==null&&W.isNodeMaterial&&H.setObject(v,W),v.onBeforeRender(D,I,K,k,W,ve),v.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),W.onBeforeRender(D,I,K,k,v,ve),W.transparent===!0&&W.side===xn&&W.forceSinglePass===!1?(W.side=$t,W.needsUpdate=!0,D.renderBufferDirect(K,I,k,W,v,ve),W.side=si,W.needsUpdate=!0,D.renderBufferDirect(K,I,k,W,v,ve),W.side=xn):D.renderBufferDirect(K,I,k,W,v,ve),v.onAfterRender(D,I,K,k,W,ve)}function Kn(v){let I=0;for(const K of v)K.texture!==null&&I++;return I}function $n(v,I,K){I.isScene!==!0&&(I=ot);const k=De.get(v),W=w.state.lights,ve=w.state.shadowsArray,we=W.state.version,xe=Z.getParameters(v,W.state,ve,I,K,w.state.lightProbeGridArray),Te=Z.getProgramCacheKey(xe);let Le=k.programs;k.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?I.environment:null,k.fog=I.fog;const Ge=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;k.envMap=b.get(v.envMap||k.environment,Ge),k.envMapRotation=k.environment!==null&&v.envMap===null?I.environmentRotation:v.envMapRotation,Le===void 0&&(v.addEventListener("dispose",Pe),Le=new Map,k.programs=Le,k.programVariants=new Map);let je=Le.get(Te);if(je!==void 0){if(k.currentProgram===je&&k.lightsStateVersion===we)return sr(v,xe),je}else xe.uniforms=Z.getUniforms(v),H!==null&&v.isNodeMaterial&&H.build(v,K,xe),v.onBeforeCompile(xe,D),je=Z.acquireProgram(xe,Te),Le.set(Te,je),k.uniforms=xe.uniforms;const Re=k.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Re.clippingPlanes=F.uniform),sr(v,xe),k.needsLights=Wl(v),k.lightsStateVersion=we,k.needsLights&&(Re.ambientLightColor.value=W.state.ambient,Re.lightProbe.value=W.state.probe,Re.sunLights.value=W.state.sun,Re.sunLightShadows.value=W.state.sunShadow,Re.directionalLights.value=W.state.directional,Re.directionalLightShadows.value=W.state.directionalShadow,Re.spotLights.value=W.state.spot,Re.spotLightShadows.value=W.state.spotShadow,Re.rectAreaLights.value=W.state.rectArea,Re.ltc_1.value=W.state.rectAreaLTC1,Re.ltc_2.value=W.state.rectAreaLTC2,Re.pointLights.value=W.state.point,Re.pointLightShadows.value=W.state.pointShadow,Re.hemisphereLights.value=W.state.hemi,Re.sunShadowMatrix.value=W.state.sunShadowMatrix,Re.sunShadowCascade.value=W.state.sunShadowCascade,Re.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Re.spotLightMatrix.value=W.state.spotLightMatrix,Re.spotLightMap.value=W.state.spotLightMap,Re.pointShadowMatrix.value=W.state.pointShadowMatrix),k.numLightProbeGrids=Kn(w.state.lightProbeGridArray),k.currentProgram=je,k.uniformsList=null,je}function Nn(v,I,K,k,W){const ve=De.get(v),we=ve.currentProgram.id+","+k+","+W;let xe=ve.programVariants.get(we);return xe===void 0?(xe=$n(v,I,K),ve.programVariants.set(we,xe)):(ve.currentProgram=xe,ve.uniformsList=null,ve.outputColorSpace=k,ve.toneMapping=W),xe}function rr(v){if(v.uniformsList===null){const I=v.currentProgram.getUniforms();v.uniformsList=Hr.seqWithValue(I.seq,v.uniforms)}return v.uniformsList}function sr(v,I){const K=De.get(v);K.outputColorSpace=I.outputColorSpace,K.batching=I.batching,K.batchingColor=I.batchingColor,K.instancing=I.instancing,K.instancingColor=I.instancingColor,K.instancingMorph=I.instancingMorph,K.skinning=I.skinning,K.morphTargets=I.morphTargets,K.morphNormals=I.morphNormals,K.morphColors=I.morphColors,K.morphTargetsCount=I.morphTargetsCount,K.numClippingPlanes=I.numClippingPlanes,K.numIntersection=I.numClipIntersection,K.vertexAlphas=I.vertexAlphas,K.vertexTangents=I.vertexTangents,K.toneMapping=I.toneMapping}function ar(v,I,K,k,W){I.isScene!==!0&&(I=ot),Fe.resetTextureUnits();const ve=I.fog,we=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?I.environment:null,xe=ie===null?D.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:tt.workingColorSpace,Te=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Le=b.get(k.envMap||we,Te),Ge=k.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,je=!!K.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Re=!!K.morphAttributes.position,et=!!K.morphAttributes.normal,Tt=!!K.morphAttributes.color;let ht=Dn;k.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(ht=D.toneMapping);const ut=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Bt=ut!==void 0?ut.length:0,Ce=De.get(k),Vt=w.state.lights;if(Je===!0&&(Ze===!0||v!==R)){const vt=v===R&&k.id===q;F.setState(k,v,vt)}let st=!1,Jn=!1;k.version===Ce.__version?Ce.needsLights&&Ce.lightsStateVersion!==Vt.state.version||W.isBatchedMesh&&Ce.batching===!1||!W.isBatchedMesh&&Ce.batching===!0||W.isBatchedMesh&&Ce.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&Ce.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&Ce.instancing===!1||!W.isInstancedMesh&&Ce.instancing===!0||W.isSkinnedMesh&&Ce.skinning===!1||!W.isSkinnedMesh&&Ce.skinning===!0||W.isInstancedMesh&&Ce.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ce.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ce.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ce.instancingMorph===!1&&W.morphTexture!==null||Ce.envMap!==Le||k.fog===!0&&Ce.fog!==ve||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==F.numPlanes||Ce.numIntersection!==F.numIntersection)||Ce.vertexAlphas!==Ge||Ce.vertexTangents!==je||Ce.morphTargets!==Re||Ce.morphNormals!==et||Ce.morphColors!==Tt||Ce.morphTargetsCount!==Bt||Ce.numLightProbeGrids!==Kn(w.state.lightProbeGridArray)?st=!0:(Ce.outputColorSpace!==xe||Ce.toneMapping!==ht)&&(Jn=!0):(st=!0,Ce.__version=k.version);let zt=Ce.currentProgram;(st===!0||Jn===!0)&&(zt=Jn===!0?Nn(k,I,W,xe,ht):$n(k,I,W),H&&k.isNodeMaterial&&H.onUpdateProgram(k,zt,Ce));let or=!1,Un=!1,Qn=!1;const it=zt.getUniforms(),Ut=Ce.uniforms;if(_e.useProgram(zt.program)&&(or=!0,Un=!0,Qn=!0),k.id!==q&&(q=k.id,Un=!0),or||R!==v){_e.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),it.setValue(N,"projectionMatrix",v.projectionMatrix),it.setValue(N,"viewMatrix",v.matrixWorldInverse);const Dt=it.map.cameraPosition;Dt!==void 0&&Dt.setValue(N,gt.setFromMatrixPosition(v.matrixWorld)),lt.logarithmicDepthBuffer&&it.setValue(N,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&it.setValue(N,"isOrthographic",v.isOrthographicCamera===!0),R!==v&&(R=v,Un=!0,Qn=!0)}if(Ce.needsLights&&(Vt.state.sunShadowMap.length>0&&it.setValue(N,"sunShadowMap",Vt.state.sunShadowMap,Fe),Vt.state.directionalShadowMap.length>0&&it.setValue(N,"directionalShadowMap",Vt.state.directionalShadowMap,Fe),Vt.state.spotShadowMap.length>0&&it.setValue(N,"spotShadowMap",Vt.state.spotShadowMap,Fe),Vt.state.pointShadowMap.length>0&&it.setValue(N,"pointShadowMap",Vt.state.pointShadowMap,Fe)),W.isSkinnedMesh){it.setOptional(N,W,"bindMatrix"),it.setOptional(N,W,"bindMatrixInverse");const vt=W.skeleton;vt&&(vt.boneTexture===null&&vt.computeBoneTexture(),it.setValue(N,"boneTexture",vt.boneTexture,Fe))}W.isBatchedMesh&&(it.setOptional(N,W,"batchingTexture"),it.setValue(N,"batchingTexture",W._matricesTexture,Fe),it.setOptional(N,W,"batchingIdTexture"),it.setValue(N,"batchingIdTexture",W._indirectTexture,Fe),it.setOptional(N,W,"batchingColorTexture"),W._colorsTexture!==null&&it.setValue(N,"batchingColorTexture",W._colorsTexture,Fe));const un=K.morphAttributes;if((un.position!==void 0||un.normal!==void 0||un.color!==void 0)&&U.update(W,K,zt),(Un||Ce.receiveShadow!==W.receiveShadow)&&(Ce.receiveShadow=W.receiveShadow,it.setValue(N,"receiveShadow",W.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&I.environment!==null&&(Ut.envMapIntensity.value=I.environmentIntensity),Ut.dfgLUT!==void 0&&(Ut.dfgLUT.value=om()),Un){if(it.setValue(N,"toneMappingExposure",D.toneMappingExposure),Ce.needsLights&&Vl(Ut,Qn),ve&&k.fog===!0&&oe.refreshFogUniforms(Ut,ve),oe.refreshMaterialUniforms(Ut,k,ne,ue,w.state.transmissionRenderTarget[v.id]),Ce.needsLights&&Ce.numLightProbeGrids>0){const vt=T;let Dt=0;for(const bn of w.state.lightProbeGridArray)bn.texture!==null&&(vt.textures[Dt]=bn.texture,vt.min[Dt]=bn.boundingBox.min,vt.max[Dt]=bn.boundingBox.max,vt.resolution[Dt]=bn.resolution,Dt++);for(const bn in vt)vt[bn].length=Dt;Ut.probesSH.value=vt.textures,Ut.probesMin.value=vt.min,Ut.probesMax.value=vt.max,Ut.probesResolution.value=vt.resolution}Hr.upload(N,rr(Ce),Ut,Fe)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Hr.upload(N,rr(Ce),Ut,Fe),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&it.setValue(N,"center",W.center),it.setValue(N,"modelViewMatrix",W.modelViewMatrix),it.setValue(N,"normalMatrix",W.normalMatrix),it.setValue(N,"modelMatrix",W.matrixWorld),k.uniformsGroups!==void 0){const vt=k.uniformsGroups;for(let Dt=0,bn=vt.length;Dt<bn;Dt++){const za=vt[Dt];be.update(za,zt),be.bind(za,zt)}}return zt}function Vl(v,I){v.ambientLightColor.needsUpdate=I,v.lightProbe.needsUpdate=I,v.sunLights.needsUpdate=I,v.sunLightShadows.needsUpdate=I,v.directionalLights.needsUpdate=I,v.directionalLightShadows.needsUpdate=I,v.pointLights.needsUpdate=I,v.pointLightShadows.needsUpdate=I,v.spotLights.needsUpdate=I,v.spotLightShadows.needsUpdate=I,v.rectAreaLights.needsUpdate=I,v.hemisphereLights.needsUpdate=I}function Wl(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return te},this.getActiveMipmapLevel=function(){return J},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(v,I,K){const k=De.get(v);k.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),De.get(v.texture).__webglTexture=I,De.get(v.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:K,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,I){const K=De.get(v);K.__webglFramebuffer=I,K.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(v,I=0,K=0){ie=v,te=I,J=K;let k=null,W=!1,ve=!1;if(v){const xe=De.get(v);if(xe.__useDefaultFramebuffer!==void 0){_e.bindFramebuffer(N.FRAMEBUFFER,xe.__webglFramebuffer),M.copy(v.viewport),ee.copy(v.scissor),de=v.scissorTest,_e.viewport(M),_e.scissor(ee),_e.setScissorTest(de),q=-1;return}else if(xe.__webglFramebuffer===void 0)Fe.setupRenderTarget(v);else if(xe.__hasExternalTextures)Fe.rebindTextures(v,De.get(v.texture).__webglTexture,De.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const Ge=v.depthTexture;if(xe.__boundDepthTexture!==Ge){if(Ge!==null&&De.has(Ge)&&(v.width!==Ge.image.width||v.height!==Ge.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Fe.setupDepthRenderbuffer(v)}}const Te=v.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(ve=!0);const Le=De.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Le[I])?k=Le[I][K]:k=Le[I],W=!0):v.samples>0&&Fe.useMultisampledRTT(v)===!1?k=De.get(v).__webglMultisampledFramebuffer:Array.isArray(Le)?k=Le[K]:k=Le,M.copy(v.viewport),ee.copy(v.scissor),de=v.scissorTest}else M.copy(Me).multiplyScalar(ne).floor(),ee.copy(Ne).multiplyScalar(ne).floor(),de=Oe;if(K!==0&&(k=j),_e.bindFramebuffer(N.FRAMEBUFFER,k)&&_e.drawBuffers(v,k),_e.viewport(M),_e.scissor(ee),_e.setScissorTest(de),W){const xe=De.get(v.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+I,xe.__webglTexture,K)}else if(ve){const xe=I;for(let Te=0;Te<v.textures.length;Te++){const Le=De.get(v.textures[Te]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Te,Le.__webglTexture,K,xe)}}else if(v!==null&&K!==0){const xe=De.get(v.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,xe.__webglTexture,K)}q=-1};function Ba(v){const I=De.get(v);return(I.__readFormat!==v.format||I.__readType!==v.type)&&(I.__readFormat=v.format,I.__readType=v.type,I.__formatReadable=lt.textureFormatReadable(v.format),I.__typeReadable=lt.textureTypeReadable(v.type)),I}this.readRenderTargetPixels=function(v,I,K,k,W,ve,we,xe=0){if(!(v&&v.isWebGLRenderTarget)){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=De.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&we!==void 0&&(Te=Te[we],Array.isArray(Te)&&(Te=Te[0])),Te){_e.bindFramebuffer(N.FRAMEBUFFER,Te);try{const Le=v.textures[xe],Ge=Le.format,je=Le.type;v.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+xe);const Re=Ba(Le);if(Re.__formatReadable===!1){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Re.__typeReadable===!1){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=v.width-k&&K>=0&&K<=v.height-W&&N.readPixels(I,K,k,W,pe.convert(Ge),pe.convert(je),ve)}finally{const Le=ie!==null?De.get(ie).__webglFramebuffer:null;_e.bindFramebuffer(N.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(v,I,K,k,W,ve,we,xe=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=De.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&we!==void 0&&(Te=Te[we],Array.isArray(Te)&&(Te=Te[0])),Te)if(I>=0&&I<=v.width-k&&K>=0&&K<=v.height-W){_e.bindFramebuffer(N.FRAMEBUFFER,Te);const Le=v.textures[xe],Ge=Le.format,je=Le.type;v.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+xe);const Re=Ba(Le);if(Re.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Re.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const et=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,et),N.bufferData(N.PIXEL_PACK_BUFFER,ve.byteLength,N.STREAM_READ),N.readPixels(I,K,k,W,pe.convert(Ge),pe.convert(je),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);const Tt=ie!==null?De.get(ie).__webglFramebuffer:null;_e.bindFramebuffer(N.FRAMEBUFFER,Tt);const ht=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Ac(N,ht,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,et),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ve),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(et),N.deleteSync(ht),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,I=null,K=0){const k=Math.pow(2,-K),W=Math.floor(v.image.width*k),ve=Math.floor(v.image.height*k),we=I!==null?I.x:0,xe=I!==null?I.y:0;Fe.setTexture2D(v,0),N.copyTexSubImage2D(N.TEXTURE_2D,K,0,0,we,xe,W,ve),_e.unbindTexture()},this.copyTextureToTexture=function(v,I,K=null,k=null,W=0,ve=0){let we,xe,Te,Le,Ge,je,Re,et,Tt;const ht=v.isCompressedTexture?v.mipmaps[ve]:v.image;if(K!==null)we=K.max.x-K.min.x,xe=K.max.y-K.min.y,Te=K.isBox3?K.max.z-K.min.z:1,Le=K.min.x,Ge=K.min.y,je=K.isBox3?K.min.z:0;else{const it=Math.pow(2,-W);we=Math.floor(ht.width*it),xe=Math.floor(ht.height*it),v.isDataArrayTexture?Te=ht.depth:v.isData3DTexture?Te=Math.floor(ht.depth*it):Te=1,Le=0,Ge=0,je=0}k!==null?(Re=k.x,et=k.y,Tt=k.z):(Re=0,et=0,Tt=0);const ut=pe.convert(I.format),Bt=pe.convert(I.type);let Ce;I.isData3DTexture?(Fe.setTexture3D(I,0),Ce=N.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(Fe.setTexture2DArray(I,0),Ce=N.TEXTURE_2D_ARRAY):(Fe.setTexture2D(I,0),Ce=N.TEXTURE_2D),_e.activeTexture(N.TEXTURE0),_e.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,I.flipY),_e.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),_e.pixelStorei(N.UNPACK_ALIGNMENT,I.unpackAlignment);const Vt=_e.getParameter(N.UNPACK_ROW_LENGTH),st=_e.getParameter(N.UNPACK_IMAGE_HEIGHT),Jn=_e.getParameter(N.UNPACK_SKIP_PIXELS),zt=_e.getParameter(N.UNPACK_SKIP_ROWS),or=_e.getParameter(N.UNPACK_SKIP_IMAGES);_e.pixelStorei(N.UNPACK_ROW_LENGTH,ht.width),_e.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ht.height),_e.pixelStorei(N.UNPACK_SKIP_PIXELS,Le),_e.pixelStorei(N.UNPACK_SKIP_ROWS,Ge),_e.pixelStorei(N.UNPACK_SKIP_IMAGES,je);const Un=v.isDataArrayTexture||v.isData3DTexture,Qn=I.isDataArrayTexture||I.isData3DTexture;if(v.isDepthTexture){const it=De.get(v),Ut=De.get(I),un=De.get(it.__renderTarget),vt=De.get(Ut.__renderTarget);_e.bindFramebuffer(N.READ_FRAMEBUFFER,un.__webglFramebuffer),_e.bindFramebuffer(N.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let Dt=0;Dt<Te;Dt++)Un&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,De.get(v).__webglTexture,W,je+Dt),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,De.get(I).__webglTexture,ve,Tt+Dt)),N.blitFramebuffer(Le,Ge,Le+we,Ge+xe,Re,et,Re+we,et+xe,N.DEPTH_BUFFER_BIT,N.NEAREST);_e.bindFramebuffer(N.READ_FRAMEBUFFER,null),_e.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(W!==0||v.isRenderTargetTexture||De.has(v)){const it=De.get(v),Ut=De.get(I);_e.bindFramebuffer(N.READ_FRAMEBUFFER,L),_e.bindFramebuffer(N.DRAW_FRAMEBUFFER,$);for(let un=0;un<Te;un++)Un?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,it.__webglTexture,W,je+un):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,it.__webglTexture,W),Qn?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ut.__webglTexture,ve,Tt+un):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ut.__webglTexture,ve),W!==0?N.blitFramebuffer(Le,Ge,Le+we,Ge+xe,Re,et,Re+we,et+xe,N.COLOR_BUFFER_BIT,N.NEAREST):Qn?N.copyTexSubImage3D(Ce,ve,Re,et,Tt+un,Le,Ge,we,xe):N.copyTexSubImage2D(Ce,ve,Re,et,Le,Ge,we,xe);_e.bindFramebuffer(N.READ_FRAMEBUFFER,null),_e.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else Qn?v.isDataTexture||v.isData3DTexture?N.texSubImage3D(Ce,ve,Re,et,Tt,we,xe,Te,ut,Bt,ht.data):I.isCompressedArrayTexture?N.compressedTexSubImage3D(Ce,ve,Re,et,Tt,we,xe,Te,ut,ht.data):N.texSubImage3D(Ce,ve,Re,et,Tt,we,xe,Te,ut,Bt,ht):v.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ve,Re,et,we,xe,ut,Bt,ht.data):v.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ve,Re,et,ht.width,ht.height,ut,ht.data):N.texSubImage2D(N.TEXTURE_2D,ve,Re,et,we,xe,ut,Bt,ht);_e.pixelStorei(N.UNPACK_ROW_LENGTH,Vt),_e.pixelStorei(N.UNPACK_IMAGE_HEIGHT,st),_e.pixelStorei(N.UNPACK_SKIP_PIXELS,Jn),_e.pixelStorei(N.UNPACK_SKIP_ROWS,zt),_e.pixelStorei(N.UNPACK_SKIP_IMAGES,or),ve===0&&I.generateMipmaps===!0&&I.mipmapsAutoUpdate===!0&&N.generateMipmap(Ce),_e.unbindTexture()},this.initRenderTarget=function(v){De.get(v).__webglFramebuffer===void 0&&Fe.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?Fe.setTextureCube(v,0):v.isData3DTexture?Fe.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?Fe.setTexture2DArray(v,0):Fe.setTexture2D(v,0),_e.unbindTexture()},this.resetState=function(){te=0,J=0,ie=null,_e.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=tt._getUnpackColorSpace()}}const Pn=[{index:0,x:-6,z:-6,glassX:-7.2,bombX:-7.5,bombZ:-7.5,color:15680580,hex:"#ef4444",shape:"▲",label:"Merah"},{index:1,x:6,z:-6,glassX:-2.4,bombX:7.5,bombZ:-7.5,color:3900150,hex:"#3b82f6",shape:"◆",label:"Biru"},{index:2,x:-6,z:6,glassX:2.4,bombX:-7.5,bombZ:7.5,color:16096779,hex:"#f59e0b",shape:"●",label:"Kuning"},{index:3,x:6,z:6,glassX:7.2,bombX:7.5,bombZ:7.5,color:1096065,hex:"#10b981",shape:"■",label:"Hijau"}],Wo=[15485081,9133302,440020,16347926,1357990,11032055,3900150,1096065,16007006,6514417];function fm({phase:i,arenaMode:e="bomb_tag",bombHolderId:t=null,explodedPlayerId:n=null,isHost:r=!1,localPlayerId:s,players:a,correctIndex:o,options:c=[],questionText:l,timeLeft:f,onMove:g,onSelectZone:d,selectedZone:p=null}){const x=Yt.useRef(null),S=e==="glass_bridge",h=e==="bomb_tag",u=Yt.useRef({x:0,z:S?7.2:0,y:.5,vy:0,jumping:!1}),E=Yt.useRef({w:!1,a:!1,s:!1,d:!1,space:!1}),[C,T]=Yt.useState(p),[P,w]=Yt.useState(!0),m=Yt.useRef(!0);m.current=P;const y=Yt.useRef(i);y.current=i;const z=Yt.useRef(e);z.current=e;const D=Yt.useRef(t);D.current=t;const B=Yt.useRef(n);B.current=n;const H=Yt.useRef(o);H.current=o;const j=Yt.useRef(a);j.current=a;const L=Yt.useRef(c);L.current=c;const $=ie=>{const q=Pn[ie];q&&(e==="glass_bridge"?(u.current.x=q.glassX+(Math.random()-.5)*.6,u.current.z=0+(Math.random()-.5)*.8):e==="bomb_tag"?(u.current.x=q.bombX+(Math.random()-.5)*1.5,u.current.z=q.bombZ+(Math.random()-.5)*1.5):(u.current.x=q.x+(Math.random()-.5)*2,u.current.z=q.z+(Math.random()-.5)*2),u.current.vy=.25,u.current.jumping=!0,T(ie),d&&d(ie),g&&g(u.current.x,u.current.z,!0,ie))},te=()=>{u.current.y<=.55&&(u.current.vy=.28,u.current.jumping=!0)};Yt.useEffect(()=>{if(typeof window>"u"||!x.current)return;u.current.x=(Math.random()-.5)*2,u.current.z=e==="glass_bridge"?7.2:0,u.current.y=.5,u.current.vy=0,u.current.jumping=!1;const ie=x.current,q=ie.clientWidth||800,R=ie.clientHeight||500,M=new Vc,ee=e==="glass_bridge",de=e==="bomb_tag";ee?(M.background=new We(593174),M.fog=new Ki(593174,.016)):de?(M.background=new We(592139),M.fog=new Ki(592139,.015)):(M.background=new We(988970),M.fog=new Ki(988970,.015));const G=de?20:ee?24:22,re=q/R,ae=new Fa(-G*re/2,G*re/2,G/2,-G/2,-100,200);ee?(ae.position.set(22,20,18),ae.lookAt(0,0,-3)):(ae.position.set(20,20,20),ae.lookAt(0,0,0));const ue=new ln(48,q/R,.1,500);ee?(ue.position.set(0,15.5,17.5),ue.lookAt(0,-.6,-.5)):de?(ue.position.set(0,20.5,22.5),ue.lookAt(0,-.5,0)):(ue.position.set(0,20,23),ue.lookAt(0,-.5,0));const ne=new lm({antialias:!0,alpha:!1});ne.setSize(q,R),ne.setPixelRatio(Math.min(window.devicePixelRatio,2)),ne.shadowMap.enabled=!0,ne.shadowMap.type=Xo,ie.appendChild(ne.domElement);const Ae=new du(16777215,ee?.95:de?1.05:.85);M.add(Ae);const Ie=new Mo(16777215,ee?1.4:de?1.5:1.2);Ie.position.set(24,36,24),Ie.castShadow=!0,Ie.shadow.mapSize.width=1024,Ie.shadow.mapSize.height=1024,Ie.shadow.camera.near=.5,Ie.shadow.camera.far=120,Ie.shadow.camera.left=-22,Ie.shadow.camera.right=22,Ie.shadow.camera.top=22,Ie.shadow.camera.bottom=-22,M.add(Ie);const Me=new Mo(9741240,.4);Me.position.set(-20,15,-20),M.add(Me);const Ne=new Ls(ee?6514417:de?16096779:16726784,ee?2.5:de?2:2.5,60);Ne.position.set(0,-3.5,0),M.add(Ne);const Oe=[],Se=[];let ke=null,Je=null,Ze=null,Ke=null,gt=null,qe=null,ot=null;const Lt=(O,Q,Z,oe,fe)=>{const X=document.createElement("canvas");X.width=512,X.height=512;const F=X.getContext("2d");if(F){if(fe){F.fillStyle=Z,F.fillRect(0,0,512,512);const A=F.createLinearGradient(0,0,512,512);A.addColorStop(0,"rgba(255, 255, 255, 0.45)"),A.addColorStop(.3,"rgba(255, 255, 255, 0.1)"),A.addColorStop(.7,"rgba(0, 0, 0, 0.15)"),A.addColorStop(1,"rgba(255, 255, 255, 0.3)"),F.fillStyle=A,F.fillRect(0,0,512,512),F.strokeStyle="#ffffff",F.lineWidth=16,F.strokeRect(16,16,480,480)}else F.fillStyle=Z,F.fillRect(0,0,512,512),F.strokeStyle="rgba(255,255,255,0.45)",F.lineWidth=14,F.strokeRect(20,20,472,472),F.fillStyle="rgba(0,0,0,0.15)",F.fillRect(30,30,452,452);if(F.fillStyle="#ffffff",F.font="bold 140px Arial, sans-serif",F.textAlign="center",F.textBaseline="middle",F.shadowColor="rgba(0, 0, 0, 0.5)",F.shadowBlur=12,F.fillText(O,256,170),F.font="bold 44px Arial, sans-serif",F.fillStyle="#ffffff",F.shadowBlur=8,F.fillText(Q,256,265),oe){F.font="bold 28px Arial, sans-serif",F.fillStyle="#ffffff",F.shadowBlur=6;const A=oe.split(" ");let U="",Y="";for(const me of A)(U+" "+me).length<=22?U+=(U?" ":"")+me:(Y+" "+me).length<=24&&(Y+=(Y?" ":"")+me);F.fillText(U,256,345),Y&&F.fillText(Y,256,385)}}const ce=new Wi(X);return Se.push(ce),ce};if(de){const O=new Mt(24,.8,24),Q=new wt({color:1579035,roughness:.6,metalness:.2}),Z=new He(O,Q);Z.position.set(0,-.4,0),Z.receiveShadow=!0,M.add(Z);const oe=15381256,fe=.35,X=.45,F=new wt({color:oe,roughness:.4,metalness:.3});[-12,12].forEach(ft=>{const Qt=new Mt(24.4,X,fe),Ot=new He(Qt,F);Ot.position.set(0,X/2,ft),M.add(Ot)}),[-12,12].forEach(ft=>{const Qt=new Mt(fe,X,24.4),Ot=new He(Qt,F);Ot.position.set(ft,X/2,0),M.add(Ot)});const ce=new So(10,10,16096779,4144966);ce.position.y=.02,M.add(ce);const A=document.createElement("canvas");A.width=256,A.height=256;const U=A.getContext("2d");U&&(U.fillStyle="#18181b",U.fillRect(0,0,256,256),U.strokeStyle="#eab308",U.lineWidth=10,U.strokeRect(15,15,226,226),U.font="bold 54px Arial, sans-serif",U.fillStyle="#ef4444",U.textAlign="center",U.fillText("💣",128,110),U.font="bold 24px Arial, sans-serif",U.fillStyle="#facc15",U.fillText("BOMB TAG",128,165),U.font="bold 16px Arial, sans-serif",U.fillStyle="#94a3b8",U.fillText("ESTAFET ZONE",128,200));const Y=new Wi(A);Se.push(Y);const me=new Xn(4.2,4.2),pe=new Zt({map:Y,transparent:!0,opacity:.85}),ge=new He(me,pe);ge.rotation.x=-Math.PI/2,ge.position.set(0,.03,0),M.add(ge),Pn.forEach((ft,Qt)=>{const Ot=new Mt(6.6,.45,6.6),St=c[Qt]||"",Et=Lt(ft.shape,ft.label,ft.hex,St,!1),Rt=new wt({color:ft.color,roughness:.4,metalness:.3}),jt=new Zt({map:Et}),sn=[Rt,Rt,jt,Rt,Rt,Rt],qt=new He(Ot,sn);qt.position.set(ft.bombX,.12,ft.bombZ),qt.castShadow=!0,qt.receiveShadow=!0,M.add(qt),Oe.push(qt);const Kn=new Ls(ft.color,1.2,8);Kn.position.set(ft.bombX,1.2,ft.bombZ),M.add(Kn)}),Ze=new ri,Ze.visible=!1;const be=new wt({color:1118481,roughness:.25,metalness:.85});Ke=new He(new $i(.46,20,20),be),Ke.castShadow=!0,Ze.add(Ke);const Ue=new ii(.045,.045,.26,8),he=new wt({color:14251782,roughness:.7}),le=new He(Ue,he);le.position.set(0,.52,0),Ze.add(le);const Ee=new $i(.12,10,10),se=new Zt({color:16768256}),Pe=new He(Ee,se);Pe.position.set(0,.68,0),Ze.add(Pe),gt=new Ls(15680580,2.5,6),gt.position.set(0,.6,0),Ze.add(gt),M.add(Ze);const ze=new Ia(.85,1.2,32),$e=new Zt({color:15680580,side:xn,transparent:!0,opacity:.75});qe=new He(ze,$e),qe.rotation.x=-Math.PI/2,qe.position.set(0,.04,0),qe.visible=!1,M.add(qe);const xt=new $i(2.4,24,24),rn=new wt({color:16726784,emissive:16720384,emissiveIntensity:1.6,roughness:.2,transparent:!0,opacity:.92});ot=new He(xt,rn),ot.position.set(0,1.5,0),ot.scale.set(.01,.01,.01),ot.visible=!1,M.add(ot)}else if(ee){const O=new Xn(120,120),Q=new Zt({color:329745}),Z=new He(O,Q);Z.rotation.x=-Math.PI/2,Z.position.y=-8.5,M.add(Z);const oe=new So(120,36,6514417,1973067);oe.position.y=-8.2,M.add(oe);const fe=new Mt(20,.8,4.5),X=new wt({color:1976635,roughness:.4,metalness:.3}),F=new He(fe,X);F.position.set(0,0,7.2),F.receiveShadow=!0,M.add(F);const ce=new Mt(20.1,.08,.15),A=new Zt({color:11032055}),U=new He(ce,A);U.position.set(0,.42,5),M.add(U);const Y=new Mt(20,.8,4.5),me=new wt({color:413243,roughness:.35,metalness:.4}),pe=new He(Y,me);pe.position.set(0,0,-8.2),pe.receiveShadow=!0,M.add(pe);const ge=new Mt(20.1,.08,.15),be=new Zt({color:1096065}),Ue=new He(ge,be);Ue.position.set(0,.42,-6),M.add(Ue),ke=new ri,ke.position.set(0,1.4,-8.2);const he=new wt({color:16436245,emissive:13273604,emissiveIntensity:.35,roughness:.15,metalness:.85}),le=new He(new ii(.7,.9,.35,16),he);le.position.y=-.55,ke.add(le);const Ee=new He(new ii(.2,.28,.5,16),he);Ee.position.y=-.15,ke.add(Ee);const se=new He(new ii(.75,.4,.9,16),he);se.position.y=.45,ke.add(se);const Pe=new Na(.35,.07,10,16,Math.PI),ze=new He(Pe,he);ze.position.set(-.7,.45,0),ze.rotation.z=Math.PI/2,ke.add(ze);const $e=new He(Pe,he);$e.position.set(.7,.45,0),$e.rotation.z=-Math.PI/2,ke.add($e),M.add(ke);const xt=new Mt(.3,.3,19.5),rn=new Zt({color:440020}),ft=new He(xt,rn);ft.position.set(-10.2,1.2,-.5),M.add(ft);const Qt=new Zt({color:15485081}),Ot=new He(xt,Qt);Ot.position.set(10.2,1.2,-.5),M.add(Ot),[-8.2,-4.6,0,5,7.2].forEach(St=>{const Et=new ii(.08,.08,2,8),Rt=new wt({color:6583435,metalness:.6}),jt=new He(Et,Rt);jt.position.set(-10.2,.4,St),M.add(jt);const sn=new He(Et,Rt);sn.position.set(10.2,.4,St),M.add(sn)}),Pn.forEach((St,Et)=>{const Rt=new Mt(4.2,.32,6),jt=c[Et]||"",sn=Lt(St.shape,St.label,St.hex,jt,!0),qt=new wt({color:St.color,roughness:.1,metalness:.2,transparent:!0,opacity:.82}),Kn=new Zt({map:sn,transparent:!0,opacity:.94}),$n=[qt,qt,Kn,qt,qt,qt],Nn=new He(Rt,$n);Nn.position.set(St.glassX,.05,0),Nn.castShadow=!0,Nn.receiveShadow=!0,M.add(Nn),Oe.push(Nn);const rr=new Mt(4.35,.12,6.15),sr=new wt({color:3359061,metalness:.8,roughness:.2}),ar=new He(rr,sr);ar.position.set(0,-.22,0),Nn.add(ar)}),Pn.forEach(St=>{const Et=new Mt(4.2,.25,2.8),Rt=new wt({color:St.color,roughness:.15,metalness:.2,transparent:!0,opacity:.65}),jt=new He(Et,Rt);jt.position.set(St.glassX,.02,-4.6),M.add(jt)})}else{const O=new Xn(120,120,16,16),Q=new wt({color:16724736,emissive:16720384,emissiveIntensity:.8,roughness:.3,metalness:.1});Je=new He(O,Q),Je.rotation.x=-Math.PI/2,Je.position.y=-4.5,M.add(Je);const Z=new Mt(3.6,.9,3.6),oe=new wt({color:1976635,roughness:.5,metalness:.4}),fe=new He(Z,oe);fe.position.set(0,.05,0),fe.receiveShadow=!0,M.add(fe);const X=document.createElement("canvas");X.width=256,X.height=256;const F=X.getContext("2d");F&&(F.fillStyle="#1e293b",F.fillRect(0,0,256,256),F.strokeStyle="#a855f7",F.lineWidth=10,F.strokeRect(15,15,226,226),F.font="bold 36px Arial, sans-serif",F.fillStyle="#ffffff",F.textAlign="center",F.fillText("SPAWN",128,120),F.font="bold 22px Arial, sans-serif",F.fillStyle="#c084fc",F.fillText("Lava Arena",128,165));const ce=new Wi(X);Se.push(ce);const A=new Zt({map:ce});fe.material=[oe,oe,A,oe,oe,oe],Pn.forEach((U,Y)=>{const me=new Mt(11,.8,11),pe=c[Y]||"",ge=Lt(U.shape,U.label,U.hex,pe,!1),be=new wt({color:U.color,roughness:.5,metalness:.2}),Ue=new Zt({map:ge}),he=[be,be,Ue,be,be,be],le=new He(me,he);le.position.set(U.x,0,U.z),le.castShadow=!0,le.receiveShadow=!0,M.add(le),Oe.push(le)})}const _t=new Map,N=(O,Q,Z)=>{const oe=new ri,fe=new wt({color:Z,roughness:.4}),X=new He(new Mt(1,1.2,.6),fe);X.position.y=1,X.castShadow=!0,oe.add(X);const F=new wt({color:16436245,roughness:.3}),ce=new He(new Mt(.7,.7,.7),F);ce.position.y=1.95,ce.castShadow=!0,oe.add(ce);const A=document.createElement("canvas");A.width=128,A.height=128;const U=A.getContext("2d");U&&(U.fillStyle="#facc15",U.fillRect(0,0,128,128),U.fillStyle="#1e1b4b",U.beginPath(),U.arc(40,50,8,0,Math.PI*2),U.arc(88,50,8,0,Math.PI*2),U.fill(),U.beginPath(),U.arc(64,75,20,0,Math.PI),U.lineWidth=5,U.stroke());const Y=new Wi(A);Se.push(Y);const me=new Zt({map:Y}),pe=new He(new Xn(.68,.68),me);pe.position.set(0,1.95,.355),oe.add(pe);const ge=new wt({color:16436245,roughness:.4}),be=new Mt(.38,1,.4),Ue=new He(be,ge);Ue.position.set(-.75,1,0),Ue.castShadow=!0,oe.add(Ue);const he=new He(be,ge);he.position.set(.75,1,0),he.castShadow=!0,oe.add(he);const le=new wt({color:1981066,roughness:.5}),Ee=new Mt(.42,1,.45),se=new He(Ee,le);se.position.set(-.25,.4,0),se.castShadow=!0,oe.add(se);const Pe=new He(Ee,le);Pe.position.set(.25,.4,0),Pe.castShadow=!0,oe.add(Pe);const ze=document.createElement("canvas");ze.width=384,ze.height=96;const $e=ze.getContext("2d");$e&&($e.fillStyle="rgba(15, 23, 42, 0.85)",$e.strokeStyle="rgba(255, 255, 255, 0.35)",$e.lineWidth=4,$e.beginPath(),$e.roundRect(8,8,368,80,24),$e.fill(),$e.stroke(),$e.font="bold 36px Arial, sans-serif",$e.fillStyle="#ffffff",$e.textAlign="center",$e.textBaseline="middle",$e.fillText(`${Q} ${O}`,192,48));const xt=new Wi(ze);Se.push(xt);const rn=new El({map:xt,depthTest:!1}),ft=new Jc(rn);return ft.position.set(0,2.8,0),ft.scale.set(2.8,.7,1),oe.add(ft),oe.userData={leftArm:Ue,rightArm:he,leftLeg:se,rightLeg:Pe,avatarEmoji:Q,nameText:O},oe};let bt=null;de&&(bt=N("RoboTarget","🤖",440020),M.add(bt));const at=O=>{const Q=O.key.toLowerCase();(Q==="w"||Q==="arrowup")&&(E.current.w=!0),(Q==="s"||Q==="arrowdown")&&(E.current.s=!0),(Q==="a"||Q==="arrowleft")&&(E.current.a=!0),(Q==="d"||Q==="arrowright")&&(E.current.d=!0),(Q===" "||Q==="spacebar")&&(E.current.space=!0,te())},lt=O=>{const Q=O.key.toLowerCase();(Q==="w"||Q==="arrowup")&&(E.current.w=!1),(Q==="s"||Q==="arrowdown")&&(E.current.s=!1),(Q==="a"||Q==="arrowleft")&&(E.current.a=!1),(Q==="d"||Q==="arrowright")&&(E.current.d=!1),(Q===" "||Q==="spacebar")&&(E.current.space=!1)};window.addEventListener("keydown",at),window.addEventListener("keyup",lt);let _e,dt=performance.now(),De=0,Fe=null;const b=O=>{_e=requestAnimationFrame(b);const Q=Math.min((O-dt)/1e3,.1);dt=O;const Z=O*.001;ke&&(ke.rotation.y+=.025),Je&&(Je.position.y=-4.5+Math.sin(Z*2.5)*.18);const oe=8.5*Q;let fe=!1,X=0,F=0;E.current.w&&(F-=oe,fe=!0),E.current.s&&(F+=oe,fe=!0),E.current.a&&(X-=oe,fe=!0),E.current.d&&(X+=oe,fe=!0),ee?(u.current.x=Math.max(-9.6,Math.min(9.6,u.current.x+X)),u.current.z=Math.max(-8.5,Math.min(8.5,u.current.z+F))):de?(u.current.x=Math.max(-11.2,Math.min(11.2,u.current.x+X)),u.current.z=Math.max(-11.2,Math.min(11.2,u.current.z+F))):(u.current.x=Math.max(-10.8,Math.min(10.8,u.current.x+X)),u.current.z=Math.max(-10.8,Math.min(10.8,u.current.z+F))),u.current.vy-=9.8*Q*.08,u.current.y+=u.current.vy,u.current.y<=.5&&(u.current.y=.5,u.current.vy=0,u.current.jumping=!1);const ce=u.current.x,A=u.current.z;let U=null;ee?A<=4.2&&A>=-3.5?ce<-4.8?U=0:ce<0?U=1:ce<4.8?U=2:U=3:U=null:de?ce<-4&&A<-4?U=0:ce>4&&A<-4?U=1:ce<-4&&A>4?U=2:ce>4&&A>4?U=3:U=null:ce<-1.8&&A<-1.8?U=0:ce>1.8&&A<-1.8?U=1:ce<-1.8&&A>1.8?U=2:ce>1.8&&A>1.8&&(U=3),U!==Fe&&(Fe=U,T(U),U!==null&&d&&y.current==="QUESTION"&&d(U));const Y=Date.now();Y-De>=50&&(fe||u.current.jumping)&&(De=Y,g&&g(u.current.x,u.current.z,u.current.jumping,U));let me=0,pe=0;if(de&&bt){me=Math.sin(Z*1.5)*3.5,pe=Math.cos(Z*1.5)*3.5,bt.position.set(me,.5,pe);const{leftArm:le,rightArm:Ee,leftLeg:se,rightLeg:Pe}=bt.userData,ze=Math.sin(Z*10)*.6;le.rotation.x=ze,Ee.rotation.x=-ze,se.rotation.x=-ze,Pe.rotation.x=ze}const ge=j.current,be=new Set,Ue=r||ge.length===0;if(Ue){const le="preview_host";if(be.add(le),!_t.has(le)){const xt=N(r?"Host 👑":"Pemain 🎮","🦊",9647082);_t.set(le,xt),M.add(xt)}const Ee=_t.get(le);Ee.position.set(u.current.x,u.current.y,u.current.z);const{leftArm:se,rightArm:Pe,leftLeg:ze,rightLeg:$e}=Ee.userData;if(fe){const xt=Math.sin(Z*14)*.7;se.rotation.x=xt,Pe.rotation.x=-xt,ze.rotation.x=-xt,$e.rotation.x=xt}else se.rotation.x=0,Pe.rotation.x=0,ze.rotation.x=0,$e.rotation.x=0}ge.forEach((le,Ee)=>{if(be.add(le.id),!_t.has(le.id)){const Et=Wo[Ee%Wo.length],Rt=N(le.name,le.avatar,Et);_t.set(le.id,Rt),M.add(Rt)}const se=_t.get(le.id),Pe=le.id===s;let ze=Pe?u.current.x:typeof le.x=="number"?le.x:0,$e=Pe?u.current.z:typeof le.z=="number"?le.z:ee?7.2:0,xt=Pe?u.current.y:le.jumping?1.1:.5;if(y.current==="REVIEW"){if(de)B.current&&le.id===B.current||le.exploded?(xt=Math.min(18,se.position.y+16*Q),se.rotation.x+=16*Q,se.rotation.y+=14*Q):(xt=.55+Math.abs(Math.sin(Z*10))*.75,se.rotation.x=0,se.rotation.y=0);else if(typeof H.current=="number"){const Et=H.current;(Pe?U:le.currentAnswer)===Et?xt=.55+Math.abs(Math.sin(Z*10))*.75:(xt=Math.max(ee?-8:-5,se.position.y-5.5*Q),se.rotation.x+=1.8*Q,se.rotation.z+=1.4*Q)}}else se.rotation.x=0,se.rotation.z=0;se.position.x+=(ze-se.position.x)*.25,se.position.z+=($e-se.position.z)*.25,se.position.y+=(xt-se.position.y)*.35;const{leftArm:rn,rightArm:ft,leftLeg:Qt,rightLeg:Ot}=se.userData;if(Math.hypot(ze-se.position.x,$e-se.position.z)>.05||Pe&&fe){const Et=Math.sin(Z*14)*.65;rn.rotation.x=Et,ft.rotation.x=-Et,Qt.rotation.x=-Et,Ot.rotation.x=Et}else rn.rotation.x=0,ft.rotation.x=0,Qt.rotation.x=0,Ot.rotation.x=0});for(const[le,Ee]of _t.entries())be.has(le)||(M.remove(Ee),_t.delete(le));if(de&&Ze&&Ke&&gt&&qe){const le=D.current;if(le&&y.current!=="LOBBY"){Ze.visible=!0,qe.visible=!0;let Ee=0,se=.5,Pe=0;if(le==="bot_target")Ee=me,Pe=pe;else if(le===s||Ue&&le.startsWith("p_"))Ee=u.current.x,se=u.current.y,Pe=u.current.z;else{const $e=_t.get(le);$e&&(Ee=$e.position.x,se=$e.position.y,Pe=$e.position.z)}const ze=1+Math.sin(Z*18)*.22;Ke.scale.set(ze,ze,ze),gt.intensity=2+Math.sin(Z*18)*1.5,Ze.position.set(Ee,se+2.7+Math.sin(Z*6)*.15,Pe),Ze.rotation.y+=.04,qe.position.set(Ee,.05,Pe),qe.rotation.z+=Q*2,ot&&(y.current==="REVIEW"?(ot.visible=!0,ot.position.set(Ee,1.6,Pe),ot.scale.x<3.2&&ot.scale.addScalar(Q*12)):(ot.visible=!1,ot.scale.set(.01,.01,.01)))}else Ze.visible=!1,qe.visible=!1,ot&&(ot.visible=!1)}if(!de&&y.current==="REVIEW"&&typeof H.current=="number"){const le=H.current;Oe.forEach((Ee,se)=>{if(se!==le){const Pe=ee?-14:-10,ze=ee?12:9;Ee.position.y=Math.max(Pe,Ee.position.y-ze*Q),Ee.rotation.x+=ee?.04:.02,Ee.rotation.z+=ee?.03:.02}else Ee.position.y=ee?.15:.25,Ee.rotation.x=0,Ee.rotation.z=0})}else de||Oe.forEach(le=>{le.position.y+=((ee?.05:0)-le.position.y)*.2,le.rotation.x+=(0-le.rotation.x)*.2,le.rotation.z+=(0-le.rotation.z)*.2});if(m.current)if(ee)ae.position.set(22,20,18),ae.lookAt(0,0,-3);else{const le=u.current.x*.15,Ee=u.current.z*.15;ae.position.set(20+le,20,20+Ee),ae.lookAt(le,0,Ee)}const he=m.current?ae:ue;ne.render(M,he)};_e=requestAnimationFrame(b);const _=()=>{if(!ie)return;const O=ie.clientWidth,Q=ie.clientHeight,Z=O/Q;ue.aspect=Z,ue.updateProjectionMatrix(),ae.left=-G*Z/2,ae.right=G*Z/2,ae.top=G/2,ae.bottom=-G/2,ae.updateProjectionMatrix(),ne.setSize(O,Q)};return window.addEventListener("resize",_),()=>{cancelAnimationFrame(_e),window.removeEventListener("keydown",at),window.removeEventListener("keyup",lt),window.removeEventListener("resize",_),ne.dispose(),Se.forEach(O=>O.dispose()),ie.contains(ne.domElement)&&ie.removeChild(ne.domElement)}},[e]);const J=h&&(t===s||r&&(!a.length||t==="preview_host")||!s&&t&&!a.find(ie=>ie.id===t));return Qe.jsxs("div",{className:"relative w-full rounded-2xl overflow-hidden border-2 border-black shadow-[6px_6px_0px_#000] bg-[#0b0f19] select-none",children:[Qe.jsx("div",{ref:x,className:"w-full h-[400px] sm:h-[480px] md:h-[540px] cursor-grab active:cursor-grabbing"}),Qe.jsxs("div",{className:"absolute top-3 left-3 flex items-center gap-2 z-20",children:[Qe.jsx("span",{className:"bg-[#0b0f19] border-2 border-black px-3 py-1 rounded-xl text-xs font-mono font-bold text-amber-400 shadow-[2px_2px_0px_#000] flex items-center gap-1.5 uppercase tracking-wider",children:e==="bomb_tag"?"💣 Estafet Bom 3D":e==="glass_bridge"?"🌉 Jembatan Kaca 3D":"🌋 Lantai Lava 3D"}),Qe.jsx("button",{type:"button",onClick:()=>w(ie=>!ie),className:"bg-[#0b0f19] hover:bg-slate-800 text-amber-400 border-2 border-black px-3 py-1 rounded-xl text-xs font-mono font-bold shadow-[2px_2px_0px_#000] flex items-center gap-1.5 cursor-pointer iso-btn active:translate-x-[1px] active:translate-y-[1px]",title:"Ganti Sudut Pandang Kamera (Isometrik / Perspektif)",children:Qe.jsx("span",{children:P?"📐 Isometrik":"🎥 Perspektif"})})]}),l&&Qe.jsxs("div",{className:"absolute top-3 left-3 right-3 sm:left-auto sm:right-3 flex items-center justify-end gap-2 pointer-events-none z-10",children:[Qe.jsx("div",{className:"bg-[#0b0f19] border-2 border-black px-3.5 py-1.5 rounded-xl shadow-[3px_3px_0px_#000] max-w-sm sm:max-w-md md:max-w-lg truncate hidden sm:block",children:Qe.jsx("span",{className:"text-xs sm:text-sm font-bold text-white truncate block font-['Space_Grotesk']",children:l})}),typeof f=="number"&&Qe.jsxs("div",{className:`px-3 py-1 rounded-xl font-mono font-black text-sm border-2 border-black shadow-[3px_3px_0px_#000] shrink-0 ${f<=5?"bg-red-600 text-white animate-pulse":"bg-amber-400 text-slate-950"}`,children:["⏱️ ",f,"s"]})]}),h&&i==="QUESTION"&&Qe.jsx("div",{className:"absolute top-14 left-3 right-3 flex justify-center pointer-events-none z-20",children:J?Qe.jsxs("div",{className:"bg-red-600 border-2 border-black text-white px-4 py-1.5 rounded-xl font-black text-xs sm:text-sm shadow-[4px_4px_0px_#000] animate-bounce flex items-center gap-2",children:[Qe.jsx("span",{className:"text-lg",children:"💣🔥"}),Qe.jsx("span",{children:"KAMU MEMEGANG BOM! Tabrak pemain lain atau jawab benar untuk mengoper!"})]}):Qe.jsxs("div",{className:"bg-[#151c2c] border-2 border-black text-emerald-400 px-4 py-1.5 rounded-xl font-bold text-xs sm:text-sm shadow-[3px_3px_0px_#000] flex items-center gap-2",children:[Qe.jsx("span",{className:"text-lg",children:"🛡️"}),Qe.jsx("span",{children:"STATUS: AMAN! Jaga jarak dari pemegang bom & pilih petak jawaban!"})]})}),Qe.jsx("div",{className:`absolute left-3 pointer-events-none z-10 ${h&&i==="QUESTION"?"top-24 sm:top-24":"top-14"}`,children:C!==null&&Pn[C]?Qe.jsxs("div",{className:"bg-[#151c2c] border-2 border-black px-3 py-1 rounded-xl text-xs font-bold text-white shadow-[2px_2px_0px_#000] flex items-center gap-1.5 animate-bounce-short",children:[Qe.jsx("span",{children:"📍 Petak Dipilih:"}),Qe.jsxs("span",{className:"text-amber-400 bg-[#0b0f19] border border-black px-2 py-0.5 rounded font-mono font-black",children:[Pn[C].shape," ",Pn[C].label]}),Qe.jsx("span",{className:"text-[11px] text-slate-300",children:"(Bisa pindah sebelum waktu habis)"})]}):Qe.jsx("div",{className:"bg-[#151c2c] border-2 border-black px-3 py-1 rounded-xl text-[11px] font-bold text-slate-400 shadow-[2px_2px_0px_#000]",children:e==="glass_bridge"?"📍 Tebing Awal (Zona Netral)":e==="bomb_tag"?"📍 Arena Tengah (Zona Estafet Bom)":"📍 Zona Netral (Tengah)"})}),Qe.jsxs("div",{className:`absolute right-3 hidden md:flex items-center gap-1 bg-[#0b0f19] px-2.5 py-1 rounded-xl text-[11px] text-slate-300 border-2 border-black shadow-[2px_2px_0px_#000] pointer-events-none z-10 ${h&&i==="QUESTION"?"top-24":"top-14"}`,children:[Qe.jsx("span",{children:"Gunakan"}),Qe.jsx("kbd",{className:"bg-[#1e293b] border border-black px-1.5 py-0.5 rounded font-mono font-bold text-amber-400 shadow-[1px_1px_0px_#000]",children:"W"}),Qe.jsx("kbd",{className:"bg-[#1e293b] border border-black px-1.5 py-0.5 rounded font-mono font-bold text-amber-400 shadow-[1px_1px_0px_#000]",children:"A"}),Qe.jsx("kbd",{className:"bg-[#1e293b] border border-black px-1.5 py-0.5 rounded font-mono font-bold text-amber-400 shadow-[1px_1px_0px_#000]",children:"S"}),Qe.jsx("kbd",{className:"bg-[#1e293b] border border-black px-1.5 py-0.5 rounded font-mono font-bold text-amber-400 shadow-[1px_1px_0px_#000]",children:"D"}),Qe.jsx("span",{children:"/ Panah & Spasi"})]}),Qe.jsxs("div",{className:"absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 z-10",children:[Qe.jsx("div",{className:"grid grid-cols-4 gap-1.5 sm:gap-2 flex-1 max-w-lg",children:Pn.map((ie,q)=>{const R=C===q;return Qe.jsxs("button",{type:"button",onClick:()=>$(q),className:`iso-tile py-2 px-1 sm:px-2.5 rounded-xl font-black text-xs sm:text-sm text-white border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-1 cursor-pointer ${q===0?"bg-red-600 hover:bg-red-500":q===1?"bg-blue-600 hover:bg-blue-500":q===2?"bg-amber-400 hover:bg-amber-300 text-slate-950 font-black":"bg-emerald-600 hover:bg-emerald-500"} ${R?"ring-2 ring-white scale-105 shadow-[4px_4px_0px_#000]":"opacity-90"}`,title:`Lari ke petak ${ie.label}`,children:[Qe.jsx("span",{children:ie.shape}),Qe.jsx("span",{className:"hidden sm:inline text-xs",children:ie.label})]},q)})}),Qe.jsxs("button",{type:"button",onClick:te,className:"iso-btn bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center gap-1.5 cursor-pointer transition-all shrink-0",children:[Qe.jsx("span",{children:"🦘"}),Qe.jsx("span",{children:"Lompat"})]})]})]})}/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pm=Xl("Radio",[["path",{d:"M4.9 19.1C1 15.2 1 8.8 4.9 4.9",key:"1vaf9d"}],["path",{d:"M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5",key:"u1ii0m"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5",key:"1j5fej"}],["path",{d:"M19.1 4.9C23 8.8 23 15.1 19.1 19",key:"10b0cb"}]]);export{pm as R,fm as a,dm as c,hm as s};
