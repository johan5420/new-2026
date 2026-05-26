function sendMessage() {
  const input = document.getElementById('userInput');
  const chatlog = document.getElementById('chatlog');
  const userMsg = input.value.trim();
  if (!userMsg) return;
  chatlog.innerHTML += `<div><b>Anda:</b> ${userMsg}</div>`;
  let botMsg = "Maaf, saya belum paham pertanyaan Anda.";
  if(/(halo|hi|hai)/i.test(userMsg)) {
    botMsg = "Halo! Selamat datang di Mentawai Travel. Ada yang bisa saya bantu?";
  } else if(/(gallery|galeri|foto)/i.test(userMsg)) {
    botMsg = "Untuk melihat galeri, silakan scroll ke bagian Gallery di halaman.";
  } else if(/(booking|pesan|paket)/i.test(userMsg)) {
    botMsg = "Untuk booking paket wisata, klik tombol Booking di bagian paket atau isi formulir pada modal.";
  } else if(/(nama|web ini|siapa kamu)/i.test(userMsg)) {
    botMsg = "Saya adalah chatbot otomatis Mentawai Travel.";
  }
  chatlog.innerHTML += `<div><b>Bot:</b> ${botMsg}</div>`;
  input.value = "";
  chatlog.scrollTop = chatlog.scrollHeight;
}
document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('userInput');
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
  });
});
