const canvas = document.getElementById('roleta');
const ctx = canvas.getContext('2d');
const girarBtn = document.getElementById('girar');
const resultado = document.getElementById('resultado');

const premios = ['R$10', 'R$50', 'Nada', 'R$100', 'R$25', 'R$5', 'R$200', 'Tente Novamente'];
const cores = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF', '#FF4444'];
const numSetores = premios.length;
const anguloSetor = (2 * Math.PI) / numSetores;
let anguloAtual = 0;
let girando = false;

function desenharRoleta() {
  for (let i = 0; i < numSetores; i++) {
    const anguloInicial = i * anguloSetor;
    const anguloFinal = anguloInicial + anguloSetor;

    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, anguloInicial, anguloFinal);
    ctx.fillStyle = cores[i];
    ctx.fill();
    ctx.save();

    ctx.translate(250, 250);
    ctx.rotate(anguloInicial + anguloSetor / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText(premios[i], 230, 10);
    ctx.restore();
  }
}

function girarRoleta() {
  if (girando) return;
  girando = true;
  let velocidade = Math.random() * 0.2 + 0.3;
  let desaceleracao = 0.005;

  const animacao = setInterval(() => {
    ctx.clearRect(0, 0, 500, 500);
    anguloAtual += velocidade;
    velocidade -= desaceleracao;

    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(anguloAtual);
    ctx.translate(-250, -250);
    desenharRoleta();
    ctx.restore();

    if (velocidade <= 0) {
      clearInterval(animacao);
      const setor = Math.floor(((2 * Math.PI - (anguloAtual % (2 * Math.PI))) / anguloSetor)) % numSetores;
      resultado.textContent = Você ganhou: ${premios[setor]}! 🎉;
      girando = false;
    }
  }, 30);
}

desenharRoleta();
girarBtn.addEventListener('click', girarRoleta);