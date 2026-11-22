// HARGA PAKET STUDIO
const packages = {
    basic: {
        name: "Studio Suara Dasar",
        price: 75000
    },

    creator: {
        name: "Studio Kreator Visual",
        price: 150000
    },

    broadcast: {
        name: "Studio Penyiaran Penuh",
        price: 250000
    }
};

// FORMAT RUPIAH
function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);
}

// ELEMEN HTML
const packageSelect = document.getElementById("package");
const durationInput = document.getElementById("duration");
const promoInput = document.getElementById("promo");
const resultBox = document.getElementById("result");
const calculatorForm = document.getElementById("calculatorForm");

const minusBtn = document.getElementById("minusBtn");
const plusBtn = document.getElementById("plusBtn");

// TOMBOL KURANG DURASI
minusBtn.addEventListener("click", function () {
    let duration = Number(durationInput.value);

    if (duration > 1) {
        durationInput.value = duration - 1;
    }
});

// TOMBOL TAMBAH DURASI
plusBtn.addEventListener("click", function () {
    let duration = Number(durationInput.value);

    if (duration < 24) {
        durationInput.value = duration + 1;
    }
});

// MEMILIH PAKET DARI KARTU
function selectPackage(packageName) {
    packageSelect.value = packageName;

    document.getElementById("calc-section").scrollIntoView({
        behavior: "smooth"
    });

    resultBox.innerHTML =
        "<p>Paket berhasil dipilih. Silakan hitung harga sewa.</p>";
}

// KALKULATOR HARGA
calculatorForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedPackage = packageSelect.value;
    const duration = Number(durationInput.value);
    const promoCode = promoInput.value.trim().toUpperCase();

    // VALIDASI DURASI
    if (!Number.isInteger(duration) || duration < 1 || duration > 24) {
        resultBox.innerHTML =
            "<p>Durasi harus antara 1 sampai 24 jam.</p>";
        return;
    }

    // DATA PAKET
    const selected = packages[selectedPackage];

    // HITUNG SUBTOTAL
    const subtotal = selected.price * duration;

    // HITUNG PROMO
    let discount = 0;
    let promoMessage = "Tidak menggunakan kode promo.";

    if (promoCode === "ABISDIG3") {
        discount = subtotal * 0.20;
        promoMessage = "Promo ABISDIG3 berhasil! Diskon 20%.";
    } else if (promoCode !== "") {
        promoMessage = "Kode promo tidak valid.";
    }

    // TOTAL PEMBAYARAN
    const total = subtotal - discount;

    // TAMPILKAN HASIL
    resultBox.innerHTML = `
        <div class="result-content">
            <h3>Rincian Penyewaan</h3>

            <p>Paket:
                <strong>${selected.name}</strong>
            </p>

            <p>Harga per jam:
                <strong>${formatRupiah(selected.price)}</strong>
            </p>

            <p>Durasi:
                <strong>${duration} jam</strong>
            </p>

            <p>Subtotal:
                <strong>${formatRupiah(subtotal)}</strong>
            </p>

            <p>Diskon:
                <strong>${formatRupiah(discount)}</strong>
            </p>

            <p>${promoMessage}</p>

            <h3 class="total-price">
                Total: ${formatRupiah(total)}
            </h3>
        </div>
    `;
});
