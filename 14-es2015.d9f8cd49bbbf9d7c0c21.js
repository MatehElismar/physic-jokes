(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{Ov4f:function(i,t,o){"use strict";o.r(t),o.d(t,"TopicPageModule",(function(){return k}));var n=o("ofXK"),c=o("3Pt+"),e=o("TEn/"),s=o("tyNb"),a=o("QLpM"),r=o("e6jf"),b=o("fXoL"),l=o("OaWH"),p=o("//To"),u=o("mUVB"),h=o("I+er"),m=o("nJp7"),f=o("JjRq"),d=o("AGuC");function v(i,t){if(1&i&&(b.Mb(0,"ion-item-divider",7),b.ic(1),b.Lb()),2&i){const i=b.Wb().$implicit;b.xb(1),b.jc(i.topic)}}function L(i,t){if(1&i){const i=b.Nb();b.Mb(0,"ion-buttons",4),b.Mb(1,"ion-button",8),b.Ub("click",(function(t){b.ec(i);const o=b.Wb().$implicit;return o.showGlosario=!o.showGlosario,t.stopPropagation()})),b.Ib(2,"ion-icon",9),b.Lb(),b.Lb()}if(2&i){const i=b.Wb().$implicit;b.xb(2),b.bc("name",i.showGlosario?"information-circle-outline":"information-circle")}}function M(i,t){if(1&i&&(b.Mb(0,"div"),b.Mb(1,"h4"),b.ic(2),b.Lb(),b.Mb(3,"ion-note",4),b.ic(4),b.Lb(),b.Lb()),2&i){const i=t.$implicit;b.xb(2),b.jc(i.term),b.xb(2),b.jc(i.desc)}}function g(i,t){if(1&i&&(b.Mb(0,"ion-card",10),b.Mb(1,"ion-card-content"),b.hc(2,M,5,2,"div",1),b.Lb(),b.Lb()),2&i){const i=b.Wb().$implicit;b.xb(2),b.bc("ngForOf",i.glosario)}}function w(i,t){if(1&i){const i=b.Nb();b.Mb(0,"div"),b.hc(1,v,2,1,"ion-item-divider",2),b.Mb(2,"ion-item",3),b.Ub("click",(function(){b.ec(i);const o=t.$implicit;return b.Wb().selectFormula(o)})),b.Kb(3),b.Mb(4,"h4"),b.ic(5),b.Lb(),b.Mb(6,"ion-note",4),b.ic(7),b.Lb(),b.Jb(),b.hc(8,L,3,1,"ion-buttons",5),b.Lb(),b.hc(9,g,3,1,"ion-card",6),b.Lb()}if(2&i){const i=t.$implicit;b.xb(1),b.bc("ngIf",null!=i.topic),b.xb(4),b.jc(i.desc),b.xb(2),b.jc(i.note),b.xb(1),b.bc("ngIf",i.glosario),b.xb(1),b.bc("ngIf",i.showGlosario)}}const I=[{path:"",component:(()=>{class i{constructor(i,t,o,n,c,e,s,a,r){this.activatedRoute=i,this.router=t,this.app=o,this.cinematicaRotacional=n,this.velTrans=c,this.speed=e,this.interest=s,this.conversiones=a,this.breakeven=r}ngOnInit(){this.topicID=this.activatedRoute.snapshot.paramMap.get("topic"),this.topicID==a.a.cinematica_rotacional?this.topic=new r.a(this.cinematicaRotacional.name,this.cinematicaRotacional.formulas):this.topicID==a.a.conversiones?this.topic=new r.a(this.conversiones.name,this.conversiones.formulas):this.topicID==a.a.vel_trans?this.topic=new r.a(this.velTrans.name,this.velTrans.formulas):this.topicID==a.a.speed?this.topic=new r.a(this.speed.name,this.speed.formulas):this.topicID==a.a.interest?this.topic=new r.a(this.interest.name,this.interest.formulas):this.topicID==a.a.breakeven&&(this.topic=new r.a(this.breakeven.name,this.breakeven.formulas))}selectFormula(i){this.app.selectedFormula.next(i),this.router.navigate(["/calculator"],{queryParams:{topic:this.topicID,formula:i.desc}})}}return i.\u0275fac=function(t){return new(t||i)(b.Hb(s.a),b.Hb(s.g),b.Hb(l.a),b.Hb(p.a),b.Hb(u.a),b.Hb(h.a),b.Hb(m.a),b.Hb(f.a),b.Hb(d.a))},i.\u0275cmp=b.Bb({type:i,selectors:[["app-topic"]],decls:11,vars:2,consts:[["size-md","6","offset-md","3"],[4,"ngFor","ngForOf"],["color","light",4,"ngIf"],["button","",1,"formula","text-center",3,"click"],["slot","end"],["slot","end",4,"ngIf"],["color","dark","button","","class","formula text-center",4,"ngIf"],["color","light"],["size","small",3,"click"],["slot","icon-only",3,"name"],["color","dark","button","",1,"formula","text-center"]],template:function(i,t){1&i&&(b.Mb(0,"ion-header"),b.Mb(1,"ion-toolbar"),b.Mb(2,"ion-title"),b.ic(3),b.Lb(),b.Lb(),b.Lb(),b.Mb(4,"ion-content"),b.Mb(5,"ion-grid"),b.Mb(6,"ion-row"),b.Mb(7,"ion-col",0),b.Mb(8,"ion-list"),b.Mb(9,"ion-item-group"),b.hc(10,w,10,5,"div",1),b.Lb(),b.Lb(),b.Lb(),b.Lb(),b.Lb(),b.Lb()),2&i&&(b.xb(3),b.jc(null==t.topic?null:t.topic.name),b.xb(7),b.bc("ngForOf",null==t.topic?null:t.topic.formulas))},directives:[e.r,e.K,e.J,e.n,e.q,e.E,e.m,e.y,e.w,n.i,n.j,e.u,e.C,e.v,e.g,e.f,e.s,e.h,e.i],styles:[""]}),i})()}];let x=(()=>{class i{}return i.\u0275mod=b.Fb({type:i}),i.\u0275inj=b.Eb({factory:function(t){return new(t||i)},imports:[[s.i.forChild(I)],s.i]}),i})(),k=(()=>{class i{}return i.\u0275mod=b.Fb({type:i}),i.\u0275inj=b.Eb({factory:function(t){return new(t||i)},imports:[[n.b,c.a,e.L,x]]}),i})()}}]);