import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Pressable } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import { questions } from "../config/questions";

// Ecran de Quizz
export default function QuizScreen({ navigation, route }: any) {
  // Récupération du thème choisi
  const { params } = route;
  const nomDuQuizz = params?.theme;
  // Données questions.ts
  const [data, setData] = useState(questions.naruto); // choix par défaut
  const totalQuestions = data.length; // compteur questions
  const theme = Object.keys(questions);
  const themeMaj = theme.map((item) => item.charAt(0).toUpperCase() + item.slice(1));
  // Index questions
  const [index, setIndex] = useState(0);
  // Question actuelle
  const currentQuestion = data[index];
  // Compteur score
  const [score, setScore] = useState(0);
  // Statut réponse (True = en cours / False = fini)
  const [quizzStatus, setQuizzStatus] = useState(false);
  // Réponse choisie
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  // Valeurs Timer
  const [countdown, setCountdown] = useState<number>(7);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  // Booléen fin du quizz
  const [finQuizz, setFinQuizz] = useState(false);

  /*************************************************************************************************************************/

  // Gestion du choix de thème
  function setTheme(item: string) {
    // Utiliser le theme récupéré dans le paramètre
    if (item === "Naruto") {
      setData(questions.naruto);
    }
    if (item === "DragonBall") {
      setData(questions.dragonball);
    }
    if (item === "Evangelion") {
      setData(questions.evangelion);
    }
  }

  // Gestion du Timer
  useEffect(() => {
    if (isPaused) return;
    // Si le compteur atteint 0 on passe à la question suivante
    if (countdown === 0 || countdown < 0) {
      // Evite que le score soit négatif
      if (score >= 5) {
        setScore((score) => score - 5);
      } else {
        setScore(0);
      }
      if (index < data.length) {
        setIndex((index) => index + 1);
      }
      setCountdown(7);
    }
    const interval = setInterval(() => {
      setCountdown((countdown) => countdown - 1);
    }, 1000);
    // Reset
    return () => clearInterval(interval);
  }, [countdown, isPaused]);

  // Gestion boucle de jeu
  useEffect(() => {
    // Lancement du Timer
    if (quizzStatus === true) {
      setIsPaused(false);
      setFinQuizz(false);
    }
    // Le quizz s'arrête lorsqu'il n'y a plus de questions
    if ((quizzStatus === true && index >= data.length) || currentQuestion === undefined) {
      setIsPaused(true);
      setFinQuizz(true);
    }
  }, [currentQuestion, quizzStatus]);

  // Gestion choix réponses
  useEffect(() => {
    // Null check
    if (selectedAnswer === null || !currentQuestion) return;

    // Fonction pour passer à la question suivante
    const goToNextQuestion = () => {
      setIndex((index) => index + 1);
      setCountdown(7);
      setSelectedAnswer(null);
    };

    // Si la réponse est correcte...
    if (selectedAnswer === currentQuestion.answerId) {
      setScore((score) => score + 10);
    } else {
      // Si la réponse est fausse...
      if (score >= 5) {
        setScore((score) => score - 5);
      } else {
        setScore(0);
      }
    }

    // Appeler directement la fonction pour passer à la question suivante
    goToNextQuestion();

    // Nettoyage timeout
    return () => {};
  }, [selectedAnswer, currentQuestion]);

  /*************************************************************************************************************************/

  // Rendu
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center", backgroundColor: "#DBE9EE" }}>
        <View style={styles.container}>
          <Text style={styles.title}>{`Quiz ${nomDuQuizz} !`}</Text>

          {quizzStatus === false && finQuizz === false ? (
            <>
              <Pressable
                style={styles.startButton}
                onPress={() => {
                  setQuizzStatus(true);
                  setTheme(nomDuQuizz);
                }}>
                <Text style={styles.buttonText}>Démarrer</Text>
              </Pressable>
              <TouchableOpacity
                style={styles.finishButton}
                onPress={() => {
                  setQuizzStatus(false);
                  setIndex(0);
                  setScore(0);
                  setCountdown(7);
                  setFinQuizz(false);
                  navigation.navigate("QuizScreen");
                }}>
                <Text style={styles.buttonText}>Revenir</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {finQuizz ? (
                // Afficher le bouton FIN à la fin du quiz
                <TouchableOpacity
                  style={styles.finishButton}
                  onPress={() => {
                    setQuizzStatus(false);
                    setIndex(0);
                    setScore(0);
                    setCountdown(7);
                    setFinQuizz(false);
                    navigation.navigate("QuizScreen");
                  }}>
                  <Text style={styles.counter}>{`Quizz terminé! Résultat : ${score}/${totalQuestions * 10}`}</Text>
                  <Text>FIN</Text>
                </TouchableOpacity>
              ) : (
                // Afficher le contenu du quiz lorsqu'il est en cours
                <>
                  <Text style={styles.timer}>TIMER: {countdown}s</Text>
                  <Text style={styles.counter}>{`Score : ${score}`}</Text>
                  <View>
                    <Text style={styles.question}>{index === data.length ? undefined : "(" + (index + 1) + "/" + totalQuestions + ") " + currentQuestion?.question}</Text>

                    <View style={{ marginTop: 10 }}>
                      {currentQuestion?.choices.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => setSelectedAnswer(item.id)} style={{ borderColor: "red", padding: 10 }}>
                          <View style={styles.cards}>
                            <Text style={{ color: selectedAnswer === item.id ? (selectedAnswer === currentQuestion.answerId ? "green" : "red") : undefined }}>
                              {item.id} - {item.answer}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </>
              )}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

/* Pour CSS */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#DBE9EE",
    width: "90%",
    marginTop: "25%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000",
  },
  startButton: {
    width: "100%",
    height: 70,
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    backgroundColor: "#4F6D7A",
    justifyContent: "center",
    alignItems: "center",
  },
  finishButton: {
    width: "100%",
    height: 70,
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    backgroundColor: "#4F6D7A",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  counter: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 20,
  },
  timer: {
    fontSize: 20,
    color: "#000000",
    marginTop: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 20,
  },
  cards: {
    width: "100%",
    height: 70,
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
});