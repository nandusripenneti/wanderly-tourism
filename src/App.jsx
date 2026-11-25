import React, { useState } from "react";
import "./app.css";

const img = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

const places = [
  ["Araku Valley","Andhra Pradesh",1800,"photo-1500534623283-312aade485b7","Coffee plantations, misty hills and scenic valleys.",["Chaparai Waterfalls","Coffee Museum","Galikonda Viewpoint","Padmapuram Gardens","Borra Caves"]],
  ["Visakhapatnam","Andhra Pradesh",2200,"photo-1507525428034-b723cf961d3e","Beautiful beaches, hills and coastal attractions.",["Yarada Beach","Dolphin's Nose","Kailasagiri","Thotlakonda","Bheemili Beach"]],
  ["Tirupati","Andhra Pradesh",1600,"photo-1519681393784-d120267933ba","Spiritual destinations and green hill surroundings.",["Talakona Waterfalls","Chandragiri Fort","Kapila Theertham","Silathoranam"]],
  ["Vijayawada","Andhra Pradesh",1400,"photo-1519608487953-e999c86e7455","Riverfront views, temples and historic landmarks.",["Bhavani Island","Undavalli Caves","Kondapalli Fort","Prakasam Barrage"]],
  ["Gandikota","Andhra Pradesh",2000,"photo-1470770841072-f978cf4d019e","Grand canyon landscapes and riverside adventure.",["Gandikota Fort","Pennar Gorge","Madhavaraya Temple","Belum Caves"]],
  ["Lambasingi","Andhra Pradesh",1900,"photo-1472396961693-142e6e269027","Cool climate, misty mornings and forest scenery.",["Thajangi Reservoir","Susan Garden","Kothapalli Waterfalls","Sunrise Point"]],
  ["Amaravati","Andhra Pradesh",1300,"photo-1518998053901-5348d3961a04","Ancient Buddhist heritage and riverside experiences.",["Amaravati Stupa","Dhyana Buddha","Kondaveedu Fort","Krishna River View"]],
  ["Rajahmundry","Andhra Pradesh",1500,"photo-1501785888041-af3ef285b470","Godavari river views and green countryside.",["Godavari Bridge","Papi Hills","Dowleswaram Barrage","Kadiyapulanka Gardens"]],
  ["Hyderabad","Telangana",2400,"photo-1565560228182-7b7b8e7c4f7e","Historic architecture, food streets and city life.",["Charminar","Golconda Fort","Qutub Shahi Tombs","Durgam Cheruvu","Shilparamam"]],
  ["Warangal","Telangana",1700,"photo-1464822759023-fed622ff2c3b","Kakatiya heritage, lakes and ancient architecture.",["Thousand Pillar Temple","Ramappa Temple","Warangal Fort","Laknavaram Lake"]],
  ["Nagarjuna Sagar","Telangana",1900,"photo-1500534314209-a25ddb2bd429","Dam views, island history and nature escapes.",["Nagarjuna Konda","Ethipothala Falls","Buddhavanam","Boating Point"]],
  ["Ananthagiri Hills","Telangana",1800,"photo-1441974231531-c6227db76b6e","Forest trails, viewpoints and peaceful nature.",["Ananthagiri Forest","Kotepally Reservoir","Trekking Trail","Sunrise Viewpoint"]],
  ["Bengaluru","Karnataka",2500,"photo-1500530855697-b586d89ba3ee","Garden city attractions, cafes and culture.",["Lalbagh","Cubbon Park","Bangalore Palace","Nandi Hills"]],
  ["Mysuru","Karnataka",2200,"photo-1518998053901-5348d3961a04","Royal palaces, markets and cultural experiences.",["Mysore Palace","Chamundi Hills","Brindavan Gardens","Karanji Lake"]],
  ["Coorg","Karnataka",2800,"photo-1448375240586-882707db888b","Coffee estates, waterfalls and misty landscapes.",["Abbey Falls","Raja's Seat","Dubare Elephant Camp","Mandalpatti"]],
  ["Hampi","Karnataka",2300,"photo-1470770841072-f978cf4d019e","Heritage ruins and dramatic boulder landscapes.",["Virupaksha Temple","Vijaya Vittala Temple","Matanga Hill","Sanapur Lake"]],
  ["Gokarna","Karnataka",2600,"photo-1500375592092-40eb2168fd21","Quiet beaches, coastal trails and laid-back cafes.",["Om Beach","Kudle Beach","Half Moon Beach","Mirjan Fort"]],
  ["Chikmagalur","Karnataka",2700,"photo-1464822759023-fed622ff2c3b","Coffee hills, trekking routes and waterfalls.",["Mullayanagiri","Baba Budangiri","Hebbe Falls","Jhari Falls"]],
  ["Mangaluru","Karnataka",2200,"photo-1518837695005-2083093ee35b","Coastal culture, temples and beaches.",["Panambur Beach","Tannirbhavi Beach","Sultan Battery","Pilikula"]],
  ["Udupi","Karnataka",2100,"photo-1507525428034-b723cf961d3e","Temple town, beaches and local cuisine.",["Malpe Beach","St Mary's Island","Kapu Lighthouse","Delta Beach"]],
  ["Munnar","Kerala",3000,"photo-1472396961693-142e6e269027","Tea gardens, cool weather and mountain viewpoints.",["Echo Point","Top Station","Mattupetty Dam","Tea Museum"]],
  ["Alleppey","Kerala",2800,"photo-1500375592092-40eb2168fd21","Backwaters, houseboats and peaceful village life.",["Alleppey Backwaters","Marari Beach","Pathiramanal Island","Kuttanad"]],
  ["Wayanad","Kerala",2900,"photo-1441974231531-c6227db76b6e","Forests, caves, waterfalls and mountain trails.",["Edakkal Caves","Soochipara Falls","Banasura Sagar Dam","Pookode Lake"]],
  ["Kochi","Kerala",2600,"photo-1519608487953-e999c86e7455","Heritage streets, art cafes and coastal charm.",["Fort Kochi","Chinese Fishing Nets","Mattancherry Palace","Jew Town"]],
  ["Kovalam","Kerala",2700,"photo-1507525428034-b723cf961d3e","Lighthouse beaches and coastal sunsets.",["Lighthouse Beach","Hawa Beach","Samudra Beach","Vellayani Lake"]],
  ["Thekkady","Kerala",2900,"photo-1472396961693-142e6e269027","Wildlife, spice gardens and forest experiences.",["Periyar Lake","Spice Plantation","Gavi Forest","Nature Walk"]],
  ["Ooty","Tamil Nadu",2800,"photo-1464822759023-fed622ff2c3b","Tea gardens, toy train and cool mountain air.",["Doddabetta Peak","Ooty Lake","Botanical Garden","Pykara Falls"]],
  ["Kodaikanal","Tamil Nadu",2700,"photo-1500534314209-a25ddb2bd429","Lakes, pine forests and misty viewpoints.",["Coaker's Walk","Pillar Rocks","Bryant Park","Pine Forest"]],
  ["Chennai","Tamil Nadu",2300,"photo-1507525428034-b723cf961d3e","Beaches, heritage, food and city experiences.",["Marina Beach","Mahabalipuram","Kapaleeshwarar Temple","DakshinaChitra"]],
  ["Rameswaram","Tamil Nadu",2500,"photo-1518837695005-2083093ee35b","Sacred coastline, historic sites and island views.",["Pamban Bridge","Dhanushkodi","Ramanathaswamy Temple","Ariyaman Beach"]],
  ["Madurai","Tamil Nadu",2000,"photo-1518998053901-5348d3961a04","Temple architecture, markets and traditional food.",["Meenakshi Temple","Thirumalai Nayakkar Palace","Vandiyur Teppakulam","Gandhi Museum"]]
].map(([name,state,price,image,desc,gems]) => ({
  name,state,price,image,desc,
  gems: gems.map((gem,i) => ({
    name:gem,
    image:[
      "photo-1433086966358-54859d0ed716",
      "photo-1518998053901-5348d3961a04",
      "photo-1464822759023-fed622ff2c3b",
      "photo-1441974231531-c6227db76b6e",
      "photo-1500375592092-40eb2168fd21"
    ][i % 5]
  }))
}));

