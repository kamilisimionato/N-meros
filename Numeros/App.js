import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';

export default function App() {
  const [numero, setNumero] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tentativas, setTentativas] = useState(5);
  const [numeroSorteado, setNumeroSorteado] = useState(Math.floor(Math.random() * 100));
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
        style={[styles.input, { marginBottom: 20 }]}
        keyboardType="numeric"
        placeholder="Digite seu palpite"
        value={numero}
        onChangeText={setNumero}
        editable={!jogoFinalizado}
        onSubmitEditing={verificarNumero} // Adicionado esta linha para responder ao Enter
        returnKeyType="done" // Altera o botão do teclado para "done"
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
          <Text style={[styles.textoBotao, { color: 'black' }]}>Jogar Novamente</Text>
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
  input: {
    height: 50,
    width: '80%',
    borderColor: '#6200ee',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  botao: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 20,
  },
  textoBotao: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mensagem: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
    color: '#333',
  },
  tentativas: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  botaoReiniciar: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#6200ee',
  },
});