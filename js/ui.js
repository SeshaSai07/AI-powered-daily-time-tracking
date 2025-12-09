import { auth } from './auth.js';
const category = document.getElementById('category').value;
const minutes = Number(document.getElementById('minutes').value);
const user = auth.currentUser;
const dateStr = datePicker.value;
if (!user) return alert('Sign in first.');


// validate
const curr = cached.reduce((s,a)=>s + Number(a.minutes||0),0);
if (curr + minutes > 1440) return alert('Adding this would exceed 1440 minutes for the day.');


await addActivity(user.uid, dateStr, { name, category, minutes, createdAt: new Date().toISOString() });
activityForm.reset();
await refresh();


datePicker.addEventListener('change', refresh);
auth.onAuthStateChanged(async user => { if (user) await refresh(); });


// Dashboard renderer
import { getActivities as fetchActivities } from './db.js';
import Chart from 'https://cdn.jsdelivr.net/npm/chart.js';


export async function renderDashboard(){
const dateInput = document.getElementById('dashDate');
const noData = document.getElementById('noData');
const analytics = document.getElementById('analytics');
const pieCtx = document.getElementById('pieChart');
const barCtx = document.getElementById('barChart');
const summary = document.getElementById('summary');


const params = new URLSearchParams(location.search);
const d = params.get('d') || new Date().toISOString().slice(0,10);
dateInput.value = d;


async function load(){
const user = (await import('./auth.js')).auth.currentUser;
if (!user) return;
const acts = await fetchActivities(user.uid, dateInput.value);
if (!acts || acts.length === 0){
noData.classList.remove('hidden'); analytics.classList.add('hidden');
return;
}
noData.classList.add('hidden'); analytics.classList.remove('hidden');


// aggregate by category
const byCat = {};
acts.forEach(a => { byCat[a.category] = (byCat[a.category]||0) + Number(a.minutes||0); });
const catLabels = Object.keys(byCat);
const catValues = Object.values(byCat);


// pie chart
if (window._pie) window._pie.destroy();
window._pie = new Chart(pieCtx, { type: 'pie', data: { labels: catLabels, datasets: [{ data: catValues }] } });


// bar chart (per activity)
if (window._bar) window._bar.destroy();
window._bar = new Chart(barCtx, { type: 'bar', data: { labels: acts.map(a=>a.name), datasets: [{ data: acts.map(a=>a.minutes) }] }, options: { indexAxis: 'y' }});


// summary
const total = acts.reduce((s,a)=>s + Number(a.minutes||0),0);
summary.innerHTML = `<div>Total hours: <strong>${(total/60).toFixed(2)}h</strong></div>
<div>Categories: ${catLabels.map(c=>`${c} (${Math.round(byCat[c]/60)}h)`).join(', ')}</div>
<div>Activities: ${acts.length}</div>`;
}


dateInput.addEventListener('change', load);
await load();
}