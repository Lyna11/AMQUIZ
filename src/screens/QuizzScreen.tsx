import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

import { questionsQuizz } from '../config/questions';

// Ecran de Quizz
export default function QuizzScreen() {

    // Données questions.ts
    const data = questionsQuizz.questions;
    // Index questions
    const [index, setIndex] = useState(0);
    const currentQuestion = data[index];
    // Compteur points
    const [points, setPoints] = useState(0);
    // Statut réponse (True / False)
    const [answerStatus, setAnswerStatus] = useState(false);
    // Réponse choisie
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    // Gestion choix réponses
    useEffect(() => {
        // Null check
        if (selectedAnswer === null || !currentQuestion) return;
        // Timeout
        let timeout: NodeJS.Timeout;
        // Si la réponse est correcte...
        if (selectedAnswer === currentQuestion.answerId) {
            timeout = setTimeout(() => {
                // TODO: surbrillance choix en vert
                setPoints((points) => points + 10);
                setIndex((index) => index + 1);
                setAnswerStatus(true);
                setSelectedAnswer(null);
                console.log("bonne réponse");
            }, 1500);
        // Si la réponse est fausse...
        } else {
            timeout = setTimeout(() => {
                // TODO: surbrillance choix en rouge
                setIndex((index) => index + 1);
                setAnswerStatus(false);
                setSelectedAnswer(null);
                console.log("mauvaise réponse");
            }, 1500);
        }
        // Nettoyage timeout
        return () => {
            if (timeout) clearTimeout(timeout);
        }
    }, [selectedAnswer]);

    // Fin du Quizz (plus de questions)
    useEffect(() => {
        if (currentQuestion == null || data[index].question == null) {
            console.log("FIN DU QUIZZ");
        }
    }, [currentQuestion]);

    // Rendu
    return (
        <SafeAreaView>
            <Text style={styles.title}>QUIZZ</Text>
            <Text style={styles.question}>{currentQuestion?.question}</Text>
            <View style={{ marginTop: 10 }}>
                {currentQuestion?.choices.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => setSelectedAnswer(item.id)} style={{ borderColor: "red", padding: 10 }}>
                        <View style={styles.cards}> 
                            <Text>{item.id}. {item.answer}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

        </SafeAreaView>
    );

}

/* Pour CSS */
const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: '#e91e63',
    padding: 10
  },
  question: {
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: '#e91e63',
    padding: 5
  },
  cards: {
    color: "black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e91e63",
    borderRadius: 20,
    padding: 5,
    maxWidth: 200,
    textShadowRadius: 1,
    textShadowColor: "black",
  }
});