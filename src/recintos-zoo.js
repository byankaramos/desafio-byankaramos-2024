class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
      { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
      { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
      { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
      { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] },
    ]

    this.animais = {
      LEAO: { tamanho: 3, biomas: ['savana'] },
      LEOPARDO: { tamanho: 2, biomas: ['savana'] },
      CROCODILO: { tamanho: 3, biomas: ['rio'] },
      MACACO: { tamanho: 1, biomas: ['savana', 'floresta'] },
      GAZELA: { tamanho: 2, biomas: ['savana'] },
      HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'] },
    }
  }

  analisaRecintos(animal, quantidade) {
    if (!this.animais[animal]) {
      return { erro: 'Animal inválido' }
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      return { erro: 'Quantidade inválida' }
    }

    const animalInfo = this.animais[animal]
    const tamanhoTotalNecessario = animalInfo.tamanho * quantidade
    let recintosViaveis = []

    for (const recinto of this.recintos) {
      let espacoUsado = 0

      for (let a of recinto.animais) {
        espacoUsado += this.animais[a.especie].tamanho * a.quantidade
      }
      let espacoLivre = recinto.tamanho - espacoUsado

      if (!animalInfo.biomas.includes(recinto.bioma)) continue

      const ehCarnivoro = ['LEAO', 'LEOPARDO', 'CROCODILO'].includes(animal)
      if (ehCarnivoro && recinto.animais.length > 0 && recinto.animais[0].especie !== animal) continue

      if (animal === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio' && recinto.animais.length > 0) continue

      if (espacoLivre < tamanhoTotalNecessario) continue

      if (animal === 'MACACO' && recinto.animais.length === 0 && quantidade < 2) continue

      if (recinto.animais.length > 0 && recinto.animais[0].especie !== animal) espacoLivre -= 1

      if (espacoLivre >= tamanhoTotalNecessario) {
        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - tamanhoTotalNecessario} total: ${recinto.tamanho})`)
      }
    }

    if (recintosViaveis.length > 0) {
      return { recintosViaveis: recintosViaveis.sort() }
    } else {
      return { erro: 'Não há recinto viável' }
    }
  }
}

export { RecintosZoo as RecintosZoo }
