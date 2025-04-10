import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const [numero, setNumero] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tentativas, setTentativas] = useState(5);
  const [numeroSorteado, setNumeroSorteado] = useState(Math.floor(Math.random() * 100));
  const [jogoFinalizado, setJogoFinalizado] = useState(false);

  const verificarNumero = () => {
    if (numero === '' || isNaN(numero)) {
      setMensagem('Digite um número válido!');
      return;
    }

    const num = parseInt(numero);
    if (num < 0 || num > 100) {
      setMensagem('Digite um número entre 0 e 100!');
      return;
    }

    const novasTentativas = tentativas - 1;
    setTentativas(novasTentativas);

    if (num === numeroSorteado) {
      setMensagem(`Parabéns! Você acertou o número ${numeroSorteado}!`);
      setJogoFinalizado(true);
    } else if (num > numeroSorteado) {
      setMensagem('O número sorteado é MENOR');
    } else {
      setMensagem('O número sorteado é MAIOR');
    }

    if (novasTentativas === 0 && num !== numeroSorteado) {
      setMensagem(`Game Over! O número era ${numeroSorteado}`);
      setJogoFinalizado(true);
    }

    setNumero('');
  };

  const reiniciarJogo = () => {
    setNumeroSorteado(Math.floor(Math.random() * 100));
    setTentativas(5);
    setMensagem('');
    setJogoFinalizado(false);
    setNumero('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Qual o número de 0 a 100?</Text>
      
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite seu palpite"
        value={numero}
        onChangeText={setNumero}
        editable={!jogoFinalizado}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={verificarNumero}
        disabled={jogoFinalizado}
      >
        <Text style={styles.textoBotao}>Verificar</Text>
      </TouchableOpacity>

      <Text style={styles.mensagem}>{mensagem}</Text>
      <Text style={styles.tentativas}>Tentativas restantes: {tentativas}</Text>

      {jogoFinalizado && (
        <TouchableOpacity style={styles.botaoReiniciar} onPress={reiniciarJogo}>
          <Text style={styles.textoBotao}>Jogar Novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitulo: {
    fontSize: 18,
    marginBottom: 30,
    color: '#666',
  },
  numeroContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    elevation: 5,
  },
  numero: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  botao: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 20,
  },
  textoBotao: {
    color: 'bla',
    fontSize: 18,
    fontWeight: 'bold',
  },
});