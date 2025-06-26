function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// Validasi untuk input selain angka
function valid(angka, id, nama) {
  if (isNaN(angka) || angka <= 0) {
    showToast(`Masukkan nilai ${nama} yang valid (> 0)`);
    document.getElementById(id).focus();
    return false;
  }
  return true;
}

// Hitung Luas
document.getElementById("formLuas").addEventListener("submit", function (e) {
  e.preventDefault();
  const a = parseFloat(alas.value);
  const t = parseFloat(tinggi.value);
  if (!valid(a, "alas", "Alas") || !valid(t, "tinggi", "Tinggi")) return;
  const luas = 0.5 * a * t;
  hasilLuas.innerHTML = `L = ½ × ${a} × ${t} = <b>${luas} cm²</b>`;
});

// Hitung Keliling
document.getElementById("formKeliling").addEventListener("submit", function (e) {
  e.preventDefault();
  const a = parseFloat(sisiA.value);
  const b = parseFloat(sisiB.value);
  const c = parseFloat(sisiC.value);
  if (!valid(a, "sisiA", "Sisi A") || !valid(b, "sisiB", "Sisi B") || !valid(c, "sisiC", "Sisi C")) return;
  const kel = a + b + c;
  hasilKeliling.innerHTML = `K = ${a} + ${b} + ${c} = <b>${kel} cm</b>`;
});

// Hitung Tinggi dari Luas
document.getElementById("formTinggi").addEventListener("submit", function (e) {
  e.preventDefault();
  const luas = parseFloat(luasTinggi.value);
  const alas = parseFloat(alasTinggi.value);
  if (!valid(luas, "luasTinggi", "Luas") || !valid(alas, "alasTinggi", "Alas")) return;
  const tinggi = (2 * luas) / alas;
  hasilTinggi.innerHTML = `T = (2 × ${luas}) / ${alas} = <b>${tinggi} cm</b>`;
});

// Hitung Alas dari Luas
document.getElementById("formAlas").addEventListener("submit", function (e) {
  e.preventDefault();
  const luas = parseFloat(luasAlas.value);
  const tinggi = parseFloat(tinggiAlas.value);
  if (!valid(luas, "luasAlas", "Luas") || !valid(tinggi, "tinggiAlas", "Tinggi")) return;
  const alas = (2 * luas) / tinggi;
  hasilAlas.innerHTML = `A = (2 × ${luas}) / ${tinggi} = <b>${alas} cm</b>`;
});

// Hitung Sisi Miring (Pythagoras) atau Segitiga Siku-siku
document.getElementById("formSisiMiring").addEventListener("submit", function (e) {
  e.preventDefault();
  const a = parseFloat(alasMiring.value);
  const t = parseFloat(tinggiMiring.value);
  if (!valid(a, "alasMiring", "Alas") || !valid(t, "tinggiMiring", "Tinggi")) return;
  const miring = Math.sqrt(a * a + t * t).toFixed(2);
  hasilMiring.innerHTML = `c² = ${a}² + ${t}² ⇒ c = √(${a * a + t * t}) = <b>${miring} cm</b>`;
});

// Hitung Sisi miring dari keliling (segitiga sama kaki)
document.getElementById("formMiringSamaKaki").addEventListener("submit", function (e) {
  e.preventDefault();
  const kel = parseFloat(document.getElementById("kelilingSamaKaki").value);
  const alas = parseFloat(document.getElementById("alasSamaKaki").value);
  const output = document.getElementById("hasilMiringSamaKaki");

  if (!valid(kel, "kelilingSamaKaki", "Keliling") || !valid(alas, "alasSamaKaki", "Alas")) return;
  if (alas >= kel) {
    showToast("Alas tidak boleh lebih besar atau sama dengan keliling.");
    return;
  }

  const sisiMiring = (kel - alas) / 2;
  output.innerHTML = `Sisi miring = (${kel} - ${alas}) / 2 = <b>${sisiMiring} cm</b>`;
});

// Hitung Luas segitiga sembarang (Heron)
document.getElementById("formSembarang").addEventListener("submit", function (e) {
  e.preventDefault();
  const a = parseFloat(document.getElementById("ssA").value);
  const b = parseFloat(document.getElementById("ssB").value);
  const c = parseFloat(document.getElementById("ssC").value);
  const output = document.getElementById("hasilSembarang");

  if (!valid(a, "ssA", "Sisi A") || !valid(b, "ssB", "Sisi B") || !valid(c, "ssC", "Sisi C")) return;

  // Validasi segitiga
  if (a + b <= c || a + c <= b || b + c <= a) {
    showToast("Gabungan dua sisi harus lebih besar dari sisi ketiga (aturan segitiga).");
    return;
  }

  const s = (a + b + c) / 2;
  const luas = Math.sqrt(s * (s - a) * (s - b) * (s - c)).toFixed(2);
  output.innerHTML = `s = (${a} + ${b} + ${c}) / 2 = ${s} <br>L = √(${s}(${s - a})(${s - b})(${s - c})) = <b>${luas} cm²</b>`;
});

// Hitung sudut segitiga menggunakan hukum cosinus
document.getElementById("formSudut").addEventListener("submit", function (e) {
  e.preventDefault();
  const a = parseFloat(document.getElementById("sudutA").value);
  const b = parseFloat(document.getElementById("sudutB").value);
  const c = parseFloat(document.getElementById("sudutC").value);
  const output = document.getElementById("hasilSudut");

  if (!valid(a, "sudutA", "Sisi a") || !valid(b, "sudutB", "Sisi b") || !valid(c, "sudutC", "Sisi c")) return;
  if (a + b <= c || a + c <= b || b + c <= a) {
    showToast("Gabungan dua sisi harus lebih besar dari sisi ketiga (aturan segitiga).");
    return;
  }

  // Hukum cosinus → hitung dalam derajat
  const radToDeg = (rad) => (rad * 180 / Math.PI).toFixed(2);

  const angleA = radToDeg(Math.acos((b*b + c*c - a*a) / (2 * b * c)));
  const angleB = radToDeg(Math.acos((a*a + c*c - b*b) / (2 * a * c)));
  const angleC = (180 - angleA - angleB).toFixed(2); // Atau hitung dari cos juga

  output.innerHTML = `
    Sudut A = <b>${angleA}°</b><br>
    Sudut B = <b>${angleB}°</b><br>
    Sudut C = <b>${angleC}°</b>
  `;
});


// Fungsi Reset
function resetForm(type) {
  const formMap = {
    luas: ["formLuas", "hasilLuas"],
    keliling: ["formKeliling", "hasilKeliling"],
    tinggi: ["formTinggi", "hasilTinggi"],
    alas: ["formAlas", "hasilAlas"],
    miring: ["formSisiMiring", "hasilMiring"],
    miringSamaKaki: ["formMiringSamaKaki", "hasilMiringSamaKaki"],
    sembarang: ["formSembarang", "hasilSembarang"],
    sudut: ["formSudut", "hasilSudut"]
  };
  const [formId, resultId] = formMap[type];
  document.getElementById(formId).reset();
  document.getElementById(resultId).innerHTML = "";
}

const tabButtons = document.querySelectorAll('.tab-buttons button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Hapus kelas atau jenis aktif dari semua tombol dan panel
    tabButtons.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));

    // untuk menandai tombol pada kelas aktif yang dipilih
    btn.classList.add('active');
    const target = btn.getAttribute('data-tab');
    document.getElementById(target).classList.add('active');
  });
});
