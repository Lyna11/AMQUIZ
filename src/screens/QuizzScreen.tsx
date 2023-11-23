import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

import { questionsQuizz } from '../config/questions';

// Ecran de Quizz
export default function QuizzScreen() {

    // Données questions.ts
    const data = questionsQuizz.questions;
    const totalQuestions = data.length;
    // Index questions
    const [index, setIndex] = useState(0);
    const currentQuestion = data[index];
    // Compteur score
    const [score, setScore] = useState(0);
    // Statut réponse (True = en cours / False = fini)
    const [quizzStatus, setQuizzStatus] = useState(true);
    // Réponse choisie
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    // Valeurs Timer
    const [countdown, setCountdown] = useState<number>(10);
    const [isPaused, setIsPaused] = useState<boolean>(true)

    // Gestion du timer
    useEffect(() => {
        if (isPaused) return;
        // Si le compteur atteint 0 on passe à la question suivante
        if (countdown === 0) {
            setIndex((index) => index + 1);
            setCountdown(10);
            setScore((score) => score - 5);
        }
        const interval = setInterval(() => {
            setCountdown((countdown) => countdown - 1)
        }, 1000);
        // Reset
        return () => clearInterval(interval);
    }, [countdown, isPaused]);

    // Gestion choix réponses
    useEffect(() => {
        // Lance le timer
        setIsPaused(true);
        // TODO : gestion du timer hors page / intermédiaire pour démarrer le quizz
        // Null check
        if (selectedAnswer === null || !currentQuestion) return;
        // Timeout
        let timeout: NodeJS.Timeout;
        // Si la réponse est correcte...
        if (selectedAnswer === currentQuestion.answerId) {
            timeout = setTimeout(() => {
                setScore((score) => score + 10);
                setIndex((index) => index + 1);
                setCountdown(10);
                setSelectedAnswer(null);
                console.log("bonne réponse");
            }, 1500);
        // Si la réponse est fausse...
        } else {
            timeout = setTimeout(() => {
                if (score > 5) {
                    setScore((score) => score - 5);
                } else {
                    setScore(0);
                }
                setIndex((index) => index + 1);
                setCountdown(10);
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
            setQuizzStatus(false);
        }
    }, [currentQuestion]);

    // Rendu
    return (
        <SafeAreaView>
            <Text style={styles.title}>QUIZZ</Text>

            <Text style={styles.timer}>TIMER: {countdown}s</Text>

            <Text style={styles.counter}>{quizzStatus === true ? "Score : " + score : 'Quizz terminé ! Résultat : ' + score + '/' + (totalQuestions * 10)}</Text>
            
            <Text style={styles.question}>
                {index + 1 > data.length ? undefined : '(' + (index + 1) + '/' + totalQuestions + ')'} {currentQuestion?.question}
            </Text>
            
            <View style={{ marginTop: 10 }}>
                {currentQuestion?.choices.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => setSelectedAnswer(item.id)} style={{ borderColor: "red", padding: 10}}>
                        
                        <View style={styles.cards}> 

                            <Text style={{color: selectedAnswer === item.id ? (selectedAnswer === currentQuestion.answerId ? 'green' : 'red') : undefined}}>
                                {item.id}. {item.answer}
                            </Text>
                        
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
        fontSize: 18,
        padding: 5,
        margin: 0
    },
    cards: {
        color: "black",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 20,
        padding: 5,
        maxWidth: 200,
        textShadowRadius: 1,
        textShadowColor: "black",
    },
    counter: {
        color: "white",
        backgroundColor: '#e91e63',
        padding: 10,
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10
    },
    timer: {
        fontSize: 18,
        color: '#6A5ACD',
        fontWeight: 'bold',
        padding: 5,
        marginBottom: 10,
        paddingLeft: 10
  }
});