const transport = [
  ["Government Bus",250,"photo-1544620347-c4fd4a3d5957"],
  ["Private Sleeper Bus",650,"photo-1570125909232-eb263c188f7e"],
  ["Train Sleeper",350,"photo-1474487548417-781cb71495f3"],
  ["Train AC",850,"photo-1519682337058-a94d519337bc"],
  ["Flight",3500,"photo-1436491865332-7a61a109cc05"],
  ["Private Cab",1800,"photo-1549317661-bd32c8ce0db2"],
  ["Self Drive Car",2000,"photo-1492144534655-ae79c964c9d7"],
  ["Rental Bike",500,"photo-1558981806-ec527fa84c39"],
  ["Rental Scooter",400,"photo-1558981403-c5f9899a28bc"]
].map(([name,price,image])=>({name,price,image}));

const stays = [
  ["Budget Hostel",500,"photo-1555854877-bab0e564b8d5"],
  ["Premium Hostel",900,"photo-1566073771259-6a8506099945"],
  ["Budget Hotel",1000,"photo-1564013799919-ab600027ffc6"],
  ["Comfort Hotel",1800,"photo-1611892440504-42a792e24d32"],
  ["Luxury Hotel",3500,"photo-1542314831-068cd1dbfeeb"],
  ["Homestay",1200,"photo-1445019980597-93fa8acb246c"],
  ["Hill View Cottage",2200,"photo-1520250497591-112f2f40a3f4"],
  ["Beach Resort",3000,"photo-1571896349842-33c89424de2d"],
  ["Private Villa",4500,"photo-1613490493576-7fde63acd811"],
  ["Farm Stay",1700,"photo-1470770841072-f978cf4d019e"],
  ["Tree House",2500,"photo-1510798831971-661eb04b3739"],
  ["Camping Tent",800,"photo-1504851149312-7a075b496cc7"],
  ["Houseboat",5000,"photo-1500375592092-40eb2168fd21"]
].map(([name,price,image])=>({name,price,image}));

