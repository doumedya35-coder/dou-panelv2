import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera, Users, Lock, Unlock, Bell, BarChart3, ChevronRight, Eye, Power,
  Building2, Settings, Home, Fingerprint, Wifi, Search, CalendarDays,
  PlayCircle, TrendingUp, Zap, DoorOpen, CreditCard, AlertTriangle,
  ShieldCheck, Activity, Router, Cpu, WalletCards, ScanFace, Download,
  MoreHorizontal, Clock3
} from "lucide-react";

const branches = ["Merkez Şube", "Kordon Cafe", "Turgutlu Depo"];

const cameraFeeds = [
  { name: "Ana Salon", code: "CAM-01", quality: "1080p", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80" },
  { name: "Kasa Alanı", code: "CAM-02", quality: "4K", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80" },
  { name: "Giriş Kapısı", code: "CAM-03", quality: "1080p", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80" },
];

const staff = [
  { name: "Zeynep Kaya", role: "Müdür", time: "08:36", place: "Ana Giriş", status: "İçeride" },
  { name: "Mehmet Demir", role: "Personel", time: "08:28", place: "Depo", status: "İçeride" },
  { name: "Ayşe Yılmaz", role: "Kasa", time: "08:14", place: "Ana Giriş", status: "İçeride" },
];

const notifications = [
  { icon: Camera, title: "Kamera Uyarısı", text: "Ön kapıda hareket algılandı.", time: "Şimdi" },
  { icon: Users, title: "Personel Girişi", text: "Mehmet Demir 08:28’de giriş yaptı.", time: "2 dk" },
  { icon: BarChart3, title: "Satış Raporu", text: "Ciro hedefin %12 üstünde ilerliyor.", time: "8 dk" },
  { icon: Lock, title: "Kapı Durumu", text: "Depo kapısı kilitli durumda.", time: "12 dk" },
];

function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function Pill({ children, tone = "blue" }) {
  return <span className={`pill ${tone}`}>{children}</span>;
}

function MiniMetric({ icon: Icon, title, value, sub }) {
  return (
    <Card className="metric">
      <div className="metricTop"><span>{title}</span><Icon size={20} /></div>
      <strong>{value}</strong>
      <small>{sub}</small>
    </Card>
  );
}

function ModuleCard({ icon: Icon, title, count }) {
  return (
    <Card className="moduleCard">
      <Icon size={20} />
      <b>{count}</b>
      <small>{title}</small>
    </Card>
  );
}

function Progress({ label, value }) {
  return (
    <div className="progress">
      <div><span>{label}</span><b>%{value}</b></div>
      <i><em style={{ width: `${value}%` }} /></i>
    </div>
  );
}

function LineChartFake() {
  return (
    <svg viewBox="0 0 320 110" className="chart">
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0067ff" stopOpacity=".35"/><stop offset="100%" stopColor="#0067ff" stopOpacity="0"/></linearGradient></defs>
      <path d="M10 90 L45 76 L72 82 L105 55 L132 64 L160 39 L190 47 L215 24 L242 45 L276 29 L310 14" fill="none" stroke="#0067ff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 90 L45 76 L72 82 L105 55 L132 64 L160 39 L190 47 L215 24 L242 45 L276 29 L310 14 L310 110 L10 110 Z" fill="url(#g)"/>
    </svg>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("panel");
  const [branch, setBranch] = useState(branches[0]);
  const [doorLocked, setDoorLocked] = useState(true);
  const [logged, setLogged] = useState(false);
  const [boot, setBoot] = useState(true);
  const today = useMemo(() => new Date().toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long" }), []);

  const TabButton = ({ id, icon: Icon, label }) => (
    <button onClick={() => setActiveTab(id)} className={activeTab === id ? "active" : ""}><Icon size={20}/>{label}</button>
  );

  if (boot) return (
    <div className="screen center">
      <div className="glow"></div>
      <motion.div initial={{scale:.92, opacity:0}} animate={{scale:1, opacity:1}} className="splash">
        <div className="logoMark">D</div>
        <h1>douyazılım</h1>
        <p>Mobil Yönetim Sistemi</p>
        <Card className="splashGrid">
          <Pill tone="green">● Online</Pill>
          <Pill>4 Modül</Pill>
          <Pill>256-bit</Pill>
          <Pill tone="green">PWA</Pill>
        </Card>
        <button className="primary" onClick={() => setBoot(false)}>Demo Başlat</button>
      </motion.div>
    </div>
  );

  if (!logged) return (
    <div className="screen login">
      <div className="brand"><div className="smallLogo">D</div>douyazılım</div>
      <h1>İşletmeniz <span>Cebinizde.</span></h1>
      <p className="lead">Kamera, personel, satış, POS ve geçiş kontrollerini tek panelden yönetin.</p>
      <div className="loginFeatures">
        <Card><Camera/><b>Kamera</b><small>Canlı izleme</small></Card>
        <Card><WalletCards/><b>Ciro</b><small>Anlık rapor</small></Card>
      </div>
      <Card className="loginCard">
        <div className="input"><ScanFace size={18}/>erdoğan@douyazilim.com</div>
        <div className="input">••••••••••</div>
        <button className="primary full" onClick={() => setLogged(true)}><Fingerprint size={20}/>Face ID ile Giriş Yap</button>
      </Card>
    </div>
  );

  const renderPanel = () => (
    <>
      <section className="hero"><p>Merhaba, Erdoğan Girgin</p><h1>İşletmeniz <span>Cebinizde.</span></h1></section>

      <Card className="branch">
        <div><Building2 size={21}/></div>
        <section><small>Aktif İşletme</small><select value={branch} onChange={(e)=>setBranch(e.target.value)}>{branches.map(b=><option key={b}>{b}</option>)}</select></section>
        <Pill tone="green">Online</Pill>
      </Card>

      <div className="moduleGrid">
        <ModuleCard icon={Camera} title="Kamera" count="12"/>
        <ModuleCard icon={DoorOpen} title="Kapı" count="4"/>
        <ModuleCard icon={CreditCard} title="POS" count="3"/>
        <ModuleCard icon={AlertTriangle} title="Alarm" count="1"/>
      </div>

      <div className="grid2"><MiniMetric icon={BarChart3} title="Günlük Ciro" value="₺245.430" sub="+%12.5 artış"/><MiniMetric icon={Users} title="Personel" value="18/22" sub="Bugün giriş yaptı"/></div>

      <Card className="cameraCard">
        <header><div><b>Canlı Kamera</b><p>Kritik alanlar tek ekranda.</p></div><button onClick={()=>setActiveTab("kamera")}>Tümünü Gör <ChevronRight size={15}/></button></header>
        <div className="cameraImage"><img src={cameraFeeds[0].img}/><div className="badges"><Pill tone="green">● CANLI</Pill><Pill>1080p</Pill></div><strong><Eye size={16}/> Ana Salon</strong><em>CAM-01</em></div>
      </Card>

      <div className="grid2">
        <Card className="health"><h3><Activity size={18}/>Sistem Sağlığı</h3><Progress label="Kamera" value={96}/><Progress label="POS" value={88}/><Progress label="Ağ" value={92}/></Card>
        <Card className="risk"><h3><ShieldCheck size={18}/>Risk</h3><strong>Düşük</strong><p>Kritik alarm yok.</p></Card>
      </div>

      <Card className="staffCard">
        <header><div><b>Personel Akışı</b><p>Son giriş hareketleri</p></div><Users size={20}/></header>
        {staff.slice(0,3).map(s=><div className="staffRow" key={s.name}><div><b>{s.name}</b><small>{s.role} • {s.place}</small></div><span>{s.time}</span></div>)}
      </Card>

      <Card className="door">
        <header><div><b>Geçiş Kontrol</b><p>Kapı ve kilitleri uzaktan yönetin.</p></div>{doorLocked ? <Lock/> : <Unlock/>}</header>
        <button onClick={()=>setDoorLocked(!doorLocked)}><section><b>Depo Kapısı</b><small>{doorLocked ? "Kilitli" : "Kilit Açık"}</small></section><Power/></button>
      </Card>
    </>
  );

  const renderCamera = () => <><div className="pageHead"><h2>Canlı Kamera</h2><Pill tone="green">12/12 aktif</Pill></div><Card className="search"><Search size={18}/>Kamera veya şube ara</Card><div className="stack">{cameraFeeds.map(c=><Card className="camList" key={c.name}><img src={c.img}/><div className="badges"><Pill tone="green">● CANLI</Pill><Pill>{c.code}</Pill></div><button><PlayCircle size={24}/></button><strong>{c.name}<small>{c.quality} • Gece görüş aktif</small></strong><MoreHorizontal className="more"/></Card>)}</div></>;

  const renderReport = () => <><div className="pageHead"><h2>Satış Raporu</h2><button className="iconBtn"><Download size={18}/></button></div><Card className="report"><header><section><small>Bugünkü Ciro</small><h3>₺245.430</h3><p>+%12.5 hedef üstü</p></section><TrendingUp size={36}/></header><LineChartFake/></Card><div className="grid2"><MiniMetric icon={CalendarDays} title="Aylık" value="₺2.18M" sub="+%8.4"/><MiniMetric icon={Zap} title="Sipariş" value="1.248" sub="+%5.1"/></div><Card className="health wide"><h3>Kategori Performansı</h3><Progress label="Yiyecek" value={76}/><Progress label="İçecek" value={63}/><Progress label="Paket Servis" value={41}/></Card></>;

  const renderNotify = () => <><div className="pageHead"><h2>Bildirimler</h2><Pill>Bugün 18</Pill></div><div className="stack">{notifications.map((n,i)=>{const Icon=n.icon;return <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:i*.05}} key={n.title}><Card className="notify"><div><Icon size={20}/></div><section><b>{n.title}</b><p>{n.text}</p></section><small>{n.time}</small></Card></motion.div>})}</div></>;

  const renderSettings = () => <><h2>Ayarlar</h2><Card className="profile"><div>D</div><section><b>Erdoğan Girgin</b><p>Yönetici Hesabı</p></section></Card><div className="grid2"><MiniMetric icon={Router} title="Bağlantı" value="Aktif" sub="Fiber ağ"/><MiniMetric icon={Cpu} title="Cihaz" value="31" sub="Online"/></div><Card className="row"><span>Yetki Seviyesi</span><b>Tam Yetki</b></Card><Card className="row"><span>Veri Güvenliği</span><b>256-bit</b></Card></>;

  return (
    <div className="app">
      <main>
        <header className="top"><div className="brand"><div className="smallLogo">D</div>douyazılım</div><button onClick={()=>setActiveTab("bildirim")}><Bell size={20}/><i/></button></header>
        <AnimatePresence mode="wait"><motion.div key={activeTab} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.22}}>
          {activeTab==="panel"&&renderPanel()}{activeTab==="kamera"&&renderCamera()}{activeTab==="rapor"&&renderReport()}{activeTab==="bildirim"&&renderNotify()}{activeTab==="ayar"&&renderSettings()}
        </motion.div></AnimatePresence>
      </main>
      <nav><TabButton id="panel" icon={Home} label="Panel"/><TabButton id="kamera" icon={Camera} label="Kamera"/><TabButton id="rapor" icon={BarChart3} label="Rapor"/><TabButton id="bildirim" icon={Bell} label="Bildirim"/><TabButton id="ayar" icon={Settings} label="Ayar"/></nav>
    </div>
  );
}
