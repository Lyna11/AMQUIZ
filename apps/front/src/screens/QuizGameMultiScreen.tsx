import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Pressable, Image, Dimensions } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import { questions } from "../config/questions";
import socket from "../socket";

export default function QuizScreen({ navigation, route }: any) {
  const { params } = route;
  const nomDuQuizz = params?.theme;
  const [data, setData] = useState(questions.naruto);
  const totalQuestions = data.length;
  const theme = Object.keys(questions);
  const themeMaj = theme.map((item) => item.charAt(0).toUpperCase() + item.slice(1));
  const [index, setIndex] = useState(0);
  const currentQuestion = data[index];
  const [score, setScore] = useState(0);
  const [quizzStatus, setQuizzStatus] = useState(true); // Commencer le quiz immédiatement
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number>(7);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [finQuizz, setFinQuizz] = useState(false);
  const screenwidth: number = Dimensions.get("window").width;
  const screenheight: number = Dimensions.get("window").height;

  useEffect(() => {
    if (isPaused) return;

    if (countdown === 0 || countdown < 0) {
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

    return () => clearInterval(interval);
  }, [countdown, isPaused]);

  useEffect(() => {
    if (quizzStatus === true) {
      setIsPaused(false);
      setFinQuizz(false);
    }

    if ((quizzStatus === true && index >= data.length) || currentQuestion === undefined) {
      setIsPaused(true);
      setFinQuizz(true);
    }
  }, [currentQuestion, quizzStatus]);

  useEffect(() => {
    if (selectedAnswer === null || !currentQuestion) return;

    const goToNextQuestion = () => {
      setIndex((index) => index + 1);
      setCountdown(7);
      setSelectedAnswer(null);
    };

    if (selectedAnswer === currentQuestion.answerId) {
      setScore((score) => score + 10);
    } else {
      if (score >= 5) {
        setScore((score) => score - 5);
      } else {
        setScore(0);
      }
    }

    goToNextQuestion();

    return () => {};
  }, [selectedAnswer, currentQuestion]);

  useEffect(() => {
    const onNextQuestion = (score: number) => {
      navigation.navigate("QuizGameMultiScreen", { score: score });
    };
    socket.on("nextQuestion", onNextQuestion(1));

    return () => {
      socket.off("nextQuestion");
    };
  }, [index]);

  useEffect(() => {
    const onSetIndex = (index: number) => {
      navigation.navigate("QuizGameMultiScreen", { index: index });
    };

    socket.on("setIndex", onSetIndex(index));

    return () => {
      socket.off("setIndex");
    };
  }, []);

  const sendResponse = async (idReponse: number) => {
    const response = await socket.emitWithAck("playerSendResponse", idReponse);
    console.log(response);
  };

  const setIndexSocket = async (index: number) => {
    const leRetour = await socket.emitWithAck("setIndex", index);
    console.log(leRetour);
  };

  const handleAnswerClick = (answerId: number) => {
    setIndex((prevIndex) => {
      setIndexSocket(prevIndex + 1);
      return prevIndex + 1;
    });
    setCountdown(7);
    setSelectedAnswer(null);
    sendResponse(answerId);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center", backgroundColor: "#DBE9EE" }}>
        <View style={styles.container}>
          <Text style={styles.title}>{`Quiz ${nomDuQuizz} !`}</Text>

          {finQuizz ? (
            <SafeAreaView style={{ backgroundColor: "#DBE9EE", height: screenheight }}>
              <View style={{ flex: 1, alignItems: "center", marginTop: "25%" }}>
                <View>
                  <View style={{ flex: 1, alignItems: "center", backgroundColor: "#DBE9EE" }}>
                    <Image source={require("../../assets/img/trophee.png")} style={{ width: screenwidth * 0.5, aspectRatio: 1 / 1 }} />
                    <Text style={{ fontSize: 30, fontWeight: "bold", color: "#000000", marginTop: 50 }}>NOM_DU_JOUEUR</Text>
                    <Text style={{ fontSize: 28, fontWeight: "bold", color: "#000000" }}>{`Score : ${score}`}</Text>
                    <Text style={{ fontSize: 16, color: "#000000", marginTop: 40 }}>NOM_DU_JOUEUR_2</Text>
                    <Text style={{ fontSize: 16, color: "#000000" }}>{`Score : ${score}`}</Text>
                  </View>

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
                    <Text style={styles.counter}>Revenir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          ) : (
            <>
              <Text style={styles.timer}>TIMER: {countdown}s</Text>
              <Text style={styles.counter}>{`Score : ${score}`}</Text>
              <View>
                <Text style={styles.question}>{index === data.length ? undefined : "(" + (index + 1) + "/" + totalQuestions + ") " + currentQuestion?.question}</Text>

                <View style={{ marginTop: 10 }}>
                  {currentQuestion?.choices.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => handleAnswerClick(item.id)} style={{ borderColor: "red", padding: 10 }}>
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
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
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
  counter: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  finishButton: {
    width: "100%",
    borderRadius: 8,
    padding: 16,
    marginTop: 50,
    backgroundColor: "#4F6D7A",
    justifyContent: "center",
    alignItems: "center",
  },
});
