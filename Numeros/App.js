import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Keyboard, ImageBackground } from 'react-native';

export default function App() {
  const [numero, setNumero] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tentativas, setTentativas] = useState(5);
  const [numeroSorteado, setNumeroSorteado] = useState(Math.floor(Math.random() * 101)); // Garantir que seja de 0 a 100
  const [jogoFinalizado, setJogoFinalizado] = useState(false);

  const verificarNumero = () => {
    if (jogoFinalizado) return;

    Keyboard.dismiss(); // Fecha o teclado

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
    setNumeroSorteado(Math.floor(Math.random() * 101)); // Garantir novo sorteio de 0 a 100
    setTentativas(5);
    setMensagem('');
    setJogoFinalizado(false);
    setNumero('');
  };

  return (
    <ImageBackground 
      source={require('./assets/blackboard.jpg')} // Imagem de fundo de lousa
      style={styles.container}
    >
      <Text style={styles.titulo}>Descubra o Número</Text>
      <Text style={styles.subtitulo}>De 0 a 100</Text>

      <View style={styles.formulaBackground}>
        <Text style={styles.formulaText}>x = ?</Text>
      </View>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite seu palpite"
        placeholderTextColor="#888"
        value={numero}
        onChangeText={setNumero}
        editable={!jogoFinalizado}
        onSubmitEditing={verificarNumero}
        returnKeyType="done"
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={verificarNumero}
        disabled={jogoFinalizado}
      >
        <Text style={styles.textoBotao}>Resolver</Text>
      </TouchableOpacity>

      <Text style={styles.mensagem}>{mensagem}</Text>
      <View style={styles.tentativasContainer}>
        <Text style={styles.tentativas}>Tentativas: {tentativas}</Text>
      </View>

      {jogoFinalizado && (
        <TouchableOpacity style={styles.botaoReiniciar} onPress={reiniciarJogo}>
          <Text style={styles.textoBotaoReiniciar}>Novo Problema</Text>
        </TouchableOpacity>
      )}

      {/* Elementos gráficos decorativos */}
      <View style={styles.decorationElement}>
        <Text style={styles.decorationText}>π</Text>
      </View>
      <View style={styles.decorationElement}>
        <Text style={styles.decorationText}>√</Text>
      </View>
      <View style={styles.decorationElement}>
        <Text style={styles.decorationText}>Σ</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',  // Usando o fundo transparente, já que a imagem de fundo foi configurada
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#e5e5e5',
    fontFamily: 'Georgia', // Fonte mais formal, tipo caderno
  },
  subtitulo: {
    fontSize: 20,
    marginBottom: 30,
    color: '#f8f8f8',
    fontStyle: 'italic',
  },
  formulaBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Fundo semi-transparente para destacar a fórmula
    padding: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#c8d5b9',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  formulaText: {
    fontSize: 28,
    color: '#e5e5e5',
    fontWeight: 'bold',
    fontFamily: 'Courier New', // Fonte que lembra uma escrita matemática
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#4a8fe7',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: '#fff',
    marginBottom: 25,
    fontFamily: 'Arial', // Fonte simples e fácil de ler
    borderStyle: 'solid',
    color: '#333',
  },
  botao: {
    backgroundColor: '#52ab98',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 25,
    shadowColor: '#2b6777',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  textoBotao: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  mensagem: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#2b6777',
    padding: 15,
    borderRadius: 8,
    width: '90%',
    borderLeftWidth: 5,
    borderLeftColor: '#52ab98',
    fontFamily: 'Courier New',
  },
  tentativasContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#c8d5b9',
  },
  tentativas: {
    fontSize: 16,
    color: '#4a8fe7',
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  botaoReiniciar: {
    backgroundColor: '#f0f7f4',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#52ab98',
    marginTop: 10,
  },
  textoBotaoReiniciar: {
    color: '#2b6777',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  decorationElement: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#c8d5b9',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
  decorationText: {
    fontSize: 24,
    color: '#2b6777',
    fontWeight: 'bold',
  },
});
