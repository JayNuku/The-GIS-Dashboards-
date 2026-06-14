function switchTab(id, btn) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('sec-' + id).classList.add('active');
  btn.classList.add('active');
}

function filterLayer(btn, type) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#layerTable tbody tr').forEach(tr => {
    tr.style.display = (type === 'all' || tr.dataset.type === type) ? '' : 'none';
  });
}

const teal = '#2d8b8b', seafoam = '#a8dadc';
Chart.defaults.color = 'rgba(241,250,238,0.5)';
Chart.defaults.borderColor = 'rgba(168,218,220,0.08)';
Chart.defaults.font.family = "'Sora', sans-serif";
Chart.defaults.font.size = 10;

const map = L.map('map', {
  center: [5.6037, -0.1870],
  zoom: 11,
  zoomControl: false
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
  maxZoom: 19
}).addTo(map);

const highDensityLayer = L.geoJSON({
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'High density zone' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.22, 5.62],
            [-0.14, 5.62],
            [-0.14, 5.56],
            [-0.22, 5.56],
            [-0.22, 5.62]
          ]
        ]
      }
    }
  ]
}, {
  style: {
    color: '#2d8b8b',
    weight: 2,
    fillColor: 'rgba(45,139,139,0.2)',
    fillOpacity: 0.45
  },
  onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(feature.properties.name);
    }
  }
}).addTo(map);

L.marker([5.61, -0.18]).addTo(map).bindPopup('GIS data center').openPopup();

L.control.layers(null, {
  'High density zone': highDensityLayer
}, { collapsed: false }).addTo(map);

new Chart(document.getElementById('spark1'), {
  type: 'line',
  data: {
    labels: ['W1','W2','W3','W4','W5','W6','W7','W8'],
    datasets: [{ data: [3800,3920,4010,4120,4280,4430,4650,4812], borderColor: teal, borderWidth: 1.5, backgroundColor: 'rgba(45,139,139,0.15)', fill: true, tension: 0.4, pointRadius: 0 }]
  },
  options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(168,218,220,0.06)' }, ticks: { maxTicksLimit: 3 } } } }
});

new Chart(document.getElementById('spark2'), {
  type: 'bar',
  data: {
    labels: ['W1','W2','W3','W4','W5','W6','W7','W8'],
    datasets: [{ data: [120,91,143,108,162,149,218,162], backgroundColor: 'rgba(45,139,139,0.5)', borderColor: teal, borderWidth: 1, borderRadius: 3 }]
  },
  options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(168,218,220,0.06)' }, ticks: { maxTicksLimit: 3 } } } }
});

new Chart(document.getElementById('spark3'), {
  type: 'line',
  data: {
    labels: ['0','5','10','15','20','25','30','35','40'],
    datasets: [{ data: [12,28,55,90,140,110,72,40,18], borderColor: seafoam, borderWidth: 1.5, backgroundColor: 'rgba(168,218,220,0.12)', fill: true, tension: 0.5, pointRadius: 0 }]
  },
  options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(168,218,220,0.06)' }, ticks: { maxTicksLimit: 3 } } } }
});

new Chart(document.getElementById('donut'), {
  type: 'doughnut',
  data: {
    datasets: [{ data: [38,27,15,12,8], backgroundColor: ['#2d8b8b','#3aadad','#a8dadc','#1a5c5c','#243048'], borderColor: '#1a2332', borderWidth: 2 }]
  },
  options: { cutout: '68%', plugins: { legend: { display: false } } }
});

new Chart(document.getElementById('growthChart'), {
  type: 'bar',
  data: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun'],
    datasets: [{ label: 'New features', data: [310,480,395,620,540,720], backgroundColor: 'rgba(45,139,139,0.5)', borderColor: teal, borderWidth: 1, borderRadius: 4 }]
  },
  options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(168,218,220,0.06)' } } } }
});