const experiences = [
  "Local food tour","Street food walk","Cafe hopping",
  "Traditional food experience","Photography walk","Local shopping",
  "Adventure activity","Boating","Wildlife experience",
  "Sunset watching","Cultural show","Tea / coffee tasting"
];

const readData = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

const money = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

const blankDraft = () => ({
  destination:null, transport:null, stay:null, gems:[],
  experiences:[], days:2, people:1, payment:"UPI", date:""
});

export default function App() {
  const [users,setUsers] = useState(()=>readData("tv_users",[]));
  const [trips,setTrips] = useState(()=>readData("tv_trips",[]));
  const [current,setCurrent] = useState(()=>readData("tv_current",null));
  const [admin,setAdmin] = useState(()=>sessionStorage.getItem("tv_admin")==="yes");
  const [page,setPage] = useState("home");
  const [draft,setDraft] = useState(blankDraft());
  const [filter,setFilter] = useState("All");
  const [search,setSearch] = useState("");
  const [message,setMessage] = useState("");

  const go = (next) => {
    if(next==="profile" && !current) next="login";
    setPage(next);
    setMessage("");
    window.scrollTo({top:0,behavior:"smooth"});
  };

  const updateDraft = (key,value) =>
    setDraft(old=>({...old,[key]:value}));

  const saveUsers = (value) => {
    setUsers(value);
    localStorage.setItem("tv_users",JSON.stringify(value));
  };

  const saveTrips = (value) => {
    setTrips(value);
    localStorage.setItem("tv_trips",JSON.stringify(value));
  };

  const choosePlace = (place) => {
    setDraft({...blankDraft(),destination:place});
    go("planner");
  };

  const estimate = () => {
    if(!draft.destination) return 0;
    let total = draft.destination.price * draft.people * draft.days;
    if(draft.transport !== null)
      total += transport[draft.transport].price * draft.people;
    if(draft.stay !== null)
      total += stays[draft.stay].price * Math.max(1,draft.days-1);
    return total;
  };

  const signup = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name").trim();
    const email = form.get("email").trim().toLowerCase();
    const password = form.get("password");

    if(users.some(u=>u.email===email)){
      setMessage("This email is already registered.");
      return;
    }

    const updated = [...users,{name,email,password}];
    saveUsers(updated);
    const user = {name,email};
    setCurrent(user);
    localStorage.setItem("tv_current",JSON.stringify(user));
    go("home");
  };

  const login = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email").trim().toLowerCase();
    const password = form.get("password");
    const user = users.find(u=>u.email===email && u.password===password);

    if(!user){
      setMessage("Invalid email or password.");
      return;
    }

    const loggedIn = {name:user.name,email:user.email};
    setCurrent(loggedIn);
    localStorage.setItem("tv_current",JSON.stringify(loggedIn));
    go("home");
  };

  const logout = () => {
    setCurrent(null);
    localStorage.removeItem("tv_current");
    go("home");
  };

  const adminLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if(form.get("email")==="admin@travelverse.com" &&
       form.get("password")==="admin123"){
      setAdmin(true);
      sessionStorage.setItem("tv_admin","yes");
      go("admin");
    } else {
      setMessage("Invalid admin credentials.");
    }
  };

  const finishBooking = () => {
    if(!current){go("login");return;}
    if(!draft.destination){go("destinations");return;}

    const booking = {
      id:"TV"+Date.now(),
      user:current.email,
      name:current.name,
      destination:draft.destination.name,
      state:draft.destination.state,
      date:draft.date,
      days:draft.days,
      people:draft.people,
      transport:draft.transport===null?"Skipped":transport[draft.transport].name,
      stay:draft.stay===null?"Skipped":stays[draft.stay].name,
      gems:draft.gems,
      experiences:draft.experiences,
      total:estimate(),
      payment:draft.payment,
      paymentStatus:draft.payment==="Pay at destination"
        ?"Pay later":"Demo payment recorded (not real)",
      status:"Pending Admin Approval",
      created:new Date().toLocaleString()
    };

    saveTrips([...trips,booking]);
    setDraft(blankDraft());
    setMessage("Your booking request has been submitted! Reference: "+booking.id);
    setPage("profile");
  };

  const cancelBooking = (id) => {
    if(!window.confirm("Are you sure you want to cancel this booking?")) return;
    saveTrips(trips.map(t=>t.id===id?{...t,status:"Cancelled"}:t));
  };

  const updateBooking = (id,status) => {
    saveTrips(trips.map(t=>t.id===id?{...t,status}:t));
  };

  const steps = (active) => (
    <div className="stepbar">
      {["Destination","Transport","Stay","Explore","Review","Payment"].map((s,i)=>
        <span key={s} className={`step ${i+1===active?"active":""}`}>
          {i+1}. {s}
        </span>
      )}
    </div>
  );

  const button = (text,onClick,style="primary") => (
    <button className={`btn ${style}`} onClick={onClick}>{text}</button>
  );

  const placeCard = (p) => (
    <article className="card" key={p.name}>
      <img src={img(p.image)} alt={p.name}/>
      <div className="card-body">
        <span className="tag">{p.state}</span>
        <h3>{p.name}</h3>
        <p>{p.desc}</p>
        <div className="card-foot">
          <span className="price">From {money(p.price)}</span>
          {button("Explore",()=>choosePlace(p),"small")}
        </div>
      </div>
    </article>
  );

  const optionCard = (item,selected,onClick,unit) => (
    <button key={item.name} className={`option-card ${selected?"selected":""}`} onClick={onClick}>
      <img src={img(item.image)} alt={item.name}/>
      <div className="option-info">
        <h3>{item.name}</h3>
        <p>{money(item.price)} / {unit}</p>
        <small>{selected?"✓ Selected":"Select this option"}</small>
      </div>
    </button>
  );

  const home = () => (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="eyebrow">Explore South India</div>
          <h1>Your journey.<br/>Your story.</h1>
          <p>Discover beautiful destinations, hidden gems and unforgettable experiences with TRAVELVERSE.</p>
          <div className="searchbar">
            <select id="homePlace" defaultValue="">
              <option value="">Choose destination</option>
              {places.map(p=><option key={p.name} value={p.name}>{p.name}</option>)}
            </select>
            {button("Plan My Trip",()=>{
              const name=document.getElementById("homePlace").value;
              if(name) choosePlace(places.find(p=>p.name===name));
              else go("destinations");
            })}
          </div>
        </div>
      </section>
      <div className="container">
        <SectionHead eyebrow="Start exploring" title="Popular Destinations" subtitle="Discover amazing places across South India."/>
        <div className="grid">{places.slice(0,8).map(placeCard)}</div>
        <div className="actions">{button("Explore all destinations →",()=>go("destinations"))}</div>
      </div>
    </>
  );

  const destinationPage = () => {
    const visible=places.filter(p=>
      (filter==="All"||p.state===filter) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
      <div className="container">
        <SectionHead eyebrow="Find your next escape" title="Explore South India" subtitle="Choose your destination to start planning."/>
        <div className="filters">
          <input placeholder="Search destinations..." value={search} onChange={e=>setSearch(e.target.value)}/>
          <select value={filter} onChange={e=>setFilter(e.target.value)}>
            {["All","Andhra Pradesh","Telangana","Karnataka","Kerala","Tamil Nadu"].map(s=><option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="grid">{visible.map(placeCard)}</div>
        {visible.length===0&&<div className="panel empty">No destinations found.</div>}
      </div>
    );
  };

  const plannerPage = () => !draft.destination ? destinationPage() : (
    <div className="container">
      {steps(1)}
      <div className="panel">
        <div className="eyebrow">Your travel plan</div>
        <h2>{draft.destination.name}</h2>
        <p>{draft.destination.desc}</p>
        <div className="form-grid top-gap">
          <Field label="Travel start date">
            <input type="date" min={new Date().toISOString().slice(0,10)} value={draft.date} onChange={e=>updateDraft("date",e.target.value)}/>
          </Field>
          <Field label="Number of days">
            <input type="number" min="1" max="30" value={draft.days} onChange={e=>updateDraft("days",Math.max(1,Number(e.target.value)))}/>
          </Field>
          <Field label="Number of travellers">
            <input type="number" min="1" max="20" value={draft.people} onChange={e=>updateDraft("people",Math.max(1,Number(e.target.value)))}/>
          </Field>
        </div>
        <div className="actions">
          {button("Continue to transport →",()=>go("transport"))}
          {button("Change destination",()=>go("destinations"),"outline")}
        </div>
      </div>
    </div>
  );

  const transportPage = () => (
    <div className="container">
      {steps(2)}
      <div className="panel">
        <h2>Choose Transport</h2>
        <p>Select one option or skip this step if you have your own transport.</p>
        <div className="option-grid">
          {transport.map((t,i)=>optionCard(t,draft.transport===i,()=>updateDraft("transport",i),"person"))}
        </div>
        <div className="actions">
          {button("Skip transport",()=>{updateDraft("transport",null);go("stay");},"outline")}
          {button("Continue →",()=>go("stay"))}
        </div>
      </div>
    </div>
  );

  const stayPage = () => (
    <div className="container">
      {steps(3)}
      <div className="panel">
        <h2>Choose Your Stay</h2>
        <p>Select your accommodation or skip if you have your own arrangement.</p>
        <div className="option-grid">
          {stays.map((s,i)=>optionCard(s,draft.stay===i,()=>updateDraft("stay",i),"night"))}
        </div>
        <div className="actions">
          {button("Skip stay",()=>{updateDraft("stay",null);go("gems");},"outline")}
          {button("Continue →",()=>go("gems"))}
        </div>
      </div>
    </div>
  );

  const toggleArray = (key,value) => {
    const list=draft[key];
    updateDraft(key,list.includes(value)?list.filter(x=>x!==value):[...list,value]);
  };

  const gemsPage = () => !draft.destination ? destinationPage() : (
    <div className="container">
      {steps(4)}
      <div className="panel">
        <div className="eyebrow">Explore local attractions</div>
        <h2>Hidden Gems in {draft.destination.name}</h2>
        <p>Select the places you want to visit.</p>
        <div className="option-grid">
          {draft.destination.gems.map(g=>(
            <label className="option-card" key={g.name}>
              <img src={img(g.image)} alt={g.name}/>
              <div className="option-info">
                <h3>{g.name}</h3>
                <label className="option-check">
                  <input type="checkbox" checked={draft.gems.includes(g.name)} onChange={()=>toggleArray("gems",g.name)}/>
                  Add to my itinerary
                </label>
              </div>
            </label>
          ))}
        </div>
        <hr/>
        <h2>Choose Experiences</h2>
        <p>Select activities you want to enjoy.</p>
        <div className="chips">
          {experiences.map(e=>(
            <label className="chip" key={e}>
              <input type="checkbox" checked={draft.experiences.includes(e)} onChange={()=>toggleArray("experiences",e)}/>
              {e}
            </label>
          ))}
        </div>
        <div className="actions">
          {button("Back",()=>go("stay"),"outline")}
          {button("Review Trip →",()=>go("review"))}
        </div>
      </div>
    </div>
  );

  const reviewPage = () => (
    <div className="container">
      {steps(5)}
      <div className="panel">
        <h2>Review Your Trip</h2><hr/>
        <p><b>Destination:</b> {draft.destination?.name}</p>
        <p><b>Travel date:</b> {draft.date||"Not selected"}</p>
        <p><b>Duration:</b> {draft.days} days</p>
        <p><b>Travellers:</b> {draft.people}</p>
        <p><b>Transport:</b> {draft.transport===null?"Skipped":transport[draft.transport].name}</p>
        <p><b>Stay:</b> {draft.stay===null?"Skipped":stays[draft.stay].name}</p>
        <p><b>Hidden gems:</b> {draft.gems.join(", ")||"None selected"}</p>
        <p><b>Experiences:</b> {draft.experiences.join(", ")||"None selected"}</p>
        <hr/>
        <h2 className="price">Estimated total: {money(estimate())}</h2>
        <div className="notice">This is an estimated project price, not a live travel quotation.</div>
        <div className="actions">
          {button("Edit plan",()=>go("gems"),"outline")}
          {button("Continue to Payment →",()=>go("payment"))}
        </div>
      </div>
    </div>
  );

  const paymentPage = () => !current ? (
    <div className="container"><div className="panel"><h2>Please login to continue</h2>{button("Login",()=>go("login"))}</div></div>
  ) : (
    <div className="container">
      {steps(6)}
      <div className="panel">
        <h2>Payment Options</h2>
        <p>Select a payment method for this demo booking.</p>
        <h2 className="price payment-total">{money(estimate())}</h2>
        <div className="grid">
          {["UPI","Card","Net Banking","Pay at destination"].map((method,i)=>(
            <button key={method} className={`payment-choice ${draft.payment===method?"selected":""}`} onClick={()=>updateDraft("payment",method)}>
              <h3>{["📱 UPI / QR","💳 Debit / Credit Card","🏦 Net Banking","📍 Pay at Destination"][i]}</h3>
              <p>{method==="Pay at destination"?"Pay later":method+" payment demo"}</p>
            </button>
          ))}
        </div>
        <div className="notice">Demo only: no real payment is processed. Do not enter real card or bank details.</div>
        <div className="actions">
          {button("Back",()=>go("review"),"outline")}
          {button("Confirm Booking",finishBooking)}
        </div>
      </div>
    </div>
  );

  const signupPage = () => (
    <div className="container">
      <form className="panel auth-panel" onSubmit={signup}>
        <h2>Create Your Account</h2>
        <p>Join TRAVELVERSE and start planning your trips.</p>
        <Field label="Full name"><input name="name" required placeholder="Enter your name"/></Field>
        <Field label="Email"><input name="email" type="email" required placeholder="Enter your email"/></Field>
        <Field label="Password"><input name="password" type="password" minLength="6" required placeholder="Create password"/></Field>
        {message&&<div className="notice">{message}</div>}
        <div className="actions">
          <button className="btn primary" type="submit">Create Account</button>
          {button("Already registered? Login",()=>go("login"),"outline")}
        </div>
      </form>
    </div>
  );

  const loginPage = () => (
    <div className="container">
      <form className="panel auth-panel" onSubmit={login}>
        <h2>Welcome Back!</h2>
        <p>Login to access your TRAVELVERSE profile.</p>
        <Field label="Email"><input name="email" type="email" required placeholder="Enter email"/></Field>
        <Field label="Password"><input name="password" type="password" required placeholder="Enter password"/></Field>
        {message&&<div className="notice">{message}</div>}
        <div className="actions">
          <button className="btn primary" type="submit">Login</button>
          {button("Create Account",()=>go("signup"),"outline")}
        </div>
      </form>
    </div>
  );

  const profilePage = () => {
    const mine=trips.filter(t=>t.user===current?.email);
    return (
      <div className="container">
        <SectionHead eyebrow="Your travel space" title={`Welcome, ${current?.name}`} subtitle={current?.email}/>
        <div className="stats">
          <Stat number={mine.length} label="Total bookings"/>
          <Stat number={mine.filter(t=>t.status==="Confirmed").length} label="Confirmed trips"/>
          <Stat number={mine.filter(t=>t.status==="Completed").length} label="Completed trips"/>
          <Stat number={money(mine.reduce((s,t)=>s+t.total,0))} label="Estimated spend"/>
        </div>
        <h2>My Bookings</h2>
        {mine.length===0 ? (
          <div className="panel empty">You have no bookings yet.<br/>{button("Plan your first trip",()=>go("destinations"))}</div>
        ) : mine.map(t=>(
          <div className="panel" key={t.id}>
            <div className="card-foot">
              <h3>{t.destination}</h3><span className={`status ${t.status.toLowerCase().replaceAll(" ","")}`}>{t.status}</span>
            </div>
            <p><b>Booking ID:</b> {t.id}</p>
            <p><b>Date:</b> {t.date||"Not selected"} | <b>Duration:</b> {t.days} days | <b>Travellers:</b> {t.people}</p>
            <p><b>Transport:</b> {t.transport} | <b>Stay:</b> {t.stay}</p>
            <p><b>Payment:</b> {t.payment} — {t.paymentStatus}</p>
            <p><b>Estimated total:</b> {money(t.total)}</p>
            <div className="actions">
              {(t.status==="Pending Admin Approval"||t.status==="Confirmed")&&button("Cancel booking",()=>cancelBooking(t.id),"danger small")}
              {t.status==="Confirmed"&&button("Mark as completed",()=>updateBooking(t.id,"Completed"),"soft small")}
            </div>
          </div>
        ))}
        {button("+ Plan another trip",()=>go("destinations"))}
      </div>
    );
  };

  const adminLoginPage = () => (
    <div className="container">
      <form className="panel auth-panel" onSubmit={adminLogin}>
        <h2>Administrator Login</h2>
        <p>Authorized demo administrator access.</p>
        <Field label="Admin Email"><input name="email" type="email" required placeholder="Admin email"/></Field>
        <Field label="Password"><input name="password" type="password" required placeholder="Password"/></Field>
        {message&&<div className="notice">{message}</div>}
        <div className="actions"><button className="btn dark" type="submit">Login as Admin</button></div>
        <div className="notice">Demo credentials: admin@travelverse.com / admin123</div>
      </form>
    </div>
  );

  const adminPage = () => !admin ? adminLoginPage() : (
    <div className="container">
      <SectionHead eyebrow="Control center" title="Admin Dashboard" subtitle="Manage users and booking requests."/>
      <div className="stats">
        <Stat number={users.length} label="Registered users"/>
        <Stat number={trips.length} label="Total bookings"/>
        <Stat number={trips.filter(t=>t.status==="Pending Admin Approval").length} label="Pending approvals"/>
        <Stat number={trips.filter(t=>t.status==="Confirmed").length} label="Confirmed"/>
        <Stat number={trips.filter(t=>t.status==="Cancelled").length} label="Cancelled"/>
      </div>
      <div className="panel">
        <div className="card-foot"><h2>All Booking Requests</h2>{button("Admin Logout",()=>{setAdmin(false);sessionStorage.removeItem("tv_admin");go("home")},"outline small")}</div>
        {trips.length===0?<div className="empty">No bookings received yet.</div>:(
          <div className="table-wrap">
            <table>
              <thead><tr><th>Booking</th><th>User</th><th>Trip</th><th>Payment</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>{trips.map(t=>(
                <tr key={t.id}>
                  <td><b>{t.id}</b><br/>{t.created}</td>
                  <td>{t.name}<br/>{t.user}</td>
                  <td>{t.destination}<br/>{t.days} days / {t.people} people<br/>{money(t.total)}</td>
                  <td>{t.payment}<br/>{t.paymentStatus}</td>
                  <td><span className={`status ${t.status.toLowerCase().replaceAll(" ","")}`}>{t.status}</span></td>
                  <td>
                    {t.status==="Pending Admin Approval"&&button("Confirm",()=>updateBooking(t.id,"Confirmed"),"small")}
                    {(t.status==="Pending Admin Approval"||t.status==="Confirmed")&&button("Cancel",()=>updateBooking(t.id,"Cancelled"),"danger small")}
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
      <div className="panel">
        <h2>Registered Users</h2>
        {users.map(u=><p key={u.email}>{u.name} — {u.email}</p>)}
        {users.length===0&&<p>No registered users yet.</p>}
      </div>
    </div>
  );

  const pages = {
    home,destinations:destinationPage,planner:plannerPage,
    transport:transportPage,stay:stayPage,gems:gemsPage,
    review:reviewPage,payment:paymentPage,signup:signupPage,
    login:loginPage,profile:profilePage,
    adminLogin:adminLoginPage,admin:adminPage
  };

  return (
    <>
      <header>
        <nav>
          <div className="logo" onClick={()=>go("home")}>✈ TRAVEL<span>VERSE</span></div>
          <div className="navlinks">
            <button onClick={()=>go("home")}>Home</button>
            <button onClick={()=>go("destinations")}>Destinations</button>
            <button onClick={()=>go("profile")}>My Trips</button>
          </div>
          <div className="auth">
            {current ? <>
              <button className="btn soft small" onClick={()=>go("profile")}>My Profile</button>
              <button className="btn outline small" onClick={logout}>Logout</button>
            </> : <>
              <button className="btn soft small" onClick={()=>go("login")}>User Login</button>
              <button className="btn primary small" onClick={()=>go("signup")}>Sign Up</button>
            </>}
            <button className="btn dark small" onClick={()=>go("adminLogin")}>Admin Login</button>
          </div>
        </nav>
      </header>

      <main>{(pages[page]||home)()}</main>

      <footer>
        <div>
          <h3>✈ TRAVELVERSE</h3>
          <p>Explore South India. Discover hidden places. Create memories.</p>
          <p>Student project demonstration platform.</p>
        </div>
      </footer>
    </>
  );
}

function Field({label,children}) {
  return <div className="field"><label>{label}</label>{children}</div>;
}

function SectionHead({eyebrow,title,subtitle}) {
  return <div className="section-head">
    <div className="eyebrow">{eyebrow}</div>
    <h2>{title}</h2>
    <p>{subtitle}</p>
  </div>;
}

function Stat({number,label}) {
  return <div className="stat"><strong>{number}</strong><span>{label}</span></div>;
}